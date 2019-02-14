// origen estados de mexico
$(document).ready(function(e) {
	
	$('#municipio_destino_sel').hide();
	$('#localidad_destino_sel').hide();

// mostramos los municipios de acuerdo a su estado
    $('#strDestinoEstado').change(function() {
		
		// ocultamos y restauramos selects
		//$('#municipio_destino_sel').hide();
		$('#localidad_destino_sel').hide();
		
		// guardamos el valor en una variable
		//var destino_estado = $( "#strDestinoEstado option:selected" ).text();
		var destino_estado = $('option:selected', this).attr('datoabreviado');
		$('#destinoEstadoMunicipio').val(destino_estado);
		
		var embed_destino_estado = $('option:selected', this).attr('datoabreviado');
			console.log(embed_destino_estado);
		
		
		$("#sel_municipios_destino").html('<i class="fa fa-spinner fa-spin"></i>');
			//var estado_id = $(this);
			var estado_id = $('#strDestinoEstado').val();
				$("#sel_municipios_destino").load("https://www.iair.mx/rest/terrestre/listas/destino-municipos-terrestre.php", 
					{ "estado_id": estado_id }, 
					function() {
					  //alert( "The last 25 entries in the feed have been loaded" );
					  //dyn_notice('Cliente');
					  //$('#resultados_varios').html('info recibida');
					  // mostramos las localidades de acuerdo a su municipio
					  $('#municipio_destino_sel').show();
    $('#intMunicipioDestino').change(function() {
		$("#sel_localidades_destino").html('<i class="fa fa-spinner fa-spin"></i>');
			//var estado_id = $(this);
			
			// agregamos valor a input origen
			var destino_municipio = $('option:selected', this).attr('nombre_municipio');
			destino_estado2 = destino_estado+' '+destino_municipio;
			$('#destinoEstadoMunicipio').val(destino_estado2);
			
			//destino_estado = destino_estado+'+'+destino_municipio;
			
			embed_destino_est = embed_destino_estado+'+'+destino_municipio;
			console.log(embed_destino_est);
			
			
			
			var municipio_id = $('#intMunicipioDestino').val();
				$("#sel_localidades_destino").load("https://www.iair.mx/rest/terrestre/listas/localidades-destino.php", 
					{ "municipio_id": municipio_id }, 
					function() {
					  //alert( "The last 25 entries in the feed have been loaded" );
					  //dyn_notice('Cliente');
					  //$('#resultados_varios').html('info recibida');
						// cambiamos info en el framde maps
						$('#localidad_destino_sel').show();
						$('#intLocalidadDestino').change(function() {
							var latitud = $('option:selected', this).attr('latitudorigen');
							var longitud = $('option:selected', this).attr('longitudorigen');
								/*var latitud = $(this).attr('latitudorigen');
								var longitud = $(this).attr('longitudorigen');*/
								
								var url_maps_origen = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyCpdzdmKnJokEvk42XBaddhr6ZmIiPt1_E&center='+latitud+','+longitud+'&q=loc:'+latitud+'+'+longitud+'&zoom=8';
								$('#maps_destino').attr('src', url_maps_origen);  
							});//termina $('#intLocalidadDestino').change(function() {
					  
					});
				});	
					  
					});
				});
			
});