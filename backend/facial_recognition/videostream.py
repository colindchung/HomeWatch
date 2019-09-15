from imutils.video import VideoStream
from imutils.video import FPS
from flask import Response
from flask import Flask
from flask import render_template
from firebase import firebase
import numpy as np
import threading
import argparse
import datetime
import imutils
import pickle
import datetime
import time
import cv2
import os

firebase = firebase.FirebaseApplication('https://hackthenorth2019-138ac.firebaseio.com/', None)

outputFrame = None
lock = threading.Lock()
face_sum = []

# load our serialized face detector from disk
print("! loading face detector...")
protoPath = os.path.sep.join(["face_detection_model", "deploy.prototxt"])
modelPath = os.path.sep.join(["face_detection_model",
	"res10_300x300_ssd_iter_140000.caffemodel"])
detector = cv2.dnn.readNetFromCaffe(protoPath, modelPath)
 
# load our serialized face embedding model from disk
print("! loading face recognizer...")
embedder = cv2.dnn.readNetFromTorch("openface_nn4.small2.v1.t7")
 
# load the actual face recognition model along with the label encoder
recognizer = pickle.loads(open("output/recognizer.pickle", "rb").read())
le = pickle.loads(open("output/le.pickle", "rb").read())

# initialize the video stream, then allow the camera sensor to warm up
print("[INFO] starting video stream...")
vs = VideoStream(src=0).start()
time.sleep(2.0)
 
# start the FPS throughput estimator
fps = FPS().start()

# initialize a flask object
app = Flask(__name__)
 
# initialize the video stream and allow the camera sensor to
# warmup
#vs = VideoStream(usePiCamera=1).start()
#vs = VideoStream(src=0).start()
time.sleep(2.0)

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
    global outputFrame, lock, face_sum

    while True:
        frame = vs.read()
        frame = imutils.resize(frame, width=600)
        (h, w) = frame.shape[:2]
    
        imageBlob = cv2.dnn.blobFromImage(
            cv2.resize(frame, (300, 300)), 1.0, (300, 300),
            (104.0, 177.0, 123.0), swapRB=False, crop=False)
    
        detector.setInput(imageBlob)
        detections = detector.forward()

        for i in range(0, detections.shape[2]):

            confidence = detections[0, 0, i, 2]
    
            if confidence > 0.5:
                
                box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
                (startX, startY, endX, endY) = box.astype("int")
    
                face = frame[startY:endY, startX:endX]
                (fH, fW) = face.shape[:2]
    
                if fW < 20 or fH < 20:
                    continue
                    
                faceBlob = cv2.dnn.blobFromImage(face, 1.0 / 255,
                    (96, 96), (0, 0, 0), swapRB=True, crop=False)
                embedder.setInput(faceBlob)
                vec = embedder.forward()
    
                preds = recognizer.predict_proba(vec)[0]
                j = np.argmax(preds)
                proba = preds[j]
                name = le.classes_[j]

                if name == 'dhruv':
                    face_sum.append(1)
                else:
                    face_sum.append(0)
                
                if len(face_sum) >= 120:
                    total = sum(face_sum)
                    if (total / 120 > 0.5):
                        # its dhruv
                        print('posting dhruv')
                        res = firebase.post(
                            '/people',
                            {
                                'person': 'dhruv',
                                'time': datetime.datetime.now().strftime("%m/%d/%Y, %H:%M:%S")
                            }
                        )
                    else:
                        # its unknown
                        print('posting unknown')
                        res = firebase.post(
                            '/people',
                            {
                                'person': 'unknown',
                                'time': datetime.datetime.now().strftime("%m/%d/%Y, %H:%M:%S")
                            }
                        )
                    face_sum = []
                    time.sleep(2)
    
                text = "{}: {:.2f}%".format(name, proba * 100)
                y = startY - 10 if startY - 10 > 10 else startY + 10
                cv2.rectangle(frame, (startX, startY), (endX, endY),
                    (0, 0, 255), 2)
                cv2.putText(frame, text, (startX, y),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.45, (0, 0, 255), 2)
    
        fps.update()

        # show the output frame
        # cv2.imshow("Frame", frame)
        key = cv2.waitKey(1) & 0xFF
    
        # if the `q` key was pressed, break from the loop
        if key == ord("q"):
            break

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
	# start a thread that will perform motion detection
	t = threading.Thread(target=detect_face)
	t.daemon = True
	t.start()
 
	# start the flask app
	app.run('0.0.0.0', port=8000, debug=True,
		threaded=True, use_reloader=False)
 
# release the video stream pointer
# vs.stop()