<!DOCTYPE html>
<html>
<head>
<!-- <meta name="viewport" content="width=device-width, initial-scale=1"> -->
<meta charset="utf-8" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="msapplication-tap-highlight" content="no" />
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width" /> 
       <title>Aniparti Viewer</title>
       <?php
       require_once( dirname(__DIR__) . '/wp-load.php');
       $content =  get_post_field('post_content', $_GET["id"]);
       global $polylang;
       $epno=  get_post_meta($_GET["id"],"epno",true);
       $p_type = get_post_meta($_GET["id"],"post_type",true);
       $plang = pll_get_post_language($_GET["id"]);
      
       $parid = wp_get_post_parent_id($_GET["id"]);
       $image="";
       if (has_post_thumbnail($_GET["id"])) {
           $image = wp_get_attachment_image_src(get_post_thumbnail_id($_GET["id"]),array(206,206));
            $image= $image[0];
           
       }
       $post = get_post($_GET["id"]);
       if($des = get_post_meta($_GET["id"],"prodes",true))
       {
        $des = $des;
       }
       else
       {
        $des = "";
       }
       

    echo '
    <meta name="twitter:image" content="'.$image.'">
    <meta property="og:type"               content="article" />
    <meta property="og:title"              content="'.$post->post_title.'" />
    <meta property="og:description"        content="'.$des.'" />
    <meta property="og:image"              content="'.$image.'" />
';
    ?>
<style>
.passpr
{
    width: 40%;
    margin: 0 auto;
    margin-top: 10%;
}
body
{
    font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
    overflow:hidden;padding:0;margin:0;
    text-align: center;
}
* {
    box-sizing: border-box;
}

input[type=text], select, textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
}

label {
    padding: 12px 12px 12px 0;
    display: inline-block;
}

input[type=submit],button[type=submit] {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    padding: 14px 40px;
    margin-top: 10px;
    background: #e15c42;
    color: white;
    border-radius: 30px;
  /* margin-top:10px !important; 
    background-color: #f74c4c;
    color: white;
    padding: 12px 20px; */
    border: none;
    /* border-radius: 4px; */
    cursor: pointer;
    /* float: right; */
}

input[type=submit]:hover {
    background-color: #f74c4c;
}

.container {
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
}

.col-25 {
    /* float: left; */
    width: 25%;
    margin: 0 auto;
}

.col-75 {
    /* float: left; */
    width: 75%;
    margin: 0 auto;
}

/* Clear floats after the columns */
.row:after {
    content: "";
    display: table;
    clear: both;
}

/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
    .passpr
{
    width: 90%;
    margin: 0 auto;
    margin-top: 10%;
}
    .col-25, .col-75, input[type=submit],button[type=submit] {
        width: 60%;
        margin-top: 10;
    }
}
</style>
<?php 


