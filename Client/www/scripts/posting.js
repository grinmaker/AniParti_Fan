var sessionCheck = function(){
var session = Blmani.Session.getInstance().get();
	if(!session){
		window.location ="login.html";
		return false;
	}
}
$(document).ready(function () {
	// var testSetting = JSON.parse(localStorage.getItem('preSettings'));
	var testSetting = JSON.parse(localStorage.getItem('preSettings'));
	console.log('settings',testSetting);
	/*var initialScreenSize = window.innerHeight;
	console.log("initail screen size"+initialScreenSize);
    window.addEventListener("resize", function() {
	console.log("event called"+window.innerHeight);	
    if(window.innerHeight < initialScreenSize){
     $(".bounds-footer").addClass("hideit");
     document.body.style.position = "fixed";
    }
	  else{
		 document.body.style.position = "";
		 $(".bounds-footer").removeClass("hideit");                                      
	  }
	 });*/
	 $("#descField").focus(function() {
		 console.log("f called");
		 $("body").addClass("fixme");
	 });
	 $("#descField").blur(function() {
		 console.log("f called");
		  $("body").removeClass("fixme");
	 })
	 $("input[type=text]").focus(function() {
		 console.log("f called");
		  $("body").addClass("fixme");
	 });
	 $("input[type=text]").blur(function() {
		 console.log("f called");
		  $("body").removeClass("fixme");
	 })
	
	//sessionCheck();
	if(!checkConnection()){
	  alert("Internet Connection not available!");
	  return false;
	}
	
	setFields();
	var LastSettings = Blmani.LastSettings.getInstance().get();
	console.log('lastSettings',LastSettings);
	if(LastSettings){
	  Blmani.LastSettings.getInstance().set("");
	  console.log("last settings"+JSON.stringify(LastSettings));
	  setLastFields(LastSettings);	
	}
});

// var prevSettings = {};
// function setSettings(){
// 	// if(divsion==1){
// 		$('#select_genre').on('change', function (e) {
// 			var optionSelected = $("option:selected", this);
// 			var valueSelected = this.value;
// 			console.log(valueSelected);
// 			prevSettings.genre = valueSelected;
// 		});
// 		$('#select_atype').on('change', function (e) {
// 			var optionSelected = $("option:selected", this);
// 			var valueSelected = this.value;
// 			console.log(valueSelected);
// 			prevSettings.atype = valueSelected;			
// 		});
// 		$('#select_dtype').on('change', function (e) {
// 			var optionSelected = $("option:selected", this);
// 			var valueSelected = this.value;
// 			console.log(valueSelected);
// 			prevSettings.dtype = valueSelected;			
// 		});


// 		$('#select_content').on('change', function (e) {
// 			var optionSelected = $("option:selected", this);
// 			var valueSelected = this.value;
// 			console.log(valueSelected);
// 			prevSettings.content = valueSelected;			
// 		});
// 		$('#select_title').on('change', function (e) {
// 			var optionSelected = $("option:selected", this);
// 			var valueSelected = this.value;
// 			console.log(valueSelected);
// 			prevSettings.title = valueSelected;			
// 		});
// 		$('#select_character').on('change', function (e) {
// 			var optionSelected = $("option:selected", this);
// 			var valueSelected = this.value;
// 			console.log(valueSelected);
// 			prevSettings.character = valueSelected;			
// 		});
// 		$('#titleField').on('keyup',function(){
// 			var title = $('#titleField').val();
// 			prevSettings.title = title;
// 		});
// 		$('#descField').on('keyup',function(){
// 			var desc = $('#descField').val();
// 			prevSettings.desc = desc;
// 		});
// 		
// 		setLocal();
// }

// function addTags(){
// 	var tags = [];
// 		$('.additional-info-tags li span').each(function(){
// 			console.log('here',$(this).text());
// 			if(tags.indexOf($(this).text()) === -1){
// 				tags.push($(this).text());
// 			}
// 		});
	
