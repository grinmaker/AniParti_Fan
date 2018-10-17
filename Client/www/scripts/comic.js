
$(window).on('load',function(){
    $('#loginopen').click(function(e){
			e.preventDefault();
			window.location = "login.html";
		});
	$('#page-build').remove();
	//setTimeout(function(){$("#preloader").addClass('hide-preloader');},450);// will fade out the white DIV that covers the website.
});
var totalPages = 0;
var counterComic = 1;


var checkBeforePlayEpisode = function(pid,purchased,price){
	var session = Blmani.Session.getInstance().get();
	var token = 0;
	if(session){
		 token =  session.token;
	}
	
	 if(price==0 || purchased==1){
		window.location = "play-episode.html#"+pid+"::"+token;
	 } else {
		if(token == 0){
		 window.location ="login.html";	
		} else {
		 if(session.balance>=price){	
		 console.log("unlock content");	
		 $(".cur-epi-coins").html(price);
		 $("#unlockepiinfo").attr("pid",pid);
		 $("#unlockepiinfo").attr("price",price);
		 $(".str-episodetitle").html('<strong>'+$('.story-title').find('h2').text()+'</strong> '+$("div [data-id="+pid+"]").find("h3").text());
		 $('.unlock-popup').click();
		 } else {
			 var leftBal = price - session.balance;
			 $('.coins-left').text(leftBal);
			 $('.buy-more').addClass('active-flyin');
			//   $('#toast-inbal').addClass('show-toast');
			//   setTimeout(function(){$('#toast-inbal').removeClass('show-toast');},2000);
		 }
		}
		
	}
}


var  loadMyFavourites = function(){
	//setTimeout(function(){$("#preloader").addClass('hide-preloader');},500);
	var session = Blmani.Session.getInstance().get();
	var langid  = Blmani.Language.getInstance().get();
	
	params = {};
	if(!langid){
	 params['lang'] =1;
	} else {
	params['lang'] =langid;	
	}
	params['uid'] =session.uid;	
	
    console.log(params);		
    $.ajax({
      url: "http://blmani.com/wp-json/aniparti/get_user_liked_ex",
      type: "post",
      data: params,
      dataType: 'json',
      success: function (response) {
		 console.log("res"+JSON.stringify(response));
		 $("#preloader").addClass('hide-preloader');
		  if(response=="nrf" || response==""){
			 $(".nrf").removeClass("hideit");
		  } else {
			//  var liked
				   $.each(response,function(key,value){
						var ptype= "0";;
						if(value.post_type == "project_article")
					 {
						ptype = "1";
					 } 
						var thumb = value.thumburl;
				   if(!thumb){	
					 thumb="images/placeholder.jpg";
				   }
					 dtype = 1;
					 
					 var show_icon_star = '<span class="post-type-icon"><i class="la la-star"></i></span>';
					 var show_icon_dollar = '<span class="post-type-icon"><i class="la la-dollar"></i></span>';
					
					 //console.log("checking",value.custom);
					 if(value.custom && value.custom.post_type){
						var icon_to_show = show_icon_star;
					    dtype = value.custom.post_type;

					 }else{
						 if(getDevice() != 'ios'){
						
							var icon_to_show = show_icon_dollar;
						 }
					 }
					 durl = "";
					 
					 if(value.post_content){
					  durl = value.post_content;
					 }
					 if(!value.custom){
						 privacy = 1;
					 } else if(!value.custom.privacy){
						 privacy =1;
					 } else {
						 privacy = value.custom.privacy
					 }

				     $(".comics-my-favourite").append('<div class="comic-book-item" data-pp='+ ptype+' data-id="'+value.ID+'" data-privacy="'+privacy+'" data-type="'+dtype+'" data-url="'+durl+'"><a href="javascript:;"><div class="item-image-wrapper"><img src="'+thumb+'"  class="preload-image responsive-image" alt="img">'+icon_to_show+'<div class="item-image-overlay"><i class="la la-check-circle"></i></div></div><h3 class="comic-book-item-title">'+value.post_title+'</h3><div class="comic-book-item-auther">'+value.author_name+'</div></a></div>');
				     
		           
		            $("#preloader").addClass('hide-preloader');
		   
				   
			});
			
			$('.comics-my-favourite .comic-book-item').click(function(){
								console.log("item selectedasd");
								console.log($(this).attr("data-pp"));
								if($(this).attr("data-pp") == "1")
								{
									checkBeforePlayEpisode($(this).attr("data-id"),1);
									return;
								}
									
						//	return;
							if ($(this).hasClass("item-selected")) {
								$(this).removeClass('item-selected');
								
									 $("#spost_view").attr("data-id",0);
								     $("#spost_view").attr("data-type",0);
								     $("#spost_view").attr("data-url",0);
								     $("#spost_view").attr("data-privacy",0);
								     $("#fav_unfav").attr("data-id",0);
								$('.footer-fixed.regular-footer').removeClass('move-out');
								$('.footer-fixed.action-footer').removeClass('come-in');
							} else {
								$(".latest-comics-all").children().each(function() {
									$(this).removeClass("item-selected");
									
									
								});
								$(this).addClass('item-selected');
								 $('.footer-fixed.regular-footer').addClass('move-out');
								 $('.footer-fixed.action-footer').addClass('come-in');
								 console.log($(this).attr("class"));
							     $("#spost_view").attr("data-id",$(this).attr("data-id"));
								 $("#spost_view").attr("data-type",$(this).attr("data-type"));
								 $("#spost_view").attr("data-url",$(this).attr("data-url"));
								 $("#spost_view").attr("data-privacy",$(this).attr("data-privacy"));
								 $("#fav_unfav").attr("data-id",$(this).attr("data-id"));
							}
						});
         }
	   } 
	  });
}

