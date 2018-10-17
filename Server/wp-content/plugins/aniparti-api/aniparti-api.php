<?php 
/*
Plugin Name: Aniparti
Plugin URI: aniparti.com
Description: Plugin for AniParti applications
Version: 1.2
Author: Jahanzaib
Text Domain: my-plugin
Author URI: http://aniparti.com
License: GPL2
 */
function my_enqueue($hook)
{
    // Only add to the edit.php admin page.
    // See WP docs.
    // if ('edit.php' !== $hook) {
    //     return;
    // }
    wp_enqueue_script('my_custom_script', plugin_dir_url(__FILE__) . '/aniparti-api.js');
}

add_action('admin_enqueue_scripts', 'my_enqueue');

add_action('admin_menu', 'tags_managment');
function tags_managment()
{
    add_menu_page('Manage content tags', 'Manage content tags', 'manage_options', 'aniparti-manage-tags', 'aniparti_manage_tags', '', 3);
}
add_action('wp_ajax_md_tags_update', 'md_tags_update');
add_action('wp_ajax_nopriv_md_tags_update', 'md_tags_update');
function md_tags_update(){
if(isset($_POST["tags"]))
{
    global $wpdb;
    $result = $wpdb->update('aniparti_repo', [
        'tags' => $_POST["tags"],
    ], array('id' => $_POST["id"]));
    if($result === FALSE)
    {
        echo "failed";die();
    }else{echo "success";die();}
}
}
function aniparti_manage_tags()
{
    global $wpdb;
    add_thickbox();
   $result = $wpdb->get_results("SELECT * FROM aniparti_repo WHERE type IN (14200,14120,14110,14130,14100,14140)");
   echo '<div class="imgdiv">';
    //var_dump($result);
   foreach($result as $item) {
       $content = json_decode($item->content);
      // var_dump();
    //    echo '<div>'.$item->url.'</div>';
  echo '<div style="float:left;    margin: 10px;border: 1px solid;width:210px;height:250px;">
  <div style="max-height:200px;min-height:200px;position:relative;"><img style="max-height: 200px;width: 100%;" src="http://blmani.com/aniparti_fan/com/'.$content->url.'"></div>
  <span style="display:block;margin-top:15px;"><span style="display: inherit;
  text-align: center;
  font-size: 15px;
  text-align: left;float:left;margin:5px;" data-id="'.$item->id.'" class="tags" >'.$item->tags.'</span><a  style="float:right;margin:5px;" href="#TB_inline?width=400&height=350&inlineId=modal-window-id"  class="thickbox editop"><span class="dashicons dashicons-admin-customizer"></span></a></span></div>';
}
echo '</div >';
echo '

<div id="modal-window-id" style="display:none;">
<div style="    text-align: center;
font-size: 20px;
margin-top: 50px;">
  
   <div style="margin:10px;">Tags: <input style="font-size:18px;" class="editcurr" type="text" id="newtags" name="newtags" placeholder="Enter new tags here"></div>
   <div style="margin:10px;"><input id="repo_id" type="hidden" name="repo_id" value=""> <input style="width: 100px;height: 45px;" id="submittags" type="button" name="submittags" value="Save"></div>
   <div style="margin:10px;">Comma seperate your tags, if you want to set multiple tags.</div>
</div>
   </div>';
// echo '<div>Hello</div>'; <div style="margin:10px;">Current Tags: <span class="editcurr"></span></div>
}

