import cv2
import imutils
import numpy as np
import pytesseract

# import threading

# outputFrame = None
# lock = threading.Lock()

cap = cv2.VideoCapture(0)
GAUSSIAN_SMOOTH_FILTER_SIZE = (5, 5)
ADAPTIVE_THRESH_BLOCK_SIZE = 19
ADAPTIVE_THRESH_WEIGHT = 9


def preProcess(frame):
    frame = cv2.resize(frame, (620, 480))
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    gray = cv2.bilateralFilter(gray, 11, 17, 17)
    # blur = cv2.GaussianBlur(gray, (5, 5), 0)
    edge = cv2.Canny(gray, 30, 200)
    return frame, edge, gray


def detect_license_plate():
    # global outputFrame, lock

    while cap.isOpened():
        ret, frame = cap.read()

        img, processed_img, gray = preProcess(frame)
        cnts = cv2.findContours(processed_img.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
        cnts = imutils.grab_contours(cnts)
        cnts = sorted(cnts, key=cv2.contourArea, reverse=True)[:10]
        screenCnt = None

        # loop over our contours
        for c in cnts:
            # approximate the contour
            peri = cv2.arcLength(c, True)
            approx = cv2.approxPolyDP(c, 0.018 * peri, True)

            # if our approximated contour has four points, then
            # we can assume that we have found our screen
            if len(approx) == 4:
                screenCnt = approx
                break

        if screenCnt is None:
            detected = 0
        else:
            detected = 1
            cv2.drawContours(img, [screenCnt], -1, (0, 255, 0), 3)

            # Masking the part other than the number plate
            mask = np.zeros(gray.shape, np.uint8)
            new_image = cv2.drawContours(mask, [screenCnt], 0, 255, -1)
            new_image = cv2.bitwise_and(img, img, mask=mask)

            # Now crop
            (x, y) = np.where(mask == 255)
            (topx, topy) = (np.min(x), np.min(y))
            (bottomx, bottomy) = (np.max(x), np.max(y))
            Cropped = gray[topx:bottomx + 1, topy:bottomy + 1]

            # Read the number plate
            text = pytesseract.image_to_string(Cropped, config='--psm 11')
            print("Detected Number is:", text)

            cv2.imshow('image', img)
            cv2.imshow('Cropped', Cropped)

            if cv2.waitKey(1) == 27:
                return


if __name__ == "__main__":
    detect_license_plate()
    cv2.destroyAllWindows()