var loadMyPostings = function(){
	var session = Blmani.Session.getInstance().get();
	var langid  = Blmani.Language.getInstance().get();
	
	params = {};
	if(!langid){
	 params['lang'] =1;
	} else {
	params['lang'] =langid;	
	}
	params['id'] =session.uid;	
	
	var firstCreationCounter = 0;
    var secondReproductionCounter = 0;
    var libsaved ="saved";
	var libcreated ="Created Date";
	var libmodified ="Modified Date";
	if(langid==2){
		libsaved ="저장되었음";
	    libcreated ="제작일자";
	    libmodified ="변경일자";
	}
	if(langid==3){
		libsaved ="已储存";
		libcreated ="制作日期";
	    libmodified ="变更日期";
	}	
	
    $.ajax({
      url: "http://blmani.com/wp-json/aniparti/get_userposts",
      type: "post",
      data: params,
      dataType: 'json',
      success: function (response) {
			
		 console.log((response));
		 if(response=="nrf"){
           $(".nrffc").removeClass("hideit");
           $(".nrfsr").removeClass("hideit");
 
		 } else {
			 
	       $.each(response,function(key,value){
		   var thumb = value.thumburl;
           if(!thumb){	
		     thumb="images/placeholder.jpg";
		   }
		   
		   if(!value.custom){
			   division=1;
		   } else if(!value.custom.division){
			   division=1;
		   } else{
			  division = value.custom.division;
		   }
		   
		   if(!value.custom){
			   privacy=1;
		   } else if(!value.custom.privacy){
			   privacy=1;
		   } else{
				 
				 console.log(value.custom.privacy[0]);
				//  if(value.custom.privacy[0].length>1)
				//  privacy = value.custom.privacy[0].replace ( /[^\d.]/g, '' );
				//  else
				{
					privacy = value.custom.privacy;
					console.log(privacy)
				 }
				//
			
		   }
		   var divclass ="";
		   if(division==1){
				 firstCreationCounter++;
				 
			   console.log("fc counter"+firstCreationCounter);
			   if(privacy==1){divclass ="mycomics-fcreation-public"; $(".mycomics-fcreation-public-heading").removeClass("hideit"); 
			      $(".fc-public-align").removeClass("hideit");
			   }
			   if(privacy==2){divclass ="mycomics-fcreation-mypick"; $(".mycomics-fcreation-mypick-heading").removeClass("hideit"); }
			   if(privacy==3){divclass ="mycomics-fcreation-private"; $(".mycomics-fcreation-private-heading").removeClass("hideit"); 
			     $(".fc-private-align").removeClass("hideit");
			   }
			   if(privacy==4){divclass ="mycomics-fcreation-locked"; $(".mycomics-fcreation-locked-heading").removeClass("hideit"); 
			     $(".fc-locked-align").removeClass("hideit");
			   }
		   }
		   if(division==2){
			   secondReproductionCounter++;
			   if(privacy==1){divclass ="mycomics-sreproduction-public"; $(".mycomics-sreproduction-public-heading").removeClass("hideit"); 
			      $(".sr-public-align").removeClass("hideit");
			   }
			   if(privacy==2){divclass ="mycomics-sreproduction-mypick"; $(".mycomics-sreproduction-mypick-heading").removeClass("hideit"); }
			   if(privacy==3){divclass ="mycomics-sreproduction-private"; $(".mycomics-sreproduction-private-heading").removeClass("hideit");
			      $(".sr-private-align").removeClass("hideit");
			   }
			   if(privacy==4){divclass ="mycomics-sreproduction-locked"; $(".mycomics-sreproduction-locked-heading").removeClass("hideit"); 
			     $(".sr-locked-align").removeClass("hideit");
			   }
		   }
		   
		     dtype = 1;
			 if(value.custom.post_type){
			   dtype = value.custom.post_type;
			 }
			 durl = "";
			 if(value.post_content){
			  durl = value.post_content;
			 }
			 var likes = 0;
			 var views = 0;
			 if(value.custom.views){
				 views = value.custom.views;
			 }

             if(value.custom._aliked){
				 likes = value.custom._aliked;
			 }			
			 console.log(divclass);	 
		   //divclass = "asd";
		   //$('.'+divclass).append('<div class="comic-book-item"  ><a href="javascript:;" ><div class="item-image-wrapper"><img data-src="'+thumb+'" src="images/empty.png" class="preload-image responsive-image" alt="img"><div class="item-image-overlay"><i class="la la-check-circle"></i></div></div><h3 class="comic-book-item-title">'+value.post_title+'</h3></a></div>');
		     $('.'+divclass).append('<li><a href="javascript:;" data-privacy="'+privacy+'" data-thumb="'+thumb+'" data-title="'+value.post_title+'" data-id="'+value.ID+'" data-type="'+dtype+'" data-url="'+durl+'" class="comic-book-item"  style="display:table"><div class="srl-image-wrapper"><img data-src="'+thumb+'" src="images/empty.png" class="preload-image responsive-image" alt=""></div><div class="srl-right-wrapper"><div class="srl-right-text-wrapper"><h4 class="srl-item-title">'+value.post_title+'</h4><p class="creation-date">'+libcreated+': <span>'+value.post_date+'</span></p><p class="creation-date">'+libmodified+': <span>'+value.post_modified+'</span></p><div class="item-status-tag saved-tag stats-icons"><i class="la la-eye"></i> '+views+'</div><div class="item-status-tag saved-tag stats-icons"><i class="la la-heart" style="color:#E44130"></i> '+likes+'</div></div><div class="srl-right-text-overlay"><i class="la la-check-circle"></i></div></div></a></li>'); 
		 
		 });
		 if(firstCreationCounter==0){
	          $(".nrffc").removeClass("hideit");
         }

		if(secondReproductionCounter==0){
				$(".nrfsr").removeClass("hideit");
		}
		
		
		 
		   
			$(".preload-image").lazyload({threshold : 500});
			
			
			$('.searching-results .comic-book-item').click(function(){
        if ($(this).hasClass("item-selected")) {
			console.log("item selected");
            $(this).removeClass('item-selected');
			
			$("input#my_post_id").val("0");
			     $("#post_view").attr("data-id",0);
				 $("#post_view").attr("data-type",0);
				 $("#post_view").attr("data-url",0);
				 $("#post_unpublish").attr("data-id",0);
            $('.footer-fixed.regular-footer').removeClass('move-out');
            $('.footer-fixed.action-footer').removeClass('come-in');
        } else {
            $(".comic-book-item").each(function() {
                $(this).removeClass("item-selected");
				
            });
                $(this).addClass('item-selected');
				 var dataurl = 'http://blmani.com/com/index_res.php?id='+$(this).attr("data-id");
			     $("input#my_post_id").val($(this).attr("data-id"));
			     $("#post_view").attr("data-id",$(this).attr("data-id"));
				 $("#post_view").attr("data-type",$(this).attr("data-type"));
				 $("#post_view").attr("data-url",$(this).attr("data-url"));
				 
				 if($(this).attr("data-privacy")==3){
				  $("#post_share").addClass("hideit");
				 	 
				 } else {
				  $("#post_share").removeClass("hideit"); 
				  
				 }

				 if($(this).attr("data-privacy")==4){
					$('#reset_passcode').show();
				 }else{
					$('#reset_passcode').hide();
				 }
				 
				 $("#post_unpublish").attr("data-id",$(this).attr("data-id"));
				 
				 $("#facebook_share_btn").attr("data-id",$(this).attr("data-id"));
				 $("#facebook_share_btn").attr("data-type",$(this).attr("data-type"));
				 $("#facebook_share_btn").attr("data-url",dataurl);
				 $("#facebook_share_btn").attr("data-title",$(this).attr("data-title"));
				 $("#facebook_share_btn").attr("data-thumb",$(this).attr("data-thumb"));
				 
				 $("#twitter_share_btn").attr("data-id",$(this).attr("data-id"));
				 $("#twitter_share_btn").attr("data-type",$(this).attr("data-type"));
				 $("#twitter_share_btn").attr("data-url",dataurl);
				 $("#twitter_share_btn").attr("data-title",$(this).attr("data-title"));
				 $("#twitter_share_btn").attr("data-thumb",$(this).attr("data-thumb"));
				 
				 /*if($(this).attr("data-type")==2){
					$("#copy-to-clipboard").val($(this).attr("data-url")); 
				 } else {*/
					$("#copy-to-clipboard").val('http://blmani.com/com/index_res.php?id='+$(this).attr("data-id")); 
				 //}
				 $('.footer-fixed.regular-footer').addClass('move-out');
                 $('.footer-fixed.action-footer').addClass('come-in');
        }
    });
			 
		 }
		 $("#preloader").addClass('hide-preloader');
		 $("#copy-to-clipboard-btn").on('click',function(){
			 copyToClipBoard();
		 });
		 $("#facebook_share_btn").on("click",function(){
			   var dtype = 0;
			   var shmsg = $(this).attr("data-title");
			   var resthumb = $(this).attr("data-thumb");
			   var shurl = "http://blmani.com";
			   if($(this).attr("data-type")==2){
				  dtype = 2;
                  shurl	= $(this).attr("data-url");	  
			   } else {
				  dtype = $(this).attr("data-type"); 
				  shurl	= "http://blmani.com/com/index_res.php?id="+$(this).attr("data-id");
			   }
  			   sharePostViaFacebook(dtype,shmsg,resthumb,shurl);
          });
  		 $("#twitter_share_btn").on("click",function(){
			   var dtype = 0;
			   var shmsg = $(this).attr("data-title");
			   var resthumb = $(this).attr("data-thumb");
			   var shurl = "http://blmani.com";
			   if($(this).attr("data-type")==2){
				  dtype = 2;
                  shurl	= $(this).attr("data-url");	  
			   } else {
				  dtype = $(this).attr("data-type"); 
				  shurl	= "http://blmani.com/com/index_res.php?id="+$(this).attr("data-id");
			   }
  			   sharePostViaTwitter(dtype,shmsg,resthumb,shurl);
         });
		 
		   $(".fc-public-align").on("click",function(){
			    console.log("sr public align clicked");
				sortMyPosting(1,1);
			});
			$(".fc-private-align").on("click",function(){
				sortMyPosting(1,3);
			});
			$(".fc-locked-align").on("click",function(){
				sortMyPosting(1,4);
			});
			
			$(".sr-public-align").on("click",function(){
				console.log("sr public align clicked");
				sortMyPosting(2,1);
			});
			$(".sr-private-align").on("click",function(){
				sortMyPosting(2,3);
			});
			$(".sr-locked-align").on("click",function(){
				sortMyPosting(2,4);
			});
		 /*$(".my-work-item").on('click',function() {
			  
		        if($(this).hasClass("item-selected")){
				 $(this).removeClass("item-selected");
				 $("input#my_work_id").val("0");
				 console.log("ff called");
				 $('.footer-fixed.action-footer').removeClass('come-in').addClass("move-out");
				 $('.footer-fixed.regular-footer').removeClass('move-out');
				} else{
				 $(".my-work-item").each(function(){
					 $(this).removeClass("item-selected");
				 });
				 $(this).addClass("item-selected");
				 $("input#my_work_id").val($(this).attr("data-id"));
				 console.log("called");
				 $('.footer-fixed.regular-footer').addClass('move-out');
                 $('.footer-fixed.action-footer').addClass('come-in');
			   }
        });*/
		 
		 },
	  error: function(){
				 checkConnection();
				 $("#preloader").addClass('hide-preloader');
	  }
	  
});



}
var loadMyWork = function(){
	
	var session = Blmani.Session.getInstance().get();
	var langid  = Blmani.Language.getInstance().get();
	
	params = {};
	if(!langid){
	 params['lang'] =1;
	} else {
	params['lang'] =langid;	
	}
	params['id'] =session.uid;	
	var libsaved ="saved";
	var libcreated ="Created Date";
	var libmodified ="Modified Date";
	if(langid==2){
		libsaved ="저장되었음";
	    libcreated ="제작일자";
	    libmodified ="변경일자";
	}
	if(langid==3){
		libsaved ="已储存";
		libcreated ="制作日期";
	    libmodified ="变更日期";
	}
		
    $.ajax({
      url: "http://blmani.com/wp-json/aniparti/get_repobyuser",
      type: "post",
      data: params,
      dataType: 'json',
      success: function (response) {
		 console.log("res"+JSON.stringify(response)+" length:"+response.length);
		 if(response.length==0){
			$(".nrf").removeClass("hideit");
			$("#preloader").addClass('hide-preloader');
		 } else {
		 $.each(response,function(key,value){
		 var thumb="images/placeholder.jpg";
		 var pub_flag =0;
		 if(value.pub_flag==1){
			 pub_flag = 1;
		 }
		    
		 $('.my-works-listing').append('<li ><a href="javascript:;" data-pf="'+pub_flag+'" data-id="'+value.id+'" class="my-work-item"  style="display:table"><div class="srl-image-wrapper"><img src="'+thumb+'" alt=""></div><div class="srl-right-wrapper"><div class="srl-right-text-wrapper"><h4 class="srl-item-title">﻿'+value.name+'</h4><p class="creation-date">'+libcreated+': <span>'+value.created_date+'</span></p><p class="creation-date">'+libmodified+': <span>'+value.modified_date+'</span></p><div class="item-status-tag saved-tag">'+libsaved+'</div></div><div class="srl-right-text-overlay"><i class="la la-check-circle"></i></div></div></a></li>')
		 });
		 $("#preloader").addClass('hide-preloader');
		 $(".my-work-item").on('click',function() {
			  
		        if($(this).hasClass("item-selected")){
				 $(this).removeClass("item-selected");
				 $("input#my_work_id").val("0");
				 $("input#my_work_id").attr("data-pf",0);
				 
				 console.log("ff called");
				 $('.footer-fixed.action-footer').removeClass('come-in').addClass("move-out");
				 $('.footer-fixed.regular-footer').removeClass('move-out');
				} else{
				 $(".my-work-item").each(function(){
					 $(this).removeClass("item-selected");
				 });
				 $(this).addClass("item-selected");
				 $("input#my_work_id").val($(this).attr("data-id"));
				 $("input#my_work_id").attr("data-pf",$(this).attr("data-pf"));
				 
				 console.log("called");
				 $('.footer-fixed.regular-footer').addClass('move-out');
                 $('.footer-fixed.action-footer').addClass('come-in');
			   }
            });
		   }	
		 
		 },
	  error: function(){
				 checkConnection();
				 $("#preloader").addClass('hide-preloader');
	  }
});

        

}

