//$(document).ready(function() {
	
function aTrackingGenerar(idRecole, tokenIdRecoleccion, rfc_usuario, id_actualizar_info, id_loader ){
//$(document).ready(function(e) {
    //$("#btn_servicio_terrestre").click(function(){
		//var rfc = 'CGS140228S38';
		var idRecoleccion = idRecole;
		var rfcSolicita = rfc_usuario;
		var token = tokenIdRecoleccion;
		var usuario_alta = 'iair_system':
		//var rtoken = md5(rfc); // comentario
		
		//var dataformTerrestreServicio = $( "#formTerrestreServicio" ).serializeArray();
		
		//dataformTerrestreServicio.push({ name: "tokenWeb", value: token });
		
		$.ajax({
			async:true,
			type:"POST",
			dataType:"json",
			contentType:"application/x-www-form-urlencoded",
			//url:"https://terrestre.com.mx/flete-terrestre/coordinar-recoleccion-de-embarque/mail/mail.php",
			url:"https://terrestre.com.mx/rest/terrestre/tracking/codigo-track1ng-iair.php",
			//data:"idEmbarque="+valor,
			data:{"idRecolec":idRecole, "token":tokenIdRecoleccion, "rfc":rfcSolicita, "usuario_alta":usuario_alta},
			beforeSend:inicioEnvioRT,
			success:llegadaRT,
			timeout:99000,
			error:problemasRT
			});
			return false;
		//})
		
		function inicioEnvioRT(){
			$('#'+id_loader).html('<i class="fa fa-spin fa-spinner"></i>');
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
			
				console.log('enviando solicitud de cambio de actividad tracking');
			}
			
		function llegadaRT(datos){
			//$("#resultados").text(datos);
			//$("#resultadoTrack").html(datos);
			//x=$("#p"+valor).removeClass("letrasRojas").addClass("letrasVerdes");
			var data = datos;
			if(data.status == 'ok'){				
					//$('html,body').animate({scrollTop: $("#topAnclaUsoPropio").offset().top}, 2000);
					//$('#nuevoSer').html('<a href="index.php" class="btn btn-primary animated bounceInLeft"><i class="fa fa-plus-square"></i>&nbsp;Nuevo Servicio</a>');
					//$('#'+id_actualizar_info).html('<a href="https://terrestre.com.mx/tracking/index.php?idTrack='+data.idhash+'">'+data.idhash+'</a>');
					// demas botones
					$('#'+id_actualizar_info).html('<a href="https://terrestre.com.mx/tracking/index.php?idTrack='+data.idhash+'">'+data.idhash+'</a><span class="text-success"><i class="fa fa-gear fa-spin"></i>&nbsp;Activo</span>&nbsp;<span class="btn btn-danger btn-xs" onClick="trackingCambiarActividadTracking(\''+idRecole+'\', \''+tokenIdRecoleccion+'\', \''+rfcSolicita+'\', \'actividad_track_'+idRecole+'\', \'loader_activiad_'+idRecole+'\', \'stop\', \''+data.idhash+'\')"><i id="loader_activiad_'+idRecole+'" class="fa fa-stop"></i>&nbsp;Desactivar</span>');
					$('#sin_codigo_'+idRecole).remove();
					
					
					PNotify.removeAll();
					PNotify.desktop.permission();
						(new PNotify({
							title: 'Codigo Generado',
							text: 'Se Genero el codigo de rastreo.',
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
							text: 'No se Genero el codigo.',
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
			
		function problemasRT(e){
			$('#'+id_loader).html('<i class="fa fa-times"></i>');
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
			
			console.log('error'+e);
			}
			//termina
//});
}




function trackingCambiarActividadTracking(idRecole, tokenIdRecoleccion, rfc_usuario, id_actualizar_info, id_loader, actividad, tracking_web ){
//$(document).ready(function(e) {
    //$("#btn_servicio_terrestre").click(function(){
		//var rfc = 'CGS140228S38';
		var idRecoleccion = idRecole;
		var rfcSolicita = rfc_usuario;
		var token = tokenIdRecoleccion;
		var actividad_tracking = actividad;
		var hash_tracking = tracking_web;
		var idActualizar = id_actualizar_info;
		//var rtoken = md5(rfc);
		
		//var dataformTerrestreServicio = $( "#formTerrestreServicio" ).serializeArray();
		
		//dataformTerrestreServicio.push({ name: "tokenWeb", value: token });
		
		$.ajax({
			async:true,
			type:"POST",
			dataType:"json",
			contentType:"application/x-www-form-urlencoded",
			//url:"https://terrestre.com.mx/flete-terrestre/coordinar-recoleccion-de-embarque/mail/mail.php",
			url:"https://terrestre.com.mx/rest/terrestre/tracking/actividad-tracking-iair.php",
			//data:"idEmbarque="+valor,
			data:{"idRecolec":idRecole, "token":tokenIdRecoleccion, "rfc":rfcSolicita, "actividad_tracking":actividad_tracking, "hash_tracking":hash_tracking},
			beforeSend:inicioEnvioRTactividad,
			success:llegadaRTactividad,
			timeout:99000,
			error:problemasRTactividad
			});
			return false;
		//})
		
		function inicioEnvioRTactividad(){
			$('#'+id_loader).removeClass('fa-stop');
			$('#'+id_loader).addClass('fa-spin fa-spinner');
			
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
			if(data.status == 'ok'){				
					//$('html,body').animate({scrollTop: $("#topAnclaUsoPropio").offset().top}, 2000);
					//$('#nuevoSer').html('<a href="index.php" class="btn btn-primary animated bounceInLeft"><i class="fa fa-plus-square"></i>&nbsp;Nuevo Servicio</a>');
					
					
					if(actividad_tracking == 'stop'){
						$('#'+idActualizar).html('<span class="text-danger"><i class="fa fa-power-off"></i>&nbsp;Desactivado</span>&nbsp;<span class="btn btn-success btn-xs" onClick="trackingCambiarActividadTracking(\''+idRecoleccion+'\', \''+tokenIdRecoleccion+'\', \''+rfcSolicita+'\', \'actividad_track_'+idRecoleccion+'\', \'loader_activiad_'+idRecoleccion+'\', \'play\', \''+tracking_web+'\')"><i id="loader_activiad_'+idRecoleccion+'" class="fa fa-play"></i>&nbsp;Activar</span>');
					}
					
					if(actividad_tracking == 'play'){
						$('#'+idActualizar).html('<span class="text-success"><i class="fa fa-gear fa-spin"></i>&nbsp;Activo</span>&nbsp;<span class="btn btn-danger btn-xs" onClick="trackingCambiarActividadTracking(\''+idRecoleccion+'\', \''+tokenIdRecoleccion+'\', \''+rfcSolicita+'\', \'actividad_track_'+idRecoleccion+'\', \'loader_activiad_'+idRecoleccion+'\', \'stop\', \''+tracking_web+'\')"><i id="loader_activiad_'+idRecoleccion+'" class="fa fa-stop"></i>&nbsp;Desactivar</span>');
					}
					
					
					
					PNotify.removeAll();
					PNotify.desktop.permission();
						(new PNotify({
							title: 'Actividad Cambiada',
							text: 'Se cambio la actividad.',
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
			
			$('#'+id_loader).removeClass('fa-spin fa-spinner');
			$('#'+id_loader).addClass('fa-times');

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

//});