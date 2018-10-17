var Blmani = Blmani || {};
Blmani.Session = (function () {
    var instance;
    function init() {
        var sessionIdKey = "blmani-session";
        return {
            // Public methods and variables.
            set: function (sessionData) {
                console.log('sesion-data',sessionData);
                window.localStorage.setItem(sessionIdKey, JSON.stringify(sessionData));
            },
            get: function () {
                var result = null;
                try {
                    result = JSON.parse(window.localStorage.getItem(sessionIdKey));
                } catch(e){}
                return result;
            },
            destroy: function(){
				window.localStorage.removeItem(sessionIdKey);
			},			
			
        };
    };
    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
}());
Blmani.Language = (function () {
    var instance;
    function init() {
        var sessionIdKey = "blmani-lang";
        return {
            // Public methods and variables.
            set: function (langid) {
                window.localStorage.setItem(sessionIdKey, langid);
            },
            get: function () {
                var result = null;
                try {
                    result = window.localStorage.getItem(sessionIdKey);
                } catch(e){}
                return result;
            }
        };
    };
    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
}());
$('.back-button-inbox').on('click',function(){
    $('#page-transitions').addClass('back-button-clicked');
    $('#page-transitions').removeClass('back-button-not-clicked');
    window.history.go(-1);
    return false;
})
var data=[];
var user_pic = '';
var hash = window.location.hash.split('=');
var getMessages = function(){
    $('#reply-input').val('');    
    $('.single-conversation').html('');    
    $(".loading-gif").removeClass("hideit");
    console.log('hash',hash[1]);
    var session = Blmani.Session.getInstance().get();
    user_pic = session.user_pic;
    console.log('userpic',user_pic);
    console.log('userpic session',session.user_pic);
    var params = {};
    params['uid'] = session.uid;
    params['thread_id'] = hash[1];
    $.ajax({
        url: "http://blmani.com/wp-json/aniparti/get_threads_ex",
        type: "get",
        data: params,
        dataType: 'json',
        success: function (response) {
            console.log(response);
            $(".loading-gif").addClass("hideit");
            if(response.status=="success"){
                var count = window.localStorage.getItem('NotificationCount') ? parseInt(window.localStorage.getItem('NotificationCount')) : 0;
                if(count >= 1){
                    window.localStorage.setItem('NotificationCount',count -1);
                }
                console.log('threads',response.message);
                data = response.message[0].subject;
                $.each(response.message, function (key, value) {
                    var val = value;
                    var time = val.date_sent; //val.date_sent.split(' ');
                    time = time[1];
                    console.log('time',time);
                    console.log('uid',session.uid);
                    console.log('uid2',val.sender_id);
                    if(val.sender_id == session.uid){
                        $(".single-conversation").append('<div class="message-div"><li class="chat-li from-me"><p>'+val.message+'</p><div class="message-time"><img src="'+user_pic+'" alt="">'+moment(val.date_sent).fromNow()+'</div></li></div>');
                    }else{
                        $(".single-conversation").append('<div class="message-div"><li class="chat-li from-sender"><p>'+val.message+'</p><div class="message-time"><img src="'+val.image_url+'" alt="">'+moment(val.date_sent).fromNow()+'</div></li></div>');
                    }
                });  
                var nav = $('ul#chat li:last');
                if (nav.length) {
                    $("html,body").animate({
                        scrollTop: nav.offset().top
                    });
                }              
            }else{
                console.log('ERROR');                
            }
        },error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
            loginFormSubmitted = "false";
            $(".loading-gif").addClass("hideit");
            return false;
        }
    });
    
    // $('.single-conversation').animate({scrollTop: $('.single-conversation')[0].scrollHeight}, 100);    
}
$('#reply-input').on('keyup', function(){
    if($(this).val()==''){
        $('.reply-msg').addClass('disabled-btn');
    }else{
        $('.reply-msg').removeClass('disabled-btn');
    }
});
$('.reply-msg').on('click',function(){
    var reply = $('#reply-input').val();
    if($.trim(reply).length == 0){
        console.log('blank message');
        return false;

    }

    if($(this).hasClass('disabled-btn')){
        return false;
    }else{
        $('#reply-input').val('');        
        $(".loading-gif-centered").removeClass("hideit");    
        var params = {};
        var session = Blmani.Session.getInstance().get();    
        
        params['message'] = $.trim(reply);
        params['thread_id'] = hash[1];
        params['uid'] = session.uid;
        params['subject'] = data;
        params['date_sent'] = getDateTime('datetime');
        console.log('params',params);
        $.ajax({
            url: "http://blmani.com/wp-json/aniparti/save_replied_messages_ex",
            type: "post",
            data: params,
            dataType: 'json',
            success: function (response) {
                console.log(response);
                $(".loading-gif").addClass("hideit");
                if(response.status=="success"){
                    //getMessages();
                    $(".single-conversation").append('<div class="message-div"><li class="chat-li from-me"><p>'+$.trim(reply)+'</p><div class="message-time"><img src="'+session.user_pic+'" alt="">'+moment().fromNow()+'</div></li></div>');
                    $(".loading-gif-centered").addClass("hideit");
                    $('#reply-input').val('');
                }else{
                    $("#toast-x").html("Error in sending message");
                    $("#toast-x").addClass("show-toast");
                    setTimeout(function(){$("#toast-x").removeClass("show-toast")},2000);
                    $('#reply-input').val('');
                }
            }
        });
    }
    
});
   
$(window).on('load',function(){
    $('#page-build').remove();
    getMessages();
});