var getCompleteComics =function(){
 var session = Blmani.Session.getInstance().get();
	var langid  = Blmani.Language.getInstance().get();
	
	params = {};
	if(!langid){
	 params['lang'] =1;
	} else {
	params['lang'] =langid;	
	}
	if(!session){
	 params['uid'] ="nli";
	} else {
	params['uid'] =session.uid;	
	}
	if(counterComic){
		params['page_num'] =counterComic;
	}
	console.log(params);
	var request =null;
	request = $.ajax({
		url: "http://blmani.com/wp-json/aniparti/complete_comics_ex",
		type: "post",
		data: params,
		dataType: 'json',
		beforeSend:function(){
			$('.load-more-content').show();
			if(request){
				request.abort();
			}
		},
      success: function (response) {
		$('.load-more-content').hide();		 
		console.log(response);
		 if(response.status=='success'){
			totalPages = Math.ceil(parseInt(response.total_count)/10);
			$.each(response.items,function(key,value){
				var thumb = value.thumburl;
				if(!thumb){thumb="images/placeholder.jpg";}
				if(!value.custom){
					privacy = 1;
				} else if(!value.custom.privacy){
					privacy =1;
				} else {
					privacy = value.custom.privacy
				}
				$('.latest-comics-page').append('<div class="comic-book-item"><a href="#" class="can-view-it" data-id="'+value.ID+'" data-privacy="'+privacy+'"><img data-src="'+thumb+'" src="'+thumb+'" class="preload-image responsive-image" alt="img"><h3 class="comic-book-item-title">'+value.post_title+'</h3><div class="comic-book-item-auther">'+value.author_name+'</div></a></div>')
			});
			$("#preloader").addClass('hide-preloader');
			$(".can-view-it").on("click",function(){
			var privacy = $(this).attr("data-privacy");
			var dataid = $(this).attr("data-id");
			canViewIt(privacy,dataid);
			});
			$(".preload-image").lazyload({threshold : 500});
		 }
		},error: function(){
			checkConnection();
			$("#preloader").addClass('hide-preloader');
		}
	});
	$(window).scroll(function() {
		if($(window).scrollTop() == $(document).height() - $(window).height()) {
			console.log('counter',counterComic,'totalPages',totalPages);
			if(counterComic <= totalPages){
				console.log('here',counterComic);
				$('.loading').show();
				counterComic++;
				getCompleteComics();
			}
		}
	});
}

