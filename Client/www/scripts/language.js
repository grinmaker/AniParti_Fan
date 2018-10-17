var regularFooterMenuEnglish = {
	rfmComics : "Comics",
	rfmComics : "Search",
	rfmComics : "Posting",
}


var regularFooterMenuKorean = {
	rfmComics : "웹툰",
	rfmSearch : "검색",
	rfmPostStory : "포스팅"
};

var regularFooterMenuChinese = {
	rfmComics : "网漫",
	rfmSearch : "搜索",
	rfmPostStory : "帖子"
};


var setRegularFooterMenuContent = function(lid){
	if(lid==2){
		rfmcObj = regularFooterMenuKorean;
	}
	if(lid==3){
		rfmcObj = regularFooterMenuChinese;
	}
	if(lid>1){
	$(".regular-footer-comics").html(rfmcObj.rfmComics);
	$(".regular-footer-search").html(rfmcObj.rfmSearch);
	$(".regular-footer-poststory").html(rfmcObj.rfmPostStory);
	}
	
}


var regularTopMenuEnglsih = {
	rtmUser : "User",
	rtmLogin : "Login",
	rtmSignToStart : "Sign in to enjoy BLmani.",
	rtmHome : "Home",
	rtmSignin : "Sign in",
	rtmSignUp : "Sign up",
	rtmLanguage : "Language",
	rtmCopyRight : "Copyright",
	rtmCopyRightText : "Enabled. All Rights Reserved Blmani.",
	rtmInbox : "Inbox",
	rtmMyLib : "My Library",
	rtmProfile : "Profile",
	rtmSettings : "Settings",
	rtmSignOut : "Sign Out",
	rtmCoins : "Coins",
	rtmCoinsStore : "Coins Store",
	rtmPurchases : "Coins Usage",
	rtmPaymentHistory : "My Transactions",
	rtmNewMessage : "New Message",
	rtmCancleMessage : "Cancle",
	rtmSendMessage : "Send",
	rtmSubjectMessage : "Subject",
	rtmContentMessage : "Message",
	rtmCommentsh : "Comments",
	rtmSomethingNice : "Say Something nice",
	rtmnpurhis : "No purchase history found!",
	rtmnpayhis: "No payment history found!",
	rtmnResetPass: "Reset Passcode",
	rtmnorh: "OR",
	rtmnloginwithh: "Login with",
	rtmnreplyb: "Reply",
	rtmReplyInp: "type here to reply",
	SetKeywordtrm: "Set keyword to register",

};
var regularTopMenuKorean = {
	rtmUser : "사용자",
	rtmLogin : "로그인",
	rtmSignToStart : "BLmani에 로그인하세요",
	rtmHome : "홈",
	rtmSignin : "로그인",
	rtmSignUp : "계정등록",
	rtmLanguage : "언어",
	rtmCopyRight : "저작권",
	rtmCopyRightText : "Enabled. All Rights Reserved Blmani.",
	rtmInbox : "수신함",
	rtmMyLib : "내 서재",
	rtmProfile : "내프로필",
	rtmSettings : "셋팅",
	rtmSignOut : "로그아웃",
	rtmCoins : "코인",
	rtmCoinsStore : "코인 상점",
	rtmPurchases : "코인 사용 내역",
	rtmPaymentHistory : "내 지불 내역",
	rtmNewMessage : "새로운 메시지",
	rtmCancleMessage : "취소",
	rtmSendMessage : "보내기",
	rtmSubjectMessage : "제목",
	rtmContentMessage : "메시지 내용",
	rtmCommentsh : "댓글",
	rtmSomethingNice : "뭔가 좋은 말을 부탁합니다. ",
	rtmnpurhis : "구매 내역이 없습니다!",
	rtmnpayhis: "지불 내역이 없습니다!",
	rtmnResetPass: "비밀번호 재설정",
	rtmnorh: "또는",
	rtmnloginwithh: "로 로그인하기",
	rtmnreplyb: "답변 달기",
	rtmReplyInp: "대답하려면 여기에 입력하십시오.",
	SetKeywordtrm: "등록하려면 '키워드'를 입력하세요.",
};
// var StoryScreenKorean ={
// 	storyProcessing : "처리중...",
// 	storyToastFav : "내 관심목록에 추가되었습니다.",
// 	storyToastUnfav : "내 관심목록에서 삭제되었습니다.",
// 	storyToastLike : "“좋아요” 목록에 추가되었습니다.",
// 	storyToastUnlike : "“좋아요” 목록에서 삭제되었습니다.",
// 	storyToastX : "“관심목록”이나 “좋아요”를 위해서는 로그인해야 합니다.",
// 	storyEpisodes : "에피소드(화)",
// 	storyInformation : "관련정보",
// 	storyGenres : "장르",
// 	storyDesc : "설명",
// 	storyAlign : "정열",
// 	supUnlockEpisode : "Unlock Episode",
// 	supUnlockBtn : "Unlock",
// 	supThisEpi : "This Episode",
// 	storyToastnoBalance : "Purchase coisn to view!",
// }
var regularTopMenuChinese = {
	rtmUser : "用户",
	rtmLogin : "登录",
	rtmSignToStart : "请登录至Blmani。",
	rtmHome : "首页",
	rtmSignin : "登录",
	rtmSignUp : "账户登录",
	rtmLanguage : "语言",
	rtmCopyRight : "著作权",
	rtmCopyRightText : "启用。版权归Blmani所有。",
	rtmInbox : "收件箱",
	rtmMyLib : "我的书柜",
	rtmProfile : "简介",
	rtmSettings : "设置",
	rtmSignOut : "退出",
	rtmCoins : "虚拟币",
	rtmCoinsStore : "虚拟币商店",
	rtmPurchases : "支付",
	rtmPaymentHistory : "我的账单",
	rtmNewMessage : "新信息",
	rtmCancleMessage : "取消",
	rtmSendMessage : "发送",
	rtmSubjectMessage : "题目",
	rtmContentMessage : "信息内容",
	rtmCommentsh : "跟帖",
	rtmSomethingNice : "拜托您说好话。",
	rtmnpurhis : "没有购买内容！",
	rtmnpayhis: "没有支付内容！",
	rtmnResetPass: "密码重置",
	rtmnorh: "或",
	rtmnloginwithh: "用登录。",
	rtmnreplyb: "回复",
	rtmReplyInp: "在这里输入回复",
	SetKeywordtrm: "登录请输入“关键词”。",
};



var setTopMenuContent = function(lid){
	
	if(lid==2){
		tmcObj = regularTopMenuKorean;
		flag = "images/flag-ko.png";
		
	}
	if(lid==3){
		tmcObj = regularTopMenuChinese;
		flag = "images/flag-zh.png";
	}
	if(lid==1){ 
	var flag = "images/flag-en.png";
	tmcObj = regularTopMenuEnglsih;
	}
	$(".trm-coins").html(tmcObj.rtmCoins);
	$(".trm-user").html(tmcObj.rtmUser+' <span class="color-highlight trm-login"> '+tmcObj.rtmLogin);
	$(".trm-sign-to-start").html(tmcObj.rtmSignToStart);
	$(".trm-home").html('<em><i class="la la-home"></i>'+tmcObj.rtmHome+'</em>');
	$(".trm-signin").html('<em><i class="la la-user"></i>'+tmcObj.rtmSignin+'</em>');
	$(".trm-signup").html('<em><i class="la la-user-plus"></i>'+tmcObj.rtmSignUp+'</em>');
	$(".trm-language").html('<em><i class="la la-language"></i>'+tmcObj.rtmLanguage+' <span class="lang-flags"><img src="'+flag+'" alt="En-US"></span></em>');
	$(".rfm-copyright-text").html('<em><img src="images/copyright-logo.png" alt="Blmani"><br>'+tmcObj.rtmCopyRight+' <span class="copyright-year"></span> '+tmcObj.rtmCopyRightText+''+'</em>');
    $(".trm-inbox").html('<em><i class="far fa-bell"></i>'+tmcObj.rtmInbox+'<span class="unread-message">0</span></em>');
	$(".trm-mylib").html('<em><i class="far fa-folder-open"></i>'+tmcObj.rtmMyLib+'</em>');
	$(".trm-profile").html('<em><i class="far fa-user"></i>'+tmcObj.rtmProfile+'</em>');
	$(".trm-settings").html('<em><i class="far fa-sun"></i>'+tmcObj.rtmSettings+'</em>');
	$(".trm-signout").html('<em><i class="fas fa-sign-out-alt"></i>'+tmcObj.rtmSignOut+'</em>');
	$(".trm-coinstore").html('<em><i class="la la-shopping-cart"></i>'+tmcObj.rtmCoinsStore+'</em>');
	$(".trm-purchases").html('<em><i class="la la-money"></i>'+tmcObj.rtmPurchases+'</em>');
	$(".trm-paymenthistory").html('<em><i class="la la-history"></i>'+tmcObj.rtmPaymentHistory+'</em>');
	$(".trm-newmessage").html(tmcObj.rtmNewMessage);
	$(".trm-canclemessage").html(tmcObj.rtmCancleMessage);
	$(".trm-sendmessage").html(tmcObj.rtmSendMessage);
	$("#new-subject").attr("placeholder", tmcObj.rtmSubjectMessage);
	$("#new-message").attr("placeholder", tmcObj.rtmContentMessage);
	$("#commentsh").html(tmcObj.rtmCommentsh);
	$("#comment-content").attr("placeholder", tmcObj.rtmSomethingNice);
	$(".send-btn-comment").html(tmcObj.rtmSendMessage);
	$(".npurhf").html(tmcObj.rtmnpurhis);
	$(".npayhf").html(tmcObj.rtmnpayhis);
	//$("#SetKeyword").html(tmcObj.SetKeywordtrm);
	$("#reset_passcode").html('<i class="la la-unlock-alt"></i>'+tmcObj.rtmnResetPass);
	$("#orh").html(tmcObj.rtmnorh);
	$("#loginwithh").html(tmcObj.rtmnloginwithh);
	$(".replybut").html(tmcObj.rtmnreplyb);
	$("#reply-input").attr("placeholder", tmcObj.rtmReplyInp);
}


