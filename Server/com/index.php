<!DOCTYPE html>
<html>
<head>
<?php 

require_once( dirname(__DIR__) . '/wp-load.php');

global $polylang,$wpdb, $mycred;
    $JWT = new Jwt_Auth_Public('jwt-auth', '1.1.0');
// $mycred = mycred();
   // var_dump($JWT);
    $cu=$JWT->validate_ptoken($_GET["token"]);
   // var_dump($_GET["token"]);
   // echo $_GET["token"];
   //var_dump($cu->data->user->id);
    if(mycred_post_is_for_sale((int)$_GET["id"]))
    {
       // echo mycred_user_paid_for_content((int)$cu->data->user->id,(int)$_GET["id"]);
       // echo mycred_user_paid_for_content((int)$cu->data->user->id,(int)$_GET["id"]);
        if(!mycred_user_paid_for_content((int)$cu->data->user->id,(int)$_GET["id"]))
        {
           // echo $cu->data->user->id;
            // echo "This is paid content cannot be viewed directly, visit our site or app to buy it.Thank you";
            // die();
        }
    }
//$JWT->setToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9ibG1hbmkuY29tIiwiaWF0IjoxNTM0MDAzMzI2LCJuYmYiOjE1MzQwMDMzMjYsImV4cCI6MTUzNDYwODEyNiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMyJ9fX0.6QkRT4aR74VMucXGyIBmF_Vh9OlrZ4kEdxuF0o88pus');
//    $JWT->authenticate();
//    var_dump(wp_get_current_user());
//    die();
// // Setup for a custom point type
// $mycred = mycred( 'mycred_default' );
// var_dump(mycred_get_users_balance('1','mycred_default'));


$content =  get_post_field('post_content', $_GET["id"]);
$plang = pll_get_post_language($_GET["id"]);
$ptype=  get_post_meta($_GET["id"],"post_type",true);
if(!$ptype)
$ptype = 1;
//echo $ptype;
$btext ="Next Episode";
//echo $plang;
switch($plang)
{
    case "ko":
    {
        $btext ="관련정보";
        break;
    }
    case "zh":
    {
        $btext ="相关信息";
        break;
    }
}
$epno=  get_post_meta($_GET["id"],"epno",true);
$epno= $epno+1;

//var_dump($epno);
$parid = wp_get_post_parent_id($_GET["id"]);
$forfeatured = array(
    'post_parent' => $parid,
    'post_type'           => 'project_article',
    'meta_key' => 'epno',
    'meta_type' => 'NUMERIC',
    'meta_value' => $epno,
    'meta_compare' => '==',
);
// $tocount = array(
//     'post_parent' => $parid,
//     'post_type'           => 'project_article',
//   );
  
// $count =new WP_Query($tocount);
// var_dump($count);
// die();
 $featured =new WP_Query($forfeatured);
$pages = get_posts( array( 'post_parent' => $parid, 'post_type' => 'project_article', 'numberposts' => -1));

$count = count($pages);
//var_dump($count);
$toshow= true;
if($epno > $count || get_post_type($_GET["id"]) == "project")
{$toshow = false;}
else
{

    $nid = $featured->posts[0]->ID;
    if(mycred_post_is_for_sale((int)$nid ))
    {
       
       // echo mycred_user_paid_for_content((int)$cu->data->user->id,(int)$_GET["id"]);
       // echo mycred_user_paid_for_content((int)$cu->data->user->id,(int)$_GET["id"]);
        if(!mycred_user_paid_for_content((int)$cu->data->user->id,(int)$nid ))
        {
            $toshow = false;
           // echo $cu->data->user->id;
           //  echo "This is paid content cannot be viewed directly visit our site or app to buy it.Thank you";
         //    die();
        }
    }
}

//var_dump($count);
//die();
//var_dump($featured) ;

//wp_enqueue_script('jquery');
//echo $content;
//die();
?>
    <meta charset="utf-8" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="msapplication-tap-highlight" content="no" />
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width" /> 
       <title>Aniparti Viewer</title>
    
 <style>
     /* .next-appisode-btn{
        position: absolute;
    left: 48%;
    z-index: 99;
    bottom: 2%;
     } */
    .next-appisode-btn {
        position: absolute;
        bottom: 30px;
        right: 20px;
        color: #fff;
        z-index: 999;
        background: #e44330;
        padding: 5px 23px;
        border-radius: 40px;
        transition: all 0.3s;
        transform: translateX(180px);
        text-decoration: none;
    }