var getPopularComics = function(){
	var session = Blmani.Session.getInstance().get();
	var langid  = Blmani.Language.getInstance().get();
	
	params = {};
	if(!langid){
	 params['lang'] =1;
	} else {
	params['lang'] =langid;	
	}
	if(!session){
	 params['uid'] ="nli";
	} else {
	params['uid'] =session.uid;	
	}
	console.log(params);
	$.ajax({
      url: "http://blmani.com/wp-json/aniparti/getAll",
      type: "post",
      data: params,
      dataType: 'json',
      success: function (response) {
		 console.log(response);
		 $.each(response,function(key,value){
		 var thumb = value.thumburl;
		 if(!thumb){thumb="images/placeholder.jpg";}
		 if(!value.custom){
			 privacy = 1;
		 } else if(!value.custom.privacy){
			 privacy =1;
		 } else {
			 privacy = value.custom.privacy
		 }
		 var author = "";
		 if(!value.author_name){
			 author ="";
		 } else {
			 author = value.author_name;
		 }
		 $('.latest-comics-page').append('<div class="comic-book-item"><a href="#" class="can-view-it" data-id="'+value.ID+'" data-privacy="'+privacy+'"><img data-src="'+thumb+'" src="'+thumb+'" class="preload-image responsive-image" alt="img"><h3 class="comic-book-item-title">'+value.post_title+'</h3><div class="comic-book-item-auther">'+author+'</div></a></div>')
		 });
		 $("#preloader").addClass('hide-preloader');
		  $(".can-view-it").on("click",function(){
		   var privacy = $(this).attr("data-privacy");
		   var dataid = $(this).attr("data-id");
		   canViewIt(privacy,dataid);
	     });
		 $(".preload-image").lazyload({threshold : 500});
		 },
	  error: function(){
				 checkConnection();
				 $("#preloader").addClass('hide-preloader');
	  }
});

}


