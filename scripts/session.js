var Blmani = Blmani || {};
Blmani.Session = (function () {
    var instance;

    function init() {
        var sessionIdKey = "blmani-session";
        return {
            // Public methods and variables.
            set: function (sessionData) {
                console.log('sesion-data', sessionData);
                window.localStorage.setItem(sessionIdKey, JSON.stringify(sessionData));
            },
            get: function () {
                var result = null;
                try {
                    result = JSON.parse(window.localStorage.getItem(sessionIdKey));
                } catch (e) {}
                return result;
            },
            destroy: function () {
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
                } catch (e) {}
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








$(document).ready(function () {

    if (Blmani.Session.getInstance().get()) {
        session = Blmani.Session.getInstance().get();
        if(session.hasOwnProperty("type")){
            if(session.type == "social")
            $(".mp-password").parent().hide();
        }
      
    }
    $("#user_profile_pic").on("click", function () {
        getPhoto();
    });







    /*var otherparams = {}
	var params = {};
	var obj = {};
	obj["xyz"] ="xyz";
	params["uid"] = session.uid;
	params["a"] = "a";
	params["b"] = "b";
	params["c"] = "c";
	params["d"] = obj;
	otherparams["params"] = params;
	console.log(btoa(JSON.stringify(otherparams)));*/




    $("#update_dob").on("click", function () {
        $(".loading-gif").removeClass("hideit");
        var params = {};
        var session = Blmani.Session.getInstance().get();
        var dob = $("input#dob").val();
        console.log("gender", dob);
        if (dob != '') {
            params['uid'] = session.uid;
            params['dob'] = dob;
            $.ajax({
                url: "http://blmani.com/wp-json/aniparti/dob_ex",
                type: "post",
                data: params,
                dataType: 'json',
                success: function (response) {
                    console.log(response);
                    $(".loading-gif").addClass("hideit");
                    if (response.status == "success") {
                        session.dob = dob;
                        Blmani.Session.getInstance().set(session);
                        $('#toast-x').html("DOB Successfully Updated!");
                        $('#toast-x').addClass('show-toast');
                        setTimeout(function () {
                            $('#toast-x').removeClass('show-toast');
                            window.location = "profile.html";
                        }, 2000);
                    } else {
                        $('#toast-2').html("" + response.status);
                        $('#toast-2').addClass('show-toast');
                        setTimeout(function () {
                            $('#toast-2').removeClass('show-toast');
                        }, 2000);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                    loginFormSubmitted = "false";
                    $(".loading-gif").addClass("hideit");
                    return false;
                }
            });
        } else {
            $('#toast-x').html("Error:&nbsp; Date of Birth is empty");
            $('#toast-x').addClass('show-toast');
            setTimeout(function () {
                $('#toast-x').removeClass('show-toast');
            }, 2000);
        }
    });


    $("#update_gender_done").on("click", function () {
        $(".loading-gif").removeClass("hideit");
        var params = {};
        var session = Blmani.Session.getInstance().get();
        var gender = $("input[name='rad1']:checked").val();
        console.log("gender" + gender);
        if (gender == 1) {
            var genderValue = "Male";
        } else {
            var genderValue = "Female";
        }
        params['uid'] = session.uid;
        params['gender'] = genderValue;
        $.ajax({
            url: "http://blmani.com/wp-json/aniparti/gender_ex",
            type: "post",
            data: params,
            dataType: 'json',
            success: function (response) {
                console.log(response);
                $(".loading-gif").addClass("hideit");
                if (response.status == "success") {
                    session.gender = genderValue;
                    Blmani.Session.getInstance().set(session);
                    $('#toast-x').html("Gender Successfully Updated!");
                    $('#toast-x').addClass('show-toast');
                    setTimeout(function () {
                        $('#toast-x').removeClass('show-toast');
                        window.location = "profile.html";
                    }, 2000);
                } else {
                    $('#toast-2').html("" + response);
                    $('#toast-2').addClass('show-toast');
                    setTimeout(function () {
                        $('#toast-2').removeClass('show-toast');
                    }, 2000);
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
    //$(document).on("click","#edit_nick_name_done",function() {
    $("#edit_nick_name_done").on("click", function () {
        var session = Blmani.Session.getInstance().get();
        params = {};
        params['uid'] = session.uid;
        var dname = $("input#edit_nick_name").val();
        if (dname == "") {
            $('#toast-x').html("Please Enter nickname!");
            $("#toast-x").addClass("show-toast");
            setTimeout(function () {
                $("#toast-x").removeClass("show-toast");
            }, 2000);
            return false;
        }
        params['dname'] = dname;

        $(".loading-gif").removeClass("hideit");
        console.log(params);
        $.ajax({
            url: "http://blmani.com/wp-json/aniparti/changedname",
            type: "post",
            data: params,
            dataType: 'json',
            success: function (response) {
                console.log(response);
                $(".loading-gif").addClass("hideit");
                if (response == "success") {
                    session.user_nicename = dname;
                    Blmani.Session.getInstance().set(session);
                    $('#toast-x').html("Nick Name Successfully Updated!");
                    $('#toast-x').addClass('show-toast');
                    setTimeout(function () {
                        $('#toast-x').removeClass('show-toast');
                        window.location = "profile.html";
                    }, 2000);
                } else {
                    $('#toast-2').html("" + response);
                    $('#toast-2').addClass('show-toast');
                    setTimeout(function () {
                        $('#toast-2').removeClass('show-toast');
                    }, 2000);
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

});





var logout = function () {
    Blmani.Session.getInstance().destroy();
    //fbLogout();
    if ($("div#menu-1").length) {
        $('.user-logined').addClass("hideit");
        $('.user-not-logined').removeClass("hideit");
        console.log("session expired");
    }
    window.location = "comic.html";
}
var fbLogin = function () {
    if (!window.cordova) {
        var appId = prompt("Enter FB Application ID", "");
        facebookConnectPlugin.browserInit(appId);
    }

    facebookConnectPlugin.login(["public_profile", "email"],
        function (res) {
            console.log(JSON.stringify(res));
            console.log(res.authResponse)
            if (res.status == "connected") {
                fbRegisterLoginUser(res);
                /*facebookConnectPlugin.api("/" + res.authResponse.userID, ["public_profile", "email"],
                                     fbRegisterLoginUser,
                                     function (response) {
                                      alert("Error Occurred");
                                      console.log(JSON.stringify(response));
                                      });*/
            } else {
                alert("Error Occurred");
            }
        },
        function (response) {
            console.log("login failed");
            alert("Error Occurred!");
            console.log(JSON.stringify(response));

        });
}
var fbLoginSuccess = function () {
    console.log("login success");
    facebookConnectPlugin.api("me/?fields=id,name,picture,email",
        function (res) {
            console.log("me called" + JSON.stringify(res));
        },
        function (response) {
            alert("Error Occurred");
            console.log(JSON.stringify(response));
        });
}

var fbRegisterLoginUser = function (userData) {
    console.log("fbRegisterLoginUser called");
    console.log(JSON.stringify(userData));
    $(".loading-gif").removeClass(".hideit");
    var loginFormSubmitted = "true";
    var params = {};
    params["fbid"] = userData.id;
    if (userData.email) {
        params["username"] = userData.email;
        params["email"] = userData.email;
    } else {
        params["username"] = userData.id;
        params["email"] = userData.id;
    }
    if (userData.name) {
        params["user_display_name"] = userData.name;
    } else {
        params["user_display_name"] = userData.id;
    }
    params["password"] = userData.id;

    console.log(JSON.stringify(params));
    $.ajax({
        url: "http://blmani.com/wp-json/aniparti/fb_register",
        type: "post",
        data: params,
        dataType: 'json',
        success: function (response) {
            console.log("manzar");

            console.log(JSON.stringify(response));
            if (response.status == "Error") {
                loginFormSubmitted = "false";
                $(".loading-gif").addClass("hideit");
                alert(response.msg);
            } else {
                Blmani.Session.getInstance().set(JSON.stringify(response));
                $(".loading-gif").addClass("hideit");
                $('.toast').addClass('show-toast');
                setTimeout(function () {
                    window.location = "comic.html";
                }, 1500);
            }
        }

    });



    console.log(JSON.stringify(response));
}

var fbLogout = function () {
    facebookConnectPlugin.logout(
        function (response) {
            console.log(JSON.stringify(response))
        },
        function (response) {
            console.log(JSON.stringify(response))
        });
}

var getStatus = function () {
    facebookConnectPlugin.getLoginStatus(
        function (response) {
            alert(JSON.stringify(response))
        },
        function (response) {
            alert(JSON.stringify(response))
        });
}


$('.profile-links--signout').on('click', logout);



/*  var showDialog = function () {
      facebookConnectPlugin.showDialog( { method: "feed" }, 
          function (response) { alert(JSON.stringify(response)) },
          function (response) { alert(JSON.stringify(response)) });
  }
  
  var apiTest = function () { 
      facebookConnectPlugin.api( "me/?fields=id,email", ["public_profile"],
          function (response) { alert(JSON.stringify(response)) },
          function (response) { alert(JSON.stringify(response)) }); 
  }
  var logPurchase = function () {
      facebookConnectPlugin.logPurchase(1.99, "USD",
          function (response) { alert(JSON.stringify(response)) },
          function (response) { alert(JSON.stringify(response)) });
  }
  var logEvent = function () {
      // For more information on AppEvent param structure see
      // https://developers.facebook.com/docs/ios/app-events
      // https://developers.facebook.com/docs/android/app-events
      facebookConnectPlugin.logEvent("Purchased",
          {
              NumItems: 1,
              Currency: "USD",
              ContentType: "shoes",
              ContentID: "HDFU-8452"
          }, null,
          function (response) { alert(JSON.stringify(response)) },
          function (response) { alert(JSON.stringify(response)) });
  }
  var getAccessToken = function () { 
      facebookConnectPlugin.getAccessToken( 
          function (response) { alert(JSON.stringify(response)) },
          function (response) { alert(JSON.stringify(response)) });
  }
  
  var getStatus = function () { 
      facebookConnectPlugin.getLoginStatus( 
          function (response) { alert(JSON.stringify(response)) },
          function (response) { alert(JSON.stringify(response)) });
  }*/

  var session = Blmani.Session.getInstance().get();
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
       // $(".loading-gif").removeClass("hideit");
    //     $.ajax({
    //       url: "http://blmani.com/wp-json/aniparti/getuserdata",
    //       type: "post",
    //       data: params,
    //       dataType: 'json',
    //       success: function (response) {
    //           console.log(response);
    //           $(".loading-gif").addClass("hideit");
    //           if (response.status == "success") {
              
           
    //               //session.dob = dob;
    //               //Blmani.Session.getInstance().set(session);
    //             //  $('#toast-x').html("DOB Successfully Updated!");
    //              // $('#toast-x').addClass('show-toast');
    //               // setTimeout(function () {
    //               //     $('#toast-x').removeClass('show-toast');
    //               //     window.location = "profile.html";
    //               // }, 2000);
    //           } else {
    //               // $('#toast-2').html("" + response.status);
    //               // $('#toast-2').addClass('show-toast');
    //               // setTimeout(function () {
    //               //     $('#toast-2').removeClass('show-toast');
    //               // }, 2000);
    //           }
    //       },
    //       error: function (jqXHR, textStatus, errorThrown) {
    //           console.log(textStatus, errorThrown);
    //           loginFormSubmitted = "false";
    //           $(".loading-gif").addClass("hideit");
    //           return false;
    //       }
    //   });
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
          
          console.log("setting");
          $("li#li_nick_name").html(pScreenObj.mpNickName + ' <strong >(' + session.user_nicename + ')</strong><a href="#" data-menu="edit-nickname-modal" class="color-red">' + pScreenObj.mpEdit + '</a>');
          $("li#li_user_id").html(pScreenObj.mpUserId + ' <strong>(' + session.user_email + ')</strong>');
          if (session.gender) {
              var gender = $("input[name='rad1']:checked").val();
              $("input[name='rad1']").each(function () {
                  if ($(this).attr("gender") ==session.gender) {
                      $(this).attr("checked", "checked");
                  }
              });
              $("li#li_gender").html(pScreenObj.mpGender + ' <strong>(' + session.gender + ')</strong> <a href="#" data-menu="edit-gender-modal">' + pScreenObj.mpEdit + '</a>');
          } else {
              $("input[name='rad1']").each(function () {
                  if ($(this).attr("gender") == "Male") {
                      $(this).attr("checked", "checked");
                  }
              });
              $("li#li_gender").html(pScreenObj.mpGender + ' <strong>(' + pScreenObj.mpMale + ')</strong> <a href="#" data-menu="edit-gender-modal">' + pScreenObj.mpEdit + '</a>');
          }
          if (session.dob ) {
              $("li#li_dob").html(pScreenObj.mpBirthday + ' <strong>(' + session.dob + ')</strong>  <a href="#" data-menu="edit-bday-modal">' + pScreenObj.mpEdit + '</a>');
          } else {
              $("li#li_dob").html(pScreenObj.mpBirthday + '   <a href="#" data-menu="edit-bday-modal">' + pScreenObj.mpEdit + '</a>');
          }
      }
  
  }
  