var popupPostingMethodEnglish = {
	ppmHeader : "Posting Method",
	ppmNewCreation : "New Creation",
	ppmRecommended : "Recommended",
	ppmMyLibrary : "My Library",
	ppmDone : "Select",
};



var popupPostingMethodKorean = {
	ppmHeader : "포스팅 방법",
	ppmNewCreation : "새 포스팅",
	ppmRecommended : "추천 포스팅",
	ppmMyLibrary : "내 서재",
	ppmDone : "선택 완료",
};

var popupPostingMethodChinese = {
	ppmHeader : "发帖方法",
	ppmNewCreation : "新帖子",
	ppmRecommended : "推荐帖子",
	ppmMyLibrary : "我的书柜",
	ppmDone : "选择完毕",
};



var setPopupPostingMethodContent = function(lid){
	if(lid==2){
		pmcObj = popupPostingMethodKorean;
	}
	if(lid==3){
		pmcObj = popupPostingMethodChinese;
	}
	if(lid>1){
	$(".popup-posting-method-header").html(pmcObj.ppmHeader);
	$(".popup-posting-method-new-creation").html(pmcObj.ppmNewCreation);
	$(".popup-posting-method-recommended").html(pmcObj.ppmRecommended);
	$(".popup-posting-method-mylib").html(pmcObj.ppmMyLibrary);
	$(".posting-method-selection-done").html(pmcObj.ppmDone);
    }
	
}

var validatePassCodePopupEnglish = {
	vppHeading : "Enter Passcode",
	vppCloseBtn : "Close",
	vppDoneBtn : "Done",
} 


var validatePassCodePopupKorean = {
	vppHeading : "비밀번호 입력",
	vppCloseBtn : "닫기",
	vppDoneBtn : "완료",
}


var validatePassCodePopupChinese = {
	vppHeading : "录入密码",
	vppCloseBtn : "关闭",
	vppDoneBtn : "完成",
}


var setPassCodePopupContent = function(lid){
	if(lid==2){
		ppcObj = validatePassCodePopupKorean;
	}
	if(lid==3){
		ppcObj = validatePassCodePopupChinese;
	}
	if(lid>1){
	$(".vpc-heading").html(ppcObj.vppHeading);
	$('.privacy-passcode').attr('placeholder',ppcObj.vppHeading);
	$(".vp-close-btn").html(ppcObj.vppCloseBtn);
	$(".vp-done-btn").html(ppcObj.vppDoneBtn);
	}
}

 
var startScreenEnglish = {
	 ssComicsBtnTxt: "Comics",
	 ssCreationBtnTxt: "Creation",
	 ssSearchBtnTxt: "Search",
     ssDesc: "Enjoy the awesome Chinese webtoon! Share your creation with others! Engage in the community for fun!!",
     
};

var startScreenKorean = {
	 ssComicsBtnTxt: "웹툰",
	 ssCreationBtnTxt: "창작하기",
	 ssSearchBtnTxt: "검색",
     ssDesc: "색다른 중국의 웹툰을 즐겨보세요! 당신의 창작물을 다른 사람과 공유도하고, 즐겁게 커뮤니티에 참여해봅시다!!",
     
};

var startScreenChinese = {
	 ssComicsBtnTxt: "网漫",
	 ssCreationBtnTxt: "创作",
	 ssSearchBtnTxt: "搜索",
     ssDesc: "请将您的作品与他人共享！共同参与交流！",
     
};


var  setStartScreenContent = function(){
	 var langid = Blmani.Language.getInstance().get();
	 console.log("lang"+langid);
	 if(langid==2){
         startScreenObj = startScreenKorean;
	 } 
	 if(langid==3){
		startScreenObj = startScreenChinese; 
	 }
	 if(langid > 1){
		$(".span-comics-btn").html(startScreenObj.ssComicsBtnTxt);
		$(".span-B1-search-btn").html(startScreenObj.ssSearchBtnTxt);
		$(".span-creation-btn").html(startScreenObj.ssCreationBtnTxt);
		$(".start-desc").html(startScreenObj.ssDesc);
	 }
}





var comicBookEnglsih = {
	 comicBookHeading: "Comics",
	 comicBookLatestHeading: "Latest Comics",
     comicBookSerial: "Serial",
     comicBookComplete: "Complete",
	 comicBookRanked: "Ranked",
	 comicBookAdult: "Adult",
	 comicBookSeeMore: "SEE MORE",
	 comicBookFeatured: "FEATURED",
	 comicBookGenre: "GENRE",
	 comicBookGenreAll: "All",
	 comicBookPopular: "POPULAR",
	 comicBookLoginToast : "Login to continue posting!",
	 comicBookTop5Ranking : "Top 5 rankings",
	 comicBookTopOfWeek : "Top of the week",
};
var comicBookKorean = {
	 comicBookHeading: "웹툰",
	 comicBookLatestHeading: "최신 웹툰",
     comicBookSerial: "연재중",
     comicBookComplete: "연재완료",
	 comicBookRanked: "순위",
	 comicBookAdult: "성인",
	 comicBookSeeMore: "더 보기",
	 comicBookFeatured: "추천",
	 comicBookGenre: "장르",
	 comicBookGenreAll: "모두",
	 comicBookPopular: "인기",
	 comicBookLoginToast : "포스팅을 위해 먼저 로그인하세요!",
	 comicBookTop5Ranking : "인기작 탑5",
	 comicBookTopOfWeek : "금주의 인기작",
	 
	 
};
var comicBookChinese = {
	 comicBookHeading: "网漫",
	 comicBookLatestHeading: "最新网漫",
     comicBookSerial: "连载中",
     comicBookComplete: "完结",
	 comicBookRanked: "网漫排名",
	 comicBookAdult: "成人",
	 comicBookSeeMore: "续看",
	 comicBookFeatured: "推荐",
	 comicBookGenre: "题材",
	 comicBookGenreAll: "全部",
	 comicBookPopular: "人气网漫",
	 comicBookLoginToast : "发帖请先登录！",
	 comicBookTop5Ranking : "人气榜前五",
	 comicBookTopOfWeek : "发帖请先登录！",
	 
	 
};


var setHomeContent = function(){
	 var langid = Blmani.Language.getInstance().get();
	 console.log("lang"+langid);
	 if(langid==2){
         homeScreenbj = comicBookKorean;
	 } 
	 if(langid==3){
		homeScreenbj = comicBookChinese; 
	 }
	 if(langid > 1){
	$(".comicbook-heading").html(homeScreenbj.comicBookHeading);
	$(".comicbook-latestcomics").html(homeScreenbj.comicBookLatestHeading);
	$(".comicbook-serial").html(homeScreenbj.comicBookSerial);
	$(".comicbook-complete").html(homeScreenbj.comicBookComplete);
	$(".comicbook-ranked").html(homeScreenbj.comicBookRanked);
	$(".comicbook-adult").html(homeScreenbj.comicBookAdult);
	$(".comicbook-seemore").html(homeScreenbj.comicBookSeeMore);
	$(".comicbook-featured").html(homeScreenbj.comicBookFeatured);
	$(".comicbook-genre").html(homeScreenbj.comicBookGenre);
	$(".comicbook-genreall").html(homeScreenbj.comicBookGenreAll);
	$(".comicbook-popular").html(homeScreenbj.comicBookPopular);
	$("#toast-login").html(homeScreenbj.comicBookLoginToast);
	setRegularFooterMenuContent(langid);
	setTopMenuContent(langid);
	setPopupPostingMethodContent(langid);
	}
	
}

var setAdultScreenContent =function(){
	setHomeContent();
}

var setSerialScreenContent =function(){
	setHomeContent();
}

var setCompleteScreenContent =function(){
	setHomeContent();
}



var setFeatureScreenContent =function(){
	setHomeContent();
}


var setLatestScreenContent =function(){
	setHomeContent();
}

