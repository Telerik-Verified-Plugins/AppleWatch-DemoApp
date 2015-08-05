function glanceWithMap() {
	var payload = {
    'label': {'value': 'Here\'s a map of NL', 'color': '#FFFFFF'},
    'label2' : {'value': 'Generated at ' + new Date().toUTCString()},
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

function glanceWithTable() {
  var payload = {
    'label2': {'value': 'Here\'s a table with a few of different colors. One even has images!', 'color': '#FFFFFF'},
    'table': { // don't add selectable rows to a glance since glances are read-only
      'rows': [
        {
          'type': 'OneColumnRowType', // available types are specified in ObjC
          'group': {
            'backgroundColor': '#1884C4',
            'cornerRadius': 8
          },
          'label': {'value': '  images!'}, // unlike in HTML, multiple spaces have effect
          'imageLeft': {
            'data': 'data:image/png;base64,R0lGODlhDAAMALMBAP8AAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUKAAEALAAAAAAMAAwAQAQZMMhJK7iY4p3nlZ8XgmNlnibXdVqolmhcRQA7',
            'width': 16,
            'height': 16
          }
        },
        {
          'type': 'OneColumnRowType',
          'group': {
            'backgroundColor': '#7884C4',
            'cornerRadius': 8
          },
          'label': {'value': '2nd row, no img'}
        }
      ]
    }
  };
  applewatch.loadGlance(payload);
}