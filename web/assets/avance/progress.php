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
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Notificacion Proceso</title>

<!--
>>>>>>>>> CHANGING PROGRESS STEP IMAGES <<<<<<<<<<<<<<<

-If you would like to change the progress step images from 3 to any other step please view the html comments below.
-You just need to switch the provided image url's and remove the <b> tag surrounding "Step Three" (In order to change the boldness) and add it to whichever step you need.
-->

  <style type="text/css">
    @import url(http://fonts.googleapis.com/css?family=Lato:400);


    /* Take care of image borders and formatting */

    img {
      max-width: 600px;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    a {
      text-decoration: none;
      border: 0;
      outline: none;
    }

    a img {
      border: none;
    }

    /* General styling */

    td, h1, h2, h3  {
      font-family: Helvetica, Arial, sans-serif;
      font-weight: 400;
    }

    body {
      -webkit-font-smoothing:antialiased;
      -webkit-text-size-adjust:none;
      width: 100%;
      height: 100%;
      color: #37302d;
      background: #ffffff;
    }

    table {
      background:
    }

    h1, h2, h3 {
      padding: 0;
      margin: 0;
      color: #ffffff;
      font-weight: 400;
    }

    h3 {
      color: #21c5ba;
      font-size: 24px;
    }
  </style>

  <style type="text/css" media="screen">
    @media screen {
       /* Thanks Outlook 2013! http://goo.gl/XLxpyl*/
      td, h1, h2, h3 {
        font-family: 'Lato', 'Helvetica Neue', 'Arial', 'sans-serif' !important;
      }
    }
  </style>

  <style type="text/css" media="only screen and (max-width: 480px)">
    /* Mobile styles */
    @media only screen and (max-width: 480px) {

      table[class="w320"] {
        width: 320px !important;
      }

      table[class="w300"] {
        width: 300px !important;
      }

      table[class="w290"] {
        width: 290px !important;
      }

      td[class="w320"] {
        width: 320px !important;
      }

      td[class="mobile-center"] {
        text-align: center !important;
      }

      td[class="mobile-padding"] {
        padding-left: 20px !important;
        padding-right: 20px !important;
        padding-bottom: 20px !important;
      }

      img[class="image-resize"] {
        width: 73px !important;
        height: 59px !important;
      }

      td[class="font-smaller"] {
        font-size: 14px !important;
      }
    }
  </style>
</head>
<body class="body" style="padding:0; margin:0; display:block; background:#ffffff; -webkit-text-size-adjust:none" bgcolor="#ffffff">

<table align="center" cellpadding="0" cellspacing="0" width="100%" height="100%" >
  <tr>
    <td align="center" valign="top" bgcolor="#ffffff"  width="100%">

    <table cellspacing="0" cellpadding="0" width="100%">
      <tr>
        <td style="border-bottom: 3px solid #643619;" width="100%">
          <center>
            <table cellspacing="0" cellpadding="0" width="500" class="w320">
              <tr>
                <td valign="top" style="padding:10px 0; text-align:left;" class="mobile-center">
                <!--logo-->
                  <img src="../email/proceso/logo.gif" width="250" height="62" />
                </td>
              </tr>
            </table>
          </center>
        </td>
      </tr>
      <tr>
      <!--imagen principal-->
        <td background="../../assets/imagenes/statusSEAC/<?php echo $row_consuDetalleStatusSEAC['strImagenIcono']; ?>" bgcolor="361C0F" valign="top" style="background: url(../../assets/imagenes/statusSEAC/<?php echo $row_consuDetalleStatusSEAC['strImagenIcono']; ?>) no-repeat center; background-color: #48210C; background-position: center;">
        
          <!--[if gte mso 9]>
          <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="mso-width-percent:1000;height:303px;">
            <v:fill type="tile" src="../../../../assets/imagenes/statusSEAC/<?php echo $row_consuDetalleStatusSEAC['strImagenIcono']; ?>" color="#48210C" />
            <v:textbox inset="0,0,0,0">
          <![endif]-->
          <div>
            <center>
              <table cellspacing="0" cellpadding="0" width="530" height="303" class="w320">
                <tr>
                  <td valign="middle" style="vertical-align:middle; padding-right: 15px; padding-left: 15px; text-align:left;" class="mobile-center" height="303">
                    <h1><?php echo $arraEstado['leyenda']; ?></h1><br><br>
                    <h2><?php echo $arraEstado['cortaLeyenda']; ?></h2>

                  </td>
                </tr>
              </table>
            </center>
          </div>
          <!--[if gte mso 9]>
            </v:textbox>
          </v:rect>
          <![endif]-->
        </td>
      </tr>
      <tr>
        <td valign="top">

          <center>
            <table cellspacing="0" cellpadding="0" width="500" class="w320">
              <tr>
                <td valign="top" style="border-bottom:1px solid #a1a1a1;">

                <center>
                  <table style="margin: 0 auto;"cellspacing="0" cellpadding="10" width="280">
                        <tr>
                          <td style="padding: 40px 0px;">
                            <table cellspacing="0" cellpadding="0" width="100%">
                              <tr>

                                <td style="text-align:left;">
                                <!-- 1 -->
                                  <img class="image-resize" width="83" height="69" src="../email/proceso/<?php echo $arraEstado['one']; ?>">
                                  <!--<img class="image-resize" width="83" height="69" src="resize_05.gif">-->
                                </td>
                                <!-- FOR STEP ONE - Use this url:
                                stepone_05.gif  -->
                                

                                <!-- FOR STEP TWO, THREE AND FOUR - Use this url:
                                resize_05.gif  -->

                                <td style="text-align:left;">
                                <!-- 2 -->
                                  <img class="image-resize" width="83" height="69" src="../email/proceso/<?php echo $arraEstado['two']; ?>">
                                  <!--<img class="image-resize" width="83" height="69" src="resize_06.gif">-->
                                </td>
                                <!-- FOR STEP ONE - Use this url:
                                stepone_06.gif  -->

                                <!-- FOR STEP TWO - Use this url:
                                steptwo_06.gif  -->

                                <!-- FOR STEP THREE AND FOUR - Use this url:
                                resize_06.gif  -->


                                <td style="text-align:left;">
                                <!-- 3 -->
                                  <img class="image-resize" width="83" height="69" src="../email/proceso/<?php echo $arraEstado['three']; ?>">
                                  <!--<img class="image-resize" width="83" height="69" src="resize_07.gif">-->
                                </td>

                                <!-- FOR STEP ONE AND TWO - Use this url:
                                stepone_07.gif  -->

                                <!-- FOR STEP THREE - Use this url:
                                resize_07.gif  -->

                                <!-- FOR STEP FOUR - Use this url:
                                stepthree_07.gif  -->


                                <td style="text-align:left;">
                                <!-- 4 -->
                                  <img class="image-resize" width="83" height="69" src="../email/proceso/<?php echo $arraEstado['four']; ?>">
                                  <!--<img class="image-resize" width="83" height="69" src="resize_08.gif">-->
                                </td>

                                <!-- FOR STEP ONE, TWO, Three - Use this url:
                                resize_08.gif  -->

                                <!-- FOR STEP FOUR - Use this url:
                                stepfour_08.gif  -->


                              </tr>
                              <tr>
                                <td class="font-smaller" style="text-align:center;"><?php echo $arraEstado['bold1']; ?></td>
                                <td class="font-smaller" style="text-align:center;"><?php echo $arraEstado['bold2']; ?></td>
                                <td class="font-smaller" style="text-align:center;"><?php echo $arraEstado['bold3']; ?></td>
                                <td class="font-smaller" style="text-align:center;"><?php echo $arraEstado['bold4']; ?></td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </center>

                </td>
              </tr>
            </table>
            <table cellspacing="0" cellpadding="0" width="500" class="w320">
              <tr>
                <td>
                  <table cellspacing="0" cellpadding="0" width="100%">
                    <tr>
                      <td class="mobile-padding" style="text-align:left;">
                      
                      <br>
                      <p style="font-family:Helvetica, Tahoma, Geneva, sans-serif">
                      <span style="font-style:italic;">Status:</span> <br>
					  <strong><?php echo nl2br(strtoupper($row_consuDetalleStatusSEAC['strStatus'])); ?></strong>
                      </p>
                        
                        <p style="font-family:Helvetica, Tahoma, Geneva, sans-serif">
                        <?php echo $row_consuDetalleStatusSEAC['fecha']; ?> <?php echo $row_consuDetalleStatusSEAC['strHora']; ?>
                        <br><br>
                      
                      Origen: <?php echo $row_ConsuDetalleACSE['strOrigen']; ?><br />
                      Destino: <?php echo $row_ConsuDetalleACSE['strDestino']; ?><br />
                      <br>
                      Unidad: <?php echo NombreUnidad($row_ConsuDetalleACSE['unidad']); ?><br />
                      Piezas: <?php echo $row_ConsuDetalleACSE['piezasOrigen']; ?><br />
                      
                      <?php if ( $row_ConsuDetalleACSE['dimensionesOrigen'] > ''){ ?>
                      Dimensiones: <?php echo nl2br($row_ConsuDetalleACSE['dimensionesOrigen']); ?><br />
                      <?php } ?>
                      
                      <?php if ( $row_ConsuDetalleACSE['strReferencia'] > ''){ ?>
                      REF: <?php echo $row_ConsuDetalleACSE['strReferencia']; ?><br />
                      <?php } ?>
                      
                      <?php if ( $row_ConsuDetalleACSE['mawb'] > ''){ ?>
                      MAWB: <?php echo $row_ConsuDetalleACSE['mawb']; ?><br />
                      <?php } ?>
                      
                      <?php if ( $row_ConsuDetalleACSE['hawb'] > ''){ ?>
                      HAWB: <?php echo $row_ConsuDetalleACSE['hawb']; ?><br />
                      <?php } ?>
                      
                      <?php if ( $row_ConsuDetalleACSE['observaciones'] > ''){ ?>
                      Observaciones: <br><?php echo nl2br(strtoupper($row_ConsuDetalleACSE['observaciones'])); ?><br />
                      <?php } ?>
					  
					  <br />
					  <?php echo LeyendaIAEAMayusculas($row_ConsuDetalleACSE['strServicio']); ?>
                      </p>

                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td class="mobile-padding">
                  <table cellspacing="0" cellpadding="0" width="100%">
                    <tr>
                      <td style="width:150px; background-color: #643619;">
                      
                        <div><!--[if mso]>
                            <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:33px;v-text-anchor:middle;width:150px;" arcsize="8%" stroke="f" fillcolor="#643619">
                              <w:anchorlock/>
                              <center style="color:#ffffff;font-family:sans-serif;font-size:13px;">Solo Informativo</center>
                            </v:roundrect>
                          <![endif]-->
                          <!--[if !mso]><!-- -->
                          <a href="#"><table cellspacing="0" cellpadding="0" width="100%"><tr><td style="background-color:#643619;border-radius:0px;color:#ffffff;display:inline-block;font-family:'Lato', Helvetica, Arial, sans-serif;font-weight:bold;font-size:13px;line-height:33px;text-align:center;text-decoration:none;width:150px;-webkit-text-size-adjust:none;mso-hide:all;"><span style="color:#ffffff">Solo Informativo</span></td></tr></table></a>
                          <!--<![endif]-->
                        </div>
                        
                      </td>
                      <td>&nbsp;
                      
                      </td>
                    </tr>
                  </table>
                  
                  <center>
                  <br>
                  <span style="color:#F90;">
                  ****************************<br>
                  No es necesario responder<br>
                  Mensaje informativo generado por el sistema.<br>
                  ****************************
                  </span>
                  </center>
                </td>
              </tr>
              <tr>
                <td>
                  <table cellspacing="0" cellpadding="25" width="100%">
                    <tr>
                      <td>&nbsp;
                        
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </center>
        </td>
      </tr>
      <tr>
        <td style="background-color:#c2c2c2;">

          <center>
            <table cellspacing="0" cellpadding="0" width="500" class="w320">
              <tr>
                <td>
                  <table cellspacing="0" cellpadding="30" width="100%">
                    <tr>
                      <td style="text-align:center;">
                        <a href="#">
                          <img width="61" height="51" src="../email/proceso/twitt.gif" alt="twitter" />
                        </a>
                        <a href="#">
                          <img width="61" height="51" src="../email/proceso/gma.gif" alt="google plus" />
                        </a>
                        <a href="#">
                          <img width="61" height="51" src="../email/proceso/fb.gif" alt="facebook" />
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <center>
                    <table style="margin:0 auto;" cellspacing="0" cellpadding="5" width="100%">
                      <tr>
                        <td style="text-align:center; margin:0 auto; font-family:Helvetica, Tahoma, Geneva, sans-serif" width="100%">
                        <h4>CCC Global Solutions</h4>
                        <h6>Powered by iAir</h6>
                           <!--<a href="#" style="text-align:center;">
                             <img style="margin:0 auto;" width="123" height="24" src="https://www.filepicker.io/api/file/u7CkMXcOSlG8TMbr3LnG" alt="logo link" />-->
                           </a>
                        </td>
                      </tr>
                    </table>
                  </center>
                </td>
              </tr>
            </table>
          </center>
        </td>
      </tr>
    </table>
    </td>
  </tr>
</table>

</body>
</html>
<?php
mysql_free_result($ConsuDetalleACSE);
mysql_free_result($consuDetalleStatusSEAC);
?>