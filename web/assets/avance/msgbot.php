<?php require_once('../../../../Connections/bdEmbarquesOper.php'); ?>
<?php require_once('../../../../assets/includes/funciones.php'); ?>
<?php 
function estadoSEStatus($valor){
	
	if(isset($valor) && $valor == '1'){
		$arrEstados=array(
			'1'=>'En tiempo!',
			'2'=>'Calculando Ruta',
			'3'=>'En Seguimiento',
			'4'=>'',
		);
		$randNumero=rand(1,3);
		
		return $arrEstado = array(
			'one'=>'stepone_05.gif',
			'two'=>'stepone_06.gif',
			'three'=>'stepone_07.gif',
			'four'=>'resize_08.gif',
			'bold1'=>'<b>Seguimiento</b>',
			'bold2'=>'Proceso Recoleccion',
			'bold3'=>'Proceso Entrega',
			'bold4'=>'Concluido!',
			'leyenda'=>'Estamos dando seguimiento a su embarque.',
			'cortaLeyenda'=>$arrEstados[$randNumero]
		);
	 }
	 
	 if(isset($valor) && $valor == '2'){
		$arrEstados=array(
			'1'=>'Su embarque esta en proceso de recoleccion',
			'2'=>'En Recoleccion',
			'3'=>'',
			'4'=>'',
		);
		$randNumero=rand(1,2);
		return $arrEstado = array(
			'one'=>'resize_05.gif',
			'two'=>'steptwo_06.gif',
			'three'=>'stepone_07.gif',
			'four'=>'resize_08.gif',
			'bold1'=>'Seguimiento',
			'bold2'=>'<b>Proceso Recoleccion</b>',
			'bold3'=>'Proceso Entrega',
			'bold4'=>'Concluido!',
			'leyenda'=>'En proceso de recoleccion.',
			'cortaLeyenda'=>$arrEstados[$randNumero]
		);
	 }
	 
	 if(isset($valor) && $valor == '3'){
		return $arrEstado = array(
			'one'=>'resize_05.gif',
			'two'=>'resize_06.gif',
			'three'=>'resize_07.gif',
			'four'=>'resize_08.gif',
			'bold1'=>'Seguimiento',
			'bold2'=>'Proceso Recoleccion',
			'bold3'=>'<b>Proceso Entrega</b>',
			'bold4'=>'Concluido!',
			'leyenda'=>'Embarque en proceso de entrega.',
			'cortaLeyenda'=>'A un paso de terminar!'
		);
	 }
	 
	 if(isset($valor) && $valor == '4'){
		return $arrEstado = array(
			'one'=>'resize_05.gif',
			'two'=>'resize_06.gif',
			'three'=>'stepthree_07.gif',
			'four'=>'stepfour_08.gif',
			'bold1'=>'Seguimiento',
			'bold2'=>'Proceso Recoleccion',
			'bold3'=>'Proceso entrega',
			'bold4'=>'<b>Concluido!</b>',
			'leyenda'=>'Embarque entregado.',
			'cortaLeyenda'=>'Mision Cumplida!'
		);
	 }
}

$colname_ConsuDetalleACSE = "-1";
if (isset($_GET['idRecoleccion'])) {
  $colname_ConsuDetalleACSE = $_GET['idRecoleccion'];
}
mysql_select_db($database_bdEmbarquesOper, $bdEmbarquesOper);
$query_ConsuDetalleACSE = sprintf("SELECT * FROM tblRecoleccion WHERE idRecoleccion = %s", GetSQLValueString($colname_ConsuDetalleACSE, "int"));
$ConsuDetalleACSE = mysql_query($query_ConsuDetalleACSE, $bdEmbarquesOper) or die(mysql_error());
$row_ConsuDetalleACSE = mysql_fetch_assoc($ConsuDetalleACSE);
$totalRows_ConsuDetalleACSE = mysql_num_rows($ConsuDetalleACSE);

$colname_consuDetalleStatusSEAC = "-1";
if (isset($_GET['idStatus'])) {
  $colname_consuDetalleStatusSEAC = $_GET['idStatus'];
}
mysql_select_db($database_bdEmbarquesOper, $bdEmbarquesOper);
$query_consuDetalleStatusSEAC = sprintf("SELECT idStatus, intidEmbarque, fecha, strStatus, strConexion, strHora, OperacionEmbarque, intCliente, fechaAlta, strUsuarioAlta, strObservacion, strArea, strReferencia, strImagenIcono, strEstado, strRFC FROM tblStatus_Terrestre WHERE idStatus = %s", GetSQLValueString($colname_consuDetalleStatusSEAC, "int"));
$consuDetalleStatusSEAC = mysql_query($query_consuDetalleStatusSEAC, $bdEmbarquesOper) or die(mysql_error());
$row_consuDetalleStatusSEAC = mysql_fetch_assoc($consuDetalleStatusSEAC);
$totalRows_consuDetalleStatusSEAC = mysql_num_rows($consuDetalleStatusSEAC);

/// array con los datos para las imagenes de acuerdo al estado del estatus
$arraEstado = estadoSEStatus($row_consuDetalleStatusSEAC['strEstado']);

?>
<?php echo $arraEstado['leyenda']; ?>


<?php echo $arraEstado['cortaLeyenda']; ?>


<?php echo nl2br(strtoupper($row_consuDetalleStatusSEAC['strStatus'])); ?>


Origen: <?php echo $row_ConsuDetalleACSE['strOrigen']; ?>

Destino: <?php echo $row_ConsuDetalleACSE['strDestino']; ?>


REF: <?php echo $row_ConsuDetalleACSE['strRefCliente']; ?>

<?php
mysql_free_result($ConsuDetalleACSE);
mysql_free_result($consuDetalleStatusSEAC);
?>