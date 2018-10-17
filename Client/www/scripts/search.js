$(window).on('load',function(){
		  $('#page-build').remove();
		  $('#search-box-input').text('');
		  $('.search-input').text('');
	//    setTimeout(function(){$("#preloader").addClass('hide-preloader');},100);// will fade out the white DIV that covers the website.
  });
	var langid = Blmani.Language.getInstance().get();
	nrf = {};
$(document).ready(function() {
	langid = Blmani.Language.getInstance().get();
	var istd = sndd= {};

	
	if(langid == 1)
	{
		nrf = {
			mesg : "No Record Found"
		}
		istd = {
			genre : "Genre",
			a_type : "A-Type",
			d_type: "D-Type",

		}
		sndd = {
			content: "Content",
			title : "Title",
			character: "Character"
		}
	}
	if(langid == 2)
	{
		nrf = {
			mesg: "기록을 찾을 수 없습니다"
		}
		istd = {
			genre : "장르",
			a_type : "A-타입",
			d_type: "D-타입",

		}
		sndd = {
			content: "내용",
			title : "제목",
			character: "주인공"
		}
	}
	if(langid == 3)
	{
		nrf = {
			mesg: "没有找到记录."
		}
		istd = {
			genre : "题材",
			a_type : "A-型",
			d_type: "D-型",

		}
		sndd = {
			content: "内容",
			title : "标题",
			character: "角色"
		}
	}
	$('#select_genre').select2({
		placeholder: istd.genre,
		//allowClear: true
	});
	$('#select_atype').select2({
		placeholder: istd.a_type,
		//allowClear: true
	});
	$('#select_dtype').select2({
		placeholder: istd.d_type,
		//allowClear: true
	});
	$('#select_content').select2({
		placeholder: sndd.content,
		//allowClear: true
	});
	$('#select_title').select2({
		placeholder: sndd.title,
		//allowClear: true
	});
	$('#select_character').select2({
		placeholder: sndd.character,
		//allowClear: true
	});
});


$(document).ready(function () {
	var initialScreenSize = window.innerHeight;
	console.log("initail screen size"+initialScreenSize);
    window.addEventListener("resize", function() {
	console.log("event called"+window.innerHeight);	
    if(window.innerHeight < initialScreenSize){
     $(".regular-footer").addClass("hideit");
     //document.body.style.position = "fixed";
    }
	  else{
		// document.body.style.position = "";
		 $(".regular-footer").removeClass("hideit");                                      
	  }
	 });
	setFields();
	var tos = Blmani.Tos.getInstance().get();
	if(!tos){
	
	} else {
		console.log("logic to show search results");
		console.log(tos);
		if(tos.division==1){
			  console.log("first-creation");
			  if(tos.genre){
			   addSelection(1,tos.genre)
			  }
			 if(tos.a_type){
			  addSelection(2,tos.a_type)
			 }
			if(tos.d_type){
			  addSelection(3,tos.d_type)
			}
		} else {
			console.log("second-creation");
			$("a#1").removeClass("active-tab-pill-button bg-highlight");
			$("a#2").addClass("active-tab-pill-button bg-highlight");
			$(".first-creation").addClass("hideit");
		    $(".second-reproduction").removeClass("hideit");
			if(tos.content){
			 addSelection(4,tos.content)
			}
			if(tos.title){
			 addSelection(5,tos.title)
			}
			if(tos.character){
			 addSelection(6,tos.character)
			}
			
		}
		if(tos.pid){
		  searchComics(false,tos);
		} else if(tos.genre || tos.a_type || tos.d_type || tos.content || tos.title || tos.character){
		   searchComics(0);	
		}
	}
	$(".reset-search").on("click",function(){
	 console.log("reset function called");
	 Blmani.Tos.getInstance().set("");
	 resetSearchFields();
	});
	
	$("a#2").on("click",function(){
		$(".first-creation").addClass("hideit");
		$(".second-reproduction").removeClass("hideit");
	});
	$("a#1").on("click",function(){
		$(".second-reproduction").addClass("hideit");
		$(".first-creation").removeClass("hideit");
	});
	
	 
	  
	  $("#preloader").addClass('hide-preloader');
	  
	  $("select#select_genre").on('change', function(){
		  $("#sgenre").remove();
		  $(".fc-info-tags").append('<li id="sgenre"><span onClick="delSelection(1)">'+$(this).children(':selected').text()+'</span></li>');
	  });
	  $("select#select_atype").on('change', function(){
		  $("#satype").remove();
		  $(".fc-info-tags").append('<li id="satype"><span onClick="delSelection(2)">'+$(this).children(':selected').text()+'</span></li>');
	  });
	  $("select#select_dtype").on('change', function(){
		  $("#sdtype").remove();
		  $(".fc-info-tags").append('<li id="sdtype"><span onClick="delSelection(3)">'+$(this).children(':selected').text()+'</span></li>');
	  });
	  
	  $("select#select_content").on('change', function(){
		  $("#scontent").remove();
		  $(".sr-info-tags").append('<li id="scontent"><span onClick="delSelection(4)">'+$(this).children(':selected').text()+'</span></li>');
	  });
	  $("select#select_title").on('change', function(){
		  $("#stitle").remove();
		  $(".sr-info-tags").append('<li id="stitle"><span onClick="delSelection(5)">'+$(this).children(':selected').text()+'</span></li>');
	  });
	  $("select#select_character").on('change', function(){
		  $("#scharacter").remove();
		  $(".sr-info-tags").append('<li id="scharacter"><span onClick="delSelection(6)">'+$(this).children(':selected').text()+'</span></li>');
	  });
	  $(".search-comics").on('click', function(){
		  searchComics(false);
	  });
	  

	 
	 
	  
	
});

