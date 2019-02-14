function initMapGoogle(latitud, longitud) {
$('#map').show();
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: {lat: latitud, lng: longitud}
  });

  var image = 'truck-icon-50x50.png';
  var beachMarker = new google.maps.Marker({
    position: {lat: latitud, lng: longitud},
    map: map,
    icon: image
  });
}