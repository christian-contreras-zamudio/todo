// origen estados de mexico
$(document).ready(function(e) {
	
	$('#municipio_origen_sel').hide();
	$('#localidad_origen_sel').hide();

// mostramos los municipios de acuerdo a su estado
$('#strOrigenEstado').change(function() {
// ocultamos y restauramos selects
//$('#municipio_origen_sel').hide();
	$('#localidad_origen_sel').hide();
	
	// guardamos el valor en una variable
	//var origen_estado = $( "#strOrigenEstado option:selected" ).text();
	var origen_estado = $('option:selected', this).attr('datoabreviado');
	$('#origenEstadoMunicipio').val(origen_estado);
		
	var embed_origen_estado = $('option:selected', this).attr('datoabreviado');
	//console.log(embed_origen_estado);
		
	$("#sel_municipios_origen").html('<i class="fa fa-spinner fa-spin"></i>');
	//var estado_id = $(this);
	var estado_id = $('#strOrigenEstado').val();
			
	$("#sel_municipios_origen").load("https://www.iair.mx/rest/terrestre/listas/municipos-terrestre.php", 
					{ "estado_id": estado_id }, 
					function() {
/*************************************************************************************************************/
							// mostramos las localidades de acuerdo a su municipio
							$('#municipio_origen_sel').show();
							$('#intMunicipio').change(function() {
								$("#sel_localidades_origen").html('<i class="fa fa-spinner fa-spin"></i>');
								//var estado_id = $(this);
												
								// agregamos valor a input origen
											
								var origen_municipio = $('option:selected', this).attr('nombre_municipio');
								origen_estado2 = origen_estado+' '+origen_municipio;
								$('#origenEstadoMunicipio').val(origen_estado2);
									
								embed_origen_est = embed_origen_estado+'+'+origen_municipio;
								console.log(embed_origen_est);
									
								var municipio_id = $('#intMunicipio').val();
								$("#sel_localidades_origen").load("https://www.iair.mx/rest/terrestre/listas/localidades-origen.php", 
											{ "municipio_id": municipio_id }, 
											function() {
											  //alert( "The last 25 entries in the feed have been loaded" );
											  //dyn_notice('Cliente');
											  //$('#resultados_varios').html('info recibida');
												// cambiamos info en el framde maps
												
												$('#localidad_origen_sel').show();
												$('#intLocalidadOrigen').change(function() {
													var latitud_origen = $('option:selected', this).attr('latitudorigen');
													var longitud_origen = $('option:selected', this).attr('longitudorigen');
														/*var latitud_origen = $(this).attr('latitudorigen');
														var longitud_origen = $(this).attr('longitudorigen');*/
														
														var url_maps_origen = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyCpdzdmKnJokEvk42XBaddhr6ZmIiPt1_E&center='+latitud_origen+','+longitud_origen+'&q=loc:'+latitud_origen+'+'+longitud_origen+'&zoom=8';
														$('#maps_origen').attr('src', url_maps_origen);  
													});//termina $('#intLocalidadOrigen').change(function() {
														
														
											  
											});
										});	
/*************************************************************************************************************/
						});
});//termina $('#strOrigenEstado').change(function() {

			
});//termina document ready