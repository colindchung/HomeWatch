from flask import Response
from flask import Flask
from flask import render_template
from firebase import firebase
import numpy as np
import threading
import argparse
from openalpr import Alpr
import datetime
import pickle
import datetime
import time
import cv2
import sys
import os

firebase = firebase.FirebaseApplication('https://hackthenorth2019-138ac.firebaseio.com/', None)

outputFrame = None
lock = threading.Lock()
license_plates = []

alpr = Alpr('us', 'C:/Users/dhruv/Desktop/Git/openalpr-2.3.0-win-64bit/openalpr_64/openalpr.conf',
            'C:/Users/dhruv/Desktop/Git/openalpr-2.3.0-win-64bit/openalpr_64/runtime_data')
if not alpr.is_loaded():
    print("Error loading OpenALPR")
    sys.exit(1)

alpr.set_top_n(10)
alpr.set_default_region("on")

print("! starting video capture")
cap = cv2.VideoCapture(0)
if not cap.isOpened():
    alpr.unload()
    sys.exit('Failed to open video file!')

curr_plate = ''

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

def most_frequent(List):
    dict = {}
    count, itm = 0, ''
    for item in reversed(List):
        dict[item] = dict.get(item, 0) + 1
        if dict[item] >= count :
            count, itm = dict[item], item
    return(itm)

def detect_face():
    # global vs, outputFrame, lock
    global outputFrame, lock, license_plates, curr_plate

    while True:
        ret, frame = cap.read()

        # cv2.imshow('frame', frame)
        frame = cv2.resize(frame, (1280, 780))
        cv2.imwrite('temp.png', frame)
        results = alpr.recognize_file("temp.png")

        array_of_plates = []
        for plate in results['results']:
            for candidate in plate['candidates']:
                if candidate['matches_template']:
                    array_of_plates.append([candidate['plate'], candidate['confidence']])

        if len(array_of_plates) > 0:
            plate = array_of_plates[0][0]
            max_confidence = array_of_plates[0][1]
            for i in array_of_plates:
                if i[1] > max_confidence:
                    print("MAX")
                    max_confidence = i[1]
                    plate = i[0]
            license_plates.append(plate)
            print("{}    {}".format(plate, max_confidence))

        if len(license_plates) >= 15:
            to_post = most_frequent(license_plates)
            print("Posting {} to post".format(to_post))
            res = firebase.post(
                '/plates',
                {
                    "plate": to_post,
                    "time": datetime.datetime.now().strftime("%m/%d/%Y, %H:%M:%S")
                }
            )
            license_plates = []

        # show the output frame
        # cv2.imshow("Frame", frame)
        key = cv2.waitKey(1) & 0xFF
    
        # if the `q` key was pressed, break from the loop
        if key == ord("q"):
            break

        with lock:
            outputFrame = frame.copy()
    
    cap.release()
    alpr.unload()

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