// 	console.log(tags)
// 	prevSettings.tags = tags;
// 	setLocal();
// }
// function delHashSetting(e){
// 	// var tg =prevSettings.tags;
// 	var index = prevSettings.tags.indexOf(e);
// 	if (index > -1) {
// 		prevSettings.tags = prevSettings.tags.splice(index, 1);
// 	}
// 	console.log('deletedTag',prevSettings.tags);
// }
// function setLocal(){
// 	localStorage.setItem('preSettings',JSON.stringify(prevSettings));	
// }
function addSelection(sel,value){
	       if(sel ==1){
		     selv = "genre";
		   }
		   if(sel ==2){
		     selv = "atype";
		   }
		   if(sel ==3){
		     selv = "dtype";
		   }
		   if(sel ==4){
		     selv = "content";
		   }
		   if(sel ==5){
		     selv = "title";
		   }
		   if(sel ==6){
		     selv = "character";
		   }
		
	     $("select#select_"+selv).val(value);
		 if(sel==4 || sel==5 || sel==6){
		 $(".sc-info-tags").append('<li id="s'+selv+'"><span onClick="delSelection('+sel+')">'+$("select#select_"+selv).children(':selected').text()+'</span></li>');
		  console.log("abcd"+sel+":"+value);
		 } else {
		 $(".fc-info-tags").append('<li id="s'+selv+'"><span onClick="delSelection('+sel+')">'+$("select#select_"+selv).children(':selected').text()+'</span></li>');
		 console.log("abcz"+sel+":"+value);
		 }
}
function delSelection(sel){
	if(sel ==1){
	  selv = "genre";
	}
	if(sel ==2){
	  selv = "atype";
	}
	if(sel ==3){
	  selv = "dtype";
	}
	if(sel ==4){
	  selv = "content";
	}
	if(sel ==5){
	  selv = "title";
	}
	if(sel ==6){
	  selv = "character";
	}
   
	
 
  $("select#select_"+selv).val('').trigger('change');
  $("li#s"+selv).remove();
  delete prevSettings[selv];
  //$("select#select_"+selv).val("");
 //  $("select#select_"+selv).val("");
 

}


