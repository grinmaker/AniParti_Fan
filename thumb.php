<?php 
header("Access-Control-Allow-Origin: *");


$width=intval($_GET['w']);
$height=intval($_GET['h']);


$file=$_SERVER['DOCUMENT_ROOT'].$_GET['s'];
$thumbFile= $file.'_thumb'.$width.'x'.$height;



if(!file_exists($thumbFile))
{
$tw=$width;
$th=$height;

    list($width_orig, $height_orig) = getimagesize($file);

    $ratio_orig = $width_orig/$height_orig;

    if ($width/$height > $ratio_orig) {
       $width = $height*$ratio_orig;
    } else {
       $height = $width/$ratio_orig;
    }

    // Resample
    $image_p = imagecreatetruecolor($tw, $th);
    imagefill($image_p, 0, 0, imagecolorallocate($image_p, 255, 255, 255));
    $image =imagecreatefromstring(file_get_contents($file));
    
   
    $y=($th/2)-($height/2);
    $x=($tw/2)-($width/2);
    
   if(isset($_GET['hcr'])){
      $height=$th;
      $width=$width_orig*($th/$height_orig);
      $x=0;$y=0;
   }
      
   
    imagecopyresampled($image_p, $image, $x,$y, 0, 0, $width, $height, $width_orig, $height_orig);

    imagejpeg($image_p,$thumbFile);

    imagedestroy($image_p);

}




$fp = fopen($thumbFile, 'rb');

header("Content-Type: image/jpeg");
header("Content-Length: " . filesize($thumbFile));
fpassthru($fp);

/*

$fp = fopen($name, 'rb');

// send the right headers
header("Content-Type: image/png");
header("Content-Length: " . filesize($name));

// dump the picture and stop the script
fpassthru($fp);
*/
exit;
?>