var getAdultComics = function(){
	var session = Blmani.Session.getInstance().get();
	var langid  = Blmani.Language.getInstance().get();
	
	params = {};
	if(!langid){
	 params['lang'] =1;
	} else {
	params['lang'] =langid;	
	}
	if(!session){
	 params['uid'] ="nli";
	} else {
	params['uid'] =session.uid;	
	}
	if(counterComic){
		params['page_num'] =counterComic;
	}
	console.log(params);
	var request = null;
	request = $.ajax({
      url: "http://blmani.com/wp-json/aniparti/adult_comics_ex",
      type: "post",
      data: params,
	  dataType: 'json',
	  beforeSend:function(){
		$('.load-more-content').show();
		if(request){
			request.abort();
		}
	},
      success: function (response) {
		 console.log(response);
		$('.load-more-content').hide();		 
		 if(response.status=='success'){
			totalPages = Math.ceil(parseInt(response.total_count)/10);
			$.each(response.items,function(key,value){
			var thumb = value.thumburl;
			if(!thumb){thumb="images/placeholder.jpg";}
			if(!value.custom){
				privacy = 1;
			} else if(!value.custom.privacy){
				privacy =1;
			} else {
				privacy = value.custom.privacy
			}
			$('.latest-comics-page').append('<div class="comic-book-item"><a href="#" class="can-view-it" data-id="'+value.ID+'" data-privacy="'+privacy+'"><img data-src="'+thumb+'" src="'+thumb+'" class="preload-image responsive-image" alt="img"><h3 class="comic-book-item-title">'+value.post_title+'</h3><div class="comic-book-item-auther">'+value.author_name+'</div></a></div>')
			});
			$("#preloader").addClass('hide-preloader');
				$(".can-view-it").on("click",function(){
				var privacy = $(this).attr("data-privacy");
				var dataid = $(this).attr("data-id");
				canViewIt(privacy,dataid);
			});
		 }
		 
		 $(".preload-image").lazyload({threshold : 500});
		 },
		error: function(){
			checkConnection();
			$("#preloader").addClass('hide-preloader');
		}
	});
	$(window).scroll(function() {
		if($(window).scrollTop() == $(document).height() - $(window).height()) {
			console.log('counter',counterComic,'totalPages',totalPages);
			if(counterComic <= totalPages){
				console.log('here',counterComic);
				$('.loading').show();
				counterComic++;
				getAdultComics();
			}
		}
	});
}