var setPopularScreenContent =function(){
	setHomeContent();
}
var setCoinStoreScreenContent =function(){
	setHomeContent();
}
var setCoinPurchaseScreenContent =function(){
	setHomeContent();
}
var setRankedScreenContent =function(){
	setHomeContent();
	var langid = Blmani.Language.getInstance().get();
	 console.log("lang"+langid);
	 if(langid==2){
         homeScreenbj = comicBookKorean;
	 } 
	 if(langid==3){
		homeScreenbj = comicBookChinese; 
	 }
	 if(langid > 1){
	//for ranking
	   $(".comicbook-topranking").html(homeScreenbj.comicBookTop5Ranking);
	   $(".comicbook-topoftheweek").html(homeScreenbj.comicBookTopOfWeek);
	 }
}

var setSerialScreenContent =function(){
	setHomeContent();
}

var setLanguageScreenContent = function(){
	
	var langid = Blmani.Language.getInstance().get();
	 console.log("lang"+langid);
	 if(langid==2){
         //$(".header-title").html("언어");
		 $(".flag-en").html('영어<i class="la la-check"></i>');
		 $(".flag-ko").html('한국어<i class="la la-check"></i>');
		 $(".flag-zh").html('중국어<i class="la la-check"></i>');	
	 } 
	 if(langid==3){
		//$(".header-title").html("语言");
		$(".flag-en").html('英文<i class="la la-check"></i>');
	    $(".flag-ko").html('韩国语<i class="la la-check"></i>');
		$(".flag-zh").html('中文<i class="la la-check"></i>');	
	 }
	 setTopMenuContent(langid);
	
}





   

var searchingEnglish = {
    searchHeading : "Blmani",
    searchReset : "RESET",	
 	searchFirstCreation : "1st Creation",	
	search2ndReproduction : "2nd Reproduction",
    searchProcessingRequest : "Processing request...",	
    searchToastX  : "You are not Added into viewers list!",
	searchToastFav : "Added to favourite List",
	searchToastInvalid : "Invalid Passcode!",
	searchSelectedText : "Selected Keywords",
	searchFieldPlace : "Enter keyword to search",
	searchResults : "Search Results",
	searchWeSorry : "No data found!",
	searchWeCoundNot : "No matching result founded.",
	searchBtn : "Search",
	searchFooterView : "View",
	searchFooterFav : "Favorite",
}
var searchingKorean = {
	searchHeading : "Blmani",
    searchReset : "초기화",	
 	searchFirstCreation : "1차 연성(순수창작)",	
	search2ndReproduction : "2차 연성(재창작)",
    searchProcessingRequest : "처리 요청중...",	
    searchToastX  : "당신은 연람 가능자 목록에 없습니다. ",
	searchToastFav : "관심 목록에 등록되었습니다. ",
	searchToastInvalid : "비밀번호 불일치!",
	searchSelectedText : "선택된 키워드",
	searchFieldPlace : "검색할 키워드를 입력하세요",
	searchResults : "검색 결과",
	searchWeSorry : "검색 결과가 없습니다. ",
	searchWeCoundNot : "검색 조건에 일치하는 결과가 없습니다. ",
	searchBtn : "검색",
	searchFooterView : "보기",
	searchFooterFav : "관심목록",
}
var searchingChinese = {
	searchHeading : "Blmani",
    searchReset : "重置",	
 	searchFirstCreation : "1次延展（纯创作）",	
	search2ndReproduction : "2次延展",
    searchProcessingRequest : "处理请求中…",	
    searchToastX  : "您不在可阅读名单中。",
	searchToastFav : "已加入关注目录",
	searchToastInvalid : "密码不一致！",
	searchSelectedText : "被选的关键词",
	searchFieldPlace : "请输入关键词。",
	searchResults : "搜索结果",
	searchWeSorry : "抱歉！",
	searchWeCoundNot : "未找到任何匹配的结果。",
	searchBtn : "搜索",
	searchFooterView : "查看",
	searchFooterFav : "关注目录",
	
}

var setSearchScreenContent = function(){
   var langid = Blmani.Language.getInstance().get();
	 console.log("lang"+langid);
	 if(langid==2){
         searchScreenObj = searchingKorean;
	 } 
	 if(langid==3){
		searchScreenObj = searchingChinese; 
	 }
	 if(langid > 1){
  $(".searhcing-heading").html(searchScreenObj.searchHeading);
  $(".reset-search").html(searchScreenObj.searchReset);
  $(".fc-tab").html(searchScreenObj.searchFirstCreation);
  $(".sr-tab").html(searchScreenObj.search2ndReproduction);
  $("#processingreq").html(searchScreenObj.searchProcessingRequest);
  $("#toast-x").html(searchScreenObj.searchToastX);
  $("#toast-fav").html(searchScreenObj.searchToastFav);
  $("#toast-invalid").html(searchScreenObj.searchToastInvalid);
  $(".search-select-txt").html(searchScreenObj.searchSelectedText);
  $(".srl-section-heading").html(searchScreenObj.searchResults);
  $(".search-we-sorry").html(searchScreenObj.searchWeSorry);
  $(".could-not-find").html(searchScreenObj.searchWeCoundNot);
  $(".search-comics").html(searchScreenObj.searchBtn);
  $(".search-comics").html(searchScreenObj.searchBtn);
  $(".search-etc-tag-input").attr("placeholder",searchScreenObj.searchFieldPlace);
  $("#post_favourite").html('<i class="la la-heart"></i> '+searchScreenObj.searchFooterFav);
  $("#spost_view").html('<i class="la la-eye"></i> '+searchScreenObj.searchFooterView);
  }
    setRegularFooterMenuContent(langid);
	setPopupPostingMethodContent(langid);
	setPassCodePopupContent(langid);
}

var StoryScreenEnglsih ={
	storyProcessing : "Proccessing...",
	storyToastFav : "Added to favourite List",
	storyToastUnfav : "Removed from favourite List",
	storyToastLike : "Item Liked!",
	storyToastUnlike : "Removed from liked List!",
	storyToastX : "Login to add Favourite/Like Listing!",
	storyEpisodes : "Episodes",
	storyInformation : "Information",
	storyGenres : "Keywords",
	storyDesc : "Description",
	storyAlign : "Align",
	supUnlockEpisode : "Unlock Episode",
	supUnlockBtn : "Unlock",
	supThisEpi : "This Episode",
	storyToastnoBalance : "Purchase coisn to view!",
}


var StoryScreenKorean ={
	storyProcessing : "처리중...",
	storyToastFav : "내 관심목록에 추가되었습니다.",
	storyToastUnfav : "내 관심목록에서 삭제되었습니다.",
	storyToastLike : "“좋아요” 목록에 추가되었습니다.",
	storyToastUnlike : "“좋아요” 목록에서 삭제되었습니다.",
	storyToastX : "“관심목록”이나 “좋아요”를 위해서는 로그인해야 합니다.",
	storyEpisodes : "에피소드(화)",
	storyInformation : "관련정보",
	storyGenres : "키워드",
	storyDesc : "설명",
	storyAlign : "정열",
	supUnlockEpisode : "잠김 풀기",
	supUnlockBtn : "잠그기",
	supThisEpi : "This Episode",
	storyToastnoBalance : "코인 구매가 필요합니다!",
	storyToastnoBalance : '코인 구매가 필요합니다!',
	
}

var StoryScreenChinese ={
	storyProcessing : "处理中…",
	storyToastFav : "添加到我的关注目录。",
	storyToastUnfav : "从我的关注目录中删除。",
	storyToastLike : "添加到“喜欢”目录。",
	storyToastUnlike : "从“喜欢”目录中删除。",
	storyToastX : "为“关注目录”或是“喜欢”请先登录。",
	storyEpisodes : "插曲（集）",
	storyInformation : "相关信息",
	storyGenres : "关键词",
	storyDesc : "说明",
	storyAlign : "排列",
	supUnlockEpisode : "解锁",
	supUnlockBtn : "锁定",
	supThisEpi : "This Episode",
	storyToastnoBalance : "需购买虚拟币！",
}

var setStoryContent = function(){
	var langid = Blmani.Language.getInstance().get();
	 console.log("lang"+langid);
	 if(langid==2){
         storyScreenObj = StoryScreenKorean;
	 } 
	 if(langid==3){
		storyScreenObj = StoryScreenChinese; 
	 }
	 if(langid > 1){ 
	    $("#processingreg").html(storyScreenObj.storyProcessing);
		$("#toast-fav").html(storyScreenObj.storyToastFav);
		$("#toast-unfav").html(storyScreenObj.storyToastUnfav);
		$("#toast-like").html(storyScreenObj.storyToastLike);
		$("#toast-unlike").html(storyScreenObj.storyToastUnlike);
		$("#toast-x").html(storyScreenObj.storyToastX);
		$('#toast-inbal').html(storyScreenObj.storyToastnoBalance);
		$(".story-episodes").html(storyScreenObj.storyEpisodes);
		$(".story-information").html(storyScreenObj.storyInformation);
		$(".story-genre").html(storyScreenObj.storyGenres);
		$(".story-desc").html(storyScreenObj.storyDesc);
		$(".story-align").html(storyScreenObj.storyAlign+' <i class="zmdi zmdi-swap-vertical"></i>');
		$(".str-unlockepi").html(storyScreenObj.supUnlockEpisode);
	//	$(".str-thisepi").html(storyScreenObj.supThisEpi);
		$("#unlockepisode").html(storyScreenObj.supUnlockBtn);
		
		setRegularFooterMenuContent(langid);
	    setPopupPostingMethodContent(langid);
	 }
}



