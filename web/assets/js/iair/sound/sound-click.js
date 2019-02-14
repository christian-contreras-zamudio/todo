// Adapted from Learning Processing by Daniel Shiffman
// http://www.learningprocessing.com
// Doorbell sample by Corsica_S via freesound.org,
// Creative Commons BY 3.0

// A sound file object
var dingdong;
var truck_air_brakes
var push_bible
var click_off
var url = $('#urlAssets').val()
var sonido_estado = 'activar'

// A doorbell object (that will trigger the sound)
//var doorbell;

function setup() {
    //createCanvas(200, 200);

    // Load the sound file.
    // We have included both an MP3 and an OGG version.
    soundFormats('mp3', 'ogg');
    dingdong = loadSound(`${url}click2.mp3`);
    truck_air_brakes = loadSound(`${url}truck-air-brakes.mp3`);
    push_bible = loadSound(`${url}push-bible.mp3`);
    click_off = loadSound(`${url}click-off.mp3`);

    // Create a new doorbell
    //doorbell = new Doorbell(width/2, height/2, 64);
}

/*function draw() {
  background(255);
  // Show the doorbell
  doorbell.display(mouseX, mouseY);
}*/

/*function mousePressed() {
  // If the user clicks on the doorbell, play the sound!
  if (doorbell.contains(mouseX, mouseY)) {
    dingdong.play();
  }
}*/

$('.sound-click').click(function () {
    if (sonido_estado == 'activar') {
        dingdong.play();
    }
})

// nuevo terrestre
$('.btn-terrestre-nuevo').click(function () {
    if (sonido_estado == 'activar') {
        truck_air_brakes.play();
    }
})

// nuevo terrestre
$('.btn-menu-interno').click(function () {
    if (sonido_estado == 'activar') {
        click_off.play();
    }
})

// musica to my love
$('.play-musica').click(function () {
    if (sonido_estado == 'activar') {
        click_off.play();
    }
})



// botones menu en terrestre
$('.btn-terrestre-menu-individual, .swal-button').click(function () {
    if (sonido_estado == 'activar') {
        push_bible.play();
    }
})

$(document).on("click", '.swal-button, .btn-menu-interno', function (evt) {
    if (sonido_estado == 'activar') {
        click_off.play();
    }
});

$('#sonido_estado').change(function () {

    var sonido_actividad = $('#sonido_estado').val()
    console.info(sonido_actividad)

    if (sonido_actividad == 'activar') {
        localStorage.setItem("sonido_actividad", "desactivar");
        sonido_estado = "desactivar"
        revisarActividadSonido()
    }

    if (sonido_actividad == 'desactivar') {
        localStorage.setItem("sonido_actividad", "activar");
        sonido_estado = "activar"
        revisarActividadSonido()
    }

    //revisarActividadSonido()
})

/**
 * revisamos si no existe local storage para activar o desactivar el sonido
 */
function revisarActividadSonido() {

    var localSonido = localStorage.getItem("sonido_actividad")

    if (localSonido) {
        $('#sonido_estado').val(localSonido)
        sonido_estado = localSonido
    }
    /*else{
            localStorage.setItem("lastname", "Smith")
            $('#sonido_estado').val('activar')
        }*/

    //localStorage.setItem("lastname", "Smith");
    //document.getElementById("result").innerHTML = localStorage.getItem("lastname");


    if (localSonido == 'activar') {
        //localStorage.setItem("sonido_actividad", null)
        //localStorage.setItem("sonido_actividad", "desactivar");
        $('#sonido_estado').attr('checked')
        //$('#sonido_estado').removeAttr('checked')
    }

    if (localSonido == 'desactivar') {
        //localStorage.setItem("sonido_actividad", null)
        //localStorage.setItem("sonido_actividad", "activar");
        $('#sonido_estado').removeAttr('checked')

    }


    console.info(localSonido)
}

/**
 * ejecutamos funcion
 */
revisarActividadSonido()

// A Class to describe a "doorbell" (really a button)
/*var Doorbell = function(x_, y_, r_) {
  // Location and size
  var x = x_;
  var y = y_;
  var r = r_;

  // Is a point inside the doorbell? (used for mouse rollover, etc.)
  this.contains = function(mx, my) {
    if (dist(mx, my, x, y) < r) {
      return true;
    } else {
      return false;
    }
  };

  // Show the doorbell (hardcoded colors, could be improved)
  this.display = function(mx, my) {
    if (this.contains(mx, my)) {
      fill(100);
    } else {
      fill(175);
    }
    stroke(0);
    strokeWeight(4);
    ellipse(x, y, r, r);
  };
};*/