if($p_type == 2 || $p_type == 3)
{
  
    $pri = get_post_meta($_GET["id"],"privacy",true);
    
    if (strpos($pri, 'a') !== false) {
        // return str_replace('a','',$value[0]);
        $pri= str_replace('a','',$pri);
        
        //str_replace('a','',$value[0]);
     }
    
    if($pri == 3)
    {
      echo "<script type='text/javascript'>alert('Sorry you cannot view private content');</script>";
      die();
    }
    if($pri == 4) 
    { 
      if($_POST["value"])
       {
       if( get_post_meta($_GET["id"],"privacykey",true) != $_POST["value"])
       {
           if($plang == 'en')
           {
       echo ' 
       <div class="passpr">
       
       <div class="container"> 
       <img style="    margin: 20px;width: 70%;" src="http://blmani.com/logo-small-pass-bgchange.png">  
       <p>This content is password protected, please enter correct passcode below to view the content.</p> 
       <form action="" method="post"> 
       <div class="row"> <div class="col-25">
        </div> <div class="col-75">
         <input type="text" id="fname" name="value" placeholder="">
          </div> </div> <div class="row"> 
          <input type="submit" value="Submit"> 
          </div> </form> </div>
          </div>'; 
        }
        else if($plang == 'ko')
        {
            echo ' 
            <div class="passpr">
           
            <div class="container"> 
            <img style="    margin: 20px;width: 70%;" src="http://blmani.com/logo-small-pass-bgchange.png">  
            <p>이 콘텐츠는 비밀번호로 잠겨있습니다. 콘텐츠를 보려면 아래에 비밀번호를 입력해주세요.</p> 
            <form action="" method="post"> 
            <div class="row"> <div class="col-25">
             </div> <div class="col-75">
              <input type="text" id="fname" name="value" placeholder="">
               </div> </div> <div class="row"> 
               <button name="submit" value="Submit" type="submit">열기</button>
            
               </div> </form> </div></div>'; 
        }
        else if($plang == 'zh')
        {
            echo ' 
            <div class="passpr">
            <div class="container"> 
            <img style="    margin: 20px;width: 70%;" src="http://blmani.com/logo-small-pass-bgchange.png">  
            <p>此内容受密码保护，请在下方输入正确的密码以查看内容。</p> 
            <form action="" method="post"> 
            <div class="row"> <div class="col-25">
             </div> <div class="col-75">
              <input type="text" id="fname" name="value" placeholder="">
               </div> </div> <div class="row"> 
               <button name="submit" value="Submit" type="submit">提交</button>
               </div>
               </div> </form> </div>'; 
        }
        die();
      }
      else{
        if($p_type == 2)
        {
            echo "<script type='text/javascript'>window.location.replace('".$content."');</script>";
           // echo '<iframe frameborder="0" allowfullscreen style="position:fixed; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;" src="'.$content.'"></iframe>';
            die();
        }
       // echo "true"; comic runs
      }
// <label for="fname">PassCode: </label> 
        } 
    else{
        if($plang == 'en')
        {
            echo ' 
            <div class="passpr">
            
            <div class="container"> 
            <img style="    margin: 20px;width: 70%;" src="http://blmani.com/logo-small-pass-bgchange.png">  
            <p>This content is password protected, please enter correct passcode below to view the content.</p>
            <form action="" method="post"> 
            <div class="row"> <div class="col-25">
           
            </div> <div class="col-75">
            <input type="text" id="fname" name="value" placeholder="">
            </div> </div> <div class="row"> 
            <input type="submit" value="Submit"> 
            </div> </form> </div>
            </div>'; 
     }
     else if($plang == 'ko')
     {
        echo ' 
            <div class="passpr">
           
            <div class="container"> 
            <img style="    margin: 20px;width: 70%;" src="http://blmani.com/logo-small-pass-bgchange.png">  
            <p>이 콘텐츠는 비밀번호로 잠겨있습니다. 콘텐츠를 보려면 아래에 비밀번호를 입력해주세요.</p> 
            <form action="" method="post"> 
            <div class="row"> <div class="col-25">
             </div> <div class="col-75">
              <input type="text" id="fname" name="value" placeholder="">
               </div> </div> <div class="row"> 
               <button name="submit" value="Submit" type="submit">열기</button>
            
               </div> </form> </div></div>'; 
     }
     else if($plang == 'zh')
     {
        echo ' 
        <div class="passpr">
        <div class="container"> 
        <img style="    margin: 20px;width: 70%;" src="http://blmani.com/logo-small-pass-bgchange.png">  
        <p>此内容受密码保护，请在下方输入正确的密码以查看内容。</p> 
        <form action="" method="post"> 
        <div class="row"> <div class="col-25">
         </div> <div class="col-75">
          <input type="text" id="fname" name="value" placeholder="">
           </div> </div> <div class="row"> 
           <button name="submit" value="Submit" type="submit">提交</button>
           </div>
           </div> </form> </div>'; 
     }
         die(); } }
         else if($pri == 1)
         {
            if($p_type == 2)
            {
                echo "<script type='text/javascript'>window.location.replace('".$content."');</script>";
               // echo '<iframe frameborder="0" allowfullscreen style="position:fixed; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;" src="'.$content.'"></iframe>';
                die();
            }
         }
}
else
{
     if(get_post_meta($parid,"post_type",true) == 1)
     {
     // echo get_post_meta($parid,"privacy",true);
     }
}

$epno= $epno+1;
//var_dump($epno);

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
}

//var_dump($count);
//die();
//var_dump($featured) ;

//wp_enqueue_script('jquery');
//echo $content;
//die();
?>
   
  
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
    <script src="http://blmani.com/com/aniparti-viewer-light.min.js?5b0200sd123sdaasdaa66e016"></script>
    <script src="http://blmani.com/com/aniparti-viewer-light-extras.js?5b02as00a66e016"></script>
    <script>
        window.onload = function () {
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
            window.makeAnipartiViewer(elm2, { resourceUrl: window.location.href.substr(0, document.URL.lastIndexOf("/")) }).viewer.loadContent('<?php echo base64_decode($content); ?>');
            <?php 
            if($toshow)
            echo ' window.addEventListener("aniparti_slide_change", function (e) { console.log(e.totalSlides, e.currentSlideIndex); if (e.currentSlideIndex >= e.totalSlides) { console.log("last slide appeared"); $(".next-appisode-btn").addClass("active"); } else { $(".next-appisode-btn").removeClass("active"); } }, false); $(".next-appisode-btn").click(function(){ console.log("clicked"); window.location.replace("http://blmani.com/com/index.php?id='.$nid.'"); });'?>
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

            };
                

    </script>
</head>
<a href="#" class="next-appisode-btn">Next Episode <i class="la la-long-arrow-right"></i></a>
<body>
    <div id="htmlViewer" style="position:relative;width:100%;height:100%;"></div>
</body>

</html>