var mylibScreenEnglish = {
	mslToast1 :"Please Select Item!",
	mslToastDel :"Item Removed!",
	mslProcessingReq :"Processing Request...",
	mslHeading :"My Library",
	mslMyWork :"My Works",
	mslMyPotsing :"My Postings",
	mslMyFav :"My Favorites",
	mslNoRecordFound :"No Saved work Found!",
	mslDelWork :"Delete",
	mslEditWork :"Edit Work",
	mslpublishWork :"Publish",
}



var mylibScreenKorean = {
	mslToast1 :"작업물을 선택하세요!",
	mslToastDel :"작업물이 지워졌습니다!",
	mslProcessingReq :"처리 요청중...",
	mslHeading :"내 서재",
	mslMyWork :"내 작업목록",
	mslMyPotsing :"내 포스팅",
	mslMyFav :"내 관심목록",
	mslNoRecordFound :"저장된 자업이 없습니다!",
	mslDelWork :"삭제",
	mslEditWork :"작업 수정",
	mslpublishWork :"배포하기",
}


var mylibScreenChinese = {
	mslToast1 :"请选择项目！",
	mslToastDel :"项目被删除！",
	mslProcessingReq :"处理请求中…",
	mslHeading :"我的书柜",
	mslMyWork :"我的操作目录",
	mslMyPotsing :"我的帖子",
	mslMyFav :"我的关注目录",
	mslNoRecordFound :"无储存项目！",
	mslDelWork :"删除",
	mslEditWork :"操作修改",
	mslpublishWork :"发布",
}



var setMyLibContent = function(){
	var langid = Blmani.Language.getInstance().get();
	 console.log("lang"+langid);
	 if(langid==2){
         mylibScreen = mylibScreenKorean;
	 } 
	 if(langid==3){
		mylibScreen = mylibScreenChinese; 
	 }
	 if(langid > 1){ 
	$("#toast-1").html(mylibScreen.mslToast1);
	$("#toast-del").html(mylibScreen.mslToastDel);
	$("#processingreq").html(mylibScreen.mslProcessingReq);
	$(".mylib-heading").html(mylibScreen.mslHeading);
	$(".ml-myworks").html(mylibScreen.mslMyWork);
	$(".ml-myposting").html(mylibScreen.mslMyPotsing);
	$(".ml-myfav").html(mylibScreen.mslMyFav);
	$(".norecfound").html(mylibScreen.mslNoRecordFound);
	$("#delete_work").html('<i class="la la-trash"></i> '+mylibScreen.mslDelWork);
	$("#edit_work").html('<i class="la la-pencil"></i> '+mylibScreen.mslEditWork);
	$("#publish_work").html('<i class="la la-cloud-download"></i> '+mylibScreen.mslpublishWork);
	  setRegularFooterMenuContent(langid);
	  setPopupPostingMethodContent(langid);
	  setTopMenuContent(langid);
	 }
}

var myPostingScreenEnglish = {
	mpsProcessReq : "Processing Request...",
	mpsToast1 : "Please Select Item!",
	mpsToast2 : "Item unpublished!",
	mpsToastInValid : "Invalid Passcode!",
	mpsToastUrlCopied : "URL is copied to clipboard!",
	mpsHeading : "My Library",
	mpsMyWork : "My Work",
	mpsMyPosting : "My Posting",
	mpsMyFav : "My Favorites",
	mpsFcTab : "1st Creation",
	mpsSrTab : "2nd Reproduction",
	mpsPostUnPublish : "Unpublish",
	mpsPostShare : "Share",
	mpsPostView : "View",
	mpsSharePostHeading : "Share my Posting",
	mpsCloseButton : "Close",
	mpsCheckPublishingResultsTxt : "Check Publishing Results",
	mpsNCF : "No Posting Found!",
	mpsPublic : "Public",
	mpsPrivate : "Private",
	mpsLocked : "Locked",
	storyAlign : "Align",
	installFacebook :"Install Facebook app to share",
	installTwitter :"Install Twitter app to share",
	vppHeading : "Enter Passcode",
	vppCloseBtn : "Close",
	vppDoneBtn : "Done",
}

var myPostingScreenKorean = {
	mpsProcessReq : "처리 요청중...",
	mpsToast1 : "작업물을 선택하세요!",
	mpsToast2 : "2차 연성(재창작)",
	mpsToastInValid : "비밀번호 불일치!",
	mpsToastUrlCopied : "URL링크 클립보드에 복사 완료!",
	mpsHeading : "내 서재",
	mpsMyWork : "내 작업목록",
	mpsMyPosting : "내 포스팅",
	mpsMyFav : "내 관심목록",
	mpsFcTab : "1차 연성(순수창작)",
	mpsSrTab : "2차 연성",
	mpsPostUnPublish : "포스팅 취소",
	mpsPostShare : "공유하기",
	mpsPostView : "보기",
	mpsSharePostHeading : "내 포스팅 공유하기",
	mpsCloseButton : "닫기",
	mpsCheckPublishingResultsTxt : "포스팅 결과보기",
	mpsNCF : "포스팅된 작업이 없습니다!",
	mpsPublic : "공개",
	mpsPrivate : "나만보기",
	mpsLocked : "비밀글",
	storyAlign : "정열",
	installFacebook :"공유하려면  패이스북앱이 필요합니다.",
	installTwitter :"공유하려면 트위터 앱이 필요합니다.",
	vppHeading : "비밀번호 입력",
	vppCloseBtn : "닫기",
	vppDoneBtn : "완료",
	
}

var myPostingScreenChinese = {
	mpsProcessReq : "处理请求中…",
	mpsToast1 : "请选择项目！",
	mpsToast2 : "项目未出版！",
	mpsToastInValid : "密码不一致！",
	mpsToastUrlCopied : "URL链接成功复制到剪贴板！",
	mpsHeading : "我的书柜",
	mpsMyWork : "我的操作目录",
	mpsMyPosting : "我的帖子",
	mpsMyFav : "我的关注目录",
	mpsFcTab : "1次延展（纯创作）",
	mpsSrTab : "2次延展",
	mpsPostUnPublish : "取消帖子",
	mpsPostShare : "共享",
	mpsPostView : "查看",
	mpsSharePostHeading : "共享我的帖子",
	mpsCloseButton : "关闭",
	mpsCheckPublishingResultsTxt : "查看发帖结果",
	mpsNCF : "无发帖项目！",
	mpsPublic : "公开",
	mpsPrivate : "只有我看得到",
	mpsLocked : "秘密文章",
	storyAlign : "排列",
	installFacebook :"共享需要脸谱 App。",
	installTwitter :"共享需要推特App。",
	vppHeading : "录入密码",
	vppCloseBtn : "关闭",
	vppDoneBtn : "完成",
	
}


var setMyPostingContent = function(){
	var langid = Blmani.Language.getInstance().get();
	 console.log("lang"+langid);
	 if(langid==2){
         myPostingScreen = myPostingScreenKorean;
	 } 
	 if(langid==3){
		myPostingScreen = myPostingScreenChinese; 
	 }
	 if(langid > 1){ 
	 $("#toast-sharefb").html(myPostingScreen.installFacebook);
	 $("#toast-shareTwitter").html(myPostingScreen.installTwitter);
	
	
	$("#toast-1").html(myPostingScreen.mpsToast1);
	$("#toast-2").html(myPostingScreen.mpsToast2);
	$("#toast-urlcopied").html(myPostingScreen.mpsToastUrlCopied);
	$("#toast-invalid").html(myPostingScreen.mpsToastInValid);
	$("#processingreq").html(myPostingScreen.mpsProcessReq);
	$(".mylib-heading").html(myPostingScreen.mpsHeading);
	$(".ml-myworks").html(myPostingScreen.mpsMyWork);
	$(".ml-myposting").html(myPostingScreen.mpsMyPosting);
	$(".ml-myfav").html(myPostingScreen.mpsMyFav);
	$(".fc-tab").html(myPostingScreen.mpsFcTab);
	$(".sr-tab").html(myPostingScreen.mpsSrTab);
	$(".ncf").html(myPostingScreen.mpsNCF);
	$(".mycomics-fcreation-public-heading").html(myPostingScreen.mpsPublic);
	$(".mycomics-sreproduction-public-heading").html(myPostingScreen.mpsPublic);
	$(".mycomics-fcreation-private-heading").html(myPostingScreen.mpsPrivate);
	$(".mycomics-sreproduction-heading").html(myPostingScreen.mpsPrivate);
	$(".mycomics-fcreation-locked-heading").html(myPostingScreen.mpsLocked);
	$(".mycomics-sreproduction-locked-heading").html(myPostingScreen.mpsLocked);
	$("#post_unpublish").html('<i class="la la-cloud-download"> '+myPostingScreen.mpsPostUnPublish);
	$("#post_share").html('<i class="la la-share-alt"></i> '+myPostingScreen.mpsPostShare);
	$("#post_view").html('<i class="la la-eye"></i> '+myPostingScreen.mpsPostView);
	
	$(".share-heading").html(myPostingScreen.mpsSharePostHeading);
	$(".check-publishing-results").html(myPostingScreen.mpsCheckPublishingResultsTxt);
	$(".close-btn").html(myPostingScreen.mpsCloseButton);
    $("#facebook_share_btn").html('<i class="la la-facebook"></i> '+myPostingScreen.mpsPostShare);
	$("#twitter_share_btn").html('<i class="la la-twitter"></i> '+myPostingScreen.mpsPostShare);
	
	$(".story-align").html(myPostingScreen.storyAlign+' <i class="zmdi zmdi-swap-vertical"></i>');
	
	
	$(".trmEnterPasscode").html(myPostingScreen.vppHeading);
	$(".trmClosePasscode").html(myPostingScreen.vppCloseBtn);
	$(".trmDonePasscode").html(myPostingScreen.vppDoneBtn);
	$(".trmResetPlaceH").attr("placeholder", myPostingScreen.vppHeading);

	  setRegularFooterMenuContent(langid);
	  setPopupPostingMethodContent(langid);
	  setTopMenuContent(langid);
	 
	}
}





