$(window).on('load', function(){
  var session = Blmani.Session.getInstance().get();
  console.log("before load");
  $(".loading-gif").removeClass("hideit");

    $.ajax({
      url: "http://blmani.com/wp-json/aniparti/getuserdata",
      type: "post",
      data: params,
      dataType: 'json',
      success: function (response) {
         
          //$(".loading-gif").addClass("hideit");
          if (response.status == "success") {
            // $(".profile-title ").html("asd");
            // $("#user_nicename").html("(asd)");
            // $("#user_email").html("(asd)");
            // $("#user_gender").html("(asd)");
            // $("#user_dob").html("(asd)");
            console.log('responce',response);
            session.user_nicename = response.data.nice_name;
            session.user_email = response.data.email;
            session.dob = response.data.dob;
            session.gender = response.data.gender;
            session.user_pic = response.data.user_pic+"?"+Math.random();
            Blmani.Session.getInstance().set(session);
            $('.profile-image').attr("data-src",response.data.user_pic+"?"+Math.random());
            $("#user_profile_pic").attr("data-src",response.data.user_pic+"?"+Math.random());
            $(".preload-image").lazyload({threshold : 100});
            $(".profile-title ").html(response.data.nice_name);
            $("#user_nicename").html("("+response.data.nice_name+")");
            $("#user_email").html("("+response.data.email+")");
            $("#user_gender").html("("+response.data.gender+")");
            $("#user_dob").html("("+response.data.dob+")");

            
            
            //location.reload();
              //session.dob = dob;
              //Blmani.Session.getInstance().set(session);
            //  $('#toast-x').html("DOB Successfully Updated!");
             // $('#toast-x').addClass('show-toast');
              // setTimeout(function () {
              //     $('#toast-x').removeClass('show-toast');
              //     window.location = "profile.html";
              // }, 2000);
              $(".loading-gif").addClass("hideit");
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

  

  
});