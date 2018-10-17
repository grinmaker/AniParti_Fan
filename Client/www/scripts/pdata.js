

var session = Blmani.Session.getInstance().get();
var params = {};
params['uid'] = session.uid;
$.ajax({
    url: "http://blmani.com/wp-json/aniparti/getuserdata",
    type: "post",
    data: params,
    dataType: 'json',
    success: function (response) {
        console.log(response);
        $(".loading-gif").addClass("hideit");
        if (response.status == "success") {
            session.dob = response.data.dob;
            session.gender = response.data.gender;
            session.user_email = response.data.email;
            session.user_nicename = response.data.nice_name;
            session.user_pic = response.data.user_pic+"?"+Math.random();
            Blmani.Session.getInstance().set(session);
            $('.profile-image').attr("data-src",response.data.user_pic+"?"+Math.random());
            $("#user_profile_pic").attr("data-src",response.data.user_pic+"?"+Math.random());
            $(".preload-image").lazyload({threshold : 100});
         console.log(response.data);
        } else {
            // $('#toast-2').html("" + response.status);
            // $('#toast-2').addClass('show-toast');
            // setTimeout(function () {
            //     $('#toast-2').removeClass('show-toast');
            // }, 2000);
        }
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
        loginFormSubmitted = "false";
        $(".loading-gif").addClass("hideit");
        return false;
    }
});
console.log(session);
if ($("div#menu-1").length) {
    var langid = Blmani.Language.getInstance().get();

    if (!session) {
        $('.user-logined').addClass("hideit");
        if (langid == 1) {
            $('span.lang-flags').html('<img src="images/flag-en.png" alt="En-US">');
        }
        if (langid == 2) {
            $('span.lang-flags').html('<img src="images/flag-ko.png" alt="En-US">');
        }
        console.log("session expired");
    } else {
      var params = {};
      params['uid'] = session.uid;
      $(".loading-gif").removeClass("hideit");
    //   $.ajax({
    //     url: "http://blmani.com/wp-json/aniparti/getuserdata",
    //     type: "post",
    //     data: params,
    //     dataType: 'json',
    //     success: function (response) {
    //         console.log(response);
    //         $(".loading-gif").addClass("hideit");
    //         if (response.status == "success") {
    //           $("li#li_nick_name").html(pScreenObj.mpNickName + ' <strong >(' + response.data.nice_name + ')</strong><a href="#" data-menu="edit-nickname-modal" class="color-red">' + pScreenObj.mpEdit + '</a>');
    //           $("li#li_user_id").html(pScreenObj.mpUserId + ' <strong>(' + response.data.email + ')</strong>');
    //           if (response.data.gender) {
    //               var gender = $("input[name='rad1']:checked").val();
    //               $("input[name='rad1']").each(function () {
    //                   if ($(this).attr("gender") == response.data.gender) {
    //                       $(this).attr("checked", "checked");
    //                   }
    //               });
    //               $("li#li_gender").html(pScreenObj.mpGender + ' <strong>(' + response.data.gender + ')</strong> <a href="#" data-menu="edit-gender-modal">' + pScreenObj.mpEdit + '</a>');
    //           } else {
    //               $("input[name='rad1']").each(function () {
    //                   if ($(this).attr("gender") == "Male") {
    //                       $(this).attr("checked", "checked");
    //                   }
    //               });
    //               $("li#li_gender").html(pScreenObj.mpGender + ' <strong>(' + pScreenObj.mpMale + ')</strong> <a href="#" data-menu="edit-gender-modal">' + pScreenObj.mpEdit + '</a>');
    //           }
    //           if (response.data.dob ) {
    //               $("li#li_dob").html(pScreenObj.mpBirthday + ' <strong>(' + response.data.dob + ')</strong>  <a href="#" data-menu="edit-bday-modal">' + pScreenObj.mpEdit + '</a>');
    //           } else {
    //               $("li#li_dob").html(pScreenObj.mpBirthday + '   <a href="#" data-menu="edit-bday-modal">' + pScreenObj.mpEdit + '</a>');
    //           }
         
    //             //session.dob = dob;
    //             //Blmani.Session.getInstance().set(session);
    //           //  $('#toast-x').html("DOB Successfully Updated!");
    //            // $('#toast-x').addClass('show-toast');
    //             // setTimeout(function () {
    //             //     $('#toast-x').removeClass('show-toast');
    //             //     window.location = "profile.html";
    //             // }, 2000);
    //         } else {
    //             // $('#toast-2').html("" + response.status);
    //             // $('#toast-2').addClass('show-toast');
    //             // setTimeout(function () {
    //             //     $('#toast-2').removeClass('show-toast');
    //             // }, 2000);
    //         }
    //     },
    //     error: function (jqXHR, textStatus, errorThrown) {
    //         console.log(textStatus, errorThrown);
    //         loginFormSubmitted = "false";
    //         $(".loading-gif").addClass("hideit");
    //         return false;
    //     }
    // });
        $('.user-not-logined').addClass("hideit");
        
        $('.profile-title').html(session.user_nicename);
        //$('.available--coins').html(session.balance + ' <span class="trm-coins">Coins</span>');
        if (langid == 1) {
            $('span.lang-flags').html('<img src="images/flag-en.png" alt="En-US">');
        }
        if (langid == 2) {
            $('span.lang-flags').html('<img src="images/flag-ko.png" alt="En-US">');
        }

        //if(session.user_pic.indexOf("avatar") == -1){
        //if(session.user_pic !== ""){

        $('.profile-image').attr("data-src", session.user_pic);
        $("#user_profile_pic").attr("data-src", session.user_pic);
        //$('.profile-image').attr("src",session.user_pic);
        //$("#user_profile_pic").attr("src",session.user_pic);
        $(".preload-image").lazyload({
            threshold: 500
        });

        //}
        var pScreenEnglish = {
            mpNickName: "Nick name",
            mpGender: "Gender",
            mpBirthday: "Birthday",
            mpUserId: "User ID",
            mpMale: "Male",
            mpEdit: "Edit",
        };


        var pScreenKorean = {
            mpNickName: "별명",
            mpGender: "성별",
            mpBirthday: "생일",
            mpUserId: "사용자명(아이디)",
            mpMale: "남자",
            mpEdit: "수정",
        };


        var pScreenChinese = {
            mpNickName: "昵称",
            mpGender: "性别",
            mpBirthday: "生日",
            mpUserId: "用户名",
            mpMale: "男",
            mpEdit: "修改",
        };
        if (langid == 1) {
            pScreenObj = pScreenEnglish;
        }
        if (langid == 2) {
            pScreenObj = pScreenKorean;
        }
        if (langid == 3) {
            pScreenObj = pScreenChinese;
        }
        
     
    }

}