var publishScreenEnglish = {
	rsProcessingReq : "Publishing Post...",
	rsScreenHeading : "Set Publishing Information",
	rsToast1 : "You have not added any user!",
	rsToast2 : "Passcode lenght of 4, without space required!",
	rsToast3 : "Attach thumbnail!",
	rsToastTitle : "Story Title Required!",
	rsToastUrl : "Url required!",
	rsToastInValidUrl : "Invalid Url!",
	rsToastFc : "Select Genre, A-Type & D-Type!",
	rsToastSr: "Select Content, Title & Character!",
	rsToastUrlCopied: "URL is copied to clipboard!",
	rsFC: "1st Creation",
	rsSR: "2nd Reproduction",
	rsAdditiontags : "Set keyword to register",
	rsPrivacyBounds : "Privacy Bounds",
	rsPrivacy1 : "Public",
	rsPrivacy2 : "My Pick",
	rsPrivacy3 : "Private",
	rsPrivacy4 : "Locked",
    rsPublishBtn : "Publish",
	rsSelected :"Selected",
	rsStoryTitle : "Story Title",
	rsStoryTitlePlaceholder : "Enter Story Title",
	rsTabHere : "Tab Here",
	rsToUploadThumb : "to upload thumb",
	rsToPixels : "500x500 pixels",
	rsUrlForLink : "URL for Link",
	rsUrlForLinkPlaceholder : "Copy & paste URL",
	rsDesc : "Description",
	rsDescPlaceHolder : "Write your description for this recommendation. Short introduction for the posting content",
	mpsPostShare : "Share",
	mpsPostView : "View Post",
	mpsCloseButton : "Close",
	mpsCompletePostHeading : "Posting Completed",
	mpsCompletePostDetail : "Your posting ctompleted. Share your posting to your SNS.",
	mpsCheckPublishingResultsTxt : "Check Publishing Results",
	
	installFacebook :"Install Facebook app to share",
	installTwitter :"Install Twitter app to share",
}

var publishScreenKorean = {
	rsProcessingReq : "포스팅 처리중...",
	rsScreenHeading : "포스팅 정보 설정",
	rsToast1 : "연람할 사용사를 선택해야 합니다. ",
	rsToast2 : "비밀번호는 공백문자 없이 최소4자리 이상이어야 합니다!",
	rsToast3 : "썸네일을 설정하세요!",
	rsToastTitle : "포스팅 제목을 설정하세요!",
	rsToastUrl : "URL을 설정하세요!",
	rsToastInValidUrl : "URL 형식이 맞지 않습니다!",
	rsToastFc : "포스팅 카테고리를 반드시 선택하세요!",
	rsToastSr: "포스팅 카테고리를 반드시 선택하세요!",
	rsToastUrlCopied: "URL링크 클립보드에 복사 완료!",
	rsFC: "1차 연성(순수창작)",
	rsSR: "2차 연성(재창작)",
	rsAdditiontags :"등록하려면 '키워드'를 입력하세요.",
	rsPrivacyBounds : "프라이버시 영역",
	rsPrivacy1 : "공개",
	rsPrivacy2 : "마이픽",
	rsPrivacy3 : "나만보기",
	rsPrivacy4 : "비밀글",
    rsPublishBtn : "포스팅",
	rsHeaderTitle : "포스트 스토리",
	rsSelected :"선택된 키워드",
	rsStoryTitle : "포스팅 제목",
	rsStoryTitlePlaceholder : "포스팅 제목을 입력하세요",
	rsTabHere : "터치하세요",
	rsToUploadThumb : "썸네일 등록",
	rsToPixels : "500x500 픽셀",
	rsUrlForLink : "링크를 위한 URL",
	rsUrlForLinkPlaceholder : "URL복사해서 붙이기",
	rsDesc : "설명",
	rsDescPlaceHolder : "여기에  추천포스팅에 대한 설명을 적으세요.",
	mpsPostShare : "공유하기",
	mpsPostView : "포스팅보기",
	mpsCloseButton : "닫기",
	mpsCompletePostHeading : "포스팅 완료",
	mpsCompletePostDetail : "포스팅이 완료되었습니다. SNS를 통해 공유해보세요^^",
	mpsCheckPublishingResultsTxt : "포스팅 결과보기",
	installFacebook :"공유하려면  패이스북앱이 필요합니다.",
    installTwitter :"공유하려면 트위터 앱이 필요합니다.",
	
	
}

var publishScreenChinese = {
	rsProcessingReq : "帖子处理中…",
	rsScreenHeading : "帖子信息设定",
	rsToast1 : "请选择阅览用户。",
	rsToast2 : "密码需至少为无空格的4位数以上！",
	rsToast3 : "请设置缩略图！",
	rsToastTitle : "请填写帖子题目！",
	rsToastUrl : "请设置URL！",
	rsToastInValidUrl : "URL格式错误！",
	rsToastFc : "帖子分类为必选项！",
	rsToastSr: "帖子分类为必选项！",
	rsToastUrlCopied: "URL链接成功复制到剪贴板！",
	rsFC: "1次延展（纯创作）",
	rsSR: "2次延展",
	rsAdditiontags :  "登录请输入“关键词”。",
	rsPrivacyBounds : "隐私界限",
	rsPrivacy1 : "公开",
	rsPrivacy2 : "选择",
	rsPrivacy3 : "只有我看得到",
	rsPrivacy4 : "秘密文章",
    rsPublishBtn : "帖子",
	rsHeaderTitle : "포스트 스토리",
	rsSelected :"被选的关键词",
	rsStoryTitle : "发帖题目",
	rsStoryTitlePlaceholder : "请录入发帖题目",
	rsTabHere : "请点击",
	rsToUploadThumb : "缩略图登录",
	rsToPixels : "500x500 像素",
	rsUrlForLink : "链接的URL",
	rsUrlForLinkPlaceholder : "复制粘贴URL",
	rsDesc : "说明",
	rsDescPlaceHolder : "请输入推荐帖子的说明。",
	mpsPostShare : "共享",
	mpsPostView : "看帖",
	mpsCloseButton : "关闭",
	mpsCompletePostHeading : "发帖完成",
	mpsCompletePostDetail : "发帖完成，请通过SNS共享。",
	mpsCheckPublishingResultsTxt : "看发帖结果",
    installFacebook :"共享需要脸谱 App。",
    installTwitter :"共享需要推特App。",
}


