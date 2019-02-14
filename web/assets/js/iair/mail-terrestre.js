// prealert POST
var x;
x=$(document);
x.ready(inicio);

function inicio(){
	var x;
	x=$("#");
	x.click(enviarTerrestre);
	}
	function enviarTerrestre(emailUsuario, variable, idioma){
		valor=variable;
		idEmbarque='#p'+valor
		email=emailUsuario;
		idiom=idioma;
		//var Servicio=tipoServicio;
		$.ajax({
			async:true,
			type:"POST",
			dataType:"html",
			contentType:"application/x-www-form-urlencoded",
			url:"mail-terrestre.php",
			//data:"idEmbarque="+valor,
			data:{"emailUsuario":email,"idRecoleccion":valor,"idioma":idiom},
			beforeSend:inicioEnvio,
			success:llegada,
			timeout:7000,
			error:problemas
			});
			return false;
		}
		
		function inicioEnvio(){
			/*var x=$("#resultados");
			x.html('<div class="alert alert-warning gritter-warning"><p><i class="glyphicon glyphicon-cloud-upload"></i>&nbsp;Espere un momento estamos procesando su pre-alert...<div class="progress progress-striped active"><div class="progress-bar progress-bar-warning"  role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 45%"></div></div></p></div>');*/

			var enviando=$.gritter.add({
					// (string | mandatory) the heading of the notification
					title: '<p><strong><i class="fa fa-upload fa-2x"></i>&nbsp;Procesando...</strong></p>',
					// (string | mandatory) the text inside the notification
					text: '<div class="alert alert-warning gritter-warning"><p><i class="glyphicon glyphicon-cloud-upload"></i>&nbsp;Espere un momento estamos procesando su envio...<div class="progress progress-striped active"><div class="progress-bar progress-bar-warning"  role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 67%"></div></div></p></div>',
					time: 2000,
					class_name: 'gritter-warning'
				});
				//return false; //termina gritter
			}
			
		function llegada(datos){
			//$("#resultados").text(datos);
			
			var status = JSON.parse(datos);
			if(status.status=='ok'){
				
				
			$("#resultados").empty();
			$("#p"+valor).removeClass("btn-danger").addClass("btn-success");
			var ok=$.gritter.add({
					// (string | mandatory) the heading of the notification
					title: '<p><strong><i class="fa fa-check fa-2x"></i>&nbsp;Mail enviado</strong></p>',
					// (string | mandatory) the text inside the notification
					text: '<h4><i class="fa fa-envelope"></i>&nbsp;Enviado a <strong>'+status.para+'</strong><br /><i class="fa fa-smile-o fa-2x"></i>&nbsp;Happy inland!!</h4>',
					time: 6000,
					class_name: 'gritter-success'
				});
				return false; //termina gritter
			}//termina if
			
			}//termina funcion
			
		function problemas(){
			/*$("#resultados").html('<div class="alert alert-danger gritter-success"><i class="glyphicon glyphicon-remove-circle"></i>&nbsp;Problemas en el servidor o actulize la pagina.</div>');*/
			
			$.gritter.add({
					// (string | mandatory) the heading of the notification
					title: '<p><strong><i class="fa fa-ban fa-2x"></i>&nbsp;Ups!!</strong></p>',
					// (string | mandatory) the text inside the notification
					text: '<h4>Algo salio mal vuelva a intentar <i class="fa fa-frown-o fa-2x"></i></h4><h3>Si el problema persiste contacte a soporte</h3>',
					sticky: true,
					class_name: 'gritter-danger'
				});
				return false; //termina gritter
			
			
			} 