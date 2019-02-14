app = new Vue({
    el: '#AppVue',
    delimiters: ["[%", "%]"],
    components: {
  	 vuejsDatepicker
    },
    data: {
        title: 'Status Terrestre',
        vista: {
            listado: {
                ver: true,
                animar: 'animated slideInUp'
            },
            tituloH1: {
                ver: true,
                animar: 'animated bounceInDown',
                color: 'text-purple'
            },
            panelIzquierdo: {
                ver: true,
                animar: 'animated bounceIn'
            },
            panelDerecho: {
                ver: true,
                animar: 'animated bounceIn'
            },
            formNuevoEmbarque: {
                ver: false,
                animar: ''
            },
        },
        animar: {
            bounceIn: 'animated bounceIn',
            bounceOut: 'animated bounceOut',
            slideInUp: 'animated slideInUp',
            slideInDown: 'animated slideInDown',
            slideOutUp: 'animated slideOutUp',
            slideOutDown: 'animated slideOutDown',
        },
        btn: {
            editar: {
                ver: false,
            },
            nuevo: {
                ver: true,
                symfony: false
            },
            detalle: {
                ver: false,
            },
            eliminar: {
                ver: false,
            },
            cancelar: {
                ver: false,
            },
        },
        dataNuevoStatus: {
            id: '',
            avance: '',
            status: '',
            fecha: new Date(),
            hora: '',
            hora1: '00',
            hora2: '00',
            hora3: ':00-05:00',
            url: '',
        },
        errores: null,
        urls: {
            getAll: '',
            
        },
        dataStatusLoad: null,

    },
    methods: {
        sayHello: function () {
            return 'Hello';
        },
        nuevoStatus: function () {
            this.title = 'Nuevo Status'
            //this.listado = !this.listado
            //this.nuevo = !this.nuevo
            //this.nuevo = true
            // cambiamos boton
            this.btn.editar.ver = false
            this.btn.nuevo.ver = false
            this.btn.detalle.ver = false
            this.btn.eliminar.ver = false
            this.btn.cancelar.ver = true

            // ocultamos listado
            this.vista.listado.ver = false


            // animamos panel de salida
            this.vista.panelDerecho.animar = this.animar.bounceOut
            this.vista.panelIzquierdo.animar = this.animar.bounceOut
            this.vista.listado.animar = this.animar.slideOutDown


            var thisOut = this
            setTimeout(function () {
                // ocultamos paneles de informacion
                thisOut.vista.panelIzquierdo.ver = false
                thisOut.vista.panelDerecho.ver = false

            }, 500)

            setTimeout(function () {
                // mostramos formulario de nuevo status
                thisOut.vista.formNuevoEmbarque.ver = true
                thisOut.vista.formNuevoEmbarque.animar = thisOut.animar.slideInDown
                

            }, 700)
        },
        cancelarStatus: function () {
            this.title = 'Status Terrestre'
            //this.listado = !this.listado
            //this.nuevo = !this.nuevo
            //this.nuevo = true
            // cambiamos boton
            this.btn.editar.ver = false
            this.btn.nuevo.ver = true
            this.btn.detalle.ver = false
            this.btn.eliminar.ver = false
            this.btn.cancelar.ver = false

            // mostramos listado
            this.vista.listado.ver = true

            // mostramos paneles de informacion
            this.vista.panelIzquierdo.ver = true
            this.vista.panelDerecho.ver = true
            this.vista.formNuevoEmbarque.ver = false
            // animamos panel de entrada
            this.vista.panelDerecho.animar = this.animar.bounceIn
            this.vista.panelIzquierdo.animar = this.animar.bounceIn
            this.vista.listado.animar = this.animar.slideInUp
            this.vista.formNuevoEmbarque.animar = this.animar.slideOutUp

            /*var thisOut = this
            setTimeout(function(){
            // mostramos paneles de informacion
            
                       
                }, 500)*/

        },
        loadStatus() {
            
            console.log('data consultada a server')
            var this1 = this
            var url = this.urls.getAll
            axios.get(url, {
                    
                    
                })
                .then(function (response) {
                    console.log(response);
                    //this1.cancelarStatus()
                    this1.errores = null
                    this1.dataStatusLoad = response.data
                    //console.log(this1.dataStatusLoad);
                
                    this1.dataStatusLoad.sort(function(a,b){return a.id - b.id } )
				    this1.dataStatusLoad.reverse()	
                
                })
                .catch(function (error) {
                    //console.log(error);
                    console.log(error)
                    //this1.errores = error.response.data.message
                    
                });
        },
        guardarStatus() {
            console.log('boton guardar')
            var this1 = this
            var url = this.dataNuevoStatus.url
            axios.post(url, {
                    "terrestre_id": {
                        "id": this1.dataNuevoStatus.id
                    },
                    "status": this1.dataNuevoStatus.status,
                    //"fecha": "2018-05-07T00:00:00+02:00",
                                //2018-05-08T03:17:44+02:00
                    "fecha": this1.dataNuevoStatus.fecha,
                    "hora": this1.customFormatter('2018-05-07T'+this1.dataNuevoStatus.hora1+':'+this1.dataNuevoStatus.hora2+''+this1.dataNuevoStatus.hora3),
                    "avance": this1.dataNuevoStatus.avance,
                    "actividad_mail": 0,
                    
                })
                .then(function (response) {
                    console.log(response);
                    this1.cancelarStatus()
                    this1.errores = null
                
                    // recargamos los registros
                    this1.loadStatus()
                })
                .catch(function (error) {
                    //console.log(error);
                    console.log(error.response.data.message)
                    this1.errores = error.response.data.message
                });
        },
        customFormatter(date) {
            this.dataNuevoStatus.fecha = moment(date).format('YYYY-MM-DDTHH:mm:ss-05:00')
          return moment(date).format('YYYY-MM-DDTHH:mm:ss-05:00');
        },
        
        DATEFormat(date) {
            //this.dataNuevoStatus.fecha = moment(date).format('YYYY-MM-DDTHH:mm:ss-05:00')
          return moment(date).format('DD-MM-YYYY');
        },
        HORAFormat(date) {
            //this.dataNuevoStatus.fecha = moment(date).format('YYYY-MM-DDTHH:mm:ss-05:00')
          return moment(date).format('HH:mm:ss');
        },
    },
    mounted: function () {
        this.loadStatus()
    },
})