var setPublishingScreenContent = function (){
	
	var langid = Blmani.Language.getInstance().get();
	 console.log("lang"+langid);
	 if(langid==2){
         publishScreen = publishScreenKorean;
	 } 
	 if(langid==3){
		publishScreen = publishScreenChinese; 
	 }
	 if(langid > 1){ 
	 $("#toast-sharefb").html(publishScreen.installFacebook);
	 $("#toast-shareTwitter").html(publishScreen.installTwitter);
	
	
	 $(".class-tap-here").html(publishScreen.rsTabHere);
	 $(".class-to-upload").html(publishScreen.rsToUploadThumb);
	 //$(".class-pixels").html(publishScreen.rsToPixels);
	 $(".posting-complete").html(publishScreen.mpsCompletePostHeading);
	 $(".posting-complete-detail").html(publishScreen.mpsCompletePostDetail);
	 $(".check-publishing-results").html(publishScreen.mpsCheckPublishingResultsTxt);
	 $(".share-view").html(publishScreen.mpsPostView);
	 $(".share-close").html(publishScreen.mpsCloseButton);
	 $(".story-title-label").html(publishScreen.rsStoryTitle);
	 $("#titleField").attr('placeholder',publishScreen.rsStoryTitlePlaceholder);
	 $(".url-lable").html('<em>'+publishScreen.rsUrlForLink+'</em>');
	 $(".url-desc").html('<em>'+publishScreen.rsDesc+'</em>');
	$("#urlflinkField").attr('placeholder',publishScreen.rsUrlForLinkPlaceholder);
	$("#descField").attr('placeholder',publishScreen.rsDescPlaceHolder);
	$(".desc-lable").html('<em>'+publishScreen.rsDesc+'</em>');
	$('#processingreq').html(publishScreen.rsProcessingReq);
	$('.screen-heading').html(publishScreen.rsScreenHeading);
	$('#toast-1').html(publishScreen.rsToast1);
	$('#toast-2').html(publishScreen.rsToast2);
	$('#toast-3').html(publishScreen.rsToast3);
	$('#toast-title').html(publishScreen.rsToastTitle);
	$('#toast-url').html(publishScreen.rsToastUrl);
	$('#toast-invalidurl').html(publishScreen.rsToastInValidUrl);
	$('#toast-fc').html(publishScreen.rsToastFc);
	$('#toast-sr').html(publishScreen.rsToastSr);
	$('#toast-urlcopied').html(publishScreen.rsToastUrlCopied);
	$('.additional-title-label').html(publishScreen.rsAdditiontags);
	$('.additional-hash-keywords').attr('placeholder',publishScreen.rsAdditiontags);
	$(".selected-txt").html(publishScreen.rsSelected);
	$(".story-title-label").html();
	$(".fc-tab").html(publishScreen.rsFC);
	$(".sr-tab").html(publishScreen.rsSR);
	$(".pb-heading").html(publishScreen.rsPrivacyBounds);
	$('.pb1').html(publishScreen.rsPrivacy1);
	$('.pb2').html(publishScreen.rsPrivacy2);
	$('.pb3').html(publishScreen.rsPrivacy3);
	$('.pb4').html(publishScreen.rsPrivacy4);
	$('.publish-btn').html(publishScreen.rsPublishBtn);
	//$('.header-title').html(publishScreen.rsHeaderTitle);
	$("#facebook_share_btn").html('<i class="la la-facebook"></i> '+publishScreen.mpsPostShare);
	$("#twitter_share_btn").html('<i class="la la-twitter"></i> '+publishScreen.mpsPostShare);
	setPassCodePopupContent(langid);
	}
}



var myFavScreenEnglish = {
	mflToastFav :"Item removed from favourite list!",
	mflToastInvalid :"Invalid Passcode!",
	mflToastX :"You are not Added into viewers list!",
	mflProcessingReq :"Processing Request...",
	mflHeading :"My Library",
	mslMyWork :"My Works",
	mslMyPotsing :"My Postings",
	mslMyFav :"My Favorites",
	mslNoRecordFound :"No Favorite Found!",
	mslDelFav :"unfavourite",
	mslView :"View",
	
}


var myFavScreenKorean = {
	mflToastFav :"대상을 관심목록에서 제거합니다!",
	mflToastInvalid :"비밀번호 불일치!",
	mflToastX :"당신은 연람 가능 목록에 없습니다. ",
	mflProcessingReq :"처리 요청중...",
	mflHeading :"내 서재",
	mslMyWork :"내 작업목록",
	mslMyPotsing :"내 포스팅",
	mslMyFav :"내 관심목록",
	mslNoRecordFound :"관심목록이 비었습니다.",
	mslDelFav :"관심 목록에서 제거",
	mslView :"보기",
	
}

var myFavScreenChinese = {
	mflToastFav :"从关注目录中移除！",
	mflToastInvalid :"密码不一致！",
	mflToastX :"您不在可观看目录中。",
	mflProcessingReq :"处理请求中...",
	mflHeading :"我的书柜",
	mslMyWork :"我的操作目录",
	mslMyPotsing :"我的帖子",
	mslMyFav :"我的关注目录",
	mslNoRecordFound :"无关注漫画！",
	mslDelFav :"从关注目录中移除！",
	mslView :"查看",
	
}





var setMyFavContent = function(){
	 var langid = Blmani.Language.getInstance().get();
	 console.log("lang"+langid);
	 if(langid==2){
         myFavScreen = myFavScreenKorean;
	 } 
	 if(langid==3){
		myFavScreen = myFavScreenChinese; 
	 }
	 if(langid > 1){ 
	$("#toast-fav").html(myFavScreen.mflToastFav);
	$("#toast-x").html(myFavScreen.mflToastX);
	$("#toast-invalid").html(myFavScreen.mflToastInvalid);
	$("#processingreq").html(myFavScreen.mflProcessingReq);
	$(".mylib-heading").html(myFavScreen.mflHeading);
	$(".ml-myworks").html(myFavScreen.mslMyWork);
	$(".ml-myposting").html(myFavScreen.mslMyPotsing);
	$(".ml-myfav").html(myFavScreen.mslMyFav);
	$(".norecfound").html(myFavScreen.mslNoRecordFound);
	$("#fav_unfav").html('<i class="la la-heart-o"></i> '+myFavScreen.mslDelFav);
	$("#spost_view").html('<i class="la la-eye"></i> '+myFavScreen.mslView);
	
	  setRegularFooterMenuContent(langid);
	  setPopupPostingMethodContent(langid);
	  setTopMenuContent(langid);
	 }
}





var loginScreenEnglish = {	 
	 lsSuccessToast: "You are Successfully logged in.",
	 lsErrorToast: "Check your emailaddress to activate your account.",
	 lsErrorForm : "Invalid username/email or password!",
	 lsHeadingLoginScreen: "Sign in using email or username",
	 lsErrUsernameRequired: "Username or email is required!",
	 lsErrPasswordRequired: "Password is required!",
	 lsPlaceUsername: "Username",
	 lsPlacePassword: "Password",
	 lsBtnSignup: "Signup",
	 lsBtnForgot: "Forgot Password",
	 lsBtnSignIn: "Sign in",
	 lsBtnFbLogin: "Sign in with Facebook",
};


var loginScreenKorean = {	 
	 lsSuccessToast: "성공적으로 로그인하였습니다",
	 lsErrorToast: "이메일을 확인하고 계정을 활성화하세요",
	 lsErrorForm : "사용자명/이메일 또는 패스워드가 맞지 않습니다. ",
	 lsHeadingLoginScreen: "사용자명 또는 이메일로 로그인하세요",
	 lsErrUsernameRequired: "사용자명 또는 이메일이 필요합니다!",
	 lsErrPasswordRequired: "패스워드가 필요합니다",
	 lsPlaceUsername: "사용자명 또는 이메일",
	 lsPlacePassword: "패스워드",
	 lsBtnSignup: "계정등록",
	 lsBtnForgot: "패스워드를 잊었나요?",
	 lsBtnSignIn: "로그인",
	 lsBtnFbLogin: "패이스북아이디로 로그인",
};


var loginScreenChinese = {	 
	 lsSuccessToast: "成功登陆",
	 lsErrorToast: "请确认邮件激活账号。",
	 lsErrorForm : "用户名/邮箱或是密码不一致。",
	 lsHeadingLoginScreen: "请用用户名或是邮箱登录。",
	 lsErrUsernameRequired: "需要用户名或是邮箱！",
	 lsErrPasswordRequired: "需要密码",
	 lsPlaceUsername: "用户名或是邮箱",
	 lsPlacePassword: "密码",
	 lsBtnSignup: "账户登录",
	 lsBtnForgot: "忘记密码？",
	 lsBtnSignIn: "登录",
	 lsBtnFbLogin: "Facebook ID登录",
};

var  setLoginScreenContent = function(){
	 var langid = Blmani.Language.getInstance().get();
	 console.log("lang"+langid);
	 if(langid==2){
         loginScreenObj = loginScreenKorean;
	 } 
	 if(langid==3){
		 loginScreenObj = loginScreenChinese; 
	 }
	 if(langid > 1){
		$("#toast-2").html(loginScreenObj.lsSuccessToast);
		$("#toast-3").html(loginScreenObj.lsErrorToast);
		$("#formError3").html(loginScreenObj.lsErrorForm);
		$(".signin-page-heading").html(loginScreenObj.lsHeadingLoginScreen);
		$(".err-username-required").html(loginScreenObj.lsErrUsernameRequired);
		$(".err-password-required").html(loginScreenObj.lsErrPasswordRequired);
		$("#usernameField").attr("placeholder",loginScreenObj.lsPlaceUsername);
		$("#passwordField").attr("placeholder",loginScreenObj.lsPlacePassword);
		
		$(".login-screen-signup-btn").html('<i class="la-user-plus"></i>'+loginScreenObj.lsBtnSignup);
		$(".ls-forgot-password").html('<i class="fa fa-eye"></i>'+loginScreenObj.lsBtnForgot);
		$("#loginSubmitButton").val(loginScreenObj.lsBtnSignIn);
		$(".facebook-login").html('<i class="fab fa-facebook"></i>'+loginScreenObj.lsBtnFbLogin);

 }
}



