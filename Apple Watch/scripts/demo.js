function feedback(what) {
  document.getElementById("feedback").innerHTML = what;  
}

function saveCurrentGlance(what) {
  localStorage.setItem('currentGlance', what);
}

function saveCurrentAppPage(what) {
  localStorage.setItem('currentAppPage', what);
}

function showMostRecentlySelectedAppPage() {
	if (localStorage.getItem('currentAppPage') == null) {
  	saveCurrentAppPage('mainPageWithSliderAndContextMenu');
	}
	(eval(localStorage.getItem('currentAppPage')))();
}

function showMostRecentlySelectedGlance() {
	if (localStorage.getItem('currentGlance') == null) {
  	saveCurrentGlance('glanceWithMap');
	}
	(eval(localStorage.getItem('currentGlance')))();
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

  applewatch.callback.onLoadGlanceRequest = showMostRecentlySelectedGlance;
  applewatch.callback.onLoadAppMainRequest = showMostRecentlySelectedAppPage;
  applewatch.callback.onLoadAppDetailRequest = onAppDetailPageRequestsUpdate;
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

      // these glance functions are defined in scripts/watchappglances.js
      glanceWithMap: function() {
        saveCurrentGlance('glanceWithMap');
        glanceWithMap();
      },

      glanceWithTable: function() {
        saveCurrentGlance('glanceWithTable');
        glanceWithTable();
      },

      glanceWithLabelsAndImage: function() {
        saveCurrentGlance('glanceWithLabelsAndImage');
        glanceWithLabelsAndImage();
      },

      // these page functions are defined in scripts/watchapppages.js
      mainPageWithSliderAndContextMenu: function() {
        saveCurrentAppPage('mainPageWithSliderAndContextMenu');
        mainPageWithSliderAndContextMenu();
      },

      mainPageWithSwitches: function() {
        saveCurrentAppPage('mainPageWithSwitches');
        mainPageWithSwitches();
      },
      
      mainPageWithUserInput: function() {
        saveCurrentAppPage('mainPageWithUserInput');
        mainPageWithUserInput();
      },

      mainPageWithActionButton: function() {
        saveCurrentAppPage('mainPageWithActionButton');
        mainPageWithActionButton();
      },

      mainPageWithTable: function() {
        saveCurrentAppPage('mainPageWithTable');
        mainPageWithTable();
      },

      mainPageWithNavigation: function() {
        saveCurrentAppPage('mainPageWithNavigation');
        mainPageWithNavigation();
      },      

    });

    app.demoService = {
      viewModel: new DemoViewModel()
    };
})(window);