function _TIME()
{
    return (time() * 1000);
}
function aniparti_register_routes()
{
    register_rest_route('/aniparti/', 'get_repo', array(
        'methods' => 'POST',
        'timeout' => apply_filters('http_request_timeout', 30),
        'callback' => 'get_repo',
    ));
    register_rest_route('/aniparti/', 'delete_repo', array(
        'methods' => 'POST',
        'timeout' => apply_filters('http_request_timeout', 30),
        'callback' => 'delete_repo',
    ));
    register_rest_route('/aniparti/', 'save_repo', array(
        'methods' => 'POST',
        'timeout' => apply_filters('http_request_timeout', 30),
        'callback' => 'save_repo',
    ));
    register_rest_route('/aniparti/', 'search_repo', array(
        'methods' => 'POST',
        'timeout' => apply_filters('http_request_timeout', 30),
        'callback' => 'search_repo',
    ));
    register_rest_route('/aniparti/', 'post_assets', array(
        'methods' => 'POST',
        'timeout' => apply_filters('http_request_timeout', 30),
        'callback' => 'post_assets',
    ));
  
    register_rest_route('/aniparti/', 'upload_image', array(
        'methods' => 'POST',
        'timeout' => apply_filters('http_request_timeout', 30),
        'callback' => 'upload_image',
    ));
   
    register_rest_route('/aniparti/', 'get_repobyuser', array(
        'methods' => 'POST',
        'timeout' => apply_filters('http_request_timeout', 30),
        'callback' => 'get_repobyuser',
    ));
    register_rest_route('/aniparti/', 'upload_asset', array(
        'methods' => 'POST',
        'timeout' => apply_filters('http_request_timeout', 30),
        'callback' => 'upload_asset',
    ));
  
   
    register_rest_route('/aniparti/', 'save_wiz_content', array(
        'methods' => 'POST',
        'timeout' => apply_filters('http_request_timeout', 30),
        'callback' => 'save_wiz_content',
    ));
    register_rest_route('/aniparti/', 'get_save_wiz_content', array(
        'methods' => 'POST',
        'timeout' => apply_filters('http_request_timeout', 30),
        'callback' => 'get_save_wiz_content',
    ));
    register_rest_route('/aniparti/', 'upload_datato_image', array(
        'methods' => 'POST',
        'timeout' => apply_filters('http_request_timeout', 30),
        'callback' => 'upload_datato_image',
    ));
    register_rest_route('/aniparti/', 'get_atags', array(
        'methods' => 'POST',
        'timeout' => apply_filters('http_request_timeout', 30),
        'callback' => 'get_atags',
    ));
    register_rest_route('/aniparti/', 'top_keys', array(
        'methods' => 'POST',
        'timeout' => apply_filters('http_request_timeout', 30),
        'callback' => 'top_keys',
    ));
}
add_action('rest_api_init', 'aniparti_register_routes');
function top_keys(WP_REST_Request $request){
    global $wpdb;
  
    $sql = "SELECT tg.tag,count(rp.id) as tags_count FROM `aniparti_tags` tg,`aniparti_repo` rp WHERE ";
    if($request['type'])
    {
       $sql .="rp.type = ".$request['type']." AND ";
    }
    $sql .= " concat(',', rp.tags,',') like concat(',%', tg.tag,'%,') group by tg.tag order by tags_count desc LIMIT 0,6";
  
     $results = $wpdb->get_results($sql);
     return $results;

}
function get_atags(WP_REST_Request $request){
    if( $request["term"])
    {
    global $wpdb;
    $sql = "SELECT tag FROM aniparti_tags WHERE tag LIKE '".$request["term"]."%'";
    //return $sql;
    $results = $wpdb->get_results($sql,ARRAY_N);
    }
    if($results)
    {
        $list=array();
        foreach($results as $v) {
            array_push($list, $v[0]);
        }
return $list;
    }
  
    else 
    return "nrf";
}