var signupScreenEnglsih = {
	 suSuccessToast: "You are Successfully Signed up.",
	 suActivationtoast : "We have sent Activation link to your email, please activate your account before login.",
	 suPageHeading: "Signup using email",
	 suErrUsername: "Username is required!",
	 suErrPassword: "Password is required!",
	 suErrCPassword: "Confrim Password Required!",
	 suErrCPasswordWrong: "Passwords don't match!",
	 suErrEmail: "Email is required!",
	 suErrEmailWrong: "Email address must be valid!",
	 suPlaceUsername: "Username",
	 suPlaceEmail: "Type your email",
	 suPlacePassword: "Password",
	 suPlaceCPassword: "Confrim Password",
	 suBtnSignup: "Sign Up",
	 suBtnHaveAcount: "Have an Account?",
};

var signupScreenKorean = {
	 suSuccessToast: "계정등록이 정상적으로 이뤄졌습니다",
	 suActivationtoast : "账号激活链接已发至您的邮箱，使用APP之前请激活账号。",
	 suPageHeading: "이메일로 계정등록 하기",
	 suErrUsername: "사용자명이 필요합니다!",
	 suErrPassword: "패스워드가 필요합니다!",
	 suErrCPassword: "请确认密码。",
	 suErrCPasswordWrong: "密码不一致！",
	 suErrEmail: "이메일이 필요합니다!",
	 suErrEmailWrong: "유효하지 않은 이메일입니다!",
	 suPlaceUsername: "사용자명",
	 suPlaceEmail: "이메일을 입력하세요",
	 suPlacePassword: "패스워드",
	 suPlaceCPassword: "패스워드 확인",
	 suBtnSignup: "계정등록",
	 suBtnHaveAcount: "이미 계정이 있나요?",
};


var signupScreenChinese = {
	 suSuccessToast: "账户登录成功",
	 suActivationtoast : "我们已将激活链接发送到您的电子邮箱，请在登录前激活您的帐户。",
	 suPageHeading: "需要用户名！",
	 suErrUsername: "需要用户名！",
	 suErrPassword: "需要密码！",
	 suErrCPassword: "需要密码！",
	 suErrCPasswordWrong: "密码不一致！",
	 suErrEmail: "需要邮箱！",
	 suErrEmailWrong: "无效邮箱地址！",
	 suPlaceUsername: "用户名",
	 suPlaceEmail: "请录入邮箱地址",
	 suPlacePassword: "密码",
	 suPlaceCPassword: "确认密码",
	 suBtnSignup: "账户登录",
	 suBtnHaveAcount: "已经拥有账户了吗？",
};


var setSignupScreenContent = function(){
	var langid = Blmani.Language.getInstance().get();
	 console.log("lang"+langid);
	 if(langid==2){
         signupScreenObj = signupScreenKorean;
	 } 
	 if(langid==3){
		 signupScreenObj = signupScreenChinese; 
	 }
	 if(langid > 1){
    	$("#toast-2").html(signupScreenObj.suActivationtoast);
		$(".su-page-title").html(signupScreenObj.suPageHeading);
		$(".su-page-title").html(signupScreenObj.suPageHeading);
		$(".su-err-username").html(signupScreenObj.suErrUsername);
		$(".su-err-password").html(signupScreenObj.suErrPassword);
		$(".su-err-vpassword").html(signupScreenObj.suErrCPassword);
		$(".su-err-vpasswordMatch").html(signupScreenObj.suErrCPasswordWrong);
		$(".su-err-email").html(signupScreenObj.suErrEmail);
		$(".su-err-email-wrong").html(signupScreenObj.suErrEmailWrong);
		$("#usernameField").attr('placeholder',signupScreenObj.suPlaceUsername);
		$("#emailField").attr('placeholder',signupScreenObj.suPlaceEmail);
		$("#passwordField").attr('placeholder',signupScreenObj.suPlacePassword);
		$("#vpasswordField").attr('placeholder',signupScreenObj.suPlaceCPassword);
		$("#signUpButton").val(signupScreenObj.suBtnSignup);
		$(".have-account").html('<i class="la la-user"></i> '+signupScreenObj.suBtnHaveAcount);
		
	 }
}






var forgotScreenEnglsih = {
	 fpSuccessToast: "Password sent to your emailaddress.",
	 fpErrorToast: "emailaddress does not exit!",
	 fpPageHeading: "Forgot Password?",
	 fpPageTagLine: "Enter your email address & we will send you a link to reset your password",
	 fpErrEmail: "Email is required!",
	 fpErrEmailWrong: "Email address must be valid!",
	 fpPlaceEmail: "Type your email",
	 fpSubmitBtn: "Send",
	 fpRememberBtn: "Remember Password?",
};

var forgotScreenKorean = {
	 fpSuccessToast: "패스워드가 등록된 이메일로 발송되었습니다.",
	 fpErrorToast: "이메일 주소가 종료되지 않습니다!",
	 fpPageHeading: "패스워드를 잊었나요? ",
	 fpPageTagLine: "이메일을 입력하시면 패스워드를 리셋할 수 있는 링크를 보내드립니다. ",
	 fpErrEmail: "이메일이 필요합니다!",
	 fpErrEmailWrong: "유효하지 않은 이메일입니다!",
	 fpPlaceEmail: "이메일을 입력하세요",
	 fpSubmitBtn: "발송",
	 fpRememberBtn: "패스워드를 기억하나요?",
};

var forgotScreenChinese = {
	 fpSuccessToast: "密码已发至登录邮箱。",
	 fpErrorToast: "电子邮件地址不退出！",
	 fpPageHeading: "忘记密码？",
	 fpPageTagLine: "录入邮箱地址即可发送密码重置链接。",
	 fpErrEmail: "需要邮箱地址！",
	 fpErrEmailWrong: "无效邮箱地址！",
	 fpPlaceEmail: "请录入邮箱地址",
	 fpSubmitBtn: "发送",
	 fpRememberBtn: "记得密码吗？",
};


var setForgetPassScreenContent = function(){
	var langid = Blmani.Language.getInstance().get();
	 console.log("lang"+langid);
	 if(langid==2){
         forgetScreenObj = forgotScreenKorean;
	 } 
	 if(langid==3){
		 forgetScreenObj = forgotScreenChinese; 
	 }
	 if(langid > 1){
		 $("#toast-2").html(forgetScreenObj.fpSuccessToast);
		 $("#toast-3").html(forgetScreenObj.fpErrorToast);
		 $(".fp-page-heading").html(forgetScreenObj.fpSuccessToast);
		 $(".fp-tageline").html(forgetScreenObj.fpPageTagLine);
		 $(".fp-err-email").html(forgetScreenObj.fpErrEmail);
		 $(".fp-err-email-valid").html(forgetScreenObj.fpErrEmailWrong);
		 $("#forgetEmailField").attr('placeholder',forgetScreenObj.fpPlaceEmail);
		 $("#forgetSubmitButton").val(forgetScreenObj.fpSubmitBtn);
		 $(".fp-remember-btn").html('<i class="la la-user"></i>'+forgetScreenObj.fpRememberBtn);
	 }
}

var inboxScreenEnglish ={
	isHeading :"Inbox",
	isNMF :"No Messages Found.",
}
var inboxScreenKorean ={
	isHeading :"받은 편지함",
	isNMF :"메시지가 없습니다.",
}
var inboxScreenChinese ={
	isHeading :"收件箱",
	isNMF :"找不到消息。",
}
var setInboxScreenContent = function(){
	var langid = Blmani.Language.getInstance().get();
	 console.log("lang"+langid);
	 if(langid==2){
         inboxScreenObj = inboxScreenKorean;
	 } 
	 if(langid==3){
		 inboxScreenObj = inboxScreenChinese; 
	 }
	 if(langid > 1){
		 
		 //$(".header-title").html(inboxScreenObj.isHeading);
		 $(".nmf").html(inboxScreenObj.isNMF);
		 setTopMenuContent(langid);
	 }
}



var profileScreenEnglish = {
	 mpPageTitle: "My Profile",
	 mpChangePhoto: "Change Profile Picture",
	 mpNickName: "Nick name",
	 mpGender: "Gender",
	 mpBirthday: "Birthday",
	 mpUserId: "User ID",
	 mpPassword: "Password",
	 cpPassword: "Change Password",
	 mpGendarModalTitle: "Select Gender",
	 mpGendarMaleLabel: "Male",
	 mpGendarFemaleLabel: "Female",
	 mpModalDoneBtn: "Done",
	 mpBirthdayModalTitle: "Enter Birthday",
	 mpBirthdayModalBtn: "Done",
	 mpNickNameModalTitle: "Edit Nickname",
	 mpNickPlace: "Enter Nickname",
	 mpNickModalBtn: "Done",
};


