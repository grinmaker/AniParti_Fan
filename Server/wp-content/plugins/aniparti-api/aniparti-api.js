// jQuery(".editop").click(function(){
  
//     })

// jQuery(document).on("click",".editop",function(){

//     console.log(jQuery(this).parent().find(".tags").html());
//     jQuery(".editcurr").html(jQuery(this).parent().find(".tags").html());
// })

var current ;

    jQuery(document).ready( function($) {

        // jQuery(document).on("click",".editop",function() {
        //     alert("click bound to document listening for #test-element");
        // });
        console.log("aniparti js loaded");
        jQuery(".editop").click(function(){
            console.log("clicked");
            console.log(jQuery(this).parent().find(".tags").html());
             jQuery("#TB_overlay,#TB_window").show();
            var id = jQuery(this).parent().find(".tags").data("id");
            jQuery(".editcurr").val(jQuery(this).parent().find(".tags").html());
            jQuery("#repo_id").val(id);
            current = jQuery(this);
            });

            jQuery(document).on('click', '#submittags', function (evt) {
                if(jQuery("#newtags").val().length < 1)
                {
                    jQuery("#newtags").css("border","1px solid red");
                    return;
                }
                var tags = jQuery("#newtags").val();
                var form_data = new FormData();
                var id = jQuery("#repo_id").val();
                form_data.append('action', 'md_tags_update');
                form_data.append('tags',tags );
                form_data.append('id',id );
                current.parent().find(".tags").html(tags);
               // form_data.append('pid', jQuery(this).data('pid'));
                 jQuery.ajax({
                        url: 'http://blmani.com/aniparti_fan/wp-admin/admin-ajax.php',
                        type: 'post',
                        contentType: false,
                        processData: false,
                        data: form_data,
                        
                        success: function (response) {
                           
                            if(response == 'success')
                            {
                                jQuery("#TB_overlay,#TB_window").fadeOut();
                                jQuery("body").css("overflow","auto");
                                console.log(response);
                               
            
                         
                            }
                           
                        },  
                        error: function (response) {
                         console.log(response);
                        },
                       
                
                    });
            
            
            });

    });