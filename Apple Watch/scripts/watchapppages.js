// default vars and callback functions
var sliderVal = 25;
function onSliderChanged(val) {
  sliderVal = val;
  feedback("Slider updated to: " + val);
}

function onFooSwitchChanged(on) {
  localStorage.setItem("someOption", on);
  feedback("'Foo' switch updated to: " + on);
}

function onContextMenuPlay() {
  feedback("Context menu selection: Play");
}

function onContextMenuResume() {
  feedback("Context menu selection: Resume");
}

function onVoted(result) {
  if (result.type == "base64img") {
    feedback("User input (image):");
    document.getElementById("image").src = result.data;
    document.getElementById("image").style.display = 'block';
  } else {
    feedback("User input: " + result.data);
    document.getElementById("image").style.display = 'none';
  }
}

var detailPageLabel = null;

function onTableRowSelected(index) {
  feedback('Selected table row index: ' + index);
  if (index == 0) {
    // example of triggering navigation from the phone app
	  detailPageLabel = "From demo 5";
    applewatch.navigateToAppDetail();
  }
}

function onPushNavigation() {
  detailPageLabel = "From demo 6";
}

// page functions
function mainPageWithSliderAndContextMenu() {
  var payload = {
    'title': 'Demo 1', // optional
    'label' : {
      'value' : ' ' // this pushes the remainder of the page down a bit
    },
    'label2': { // optional, max 2 lines
      'value': 'Try -/+ and the Force Touch context menu',
      'color': '#FFFFFF',
      'font': {
        'size': 11 // default 12
      }
    },
    'slider': {
      'steps': 20, // of 100, so each step is 5 in this case
      'value': sliderVal, // of 100, so this is a percentage
      'color': '#CC0000',
      'callback': 'onSliderChanged',
      'hideValue': false // default false, allows to now show the value below the slider
    },
    // triggered by force touch
    'contextMenu': {
      // configure up to 4 items (any more will be ignored)
      'items': [
        {
          'title': 'Play',
          'iconNamed': 'play', // https://developer.apple.com/library/ios/documentation/WatchKit/Reference/WKInterfaceController_class/index.html#//apple_ref/doc/c_ref/WKMenuItemIcon
          'callback': 'onContextMenuPlay'
        },
        {
          'title': 'Resume',
          'iconNamed': 'resume',
          'callback': 'onContextMenuResume'
        }
      ]
    }
  };
  applewatch.loadAppMain(payload);
};

function mainPageWithSwitches() {
  var payload = {
    'title': 'Demo 2',
    'label': {
      'value': 'Red header label',
      'color': '#CC0000'
    },
    'switch': {
      'title': 'Want foo?',
      'on': (localStorage.getItem("someOption") == "true"),
      'color': '#CC0000',
      'callback': 'onFooSwitchChanged'
    },
    'switch2': {
      'title': 'And bar?',
      'on': true,
      'color': '#02779E'
    }
  };
  applewatch.loadAppMain(payload);
}

function mainPageWithUserInput() {
  var payload = {
    'title': 'Demo 3',
    'label': {
      'value': 'Results show on the phone',
      'color': '#FFFFFF',
      'font': {
        'size': 10 // default 12
      }
    },
    'label2': {
      'value': 'Try dictation and animated emoji!',
      'color': '#CCCCCC',
      'font': {
        'size': 10 // default 12
      }
    },
    'userInputButton': {
      'callback': 'onVoted', // currently (plugin version 0.5.0) this MUST be 'onVoted', will be fixed in a future release
      'inputMode': 'WKTextInputModeAllowAnimatedEmoji', // WKTextInputModePlain, WKTextInputModeAllowEmoji, WKTextInputModeAllowAnimatedEmoji
      'suggestions': ['foo', 'bar', 'shaz'],
      'width': 96,
      'height': 44,
      'backgroundColor': '#CC0000',
      'title': {
        'value': 'Send feedback',
        'color': '#FFFFFF',
        'font': {
          'size': 14
        }
      }
    }
  };
  applewatch.loadAppMain(payload);
}

