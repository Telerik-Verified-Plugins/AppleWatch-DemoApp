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
  feedback("Play");
}

function onContextMenuResume() {
  feedback("Resume");
}

function onContextMenuDelete() {
  feedback("Delete");
}

// page functions
function mainPageWithSliderAndContextMenu() {
    var payload = {
      'title': 'Demo 1', // optional
      'label' : {
        'value' : ' ' // this pushes the remainder of the page down a bit
      },
      'label2': { // optional, max 2 lines
        'value': 'UI built @ ' + new Date().toUTCString(),
        'color': '#FFFFFFjj',
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