function upload_datato_image(WP_REST_Request $request)
{
    if($request["base64img"]){
        $data = explode( ',',$request["base64img"] );
        //return $data[1];
        $filename_path = md5(time().uniqid()); 
        $decoded=base64_decode($data[1]); 
        //return $decoded;
        file_put_contents(ABSPATH . '/assets/' .$filename_path ,$decoded);
        return '/assets/'.$filename_path;
    }
    else{
        return (false);
    }
    

    // if (isset($_FILES["image"])) {
    //     $file = $_FILES['image']['tmp_name'];
    //     $key = str_replace('php', uniqid(), basename($file, '.tmp'));

    //     if (isset($_GET["key"])) {
    //         $key = $_GET["key"];
    //     }

    //     if (move_uploaded_file($file, ABSPATH . '/com/assets/' . $key . '.png')) {
    //         return 'http://blmani.com/com/assets/' . $key . '.png';
    //     } else {

    //     }

    // }

    // return (false);
}
function get_save_wiz_content(WP_REST_Request $request)
{
    //return   $request["tags"];
    if(true)
    {
            global $wpdb;
            if($request["type"])
            {
            $sql = 'SELECT * FROM `aniparti_repo` WHERE type= "'.$request["type"].'"';
            if($request["tags"])
            {
                $sql .='AND tags LIKE "%'.$request["tags"].'%"';
            }
            }
            else{
                $sql = 'SELECT * FROM `aniparti_repo`';
            }
           //return $sql ;
           return   $wpdb->get_results($sql);
           
            //return "sucess";
    }
    else{
        return "error";
    }
}
function save_wiz_content(WP_REST_Request $request)
{
    //return   $request["parent"];
    if($request["repo_url"] && $request["type"])
    {   
        $parentid = "";
        if($request['par'])
        $parentid = $request['par'];
        //return $parentid;
            global $wpdb;
            $id = base_convert(_TIME(), 10, 32) . uniqid();
            $wpdb->insert('wiz_repo', [
                'id' => $id,
                'pid'=> $parentid,
                'user_id' => 1,
                'tags' =>  $request["tags"] ,
                'repo_path' => $request['repo_url'],
               
                'type' => $request['type'] ,
                'created_date' =>  _TIME(),
            ]);
            //return $wpdb->last_query;
            return $id;
    }
    else{
        return "error";
    }
}
function post_assets_to_url($url, $files)
{
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, array('list' => implode('|', $files)));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $result = curl_exec($ch);
    $transferCount = 0;
    if (strlen($result) > 0) {
        $require_files = explode('|', $result);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: multipart/form-data'));
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        //$result=array();

        foreach ($require_files as $file) {

            curl_setopt($ch, CURLOPT_POSTFIELDS,
                array('file' => curl_file_create(ABSPATH . $file, 'image/png', $file)));
            $transferCount++;
            curl_exec($ch);

        }
    }

    curl_close($ch);

    //return($result);

    return ($transferCount . ' files transfered');
}
function upload_asset($json)
{
    
    if (isset($_FILES["file"])) {
       
        $file = $_FILES['file']['tmp_name'];
        $key = str_replace('php', uniqid(), basename($file, '.tmp'));

        if (isset($_GET["key"])) {
            $key = $_GET["key"];
        }
        
        if (move_uploaded_file($file, ABSPATH . '/com/assets/' . $key)) {
            return '/assets/' . $key;
        } else {

        }

    }
    
    return (false);
   
}
function get_repobyuser($data)
{
    // Do something with the $request
    //echo "hellow";
    // Return either a WP_REST_Response or WP_Error object
    //$temp =$data['auth_key'];
    //$user_id = $GLOBALS['wpdb']->get_results( 'SELECT ID FROM awp_users WHERE auth_key = "'.$temp.'"', OBJECT );
    //return $request['user_id'];
    //if(!array_key_exists ('user_id' ,$data ))
    //{return "Please Provide user id";}
    //var_export($data);
    //return new WP_Error( 'rest_no_event_date', __('id: is ' ));

    // return $data['id'];
    //   $repo = $GLOBALS['wpdb']->get_results('SELECT * FROM aniparti_repo WHERE user_id = "' . $data['id'] . '"', OBJECT);
    $query = 'SELECT `id`, `user_id`, `name`, `description`, `created_date`, `modified_date`,`pub_flag` FROM `aniparti_repo` WHERE user_id =' . $data['id'] . ' ORDER BY modified_date DESC';
    //return $query;
    $repo = $GLOBALS['wpdb']->get_results($query, OBJECT);

    //return (int)$post_id[0]['post_id'];

    // add_post_meta($post_ID, "id", $data['repo_id']);
    //$attachment_id = media_handle_upload( $repo[0]->repo_path, $post_ID );
    // Insert the post into the database.
    foreach ($repo as $item) {
        // return $item->created_date;
        $epochcd = $item->created_date;
        $epochmd = $item->modified_date;
        $timestamp = (int) substr($epochcd, 0, -3);
        $timestampmd = (int) substr($epochmd, 0, -3);
        $item->created_date = date('d-m-Y', $timestamp);
        $item->modified_date = date('d-m-Y', $timestampmd);
        //return $repo["created_date"] = $dt->format('Y-m-d H:i:s');
    }
    return $repo;
}
function get_repo($data)
{
    // Do something with the $request
    //echo "hellow";
    // Return either a WP_REST_Response or WP_Error object
    //$temp =$data['auth_key'];
    //$user_id = $GLOBALS['wpdb']->get_results( 'SELECT ID FROM awp_users WHERE auth_key = "'.$temp.'"', OBJECT );
    //return $request['user_id'];
    //if(!array_key_exists ('user_id' ,$data ))
    //{return "Please Provide user id";}
    //var_export($data);
    //return new WP_Error( 'rest_no_event_date', __('id: is ' ));

    // return $data['id'];
    $repo = $GLOBALS['wpdb']->get_results('SELECT * FROM aniparti_repo WHERE id = "' . $data['id'] . '"', OBJECT);

    //return (int)$post_id[0]['post_id'];

    // add_post_meta($post_ID, "id", $data['repo_id']);
    //$attachment_id = media_handle_upload( $repo[0]->repo_path, $post_ID );
    // Insert the post into the database.

    return $repo[0];
}
function delete_repo($data)
{
    // Do something with the $request
    //echo "hellow";
    // Return either a WP_REST_Response or WP_Error object
    //$temp =$data['auth_key'];
    //$user_id = $GLOBALS['wpdb']->get_results( 'SELECT ID FROM awp_users WHERE auth_key = "'.$temp.'"', OBJECT );
    //return $request['user_id'];
    //if(!array_key_exists ('user_id' ,$data ))
    //{return "Please Provide user id";}

    $repo = $GLOBALS['wpdb']->get_results('DELETE FROM aniparti_repo WHERE id = "' . $data['repo_id'] . '"', OBJECT);

    //return (int)$post_id[0]['post_id'];

    // add_post_meta($post_ID, "id", $data['repo_id']);
    //$attachment_id = media_handle_upload( $repo[0]->repo_path, $post_ID );
    // Insert the post into the database.

    return $repo;
}

