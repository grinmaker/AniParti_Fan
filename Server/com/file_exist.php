<?php 

header("Access-Control-Allow-Origin: *");

$file=$_SERVER['DOCUMENT_ROOT'].$_GET['f'];

if(file_exists ($file)){
  echo("true");
}
else {
  echo("false");
}

?>