import cv2
import numpy
import threading
import time
from openalpr import Alpr
import sys

license_plates = []


def most_frequent(List):
    dict = {}
    count, itm = 0, ''
    for item in reversed(List):
        dict[item] = dict.get(item, 0) + 1
        if dict[item] >= count :
            count, itm = dict[item], item
    return(itm)


def main():
    global license_plates
    alpr = Alpr('us', 'C:/Users/dhruv/Desktop/Git/openalpr-2.3.0-win-64bit/openalpr_64/openalpr.conf',
                'C:/Users/dhruv/Desktop/Git/openalpr-2.3.0-win-64bit/openalpr_64/runtime_data')
    if not alpr.is_loaded():
        print("Error loading OpenALPR")
        sys.exit(1)

    alpr.set_top_n(10)
    alpr.set_default_region("on")

    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        alpr.unload()
        sys.exit('Failed to open video file!')

    curr_plate = ''

    while cap.isOpened():
        ret, frame = cap.read()

        cv2.imshow('frame', frame)
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

        if len(license_plates) >= 36:
            print("License Plate Detected: {}".format(most_frequent(license_plates)))
            license_plates = []

        if cv2.waitKey(1) == 27:
            break

    cv2.destroyAllWindows()
    cap.release()
    alpr.unload()


if __name__ == "__main__":
    main()
