var pictureSource;   // picture source
var destinationType; // sets the format of returned value

// Wait for device API libraries to load
//
document.addEventListener("deviceready",onDeviceReady,false);

// device APIs are available
//
function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}

/*
function onPhotoURISuccess(imageURI) {
    $("#user_profile_pic-thumb").attr("src",imageURI);
	$(".loading-gif").removeClass("hideit");
	console.log(imageURI.substr(imageURI.lastIndexOf('/')+1));
	var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.mimeType = "image/png";
    options.chunkedMode = false;

    var ft = new FileTransfer();
    ft.upload(imageURI, encodeURI("http://blmani.com/wp-json/aniparti/upload_asset"), userImageSuc, userImageFail,options)
	

}*/


function onPhotoURISuccess(imageURI) {
    $("#user_profile_pic-thumb").attr("src",imageURI);
	$(".loading-gif").removeClass("hideit");
	console.log(imageURI.substr(imageURI.lastIndexOf('/')+1));
	var session = Blmani.Session.getInstance().get();
	var param = {};
	param["uid"] = session.uid;
	var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.mimeType = "image/png";
    options.chunkedMode = false;
    options.params = param;
    console.log("options14"+JSON.stringify(options));
    var ft = new FileTransfer();
    ft.upload(imageURI, encodeURI("http://blmani.com/wp-json/aniparti/user_image_new"), userImageSuc, userImageFail,options);
}
var userImageSuc = function(success) {
	$(".loading-gif").addClass("hideit");
	console.log("response"+JSON.stringify(success));
    var url = success.response.replace('"','');
	url = url.replace('"','');
    console.log("url returned"+url);
	session.user_pic = url; 
	Blmani.Session.getInstance().set(session);
	$('.profile-image').attr("data-src",url);
	$("#user_profile_pic").attr("data-src",session.user_pic);
	$(".preload-image").lazyload({threshold : 100});
    $('#toast-x').html("Profile Pic Successfully Updated!"); 
    $('#toast-x').addClass('show-toast');
	setTimeout(function(){$('#toast-x').removeClass('show-toast');},2000);
	location.reload();
}




/*
var userImageSuc = function(success) {
	console.log(JSON.stringify(success));
    var url = success.response.replace('"','');
	var url = url.replace('"','');
	purl =url;//"";//"blmani.com"+url;
	var session = Blmani.Session.getInstance().get();
	params = {};
	params['uid'] = session.uid;
	params['url'] = purl;
	console.log(params);
	
	$.ajax({
					  url: "http://blmani.com/wp-json/aniparti/userimage",
					  type: "post",
				      data: params,
					  dataType: 'json',
					  success: function (response) {
						   console.log(response);
						   $(".loading-gif").addClass("hideit");
						      session.user_pic = response; 
							  Blmani.Session.getInstance().set(session);
							  $('#toast-x').html("Profile Pic Successfully Updated!"); 
							  $('#toast-x').addClass('show-toast');
							  setTimeout(function(){$('#toast-x').removeClass('show-toast');},2000);
						   
			               
						},
					    error: function (jqXHR, textStatus, errorThrown) {
                               console.log(textStatus, errorThrown);
							   loginFormSubmitted = "false";
							   $(".loading-gif").addClass("hideit");
						       return false;
                        }
	 });
	
	
	
}*/

var userImageFail =function(error) {
    //alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
	$('#toast-x').html("Error Occurred!"); 
	$(".loading-gif").addClass("hideit");
    $("#toast-x").addClass("show-toast");
    setTimeout(function(){$("#toast-x").removeClass("show-toast");},2000);
	$(".loading-gif").addClass("hideit");
}

var onFail =function(){
	console.log("failed");
	
}


var getPhoto = function() {
	console.log("get photo called");
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
    quality: 30,
    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
    allowEdit: true,
    targetWidth: 500,
    targetHeight: 500});
}
