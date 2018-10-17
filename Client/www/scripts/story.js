$(window).on('load',function(){
    console.log("load function called");
	$('#page-build').remove();
	
	//setTimeout(function(){$("#preloader").addClass('hide-preloader');},450);// will fade out the white DIV that covers the website.
});




var totalPages = 0;
	  var countEpisode = 1;
$(document).ready(function () {
	 console.log("hash"+document.location.hash);
	 var comicid = document.URL.substr(document.URL.indexOf('#')+1);
	 if(window.localStorage.getItem("story") >1){
	     window.localStorage.removeItem("story");
	     $("#story-info").removeClass("active-tab-pill-button bg-highlight");
		 $("#story-episodes").addClass("active-tab-pill-button bg-highlight");
		 $("#tab-pill-1").removeClass("active-tab");
		 $("#tab-pill-2").addClass("active-tab");
	 }
	 
	 var fields =  Blmani.Fields.getInstance().get();
	 console.log(fields);
	 
	 if(!fields){
	 $.ajax({
      url: "http://blmani.com/wp-json/aniparti/get_field",
      type: "post",
      dataType: 'json',
      success: function (response) {
		  Blmani.Fields.getInstance().set(response);
		  fields = Blmani.Fields.getInstance().get();
		  /*$.each(response.genre,function(key,value){
			  genres[value.ID] =value.name;
			 
		  })*/
	    }
	 });
	  } 
	 
	  getEpisode();
	 
	function getEpisode(){
	// 	console.log('getEpisodes');
	  var params = {};
		params["id"] = comicid;
		//console.log('j con',params["id"])
	  var session = Blmani.Session.getInstance().get();
	  if(!session){
	  params["uid"] ="nli";
	  } else {
	  params["uid"] =session.uid;	  
	  }
	  if(countEpisode){
		params['page_num'] =countEpisode;
	  }
	   var langid = Blmani.Language.getInstance().get();
	   
	  StoryScreenDEnglish = {pFEpisode :"Play First Episode",eCompleted :"Episodes Completed",sviews:"Views",sfree:"Free",stoday:"Today",sCoins :"Coins",sPurchased:"Purchased"}
	  StoryScreenDKorean = {pFEpisode :"첫화부터 보기",eCompleted :"마지막 에피소드(화)입니다.",sviews:"열독수",sfree:"무료",stoday:"오늘",sCoins :"Coins",sPurchased:"Purchased"}
	  StoryScreenDChinese = {pFEpisode :"从第一集开始看。",eCompleted :"最后插曲（集）。",sviews:"阅读数",sfree:"免费",stoday:"今天",sCoins :"Coins",sPurchased:"Purchased"}
	  if(!langid || langid==1){
		  ssobj = StoryScreenDEnglish;
	  } else if(langid==2){
		  ssobj = StoryScreenDKorean;
	  } else if(langid==3){
		  ssobj = StoryScreenDChinese;
	  }
	  
	  console.log(params);
	  var request = null;
	 request = $.ajax({
      url: "http://blmani.com/wp-json/aniparti/getdetails",
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
		 // Blmani.Comic.getInstance().set(response);
		  console.log('responce from server is',response);
		  $('.load-more-content').hide();
			console.log(response);
			if(response){
				totalPages = Math.ceil(parseInt(response.total_count)/10);
		  //console.log(response.episodes);
		  var counter =0;
		  var totalView = 0;
		  
		  console.log("lenght"+Object.keys(response.episodes).length);
		  if(Object.keys(response.episodes).length == 0){ 
		  
		        if(!response.custom){
					 totalView = 0;
				 } else if(!response.custom.views){
					 totalView =0;
				 } else {
					 totalView = response.custom.views;
				 }
		  
		  if(!response.custom){
					 ptype = 1;
				 } else if(!response.custom.post_type){
					 ptype =1;
				 } else {
					 ptype = response.custom.post_type;
				 }
				 
				 var thumb = response.latesturl;
				 if(!thumb){thumb="images/placeholder.jpg";}
				 
				 if(ptype==2){
				  $(".episode-play-section").html('<a href="play-episode.html#'+response.post_content+'#'+response.ID+'"><img src="images/icons/play-icon.png" alt="Play Story" class="icon-play-story"><p>Play Story</p>');
		          $(".first_episode_banner").css("background-image","url("+thumb+")"); 
				 } else {
				  $(".episode-play-section").html('<a href="play-episode.html#'+response.ID+'"><img src="images/icons/play-icon.png" alt="Play Story" class="icon-play-story"><p>Play Story</p>');
		          $(".first_episode_banner").css("background-image","url("+thumb+")"); 
				 	 
				 }
		  } else {
			  
			     var lthumb = response.latesturl;
				 if(!lthumb){lthumb="images/placeholder.jpg";}
			  
			     $.each(response.episodes, function (key, value) {
			     counter++;
				 var thumb = value.thumburl;
				 if(!thumb){thumb="images/placeholder.jpg";}
				 if(!value.views){
					 pviews =0;
				 } else {
					 pviews = value.views;
					 
				 }
				  totalView = +totalView + +pviews;
				 
			 if(counter==1){
				 $(".episode-play-section").html('<a href="play-episode.html#'+value.ID+'"><img src="images/icons/play-icon.png" alt="Play Story" class="icon-play-story"><p>'+ssobj.pFEpisode+'</p>');
		         $(".first_episode_banner").css("background-image","url("+lthumb+")");
			 }
			 var priceClass = "price-free";
			 var priceText = ssobj.sfree;
			 if(value.price > 0){
			  priceClass = "price-paid";
              priceText = value.price+" "+ssobj.sCoins;			  
			 }
			 
			 if(value.purchased==1){
				priceText = ssobj.sPurchased;	
			 }
			 
             //if(counter>1){
			 var c = value.post_date;
			 console.log('value purchased>>>>>>>>>>',value.purchased);
			 //href="play-episode.html#'+value.ID+'"
			 if(getDevice() == 'ios'){

					var priceInfo = '';
					if( !(value.price > 0) || value.purchased == 1){
						$(".latest-comics-all").append('<div class="comic-book-item" data-id="'+value.ID+'" data-purchased="'+value.purchased+'" data-price="'+value.price+'"><a href="javascript:;"><div class="episode-thumb-wrapper"><img data-src="'+thumb+'" src="images/empty.png" class="preload-image responsive-image" alt="img"><span class="thumb-episode-views">'+pviews+'</span>'+priceInfo+'</div><h3 class="comic-book-item-title">'+value.post_title+'</h3><div class="comic-book-item-auther">'+c+'</div></a></div>');
					}
			 }else{
				 var priceInfo = '<span class="thumb-price '+priceClass+'">'+priceText+'</span>';
				 $(".latest-comics-all").append('<div class="comic-book-item" data-id="'+value.ID+'" data-purchased="'+value.purchased+'" data-price="'+value.price+'"><a href="javascript:;"><div class="episode-thumb-wrapper"><img data-src="'+thumb+'" src="images/empty.png" class="preload-image responsive-image" alt="img"><span class="thumb-episode-views">'+pviews+'</span>'+priceInfo+'</div><h3 class="comic-book-item-title">'+value.post_title+'</h3><div class="comic-book-item-auther">'+c+'</div></a></div>');
			 }
			 
		    // }
		 }); 			  
			  
		  }
		         $(".comic-book-item").on("click",function(){
					  checkBeforePlayEpisode($(this).attr("data-id"),$(this).attr("data-purchased"),$(this).attr("data-price"));
				 });
				 
		         var thumb = response.thumburl;
				 if(!thumb){thumb="images/placeholder.jpg";}
				 
				 
				 if(!response.custom){
					 desc = "";
				 } else if(!response.custom.prodes){
					 desc ="";
				 } else {
					 desc = response.custom.prodes;
				 }
				 
		 if(!fields){
			  // sorry i am not putting logic for this now
		 } else {
		  var  types = [];
		            if(response.custom.character){
					   types['character'] = response.custom.character[0];
					}
					if(response.custom.content){
					   types['content'] = response.custom.content[0];
					}
					if(response.custom.title){
					   types['title'] = response.custom.title[0];
					}
				 
				 	if(response.custom.genre){
					   types['genre'] = response.custom.genre[0];
					}
					if(response.custom.a_type){
					   types['a_type'] = response.custom.a_type[0];
					}
					if(response.custom.d_type){
					   types['d_type'] = response.custom.d_type[0];
					}
				 
		  console.log("fields",fields);
		  $.each(fields,function(key,value){
				 if(types[key]){
					 console.log("key"+key);
					 var item = value.find(item => item.ID === types[key]);
					 if(item){
						 sn="null";
						 console.log(item);
						 if(item.type == "genre" || item.type == "content")
						 {sn = "1";}
						 else if(item.type == "a-type" || item.type == "title")
						 {
							sn = "2";
						 }
						 else if(item.type == "d-type" || item.type == "character")
						 {
							sn = "3";
						 }
					 $(".info-tags").append('<li data-s="'+sn+'"><span>'+item.name+'</span></li>');
					 }
				 }
				 
			 }); 
			 ul = $('.info-tags'); // your parent ul element
				ul.children().each(function(i,li){ul.prepend(li)})
			 
		   if(response.hashtags){
				 //console.log("hashtags",response.hashtags);
		   $.each(response.hashtags,function(key,value){
				 
					 console.log("key"+key+"value"+value);
					 if(value !=null){
					 $(".info-tags").append('<li><span>'+value+'</span></span>');
					 }
				 
			 }); 
			 
			 } 
			 if(response.cat)
			 {
				$.each(response.cat,function(key,value){
				 
					console.log(value.name);
					toshow = true;
					$('.info-tags').find('li').each(function(){
					if($(this).text().toLowerCase() == value.name.toLowerCase())
					toshow = false;
					});
					if(toshow)
					$(".info-tags").append('<li><span>'+value.name+'</span></span>');
				
			});
					
				}
		  }
		  console.log('Response ---> ',response);
		  var authpic =response.author_pic;

		  /** storing post details for comments purpose */
		  var temp = response;
		  		delete temp.episodes;
		  window.localStorage.setItem('postInfo',JSON.stringify(temp));
		  
		 $(".latest-comics-all").append('<div class="clear"></div>');
		 $(".story-info-right").html('<div class="story-title"><h2>'+response.post_title+'</h2><p>'+counter+' '+ssobj.eCompleted+'</p></div><div class="author-details"><img data-src="'+authpic+'" src="images/empty.png" class="preload-image responsive-image" alt="img"><div class="author-details-text-wrapper"><div class="author-title">'+response.author_name+'</div><div class="author-start-date">'+moment(response.post_modified).fromNow()+'</div> </div></div><div class="story-views-sec">'+ssobj.sviews+'<br><span class="story-views-sec-tag">'+totalView+'</span></div><div class="right-fixed-action"><a href="comments.html"><i class="zmdi zmdi-comment-more"></i></a><a href="javascript:;" id="add_like_item_called" class="story-info-heart-o" data-id="'+response.ID+'"><i class="la la-heart-o"></i><i class="la la-heart"></i></a></div>');
		 $(".comic-desc").html(desc);
		 $(".story-cover").html('<img data-src="'+thumb+'" src="images/empty.png" class="preload-image responsive-image" alt="img">');
		         var liked = 0;
				 var fav = 0;
				 $("#add_fav_large_icon").attr("data-id",response.ID);
				 $("#add_fav_small_icon").attr("data-id",response.ID);
				 
				 if(response.isalike){liked = response.isalike;} 
				 if(response.isfav){fav = response.isfav;}
				 if(fav==1){
					 $("#add_fav_small_icon").addClass("fav-star-clicked");
					 $("#add_fav_large_icon").addClass("fav-star-clicked");
				 }
				 if(liked==1){ $("#add_like_item_called").addClass("h-liked");} 
				 
		 $("#add_fav_small_icon").on("click",function(){
			 var pid = $(this).attr("data-id");
			 if($(this).hasClass("fav-star-clicked")){
			   unFavouriteComic(pid); 
			 } else {
			    favouriteComic(pid);
			 }
		 });
		 $("#add_fav_large_icon").on("click",function(){
			 var pid = $(this).attr("data-id");
			 if($(this).hasClass("fav-star-clicked")){
			   unFavouriteComic(pid); 
			 } else {
			    favouriteComic(pid);
			 }
		 });
		 $("#add_like_item_called").on("click",function(){
			 var pid = $(this).attr("data-id");
			 if($(this).hasClass("h-liked")){
			   unLikeComic(pid); 
			 } else {
			   likeComic(pid);
			 }
		 })
		 $("#preloader").addClass('hide-preloader');
		 $(".preload-image").lazyload({threshold : 500});
		  
		}else{
			$('.load-more-content').hide();						
			console.log('no results');
		}
	  }
	 });
	 $(window).scroll(function() {
		if($(window).scrollTop() == $(document).height() - $(window).height()) {
			if(countEpisode <= totalPages){
				$('.loading').show();
				countEpisode++;
				getEpisode();
			}
		}
	});
	}
/*
 $.ajax({
      url: "http://blmani.com/wp-json/aniparti/vupdate",
      type: "post",
      data: {id:comicid},
      dataType: 'json',
      success: function (response) {
		  console.log(response);
	  }
 });
*/


var checkBeforePlayEpisode = function(pid,purchased,price){
	var session = Blmani.Session.getInstance().get();
	var token = 0;
	if(session){
	   token =  session.token;
	}
	window.location = "play-episode.html#"+pid+"::"+token;
	//  if(price==0 || purchased==1){
	// 	window.location = "play-episode.html#"+pid+"::"+token;
	//  } else {
	// 	if(token == 0){
	// 	 window.location ="login.html";	
	// 	} else {
	// 	 if(session.balance>=price){	
	// 	 console.log("unlock content");	
	// 	 $(".cur-epi-coins").html(price);
	// 	 $("#unlockepiinfo").attr("pid",pid);
	// 	 $("#unlockepiinfo").attr("price",price);
	// 	 $(".str-episodetitle").html('<strong>'+$('.story-title').find('h2').text()+'</strong> '+$("div [data-id="+pid+"]").find("h3").text());
	// 	 $('.unlock-popup').click();
	// 	 } else {
	// 		 var leftBal = price - session.balance;
	// 		 $('.coins-left').text(leftBal);
	// 		 $('.buy-more').addClass('active-flyin');
	// 		//   $('#toast-inbal').addClass('show-toast');
	// 		//   setTimeout(function(){$('#toast-inbal').removeClass('show-toast');},2000);
	// 	 }
	// 	}
		
	// }
}
$('#cancel-buy').on('click',function(){
	$('.buy-more').removeClass('active-flyin');	
});
$('#buy-coins').on('click',function(){
	window.location = 'price-list.html';	
});
$(".story-align").on("click",function(){
    var o = $(".details-page-episodes").hasClass('asc') ? 'desc' : 'asc';
	var rows = $(".details-page-episodes").find("div.comic-book-item");
	console.log(rows[0] +" "+rows.length);
	$(".details-page-episodes").html("");
	for(var e=rows.length-1;e >= 0;e--){
	   console.log("e"+e);	
	   $(".details-page-episodes").append(rows[e]);
	}
	   $(".details-page-episodes").append('<div class="clear"></div>');
	$(".comic-book-item").on("click",function(){
		 checkBeforePlayEpisode($(this).attr("data-id"),$(this).attr("data-purchased"),$(this).attr("data-price"));
	});
	
});

$("#unlockepisode").on('click',function(){
	var session = Blmani.Session.getInstance().get();
	var pid = $("#unlockepiinfo").attr("pid");
	var price = $("#unlockepiinfo").attr("price");
	
	var params = {};
	params['uid'] = session.uid;
	params['coins'] = session.balance;
	params['pid'] = pid;
	$(".loading-gif-centered").removeClass("hideit");
	console.log(params);
	$.ajax({
      url: "http://blmani.com/wp-json/aniparti/pur_content",
      type: "post",
      dataType: 'json',
	  data : params,
      success: function (response) {
		  console.log("respurch"+response.mesg+" json"+JSON.stringify(response));
		  $(".loading-gif-centered").addClass("hideit");
		  if(response.mesg =="success" || response.mesg=="already_purchased"){
			  session.balance = response.balance;
			  console.log("after new bal"+session.balance);
			  Blmani.Session.getInstance().set(session);
			  console.log("ses"+JSON.stringify(session));
			  setTimeout(function(){window.location = "play-episode.html#"+pid+"::"+session.token},250);
		  } else {
			session.balance = response.balance;
			console.log("after new bal"+session.balance);
			Blmani.Session.getInstance().set(session);
			console.log("ses"+JSON.stringify(session));
			$('#toast-inbal').addClass('show-toast');
			setTimeout(function(){$('#toast-inbal').removeClass('show-toast');},2000);
		  }
		 
	    }
	 });
	
});

	 
});

