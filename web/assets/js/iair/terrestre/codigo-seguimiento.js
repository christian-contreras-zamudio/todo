$(document).ready(function () {
    var id;
    $(".btn-codigo-generar").click(function () {

        id = $(this).attr('cloud-data-id');
        var url = $(this).attr('cloud-data-url');
        var rfc = $('#rfcu').val();
        var iduser = $('#idu').val();
        var token = $(this).attr('cloud-data-tok');


        //var datapost = { "id":id, "rfc":rfc, "usuario_alta":iduser, "token":token  };

        //ejecutamos funcion
        aTrackingGenerar(id, rfc, iduser, token, url);
        //alert( "Handler for .click() called." );
    });

    function aTrackingGenerar(id, rfc, iduser, token, url) {


        // ejecutamos sweet alert para confirmar generar codigo de seguimiento
        swal({
            title: "Generar codigo?",
            text: "Confirme para generar codigo!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
                .then((willDelete) => {

                    if (willDelete) {
                        /*swal("Generando codigo", {
                         icon: "success",
                         timer: 2000,
                         });*/

                        /*swal("Un momento, estamos generando el codigo!", {
                         buttons: false,
                         //timer: 3000,
                         });*/

                        // ejecutamos ajax
                        ajax_codigo_generar(id, rfc, iduser, token, url);

                    } else {
                        //swal("Your imaginary file is safe!");
                    }
                });

    }
// ajax
    function ajax_codigo_generar(id, rfc, iduser, token, url) {




        console.log('este json se envio: ');
        /*$.ajax({
         async:true,
         type:"POST",
         dataType:"json",
         contentType:"application/x-www-form-urlencoded",
         //url:"https://terrestre.com.mx/flete-terrestre/coordinar-recoleccion-de-embarque/mail/mail.php",
         url:url,
         //data:"idEmbarque="+valor,
         data:{ "idTerrestre":id, "rfc":rfc, "usuario_alta":iduser, "token":token  },
         beforeSend:inicioEnvioRT,
         success:llegadaRT,
         timeout:99000,
         error:problemasRT
         });
         return false;*/

        axios.post(url, {
            idTerrestre: id,
            //lastName: 'Flintstone'
        })
                .then(function (response) {
                    console.log(response.data);
                    var data = response.data;
                    if (data.status == 'ok') {

                        swal("Codigo Generado", {
                            icon: "success",
                            timer: 2000,
                        });

                        // actualizamos tracking
                        /*$('#'+id_actualizar_info).html('<a href="https://terrestre.com.mx/tracking/index.php?idTrack='+data.idhash+'">'+data.idhash+'</a><span class="text-success"><i class="fa fa-gear fa-spin"></i>&nbsp;Activo</span>&nbsp;<span class="btn btn-danger btn-xs" onClick="trackingCambiarActividadTracking(\''+idRecole+'\', \''+tokenIdRecoleccion+'\', \''+rfcSolicita+'\', \'actividad_track_'+idRecole+'\', \'loader_activiad_'+idRecole+'\', \'stop\', \''+data.idhash+'\')"><i id="loader_activiad_'+idRecole+'" class="fa fa-stop"></i>&nbsp;Desactivar</span>');
                         $('#sin_codigo_'+idRecole).remove();*/

                        // mostramos el codigo de seguimiento
                        $('#resultado_tracking_' + id).html('Tracking <a href="https://terrestre.com.mx/tracking/index.php?idTrack=' + data.codigo + '" target="_blank" class="btn-menu-interno">' + data.codigo + '</a>');
                        // ocultamos boton de generar codigo
                        $('#btn_generar_codigo_' + id).hide();


                        $('#actividad_track_' + id).html('<span class="text-success"><i class="fa fa-gear fa-spin"></i>&nbsp;Activo</span>&nbsp;<button class="btn btn-danger btn-sm btn-actividad-codigo btn-menu-interno" cloud-data-id="' + id + '" cloud-data-tok="' + token + '" cloud-data-acti="stop" cloud-data-codigo="' + data.codigo + '" cloud-data-url="/app/web/codigoseguimiento/actividadTracking" ><i id="loader_activiad_' + id + '" class="fa fa-stop"></i>&nbsp;Desactivar</button>');




                    }
                    // si recibimo error del json
                    if (data.status == 'error') {
                        swal("Ups! hubo un error", {
                            icon: "error",
                            buttons: false,
                            //timer: 3000,
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    swal("Ups! hubo un error", {
                        icon: "error",
                        buttons: false,
                        //timer: 3000,
                    });
                });

        function llegadaRT(datos) {
            console.log(datos);
            var data = datos;
            if (data.status == 'ok') {

                swal("Codigo Generado", {
                    icon: "success",
                    timer: 2000,
                });

                // actualizamos tracking
                /*$('#'+id_actualizar_info).html('<a href="https://terrestre.com.mx/tracking/index.php?idTrack='+data.idhash+'">'+data.idhash+'</a><span class="text-success"><i class="fa fa-gear fa-spin"></i>&nbsp;Activo</span>&nbsp;<span class="btn btn-danger btn-xs" onClick="trackingCambiarActividadTracking(\''+idRecole+'\', \''+tokenIdRecoleccion+'\', \''+rfcSolicita+'\', \'actividad_track_'+idRecole+'\', \'loader_activiad_'+idRecole+'\', \'stop\', \''+data.idhash+'\')"><i id="loader_activiad_'+idRecole+'" class="fa fa-stop"></i>&nbsp;Desactivar</span>');
                 $('#sin_codigo_'+idRecole).remove();*/

                // mostramos el codigo de seguimiento
                $('#resultado_tracking_' + id).html('Tracking <a href="https://terrestre.com.mx/tracking/index.php?idTrack=' + data.codigo + '" target="_blank" class="btn-menu-interno">' + data.codigo + '</a>');
                // ocultamos boton de generar codigo
                $('#btn_generar_codigo_' + id).hide();


                $('#actividad_track_' + id).html('<span class="text-success"><i class="fa fa-gear fa-spin"></i>&nbsp;Activo</span>&nbsp;<button class="btn btn-danger btn-sm btn-actividad-codigo btn-menu-interno" cloud-data-id="' + id + '" cloud-data-tok="' + token + '" cloud-data-acti="stop" cloud-data-codigo="' + data.codigo + '" cloud-data-url="/app/web/codigoseguimiento/actividadTracking" ><i id="loader_activiad_' + id + '" class="fa fa-stop"></i>&nbsp;Desactivar</button>');




            }
            // si recibimo error del json
            if (data.status == 'error') {
                swal("Ups! hubo un error", {
                    icon: "error",
                    buttons: false,
                    //timer: 3000,
                });
            }

        }
    }

    function inicioEnvioRT() {
        //console.log('enviando solicitud de codigo');
        swal("Un momento, estamos generando el codigo!", {
            buttons: false,
            //timer: 3000,
        });
    }



    function problemasRT(e) {
        console.log('error' + e);
        swal("Ups! error en la conexion, vuelva a intentar", {
            icon: "error",
            buttons: false,
            //timer: 3000,
        });
    }




// cambiar actividad tracking
    $(document).on("click", ".btn-actividad-codigo", function () {
//$(".btn-actividad-codigo").on("click" , function() {


        id = $(this).attr('cloud-data-id');
        var url = $(this).attr('cloud-data-url');
        var rfc = $('#rfcu').val();
        var iduser = $('#idu').val();
        var token = $(this).attr('cloud-data-tok');
        var actividad = $(this).attr('cloud-data-acti');
        var codigo = $(this).attr('cloud-data-codigo');



        //var datapost = { "id":id, "rfc":rfc, "usuario_alta":iduser, "token":token  };

        //ejecutamos funcion
        swallActividad(id, rfc, iduser, token, url, actividad, codigo);
        //alert( "Handler for .click() called." );
    });

    function swallActividad(id, rfc, iduser, token, url, actividad, codigo) {


        // ejecutamos sweet alert para confirmar generar codigo de seguimiento
        swal({
            title: "Cambiar actividad?",
            text: "Confirme!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
                .then((willDelete) => {

                    if (willDelete) {
                        /*swal("Generando codigo", {
                         icon: "success",
                         timer: 2000,
                         });*/

                        /*swal("Un momento, estamos generando el codigo!", {
                         buttons: false,
                         //timer: 3000,
                         });*/

                        // ejecutamos ajax
                        trackingCambiarActividadTracking(id, rfc, iduser, token, url, actividad, codigo);

                    } else {
                        //swal("Your imaginary file is safe!");
                    }
                });

    }



    function trackingCambiarActividadTracking(id, rfc, iduser, token, url, actividad, codigo) {


        /*$.ajax({
         async: true,
         type: "POST",
         dataType: "json",
         contentType: "application/x-www-form-urlencoded",
         //url:"https://terrestre.com.mx/rest/terrestre/tracking/actividad-tracking-iair.php",
         url: url,
         //data:"idEmbarque="+valor,
         data: {"id": id, "token": token, "rfc": rfc, "actividad": actividad, "codigo": codigo},
         beforeSend: inicioEnvioRTactividad,
         success: llegadaRTactividad,
         timeout: 99000,
         error: problemasRTactividad
         });
         return false;*/

        swal("Cambiando actividad de tracking!", {
            buttons: false,
            //timer: 3000,
        });

        axios.post(url, {
            id: id,
            actividad: actividad,
            //lastName: 'Flintstone'
        })
                .then(function (response) {
                    console.log(response.data);
                    var data = response.data;
                    if (data.status == 'ok') {


                        if (data.actividad == 0) {
                            $('#actividad_track_activar_' + id).html('<span class="text-danger"><i class="fa fa-power-off"></i>&nbsp;Desactivado</span>&nbsp;<button class="btn btn-success btn-sm btn-actividad-codigo btn-menu-interno" cloud-data-id="' + id + '" cloud-data-tok="' + token + '" cloud-data-acti="play" cloud-data-codigo="' + codigo + '" cloud-data-url="' + url + '" ><i id="loader_activiad_' + id + '" class="fa fa-play"></i>&nbsp;Activar</button>');

                            $('#actividad_track_activar_' + id).show()
                            $('#actividad_track_' + id).hide()
                        }

                        if (data.actividad == 1) {
                            $('#actividad_track_' + id).html('<span class="text-success"><i class="fa fa-gear fa-spin"></i>&nbsp;Activo</span>&nbsp;<button class="btn btn-danger btn-sm btn-actividad-codigo btn-menu-interno" cloud-data-id="' + id + '" cloud-data-tok="' + token + '" cloud-data-acti="stop" cloud-data-codigo="' + codigo + '" cloud-data-url="' + url + '" ><i id="loader_activiad_' + id + '" class="fa fa-stop"></i>&nbsp;Desactivar</button>');

                            $('#actividad_track_activar_' + id).hide()
                            $('#actividad_track_' + id).show()
                        }

                        swal("Actividad cambiada", {
                            icon: "success",
                            timer: 1000,
                        });

                    }
                    // si recibimo error del json
                    if (data.status == 'error') {
                        //$('#tracking_results').html(data.idhash);
                        $('#' + id_loader).html('');
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

                })
                .catch(function (error) {
                    console.log(error);
                    swal("Ups! hubo un error", {
                        icon: "error",
                        buttons: false,
                        //timer: 3000,
                    });
                });


        function inicioEnvioRTactividad() {

            swal("Cambiando actividad de tracking!", {
                buttons: false,
                //timer: 3000,
            });


            /*$('#'+id_loader).removeClass('fa-stop');
             $('#'+id_loader).addClass('fa-spin fa-spinner');*/



        }

        function llegadaRTactividad(datos) {
            //$("#resultados").text(datos);
            //$("#resultadoTrack").html(datos);
            //x=$("#p"+valor).removeClass("letrasRojas").addClass("letrasVerdes");
            var data = datos;
            if (data.status == 'ok') {
                //$('html,body').animate({scrollTop: $("#topAnclaUsoPropio").offset().top}, 2000);
                //$('#nuevoSer').html('<a href="index.php" class="btn btn-primary animated bounceInLeft"><i class="fa fa-plus-square"></i>&nbsp;Nuevo Servicio</a>');


                /*if(actividad_tracking == 'stop'){
                 $('#'+idActualizar).html('<span class="text-danger"><i class="fa fa-power-off"></i>&nbsp;Desactivado</span>&nbsp;<span class="btn btn-success btn-xs" onClick="trackingCambiarActividadTracking(\''+idRecoleccion+'\', \''+tokenIdRecoleccion+'\', \''+rfcSolicita+'\', \'actividad_track_'+idRecoleccion+'\', \'loader_activiad_'+idRecoleccion+'\', \'play\', \''+tracking_web+'\')"><i id="loader_activiad_'+idRecoleccion+'" class="fa fa-play"></i>&nbsp;Activar</span>');
                 }
                 
                 if(actividad_tracking == 'play'){
                 $('#'+idActualizar).html('<span class="text-success"><i class="fa fa-gear fa-spin"></i>&nbsp;Activo</span>&nbsp;<span class="btn btn-danger btn-xs" onClick="trackingCambiarActividadTracking(\''+idRecoleccion+'\', \''+tokenIdRecoleccion+'\', \''+rfcSolicita+'\', \'actividad_track_'+idRecoleccion+'\', \'loader_activiad_'+idRecoleccion+'\', \'stop\', \''+tracking_web+'\')"><i id="loader_activiad_'+idRecoleccion+'" class="fa fa-stop"></i>&nbsp;Desactivar</span>');
                 }*/


                if (data.actividad == 0) {
                    $('#actividad_track_activar_' + id).html('<span class="text-danger"><i class="fa fa-power-off"></i>&nbsp;Desactivado</span>&nbsp;<button class="btn btn-success btn-sm btn-actividad-codigo btn-menu-interno" cloud-data-id="' + id + '" cloud-data-tok="' + token + '" cloud-data-acti="play" cloud-data-codigo="' + codigo + '" cloud-data-url="' + url + '" ><i id="loader_activiad_' + id + '" class="fa fa-play"></i>&nbsp;Activar</button>');

                    $('#actividad_track_activar_' + id).show()
                    $('#actividad_track_' + id).hide()
                }

                if (data.actividad == 1) {
                    $('#actividad_track_' + id).html('<span class="text-success"><i class="fa fa-gear fa-spin"></i>&nbsp;Activo</span>&nbsp;<button class="btn btn-danger btn-sm btn-actividad-codigo btn-menu-interno" cloud-data-id="' + id + '" cloud-data-tok="' + token + '" cloud-data-acti="stop" cloud-data-codigo="' + codigo + '" cloud-data-url="' + url + '" ><i id="loader_activiad_' + id + '" class="fa fa-stop"></i>&nbsp;Desactivar</button>');

                    $('#actividad_track_activar_' + id).hide()
                    $('#actividad_track_' + id).show()
                }

                swal("Actividad cambiada", {
                    icon: "success",
                    timer: 1000,
                });

            }
            // si recibimo error del json
            if (data.status == 'error') {
                //$('#tracking_results').html(data.idhash);
                $('#' + id_loader).html('');
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

        function problemasRTactividad(e) {
            console.log('error actividad' + e);
            console.log(e);
            //$('#'+id_loader).removeClass('fa-spin fa-spinner');
//			$('#'+id_loader).addClass('fa-times');


        }
        //termina
//});
    }

});