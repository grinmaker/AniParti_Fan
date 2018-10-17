var GSignup = function(){
	$(".loading-gif").removeClass("hideit");
	console.log('GSignup loader');
	var provider = new firebase.auth.GoogleAuthProvider();
		 SignUpManager(provider,'Google');
};
var FSignup = function(){
	$(".loading-gif").removeClass("hideit");
	console.log('FSignup loader');
	var provider = new firebase.auth.FacebookAuthProvider();
	provider.addScope('user_birthday');
	SignUpManager(provider,'FaceBook');	
};
var WeSignup = function(){
	$(".loading-gif").removeClass("hideit");
	console.log('WeSignup loader');
}

var SignUpManager = function (provider,source){
	$(".loading-gif").removeClass("hideit");
	console.log('SignUpManager loader');	
	firebase.auth().signInWithRedirect(provider).then(function(){
		return firebase.auth().getRedirectResult();
	}).then(function(result) {
			var token = result.credential.accessToken;
				var SignupData = null;
				SignupData = result.user.providerData[0];
				console.log('hello');
				if(SignupData){
					SignupData.source = source;
					console.log(SignupData);
					//alert("data");
					SocailRegister(SignupData);
				}else{
					$("#toast-x").html("Social Login Cancelled");
					$("#toast-x").addClass("show-toast");
					setTimeout(function(){$("#toast-x").removeClass("show-toast")},2000);
					// ons.notification.alert({ message: 'Social Login Cancelled'});
				}
			
		}).catch(function(error) {
			$(".loading-gif").addClass("hideit");
			console.log('SignUpManager error loader');
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log('social login error. code:'+errorCode+' Message:'+errorMessage);
			$("#toast-x").html('Error:'+errorMessage);
			$("#toast-x").addClass("show-toast");
			setTimeout(function(){$("#toast-x").removeClass("show-toast")},2000);
			// ons.notification.alert({ message: 'Error:'+errorMessage});
			});
		
	};
	var SocailRegister = function(data){
		console.log('data:',data);
		xData = data;
		devicetype1 = window.device.platform == 'iOS' ? 'iphone' : 'android';
		data.device = devicetype1;
		//var userInfo = {'app_id':data.uid,'social_account':data.source,'name':data.displayName,'email':data.email,'is_social':1,'devicetoken':storage.get('RegToken'),'devicetype':devicetype1,'latitude':lat,'longitude':lon,'role_id':2};
		// var userInfo = {'app_id':data.uid,'social_account':data.source,'name':data.displayName,'email':data.email,'is_social':1,'devicetoken':storage.get('RegToken'),'devicetype':devicetype1,'latitude':lat,'longitude':lon,'role_id':2};
		
		$.ajax({
			method:'POST',
			url:'http://blmani.com/wp-json/aniparti/social_register_ex',
			data: data,
			dataType : 'json',
			beforeSend:function(){
				$(".loading-gif").removeClass("hideit");
				console.log('SocialRegister before send loader');				
			},
			success: function(resp){
				console.log('resp',resp);
                $(".loading-gif").addClass("hideit");
				if(resp.status == 'success'){
					Blmani.Session.getInstance().set(resp.data);
					window.localStorage.setItem('NotificationCount',resp.unread_count);
					$(".loading-gif").addClass("hideit");
					setTimeout(function(){window.location = "comic.html";},1500);
				}else{
					loginFormSubmitted = "false";
					$(".loading-gif").addClass("hideit");
					  alert(response.msg);
				}
			}
		});
		//userInfo.name = data.
	};

var socialUser = null;

var checkRedirection = function(){
    
   
	firebase.auth().getRedirectResult().then(function(result) {
      
		if (result.credential) {
            $(".loading-gif").removeClass("hideit"); 
		  // This gives you a Google Access Token.
		  // You can use it to access the Google API.
		  var token = result.credential.accessToken;
		  // The signed-in user info.
		  var user = result.user;
		  socialUser = user.providerData[0];
		  console.log('user',user);

		  var user1 = {
			email:socialUser.email,
			social_id: socialUser.uid,
			display_name:socialUser.displayName,
			registeration_token: window.localStorage.getItem('RegToken'),
			photo_url:socialUser.photoURL
		};

		if(socialUser.providerId == 'google.com'){
			user1.provider = 'google';
		}else if(socialUser.providerId == 'facebook.com'){
			user1.provider = 'facebook';
		}else{
			user1.provider = 'wechat';
		}
		console.log('user1 --> ',user1);
		$(".loading-gif").removeClass("hideit");
		SocailRegister(user1);
		  // ...
		}
	  }).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log('Error', errorMessage);
	  });
}

$(document).ready(function(){
    $(".loading-gif").addClass("hideit");  
		console.log('Document Ready'); 
		setTimeout(function(){ 
			checkRedirection();
		 }, 200);
	
});