var getRankedComics =function(){
	var session = Blmani.Session.getInstance().get();
	var langid  = Blmani.Language.getInstance().get();
	
	params = {};
	if(!langid){
	 params['lang'] =1;
	} else {
	params['lang'] =langid;	
	}
	if(!session){
	 params['uid'] ="nli";
	} else {
	params['uid'] =session.uid;	
	}
	console.log(params);
	$.ajax({
      url: "http://blmani.com/wp-json/aniparti/ranked_comics",
      type: "post",
      data: params,
      dataType: 'json',
      success: function (response) {
		 console.log(response); 
		 var counter=0;
		 $.each(response.ranked,function(key,value){
			counter++;
		 var thumb = value.thumburl;
		 if(!thumb){thumb="images/placeholder.jpg";}
		 if(!value.custom){
		   views = 0;
		 } else if(!value.custom.chviews){
			views = 0;
		 } else {
			views = value.custom.chviews; 
		 }
		 if(views>=1000){
			 views = (Math.round(views/1000*10)/10)+"K";
		 }
		 if(!value.custom){
			 privacy = 1;
		 } else if(!value.custom.privacy){
			 privacy = 1;
		 } else {
			 privacy = value.custom.privacy
		 }
		 var rank = counter;
		 if(counter<3){
		 $('.comic-ranked-2').append('<div class="comic-book-item" ><a href="#" class="can-view-it" data-id="'+value.ID+'" data-privacy="'+privacy+'"><div class="episode-thumb-wrapper"><img data-src="'+thumb+'" src="'+thumb+'" class="preload-image responsive-image" alt="img"><span class="thumb-episode-views">'+views+'</span><div class="overlay-content-ranked"><span class="ranking-number">0'+rank+'</span><h3 class="comic-book-item-title">'+value.post_title+'</h3><div class="comic-book-item-auther">'+value.author_name+'</div></div></div></a></div>');
		 }
		 if(counter===2){
			 $(".comic-ranked-2").append('<div class="clear"></div>');
		 }
		 
		 if(counter>2 && counter <6){
		 $('.comic-ranked-3').append('<div class="comic-book-item"><a href="#" data-privacy="'+privacy+'" data-id="'+value.ID+'" class="can-view-it"><div class="episode-thumb-wrapper"><img data-src="'+thumb+'" src="'+thumb+'" class="preload-image responsive-image" alt="img"><span class="thumb-episode-views">'+views+'</span><div class="overlay-content-ranked"><span class="ranking-number">0'+rank+'</span><h3 class="comic-book-item-title">'+value.post_title+'</h3><div class="comic-book-item-auther">'+value.author_name+'</div></div></div></a></div>');
		 }
		 if(counter===5){
		  $(".comic-ranked-3").append('<div class="clear"></div>');
		 }
   
		 });
		 		 
		 
		 
		 $.each(response.topofweek,function(key,value){
			counter++;
		 var thumb = value.thumburl;
		 if(!thumb){thumb="images/placeholder.jpg";}
		 if(!value.custom){
			 privacy = 1;
		 } else if(!value.custom.privacy){
			 privacy =1;
		 } else {
			 privacy = value.custom.privacy
		 }
		 $('.rank-top-of-week').append('<div style="width: 140px"><a href="#" class="can-view-it" data-id="'+value.ID+'" data-privacy="'+privacy+'"><img width="200" class="owl-lazy" src="'+thumb+'" data-src="'+thumb+'"><h3 class="font-15 ">'+value.post_title+'</h3> <span>'+value.author_name+'</span></a></div>');
         });
		  $(".can-view-it").on("click",function(){
		   var privacy = $(this).attr("data-privacy");
		   var dataid = $(this).attr("data-id");
		   canViewIt(privacy,dataid);
	     });
		  $(".preload-image").lazyload({threshold : 500});
		  $("#preloader").addClass('hide-preloader');
		  
		  
			setTimeout(function(){
				$('.single-slider').owlCarousel({center: true, items:1, loop:true, margin:10, stagePadding:20, lazyLoad:true});
				$('.center-slider').owlCarousel({center: false, items:2, autoWidth:true, loop:false, margin:10, stagePadding:20, lazyLoad:true});
				$('.genre-tags-slider').owlCarousel({items:10, autoWidth:true, loop:false, margin:10});
				$('.menu-fixed-slider').owlCarousel({loop:false, margin:0, nav:false, items:5});	
				$('.single-slider-no-timeout').owlCarousel({loop:true, margin:0, nav:false, dots:false, items:1, autoHeight:true});
				$('.single-store-slider').owlCarousel({loop:false, margin:10, nav:false, autoHeight:true, lazyLoad:true, items:1, autoplay: true, autoplayTimeout:3500});	
				$('.double-slider').owlCarousel({loop:true, margin:20, nav:false, autoHeight:true, lazyLoad:true, items:2, autoplay: true, autoplayTimeout:3500});	
				$('.thumb-slider').owlCarousel({loop:true, margin:10, nav:false, autoHeight:true, lazyLoad:true, items:3, autoplay: true, autoplayTimeout:3500});	
				$('.cover-slider').owlCarousel({loop:true, nav:false, lazyLoad:true, items:1, autoplay: true, autoplayTimeout:3500});		
				$('.cover-walkthrough-slider').owlCarousel({loop:false, nav:false, lazyLoad:true, items:1, autoplay: false, autoplayTimeout:3500});		
				$('.cover-slider-full').owlCarousel({loop:false, nav:false, dots:false, mouseDrag:false, touchDrag:false, pullDrag:false, lazyLoad:true, items:1, autoplay: true, autoplayTimeout:3500});		
				$('.timeline-slider').owlCarousel({loop:true, lazyLoad:true, nav:false, items:1, autoplay: true, autoplayTimeout:3500});
				$('.next-slide, .next-slide-arrow, .next-slide-text, .next-slide-custom').on('click',function(){$(this).parent().find('.owl-carousel').trigger('next.owl.carousel');});		
				$('.prev-slide, .prev-slide-arrow, .prev-slide-text, .prev-slide-custom').on('click',function(){$(this).parent().find('.owl-carousel').trigger('prev.owl.carousel');});		
			    if($('.gallery-filter').length > 0){$('.gallery-filter').filterizr();}		
					$('.gallery-filter-controls a').on('click',function(){
						$('.gallery-filter-controls a').removeClass('gallery-filter-active color-highlight');	
						$(this).addClass('gallery-filter-active color-highlight');	
			    });
				baguetteBox.run('.gallery', {});		
		        baguetteBox.run('.profile-gallery', {});	
			},1);
			 
		 },
	  error: function(){
				 checkConnection();
				 $("#preloader").addClass('hide-preloader');
	  }
});
}

var getSerialComics=function(){
	var session = Blmani.Session.getInstance().get();
	var langid  = Blmani.Language.getInstance().get();
	if(counterComic == 0){
		$(".latest-comics-page").html('');
	}
	params = {};
	if(!langid){
	 params['lang'] =1;
	} else {
	params['lang'] =langid;	
	}
	if(!session){
	 params['uid'] ="nli";
	} else {
	params['uid'] =session.uid;	
	}
	if(counterComic){
		params['page_num'] =counterComic;
	}
	console.log(params);
	var request = null;
	request = $.ajax({
		url: "http://blmani.com/wp-json/aniparti/serial_comics_ex",
		type: "post",
		data: params,
		dataType: 'json',
		beforeSend:function(){
			$('.load-more-content').show();
			if(request){
				request.abort();
			}
		},
		/*contentType: 'application/json',
		beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', 'Bearer '+session.token+'');
			},*/
      	success: function (response) {
			$('.load-more-content').hide();
			console.log(response);
			if(response.status=='success'){
				totalPages = Math.ceil(parseInt(response.total_count)/10);
				$.each(response.items,function(key,value){
					var thumb = value.thumburl;
					if(!thumb){thumb="images/placeholder.jpg";}
					if(!value.custom){
						privacy = 1;
					} else if(!value.custom.privacy){
						privacy =1;
					} else {
						privacy = value.custom.privacy
					}
					$('.latest-comics-page').append('<div class="comic-book-item"><a href="#" class="can-view-it" data-id="'+value.ID+'" data-privacy="'+privacy+'"><img data-src="'+thumb+'" src="'+thumb+'" class="preload-image responsive-image" alt="img"><h3 class="comic-book-item-title">'+value.post_title+'</h3><div class="comic-book-item-auther">'+value.author_name+'</div></a></div>')
				});
				$("#preloader").addClass('hide-preloader');
				$(".preload-image").lazyload({threshold : 500});
				$(".can-view-it").on("click",function(){
					var privacy = $(this).attr("data-privacy");
					var dataid = $(this).attr("data-id");
					canViewIt(privacy,dataid);
				});
			}else{
				$('.load-more-content').hide();						
				console.log('no results');
			}
		},
	  error: function(error){
				 console.log(error);
				 //checkConnection();
				 $("#preloader").addClass('hide-preloader');
	  }
	});
	$(window).scroll(function() {
		if($(window).scrollTop() == $(document).height() - $(window).height()) {
			if(counterComic <= totalPages){
				$('.loading').show();
				counterComic++;
				getSerialComics();
			}
		}
	});
}

