$(document).ready(function(e) {
	
	$('#appbundle_finanzas_conceptoscfdi_conceptoId, #conceptos_estimados_conceptoId').change(function() {
		var idConcepto=$('#appbundle_finanzas_conceptoscfdi_conceptoId, #conceptos_estimados_conceptoId').val();
		var rfc=$('#rfc').val();
		var id_prefc=$('#id_prefc').val();
		var toke=$('#tok').val();
		var url=$('#ruta').val();
		var dataJson = {"id":idConcepto, "rfc":rfc, "token":toke};
		
		
	  $.ajax({
			async:true,
			type:"POST",
			dataType:"html",
			contentType:"application/x-www-form-urlencoded",
			url:url,
			//data:"idEmbarque="+valor,
			data:dataJson,
			beforeSend:inicioEnvio,
			success:llegada,
			timeout:6000,
			error:problemas
			});
					
		function inicioEnvio(){
			//$("#Consulta").html('<img src="../assets/imagenes/loader.gif" width="26" height="26">');
			console.log('solicitando...');
			$('#loaderconceptos').html('<i class="fa fa-spinner fa-spin text-warning"></i>');
			}
			
		function llegada(datos){
			//$("#resultadosTarifa").html(datos);	
			
			var data = JSON.parse(datos);
			
			console.log('llegada...');
			//console.log(datos);
			//console.log(data.data);
			
			
			
			
			
			
			
			
			if( data.status == 'ok'){
				var data2 = JSON.parse(data.data);
				console.log(data2);
			$('#appbundle_finanzas_conceptoscfdi_unidadMedida, #conceptos_estimados_unidadMedida').val(data2[0].unidadMedida);
			$('#appbundle_finanzas_conceptoscfdi_iva, #conceptos_estimados_iva').val(data2[0].iva);
			$('#appbundle_finanzas_conceptoscfdi_retencion, #conceptos_estimados_retencion').val(data2[0].retencion);
			
			
			$('#loaderconceptos').html('<i class="fa fa-check-circle text-success"></i>'+data2[0].descripcion);
			}
			
			if( data.status == 'error'){
				$('#loaderconceptos').html('<span class="text-danger">No se encontro</span>');
				
				$('#appbundle_finanzas_conceptoscfdi_unidadMedida, #conceptos_estimados_unidadMedida').val('');
				$('#appbundle_finanzas_conceptoscfdi_iva, #conceptos_estimados_iva').val('');
				$('#appbundle_finanzas_conceptoscfdi_retencion, #conceptos_estimados_retencion').val('');
			}
			
			/*var respuesta=$.parseJSON(datos);
			$('#strUnidadDeMedida').val(respuesta.um).attr('readonly', true);
			$('#intCantidad').val(respuesta.cantidad).attr('readonly', true);
			$('#dblIVATasa').val(respuesta.iva).attr('readonly', true);
			$('#dblRetIVA').val(respuesta.retencion).attr('readonly', true);
			$('#gasto_en').val(respuesta.gasto_en).attr('readonly', true);
			
			//$("#Consulta").html('');
			$("#Consulta").html('<span class="text-success">:)</span>');		*/
			}
			
		function problemas(){
			//$("#Consulta").html('<span class="text-danger">:(</span>');
			console.log('error...');
			
			}
	});
	
	
	// total
	$("#appbundle_finanzas_conceptoscfdi_cantidad,#appbundle_finanzas_conceptoscfdi_valorUnitario, #conceptos_estimados_cantidad, #conceptos_estimados_valorUnitario").keyup(function(e) {
				
                var Cantidad = $("#appbundle_finanzas_conceptoscfdi_cantidad, #conceptos_estimados_cantidad").val();
                var dblValorUnitario = $("#appbundle_finanzas_conceptoscfdi_valorUnitario, #conceptos_estimados_valorUnitario").val();
				var dblIVATasa=$("#appbundle_finanzas_conceptoscfdi_iva, #conceptos_estimados_iva").val();
				var dblRetIVA=$("#appbundle_finanzas_conceptoscfdi_retencion, #conceptos_estimados_retencion").val();
				
				var okiva=0;
	
				if(Cantidad>'' && dblValorUnitario>'' && dblIVATasa>''){
					
					// revisamos el valor del iva para condicionar
					var revIva = dblIVATasa - dblRetIVA;
					if(revIva == 0.16){
						okiva=1.16;
					}
					/////////////
					if(revIva == 0.12){
						okiva=1.12;
					}
					
					if(revIva == 0){
						okiva=1;
					}
					
				//var IVAOk=parseFloat(dblIVATasa) - parseFloat(dblRetIVA);
				
				
				
				
				
				var SdoOK=okiva;
				
				var TotalCantidadPorValor=parseFloat(Cantidad) * parseFloat(dblValorUnitario);
               // var resultado = parseFloat(TotalCantidadPorValor) * parseFloat(SdoOK) + parseFloat(0.01);
				var resultado = parseFloat(TotalCantidadPorValor) * parseFloat(SdoOK);
				var mostrar = parseFloat(resultado).toFixed(2);
				
				var total_iva = parseFloat(TotalCantidadPorValor * dblIVATasa).toFixed(2);
				var total_retencion = parseFloat(TotalCantidadPorValor*dblRetIVA).toFixed(2);
				
				$('#dbl_total_iva').val(total_iva);
				$('#dbl_total_retencion').val(total_retencion);
				
				$("#appbundle_finanzas_conceptoscfdi_total, #conceptos_estimados_total").val(mostrar);
				
				}

                
				
            });
	
});