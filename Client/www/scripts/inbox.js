
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
var getMsgs = function(){
    $(".thread-list").html('');
    $(".loading-gif").removeClass("hideit");        
    console.log('here');
    var session = Blmani.Session.getInstance().get();
    var params = {};
    params['uid'] = session.uid;
    var xhr = $.ajax({
        url: "http://blmani.com/wp-json/aniparti/get_mesgs_ex",
        type: "get",
        data: params,
        dataType: 'json',
        success: function (response) {
            console.log(response);
            $(".loading-gif").addClass("hideit");
            if(response.status=="success"){
                $('.empty-results').hide();
                console.log('response data',response.data);
                $.each(response.data, function (key, value) {
                    var val = value;
                    console.log('unread_count',val.unread_count);
                    if((session.uid == val.sender_id)&& (val.unread_count > 0)){
                        $(".thread-list").append('<li class="threads unread" data-uid="'+session.uid+'" data-id="'+value.id+'" data-sender-id="'+value.sender_id+'" data-thread-id="'+value.thread_id+'"><div class="srl-right-wrapper"><span class="srl-item-title">'+value.subject+'</span><p>'+val.message+'</p></div><div class="unread-count"><span>'+val.unread_count+'</span></div><span class="message-time-new">'+moment(val.date_sent).fromNow()+'</span></li>');                        
                    }else{
                        $(".thread-list").append('<li class="threads" data-uid="'+session.uid+'" data-id="'+value.id+'" data-sender-id="'+value.sender_id+'" data-thread-id="'+value.thread_id+'"><div class="srl-right-wrapper"><span class="srl-item-title">'+value.subject+'</span><p>'+val.message+'</p></div><span class="message-time-new">'+moment(val.date_sent).fromNow()+'</span></li>');                                                
                    }
                });
                $('.threads').on('click',function(){
                    if($(this).hasClass("item-selected")){
                        $(this).removeClass("item-selected");
                        $("#spost_view").attr("data-uid",0);
                        $("#spost_view").attr("data-id",0);
                        $("#spost_view").attr("data-sender-id",0);
                        $("#spost_view").attr("data-thread-id",0);
                    } else{
                        $(".searched-item").each(function(){
                            $(this).removeClass("item-selected");
                        });
                        $(this).addClass("item-selected");
                        var dUid =$(this).attr("data-uid");
                        var dId =$(this).attr("data-id");
                        var dSenderId = $(this).attr("data-sender-id");
                        var dThreadId = $(this).attr("data-thread-id");
                        window.location="inbox-message.html#id="+dThreadId;
                        // getMessages(dThreadId);
                        $(".loading-gif-centered").removeClass("hideit");
                    }
                    $("#preloader").addClass('hide-preloader');
                    $(".preload-image").lazyload({threshold : 500});
                });
            }else{
                $('.empty-results').show();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
            loginFormSubmitted = "false";
            $(".loading-gif").addClass("hideit");
            return false;
        }
    });
    // xhr.abort();                
}
$('.new-msg').on('click',function(){
    $('.compose-ticket').addClass('active-flyin');
});
$('.send-message').on('click',function(){
    $(".loading-gif").removeClass("hideit");                       
    var subject = $('#new-subject').val();
    var message = $('#new-message').val();
    var session = Blmani.Session.getInstance().get();
    var params = {};
    params['uid'] = session.uid;
    params['subject'] = subject;
    params['messages'] = message;
    params['date_sent'] = getDateTime('datetime');
    console.log(params);
    $.ajax({
        url: "http://blmani.com/wp-json/aniparti/compose_message_ex",
        type: "post",
        data: params,
        dataType: 'json',
        success: function (response) {
            console.log(response);
            $(".loading-gif").addClass("hideit");
            if(response.status=="success"){
                $('#new-subject').text('');
                $('#new-message').text('');
                $('.compose-ticket').removeClass('active-flyin');
                $("#toast-x").html("The message is successfully sent");
                $("#toast-x").addClass("show-toast");
                setTimeout($("#toast-x").removeClass("show-toast"),2000);
                getMsgs();
            }else{
                $("#toast-x").html("Error: Something wrong happen");
                $("#toast-x").addClass("show-toast");
                setTimeout($("#toast-x").removeClass("show-toast"),2000);
                getMsgs();                
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
            loginFormSubmitted = "false";
            $(".loading-gif").addClass("hideit");
            return false;
        }
    }); 
});
$('.cancel-message').on('click',function(){
    $('#new-subject').text('');
    $('#new-message').text('');
    $('.compose-ticket').removeClass('active-flyin');
});

// $(window).on('load',function(){
//     $('#page-build').remove();
//         getMsgs();
// });