var setLastFields = function (LastSettings){
	console.log("f called");

	var response = JSON.parse(LastSettings.data);
	console.log("response" , response);
	var showLastPublishingSettings = false;
	if(response.title)
	{
		showLastPublishingSettings = true;
	}
	// /response.extrakeyspre
	if(response.extrakeyspre){
	for (var i = 0; i < response.extrakeyspre.length; i++) {
		//alert(response.extrakeyspre[i]);
		$("ul.additional-info-tags").append('<li onclick="delHash(this)"><span>'+response.extrakeyspre[i]+'</span></li>');
		//Do something
	}
	}
	if(response.privacy)
	{
		$(".bounds-options>a.active").removeClass("active active-bounds");
		$('#a'+response.privacy).addClass("active active-bounds");
	}
	if(response.si){
		var divsion = response.si.division;
		if(divsion==1){
			
			if(response.si.genre){
			   $("#select_genre option").each(function(){
                    if (this.value == response.si.genre) {
			          addSelection(1,this.value);
					  showLastPublishingSettings = true;
			  }
			});
			}
			if(response.si.a_type){
			  $("#select_atype option").each(function(){
				  if(this.value == response.si.a_type){
					//$("#select_atype").val(response.si.a_type);
					addSelection(2,this.value);
					showLastPublishingSettings = true;
				  }
			});
		   }
			if(response.si.d_type){
			      $("#select_dtype option").each(function(){
				  if(this.value == response.si.d_type){
			        //$("#select_dtype").val(response.si.d_type);
					addSelection(3,this.value);
					showLastPublishingSettings = true;
				  }
			});
		}
		console.log("si"+response.si.division);
	}
	if(divsion==2){
			$("a#1").removeClass("active-tab-pill-button bg-highlight");
			$("a#2").addClass("active-tab-pill-button bg-highlight");
			$("#tab-pill-1").removeClass("active-tab");
		    $("#tab-pill-2").addClass("active-tab");
			
			if(response.si.content){
			   $("#select_content option").each(function(){
				    console.log(this.value+" :: "+response.si.content);
                    if (this.value == response.si.content) {
			          addSelection(4,this.value);
					  showLastPublishingSettings = true;
			  }
			});
			}
			if(response.si.title){
			  $("#select_title option").each(function(){
				  if(this.value == response.si.title){
					//$("#select_title").val(response.si.title);
					console.log("selection"+$(this).text());
					addSelection(5,this.value);
					showLastPublishingSettings = true;
				  }
			});
		   }
			if(response.si.character){
			      $("#select_character option").each(function(){
				  if(this.value == response.si.character){
			        //$("#select_character").val(response.si.character);
					addSelection(6,this.value);
					showLastPublishingSettings = true;
				  }
			});
		}
		console.log("si"+response.si.division);
	}

	
}

  if(showLastPublishingSettings){
	
	if(response.title){
		$("#titleField").val(response.title);
	}
	if(response.desc){
		$("#descField").val(response.desc);
	}
	if(response.extratags){
		for(var i=0;i<response.extratags.length;i++){
	    console.log(response.extratags[i] +" : "+ response.extratags.length);
	     $(".additional-info-tags").append('<li onClick="delHash(this)"><span>'+response.extratags[i]+'</span></li>');	
		}
	}
	
	if(response.thurl){
		console.log("thumb url http://blmani.com/com/"+response.thurl);
		$('#preview-thumb').attr("src","http://blmani.com/com"+response.thurl);
		$('#preview-thumb').addClass("thumb-fullwidth");
		$("#thumbFieldError").fadeOut(300);
	}
  }

}
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


function onPhotoURISuccess(imageURI) {
    $("#preview-thumb").attr("src",imageURI);
	$('#preview-thumb').addClass("thumb-fullwidth");
	$("#thumbFieldError").fadeOut(300);
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
		targetHeight: 500
	});
}

