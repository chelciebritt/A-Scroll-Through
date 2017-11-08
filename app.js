$(document).ready(function() {
  $('select').material_select();
});
var arts = $.ajax({
  method: 'post',
  url:
    'https://api.artsy.net/api/tokens/xapp_token?client_id=c178c77336097d385803&client_secret=3ffaaac49bf7505167276a5e08a884ee'
}).then(function(data) {
  console.log(data);
  return $.ajax({
    method: 'get',
    url: 'https://api.artsy.net/api/artworks?size=1363',
    headers: {
      'X-XAPP-Token': data.token
    }
  });
});
$('#era-select').on('change', function(event) {
  var era = $(this).val();
  arts.then(function(data) {
    $('.image-holder').empty();
    var range = event.target.value;
    var periodStart = range.slice(0, 4);
    var periodEnd = range.slice(5, 9);
    var mySet = new Set();
    for (var val in data) {
      for (var i = 0; i < data._embedded.artworks.length; i++) {
        var dates = parseInt(data._embedded.artworks[i].date);
        //console.log(event.target.value)
        if (dates >= periodStart && dates <= periodEnd) {
          mySet.add(data._embedded.artworks[i]._links.thumbnail.href);
        }
      }
    }
    for (let img of mySet) {
      $('.image-holder').append(`<img src="${img}">`);
    }
  });
});