function mainPageWithActionButton() {
  var d = new Date();
  var payload = {
    'title': 'Demo 4',
    'label': {
      'value': 'Generated @ '  + (d.getHours()<10?'0':'') + d.getHours() + ":" + (d.getMinutes()<10?'0':'') + d.getMinutes() + ":" + (d.getSeconds()<10?'0':'') + d.getSeconds(),
      'color': '#FFA500',
      'font': { // optional
        'size': 11
      }
    },
    'actionButton': {
      'title': {
        'value': 'Refresh!',
        'color': '#CCCCCC',
        'font': {
          'size': 17
        }
      },
      'color': '#FFFFFF',
      'callback': 'mainPageWithActionButton' // load ourself :)
    }
  };
  applewatch.loadAppMain(payload);
}

function mainPageWithTable() {
  var payload = {
    'title': 'Demo 5',
    'label': {
      'value': 'All kinds of rows:',
      'color': '#FFA500',
      'font': { // optional
        'size': 12
      }
    },
    'table': { // this element is quite flexible and extendible. It can't have buttons, but it can have a callback which gets the selected row index.
      'callback': 'onTableRowSelected',
      'alpha': 1,
      'rows': [
        {
          'type': 'OneColumnSelectableRowType',
          'label': {
            'value': 'Navigation row', // wired via onTableRowSelected
            'color': '#FFFFFF',
            'font': {
              'size': 14
            }
          }
        },
        {
          'type': 'OneColumnRowType',
          // wrapping these in a group so its usage and processing is predictable
          'group': {
            'backgroundColor': '#FFFFFF',
            'cornerRadius': 16
          },
          'label': {
            'value': 'Rounded',
            'color': '#1884C4'
          },
          'imageRight': {'src': 'www/styles/images/cordova.png', 'width': 25, 'height': 30}
        },
        {
          'type': 'TwoColumnsRowType',
          'col1label': {
            'value': '50/50',
            'color': '#FFA500',
            'font': {
              'size': 14
            }
          },
          'col2image': {'src': 'www/styles/images/cordova.png', 'width': 25, 'height': 30}
        },
        {
          'type': 'OneColumnRowType', // available types are specified in ObjC
          'group': {
            'backgroundColor': '#1884C4',
            'cornerRadius': 2
          },
          'label': {'value': 'With image'},
          'imageRight': {'src': 'www/styles/images/cordova.png', 'width': 25, 'height': 30}
        },
        {
          'type': 'OneColumnRowType',
          'group': {
            'backgroundColor': '#1884C4',
            'cornerRadius': 2
          },
          'label': {'value': 'Row without image'}
        }
      ]
    }
  };
  applewatch.loadAppMain(payload);
}

function mainPageWithNavigation() {
  var payload = {
    'title': 'Demo 6',
    'label': {
      'value': 'Navigation demo',
      'color': '#FFFFFF'
    },
    'pushNavButton': {
//      'backTitle': 'baaack',
      'title': {
        'value': 'Push nav'
      },
      'callback': 'onPushNavigation',
      'backgroundColor': '#FFA500',
      'alpha': 1 // default 1
    },
    'modalNavButton': {
//      'closeTitle': 'kloos',
      'title': {
        'value': 'Modal nav'
      },
      'backgroundColor': '#FFA500'
    }
  };
  applewatch.loadAppMain(payload);
}

// app detail page
function onAppDetailPageRequestsUpdate() {
  var d = new Date();
  var payload = {
    'title': 'Back', // optional, shown in the navbar. Better not to set it if this is shown modally (because the default 'Cancel' is shown briefly first)
    'label': {
      'value': 'Loaded @ '  + (d.getHours()<10?'0':'') + d.getHours() + ":" + (d.getMinutes()<10?'0':'') + d.getMinutes() + ":" + (d.getSeconds()<10?'0':'') + d.getSeconds(),
      'color': '#1884C4'
    },
    'label2': {
      'value': detailPageLabel == null ? '' : detailPageLabel
    }
  };
  applewatch.loadAppDetail(payload);
  detailPageLabel = null;
}