function save_repo($json)
{
    global $wpdb;
    // Do something with the $request
    //echo "hellow";
    // Return either a WP_REST_Response or WP_Error object
    //$temp =$data['auth_key'];
    //$user_id = $GLOBALS['wpdb']->get_results( 'SELECT ID FROM awp_users WHERE auth_key = "'.$temp.'"', OBJECT );
    //return $request['user_id'];
    //if(!array_key_exists ('user_id' ,$data ))
    //{return "Please Provide user id";}
    //$current_user = wp_get_current_user();
    //var_export($current_user);

    //return 'id is : '.$user_ID;
    // return new WP_Error( 'rest_no_event_date', __('id: is '.$id  ));
    $user_id = $json['user_id'];

    $id = "";

    if (array_key_exists('team_id', $json)) {
        $user_id = $json['team_id'];
    }
    $wpdb->show_errors = true;
    //return $json['id'];
    if ($json['id']) {
        $id = $json['id'];
        $wpdb->update('aniparti_repo', [
            'name' => $json['name'],
            'tags' => $json['tags'] ?? "",
            'user_id' => $user_id,
            'description' => $json['description'],
            'content' => $json['content'],
            'status' => $json['status'],
            'scope' => $json['scope'],
            'repo_path' => $json['repo_path'] ?? "",
            'ref_key' => $json['ref_key'] ?? "",
            'type' => $json['type'],
            'modified_date' => _TIME()], array('id' => $id));
        //   /  exit( var_dump( $wpdb->last_query ) );
    } else {

        $id = base_convert(_TIME(), 10, 32) . uniqid();
        $wpdb->insert('aniparti_repo', [
            'id' => $id,
            'user_id' => $user_id,
            'name' => $json['name'],
            'tags' => $json['tags'] ?? "",
            'description' => $json['description'],
            'content' => $json['content'],
            'scope' => $json['scope'],
            'repo_path' => $json['repo_path'] ?? "",
            'ref_key' => $json['ref_key'] ?? "",
            'type' => $json['type'],
            'created_date' => _TIME(),
            'modified_date' => _TIME(),
        ]);
        //$lastid = $wpdb->insert_id;
    }
    //  return $lastid;
    //$repo = $GLOBALS['wpdb']->get_results( 'DELETE FROM aniparti_repo WHERE id = "'.$data['repo_id'].'"', OBJECT );

    //return (int)$post_id[0]['post_id'];

    // add_post_meta($post_ID, "id", $data['repo_id']);
    //$attachment_id = media_handle_upload( $repo[0]->repo_path, $post_ID );
    // Insert the post into the database.

    return (['success' => true, 'id' => $id, 'time' => _TIME()]);
}
function search_repo($data)
{

    // return $data["user_id"];
    $id = $data["user_id"];
    //return $id;
    // return new WP_Error( 'rest_no_event_date', __( "data is : ". $id), array( 'status' => 401 ) );
    $json = $data;

    $start = 0;

    $fields = 'ap.id as id,name,description, tags,created_date,modified_date,type,scope,repo_path,ref_key, ap.status,u.user_login username ';

    if (isset($json['fetchContent'])) {
        if ($json['fetchContent']) {
            $fields .= ',content';
        }

        // echo $json['fetchContent'];

    }
    if ($json['restrict']) {
        $user_id = $json['restrict'];
    }
    $sql = 'SELECT ' . $fields . ' FROM aniparti_repo ap,wp_users u  WHERE ap.user_id=u.id  ';

    $binds = [];

    if (!empty($json['filter'])) {
        
        
        // var_dump($json['filter']);
        // return new WP_Error( 'rest_no_event_date', __('sql: is '  ));

        foreach ($json["filter"] as $key => $value) {
            if ($key == ':user_id') {
                $binds[$key] = $id;
            } else {
                $binds[':' . $key] = "`" . $value . "`";
                //$sql.=' AND '.$key.'='."`".$value."`";
            }
            
            $gonit = true;
         
            if($key == "type" && $value == 0)
            {
                $sql .= 'AND ap.type != 14121 AND ap.type IN (14200,14120,14110,14130,14100,14140)';
               
                $gonit = false;
               // return $sql;
            }
            else if($key == "type" && $value != 0){
                $sql .= ' AND ' . $key . '=' . "'" . $value . "'";
            }
            if($key == "tags")
            {
                if($value)
                { 
                    // $str = implode("','", $value) . "'";
                    // return $str;
                    foreach($value as $tag){
                        // return $value;
                        $sql .= " AND FIND_IN_SET('".$tag."',REPLACE(tags,' ',''))";
                      
                     //   $sql .= ' AND ' . $key . ' LIKE ' . '",%'.$tag.'%,"';   AND FIND_IN_SET("man", tags)
                    }
                    //return $sql;
                  //  $sql .= ' AND ' . $key . ' IN ' . "('" . $str. ")";
                }
                $gonit = false;
               //return  $sql;
            }
            else if( $gonit ){
                $sql .= ' AND ' . $key . '=' . "'" . $value . "'";
            }
            if ($key == "type" && ($value == 100 || $value == 105 || $value == 1500 || $value == 1000 || $value == 2500)) {

               
                $binds[':user_id'] = $id;
                $sql .= ' AND ap.user_id=' . $id;
                // $sql .= ' AND ap.type=' . $value;
               
            }
        }
    }
   //return $sql;
    if (array_key_exists('restricted', $json)) {
        $binds[':user_id'] = $user_id;
        $sql .= ' AND ap.user_id=' . $id;
    }
    //return $json["user_id"];
    if ($json["search"]) {
        //  return "search exits";
        foreach ($json["search"] as $key => $value) {
            $binds[':' . $key] = $value;
            $sql .= ' AND ' . $key . ' like "' . $value . '"';
        }
    }
    $sql .= ' ORDER BY modified_date DESC ';
    //return  gettype ($json);
    if ($json['limit'] ) {
        if( $json['limit']['start'])
        {
            $sql .= 'LIMIT '.$json['limit']['count'].' OFFSET '.$json['limit']['start'];
        }
        else if($json['limit']['count']){
            $sql .= 'LIMIT '.$json['limit']['count'];
        }
       // return "limit ex";

    //     $start = intval($json['limit']['start']);
    //     $binds[':start'] = $start;
    //     $binds[':count'] = intval($json['limit']['count']);
    //    $sql .= ' limit ' . $start . ',' . intval($json['limit']['count']);
    //$sql .= ' start 2' ; 
    }
    //return var_export($data);
    // return new WP_Error( 'rest_no_event_date', __('sql: is '.$sql  ));
    // echo $GLOBALS['wpdb']->prepare(sql);
    // return $sql;
    //return $sql;
    $data = $GLOBALS['wpdb']->get_results($sql);
    //return ;
    // if($data)
    // {
    //     foreach ($data  as $key => $value)
    //     {
    //         $data[$key]->size =   (int)(filesize(ABSPATH."com/".$value->repo_path)/1000);
    //     }
    // }
    //return filesize(ABSPATH."com/".$data[0]->repo_path);
    return ['data' => $data];
}
function post_assets($json)
{

    $assets = $json["assets"];
    $urls = $json["urls"];

    $response = array();

    $files = array();

    if (array_key_exists('images', $assets)) {
        foreach ($assets["images"] as $key => $value) {
            $files[] = $key;
        }
    }

    if (array_key_exists('sounds', $assets)) {
        foreach ($assets["sounds"] as $key => $value) {
            $files[] = $key;
        }
    }

    foreach ($urls as $url) {
        $response[] = array('url' => $url, 'res' => $this->post_assets_to_url($url, $files));

    }
    return ['$files' => $files, '$response' => $response];
}
add_action( 'send_headers', 'send_frame_options_header', 10, 0 );
?>