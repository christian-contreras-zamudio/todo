// JavaScript Document
function dyn_notice(customMensaje) {
	var mensaje = customMensaje;
    var percent = 0;
    var notice = new PNotify({
        text: "Puede continuar en lo cargamos...",
        type: 'info',
        icon: 'fa fa-spinner fa-spin',
        hide: false,
        buttons: {
            closer: false,
            sticker: false
        },
        opacity: .75,
        shadow: false,
        width: "170px"
    });

    setTimeout(function() {
        notice.update({
            title: false
        });
        var interval = setInterval(function() {
            percent += 4;
            var options = {
                text: percent + "% complete."
            };
			
			if (percent == 20) {
                    notice.update({
                        title: "Preparando select's <strong>"+mensaje+"</strong>",
                        icon: "fa fa-circle-o-notch fa-spin"
                    });
               }
			
			if (percent == 70) {
                    notice.update({
                        title: "Consultando la base de datos <strong>"+mensaje+"</strong>",
                        icon: "fa fa-circle-o-notch fa-spin"
                    });
               }
            if (percent == 80) {
                    notice.update({
                        title: "Casi terminamos <strong>"+mensaje+"</strong>",
                        icon: "fa fa-refresh fa-spin"
                    });
                }
            if (percent == 90) {
                    notice.update({
                        title: "Cargando <strong>"+mensaje+"</strong>",
                        icon: "fa fa-spinner fa-spin"
                    });
                }
			
			
			
            //if (percent == 80) options.title = "Casi terminamos";
            if (percent >= 100) {
                window.clearInterval(interval);
                options.title = "Done! <strong>"+mensaje+"</strong>";
                options.type = "success";
                options.hide = true;
                options.buttons = {
                    closer: true,
                    sticker: true
                };
                options.icon = 'fa fa-check';
                options.opacity = 1;
                options.shadow = true;
                options.width = PNotify.prototype.options.width;
            }
            notice.update(options);
        }, 120);
    }, 1000);
}