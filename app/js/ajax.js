$ = require('jquery');

var data = '';

$.ajax({
  url: '/api/v1/notes',
  data: data,
  success: function(data) {
    data.forEach(function(element) {
      $('#notes').append('<li>' + element.noteBody + '</li>');
    });
  },
  dataType: 'json'
});