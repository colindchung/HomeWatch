from flask import Response
from flask import Flask
from flask import render_template
import threading
import argparse
import cv2

outputFrame = None
lock = threading.Lock()

cap = cv2.VideoCapture(0)
face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

# initialize a flask object
app = Flask(__name__)
 
# initialize the video stream and allow the camera sensor to
# warmup
#vs = VideoStream(usePiCamera=1).start()
#vs = VideoStream(src=0).start()

@app.route("/")
def index():
	# return the rendered template
	return render_template("index.html")

@app.route("/video_feed")
def video_feed():
	# return the response generated along with the specific media
	# type (mime type)
	return Response(generate(),
		mimetype = "multipart/x-mixed-replace; boundary=frame")

def detect_face():
    # global vs, outputFrame, lock
    global outputFrame, lock

    while True:
        ret, frame = cap.read()

        faces = face_cascade.detectMultiScale(frame, 1.3, 5)
        for (x,y,w,h) in faces:
            cv2.rectangle(frame,(x,y),(x+w,y+h),(255,0,0),2)
            cv2.circle(frame, (x + w//2 , y + h//2), 5, (0, 0, 255))
            # print((x, x + w, y, y + h))
            # roi_color = frame[y:y+h, x:x+w]

        with lock:
            outputFrame = frame.copy()

def generate():
	# grab global references to the output frame and lock variables
	global outputFrame, lock
 
	# loop over frames from the output stream
	while True:
		# wait until the lock is acquired
		with lock:
			# check if the output frame is available, otherwise skip
			# the iteration of the loop
			if outputFrame is None:
				continue
 
			# encode the frame in JPEG format
			(flag, encodedImage) = cv2.imencode(".jpg", outputFrame)
 
			# ensure the frame was successfully encoded
			if not flag:
				continue
 
		# yield the output frame in the byte format
		yield(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + 
			bytearray(encodedImage) + b'\r\n')

# check to see if this is the main thread of execution
if __name__ == '__main__':
	# construct the argument parser and parse command line arguments
	ap = argparse.ArgumentParser()
	ap.add_argument("-i", "--ip", type=str, required=True,
		help="ip address of the device")
	ap.add_argument("-o", "--port", type=int, required=True,
		help="ephemeral port number of the server (1024 to 65535)")
	ap.add_argument("-f", "--frame-count", type=int, default=32,
		help="# of frames used to construct the background model")
	args = vars(ap.parse_args())
 
	# start a thread that will perform motion detection
	t = threading.Thread(target=detect_face)
	t.daemon = True
	t.start()
 
	# start the flask app
	app.run(host=args["ip"], port=args["port"], debug=True,
		threaded=True, use_reloader=False)
 
# release the video stream pointer
# vs.stop()