$(".upload-file-block").on("click", function(e){
    console.log("toucked  called quality30");
	getPhoto();
} );

         // publishForm publishSubmitButton
		 
		 
		 var publishFormSubmitted = "false";
        jQuery(document).ready(function(e) {
		     
            function t(t, n) {
				var imageURI = $('#preview-thumb').attr("src");
				if (!imageURI || imageURI == "images/image-icon.png") {
					//$("#thumbFieldError").fadeIn(300);
					//$("#upload-file-block").focus();
					$('#toast-3').addClass('show-toast');
			        setTimeout(function(){$('#toast-3').removeClass('show-toast');},3000);
					return false;
				}
				console.log("submit");
                publishFormSubmitted = "true";
				$(".loading-gif-centered").removeClass("hideit");
				uploadPublishThumb('preview-thumb');
				//publishPost('');
				
            }

            function n(n, r) {
                e(".formValidationError").hide();
                e(".fieldHasError").removeClass("fieldHasError");
                e("#" + n + " .requiredField").each(function(i) {
                    
					var vdivision = $(".active-tab-pill-button").attr("id");
					if (e(this).attr("data-type")=="fcselect" &&  vdivision==1 && (e(this).val() == "" || e(this).val() == null)) {
                        e(this).val(e(this).attr("data-dummy"));
                        e(this).focus();
                        e(this).addClass("fieldHasError");
                        //e("#" + e(this).attr("id") + "Error").fadeIn(300);
						$('#toast-fc').addClass('show-toast');
			            setTimeout(function(){$('#toast-fc').removeClass('show-toast');},3000);
						
                        return false
                    }
					
					
					
					if (e(this).attr("data-type")=="srselect" && vdivision==2 && (e(this).val() == "" || e(this).val() == null)) {
                        e(this).val(e(this).attr("data-dummy"));
                        e(this).focus();
                        e(this).addClass("fieldHasError");
						console.log("srselect called");
                        //e("#" + e(this).attr("id") + "Error").fadeIn(300);
						$('#toast-sr').addClass('show-toast');
			            setTimeout(function(){$('#toast-sr').removeClass('show-toast');},3000);
						
                        return false
                    }
                    if (e(this).attr("data-type") =="input" && (e(this).val() == "" || e(this).val() == e(this).attr("data-dummy"))) {
                        console.log("data tyoe "+e(this).attr("data-type"));
						e(this).val(e(this).attr("data-dummy"));
                        e(this).focus();
                        e(this).addClass("fieldHasError");
                        //e("#" + e(this).attr("id") + "Error").fadeIn(300);
						$('#toast-title').addClass('show-toast');
			            setTimeout(function(){$('#toast-title').removeClass('show-toast');},2000);
						
						
                        return false
                    }
                    if (e(this).hasClass("requiredEmailField")) {
                        var s = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                        var o = "#" + e(this).attr("id");
                        if (!s.test(e(o).val())) {
                            e(o).focus();
                            e(o).addClass("fieldHasError");
                            e(o + "Error2").fadeIn(300);
                            return false
                        }
                    }
					if(e(this).hasClass("requireUrlField")){
						var s = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
						var o = "#" + e(this).attr("id");
						if (!s.test(e(o).val())) {
							e(o).focus();
                            e(o).addClass("fieldHasError");
                            e(o + "Error2").fadeIn(300);
                            return false
							
						}
					}
                    if (publishFormSubmitted == "false" && i == e("#" + n + " .requiredField").length - 1) {
                        t(n, r)
                    }
                })
            }
            e(".formValidationError").fadeOut(0);
            e('input[type="text"], input[type="password"]').focus(function() {
                if (e(this).val() == e(this).attr("data-dummy")) {
                    e(this).val("")
                }
            });
            e("input").blur(function() {
                if (e(this).val() == "") {
                    e(this).val(e(this).attr("data-dummy"))
                }
            });
            e("#publishSubmitButton").click(function() {
                n(e(this).attr("data-formId"));
                return false
            })
        })

		 
		 


        // recommendedfrom
		
		var recommendedFormSubmitted = "false";
        jQuery(document).ready(function(e) {
		
            function t(t, n) {
				var imageURI = $('#preview-thumb').attr("src");
				if (!imageURI || imageURI == "images/image-icon.png") {
					//$("#thumbFieldError").fadeIn(300);
					//$("#upload-file-block").focus();
					$('#toast-3').addClass('show-toast');
			        setTimeout(function(){$('#toast-3').removeClass('show-toast');},3000);
					return false;
				}
				console.log("submit");
                recommendedFormSubmitted = "true";
				$(".loading-gif-centered").removeClass("hideit");
				uploadThumb('preview-thumb');
				//recommendedPost("");
				
            }

            function n(n, r) {
                e(".formValidationError").hide();
                e(".fieldHasError").removeClass("fieldHasError");
                e("#" + n + " .requiredField").each(function(i) {
					var vdivision = $(".active-tab-pill-button").attr("id");
					if (e(this).attr("data-type")=="fcselect" &&  vdivision==1 && (e(this).val() == "" || e(this).val() == null)) {
                        e(this).val(e(this).attr("data-dummy"));
                        e(this).focus();
                        e(this).addClass("fieldHasError");
                        //e("#" + e(this).attr("id") + "Error").fadeIn(300);
						$('#toast-fc').addClass('show-toast');
			            setTimeout(function(){$('#toast-fc').removeClass('show-toast');},3000);
						
                        return false
                    }
					
					
					
					if (e(this).attr("data-type")=="srselect" && vdivision==2 && (e(this).val() == "" || e(this).val() == null)) {
                        e(this).val(e(this).attr("data-dummy"));
                        e(this).focus();
                        e(this).addClass("fieldHasError");
						console.log("srselect called");
                        //e("#" + e(this).attr("id") + "Error").fadeIn(300);
						$('#toast-sr').addClass('show-toast');
			            setTimeout(function(){$('#toast-sr').removeClass('show-toast');},3000);
						
                        return false
                    }
                    if (e(this).attr("data-type") =="input" && (e(this).val() == "" || e(this).val() == e(this).attr("data-dummy"))) {
                        console.log("data tyoe "+e(this).attr("data-type"));
						e(this).val(e(this).attr("data-dummy"));
                        e(this).focus();
                        e(this).addClass("fieldHasError");
                        //e("#" + e(this).attr("id") + "Error").fadeIn(300);
						if(e(this).attr("id")=="urlflinkField"){ 
						$('#toast-url').addClass('show-toast');
			            setTimeout(function(){$('#toast-url').removeClass('show-toast');},2000);
						} else {
						$('#toast-title').addClass('show-toast');
			            setTimeout(function(){$('#toast-title').removeClass('show-toast');},2000);
						}
						
                        return false
                    }
                    if (e(this).hasClass("requiredEmailField")) {
                        var s = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                        var o = "#" + e(this).attr("id");
                        if (!s.test(e(o).val())) {
                            e(o).focus();
                            e(o).addClass("fieldHasError");
                            e(o + "Error2").fadeIn(300);
                            return false
                        }
                    }
					
					
					if(e(this).hasClass("requireUrlField")){
						var s = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
						var o = "#" + e(this).attr("id");
						if (!s.test(e(o).val())) {
							e(o).focus();
                            e(o).addClass("fieldHasError");
                            //e(o + "Error2").fadeIn(300);
							$('#toast-invalidurl').addClass('show-toast');
			                setTimeout(function(){$('#toast-invalidurl').removeClass('show-toast');},2000);
                            return false
							
						}
					}
					
			    /*var vdivision = $(".active-tab-pill-button").attr("id");
				 e("#" + n + " .requiredDDFCField").each(function(j) {
				    console.log("here 1");
					if (vdivision ==1) {
						console.log("here =2"+e(this).val());
                        if (e(this).val()=="" || e(this).val()==null) {
							var o = "#" + e(this).attr("id");
							console.log("here =3");
                            e(o).focus();
                            e(o).addClass("fieldHasError");
							$('#toast-fc').addClass('show-toast');
			                setTimeout(function(){$('#toast-fc').removeClass('show-toast');},2000);
                            //e(o + "Error2").fadeIn(300);
                            return false
                        }
                    }
					
					if (recommendedFormSubmitted == "false" && j == e("#" + n + " .requiredDDFCField").length - 1) {
                        t(n, r)
                    }
					
				 });*/
                    if (recommendedFormSubmitted == "false" && i == e("#" + n + " .requiredField").length - 1) {
                        t(n, r)
                    }
                })
				
            }
            e(".formValidationError").fadeOut(0);
            e('input[type="text"], input[type="password"]').focus(function() {
                if (e(this).val() == e(this).attr("data-dummy")) {
                    e(this).val("")
                }
            });
            e("input").blur(function() {
                if (e(this).val() == "") {
                    e(this).val(e(this).attr("data-dummy"))
                }
            });
            e("#recommendedSubmitButton").click(function() {
				console.log("function called");
				//$("a#show-success-popup").click();
                n(e(this).attr("data-formId"));
                return false
            })
        })

		$('#reset_passcode').on('click',function(){
			$('.change-pass').addClass('active-flyin');			
		});
		$('#change-passcode-modal').on('click',function(){
			
		});
		$('.close-passcode').on('click',function(){
			$('.change-pass').removeClass('active-flyin');
		});
		
