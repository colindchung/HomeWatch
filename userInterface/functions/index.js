const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.notifTrigger = functions.firestore.document('unknownNotifs/{messageId}').onCreate((snapshot, context) => {
    payLoad = {
        "notification": {
            "title": "New Alert",
            "body": "You have an unidentified vehicle in your driveway!",
            "sound": "default"
        },
        "data": {
            "click_action": "FLUTTER_NOTIFICATION_CLICK",
            "title": "New Alert",
            "body": "You have an unidentified vehicle in your driveway!",
            "notifType": "streamNotif",
        }
    }

    return admin.messaging().sendToTopic("notification", payLoad).then((response) => {
        console.log('Pushed them all');
    }).catch((err) => {
        console.log(err);
    });
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
