# HackTheNorth2019 - Home Watch

## Inspiration
According to alarms.org, 'There are roughly 2.5 million burglaries a year, 66% of those being home break-ins'. Despite the advancement of home technology systems, there aren't any solutions that allow you to personalize the ecosystem to use real-time recognition. We wanted to build a solution that notified you of suspicious activity before anything even happened. 

## What it does
Our solution consists of two cameras, a mobile application, and a web application. The cameras allow for live monitoring. The idea is to have one camera in front of your door and one in front of your driveway. If a person that is not registered into your ecosystem is detected in front of your door, or a car whose license plate is not registered comes into your driveway, you are notified through the app. You can then head to your web portal to check out the live stream and take any action if needed. 

## How we built it
The front end of the mobile application was developed using React Native whereas the front end of the web application was developed using React. The backend was developed using Flask to communicate with web services and to stream video. OpenCV, Tesseract, and a full machine learning (deep neural network) pipeline was written for facial recognition and licence plate detection. We utilized Firebase Authentication to allow users to sign up on the app, Firebase's Cloud Firestore to store user information, and Firebase's Real-Time Database to send information regarding the house activity to the mobile application. 

## Challenges we ran into
One of the most significant challenges we faced was the accuracy of our machine learning model. We overcame this by adding more depth to our dataset. Moreover, as it was our first time using React-Native, we ran into some styling issues which we overcame by reading through the framework documentation. 

## Accomplishments that we're proud of
We're proud that we developed an application that had a nice user interface -  this has usually been a weak point for us during hackathons. This was also the first time we applied machine learning to a project, and we learned a lot in the process! 

## What we learned
Our entire team picked up a lot of valuable skills in developing this application. The individuals working on the backend picked up valuable skills in video processing, streaming and machine learning. The individuals working on the front end obtained great experience in developing components using React Native. 

## What's next for HomeWatch
For next steps, we would like to integrate our software with a hardware platform such as a Raspberry Pi to automate and bundle the entire project. We would also like to add a whitelist/blacklist feature for new people and licence plates. This would also require to automate our machine learning pipeline to automatically add and train new data.