var profileScreenKorean = {
	 mpPageTitle: "내 프로파일",
	 mpChangePhoto: "프로파일 사진 변경",
	 mpNickName: "별명",
	 mpGender: "성별",
	 mpBirthday: "생일",
	 mpUserId: "사용자명(아이디)",
	 mpPassword: "패스워드",
	 cpPassword: "패스워드 변경",
	 mpGendarModalTitle: "성별 선택",
	 mpGendarMaleLabel: "남자",
	 mpGendarFemaleLabel: "여자",
	 mpModalDoneBtn: "완료",
	 mpBirthdayModalTitle: "생일을 입력하세요",
	 mpBirthdayModalBtn: "완료",
	 mpNickNameModalTitle: "별명 수정",
	 mpNickPlace: "별명 입력",
	 mpNickModalBtn: "완료",
};


var profileScreenChinese = {
	 mpPageTitle: "我的个人资料",
	 mpChangePhoto: "个人资料照片替换",
	 mpNickName: "昵称",
	 mpGender: "性别",
	 mpBirthday: "生日",
	 mpUserId: "用户名（ID）",
	 mpPassword: "密码",
	 cpPassword: "更换密码",
	 mpGendarModalTitle: "性别选择",
	 mpGendarMaleLabel: "男",
	 mpGendarFemaleLabel: "女",
	 mpModalDoneBtn: "完成",
	 mpBirthdayModalTitle: "请录入生日。",
	 mpBirthdayModalBtn: "完成",
	 mpNickNameModalTitle: "修改昵称",
	 mpNickPlace: "录入昵称",
	 mpNickModalBtn: "完成",
};


var setProfileScreenContent = function(){
	 var langid = Blmani.Language.getInstance().get();
	 console.log("lang"+langid);
	 if(langid==2){
         profileScreenObj = profileScreenKorean;
	 } 
	 if(langid==3){
		 profileScreenObj = profileScreenChinese; 
	 }
	 if(langid > 1){
		 
		 //$(".header-title").html(profileScreenObj.mpPageTitle);
		 $(".mp-chage-pic").html(profileScreenObj.mpChangePhoto);
		 $(".mp-password").html(profileScreenObj.mpPassword);
		 $(".cp-password").html(profileScreenObj.cpPassword);
		 $(".mp-gendar-modal-title").html(profileScreenObj.mpGendarModalTitle);
		 $(".mp-gendar-male-label").html(profileScreenObj.mpGendarMaleLabel);
		 $(".mp-gendar-female-label").html(profileScreenObj.mpGendarFemaleLabel);
		 $(".mp-birthday-modal-title").html(profileScreenObj.mpBirthdayModalTitle);
		 $(".mp-edi-nickname-title").html(profileScreenObj.mpNickNameModalTitle);
		 $("#edit_nick_name").attr('placeholder',profileScreenObj.mpNickNameModalTitle);
		 $(".done-btn").html(profileScreenObj.mpModalDoneBtn);
		 setTopMenuContent(langid);
	 }
}

var changePasswordScreenChinese = {
	 cpSuccessToast: "密码修改成功！",
	 cpErrorToast: "当前密码不正确！",
	 cpPageTitle: "要修改密码吗?",
	 cpPageTagline: "请录入原密码后录入新密码。",
	 cpPageErrPassReq: "需要原密码！",
	 cpPageErrPassLength: "密码需至少4位数以上！",
	 cpPageErrRepeatPassLength: "密码确认也需至少4位数以上！",
	 cpPageErrPass: "密码不一致！",
	 cpPlaceCurrentPass: "现密码",
	 cpPlaceNewPass: "新密码",
	 cpPlaceRepeatNewPass: "密码确认",
	 cpChangePassBtn: "密码变更",
	 
};


var changePasswordScreenKorean = {
	 cpSuccessToast: "패스워드가 성공적으로 수정되었습니다!",
	 cpErrorToast: "현재 암호가 올바르지 않습니다!",
	 cpPageTitle: "패스워드를 수정할까요? ",
	 cpPageTagline: "기존 패스워드를 입력한 후, 새로운 패스워드를 입력하세요",
	 cpPageErrPassReq: "기존 패스워드가 필요합니다!",
	 cpPageErrPassLength: "패스워드는 최소 4자리 이상 필요합니다!",
	 cpPageErrRepeatPassLength: "패스워드 확인도 최소 4자리 이상 필요합니다!",
	 cpPageErrPass: "패스워드가 일치하지 않습니다!",
	 cpPlaceCurrentPass: "현재 패스워드",
	 cpPlaceNewPass: "새로운 패스워드",
	 cpPlaceRepeatNewPass: "패스워드 확인",
	 cpChangePassBtn: "패스워드 변경",
	 
};


var changePasswordScreenEnglsih = {
	 cpSuccessToast: "Password successfully Changed!",
	 cpErrorToast: "Current Password is not correct!",
	 cpPageTitle: "Change Password?",
	 cpPageTagline: "Enter your password then enter new passowrd.",
	 cpPageErrPassReq: "Current password is required!",
	 cpPageErrPassLength: "New password length of 4 requried!",
	 cpPageErrRepeatPassLength: "Repeat New password length of 4 requried!",
	 cpPageErrPass: "Passwords dont match!",
	 cpPlaceCurrentPass: "Current Password",
	 cpPlaceNewPass: "Enter New Password",
	 cpPlaceRepeatNewPass: "Repeat New Password",
	 cpChangePassBtn: "Change Password",
	 
};






var setChangePassScreenContent = function(){
    var langid = Blmani.Language.getInstance().get();
	 console.log("lang"+langid);
	 if(langid==2){
         changePassScreenObj = changePasswordScreenKorean;
	 } 
	 if(langid==3){
		 changePassScreenObj = changePasswordScreenChinese; 
	 }
	 if(langid > 1){
        $("#toast-2").html(changePassScreenObj.cpSuccessToast);
		$("#toast-3").html(changePassScreenObj.cpErrorToast);
		$(".cp-page-title").html(changePassScreenObj.cpPageTitle);
		$(".cp-page-tagline").html(changePassScreenObj.cpPageTagline);
		$(".cp-err-password-required").html(changePassScreenObj.cpPageErrPassReq);
		$(".cp-err-password-length").html(changePassScreenObj.cpPageErrPassLength);
		$(".cp-err-repeadt-password-length").html(changePassScreenObj.cpPageErrPassLength);
		$(".cp-err-password").html(changePassScreenObj.cpPageErrPass);
		$("#cpasswordField").attr('Placeholder',changePassScreenObj.cpPlaceCurrentPass);
		$("#npassword1Field").attr('Placeholder',changePassScreenObj.cpPlaceNewPass);
		$("#npassword2Field").attr('Placeholder',changePassScreenObj.cpPlaceRepeatNewPass);
		$("#changeSubmitButton").val(changePassScreenObj.cpChangePassBtn);

	 }	
}


var settingsScreenEnglish = {
	 stCacheToast: "Cache cleared successfully.", 
	 stHeading: "Settings",
	 stCache: "Clean Cache",
	 stChangePass: "Change Password",
	 stTerms: "Terms & Conditions",
	 stAboutUs: "About Us",
};

var settingsScreenKorean = {
	 stCacheToast: "캐시메모리가 성공적으로 삭제되었습니다",
     stHeading: "설정",	 
	 stCache: "캐시메모리 삭제",
	 stChangePass: "패스워드 변경",
	 stTerms: "사용자 약관",
	 stAboutUs: "우리는",
};

var settingsScreenChinese = {
	 stCacheToast: "缓存清空成功。", 
	 stHeading: "设置",
	 stCache: "清空缓存。",
	 stChangePass: "密码变更",
	 stTerms: "用户条款",
	 stAboutUs: "关于我们",
};


var settingsScreenContent = function(){
	var langid = Blmani.Language.getInstance().get();
	 console.log("lang"+langid);
	 if(langid==2){
         settingsScreenObj = settingsScreenKorean;
	 } 
	 if(langid==3){
		 settingsScreenObj = settingsScreenChinese; 
	 }
	 if(langid > 1){
		 
		// $(".header-title").html(settingsScreenObj.stHeading);
		 $("#toast-2").html(settingsScreenObj.stCacheToast);
		 $("#class-clear-cache").html(settingsScreenObj.stCache);
		 $(".st-chage-password").html(settingsScreenObj.stChangePass);
		 $(".st-Terms").html(settingsScreenObj.stTerms);
		 $(".st-about-us").html(settingsScreenObj.stAboutUs);
		 setTopMenuContent(langid);
	 }
}

var termsScreenContent = function(){
	var langid = Blmani.Language.getInstance().get();
	 console.log("lang"+langid);
	 if(langid==2){
         stHeading = "사용자 약관";
	 } 
	 if(langid==3){
		 stHeading = "用户条款"; 
	 }
	 if(langid > 1){
		 
		 //$(".header-title").html(stHeading);
		 setTopMenuContent(langid);
	 }
}


var aboutusScreenContent = function(){
	var langid = Blmani.Language.getInstance().get();
	 console.log("lang"+langid);
	 if(langid==2){
         stHeading = "우리는";
	 } 
	 if(langid==3){
		 stHeading = "关于我们"; 
	 }
	 if(langid > 1){
		// $(".header-title").html(stHeading);
		 setTopMenuContent(langid);
	 }
}