var resetSearchFields = function(){
	delSelection(1);
	delSelection(2);
	delSelection(3);
	delSelection(4);
	delSelection(5);
	delSelection(6);
	$(".first-creation-vtag").val("");
    $(".second-reproduction-vtag").val("");
	$(".searching-results-fc").html('');
	$(".fcnrf").addClass('hideit'); 
	$(".fc-heading").addClass('hideit');
	$(".searching-results-sr").html('');
	$(".srnrf").addClass('hideit'); 
	$(".sr-heading").addClass('hideit');
	$('.footer-fixed.action-footer').removeClass('come-in').addClass("move-out");
	$('.footer-fixed.regular-footer').removeClass('move-out');
	
		 
}

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
		 $(".sr-info-tags").append('<li id="s'+selv+'"><span onClick="delSelection('+sel+')">'+$("select#select_"+selv).children(':selected').text()+'</span></li>');
		 } else {
		 $(".fc-info-tags").append('<li id="s'+selv+'"><span onClick="delSelection('+sel+')">'+$("select#select_"+selv).children(':selected').text()+'</span></li>');
		 }
		
		 
	
}

var totalPages = 0;
window.counter = 1;

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
		 //$("select#select_"+selv).val("");
		//  $("select#select_"+selv).val("");
	}


	var searchComics  = function(isLoadMore,pretos){
		if(!isLoadMore){
			window.counter = 1;
		}
				
		var session = Blmani.Session.getInstance().get();
		var langid  = Blmani.Language.getInstance().get();
		var fields = Blmani.Fields.getInstance().get();
		var vdivision = $(".active-tab-pill-button").attr("id");
		if(window.counter == 0){
			if(vdivision==1){
				$(".searching-results-fc").html('');				
				$(".fcnrf").addClass('hideit'); 
				$(".fc-heading").addClass('hideit');
			} else {
				$(".searching-results-sr").html('');
				$(".srnrf").addClass('hideit'); 
				$(".sr-heading").addClass('hideit');
			}
		}
		
		var searchingBtnEnglish = {searchBtnTxt :"Search",searchingBtnTxt :"Searching..."}
		var searchingBtnKorean= {searchBtnTxt :"검색",searchingBtnTxt :"조회중..."}
		var searchingBtnChinese = {searchBtnTxt :"搜索",searchingBtnTxt :"查询中..."}
		 
		$(".search-comics").addClass('searching-anc');
		console.log('langID',langid);
		if(langid==1){
			sObj = searchingBtnEnglish;}

		else if(langid==2){
			console.log("ko true");
			sObj = searchingBtnKorean;
		}
		else if(langid==3){
			sObj = searchingBtnChinese;
		}else{
			sObj = searchingBtnEnglish;
		}
	console.log("langis",sObj);
		$(".search-comics").html(sObj.searchingBtnTxt+' <img src="images/loadersvg.svg">');
		
		if(vdivision==1){
		var vtag = $(".first-creation-vtag").val();
		var vgenre = $("select#select_genre").val();
		var vatype = $("select#select_atype").val();
		var vdtype = $("select#select_dtype").val();
		} else {
		var vcontent = $("select#select_content").val();
		var vtitle = $("select#select_title").val();
		var vcharacter = $("select#select_character").val();	 
		var vtag = $(".second-reproduction-vtag").val();
		}
		
		var vdivision = $(".active-tab-pill-button").attr("id");
		var tos = {};
		tos['division'] = vdivision;
		if(vgenre !=null){
		tos['genre'] = vgenre;	 
		}
		if(vatype !=null){
		tos['a_type'] = vatype;	 
		}
		if(vdtype !=null){
		tos['d_type'] = vdtype;	 
		}
		if(vcontent !=null){
		tos['content'] = vcontent;	 
		}
		if(vtitle !=null){
		tos['title'] = vtitle;	 
		}
		if(vcharacter !=null){
		tos['character'] = vcharacter;	 
		}
		if(vtag.trim() !=""){
		tos['search_tags'] = vtag;	 
		}
		
		if(!langid){
		tos['lang'] =1;
		} else {
		tos['lang'] =langid;	
		}
		if(!session){
			tos['uid'] ="nli";
		} else {
		tos['uid'] =session.uid;	
		}
		// if(postid >0){
		// 	tos['pid'] =postid; 
		// }
		if(pretos)
		{
			tos = pretos;
		}
		if(window.counter){
			console.log("counter is: ",window.counter);
			tos['page_num'] =window.counter;
		}
		console.log("setting tos"+JSON.stringify(tos));  
		Blmani.Tos.getInstance().set(tos);
		var request = null;
		request = $.ajax({
			url: "http://blmani.com/wp-json/aniparti/get_com_ex",
			type: "post",
			data: tos,
			dataType: 'json',
			beforeSend:function(){
				$('.load-more-content').show();  //
				if(!isLoadMore){
					if(tos.division == "1")
					{
						$('.searching-results-fc').html('');
					}
					else if(tos.division == "2")
					{
						$('.searching-results-sr').html('');
					}
				
					// /$('.search-results-section').html('');
				}
				if(request){
					request.abort();
				}
			},
			success: function (response) {
				$('.load-more-content').hide();
					console.log('response',response);
					console.log("total",response.total);
					if(response.status=='success'){

						totalPages = Math.ceil(parseInt(response.total)/10);
						console.log("totalis",response.total);
						if (response.total > 0){
							$(".fcnrf").addClass('hideit');


						}else{
							$(".fcnrf").removeClass('hideit');							
						}
					// 	if(vdivision==1){
					// 		$(".fcnrf").removeClass('hideit');
					// 	} else {
					// 		$(".srnrf").removeClass('hideit');	
					// 	}
					// } else {
						if(vdivision==1){
						$(".fc-heading").removeClass('hideit');
						$(".fcnrf").addClass('hideit'); 
						} else{
						$(".sr-heading").removeClass('hideit');
						$(".srnrf").addClass('hideit');	
						}
						$.each(response.items, function (key, value) {
							var thumb = value.thumburl;
							if(!thumb){
								thumb="images/placeholder.jpg";
							}
							if(!value.custom){
								privacy = 1;
							} else if(!value.custom.privacy){
								privacy =1;
							} else {
								privacy = value.custom.privacy
							}
							console.log("privacy"+privacy); 
							if(!value.custom){
								desc = "";
							} else if(!value.custom.prodes){
								desc ="";
							} else {
								desc = value.custom.prodes;
							}
							
							if(!value.custom){
								likes = 0;
							} else if(!value.custom.views){
								likes =0;
							} else {
								likes = value.custom._aliked;
							}
						
						
							if(!value.custom){
								ptype = 1;
							} else if(!value.custom.post_type){
								ptype =1;
							} else {
								ptype = value.custom.post_type;
							}
						
							var  types = [];
							if(value.custom && value.custom.character){
								types['character'] = value.custom.character[0];
							}
							if(value.custom && value.custom.content){
								types['content'] = value.custom.content[0];
							}
							if(value.custom && value.custom.title){
								types['title'] = value.custom.title[0];
							}
						
							if(value.custom && value.custom.genre){
								types['genre'] = value.custom.genre[0];
							}
							if(value.custom && value.custom.a_type){
								types['a_type'] = value.custom.a_type[0];
							}
							if(value.custom && value.custom.d_type){
								types['d_type'] = value.custom.d_type[0];
							}
							var taghtml ="";
							var lockhtml ="";
							if(privacy==4){
								lockhtml ='<i class="la la-lock locked-icon"></i>';
							}
					
							//if(types.length>0){
							var taghtml ='<ul class="search-result-tags">';
							// console.log('fields',fields);
							$.each(fields,function(key,value){
								// console.log('length',value.length,'value',value);
								if(types[key]){
									//console.log("key"+key);
									var item = value.find(item => item.ID === types[key]);
									//console.log('item',item);
									if(item){
										sn="null";
										//console.log(item);
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
										taghtml +='<li data-sn="'+sn+'">'+item.name+'</li>';
									}
								}
						
							}); 
							$.each(value.hashtags,function(k,val){
								console.log(val);
								taghtml +='<li data-sn="4">'+val+'</li>';
							});
							taghtml +='</ul>';
							
							var pcontent = "http://google.com";
							if(value.post_content){
								pcontent = value.post_content;
							}
						// }   
							if(vdivision==1){
								$(".searching-results-fc").append('<li class="searched-item" data-url="'+pcontent+'" data-type="'+ptype+'" data-id="'+value.ID+'" data-privacy="'+privacy+'"><div class="srl-image-wrapper"><img src="'+thumb+'" alt="">'+lockhtml+'</div><div class="srl-right-wrapper"><div class="srl-right-author-details"><img src="'+value.author_pic+'" alt="" class="srl-author-thumb"><span>'+value.author_name+'</span></div><h4 class="srl-item-title">'+value.post_title+'</h4><p>'+desc+'</p>'+taghtml+'<div class="srl-states-fixed"><div class="srl-stats-comments"><span class="zmdi zmdi-comment-more"></span><span class="count">'+value.comment_count+'</span></div><div class="srl-stats-likes"><span class="la la-heart"></span><span class="count">'+value.custom._aliked[0]+'</span></div></div></div><div class="item-image-overlay"><i class="la la-check-circle"></i></div></li>');
							} else {
								$(".searching-results-sr").append('<li class="searched-item" data-url="'+pcontent+'" data-type="'+ptype+'" data-id="'+value.ID+'" data-privacy="'+privacy+'"><div class="srl-image-wrapper"><img src="'+thumb+'" alt="">'+lockhtml+'</div><div class="srl-right-wrapper"><div class="srl-right-author-details"><img src="'+value.author_pic+'" alt="" class="srl-author-thumb"><span>'+value.author_name+'</span></div><h4 class="srl-item-title">'+value.post_title+'</h4><p>'+desc+'</p>'+taghtml+'<div class="srl-states-fixed"><div class="srl-stats-comments"><span class="zmdi zmdi-comment-more"></span><span class="count">'+value.comment_count+'</span></div><div class="srl-stats-likes"><span class="la la-heart"></span><span class="count">'+value.custom._aliked[0]+'</span></div></div></div><div class="item-image-overlay"><i class="la la-check-circle"></i></div></li>');			
							}
							
						});
						
				
				// $(".searched-item").on('click',function() {
			
				// });
						
				$("#preloader").addClass('hide-preloader');
				$(".preload-image").lazyload({threshold : 500});
				
				}else if(response.total == 0){
					console.log("from error");
					if(vdivision==1 &&  $('.searching-results-fc li').length == 0){
						$(".fc-heading").addClass('hideit');
						$(".fcnrf").removeClass('hideit');
					} else if(vdivision==2 &&  $('.searching-results-sr li').length == 0){
						
						$(".sr-heading").addClass('hideit');
						$(".srnrf").removeClass('hideit');	
					}
				}
				$('.search-comics').removeClass('searching-anc');
				$('.search-comics').html(sObj.searchBtnTxt);
				$(".search-result-tags").each(function(){
					$(this).html($(this).children('li').sort(function(a, b){
						return ($(b).data('sn')) < ($(a).data('sn')) ? 1 : -1;
					}));
				});
					// 	$(".search-result-tags li").sort(sort_li) // sort elements
					// 				.appendTo('.search-result-tags'); // append again to the list
					// // sort function callback
					// function sort_li(a, b){
					// return ($(b).data('sn')) < ($(a).data('sn')) ? 1 : -1;    
					// }
			// 	$('.search-result-tags').append(function () {
			// 		return $(this).children().get().reverse()
			// });
			},
			error: function(){
				
				checkConnection();
				$("#preloader").addClass('hide-preloader');
			}
		 });
		 $(".search-result-tags").each(function(){
			$(this).html($(this).children('li').sort(function(a, b){
				return ($(b).data('sn')) < ($(a).data('sn')) ? 1 : -1;
			}));
		});
// 		 $(".search-result-tags li").sort(sort_li) // sort elements
//                   .appendTo('.search-result-tags'); // append again to the list
// // sort function callback
// function sort_li(a, b){
//     return ($(b).data('sn')) < ($(a).data('sn')) ? 1 : -1;    
// }
	// 	 $('.search-result-tags').append(function () {
	// 		return $(this).children().get().reverse()
	// });
	}

	$(window).scroll(function() {
		if($(window).scrollTop() == $(document).height() - $(window).height()) {
			
			if(counter <= totalPages){
				console.log('here',counter);
				$('.loading').show();
				$('.content').addClass('top-content-margin');
				counter++;
				searchComics(true);
			}
		}
	});
	window.request = null;
	var searchBox = function(event){
		// if(event.value.length < 3)
		// {
		// 	console.log("less returning");
		// 	return false;
		// }
		$('.suggestion-results').html('');
		$('.suggestion-results').hide();
		$('.suggestion-list').removeClass('scroll-suggestion');		
		console.log('keyUp',event.value);
		var session = Blmani.Session.getInstance().get();
		var langid  = Blmani.Language.getInstance().get();
		var fields = Blmani.Fields.getInstance().get();
        var vdivision = $(".active-tab-pill-button").attr("id");		
		// if(vdivision==1){
		// 	if(counter == 0){
		// 		$(".searching-results-fc").html('');				
		// 	}
		// 	$(".fcnrf").addClass('hideit'); 
		// 	$(".fc-heading").addClass('hideit');
		// } else {
		// 	$(".searching-results-sr").html('');
		// 	$(".srnrf").addClass('hideit'); 
		// 	$(".sr-heading").addClass('hideit');
		// }
		
		var searchingBtnEnglish = {searchBtnTxt :"Search",searchingBtnTxt :"Searching..."}
		var searchingBtnKorean= {searchBtnTxt :"검색",searchingBtnTxt :"조회중..."}
		var searchingBtnChinese = {searchBtnTxt :"搜索",searchingBtnTxt :"查询中..."}
		 
		$(".search-comics").addClass('searching-anc');
		console.log('langID',langid);
		if(langid==1){
			sObj = searchingBtnEnglish;
		}else{
			sObj = searchingBtnEnglish;
		}
		if(langid==2){
			sObj = searchingBtnKorean;
		}else{
			sObj = searchingBtnEnglish;
		}
		if(langid==3){
			sObj = searchingBtnChinese;
		}else{
			sObj = searchingBtnEnglish;
		}
		// $(".search-comics").html(sObj.searchingBtnTxt+' <img src="images/loadersvg.svg">');
		
		if(vdivision==1){
		var vtag = $(".first-creation-vtag").val();
		var vgenre = $("select#select_genre").val();
		var vatype = $("select#select_atype").val();
		var vdtype = $("select#select_dtype").val();
		} else {
		var vcontent = $("select#select_content").val();
		var vtitle = $("select#select_title").val();
		var vcharacter = $("select#select_character").val();	 
		var vtag = $(".second-reproduction-vtag").val();
		}
		
		var vdivision = $(".active-tab-pill-button").attr("id");
		var suggestion = {};
		suggestion['division'] = vdivision;
		if(vgenre !=null){
			suggestion['genre'] = vgenre;
		}
		if(vatype !=null){
			suggestion['a_type'] = vatype;
		}
		if(vdtype !=null){
			suggestion['d_type'] = vdtype;
		}
		if(vcontent !=null){
			suggestion['content'] = vcontent;
		}
		if(vtitle !=null){
			suggestion['title'] = vtitle;
		}
		if(vcharacter !=null){
			suggestion['character'] = vcharacter;
		}
		if(vtag.trim() !=""){
			suggestion['search_tags'] = vtag;
		}
		if(!langid){
			suggestion['lang'] =1;
		} else {
			suggestion['lang'] =langid;	
		}
		if(!session){
			suggestion['uid'] ="nli";
		} else {
			suggestion['uid'] =session.uid;	
		}

		
		console.log(suggestion);
		// Blmani.Suggestion.getInstance().set(suggestion);
		if(event.value.length > 0){
			
			window.request = 	$.ajax({
				url: "http://blmani.com/wp-json/aniparti/get_suggestion_ex",
				type: "post",
				data: suggestion,
				dataType: 'json',
				beforeSend:function(){
					console.log("request is",	window.request);
					if(	window.request != null){
						window.request.abort();
					}
					$('.suggestion-load-more').show();
					$('.suggestion-list').hide();
					$('.suggestion-list').removeClass('scroll-suggestion-style');
					$('.suggestion-results').html('');
					// $('.search-results-section').html('');
					// $('.search-results-list').html('');
					
				},
				success: function (response) {
					console.log(vdivision);
					if(vdivision == 1)
					{
						if($(".search-etc-tag-input").val()== "")
						{
							console.log("yes empty");
							return;
						}
					}
					else if(vdivision == 2)
					{
						if($(".search-etc-tag-input2").val()== "")
						{
							console.log("yes empty2");
							return;
						}
					}
				
					$('.suggestion-results').show();					
					$('.suggestion-list').addClass('scroll-suggestion-style');
					$('.suggestion-list').show();
					$('.suggestion-load-more').hide();
					console.log('response',response);
					if(response.status == 'error'){
						if(vdivision==1){
							// $(".fcnrf").removeClass('hideit');
							$(".suggestion-results").append('<li class="suggested-item"><div class="srl-right-wrapper"><span class="srl-item-title">'+nrf.mesg+'</span></div></li>');
							// $('.suggestion-results').html('');
						} else {
							// $(".srnrf").removeClass('hideit');
							$(".suggestion-results").append('<li class="suggested-item"><div class="srl-right-wrapper"><span class="srl-item-title">'+nrf.mesg+'</span></div></li>');
							// $('.suggestion-results').html('');
						}
					}else if(response.status=='success'){
						console.log('sugeestions',response);
						$('.suggestion-results').html('');						
						$.each(response.items, function (key, value) {
							var thumb = value.thumburl;
							if(!thumb){
								thumb="images/placeholder.jpg";
							}
							if(!value.custom){
								privacy = 1;
							} else if(!value.custom.privacy){
								privacy =1;
							} else {
								privacy = value.custom.privacy
							}
							console.log("privacy"+privacy); 
							if(!value.custom){
								desc = "";
							} else if(!value.custom.prodes){
								desc ="";
							} else {
								desc = value.custom.prodes;
							}
							
							if(!value.custom){
								likes = 0;
							} else if(!value.custom.views){
								likes =0;
							} else {
								likes = value.custom._aliked;
							}
							if(!value.custom){
								ptype = 1;
							} else if(!value.custom.post_type){
								ptype =1;
							} else {
								ptype = value.custom.post_type;
							}
							var  types = [];
							if(value.custom.character){
								types['character'] = value.custom.character[0];
							}
							if(value.custom.content){
								types['content'] = value.custom.content[0];
							}
							if(value.custom.title){
								types['title'] = value.custom.title[0];
							}
						
							if(value.custom.genre){
								types['genre'] = value.custom.genre[0];
							}
							if(value.custom.a_type){
								types['a_type'] = value.custom.a_type[0];
							}
							if(value.custom.d_type){
								types['d_type'] = value.custom.d_type[0];
							}
							var taghtml ="";
							var lockhtml ="";
							if(privacy==4){
								lockhtml ='<i class="la la-lock locked-icon"></i>';
							}
							var taghtml ='<ul class="search-result-tags">';
							console.log('fields',fields);
							$.each(fields,function(key,value){
								console.log('here');
								if(types[key]){
									console.log("key"+key);
									var item = value.find(item => item.ID === types[key]);
									console.log('item',item);
									if(item){
										taghtml +='<li>'+item.name+'</li>';
									}
								}
							}); 
							taghtml +='</ul>';
							var pcontent = "http://google.com";
							if(value.post_content){
								pcontent = value.post_content;
							}
							if(vdivision==1){
								$(".suggestion-results").append('<li class="suggested-item" data-url="'+pcontent+'" data-type="'+ptype+'" data-id="'+value.ID+'" data-privacy="'+privacy+'" data-title="'+value.post_title+'"><div class="srl-right-wrapper"><span class="srl-item-title">'+value.post_title+'</span></div></li>');
							} else {
								$(".suggestion-results").append('<li class="suggested-item" data-url="'+pcontent+'" data-type="'+ptype+'" data-id="'+value.ID+'" data-privacy="'+privacy+'"><div class="srl-right-wrapper"><span class="srl-item-title">'+value.post_title+'</span></div></li>');							
							}
							console.log(response.total);
							
							if(response.total > 11){
								$('.suggestion-list').addClass('scroll-suggestion');
							}else{
								$('.suggestion-list').removeClass('scroll-suggestion');
							}
						});

						$(".suggested-item").on('click',function() {
							$('.suggestion-results').hide();
							$('.suggestion-list').hide();												
							var dtitle =$(this).attr("data-title");
							console.log('dtitle',vdivision);
							if(vdivision == 1){
								$('.search-input').val(dtitle);
								$('.suggestion-results').html('');
								$('.suggestion-list').removeClass('scroll-suggestion');	
								searchComics();
							}else{
								$('.search-input-2').val(dtitle);
								$('.suggestion-results').html('');
								$('.suggestion-list').removeClass('scroll-suggestion');	
								searchComics();
							}
		  				
						});
						$("#preloader").addClass('hide-preloader');
						$(".preload-image").lazyload({threshold : 500});
						
						}else{
							if(vdivision==1){
								// $(".fcnrf").removeClass('hideit');
								$(".suggestion-results").append('<li class="suggested-item"><div class="srl-right-wrapper"><span class="srl-item-title">'+nrf.mesg+'</span></div></li>');								
								// $('.suggestion-results').html('');								
							} else {
								// $(".srnrf").removeClass('hideit');
								$(".suggestion-results").append('<li class="suggested-item"><div class="srl-right-wrapper"><span class="srl-item-title">'+nrf.mesg+'d</span></div></li>');								
								// $('.suggestion-results').html('');
							}
						}
						$('.search-comics').removeClass('searching-anc');
						$('.search-comics').html(sObj.searchBtnTxt);
						// $(window).scroll(function() {
						// 	if($(window).scrollTop() == $(document).height() - $(window).height()) {
						// 		$('.loading').show();
						// 		$('.content').addClass('top-content-margin');
						// 		counter++;
						// 		searchComics();
						// 	}
						// });
				},
				error: function(){
					checkConnection();
					$("#preloader").addClass('hide-preloader');
				}
			});
		}else{
			$('.suggestion-list').removeClass('scroll-suggestion-style');
			$('.suggestion-results').html('');
		}
	}

	$('body').click(function(){
		if($('.suggestion-list').is(':visible')){
			$('.suggestion-list').removeClass('scroll-suggestion-style');
			$('.suggestion-results').html('');
		}
	})
	



	
	$('.search-results-list').on('click','.searched-item',function(e){
		console.log("item clicked");
		if($(this).hasClass("item-selected")){
			$(this).removeClass("item-selected");
			$("#spost_view").attr("data-url",0);
			$("#spost_view").attr("data-id",0);
			$("#spost_view").attr("data-privacy",0);
			$("#spost_view").attr("data-type",0);
			
			$("#post_favourite").attr("data-id",0);
			$("#post_favourite").attr("data-privacy",0);
			$("#post_favourite").attr("data-type",0);
			$('.footer-fixed.action-footer').removeClass('come-in').addClass("move-out");
			$('.footer-fixed.regular-footer').removeClass('move-out');
		} else{
			$(".searched-item").each(function(){
				$(this).removeClass("item-selected");
			});
			$(this).addClass("item-selected");
			$("#spost_view").attr("data-url",$(this).attr("data-url"));
			$("#spost_view").attr("data-id",$(this).attr("data-id"));
			$("#spost_view").attr("data-type",$(this).attr("data-type"));
			$("#spost_view").attr("data-privacy",$(this).attr("data-privacy"));
			console.log($(this).attr("data-privacy"));
			//$("#spost_view").attr("data-privacy",$(this).attr("data-privacy"));
			
			
			$("#post_favourite").attr("data-type",$(this).attr("data-type"));
			$("#post_favourite").attr("data-id",$(this).attr("data-id"));
			$("#post_favourite").attr("data-privacy",$(this).attr("data-privacy"));
			$('.footer-fixed.regular-footer').addClass('move-out');
			$('.footer-fixed.action-footer').addClass('come-in');
		}
			
	});