var getFeaturedComics = function(){
	var session = Blmani.Session.getInstance().get();
	var langid  = Blmani.Language.getInstance().get();
	
	params = {};
	if(!langid){
	 params['lang'] =1;
	} else {
	params['lang'] =langid;	
	}
	if(!session){
	 params['uid'] ="nli";
	} else {
	params['uid'] =session.uid;	
	}
	console.log(params);
	$.ajax({
      url: "http://blmani.com/wp-json/aniparti/forfeatured",
      type: "post",
      data: params,
      dataType: 'json',
      success: function (response) {
		 console.log(response);
		 $.each(response,function(key,value){
		 var thumb = value.thumburl;
		 if(!thumb){thumb="images/placeholder.jpg";}
		 if(!value.custom){
			 privacy = 1;
		 } else if(!value.custom.privacy){
			 privacy =1;
		 } else {
			 privacy = value.custom.privacy
		 }
		 $('.latest-comics-page').append('<div class="comic-book-item"><a href="#" data-id="'+value.ID+'" class="can-view-it" data-privacy="'+privacy+'"><img data-src="'+thumb+'" src="'+thumb+'" class="preload-image responsive-image" alt="img"><h3 class="comic-book-item-title">'+value.post_title+'</h3><div class="comic-book-item-auther">'+value.author_name+'</div></a></div>')
		 });
		 $("#preloader").addClass('hide-preloader');
		 $(".can-view-it").on("click",function(){
		   var privacy = $(this).attr("data-privacy");
		   var dataid = $(this).attr("data-id");
		   canViewIt(privacy,dataid);
	     });
		 $(".preload-image").lazyload({threshold : 500});
		 },
	  error: function(){
				 checkConnection();
				 $("#preloader").addClass('hide-preloader');
	  }
});
}


var getLatestComics = function(){
	var session = Blmani.Session.getInstance().get();
	var langid  = Blmani.Language.getInstance().get();
	
	params = {};
	if(!langid){
	 params['lang'] =1;
	} else {
	params['lang'] =langid;	
	}
	if(!session){
	 params['uid'] ="nli";
	} else {
	params['uid'] =session.uid;	
	}
	console.log(params);
	$.ajax({
      url: "http://blmani.com/wp-json/aniparti/forlatest",
      type: "post",
      data: params,
      dataType: 'json',
      success: function (response) {
		 console.log(response);
		 $.each(response,function(key,value){
		 var thumb = value.thumburl;
		 if(!thumb){thumb="images/placeholder.jpg";}
		 if(!value.custom){
			 privacy = 1;
		 } else if(!value.custom.privacy){
			 privacy =1;
		 } else {
			 privacy = value.custom.privacy
		 }
		 $('.latest-comics-page').append('<div class="comic-book-item"><a href="#" data-id="'+value.ID+'" class="can-view-it" data-privacy="'+privacy+'"><img data-src="'+thumb+'" src="'+thumb+'" class="preload-image responsive-image" alt="img"><h3 class="comic-book-item-title">'+value.post_title+'</h3><div class="comic-book-item-auther">'+value.author_name+'</div></a></div>')
		 });
		 $("#preloader").addClass('hide-preloader');
		 $(".can-view-it").on("click",function(){
		   var privacy = $(this).attr("data-privacy");
		   var dataid = $(this).attr("data-id");
		   canViewIt(privacy,dataid);
	     });
		 $(".preload-image").lazyload({threshold : 500});
		 },
	  error: function(){
				 //checkConnection();
				 $("#preloader").addClass('hide-preloader');
	  }
});

}