.next-appisode-btn.active{
    transform: translateX(0);
    -webkit-animation: btnWiggle 2.5s infinite;
    -moz-animation: btnWiggle 2.5s infinite;
    -o-animation: btnWiggle 2.5s infinite;
    animation: btnWiggle 2.5s infinite;
}
/ animation /
@-webkit-keyframes btnWiggle {
    0% {-webkit-transform: rotate(0deg);}
    2% {-webkit-transform: rotate(-3deg);}
    5.5% {-webkit-transform: rotate(3deg);}
    10% {-webkit-transform: rotate(0deg);}
    100% {-webkit-transform: rotate(0deg);}
}
@-o-keyframes btnWiggle {
    0% {-webkit-transform: rotate(0deg);}
    2% {-webkit-transform: rotate(-3deg);}
    5.5% {-webkit-transform: rotate(3deg);}
    10% {-webkit-transform: rotate(0deg);}
    100% {-webkit-transform: rotate(0deg);}
}
@keyframes btnWiggle {
    0% {-webkit-transform: rotate(0deg);}
    2% {-webkit-transform: rotate(-3deg);}
    5.5% {-webkit-transform: rotate(3deg);}
    10% {-webkit-transform: rotate(0deg);}
    100% {-webkit-transform: rotate(0deg);}
}

 </style>
  <script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){ (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m) })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-104089598-1', 'auto'); ga('send', 'pageview');</script>
   
    <script
        src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script src="http://blmani.com/com/aniparti-viewer-light.min.js?5b02asdd123sdaasdaa66e016"></script>
    <script src="http://blmani.com/com/aniparti-viewer-light-extras.js?5b02as00a66e016"></script>
    <script>
        window.onload = function () {
        //    / var viewer;
            var id = <?php echo  $_GET["id"];?>;
            var elm = document.getElementById('htmlViewer');
            elm.style.height = window.innerHeight + 'px';
            elm2 = document.createElement("div");
            elm.appendChild(elm2);
            if (window.innerWidth > 600) {
                console.log("window.innerWidth", window.innerWidth);
                var elm = document.getElementById('htmlViewer');
                elm.style.width = "600px";
                elm.style.marginLeft = "-300px";
                elm.style.left = "50%";
            }
           
            
            var al = true;
           // window.makeAnipartiViewer(elm2, { resourceUrl: 'http://blmani.com/com', serverUrl : 'http://mad.aniparti.com/' }),viewer.loadContent('<?php //echo base64_decode($content); ?>');
           var viewer=window.makeAnipartiViewer(elm2, { resourceUrl: 'http://blmani.com/com', serverUrl : 'http://mad.aniparti.com/' }).viewer;
        //     var viewer=window.makeAnipartiViewer(elm2, { resourceUrl: 'http://blmani.com/com/', serverUrl : 'http://mad.aniparti.com/' });
        //    // var viewer = window.makeAnipartiViewer(elm2, { resourceUrl: 'http://blmani.com/com', serverUrl : 'http://mad.aniparti.com/' });

            viewer.actions["OpenHyperlink"] = function (slide, action) {  
                
                console.log('executing hyperlink');      
                console.log(action.Link);               
                parent.postMessage(action.Link,'*');
                    //cordova.InAppBrowser.open(action.Link, '_blank', 'location=no');
                };   
            viewer.loadContent('<?php echo base64_decode($content); ?>');
            <?php 
           // if($ptype == 1)
            //{
                if($ptype != 1){
                    echo '
                    
                        console.log(id);
                        $.ajax({url: "http://blmani.com/wp-json/aniparti/vupdate",type:"POST",data:{id:id}, success: function(result){
                            console.log(result);
                            al = false;
                          }});
                    
                     
                  ' ;
                 }

                echo ' 
                window.addEventListener("aniparti_slide_change", function (e) 
            { 
                console.log(e.currentSlideIndex);';   
                if($ptype == 1)
                {
                
               echo '
               if(e.currentSlideIndex == 3 && al)
               {
                   console.log(id);
                   $.ajax({url: "http://blmani.com/wp-json/aniparti/vupdate",type:"POST",data:{id:id}, success: function(result){
                       console.log(result);
                       al = false;
                     }});
               }
                console.log(e.totalSlides, e.currentSlideIndex);
             ' ;
            }
           
                if($toshow)
                {
                echo 'if (e.currentSlideIndex >= e.totalSlides) { 
               
                console.log("last slide appeared"); 
                $(".next-appisode-btn").addClass("active"); 
                } 
                else 
                { $(".next-appisode-btn").removeClass("active"); }';
            }
            echo '}, false);';
                echo '
                $(".next-appisode-btn").click(function(){ 
                    console.log("clicked"); 
                    window.location.replace("/com/index.php?id='.$nid.'&token='.$_GET["token"].'"); 
                    });'?>
        //     window.makeAnipartiViewer(elm2, { resourceUrl: window.location.href.substr(0, document.URL.lastIndexOf('/')) }).viewer.loadContent();
        //     window.addEventListener("aniparti_slide_change", function (e) {
        //             console.log(e.totalSlides, e.currentSlideIndex);
        //             if (e.currentSlideIndex >= e.totalSlides) {
        //                 console.log("last slide appeared");
        //                 $(".next-appisode-btn").addClass("active");

        //             }
        //             else
        //             {
        //                 $(".next-appisode-btn").removeClass("active");
        //             }
        //         }, false);
        
        //         $(".next-appisode-btn").click(function(){
        //     console.log("clicked");
        //     window.location.replace("http://blmani.com/com/index.php?id=<?php echo $nid?>");
        // });
        // setTimeout(function(){ 
        //         $.getScript('cordova.js', function() {
        //         console.log('cordova loaded');
        //     });
        //      }, 5000);
       // parent.postMessage('http;','*');
            };
                

    </script>
</head>
<a href="javascript:;" class="next-appisode-btn"><?php echo $btext;?><i class="la la-long-arrow-right"></i></a>
<body style="overflow:hidden;padding:0;margin:0">
    <div id="htmlViewer" style="position:relative;width:100%;height:100%;"></div>
</body>

</html>

