function initMap() {
  var origin_place_id = null;
  var destination_place_id = null;
  var travel_mode = google.maps.TravelMode.DRIVING;
  var map = new google.maps.Map(document.getElementById('map'), {
    mapTypeControl: false,
    center: {lat: 19.4326077, lng: -99.13320799999997},
    zoom: 10
  });
  
  
  var geocoder = new google.maps.Geocoder;
  
  var geocoder = new google.maps.Geocoder;
  var infowindow = new google.maps.InfoWindow;
  


  
  var directionsService = new google.maps.DirectionsService;
  //var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsDisplay = new google.maps.DirectionsRenderer({
    draggable: true,
    map: map//,
    //panel: document.getElementById('mode-selector')
  });
  
  directionsDisplay.addListener('directions_changed', function() {
    //console.log(directionsDisplay.getDirections());
	
	var resuListen = directionsDisplay.getDirections();
		//console.log(resuListen);
	// condicionamos para ver si se movio el marcador A
	
	//variable que cambia de maps
	var markerMovido = resuListen.request;
	//console.log(typeof(markerMovido));
	var dataMarketMovidoA;
	var dataMarketMovidoB;
	
	$.each(markerMovido, function(key, value) {
    console.log(key, value);
	
			if(value === 0){
				dataMarketMovidoA = 0;
				console.log('Marker a: '+dataMarketMovidoA);
			}
			
			if(value === 1){
				dataMarketMovidoB = 1;
				console.log('Marker b: '+dataMarketMovidoB);
			}
	});
	
	if(dataMarketMovidoA == 0){
		/*console.log(resuListen);
		console.log(resuListen.request);
		console.log(resuListen.request.markerMovido);
		console.log(resuListen.request.destination);
		console.log(resuListen.request.origin);
		
		console.log(resuListen.request.origin.lat());
		console.log(resuListen.request.origin.lng());*/
		//console.log(resuListen.request.origin.lng);
		var latLngVar = resuListen.request.origin.lat()+','+resuListen.request.origin.lng();
		
		$('#marcador_A').val(latLngVar);
		
		$('#origenLatLng').val(latLngVar);
		$('#origenLat').val(resuListen.request.origin.lat());
		$('#origenLng').val(resuListen.request.origin.lng());
		//console.log(resuListen.request.origin);
		$('#origenPlaceId').val('');
		
		
		
		
		//$('#origin-input').val('se movio el A: '+resuListen.request.origin);
		geocodeLatLng(geocoder, map, latLngVar)
	}
	
	if(dataMarketMovidoB  == 1){
		//$('#destination-input').val('se movio el B');
		
		/*console.log(resuListen.request);
		console.log(resuListen.request.markerMovido);
		console.log(resuListen.request.destination);
		console.log(resuListen.request.destination);
		
		console.log(resuListen.request.destination.lat());
		console.log(resuListen.request.destination.lng());*/
		
		var latLngVarD = resuListen.request.destination.lat()+','+resuListen.request.destination.lng();
		
		$('#marcador_B').val(latLngVarD);
		
		$('#destinoLatLng').val(latLngVar);
		$('#destinoLat').val(resuListen.request.destination.lat());
		$('#destinoLng').val(resuListen.request.destination.lng());
		$('#destinoPlaceId').val('');
		
		geocodeLatLngDestino(geocoder, map, latLngVarD)
		
		
	}
	
	
  });

  // para eventos en el mapa
 /* map.addListener('dragend', function(e) {
    //placeMarkerAndPanTo(e.latLng, map);
	console.log(e);
	alert('dragend se hizo');
  });*/
  
  // para eventos en el marcador
