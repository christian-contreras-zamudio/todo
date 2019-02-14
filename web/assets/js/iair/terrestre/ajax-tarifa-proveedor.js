$(document).ready(function() {
	
$( "#id_proveedor" ).change(function() {
  //alert( "Handler for .change() called." );
  traer_data();
});

$('.btnRecargarTarifa').click(function(e) {
    traer_data();
});


function traer_data(){
//$(document).ready(function(e) {
    //$("#btn_servicio_terrestre").click(function(){
		//var rfc = 'CGS140228S38';
		//var idRecoleccion = idRecole;
		//var rtoken = md5(rfc);
		
		var dataformTerrestreServicio = $( "#form-isela-tarifa" ).serializeArray();
		
		//dataformTerrestreServicio.push({ name: "tokenWeb", value: token });
		
		$.ajax({
			async:true,
			type:"POST",
			dataType:"html",
			contentType:"application/x-www-form-urlencoded",
			//url:"http://terrestre.com.mx/flete-terrestre/coordinar-recoleccion-de-embarque/mail/mail.php",
			url:"ajax-tarifa-proveedor.php",
			
			//data:"idEmbarque="+valor,
			/*data:{"idRecolec":idRecole, "token":tokenIdRecoleccion, "rfc":rfcSolicita, "actividad_tracking":actividad_tracking, "hash_tracking":hash_tracking},*/
			data:dataformTerrestreServicio,
			beforeSend:inicioEnvioRTactividad,
			success:llegadaRTactividad,
			timeout:99000,
			error:problemasRTactividad
			});
			return false;
		//})
		
		function inicioEnvioRTactividad(){
			/*$('#'+id_loader).removeClass('fa-stop');
			$('#'+id_loader).addClass('fa-spin fa-spinner');*/
			$('.contenidoDataReturn').html('<i class="fa fa-spinner fa-spin fa-3x"></i>');
			
			PNotify.removeAll();
			PNotify.desktop.permission();
						(new PNotify({
							title: 'Un momento.',
							text: 'Enviando',
							//type: 'success',
						/*	animate: {
									animate: true,
									in_class: 'bounceInDown',
									out_class: 'hinge'
									},*/
							animate: {
								animate: true,
								in_class: 'bounceInLeft',
								out_class: 'bounceOutRight'
							},
							desktop: {
								desktop: true
							}
						}))/*.get().click(function(e) {
							if ($('.ui-pnotify-closer, .ui-pnotify-sticker, .ui-pnotify-closer *, .ui-pnotify-sticker *').is(e.target)) return;
							alert('Hey! You clicked the desktop notification!');
						})*/;
			}
			
		function llegadaRTactividad(datos){
			//$("#resultados").text(datos);
			//$("#resultadoTrack").html(datos);
			//x=$("#p"+valor).removeClass("letrasRojas").addClass("letrasVerdes");
			var data = datos;
			if(data){				

					$('.contenidoDataReturn').html(datos);
		
					
					
					
					PNotify.removeAll();
					PNotify.desktop.permission();
						(new PNotify({
							title: 'Tarifario Cargado',
							text: 'Se cargaron las tarifas.',
							type: 'success',
						/*	animate: {
									animate: true,
									in_class: 'bounceInDown',
									out_class: 'hinge'
									},*/
							animate: {
								animate: true,
								in_class: 'bounceInLeft',
								out_class: 'bounceOutRight'
							},
							desktop: {
								desktop: true
							}
						}))/*.get().click(function(e) {
							if ($('.ui-pnotify-closer, .ui-pnotify-sticker, .ui-pnotify-closer *, .ui-pnotify-sticker *').is(e.target)) return;
							alert('Hey! You clicked the desktop notification!');
						})*/;

				}
				// si recibimo error del json
				if(data.status == 'error'){
					//$('#tracking_results').html(data.idhash);
					$('#'+id_loader).html('');
					PNotify.removeAll();
					PNotify.desktop.permission();
						(new PNotify({
							title: 'Error!',
							text: 'No se cambio la actividad del tracking.',
							type: 'error',
						/*	animate: {
									animate: true,
									in_class: 'bounceInDown',
									out_class: 'hinge'
									},*/
							animate: {
								animate: true,
								in_class: 'bounceInLeft',
								out_class: 'bounceOutRight'
							},
							desktop: {
								desktop: true
							}
						}))/*.get().click(function(e) {
							if ($('.ui-pnotify-closer, .ui-pnotify-sticker, .ui-pnotify-closer *, .ui-pnotify-sticker *').is(e.target)) return;
							alert('Hey! You clicked the desktop notification!');
						})*/;
				}
			
			}
			
		function problemasRTactividad(){
			
			/*$('#'+id_loader).removeClass('fa-spin fa-spinner');
			$('#'+id_loader).addClass('fa-times');*/

			PNotify.removeAll();
			
			PNotify.desktop.permission();
						(new PNotify({
							title: 'Error!',
							text: 'Servidor no responde, intente mas tarde.',
							type: 'error',
						/*	animate: {
									animate: true,
									in_class: 'bounceInDown',
									out_class: 'hinge'
									},*/
							animate: {
								animate: true,
								in_class: 'bounceInLeft',
								out_class: 'bounceOutRight'
							},
							desktop: {
								desktop: true
							}
						}))/*.get().click(function(e) {
							if ($('.ui-pnotify-closer, .ui-pnotify-sticker, .ui-pnotify-closer *, .ui-pnotify-sticker *').is(e.target)) return;
							alert('Hey! You clicked the desktop notification!');
						})*/;
			}
			//termina
//});
}

});