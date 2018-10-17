var postInfo = window.localStorage.getItem('postInfo') ? JSON.parse( window.localStorage.getItem('postInfo')) : null;

if(postInfo){

    $('#post-title').text(postInfo.post_title);
    $('#author-name').text(postInfo.author_name);
    $('#author-img').attr('src',postInfo.author_pic);
    $('#post-image').css('background-image',"URL('"+postInfo.latesturl+"')");
}


   
$(document).on('click','.send-btn-comment',function(){
    var comment = $('#comment-content').val();
   
    if($.trim(comment).length > 0){
        var userInfo = Blmani.Session.getInstance().get();
        var payload = {comment_post_ID:postInfo.ID,comment_content:$.trim(comment),uid:session.uid};
        $.ajax({
            url:'http://blmani.com/wp-json/aniparti/addComment_ex',
            method:'post',
            data:payload,
            dataType:'json',
            beforeSend: function(){
                    $('.loading-gif-centered').removeClass('hideit');
            },
            success: function(resp){
                $('.loading-gif-centered').addClass('hideit');
                console.log('comment response',resp);
                if(resp.status == 'success'){
                    $('#comment-content').val('');
                    $('#toast-comment-added').show();
                    var html = '<li><img src="'+userInfo.user_pic+'" alt=""><div class="comment-item"><div class="sender-name"><strong>'+userInfo.user_nicename+'...</strong>  '+$.trim(comment)+'</div><div class="comment-time">just now</div></div></li>';
                    $('.comments-list').append(html);
                }else{
                    $('#toast-comment-error').show();
                }
            }

        });
    }else{
        $('#toast-addContent').show();
    }
});

var getComments = function(){
    var payload = {post_id:postInfo.ID};
    $.ajax({
        url:'http://blmani.com/wp-json/aniparti/getPostComments_ex',
        method:'post',
        data:payload,
        dataType:'json',
        beforeSend: function(){
                $('.loading-gif-centered').removeClass('hideit');
        },
        success: function(resp){
            $('.loading-gif-centered').addClass('hideit');
            console.log(resp);
            if(resp.status == 'success'){
                if((resp.data).length){
                    $.each(resp.data,function(k,comment){
                        var time = moment(comment.comment_date).fromNow();
                        var html = '<li><img src="'+comment.author_pic+'" alt=""><div class="comment-item"><div class="sender-name"><strong>'+comment.comment_author+'...</strong>  '+comment.comment_content+'</div><div class="comment-time">'+time+'</div></div></li>';
                        $('.comments-list').append(html);
                    });
                   
                }
            }else{
                $('#toast-comment-error').show();
            }
        }

    });
};

$(document).ready(function(){
    getComments();
});