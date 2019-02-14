<?php require_once('../../../../Connections/bdEmbarquesOper.php'); ?>
<?php
if (!function_exists("GetSQLValueString")) {
function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "") 
{
  if (PHP_VERSION < 6) {
    $theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;
  }

  $theValue = function_exists("mysql_real_escape_string") ? mysql_real_escape_string($theValue) : mysql_escape_string($theValue);

  switch ($theType) {
    case "text":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;    
    case "long":
    case "int":
      $theValue = ($theValue != "") ? intval($theValue) : "NULL";
      break;
    case "double":
      $theValue = ($theValue != "") ? doubleval($theValue) : "NULL";
      break;
    case "date":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;
    case "defined":
      $theValue = ($theValue != "") ? $theDefinedValue : $theNotDefinedValue;
      break;
  }
  return $theValue;
}
}

$colname_ConsuDetalleACSE = "-1";
if (isset($_GET['idAcondicionamiento'])) {
  $colname_ConsuDetalleACSE = $_GET['idAcondicionamiento'];
}
mysql_select_db($database_bdEmbarquesOper, $bdEmbarquesOper);
$query_ConsuDetalleACSE = sprintf("SELECT idAcondicionamiento, strMAWB, strHAWB, strConsignee, strShipper, strOrigen, strDestino, strPiezas, strPeso, strLineaAerolinea, strVuelo, strETD, ETDhora, strETA, strHoraETA, dblTotal, dblUnitario, strSeguro, strDesconso, CorreDestinatario, CorreoRemitente, `file`, FechaDeAlta, strStatus1, strStatus2, Porcentaje, strCliente, strM3, strKgAforados, strTipoServicio, fechaDeAltaHora, stridUsuario, tipoServicio, incoterm, dia, mes, anio, hora, minuto, segundo, costosAplicados, prealertado, idCostos, idFacturacion, idStatus, operacion, intArea, inOficina, intActividad, strPosicion, strRuta, strRefInterna, intCliente, intConsignee, intShipper, intAreOP, intAnioOP, intMesOP, intConsecutivoOP, strDescripciondeMercancia, strCCoPP, strDivisa, strDimensiones, strCargaGeneral, strDGR, strUNdgr, strClaseDGR, idCotizacion, strRefCotizacion, strRFC, strUsuarioAsignado, strTemperatura, strTipoDeCarga, strTurno, `ref`, strObserOperativas, strObserAdministrativas, foto1, foto2, strImpoExpo, strRFCUser FROM tblAcondicionamiento WHERE idAcondicionamiento = %s", GetSQLValueString($colname_ConsuDetalleACSE, "int"));
$ConsuDetalleACSE = mysql_query($query_ConsuDetalleACSE, $bdEmbarquesOper) or die(mysql_error());
$row_ConsuDetalleACSE = mysql_fetch_assoc($ConsuDetalleACSE);
$totalRows_ConsuDetalleACSE = mysql_num_rows($ConsuDetalleACSE);

$colname_consuDetalleStatusSEAC = "-1";
if (isset($_GET['idStatus'])) {
  $colname_consuDetalleStatusSEAC = $_GET['idStatus'];
}
mysql_select_db($database_bdEmbarquesOper, $bdEmbarquesOper);
$query_consuDetalleStatusSEAC = sprintf("SELECT idStatus, intidEmbarque, fecha, strStatus, strConexion, strHora, OperacionEmbarque, intCliente, fechaAlta, strUsuarioAlta, strObservacion, strArea, strReferencia, strImagenIcono, strEstado, strRFC FROM tblStatus_SE_AC WHERE idStatus = %s", GetSQLValueString($colname_consuDetalleStatusSEAC, "int"));
$consuDetalleStatusSEAC = mysql_query($query_consuDetalleStatusSEAC, $bdEmbarquesOper) or die(mysql_error());
$row_consuDetalleStatusSEAC = mysql_fetch_assoc($consuDetalleStatusSEAC);
$totalRows_consuDetalleStatusSEAC = mysql_num_rows($consuDetalleStatusSEAC);
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Documento sin título</title>
</head>

<body>
</body>
</html>
<?php
mysql_free_result($ConsuDetalleACSE);

mysql_free_result($consuDetalleStatusSEAC);
?>
