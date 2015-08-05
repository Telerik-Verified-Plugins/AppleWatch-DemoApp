function onNotificationRegistrationSuccess(msg) {
  alert("successfully registered for notifications: " + msg);
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