var getComicsForHome = function(){
	var session = Blmani.Session.getInstance().get();
	var langid  = Blmani.Language.getInstance().get();
	
	params = {};
	if(!langid){
	 params['lang'] =1;
	} else {
	params['lang'] =langid;	
	}
	if(!session){
	 params['uid'] ="nli";
	} else {
	params['uid'] =session.uid;	
	}
	console.log("home params"+params);
	$.ajax({
      url: "http://blmani.com/wp-json/aniparti/forhome",
      type: "post",
      data: params,
      dataType: 'json',
      success: function (response) {
		 console.log(response);
		  $.each(response.latest,function(key,value){
			  var desc = value.custom.prodes;
			  if(!desc){desc = "";}
			  var thumb = value.thumburl;
			  if(!thumb){thumb="images/placeholder.jpg";}
			  var athumb = value.author_pic;
			  if(!athumb){athumb ="images/pictures/clip.png";}
			  $(".home-latest-comics-slider").append('<div><a href="story.html#'+value.ID+'"><div class="cover-content cover-content-center slide-content"><h1 class="color-white bottom-5">'+value.post_title+'</h1> <p class="color-white bottom-0">'+desc+'</p><div class="slide-author"><img src="'+athumb+'" alt=""><span>'+value.author_name+'</span> </div></div><div class="cover-overlay overlay shadow-overlay"></div><img width="700" class="lazyy owl-lazy" src="images/empty.png" data-src="'+thumb+'"></a></div>');
		  });
		  //featured-section
		  if(Object.keys(response.featured).length > 0){
		  $.each(response.featured,function(key,value){
			  var thumb = value.thumburl;
			  if(!thumb){thumb="images/placeholder.jpg";}
			  $(".home-latest-comics-featured").append('<div style="width: 140px"><a href="story.html#'+value.ID+'"><img width="200 " class="lazyy" src="images/empty.png" data-src="'+thumb+'"><h3 class="font-15">'+value.post_title+'</h3><span>'+value.author_name+'</span><a></div>');
		  });
		  } else {
			  $(".featured-section").addClass("hideit");
		  } 
		  
		  $.each(response.popular,function(key,value){
			   
			  var thumb = value.thumburl;
			  if(!thumb){thumb="images/placeholder.jpg";}
			  $(".home-latest-comics-popular").append('<div class="comic-book-item"><a href="story.html#'+value.ID+'"><img data-src="'+thumb+'" class="lazyy" src="images/empty.png" class="preload-image responsive-image" alt="img"><h3 class="comic-book-item-title">'+value.post_title+'</h3><div class="comic-book-item-auther">'+value.author_name+'</div></a></div>');
		  });
		   //$(".preload-image").lazyload({threshold : 500});
			var ckey = 0;
			console.log(response.genre);
		  $.each(response.genre,function(key,value){
			  if(Object.keys(value).length > 0){
			  console.log(key,value);
			   ckey++;
			    $(".home-genres-filter-controls").append('<div><a href="javascript:;" style="padding:0 10px" data-filter="'+ckey+'">'+key+'</a></div>');
			   $.each(value,function(skey,svalue){
				   console.log(skey,svalue);
				   var sthumb = svalue.thumburl;
			       if(!sthumb){sthumb="images/placeholder.jpg";}
					 if(!svalue.custom){
					  privacy = 1;
					 } else if(!svalue.custom.privacy){
						 privacy =1;
					 } else {
						 privacy = svalue.custom.privacy
					 }
				   $('.home-genres-filter-gallery').append('<div class="comic-book-item show-gallery filtr-item" data-category="'+ckey+'"><a href="#" class="can-view-it" data-id="'+svalue.ID+'" data-privacy="'+privacy+'"><img data-src="'+sthumb+'" src="images/empty.png" class="preload-image responsive-image lazyy" alt="img "><h3 class="comic-book-item-title ">'+svalue.post_title+'</h3><div class="comic-book-item-auther ">'+svalue.author_name+'</div></a></div>');
               });
			  }
		  });
		  
		  
		  $("#preloader").addClass('hide-preloader');
		  $(".can-view-it").on("click",function(){
		   var privacy = $(this).attr("data-privacy");
		   var dataid = $(this).attr("data-id");
		   canViewIt(privacy,dataid);
	     });
		  
			setTimeout(function(){
				$('.single-slider').owlCarousel({center: true, items:1, loop:true, margin:10, stagePadding:20, lazyLoad:true});
				$('.center-slider').owlCarousel({center: false, items:2, autoWidth:true, loop:false, margin:10, stagePadding:20, lazyLoad:true});
				$('.genre-tags-slider').owlCarousel({items:10, autoWidth:true, loop:false, margin:10});
				$('.menu-fixed-slider').owlCarousel({loop:false, margin:0, nav:false, items:5});	
				$('.single-slider-no-timeout').owlCarousel({loop:true, margin:0, nav:false, dots:false, items:1, autoHeight:true});
				$('.single-store-slider').owlCarousel({loop:false, margin:10, nav:false, autoHeight:true, lazyLoad:true, items:1, autoplay: true, autoplayTimeout:3500});	
				$('.double-slider').owlCarousel({loop:true, margin:20, nav:false, autoHeight:true, lazyLoad:true, items:2, autoplay: true, autoplayTimeout:3500});	
				$('.thumb-slider').owlCarousel({loop:true, margin:10, nav:false, autoHeight:true, lazyLoad:true, items:3, autoplay: true, autoplayTimeout:3500});	
				$('.cover-slider').owlCarousel({loop:true, nav:false, lazyLoad:true, items:1, autoplay: true, autoplayTimeout:3500});		
				$('.cover-walkthrough-slider').owlCarousel({loop:false, nav:false, lazyLoad:true, items:1, autoplay: false, autoplayTimeout:3500});		
				$('.cover-slider-full').owlCarousel({loop:false, nav:false, dots:false, mouseDrag:false, touchDrag:false, pullDrag:false, lazyLoad:true, items:1, autoplay: true, autoplayTimeout:3500});		
				$('.timeline-slider').owlCarousel({loop:true, lazyLoad:true, nav:false, items:1, autoplay: true, autoplayTimeout:3500});
				$('.next-slide, .next-slide-arrow, .next-slide-text, .next-slide-custom').on('click',function(){$(this).parent().find('.owl-carousel').trigger('next.owl.carousel');});		
				$('.prev-slide, .prev-slide-arrow, .prev-slide-text, .prev-slide-custom').on('click',function(){$(this).parent().find('.owl-carousel').trigger('prev.owl.carousel');});		
			    if($('.gallery-filter').length > 0){$('.gallery-filter').filterizr();}		
					$('.gallery-filter-controls a').on('click',function(){
						$('.gallery-filter-controls a').removeClass('gallery-filter-active color-highlight');	
						$(this).addClass('gallery-filter-active color-highlight');	
			    });
				baguetteBox.run('.gallery', {});		
		        baguetteBox.run('.profile-gallery', {});	
			},100);
			 $(".preload-image").lazyload({threshold : 500});
			 $("img.lazyy").lazyload({threshold : 500}).removeClass("lazyy");
		  },
		  error: function(){
				 checkConnection();
				 $("#preloader").addClass('hide-preloader');
		  }
	 
	 });
}




