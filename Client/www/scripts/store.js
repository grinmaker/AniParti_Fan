



$(window).on('load',function(){
    
	$('#page-build').remove();
	//setTimeout(function(){$("#preloader").addClass('hide-preloader');},450);// will fade out the white DIV that covers the website.
});
var loadmore = 0;	

var  loadCoinStore = function(){
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
	params['page_num'] = loadmore;
    console.log(params);		
    $.ajax({
      url: "http://blmani.com/wp-json/aniparti/get_pakages_ex",
      type: "post",
      data: params,
      dataType: 'json',
      success: function (response) {
		 console.log("res"+JSON.stringify(response));
		 var normal_coins = response.without_discount;
		 var discounted_coins = response.discounted_result;

		 $("#preloader").addClass('hide-preloader');
		 var counter = 0;
		 $.each(discounted_coins,function(key,value){
			 var org_price = parseFloat(value.price);
			 var discount = parseFloat(value.discount);
			 var discounted_amt = org_price - ((org_price * discount)/100);
			 discounted_amt = Math.round(discounted_amt * 100)/100;
			var langid = Blmani.Language.getInstance().get();
			var off,coins;
			if(langid == 1)
			{
				off="OFF";
				coins= "Coins";
			}
			else if(langid== 2)
			{
				off="끄기";
				coins= "코인";
			}
			else if(langid== 3){
				off="关闭";
				coins= "虚拟币";
			}
		 var slide ='<div class="cover-content cover-content-center slide-content"><div class="discount-offer-card pay-card" pid="'+value.product_id+'"><div class="discount-percentage">'+value.discount+'% <span>'
		 +off+'</span></div><div class="offer-coins">'+value.coins+' '+coins+'</div><div class="price-tag"><div class="price-tag-btn">$'+discounted_amt+'</div><span class="outer"><span class="inner strikeout">$'+org_price+'</span></span></div></div> </div>'; 
			$('.special-offer-slider').append(slide);

		});
		if(Object.keys(discounted_coins).length){
			$('.special-offer-slider').owlCarousel({center: true, items:1, loop:true, margin:10, stagePadding:20, lazyLoad:true});
		}
		 $.each(normal_coins,function(key,value){
			$(".pur-listing-cards").append('<li class="payment-card pay-card" pid="'+value.product_id+'"><a href="#"><div class="small-icon"><img src="images/small-coin.png" alt=""> '+value.coins+'</div><div class="large-coin"><img src="images/large-coin.png" alt=""></div> <div class="price-tag">$ '+value.price+'</div></a></li>');
		 });

		//   $.each(response,function(key,value){
		// 	counter++;
		// 	console.log("count"+counter);
		// 	if(counter==1){
		// 	$(".special-offer").append('<div class="discount-offer-card pay-card" pid="'+value.product_id+'"><div class="discount-percentage">50% <span>OFF</span></div><div class="offer-coins">'+value.coins+' Coins</div><div class="price-tag"><div class="price-tag-btn">$'+value.price+'</div><span>$'+value.price*2+'</span></div></div>');
		// 	} 
		// 	if(counter>1){
		//     $(".pur-listing-cards").append('<li class="payment-card pay-card" pid="'+value.product_id+'"><a href="#"><div class="small-icon"><img src="images/small-coin.png" alt=""> '+value.coins+'</div><div class="large-coin"><img src="images/large-coin.png" alt=""></div> <div class="price-tag">$ '+value.price+'</div></a></li>');
		// 	}
		//   }); 
           $('.pay-card').click(function(){
			   var pid = $(this).attr("pid");
		        purchaseCoins(pid);
				//addPurchasedCoins(pid)
		   });  
		    var divWidth = $('.payment-card').width(); 
            $('.payment-card').height(divWidth);

            $(window).resize(function(){
                $('.payment-card').height(divWidth);
			});
			$(window).scroll(function() {
				if($(window).scrollTop() == $(document).height() - $(window).height()) {
					$('.loading').show();
					$('.content').addClass('top-content-margin');
					loadmore++;
					loadCoinStore();
				}
			});
	    }		   
			   
	  });
}


