function onNotificationRegistrationSuccess(msg) {
  console.log("noti reg ok: " + msg);

  //we can now send a notification
  var payload = {
    "title": "Short!",
    "category": "default",
    "body": "Shown in the long-look interface to provide more detail",
    "badge": 1
  };

  setTimeout(function() {
    applewatch.sendNotification(onNotificationSendSuccess, onNotificationSendError, payload);
  }, 8000);
}

function onNotificationRegistrationError(msg) {
  alert("noti reg nok: " + msg);
}

function onNotificationReceived(identifier) {
  feedback("Notification identifier: " + identifier);
}

function onNotificationSendSuccess(msg) {
  console.log("noti send ok: " + msg);
}

function onNotificationSendError(msg) {
  alert("noti send nok: " + msg);
}