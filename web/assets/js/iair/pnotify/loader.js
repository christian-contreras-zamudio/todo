function fake_load() {
    var cur_value = 1,
        progress;

    // Make a loader.
    var loader = new PNotify({
        title: "Creating series of tubes",
        text: '<div class="progress progress-striped active" style="margin:0">\
    <div id="cargadorID" class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0">\
        <span class="sr-only">0%</span>\
    </div>\
</div>',
        //icon: 'fa fa-moon-o fa-spin',
        icon: 'fa fa-cog fa-spin',
        hide: false,
        buttons: {
            closer: false,
            sticker: false
        },
        history: {
            history: false
        },
        before_open: function() {
            //progress = notice.get().find("div.progress-bar");
			progress = $('#cargadorID');
            progress.width(cur_value + "%").attr("aria-valuenow", cur_value).find("span").html(cur_value + "%");
            // Pretend to do something.
            var timer = setInterval(function() {
				
                if (cur_value == 70) {
                    loader.update({
                        title: "Aligning discrete worms",
                        icon: "fa fa-circle-o-notch fa-spin"
                    });
                }
                if (cur_value == 80) {
                    loader.update({
                        title: "Connecting end points",
                        icon: "fa fa-refresh fa-spin"
                    });
                }
                if (cur_value == 90) {
                    loader.update({
                        title: "Dividing and conquering",
                        icon: "fa fa-spinner fa-spin"
                    });
                }
                if (cur_value >= 100) {
                    // Remove the interval.
                    window.clearInterval(timer);
                    loader.remove();
                    return;
                }
                cur_value += 1;
                progress.width(cur_value + "%").attr("aria-valuenow", cur_value).find("span").html(cur_value + "%");
            }, 70);
        }
    });
}