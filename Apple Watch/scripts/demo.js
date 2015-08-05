function feedback(what) {
  document.getElementById("feedback").innerHTML = what;  
}

function saveCurrentGlance(what) {
  localStorage.setItem('currentGlance', what);
}

// configure our default glance
if (localStorage.getItem('currentGlance') == null) {
  saveCurrentGlance('glanceWithMap');
}

document.addEventListener('deviceready', initAppleWatch, false);

function initAppleWatch() {
  if (window.navigator.simulator === true) {
    alert('This plugin is not available in the simulator.');
    return;
  } else if (window.applewatch === undefined) {
    alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
    return;
  }

  applewatch.init(function () {
    // register for notifications
    applewatch.registerNotifications(onNotificationRegistrationSuccess, onNotificationRegistrationError);
  },
  function (err) {
    // an error occurred
    alert("watch err!");
    alert("err: " + JSON.stringify(err));
  });

//  applewatch.callback.onLoadAppMainRequest = onAppRequestsUpdate;
//  applewatch.callback.onLoadAppDetailRequest = onAppDetailPageRequestsUpdate;
  applewatch.callback.onLoadGlanceRequest = eval(localStorage.getItem('currentGlance'));
//  applewatch.callback.onLocalNotification = onNotificationReceived;
//  applewatch.callback.onRemoteNotification = onNotificationReceived;
  applewatch.callback.onError = function (message) {
    feedback("Error: " + message);
  };
}

(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    DemoViewModel = kendo.data.ObservableObject.extend({

      // these glance functions are defined in glances.js
      glanceWithMap: function() {
        saveCurrentGlance('glanceWithMap');
        glanceWithMap();
      },

      glanceWithTable: function() {
        saveCurrentGlance('glanceWithTable');
        glanceWithTable();
      },

      checkSimulator: function() {
        if (window.navigator.simulator === true) {
          alert('This plugin is not available in the simulator.');
          return true;
        } else if (window.applewatch === undefined) {
          alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
          return true;
        } else {
          return false;
        }
      }
    });

    app.demoService = {
      viewModel: new DemoViewModel()
    };
})(window);