/*  var marker = new google.maps.Marker({
    //position: latLng,
    map: map
  });

  marker.addListener('dragend', function() {
    //infowindow.open(marker.get('map'), marker);
	alert('dragend se hizo marcador');
	console.log(marker);
	
  });*/
  

  




  directionsDisplay.setMap(map);

  var origin_input = document.getElementById('origin-input');
  var destination_input = document.getElementById('destination-input');
  var modes = document.getElementById('mode-selector');
  //var modes = 'changemode-driving';

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(origin_input);
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(destination_input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(modes);

  var origin_autocomplete = new google.maps.places.Autocomplete(origin_input);
  origin_autocomplete.bindTo('bounds', map);
  var destination_autocomplete =
      new google.maps.places.Autocomplete(destination_input);
  destination_autocomplete.bindTo('bounds', map);

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  /*function setupClickListener(id, mode) {
    var radioButton = document.getElementById(id);
    radioButton.addEventListener('click', function() {
      travel_mode = mode;
    });
  }
  setupClickListener('changemode-walking', google.maps.TravelMode.WALKING);
  setupClickListener('changemode-transit', google.maps.TravelMode.TRANSIT);
  setupClickListener('changemode-driving', google.maps.TravelMode.DRIVING);*/

  function expandViewportToFitPlace(map, place) {
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(18);
    }
  }

  origin_autocomplete.addListener('place_changed', function() {
    var place = origin_autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }
    expandViewportToFitPlace(map, place);

    // If the place has a geometry, store its place ID and route if we have
    // the other place ID
    origin_place_id = place.place_id;
    route(origin_place_id, destination_place_id, travel_mode,
          directionsService, directionsDisplay);
		  
		 // guardamos nosotros jejeje
		 
		 geocodePlaceIdOrigen(geocoder, map, origin_place_id);
		 
		 $('#origenPlaceId').val(origin_place_id);
		 
		 //
  });

  destination_autocomplete.addListener('place_changed', function() {
    var place = destination_autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }
    expandViewportToFitPlace(map, place);

    // If the place has a geometry, store its place ID and route if we have
    // the other place ID
    destination_place_id = place.place_id;
    route(origin_place_id, destination_place_id, travel_mode,
          directionsService, directionsDisplay);
		  
		  geocodePlaceIdDestino(geocoder, map, destination_place_id);
		 
		  $('#destinoPlaceId').val(destination_place_id);
		  
  });

  function route(origin_place_id, destination_place_id, travel_mode,
                 directionsService, directionsDisplay) {
    if (!origin_place_id || !destination_place_id) {
      return;
    }
    directionsService.route({
      origin: {'placeId': origin_place_id},
      destination: {'placeId': destination_place_id},
      travelMode: travel_mode/*,
	  region: 'http://maps.google.com.mx'*/
    }, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
}


// This function is called when the user clicks the UI button requesting
// a reverse geocode.
function geocodePlaceIdOrigen(geocoder, map, placeID) {
  //var placeId = document.getElementById('place-id').value;
  var placeId = placeID;
  geocoder.geocode({'placeId': placeId}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[0]) {
        /*map.setZoom(11);
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
        infowindow.setContent(results[0].formatted_address);
        infowindow.open(map, marker);*/
		
		
		//$('#origenDireccionCompleta').val(results[0].formatted_address);
          
        // resultado
		//console.log(results);
          // status de la consulta
		//console.log(status);
		
		$('#origenDireccion').val($('#origin-input').val());
        $('#origenEstadoMunicipio').val(`${results[0].address_components[3].short_name} ${results[0].address_components[2].short_name}`);
          console.info('geocodePlaceIdOrigen')
          console.info(`${results[0].address_components[3].short_name} ${results[0].address_components[2].short_name}`)
		
		//if(results[0].formatted_address){$('#origenDireccion').val(results[0].formatted_address);}
		if(results[0].geometry.location){$('#origen_location').val(results[0].geometry.location);}
		
		if(results[0].geometry.location_type){$('#origen_type').val(results[0].geometry.location_type);}
		
		if(results[0].geometry.location.lat){$('#origenLat').val(results[0].geometry.location.lat);}
		if(results[0].geometry.location.lng){$('#origenLng').val(results[0].geometry.location.lng);}
		
		if(results[0].types){$('#origen_types').val(results[0].types);}
		//if(results[0].geometry.location.toJSON){$('#origen_toJSON').val(results[0].geometry.location.toJSON);}
		
		//$('#direccion').val($('#origin-input').val());
		
		
		/*map.setZoom(18);
        map.setCenter(results[0].geometry.location);
		
		var image = 'truck-icon-50x50.png';
        var marker = new google.maps.Marker({
          map: map,
		 icon: image,
          position: results[0].geometry.location
        });*/
/*        infowindow.setContent(results[0].formatted_address);
        infowindow.open(map, marker);*/
		
		
		$('#marcador_A').val(results[0].geometry.location);
		var latitudOri = results[0].geometry.location.lat();
		var longitudOri = results[0].geometry.location.lng();
		$('#origenLatLng').val(latitudOri+','+longitudOri);
		$('#origenLat').val(results[0].geometry.location.lat);
		$('#origenLng').val(results[0].geometry.location.lng);
		$('#origenPlaceId').val(results[0].place_id);
		
		
		
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}
////////////

// a reverse geocode.
function geocodePlaceIdDestino(geocoder, map, placeID) {
  //var placeId = document.getElementById('place-id').value;
  var placeId = placeID;
  geocoder.geocode({'placeId': placeId}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[0]) {
        /*map.setZoom(11);
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
        infowindow.setContent(results[0].formatted_address);
        infowindow.open(map, marker);*/
		
		
		//$('#origenDireccionCompleta').val(results[0].formatted_address);
		console.log(results);
		console.log(status);
		
		$('#destinoDireccion').val($('#destination-input').val());
          
          $('#destinoEstadoMunicipio').val(`${results[0].address_components[3].short_name} ${results[0].address_components[2].short_name}`);
          console.info('geocodePlaceIdDestino')
          console.info(`${results[0].address_components[3].short_name} ${results[0].address_components[2].short_name}`)
		
		//if(results[0].formatted_address){$('#destinoDireccion').val(results[0].formatted_address);}
		if(results[0].geometry.location){$('#destino_location').val(results[0].geometry.location);}
		
		if(results[0].geometry.location_type){$('#destino_type').val(results[0].geometry.location_type);}
		
		if(results[0].geometry.location.lat){$('#destinoLat').val(results[0].geometry.location.lat);}
		if(results[0].geometry.location.lng){$('#destinoLng').val(results[0].geometry.location.lng);}
		
		if(results[0].types){$('#destino_types').val(results[0].types);}
		//if(results[0].geometry.location.toJSON){$('#origen_toJSON').val(results[0].geometry.location.toJSON);}
		
		
		
		
		
		
		/*map.setZoom(18);
        map.setCenter(results[0].geometry.location);
		
		var image = 'truck-icon-50x50.png';
        var marker = new google.maps.Marker({
          map: map,
		 icon: image,
          position: results[0].geometry.location
       });*/
/*        infowindow.setContent(results[0].formatted_address);
        infowindow.open(map, marker);*/
		
		$('#marcador_B').val(results[0].geometry.location);
		var latitudDest = results[0].geometry.location.lat();
		var longitudDest = results[0].geometry.location.lng();
		$('#destino_lat_lng').val(latitudDest+','+longitudDest);
		$('#destino_lat').val(results[0].geometry.location.lat);
		$('#destino_lng').val(results[0].geometry.location.lng);
		$('#destino_place_id').val(results[0].place_id);

		
		
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}



////////////////////////////////
function geocodeLatLng(geocoder, map, latlngVariable) {
  //var input = document.getElementById('latlng').value;
	var input = latlngVariable;
  
  //console.log('lat quitando parentesis: '+input);
  var latlngStr = input.split(',', 2);
  var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        /*map.setZoom(11);
        var marker = new google.maps.Marker({
          position: latlng,
          map: map
        });
        infowindow.setContent(results[1].formatted_address);
        infowindow.open(map, marker);*/
		
		$('#origin-input').val(results[0].formatted_address);
		
		//$('#strOrigen').val(results[0].formatted_address);
		$('#origenDireccion').val(results[0].formatted_address);
		$('#origenEstadoMunicipio').val(`${results[0].address_components[3].short_name} ${results[0].address_components[2].short_name}`);
          console.info('geocodePlaceIdOrigen')
          console.info(`${results[0].address_components[3].short_name} ${results[0].address_components[2].short_name}`)
		
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}

////////////////////////////////
function geocodeLatLngDestino(geocoder, map, latlngVariable) {
  //var input = document.getElementById('latlng').value;
	var input = latlngVariable;
  
  //console.log('lat quitando parentesis: '+input);
  var latlngStr = input.split(',', 2);
  var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        /*map.setZoom(11);
        var marker = new google.maps.Marker({
          position: latlng,
          map: map
        });
        infowindow.setContent(results[1].formatted_address);
        infowindow.open(map, marker);*/
		
		$('#destination-input').val(results[0].formatted_address);
		
		$('#destinoDireccion').val(results[0].formatted_address);
		//$('#strDestino').val(results[0].formatted_address);
          $('#destinoEstadoMunicipio').val(`${results[0].address_components[3].short_name} ${results[0].address_components[2].short_name}`);
          console.info('geocodePlaceIdDestino')
          console.info(`${results[0].address_components[3].short_name} ${results[0].address_components[2].short_name}`)
		
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}