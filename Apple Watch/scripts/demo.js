document.addEventListener('deviceready', initAppleWatch, false);

function initAppleWatch() {
  applewatch.init(function () {
        // register for notifications
        applewatch.registerNotifications(onNotificationRegistrationSuccess, onNotificationRegistrationError);
      },
      function (err) {
        // an error occurred
        alert("err: " + JSON.stringify(err));
      });

//  applewatch.callback.onLoadAppMainRequest = onAppRequestsUpdate;
//  applewatch.callback.onLoadAppDetailRequest = onAppDetailPageRequestsUpdate;
//  applewatch.callback.onLoadGlanceRequest = onGlanceRequestsUpdate;
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

        glance: function () {
            if (!this.checkSimulator()) {
    var payload = {
      'label': {'value': 'Here\'s a map of NL', 'color': '#FFFFFF'},
      'map': {
        'center': {
          // Eddy's home
          'lat': 52.1851552,
          'lng': 5.3996181
        },
        // Entire Netherlands
        'zoom': 3.55, // 0.001 is about streetlevel, 4 fits the entire Netherlands
        'annotations': [ // up to 5 annotations (custom pins), any more are ignored (play with the zoom value to make them all fit)
          {
            'pinColor': 'green',
            'lat': 52.1851,
            'lng': 5.3996
          }
        ]
      }
    };
    applewatch.loadGlance(payload);

            }
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