var  loadCoinPayments = function(){
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
	var coins;
	if( params['lang'] == 1)
	{
	
		coins= "Coins";
	}
	else if( params['lang']== 2)
	{

		coins= "코인";
	}
	else if( params['lang']== 3){
		
		coins= "虚拟币";
	}
    console.log(params);		
    $.ajax({
      url: "http://blmani.com/wp-json/aniparti/coin_pur",
      type: "post",
      data: params,
      dataType: 'json',
      success: function (response) {
		  console.log("res"+JSON.stringify(response));
		  $("#preloader").addClass('hide-preloader');
		  
		  if(response=="nrf"){
			 $(".nrf").removeClass("hideit"); 
		  } else {
		  $.each(response,function(key,value){
		    $(".payments-list").append('<li class="payment-card"><div class="pur-icon"></div><div class="pur-text"><h3>'+value.creds+' '+coins+'</h3><time>'+value.time+'</time></div><div class="pur-coins">$'+value.price+'</div></li>');
		  }); 
          }
	    }		   
			   
	  });
}



var  loadCoinPurchases = function(){
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
      url: "http://blmani.com/wp-json/aniparti/coin_used",
      type: "post",
      data: params,
      dataType: 'json',
      success: function (response) {
		   console.log("res"+JSON.stringify(response));
		  $("#preloader").addClass('hide-preloader');
		  
		  if(response=="nrf"){
			 $(".nrf").removeClass("hideit"); 
		  } else {
		  $.each(response,function(key,value){
		    $(".pur-listing-cards").append('<li class="episode-card"><div class="pur-icon"></div><div class="pur-text"><h3>'+value.name+'</h3><time>'+value.time+'</time></div><div class="pur-coins"><span><img src="images/coin-single.png" alt=""></span> '+value.creds+'</div></li>');
		 }); 
          }
	    }		   
			   
	  });
}

var inAppPurchase= ''; 
var purchaseCoins = function(pid){
	
	setTimeout(function() {
		  var params = {};
		  inAppPurchase
				.getProducts([pid])
				.then(function (products) {
	      inAppPurchase
		       .buy(pid)
		       .then(function (data) {
			// ...then mark it as consumed:
			console.log("data"+JSON.stringify(data));
			   params['product_type'] = data.productType;
			   params['product_receipt'] = data.receipt;
			   params['product_signature'] = data.signature;
			   return inAppPurchase.consume(data.productType, data.receipt, data.signature);
		  })
		  .then(function () {
			var session = Blmani.Session.getInstance().get();
			console.log('product was successfully consumed!');
			params['uid'] = session.uid;
			params['product_id'] = pid;
			console.log(params);
			addPurchasedCoins(params);
			
		  })
		  .catch(function (err) {
			console.log("errrir"+JSON.stringify(err));
		  })
		  })
  },100);
}

var  addPurchasedCoins = function(params){
	var session = Blmani.Session.getInstance().get();
	//params['uid'] = session.uid;
	//params['product_id'] = "com.crowdparti.blcredit_10";
	console.log(params);		
    $.ajax({
      url: "http://blmani.com/wp-json/aniparti/add_coins",
      type: "post",
      data: params,
      dataType: 'json',
      success: function (response) {
		 console.log("res"+response+" "+JSON.stringify(response));
		 var session = Blmani.Session.getInstance().get();
		 if(response == "empty_request"){
			 console.log("invalid request");
		 } else {
		 session.balance = response;
		 Blmani.Session.getInstance().set(session);
		 $('.available--coins').html(session.balance+' <span class="trm-coins">Coins</span>');
		 }
		  
	    }		   
			   
	  });
}

