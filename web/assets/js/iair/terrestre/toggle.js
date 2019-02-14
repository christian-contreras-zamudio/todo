$(document).ready(function(e) {
	$(".select_cliente").hide();
	
    $("#toggle_pro_cli").toggle(function() {
		  //alert( "First handler for .toggle() called." );
		  //$("#toggle_pro_cli").val('Proveedor');
		  $(this).html("Proveedor");
		  $(".select_cliente").show();
		  $(".select_proveedor").hide();
		  
		  $("#id_proveedor").prop('selectedIndex',0);
		  $("#tarifa_de").val('cliente');
		  
		}, function() {
		  //alert( "Second handler for .toggle() called." );
		  //$("#toggle_pro_cli").val('Cliente');
		  $(this).html("Cliente");
		  $(".select_proveedor").show();
		  $(".select_cliente").hide();
		  
		  $("#id_cliente").prop('selectedIndex',0);
		  $("#tarifa_de").val('proveedor');
		  
		  
		});
});