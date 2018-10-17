$(window).on('load',function(){
	$('#page-build').remove();
	setTimeout(function(){$("#preloader").addClass('hide-preloader');},450);// will fade out the white DIV that covers the website.
});

$(document).ready(function(){      
    'use strict'	
			
	function init_template2(){	
						

        //FastClick
        $(function() {FastClick.attach(document.body);});

        //Preload Image
        $(function() {$(".preload-image").lazyload({threshold : 500});});

		//Add Menu Hider
		$('#page-transitions').append('<div id="menu-hider"></div><div class="sidebar-hider"></div> <div class="fake-shadow-left"></div> <div class="fake-shadow-right"></div>');
		$('.menu-sidebar-3d').wrapInner("<div class='menu-sidebar-3d-wrapper'></div>");
			
		//Generating Menu
		$('a[data-menu]').on('click',function(){
			$('.menu-flyin').removeClass('active-flyin');
			$('.menu-sidebar').removeClass('active-touch menu-sidebar-shadow menu-sidebar-shadow-3d');
			$('.menu-sidebar').removeClass('sidebar-push sidebar-over sidebar-parallax active-sidebar-3d');
			$('.header, .page-content').removeClass('content-push-left content-push-right content-parallax-left content-parallax-right')
			$('.menu-sidebar-3d-wrapper').removeClass('menu-sidebar-3d-wrapper-active');
			$('#menu-hider').removeClass('menu-hider-active content-push-left content-push-right menu-hider-active-transparent');
			$('.fake-shadow-left').removeClass('active-fake-shadow-left');
			$('.fake-shadow-right').removeClass('active-fake-shadow-right');
			$('.page-content').removeClass('page-content-reveal-shadow');
			$('.back-to-top-badge').removeClass('back-to-top-badge-visible');

			var menuNumber = $(this).data('menu');
			var menuID = $('#'+menuNumber);
			var pageContent = $('.page-content');
			var menuHider = $('#menu-hider');
			var pageHeader = $('.header');
			var sidebarHider = $('.sidebar-hider');
			var fakeShadowLeft = $('.fake-shadow-left')
			var fakeShadowRight = $('.fake-shadow-right')
			
			menuID.addClass('menu-sidebar-shadow');
			menuID.addClass('active-touch');
			menuID.removeClass('inactive-touch');
			menuHider.addClass('menu-hider-active');
			
			if(menuID.hasClass('menu-flyin')){
				menuHider.addClass('flyin-hider');
				menuID.removeClass('menu-sidebar-shadow');
				menuID.addClass('active-flyin');
			};
			
			if(menuID.hasClass('menu-sidebar-3d')){
				menuID.toggleClass('active-sidebar-3d');
				$('#'+menuNumber + ' .menu-sidebar-3d-wrapper').toggleClass('menu-sidebar-3d-wrapper-active');
				if(menuID.hasClass('menu-sidebar-left')){pageContent.addClass('content-push-left'); pageHeader.addClass('content-push-left'); fakeShadowLeft.addClass('active-fake-shadow-left');}				
				if(menuID.hasClass('menu-sidebar-right')){pageContent.addClass('content-push-right'); pageHeader.addClass('content-push-right'); fakeShadowRight.addClass('active-fake-shadow-right');}				
			}
			
			if(menuID.hasClass('menu-sidebar-push')){
				menuID.addClass('sidebar-push');
				if(menuID.hasClass('menu-sidebar-left')){pageContent.addClass('content-push-left'); pageHeader.addClass('content-push-left');}				
				if(menuID.hasClass('menu-sidebar-right')){pageContent.addClass('content-push-right'); pageHeader.addClass('content-push-right');}		
			}			
			
			if(menuID.hasClass('menu-sidebar-reveal')){
				sidebarHider.addClass('inactive-touch');
				menuHider.addClass('menu-hider-active-transparent');
				menuID.addClass('sidebar-reveal');
				pageContent.addClass('page-content-reveal-shadow');
				if(menuID.hasClass('menu-sidebar-left')){pageContent.addClass('content-push-left'); menuHider.addClass('content-push-left'); pageHeader.addClass('content-push-left');}				
				if(menuID.hasClass('menu-sidebar-right')){pageContent.addClass('content-push-right'); menuHider.addClass('content-push-right'); pageHeader.addClass('content-push-right');}		
			}		
			
			if(menuID.hasClass('menu-sidebar-over')){menuID.addClass('sidebar-over');}		
			if(menuID.hasClass('menu-sidebar-reveal')){menuID.addClass('content-push');}		
			
			if($('#'+menuNumber).hasClass('menu-sidebar-parallax')){
				$('#'+menuNumber).addClass('sidebar-parallax');
				if($('#'+menuNumber).hasClass('menu-sidebar-left')){pageContent.addClass('content-parallax-left'); pageHeader.addClass('content-parallax-left');}				
				if($('#'+menuNumber).hasClass('menu-sidebar-right')){pageContent.addClass('content-parallax-right'); pageHeader.addClass('content-parallax-right');}			
			}
			if($('.header').hasClass('hide-header-card')){$('.header').css('transform','translateY(-60px)');}
			return false;
		});
	
		$('#menu-hider, .close-menu').on('click', function(){
			$('.menu-flyin').removeClass('active-flyin');
			$('.menu-sidebar').removeClass('active-touch menu-sidebar-shadow menu-sidebar-shadow-3d');
			$('.menu-sidebar').removeClass('sidebar-push sidebar-over sidebar-parallax active-sidebar-3d');
			$('.header, .page-content').removeClass('content-push-left content-push-right content-parallax-left content-parallax-right')
			$('.menu-sidebar-3d-wrapper').removeClass('menu-sidebar-3d-wrapper-active');
			$('#menu-hider').removeClass('menu-hider-active content-push-left content-push-right menu-hider-active-transparent');
			$('.fake-shadow-left').removeClass('active-fake-shadow-left');
			$('.fake-shadow-right').removeClass('active-fake-shadow-right');
			$('.page-content').removeClass('page-content-reveal-shadow');
			setTimeout(function(){
				$('.sidebar-hider').removeClass('inactive-touch');
				$('.menu-sidebar').addClass('inactive-touch');
			},universalTransitionTime);
			$('.header').css('transform','');
			return false;
		});
		
		$('.menu-sidebar').addClass('inactive-touch');
		$('.menu-items a').append('<i class="fas fa-circle"></div>');
		$('.submenu a').prepend('<i class="fas fa-angle-right"></div>');
		$('.menu-items a').wrapInner('<em></em>');
		$('.sidebar-separator').wrapInner("<span></span>");
		$('.sidebar-separator span').append("<i class='fas fa-chevron-down'></i>");
		
		//Generating Submenu
		$('a[data-submenu]').on('click',function(){
			$('.submenu').css('height', '0px'); 
			$('a[data-submenu]').removeClass('submenu-active-color');
			$('.submenu-plus').removeClass('rotate-45');
			$('.submenu-has-plus i').removeClass('bg-red-light');

			var submenuNumber = $(this).data('submenu');
			var submenuID = $('#'+submenuNumber);
			var submenuItems = submenuID.children().length;
			var submenuItemHeight = 45;
			$(this).find('.submenu-plus').toggleClass('rotate-45');
			$(this).find('strong i').toggleClass('bg-red-light');
			
			if(submenuID.height() === 0){submenuID.css('height', submenuItems * submenuItemHeight + 10); $(this).addClass('submenu-active-color');}
			if(submenuID.height() > 0){submenuID.css('height', '0px'); $('a[data-submenu]').removeClass('submenu-active-color'); $('.submenu-plus').removeClass('rotate-45'); $('.submenu-has-plus i').removeClass('bg-red-light');}			
		});
		
		setTimeout(function(){
		if($('.submenu').hasClass('submenu-active')){
			var submenuActiveID = $('.submenu-active').attr('id');
			$('a[data-submenu="' + submenuActiveID +'"]').addClass('menu-item-active');
			$('a[data-submenu="' + submenuActiveID +'"] .submenu-plus').addClass('rotate-45');
			$('a[data-submenu="' + submenuActiveID +'"] strong i').addClass('bg-red-light');
			var submenuActiveItems = $('.submenu-active').children().length;
			var submenuItemHeight = 45;
			$('.submenu-active').css('height', submenuActiveItems * submenuItemHeight + 10); 
		}
		},550);
		
		//Generating Submenu Numbers
		$('.submenu-has-numbers').append('<strong class="submenu-number bg-highlight"></strong');
		$('.submenu-has-plus').append('<strong class="submenu-plus"><i class="sp1"></i><i class="sp2"></i></strong>');
		$('a[data-submenu]').each(function(i) {
			var data_item_number = $(this).data('submenu');
			var data_item_ident = $('#'+ data_item_number);
			var data_item_submenus =  data_item_ident.children().length;
			if(data_item_submenus > 7){$('#'+ data_item_number).css({'transition':'all 450ms ease'})}		
			if(data_item_submenus < 7){$('#'+ data_item_number).css({'transition':'all 350ms ease'})}
			$(this).find('.submenu-number').append(data_item_submenus);
		});	
		
				
		//Copyright Year 
        var dteNow = new Date();
        var intYear = dteNow.getFullYear();
        $('#copyright-year, .copyright-year').html(intYear);
		
		//Back Button
		$('.back-button').on('click', function(){
			$('#page-transitions').addClass('back-button-clicked');
			$('#page-transitions').removeClass('back-button-not-clicked');
			window.history.go(-1);
			return false;
		});
		
        //Back to top Badge
        $('.back-to-top-badge, .back-to-top').on( "click", function(e){
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, universalTransitionTime);
			return false;
        });
		
		function header_card(){
			if ($(".header-card").length){
				$('.header').addClass('hide-header-card');
			} else {
				$('.header').removeClass('hide-header-card');
			}
		}
		header_card();
		
		//Accordion
		$('a[data-accordion]').on( "click", function(){
			console.log('test');
			var accordion_number = $(this).data('accordion');
			$('.accordion-content').slideUp(200);
			$('.accordion i').removeClass('rotate-180');			
			if($('#'+accordion_number).is(":visible")){
				$('#'+accordion_number).slideUp(200); 
				$(this).find('i:last-child').removeClass('rotate-180');
			}else{
				$('#'+accordion_number).slideDown(200); 
				$(this).find('i:last-child').addClass('rotate-180');
  			}
		});	
		
		//Mobile Ads
		setTimeout(function(){
			$('.ad-300x50-fixed').fadeIn(350);
		},2500);
		$('.close-ad-button').on('click', function(){
			$('.ad-300x50-fixed').fadeOut(250);
		});
		
        //Show Back To Home When Scrolling
        $(window).on('scroll', function () {
            var total_scroll_height = document.body.scrollHeight
            var inside_header = ($(this).scrollTop() <= 200);
            var passed_header = ($(this).scrollTop() >= 0); //250
            var passed_header2 = ($(this).scrollTop() >= 150); //250
            var footer_reached = ($(this).scrollTop() >= (total_scroll_height - ($(window).height() + 300 )));
			
            if (inside_header === true) {
				$('.store-product-button-fixed').removeClass('show-store-product-button');
				$('.back-to-top-badge').removeClass('back-to-top-badge-visible');
				header_card();
			}
			else if(passed_header === true){
				$('.header').removeClass('hide-header-card');
				$('.store-product-button-fixed').addClass('show-store-product-button');
				$('.back-to-top-badge').addClass('back-to-top-badge-visible');
			} 
            if (footer_reached == true){
				$('.store-product-button-fixed').removeClass('show-store-product-button');
				$('.back-to-top-badge').removeClass('back-to-top-badge-visible');
			}
        });
		
		//Owl Carousel Sliders
		setTimeout(function(){
			$('.single-slider').owlCarousel({loop:true, margin:0, nav:false, autoHeight:true, lazyLoad:true, items:1, autoplay: true, autoplayTimeout:3500});		
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
		},100);
		
		//Coverpage
		setTimeout(function(){resize_coverpage();},250);
		$(window).on('resize', function(){resize_coverpage();})
		
		function resize_coverpage(){
			var cover_height = $(window).height();
			var cover_width = $(window).width();
			if($('.page-content-full').length > 0){
				var header_height = "0";
				$('.page-content, #page-transitions').css({"min-height": cover_height});
			} else{
				var header_height = "55";
				$('.page-content, #page-transitions').css({"min-height": cover_height});
			}			
			$('.cover-item').css({"height":(cover_height - header_height), "width":cover_width})			
			$('.cover-item-full').css({"margin-top": header_height * (-1), "height":cover_height, "width":cover_width})
			$('.coverpage-full .cover-item').css({"height":cover_height, "width":cover_width});
			$('.coverpage-full').css({"margin-top": header_height * (-1)});

			$('.cover-content-center').each(function(){
				var cover_content_center_height = $(this).innerHeight();
				var cover_content_center_width = $(this).innerWidth();
				$(this).css({"margin-left": (cover_content_center_width/2)*(-1), 	"margin-top": ((cover_content_center_height/2)*(-1)) })
			});			
			$('.cover-content-center-full').each(function(){
				var cover_content_center_height = $(this).innerHeight();
				$(this).css({"margin-top": (cover_content_center_height/2)*(-1)})
			});
		}
		
		//Galleries
		baguetteBox.run('.gallery', {});		
		baguetteBox.run('.profile-gallery', {});		
		
		if($('.gallery-filter').length > 0){$('.gallery-filter').filterizr();}		
		$('.gallery-filter-controls li').on('click',function(){
			$('.gallery-filter-controls li').removeClass('gallery-filter-active color-highlight');	
			$(this).addClass('gallery-filter-active color-highlight');	
		})

		//Contact Form
        var formSubmitted = "false";
        jQuery(document).ready(function(e) {
            function t(t, n) {
                formSubmitted = "true";
                var r = e("#" + t).serialize();
                e.post(e("#" + t).attr("action"), r, function(n) {
                    e("#" + t).hide();
                    e("#formSuccessMessageWrap").fadeIn(500)
                })
            }

            function n(n, r) {
                e(".formValidationError").hide();
                e(".fieldHasError").removeClass("fieldHasError");
                e("#" + n + " .requiredField").each(function(i) {
                    if (e(this).val() == "" || e(this).val() == e(this).attr("data-dummy")) {
                        e(this).val(e(this).attr("data-dummy"));
                        e(this).focus();
                        e(this).addClass("fieldHasError");
                        e("#" + e(this).attr("id") + "Error").fadeIn(300);
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
                    if (formSubmitted == "false" && i == e("#" + n + " .requiredField").length - 1) {
                        t(n, r)
                    }
                })
            }
            e("#formSuccessMessageWrap").hide(0);
            e(".formValidationError").fadeOut(0);
            e('input[type="text"], input[type="password"], textarea').focus(function() {
                if (e(this).val() == e(this).attr("data-dummy")) {
                    e(this).val("")
                }
            });
            e("input, textarea").blur(function() {
                if (e(this).val() == "") {
                    e(this).val(e(this).attr("data-dummy"))
                }
            });
            e("#contactSubmitButton").click(function() {
                n(e(this).attr("data-formId"));
                return false
            })
        })
		
		//Universal Transition Time
		var universalTransitionTime = 350; 
		$('.header, .footer, .header-card, #menu-hider, .menu-hider-active, .menu-sidebar, .menu-flyin, .active-flyin, .page-content, .menu-sidebar-3d-wrapper, .menu-sidebar, .menu-sidebar-shadow, .content-push-left, .content-push-right, .content-parallax-left, .content-parallax-right, .fake-shadow-right, .fake-shadow-left, .menu-sidebar-push').css({
			WebkitTransition : 'all ' + universalTransitionTime + 'ms ease',
			MozTransition    : 'all ' + universalTransitionTime + 'ms ease',
			MsTransition     : 'all ' + universalTransitionTime + 'ms ease',
			OTransition      : 'all ' + universalTransitionTime + 'ms ease',
			transition       : 'all ' + universalTransitionTime + 'ms ease'
		});
		
        //Detect if iOS WebApp Engaged and permit navigation without deploying Safari
        (function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(d.href.indexOf("http")||~d.href.indexOf(e.host))&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone")

        //Detecting Mobiles//
		$('head').append('<meta charset="utf-8">');
		$('head').append('<meta name="apple-mobile-web-app-capable" content="yes">');
        var isMobile = {
            Android: function() {return navigator.userAgent.match(/Android/i);},
            iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
            Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
            any: function() {return (isMobile.Android()  || isMobile.iOS() || isMobile.Windows());}
        };
        if( !isMobile.any() ){
            $('.show-blackberry, .show-ios, .show-windows, .show-android').addClass('disabled');
            $('.show-no-detection').removeClass('disabled');
        }
        if(isMobile.Android()) {
            //Status Bar Color for Android
            $('head').append('<meta name="theme-color" content="#000000"> />');
            $('.show-android').removeClass('disabled');
            $('.show-blackberry, .show-ios, .show-windows, .show-download').addClass('disabled');
            $('.sidebar-scroll').css('right', '0px');
            $('.set-today').addClass('mobile-date-correction');
        }
        if(isMobile.iOS()) {
            $('.show-ios').removeClass('disabled');
            $('.show-blackberry, .show-android, .show-windows, .show-download').addClass('disabled');
            $('.set-today').addClass('mobile-date-correction');
        }
        if(isMobile.Windows()) {
            $('.show-windows').removeClass('disabled');
            $('.show-blackberry, .show-ios, .show-android, .show-download').addClass('disabled');
        }
		
		//Dropdowns
		$('.inner-link-list').on('click',function(){
			$(this).parent().find('.link-list').slideToggle(250);
		});
		
		//Font Awesome
		window.FontAwesomeConfig = {
			searchPseudoElements: true
		}
		
		//Notifications
		$('.close-notification').on('click',function(){
			$(this).parent().hide(250);
		});

		//Charts
		if($('.chart').length > 0){
			var loadJS = function(url, implementationCode, location){
				var scriptTag = document.createElement('script');
				scriptTag.src = url;
				scriptTag.onload = implementationCode;
				scriptTag.onreadystatechange = implementationCode;
				location.appendChild(scriptTag);
			};
			var call_charts_to_page = function(){
				new Chart(document.getElementById("pie-chart"), {
					type: 'pie',
					data: {
					  labels: ["Facebook", "Twitter", "Google Plus", "Pinterest", "WhatsApp"],
					  datasets: [{
						backgroundColor: ["#4A89DC", "#4FC1E9", "#FC6E51", "#ED5565", "#A0D468"],
						borderColor:"rgba(255,255,255,1)",
						data: [7000,3000,1000,2000,2000]
					  }]
					},
					options: {
						legend: {display: true, position:'bottom', labels:{fontSize:13, padding:15,boxWidth:12},},
						tooltips:{enabled:true}, animation:{duration:1500}
					}
				});		

				new Chart(document.getElementById("doughnut-chart"), {
					type: 'doughnut',
					data: {
					  labels: ["Apple Inc.", "Samsung", "Google", "One Plus", "Huawei"],
					  datasets: [{
						backgroundColor: ["#CCD1D9", "#5D9CEC","#FC6E51", "#434A54", "#4FC1E9"],
						borderColor:"rgba(255,255,255,1)",
						data: [5500,4000,2000,3000,1000]
					  }]
					},
					options: {
						legend: {display: true, position:'bottom', labels:{fontSize:13, padding:15,boxWidth:12},},
						tooltips:{enabled:true}, animation:{duration:1500}, layout:{ padding: {bottom: 30}}
					}
				});		

				new Chart(document.getElementById("polar-chart"), {
					type: 'polarArea',
					data: {
					  labels: ["Windows", "Mac", "Linux"],
					  datasets: [{
						backgroundColor: ["#CCD1D9", "#5D9CEC","#FC6E51"],
						borderColor:"rgba(255,255,255,1)",
						data: [7000,10000,5000]
					  }]
					},
					options: {
						legend: {display: true, position:'bottom', labels:{fontSize:13, padding:15,boxWidth:12},},
						tooltips:{enabled:true}, animation:{duration:1500}, layout:{ padding: {bottom: 30}}
					}
				});			

				new Chart(document.getElementById("vertical-chart"), {
					type: 'bar',
					data: {
					  labels: ["2010", "2015", "2020", "2025"],
					  datasets: [
						{
						  label: "iOS",
						  backgroundColor: "#A0D468",
						  data: [900,1000,1200,1400]
						}, {
						  label: "Android",
						  backgroundColor: "#4A89DC",
						  data: [890,950,1100,1300]
						}
					  ]
					},
					options: {
						legend: {display: true, position:'bottom', labels:{fontSize:13, padding:15,boxWidth:12},},
						title: {display: false}
					}
				});	

				new Chart(document.getElementById("horizontal-chart"), {
					type: 'horizontalBar',
					data: {
					  labels: ["2010", "2013", "2016", "2020"],
					  datasets: [
						{
						  label: "Mobile",
						  backgroundColor: "#BF263C",
						  data: [330,400,580,590]
						}, {
						  label: "Responsive",
						  backgroundColor: "#EC87C0",
						  data: [390,450,550,570]
						}
					  ]
					},
					options: {
						legend: {display: true, position:'bottom', labels:{fontSize:13, padding:15,boxWidth:12},},
						title: {display: false}
					}
				});	

				new Chart(document.getElementById("line-chart"), {
				  type: 'line',
				  data: {
					labels: [2000,2005,2010,2015,2010],
					datasets: [{ 
						data: [500,400,300,200,300],
						label: "Desktop Web",
						borderColor: "#D8334A"
					  }, { 
						data: [0,100,300,400,500],
						label: "Mobile Web",
						borderColor: "#4A89DC"
					  }
					]
				  },
				  options: {
					legend: {display: true, position:'bottom', labels:{fontSize:13, padding:15,boxWidth:12},},
					title: {display: false}
				  }
				});
			}
			loadJS('scripts/charts.js', call_charts_to_page, document.body);
		}

		//Cookie Box
		function createCookie(e,t,n){if(n){var o=new Date;o.setTime(o.getTime()+48*n*60*60*1e3);var r="; expires="+o.toGMTString()}else var r="";document.cookie=e+"="+t+r+"; path=/"}function readCookie(e){for(var t=e+"=",n=document.cookie.split(";"),o=0;o<n.length;o++){for(var r=n[o];" "==r.charAt(0);)r=r.substring(1,r.length);if(0==r.indexOf(t))return r.substring(t.length,r.length)}return null}function eraseCookie(e){createCookie(e,"",-1)}

		if (!readCookie('enabled_cookie_themeforest_ultramobile1')) {setTimeout(function(){$('.cookie-policy').fadeIn(300);},1500);}
		if (readCookie('enabled_cookie_themeforest_ultramobile1')) {$('.cookie-policy').fadeOut(300);}
		$('.hide-cookie').click(function() {$('.cookie-policy').fadeOut(300); createCookie('enabled_cookie_themeforest_ultramobile1', true, 1)});					
		
		//Reading Time
		$(window).scroll(function() {
			var wintop = $(window).scrollTop(), docheight = $('.page-content').height(), winheight = $(window).height();
			var totalScroll = (wintop/(docheight-winheight))*100;
			$(".reading-line").css("width",totalScroll+"%");
		});		
		$(function() {
			var $article = $('.reading-time-box');
			$article.readingTime({
				readingTimeAsNumber: true,
				readingTimeTarget: $article.find('.reading-time'),
				wordCountTarget: $article.find('.reading-words'),
				wordsPerMinute: 1075,
				round: false,
				lang: 'en',
			});
		});
		
		//Snackbars
		$('a[data-deploy-snack]').on( "click", function(){
			var snack_number = $(this).data('deploy-snack');
			$('#'+snack_number).addClass('active-snack');
			setTimeout(function(){$('#'+snack_number).removeClass('active-snack');},5000);
		});
		$('.snackbar a').on('click', function(){$(this).parent().removeClass('active-snack');});
		$('.snb').on( "click", function(){var snb_height = $('.notification-bar').height(); $('.notification-bar').toggleClass('toggle-notification-bar');});

		//Sortable List
		if( $('#sortable').length ){var list = document.getElementById("sortable"); Sortable.create(list);}

		//Search List
		$('[data-search]').on('keyup', function() {
			var searchVal = $(this).val();
			var filterItems = $(this).parent().parent().find('[data-filter-item]');
			if ( searchVal != '' ) {
				$(this).parent().parent().find('.search-results').removeClass('disabled-search-list');
				$(this).parent().parent().find('[data-filter-item]').addClass('disabled-search');
				$(this).parent().parent().find('[data-filter-item][data-filter-name*="' + searchVal.toLowerCase() + '"]').removeClass('disabled-search');
			} else {
				$(this).parent().parent().find('.search-results').addClass('disabled-search-list');
				$(this).parent().parent().find('[data-filter-item]').removeClass('disabled-search');
			}
		});
		
		//Tabs
		$('.active-tab').slideDown(0);
		$('a[data-tab]').on( "click", function(){
			var tab_number = $(this).data('tab'); 
			$(this).parent().find('[data-tab]').removeClass('active-tab-button');
			$(this).parent().parent().find('.tab-titles a').removeClass('active-tab-button'); 
			$(this).addClass('active-tab-button'); 
			$(this).parent().parent().find('.tab-item').slideUp(200); 
			$('#'+tab_number).slideDown(200);
		});		
		
		
		$('a[data-tab-pill]').on( "click", function(){
			var tab_number = $(this).data('tab-pill'); 
			var tab_bg = $(this).parent().parent().find('.tab-pill-titles').data('active-tab-pill-background');
			$(this).parent().find('[data-tab-pill]').removeClass('active-tab-pill-button ' + tab_bg);
			$(this).parent().parent().find('.tab-titles a').removeClass('active-tab-pill-button ' + tab_bg); 
			$(this).addClass('active-tab-pill-button ' + tab_bg); 
			$(this).parent().parent().find('.tab-item').slideUp(200); 
			$('#'+tab_number).slideDown(200);
		});	
		
		//Toast Boxes
		$('a[data-toast]').on( "click", function(){
			$('.toast').removeClass('show-toast');
			var toast_number = $(this).data('toast');
			$('#'+toast_number).addClass('show-toast');
			setTimeout(function(){$('#'+toast_number).removeClass('show-toast');},3000);
		});
		
		//Toggles
		$('.toggle-trigger, .toggle-title').on('click', function(){
			$(this).parent().toggleClass('toggle-active'); 
			$(this).parent().find('.toggle-content').slideToggle(250);
		});
		
		//FAQ 
		$('.faq-question').on('click', function(){
			$(this).parent().find('.faq-answer').slideToggle(300);	
			$(this).find('.fa-plus').toggleClass('rotate-45');
			$(this).find('.fa-chevron-down').toggleClass('rotate-180');
			$(this).find('.fa-arrow-down').toggleClass('rotate-180');
		})
				
		//Article Card
		if ($('.article-card, .instant-box').length) {
			//var activate_clone = window.location.hash.substring(1);
			setTimeout(function(){
				$('[data-article-card="'+activate_clone+'"]').addClass('active-card');
				$('[data-instant="'+activate_clone+'"]').addClass('active-instant');
			},0);
		}
		$('[data-article-card]').clone().addClass('article-clone').removeClass('article-card-round').appendTo('#page-transitions');
		$('.article-clone .article-header').append('<span class="article-back"><i class="fa fa-angle-left"></i> Back</span>');
		$('[data-deploy-card]').on('click',function(){
			$('.article-clone a').removeAttr('data-deploy-card');
			var data_card = $(this).data('deploy-card');
			$('[data-article-card="'+data_card+'"]').addClass('active-card');
			//window.location.hash = data_card;
            $('.article-card').animate({scrollTop: 0}, 0);
		});
		$('.article-clone .article-back, .close-article').on('click', function(){
			$('.article-clone').removeClass('active-card');
			return false;
			//window.location.href.substr(0, window.location.href.indexOf('#'));
		});	
		
		//Instant Box
		$('.instant-box').clone().addClass('instant-box-clone').appendTo('#page-transitions');
		$('[data-deploy-instant]').on('click',function(){
			$('.instant-box-clone .instant-content').removeAttr('data-deploy-instant');
			var data_card = $(this).data('deploy-instant');
			$('[data-instant="'+data_card+'"]').addClass('active-instant');
			//window.location.hash = data_card;
            $('.instant-box').animate({scrollTop: 0}, 0);
		});
		$('.instant-clone').remove('instant-hidden-large');
		$('.close-instant').on('click', function(){
			$('.instant-box-clone').removeClass('active-instant');
			//window.location.href.substr(0, window.location.href.indexOf('#'));
			return false;
		});
		
		//Progress Bar
		if($('.progress-bar').length > 0){
			$('.progress-bar-wrapper').each(function(){
				var progress_height = $(this).data('progress-height');
				var progress_border = $(this).data('progress-border');
				var progress_round = $(this).attr('data-progress-round');
				var progress_color = $(this).data('progress-bar-color');
				var progress_bg = $(this).data('progress-bar-background');
				var progress_complete = $(this).data('progress-complete');
				var progress_text_visible = $(this).attr('data-progress-text-visible');
				var progress_text_color = $(this).attr('data-progress-text-color');
				var progress_text_size = $(this).attr('data-progress-text-size');
				var progress_text_position = $(this).attr('data-progress-text-position');
				var progress_text_before= $(this).attr('data-progress-text-before');
				var progress_text_after= $(this).attr('data-progress-text-after');
					
				if (progress_round ==='true'){			
					$(this).find('.progress-bar').css({'border-radius':progress_height})
					$(this).css({'border-radius':progress_height})				  
				}
				
				if( progress_text_visible === 'true'){
					$(this).append('<em>'+ progress_text_before + progress_complete +'%' + progress_text_after + '</em>')
					$(this).find('em').css({
						"color":progress_text_color,
						"text-align":progress_text_position,
						"font-size":progress_text_size + 'px',
						"height": progress_height +'px',
						"line-height":progress_height + progress_border +'px'
					});
				} 
				
				$(this).css({
					"height": progress_height + progress_border,
					"background-color": progress_bg,
				})

				$(this).find('.progress-bar').css({
					"width":progress_complete + '%',
					"height": progress_height - progress_border,
					"background-color": progress_color,
					"border-left-color":progress_bg,
					"border-right-color":progress_bg,
					"border-left-width":progress_border,
					"border-right-width":progress_border,
					"margin-top":progress_border,
				})
			});
		}

		//Countdown
		function countdown(dateEnd) {
		  var timer, years, days, hours, minutes, seconds;
		  dateEnd = new Date(dateEnd);
		  dateEnd = dateEnd.getTime();
		  if ( isNaN(dateEnd) ) {return;}
		  timer = setInterval(calculate, 1);
		  function calculate() {
			var dateStart = new Date();
			var dateStart = new Date(dateStart.getUTCFullYear(), dateStart.getUTCMonth(), dateStart.getUTCDate(), dateStart.getUTCHours(), dateStart.getUTCMinutes(), dateStart.getUTCSeconds());
			var timeRemaining = parseInt((dateEnd - dateStart.getTime()) / 1000)

			if ( timeRemaining >= 0 ) {
			  years    = parseInt(timeRemaining / 31536000);
			  timeRemaining   = (timeRemaining % 31536000);		
			  days    = parseInt(timeRemaining / 86400);
			  timeRemaining   = (timeRemaining % 86400);
			  hours   = parseInt(timeRemaining / 3600);
			  timeRemaining   = (timeRemaining % 3600);
			  minutes = parseInt(timeRemaining / 60);
			  timeRemaining   = (timeRemaining % 60);
			  seconds = parseInt(timeRemaining);

				if($('.countdown').length > 0){
				  $(".countdown #years")[0].innerHTML    = parseInt(years, 10);
				  $(".countdown #days")[0].innerHTML    = parseInt(days, 10);
				  $(".countdown #hours")[0].innerHTML   = ("0" + hours).slice(-2);
				  $(".countdown #minutes")[0].innerHTML = ("0" + minutes).slice(-2);
				  $(".countdown #seconds")[0].innerHTML = ("0" + seconds).slice(-2);
				}
			} else { return; }}
		  function display(days, hours, minutes, seconds) {}
		}
		countdown('01/19/2030 03:14:07 AM');	

		//Show Map
		$('.show-map, .hide-map').on('click',function(){
			$('.map-full .cover-content').toggleClass('deactivate-map');
			$('.map-full .cover-overlay').toggleClass('deactivate-map');
			$('.map-but-1, .map-but-2').toggleClass('deactivate-map');
			$('.map-full .hide-map').toggleClass('activate-map');
		});
		
		//Toggle Box
		$('[data-toggle-box]').on('click',function(){
			var toggle_box = $(this).data('toggle-box');
			if($('#'+toggle_box).is(":visible")){
				$('#'+toggle_box).slideUp(250);
			}else{
				$("[id^='box']").slideUp(250);
				$('#'+toggle_box).slideDown(250);
			}
		});
		
		//Read More Box
		$('.read-more-show').on('click',function(){
			$(this).hide();
			$(this).parent().parent().find('.read-more-box').show();
		});
		
		var share_link = window.location.href;
		$('.shareToFacebook').prop("href", "https://www.facebook.com/sharer/sharer.php?u="+share_link)
		$('.shareToGooglePlus').prop("href", "https://plus.google.com/share?url="+share_link)
		$('.shareToTwitter').prop("href", "https://twitter.com/home?status="+share_link)
		$('.shareToPinterest').prop("href", "https://pinterest.com/pin/create/button/?url=" + share_link)
		$('.shareToWhatsApp').prop("href", "whatsapp://send?text=" + share_link)
		$('.shareToMail').prop("href", "mailto:?body=" + share_link)
	}

	function init_template() {
	  //FastClick
	  $(function () { FastClick.attach(document.body); });

	  //Preload Image
	  $(function () { $(".preload-image").lazyload({ threshold: 500 }); });

	  //Add Menu Hider
	  $('#page-transitions').append('<div id="menu-hider"></div><div class="sidebar-hider"></div> <div class="fake-shadow-left"></div> <div class="fake-shadow-right"></div>');
	  $('.menu-sidebar-3d').wrapInner("<div class='menu-sidebar-3d-wrapper'></div>");


	  //Universal Transition Time
	  var universalTransitionTime = 250;
	  $('.header, .footer, .header-card, #menu-hider, .menu-hider-active, .menu-sidebar, .menu-flyin, .active-flyin, .page-content, .menu-sidebar-3d-wrapper, .menu-sidebar, .menu-sidebar-shadow, .content-push-left, .content-push-right, .content-parallax-left, .content-parallax-right, .fake-shadow-right, .fake-shadow-left, .menu-sidebar-push').css({
	    WebkitTransition: 'all ' + universalTransitionTime + 'ms ease',
	    MozTransition: 'all ' + universalTransitionTime + 'ms ease',
	    MsTransition: 'all ' + universalTransitionTime + 'ms ease',
	    OTransition: 'all ' + universalTransitionTime + 'ms ease',
	    transition: 'all ' + universalTransitionTime + 'ms ease'
	  });

	 
	  //Generating Menu
	  $('a[data-menu]').on('click', function () {
	    $('.menu-flyin').removeClass('active-flyin');
	    $('.menu-sidebar').removeClass('active-touch menu-sidebar-shadow menu-sidebar-shadow-3d');
	    $('.menu-sidebar').removeClass('sidebar-push sidebar-over sidebar-parallax active-sidebar-3d');
	    $('.header, .page-content').removeClass('content-push-left content-push-right content-parallax-left content-parallax-right')
	    $('.menu-sidebar-3d-wrapper').removeClass('menu-sidebar-3d-wrapper-active');
	    $('#menu-hider').removeClass('menu-hider-active content-push-left content-push-right menu-hider-active-transparent');
	    $('.fake-shadow-left').removeClass('active-fake-shadow-left');
	    $('.fake-shadow-right').removeClass('active-fake-shadow-right');
	    $('.page-content').removeClass('page-content-reveal-shadow');
	    $('.back-to-top-badge').removeClass('back-to-top-badge-visible');

	    var menuNumber = $(this).data('menu');
	    var menuID = $('#' + menuNumber);
	    var pageContent = $('.page-content');
	    var menuHider = $('#menu-hider');
	    var pageHeader = $('.header');
	    var sidebarHider = $('.sidebar-hider');
	    var fakeShadowLeft = $('.fake-shadow-left')
	    var fakeShadowRight = $('.fake-shadow-right')

	    menuID.addClass('menu-sidebar-shadow');
	    menuID.addClass('active-touch');
	    menuID.removeClass('inactive-touch');
	    menuHider.addClass('menu-hider-active');

	    if (menuID.hasClass('menu-flyin')) {
	      menuHider.addClass('flyin-hider');
	      menuID.removeClass('menu-sidebar-shadow');
	      menuID.addClass('active-flyin');
	    };

	    if (menuID.hasClass('menu-sidebar-3d')) {
	      menuID.toggleClass('active-sidebar-3d');
	      $('#' + menuNumber + ' .menu-sidebar-3d-wrapper').toggleClass('menu-sidebar-3d-wrapper-active');
	      if (menuID.hasClass('menu-sidebar-left')) { pageContent.addClass('content-push-left'); pageHeader.addClass('content-push-left'); fakeShadowLeft.addClass('active-fake-shadow-left'); }
	      if (menuID.hasClass('menu-sidebar-right')) { pageContent.addClass('content-push-right'); pageHeader.addClass('content-push-right'); fakeShadowRight.addClass('active-fake-shadow-right'); }
	    }

	    if (menuID.hasClass('menu-sidebar-push')) {
	      menuID.addClass('sidebar-push');
	      if (menuID.hasClass('menu-sidebar-left')) { pageContent.addClass('content-push-left'); pageHeader.addClass('content-push-left'); }
	      if (menuID.hasClass('menu-sidebar-right')) { pageContent.addClass('content-push-right'); pageHeader.addClass('content-push-right'); }
	    }

	    if (menuID.hasClass('menu-sidebar-reveal')) {
	      sidebarHider.addClass('inactive-touch');
	      menuHider.addClass('menu-hider-active-transparent');
	      menuID.addClass('sidebar-reveal');
	      pageContent.addClass('page-content-reveal-shadow');
	      if (menuID.hasClass('menu-sidebar-left')) { pageContent.addClass('content-push-left'); menuHider.addClass('content-push-left'); pageHeader.addClass('content-push-left'); }
	      if (menuID.hasClass('menu-sidebar-right')) { pageContent.addClass('content-push-right'); menuHider.addClass('content-push-right'); pageHeader.addClass('content-push-right'); }
	    }

	    if (menuID.hasClass('menu-sidebar-over')) { menuID.addClass('sidebar-over'); }
	    if (menuID.hasClass('menu-sidebar-reveal')) { menuID.addClass('content-push'); }

	    if ($('#' + menuNumber).hasClass('menu-sidebar-parallax')) {
	      $('#' + menuNumber).addClass('sidebar-parallax');
	      if ($('#' + menuNumber).hasClass('menu-sidebar-left')) { pageContent.addClass('content-parallax-left'); pageHeader.addClass('content-parallax-left'); }
	      if ($('#' + menuNumber).hasClass('menu-sidebar-right')) { pageContent.addClass('content-parallax-right'); pageHeader.addClass('content-parallax-right'); }
	    }
	    if ($('.header').hasClass('hide-header-card')) { $('.header').css('transform', 'translateY(-60px)'); }
	    return false;
	  });

	  $('#menu-hider, .close-menu').on('click', function () {
	    $('.menu-flyin').removeClass('active-flyin');
	    $('.menu-sidebar').removeClass('active-touch menu-sidebar-shadow menu-sidebar-shadow-3d');
	    $('.menu-sidebar').removeClass('sidebar-push sidebar-over sidebar-parallax active-sidebar-3d');
	    $('.header, .page-content').removeClass('content-push-left content-push-right content-parallax-left content-parallax-right')
	    $('.menu-sidebar-3d-wrapper').removeClass('menu-sidebar-3d-wrapper-active');
	    $('#menu-hider').removeClass('menu-hider-active content-push-left content-push-right menu-hider-active-transparent');
	    $('.fake-shadow-left').removeClass('active-fake-shadow-left');
	    $('.fake-shadow-right').removeClass('active-fake-shadow-right');
	    $('.page-content').removeClass('page-content-reveal-shadow');
	    setTimeout(function () {
	      $('.sidebar-hider').removeClass('inactive-touch');
	      $('.menu-sidebar').addClass('inactive-touch');
	    }, universalTransitionTime);
	    $('.header').css('transform', '');
	    return false;
	  });

	 

	}
    
	setTimeout(init_template, 0);//Activating all the plugins
    $(function(){
		'use strict';
		var options = {
			prefetch: true,
			prefetchOn: 'mouseover',
			cacheLength: 100,
			scroll: true, 
			blacklist: '.default-link' && '.show-gallery',
			forms: 'contactForm',
			onStart: {
				duration:350, // Duration of our animation
				render: function ($container) {
				$container.addClass('is-exiting');// Add your CSS animation reversing class
					$('.page-change-preloader').addClass('show-change-preloader');
					return false;
				}
			},
			onReady: {
				duration: 50,
				render: function ($container, $newContent) {
					$container.removeClass('is-exiting');// Remove your CSS animation reversing class
					$container.html($newContent);// Inject the new content
					$('#page-build').remove();
					$('.page-change-preloader').addClass('show-change-preloader');		
				}
			},
			onAfter: function($container, $newContent) {
				setTimeout(init_template, 0)//Timeout required to properly initiate all JS Functions. 
				setTimeout(function(){
				$('.page-change-preloader').removeClass('show-change-preloader');	
				},150);
			}
      	};
      var smoothState = $('#page-transitions').smoothState(options).data('smoothState');
    });
    $('body').append('<div class="page-change-preloader preloader-light"><div id="preload-spinner" class="spinner-red"></div></div>');
    bindElements($(document.body), document);


});

window.modalDisplay = function () {
  $('.menu-sidebar').removeClass('active-touch menu-sidebar-shadow menu-sidebar-shadow-3d');
  $('.menu-sidebar').removeClass('sidebar-push sidebar-over sidebar-parallax active-sidebar-3d');
  $('.header, .page-content').removeClass('content-push-left content-push-right content-parallax-left content-parallax-right')
  $('.menu-sidebar-3d-wrapper').removeClass('menu-sidebar-3d-wrapper-active');
  $('#menu-hider').removeClass('menu-hider-active content-push-left content-push-right menu-hider-active-transparent');
  $('.fake-shadow-left').removeClass('active-fake-shadow-left');
  $('.fake-shadow-right').removeClass('active-fake-shadow-right');
  $('.page-content').removeClass('page-content-reveal-shadow');
  $('.back-to-top-badge').removeClass('back-to-top-badge-visible');
};

window.loadStyleSheetFile = function (doc, css) {

  var head = doc.head || doc.getElementsByTagName('head')[0],
  style = doc.createElement('link');
  style.type = 'text/css';
  style.rel = "stylesheet";
  style.href = css;
  head.appendChild(style);
  return (style);

};

window.bindElements = function (container, object, executer) {
  container.find("*[data-bind]").each(function (index, value) {
    var a = this.getAttribute("data-bind");

    object[a] = this;
    this.parent = object;
    object[a].$ = $(this);
    object[a].$.addClass(a);
    this.removeAttribute("data-bind");
  });

  container.find("*[data-execute]").each(function (index, value) {
    var a = this.getAttribute("data-execute");
    if (executer) executer.apply(this, [a]); else eval(a);
    this.removeAttribute("data-execute");
  });



};

window.parseCodeBlocks = function (html) {

  var reg = new RegExp("<script[\\s\\S]*?>", "g");
  var tt;
  var htmlLength = html.length;
  while ((tt = reg.exec(html)) !== null) {
    if (tt[0].indexOf("text/html") < 0) {
      html = html.replace(tt[0], tt[0].replace("script", 'div class="codeBlock template" ') + '<!--');
      var sIndex = reg.lastIndex;
      html = html.replace(/<\/script>/g, function (match, offset) {
        if (sIndex < 0) return (match);

        if (offset > sIndex) { sIndex = -1000; return ("--></div>"); }
        return (match);
      });
    }
  }

  return html;

};
window.loadStyleSheet = function (doc, css) {


  var head = doc.head || doc.getElementsByTagName('head')[0],
  style = doc.createElement('style');
  style.type = 'text/css';

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(doc.createTextNode(css));
  }

  head.appendChild(style);
};
window.loadJSFile = function (doc, jsFile) {
  var jsElm = doc.createElement("script");
  jsElm.type = "application/javascript";
  jsElm.src = jsFile;
  doc.body.appendChild(jsElm);
  return (jsElm);
};


function showPreloader  () {
  $('.page-change-preloader').addClass('show-change-preloader');
};

  function hidePreloader () {
  $('.page-change-preloader').removeClass('show-change-preloader');
  };

  


  var LZString = function () { function a(a, b) { if (!e[a]) { e[a] = {}; for (var c = 0; c < a.length; c++) e[a][a.charAt(c)] = c } return e[a][b] } var b = String.fromCharCode, c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$", e = {}, f = { compressToBase64: function (a) { if (null == a) return ""; var b = f._compress(a, 6, function (a) { return c.charAt(a) }); switch (b.length % 4) { default: case 0: return b; case 1: return b + "==="; case 2: return b + "=="; case 3: return b + "=" } }, decompressFromBase64: function (b) { return null == b ? "" : "" == b ? null : f._decompress(b.length, 32, function (d) { return a(c, b.charAt(d)) }) }, compressToUTF16: function (a) { return null == a ? "" : f._compress(a, 15, function (a) { return b(a + 32) }) + " " }, decompressFromUTF16: function (a) { return null == a ? "" : "" == a ? null : f._decompress(a.length, 16384, function (b) { return a.charCodeAt(b) - 32 }) }, compressToUint8Array: function (a) { for (var b = f.compress(a), c = new Uint8Array(2 * b.length), d = 0, e = b.length; e > d; d++) { var g = b.charCodeAt(d); c[2 * d] = g >>> 8, c[2 * d + 1] = g % 256 } return c }, decompressFromUint8Array: function (a) { if (null === a || void 0 === a) return f.decompress(a); for (var c = new Array(a.length / 2), d = 0, e = c.length; e > d; d++) c[d] = 256 * a[2 * d] + a[2 * d + 1]; var g = []; return c.forEach(function (a) { g.push(b(a)) }), f.decompress(g.join("")) }, compressToEncodedURIComponent: function (a) { return null == a ? "" : f._compress(a, 6, function (a) { return d.charAt(a) }) }, decompressFromEncodedURIComponent: function (b) { return null == b ? "" : "" == b ? null : (b = b.replace(/ /g, "+"), f._decompress(b.length, 32, function (c) { return a(d, b.charAt(c)) })) }, compress: function (a) { return f._compress(a, 16, function (a) { return b(a) }) }, _compress: function (a, b, c) { if (null == a) return ""; var d, e, f, g = {}, h = {}, i = "", j = "", k = "", l = 2, m = 3, n = 2, o = [], p = 0, q = 0; for (f = 0; f < a.length; f += 1) if (i = a.charAt(f), Object.prototype.hasOwnProperty.call(g, i) || (g[i] = m++, h[i] = !0), j = k + i, Object.prototype.hasOwnProperty.call(g, j)) k = j; else { if (Object.prototype.hasOwnProperty.call(h, k)) { if (k.charCodeAt(0) < 256) { for (d = 0; n > d; d++) p <<= 1, q == b - 1 ? (q = 0, o.push(c(p)), p = 0) : q++; for (e = k.charCodeAt(0), d = 0; 8 > d; d++) p = p << 1 | 1 & e, q == b - 1 ? (q = 0, o.push(c(p)), p = 0) : q++, e >>= 1 } else { for (e = 1, d = 0; n > d; d++) p = p << 1 | e, q == b - 1 ? (q = 0, o.push(c(p)), p = 0) : q++, e = 0; for (e = k.charCodeAt(0), d = 0; 16 > d; d++) p = p << 1 | 1 & e, q == b - 1 ? (q = 0, o.push(c(p)), p = 0) : q++, e >>= 1 } l--, 0 == l && (l = Math.pow(2, n), n++), delete h[k] } else for (e = g[k], d = 0; n > d; d++) p = p << 1 | 1 & e, q == b - 1 ? (q = 0, o.push(c(p)), p = 0) : q++, e >>= 1; l--, 0 == l && (l = Math.pow(2, n), n++), g[j] = m++, k = String(i) } if ("" !== k) { if (Object.prototype.hasOwnProperty.call(h, k)) { if (k.charCodeAt(0) < 256) { for (d = 0; n > d; d++) p <<= 1, q == b - 1 ? (q = 0, o.push(c(p)), p = 0) : q++; for (e = k.charCodeAt(0), d = 0; 8 > d; d++) p = p << 1 | 1 & e, q == b - 1 ? (q = 0, o.push(c(p)), p = 0) : q++, e >>= 1 } else { for (e = 1, d = 0; n > d; d++) p = p << 1 | e, q == b - 1 ? (q = 0, o.push(c(p)), p = 0) : q++, e = 0; for (e = k.charCodeAt(0), d = 0; 16 > d; d++) p = p << 1 | 1 & e, q == b - 1 ? (q = 0, o.push(c(p)), p = 0) : q++, e >>= 1 } l--, 0 == l && (l = Math.pow(2, n), n++), delete h[k] } else for (e = g[k], d = 0; n > d; d++) p = p << 1 | 1 & e, q == b - 1 ? (q = 0, o.push(c(p)), p = 0) : q++, e >>= 1; 0 == --l && (l = Math.pow(2, n), n++) } for (e = 2, d = 0; n > d; d++) p = p << 1 | 1 & e, q == b - 1 ? (q = 0, o.push(c(p)), p = 0) : q++, e >>= 1; for (; ;) { if (p <<= 1, q == b - 1) { o.push(c(p)); break } q++ } return o.join("") }, decompress: function (a) { return null == a ? "" : "" == a ? null : f._decompress(a.length, 32768, function (b) { return a.charCodeAt(b) }) }, _decompress: function (a, c, d) { var e, f, g, h, i, j, k, l = [], m = 4, n = 4, o = 3, p = "", q = [], r = { val: d(0), position: c, index: 1 }; for (e = 0; 3 > e; e += 1) l[e] = e; for (g = 0, i = Math.pow(2, 2), j = 1; j != i;) h = r.val & r.position, r.position >>= 1, 0 == r.position && (r.position = c, r.val = d(r.index++)), g |= (h > 0 ? 1 : 0) * j, j <<= 1; switch (g) { case 0: for (g = 0, i = Math.pow(2, 8), j = 1; j != i;) h = r.val & r.position, r.position >>= 1, 0 == r.position && (r.position = c, r.val = d(r.index++)), g |= (h > 0 ? 1 : 0) * j, j <<= 1; k = b(g); break; case 1: for (g = 0, i = Math.pow(2, 16), j = 1; j != i;) h = r.val & r.position, r.position >>= 1, 0 == r.position && (r.position = c, r.val = d(r.index++)), g |= (h > 0 ? 1 : 0) * j, j <<= 1; k = b(g); break; case 2: return "" } for (l[3] = k, f = k, q.push(k) ; ;) { if (r.index > a) return ""; for (g = 0, i = Math.pow(2, o), j = 1; j != i;) h = r.val & r.position, r.position >>= 1, 0 == r.position && (r.position = c, r.val = d(r.index++)), g |= (h > 0 ? 1 : 0) * j, j <<= 1; switch (k = g) { case 0: for (g = 0, i = Math.pow(2, 8), j = 1; j != i;) h = r.val & r.position, r.position >>= 1, 0 == r.position && (r.position = c, r.val = d(r.index++)), g |= (h > 0 ? 1 : 0) * j, j <<= 1; l[n++] = b(g), k = n - 1, m--; break; case 1: for (g = 0, i = Math.pow(2, 16), j = 1; j != i;) h = r.val & r.position, r.position >>= 1, 0 == r.position && (r.position = c, r.val = d(r.index++)), g |= (h > 0 ? 1 : 0) * j, j <<= 1; l[n++] = b(g), k = n - 1, m--; break; case 2: return q.join("") } if (0 == m && (m = Math.pow(2, o), o++), l[k]) p = l[k]; else { if (k !== n) return null; p = f + f.charAt(0) } q.push(p), l[n++] = f + p.charAt(0), m--, f = p, 0 == m && (m = Math.pow(2, o), o++) } } }; return f }(); "function" == typeof define && define.amd ? define(function () { return LZString }) : "undefined" != typeof module && null != module && (module.exports = LZString),
          eval(LZString.decompressFromBase64("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"));

  window.loadUrl = function (e, t) {
    t = t || "string", console.log("loading url", e);
    var i = new XMLHttpRequest;
    return i.responseType = t,
      i.open("GET", e, !0),
      i.onload = function (e) { }, i.send(),
      i.onerror = function (e) {
        console.log("error", e);
      }, i
  };



  window.funcStr = function (func) {
    var s = func.toString().replace("function () {", "");

    s = s.substr(0, s.length - 1);
    return (s.replace(/locationBaseUrl/g, "http://" + location.host));
  };


  var soundJS = LZString.decompressFromEncodedURIComponent('IQMwrgdgxgLglgewgAgBQEpkG9nmvJZAQ1SIBpkAjCqCgEwoFNMcYALOAZwDoQAnBAFsAykUEAHADaMASkRiNkAXmIV2XbjASiJ0uQuVU1HHlDZEIERpM6GADMgA+yWsnU8EYGOK8AhMCAgjHzCcABeiioMbibcEAgyjDBgfCgqwMCMxhpwEHDwRJLhjBjIAL7IAG5EfFQA3FSG7g3VtVANUIZYZS01yHRdZdzmnADyAO4QAAoC4sEwAJ5MhniwiCikFJQsuJBrhFClrLFQSJwwfGCwCLUqROW4N2ityIq5VJh03FCFkqjUr0wADIgWgiABtRgAXUMlEhUPQDT4SRSKCg3HEAi0izmsIxWIQOKyxHxhMJC1xKis4xcFCI3AA+gzOGA5nwmXjMWSiXTyhQQIZwVDuLk6IwAB6jAWOZyrAgbIg7EBPVAvSj2GhNWLSCAAc3YHWQAD56lQANRmzBwAX-ZDvdzIEExLjgygwpQe4iYZHJVKmn2o5AAWgAjOUOtxfEROJFdvh1mglXt5cQjg81UiUX71SoAPQAHUozNZwULubp3AlCggAxUcoTpB2L1c0V1FDYFDgFAAVg1rWhOnXkw3Fdg4-sUJQ0wHs4zi2ymd8zhcrlo+NwiOIpAtUO46XxdWBBIwIDBOJgKjOUCUAYqtuVdyZ0BQAET1pAv5QqIkIAWjnBsIYoyUN2jCwNwADWjALJwqDoly2IUswFY-JIfyuFAz7EIMnaGPBBJEg0yq1Kgup2igcCfIYcDgrqUL8t8vyoB2yC6pgAA8yAOE6pC0e6-QXsg3Z4XOLILgyREqmR7yjrWxB8a+74QJ+no-gKAxOpQmiMOcqB0JgAD844ppsHxjvh3JIeCRD8UpiZjs29CZr6KBye4jJicE2Q8POwSGN21n0S4eKbtuj5cPuh7Hqe57eR5Ja3P0moVGUpH0JgABcLikohcx8YYdDOYGnRlLyqVYei-iBH5Q7xoQaZ2SQ-5VH0hV2ja9y5OcFhQIwv7IAAqrkMAABwAIJ8HwRALJg7l0PI9x3A01gxu1YLkd10B9QKE1TQsVVBLUMrILt00ipwp07qOx0vhAR6UMEKnfkh-X3Md6JcAAcggYqOqCqB3WhyDACoel4gdwSGf050Q3wjbIFllQIHAAx2Ogs2xPNMCLcg1KDcN42TdNjbLTYbwddwlABIdG3Y1t-WXbDGMaFjON40Np6E3tpCU9TXkkpQCwKFKIAxjAFY6vqgEAFQkr4ACaAAqACiwgMlMysyAyysADLKwAssrn2K4irxk2O-aoMApC0z123ZUzGMCDSePK5NNyoC+ADCy6XGsepUHztTjPkgGQBB8STG4SHcC+ptzQthj0qzDzuZL7BaizC3cOnLHuVY4owIYgOSHFmKMJUxdgEDFQvNEjBFX69K-AgPwGLVE5gjsV644wNKVUH8OlSSCHknMS7iAsKzDvV3dZigeMD9VcPswTl3hTwrPo3yI8ETHnBFL1091QqWxzy5uPV5IX6NDxObOjwudYQ4Hp3H9jRGt+2onlLyBGYvkZB4J2xplXu-dAHLw3twVm3AWSUBqNzcg2EzQfAvPQcGkgECUH8HASQYojrOC0vrBAYRfCYOwWAXB+CnCEO4AAdUYJQAA0vkMhWCcF4P5rGLSA0ZA6xoVQbg4xGEQXyLw-hx0tKCBIeIisggiBQTYffOypltgOT6O0S+QNPTqjvoYF8oVD7yHWLmVuCgYBBnOMiMQccGgXCnjgHueMlGoEChQVgSEsrqjKIJNuZgu5jkvPPLR18Qb9D-gOYufckrZVCieOgjYaDcF1EkFx2xQElx3vSeRijyHiOPp3VR59AyZLCYoIyjBvjWOFiBMCMBxFQJyYwFxSD0kIyqMjVGWTuDIiRrkrB+SO4mWak4q+wMVDlNeD0iuCAoLAVArABpo5EadK4t00eRJNAICUQUkyxSm7cCaS44B9IqbLzQbvSy48tBKMGcZBs+yUDZIUc0vJfCoEwLOYdC59xypJNhjrLgRchkPLHI1NM7kQBwD4OcKuaE4qSGjMCkJcU7qCFhrYFQdg4pEGqLgoglBpC+CFjpDUD8Nx4sRYS5pQdMVrKCRfekGyY6nEnrs0FOAXhEEbk8qJ4CAVAorFCmFyLIXQvOBLJFmdH5IorGijF0q4hHgxRWXFRB8XUuJQoOl7k1UaqJSSzgqrKUEqJbSxVeqqVmuXka7Cw8mV73HnEms7L6rNQzMgHuDqK6KsRRKkJ4y0D3zTki4E-0tIF2RXeclfqo0UEyapWIwrYU8TFSKpOWFdUms1Ya5AZo7g5x-uwHF2brWHU4BaVFyraUWnWY6ypRA6DVC2q6jYjzgbADTSm-6Wb1VWuabmoMX8NDJpgIWvUxbyWWtNTSm1QYgxxVHYq0dcQqzxrGWErtMAfk5THpU5EIcXUgtnuo2o3LPXBOtlu9+nak3irHeXSoYa0DXtBqU0GOMt1Q29ZXFZKMuKYGOiG-117U2xGnTm7Vebh08BXbnEtfaZ0YotFhd95LR07uZePZEYtW32U5X0c9xF1oqCFHY2IB7RSlDqKbL1WSHymzroMYY0YJjTFmPMJYrw8NFLBTPNEEKTi+1XE8N+FRiOqj6G8ScnxGJoX+EwZ9vFoSwnhLR4JFlcrcN3TyS5Wm+W0hJEyTy7IGScnrWVCMwgLiMDEDxpMJ9UzNTTkCpOCLW6FBFrhrFcVfyiySPYdMfQATRBABQNsyAWJdiEhQCCFBS7IEEPGigCAKDiB5Y0Kk0TGaDxDAANiwuIAzHNRrr22PFgzABJTmZXUPFeGvl2rPYqunka0THc5XkAIHq6eAAzAAJia8gCCLWYADaGwKLLNIABimD5Djfa-8LCL5IBiihVYOgn5N0vQFLNhA8g8sABZLrv3fSoPbB3jvtffqRAzF2YBHdq1hQQhgQy9fey-T0q9Wt5fXt90ri3wQhhGhQAArP1hEvNzngjsEFdEA0azBBAJg8YbsBCJRUc1OyU4dj5zELGF8Y0ABq3AEf4ORwgVH7s+CfgZYGG8dIsLeNQGjm4WF6T8CELDHj7rgsZfvgAgV-qtLOoSdGgB1nrGCCW3Wq5lTWVT2PW209xAMts2ieiSXtnpcufOBPHc6MJYeckF5gLMGc7G9N+LEkfnvPktt0kMqFYsMNtLbGTH7b7jsXN0UPXEGDVQaDDGy3gRcP2p0zHZE8jci5F1Fq0lSv8MXovrrsd-uB2B+D6hK3sutMbibXbHnOxLa3o0OnxsTtKdgOymTpHKPWd8EkiRNOIf-NF3zaoe3oeAsd-Pan3g9734t+z93oun8Y1AoHyK8dUsaNZ886P4MPvJ9waLXnbUk-G3Nt6hgDLDpw8u+mYeuSHuLYdWNF3tvleXYa9J4jvgFOqfo6by+jfeul3HSgb7sdlGawYHcyPm3r6ivvejPuwJmtqK3rhkOp3u5A7kXDAX3m-mOiuo+kPpAYAbhpxHYHPv3r-gkhARoJgpgT3svu-qAbnHviYLnnurAowIwCNonvDI4sEvcCaHAYvkZLqgXltDbEHhwVfu0l7pfrhlwRRn3FRgIdAV6O0kjP+g4AfvWtMo2gNNVqNPZirueiXr2vqiUCGNvOwM7NXvDvfo-g3mrsAeQdPqzOCMPgvm3kFHYSbovh3iGL5i4SoG4fPs4UAa-BPlYXrrnDdk4Tnj5v4WnjwTvobnas7koXMAwaoZzEXirpQH2DaAmm-DxDjGjBQKXjwOXvcCgvodfsYXfuTvXtTi-jbD7lAT3p3sGsgVPucA0KkcXjaFpEESaKOD3FpDYTZA0PcDAR0WvveCoBGlWA8D3AobEXLsoSfvxmCGfCri2EwGkWgBkbfOGoYMAPoaMZ6IIJgBJoOOEligMRfm1McQMK4ZgOIOCFAPxO5NYnQIkaNLvmbKtEcYYLGIMcgCGMtMaKccFBMtBsGPocgLcfcYqk8S8SNKUIobMfEYwfcm6lsDQE2K1EwPyGsQDGMp6J0DxMcTsRVF+CoAcY8CRHJLGDgdhCaA3CcdxtceCeCHQA8bEIiTCbaCgvpKTB8SqCfvYGcSaCAA0PyYybcT8QMEHiGKyRoOyWobCeqFyZhkoU8fKRoSwSnuIY2qgLscgJIDDjCPCXnoiWqUwSMsEhsfcFkfYIQTwIiTqYzvFgaTQZstCWoflskRqYGI8bZgkv1o6bjM6UabQXKT9jzksV6X6JaTdtkbaRiPQRBKgP6fUahkGTMXnqqWGWae2j6dqcmdGgFLDi6THCaVmciafGZJGQvLiZkf9LGWXAmUmXSGfD2GmXprQW6aeP1odp6cnoGPcGIRoJ2TAPllbGjHmq-kOb6RyRxJxPlqAlAsOaObOcgCNJgCgrmc8fKXCemSGQmS8d2eGZWX2VGTWdhNaVikzhEu5KGSOXlqZMAOOSglArebCYUcgP1iufOe0i+fue6feaOOxJxGuROTeX+ZzDbCgp+cWdhr6WoYedmWOHRoOTwEufeY+euZOahXBRBV+QVj+Zuf+aUEBauZhZuTOTBZUqWTAAheWYsceaMtorWSRgBveChfGQkURUghhROb+Qwdue+dBSRd+VlHxRBFxSuSBRuWyeBa8YJcqbMcOQNr2T3JuagIdgGQgG2Q6gibJcpWaRGSedWUxeeXWTaQ2Qwepc2R8CltpRHrBY2mofpXRcwUZeSk8VZV6LFnZYftRc5ZjoZYxdfJ6FaWZZeRZYmRpSmd5UWcGa6b6fdv5Qsa5apVqQklFdGiAD5XEQmYlf1keWolWQGiFTGeZeSvaRlS2bgNlYpQlXNg9j2YhUVWpSDl5axBErqM6VlGwDuZFuqS1GeqiYZvXFiW5XJFpbDpqCoFpdKZqE6P1iGIdgAOyHYjS9ZHYjTjIqCdBGSoCTa-HBgfnICyxwTGhGgmi9a6k4ydDnUmj9bcQfl2DLWjG-FPUjSg5LWg6OiGb3XLUknYRGTqhGSfRECfTtICgnVhi5gAY-mDGeF2D9a9bLCgwhhvUfV5ZOBmSyz6zyBsAYiU5NnYRB73VYSKAd4DDY24343jCE0-Hg5YQQ2AigLTHtmbKIn3ZHYFXtrRkXmsXlWNmtWtJYRkRGSdVFndW9U6UZl1X7ajQvwuXmmalTnamo0BlwC9VwD9VcpDUrGvD8jhYZbjUGnI1dZA5BQ4y3EACcQU98txI0QUZEnhh1+VJ1bB51yAS1xJKN-WS131gFwFmNAIn22178wd3GToYdAwRkDgWUA2S1eWvtfhO1ayfhigEd-1Ud7VkNyA0N45WUINYNolnQMB+WvWa1-IXxx1yAON7A1NhNxdyAl1DNIJFN1dVN4gBNyZDdeWvWwtVdIAClxpuV9VI08tAVDFFpZ5oVLFOR-Nllqt0Vdokt9l+6vp3OTVA1RgMSxIwp5JaAckS8h0G4aEHmCgiS3GUQ0CC0L1+11JbBuALRKwIJYJjAroMp2FKh256mF8AwcVJZCZ69CthldcmJuABte9OJJl091RfNsYh9wQx9xB8gN4zdEyV92M6CKgjtXEj9JouoIphgZEjJWVLJiqr5kFAkGWigf9DldAoQeoZaNUCt6JtQqRblDRRBIB0+B8cAO+IRo+AZ3B2+N4YBbAV5NDVFCZ9DuojDGOyVQtSFwS-eK6PDfDGB9huGKCCjEjcxkuseXNijF8GxuiWxKgBinAUAcAcAcc9Acmfwe4XE1lAIPFOjiJejAcBlW9mEhjJSU9pV4VxVIdBJ+i0Ylj1jWEXwqE9jJgTjNAuRYJw88xjmqicTAkKuO94W7YnYPYsW8WFASWuMKWaWFAAAjg0JwCHDAP4qddtVsjrJTsEF7NGCUM9nCsFTohEjHaCeuiZSY0Gq9jnXzUie+QCN1mYy+GieZM08gOY2Ey+FlD8KtC+IivABACGPMxAw0CNl0TdsJObuQ0QChpgCDKSXPt1h3u47qLwAIIIF7OYHwD7GKKgN2KbJQNYhBB0NMytjACACNBs4s4oN8yAEGH81lBJlsxftA7GGBZxRBYc5aMc-sXPp9mgCGP1ptaCMwBEucyoJc9c0IHczUI8yUFi1lCGJbflZ6EmYeZi1DHtYYD3d9TCxBByfC1hDi8gHi5zrc-c8S6gKgJdd9ViyRRjbKNvFlP1ghaDN2Q9Vi7tftYy6CMy6yyhuFgy71kyzJbC3Jaq11iCVyzc4Sw8z9CUDqV9bS8gMJflbKJa5xKK6xOKx+Ydii0matUK0pgqxq0q1qyywJbq9g4q3Pb63C7q4BCoIG8q365aPGoYPyyGOa4CLa78ZtTa1a5jWRCK5jWI4dXlqDqDutSlvqxcLHvizy0Sya6gHm-1pbRjc+SgO7ajVhKDj3fdbxajYjd9RAOjK8+8580s14CAPlkGA9P818wO-liOws2Oz8-ltIKO-2zO3lkGHO1Owu4O3lpQEIPO4C+O0u5u4IBsxU-kNU94zgACzM7u5Oy4NO+u8O4wBs8FcDH8VQL29e2u7O-e6uzu4u8u5+3qdsdSW87Zh82+9++u-u9uxez+xB1lJbPlSaOqJ-prfs7JaOYqJgH4WST3BpN62XpESUIUSoJ+Slg0I+7m-m41Z6NFoR0deJiqBCzszxEVih9q2h-FtvCc4lnPpbDR8mVWzWxfkVsdEViaB9b1odr3Xqxc8W3qKW0a3y+IKbCtIoDgJbCJ8gM25dZbSUa7NTp7NVtUEUAMLu8gDGCU2ACeL1LHKbJbJp62yaKgCU2Q6hwBex4Bs4E56J0teJ5J4YVXrp+jvpxAIZ-+iZ2ZxZ1tNZw0BywawS7yxW+IKU+ziCflRUMx-saVR3p+S0a+2tkQNXDAFlH5zfjSA3p7AjhHJTteNAD9LHllJ+Cgt43Tn6Dh1Ovh+fd1vagxv8vkFYtrv1eCs5rEH13ZncHFJQPkFMAgJwPkAmFipMawSvfrlrYRhYVNg7L1zZmIFAiN4IPrhgOzpTJN9N7N4QObhNzAFNzN-KE7qzTHPAf1T3JtbLO5Lt9wA99JRoBd1d6dygDo+nipUo8N1t3t+XhQ5tfwbEN9yd-KJgNDSBf9-h72R6j0YqtD9dwmFo3FG91vnbLaO7b3eN8dxj2dx7d9d4rufFcfsj3zuw2j8T794dUgq9yD0flRjXXjQSrBOqAT9Ee5Oj4zyoL7aCBT3d+PDGAwTT6w-zoqvAf-jSY0Oxbj7wT8Wol4pC9eeIcfraEHssh0vIZRcfXALqGkC5e2g4Jx-zwzymLtVb5dzD3N44+Sjj+18UbIasizVLR2b6QYwRm0PQKA2FqxFk3aNiWHd0cEtSZbJtePqgMh8guSgL7D5gMcTt6z+QyuXbz9ymKCP1nm5gLdauUzzyeTKixjePpRECVhbAuny58RZxFnw74QKCOR71qDgXw2xjbryX2tK6wCXaCn7Gyz1LhxcGzRYdvX4n9bwmKCPlktfPwte32dXdT2d3+8aXwK-ByoJX8ccP9rqPy8QNpP43yT-WwT-lWv8p2fmgNbM6-35RDp9EmVy+IrAgN1vIhAFPBd5wMALYvSYdtW0Ow1slq1bDGi92B4j9yGs9aFhAP37kMwSJFQ8oX2xS4BFUb3chkJTnJ5Y1W5udAbJVhKScSKrVMNs71r7atYSh2L2uEhQRk1UBKCIhpFk1AABSFQBzzrrJk7+kPL7tPyQBUC2BFOD2J0GhpsCO6NNDgQ4C4E8Ak+CYXXtvGa6TgbsylE0JrSMg3V3aPxMMMExUChgq6cbJNm7RNDjkg8mEUBEILbq11RBtNQ6mCWcDcR-oxxHQSdREGd1Gch1EwXGWV475o0JUSnv-Ul6eNCqm9XWhk2D6MDQ+vfcPt6Ej7YkY+oMePu+RP6-dt4qfPfmIAP5f0k2iQnPh+Xz7L8i+l-c2JbA9IV9B+oMVIXt1vLLlMhUPHgSgBb55s2+HfE0B6QKGrQ4OPZEoVXzT6QDZK3ZY-jUPt6n9vqc-BfvGyaFOti+6-XvkoO36lDSBPQ7Vkf0z4DDs+CYQvspVaEqde+t-BwCUMf6lc9OL-N-olgsBf9euv-U2HJAAGW0gBCdUAVXXKHpCIK0AtAWQLH6wkEBnEJAe7RQH7VHhGAvCjgPmFwD8BArSSu2FeELD3h6lKgVcQZJ0D2qKCFiJ0BYHmC8alg8QYdSyHrA+BVNAQXDDMHOCxBFATgVP0GGM9ZBgkVHjxCUF2gIkagnZlKRuwOCwwJ1HUvoLyFGCXAjrQke3RcFE1figGNZFoNBK6CiRtNTAMYO7bJRfBtDHWMIF8C+8ghTkCIf9Qj4Xwo+5+E0M632HIBn+r-d-qcKoDnC-+2HJOKBRWFN8IAU1YEWkKgHjDsRSAdBCaAxb2CnAuAt4RyU+H5CyRqw3gc6N+IY1gmjgD0VCI5KYDAxWIy0afwiYX4aWbojvP8NBGECvhq-X0VaM5GxiLq+VYJomNgF2jQRlAquuKOTIbD0xMYrMSoGUqqDkAqIksa4IWaOgUa+gyUb8XvA0j4O4SGsYXw0HMjDAjgtAOyJIoGCYaUo0wYM3rECibBwot0doNZFoBJxo4McR4Pa7eDDeiJeUYqICEsNhqYfNUVEI1HYl76OomIEYQC4ewjhhoz-saLPAXDDa5oz7lINqE2ikx5A1AOOUL6OjrR4SF0X2JDG2iKhoI70RD3LFJCAxHpYMaGJBFviIxLQ0CbDwDHxjIkeYjQHgLfEpiJhkgo7uSJTDICsxjdHMQmKgkFi3xRYymhYP5Flivx0RAYOPmrHBQ6xfI4kTIUbFAhmxw41sV4T6ab9zi9IvIb2JFEDi9Bw4zMW4J5ETimJVgqUkKLsGRI5xYoySfmVbHuCZRdqN4kxhUDdAWMYwSYDMAQBshFgJtceoELsiHBccQmCAFYhEyJRfkEDF4NJjMiRMmIAILFlkXhCqZoQ39YqCvXMxy5ZRsYReBWGMwJQOQYxFerd2wZChYEh8OkuiGViVATwMAZWIIHyAKA5GyTLHAsRxw+NZwwU8SEuEskrhrg64QxDuAcY1AooiU88AtwvgM42qWkQ-KT2Mk7jNEQVG+O5ArhVTgisQTqTFEGCoYzyNTclL1LPDoBAozI8aaRgRBxQRpnAQKBiDACcAeqaiYeA1KUJ+YlRjkfoNiTQxgxzcs0qGHQHGl-pUYB44qIqlmnzTRQEoKUEtgoAAA-ZOh1ISkxR5pnAKQLwxKCuAwSJ0+lFsCW5IAj4245YlQQ0BIBTIxxFRDmViB+YIZTODcFuEkBlSYmxAA8EeCqkXgLka02YowBSnIooZmhHWgHz1pgNIs2Je+BVPRmvTJq2EIjpazuBozooZ4URh1TsakBGZVUigD9OQBCgemoSUGH8J6kvTRpESLKm6Hd7yFDiKoEgc9Kqlv1opn0+XnJBQGxg8alBbjCaDah0AUMVfNgMyThwIywo5UrGQ+EqjNNGMfQEgc1JykoACZRVZuIjI6yRQqZIslKJg2wBDARgbGPSQZK4zu55GhlUyYJg0CnBCpfsNcOaLo4kR7J5ERyWzJclKYIQKmMYmpgyyaY90vkrTP5IMyuB6QeU4IKFMEQu5LMDsIOMIE8B8AgZzDPjI5jFzmSiCb-ZjpFi-yNzvIyXLqHTF6j9R4GfAQFLCnYrf5zRolVPDnIgSHQ+51ufvKLgBi35YYFeOMuIHy4xg5Ij5ILLUCD74M3KJQaINGmwZaQxYlWQQMeDoBwBkGAiU-EVX3lJBFYcAY8J4BgCmRxyw8falpCgDSAagh84+afIMDHQL57Db4O-L4A3y75XgIeLY0PzdQ+A+M5KtDNlJLzGAK8rwu5AZDwBjwiUXUC3P0kXIvgh+TBPpMe5A8NAuM-IJ7C5C6gcMnACZtX2-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-Sw9tVRtGosDBh1+eF+oIv-DGTDy19YsDfYNpgMWKb95aWBBwBACAqsZSKnSGbjN6XK0DNqFmWEToOHQW9KAiA7gagNb7R1O+k2RrrsVa68ZOuzelbOQ19LgkJir1MbqdmozKp5uqLZbs9nW74Nvs+3ZLpQ1O7g5ASsOdZOCWe7Ql3u2TL7qiVuTiNcIYPT3HI1IRKNSEbObRqMzpKGN4U5jdlDGhgAT5CAPJZUE+mp6sppS53tqr0Bnyxu5KMwBYCsA2BhN5KVkFjEYAkrDAPVdyFEeQYkqS95VRFAsBb2N6Q5KQZEKeFiOMHYgDIWNHkfpRTaQV++-6RAuxhQL+q2hNkmkdjxtFq+UgaaCwb5ntTMYFcLw2BhZidGq56IFw24Y8OfSqktmM+q938OyBkGcUEI5YBWjRE8iG+zw71F1HP9vopnVkB3SgX178ubh-oL0cUDKhVsUXUxQUaKPaLFUYoJY5UhSQwAhjvUElYQY0BaK0FhgA+aeGCCGcoEiRhQMkceqz1eNVx-vciChRoQh9U5EE4+26ViHkqohxlDDs9jAncEkgHZa8pmUW6EDeec4PgqW20G6jLRvLU0fqOAHTNHRwE7DJfCInQTpexgBCYqiAK1CHxwoJos1V8BHWJW+A-NpjhigrECARXDQearA99JjxzePsY308mDcjOyNczo3qpUsjk0RKcUez2ykiTZEboz5DOPHgLjopm43cZiPaKDuwB0LZqoGjiBojYJ0wNkYVPaKKDh+b43qc1M4myl56OjOzu1NJBdTDxuMlAEtO5HzjHePguSkKNIoSVrCgE8Mc4ATH9AigThYwA1a2C4oQZ84IqcNP8LjTpp5Buae+A+mYAIZ4Xd3q0hi7zgW6rbWNUv37qKDUAapJttUOBCtpO9KolSQrqX11ZAoWkstA-U2hLi8IJJGJE2MKB9IblReEUiA1jIQNvBsDUlIEPOKhDSonpYbvc2SHTdMh12XmY9naTvZXiwyRfSAZqHHMzu44CHMCXu67UOG7jPoehiGHCNxh-iKYYRDxKXcVhuYDYeMJR7xIj54kPHucNj7vDjmKcEN1QkVyq5SpnyBwfz3ILQLKRsVDWFY0mtEo8Ru9NBc338x9lZcAQBCpUDwXZSaF4kChcT5BwF9TvOaCkGMSk8S4gm-tfIDaZxRjw2MFOFSCvg4o1gCUhvRVr41MMyL5KUC4lA4uvdALlSQGSUAH2ZmuQD0D5Xxf71w7Tl9WtLTCbn0bLJLVVDzVoHECTbotK+sSykCs7tKyFFCqS9PpkvJNYT-ZKHIdAIvBbUd-+qhacnwsDmytMWmqfTlm3wzuWdyKE0Y1vxjQx9M88BAAAlFYisKYOXM0sEc5B-07ltpukAn6F4HlrywAgiuMAgrlckKxQbvVdaZTFpGK2LG8ulzl4iVrwaFYxO0FIF0Cks7KfyJMXJk7JrppA35mmVq+S0zwHghgu-Q7gA0kyq9zYCNW6AzVtOj2mG6dXq43VpCwBw8EVXutzvcS8VeFN4HYLZ+qdQNaavDX2KDIUC6UF+lPyKjka5S8gb9C6oxrtvcDGNbu3Y9xLi8xaS02K0e9JTsxG47OeCRvgi1T0N+DdDoDEX5QT17CDdBouNpOlaoiJGhncDjTAaG8QKGTphkq8p9I4GfSZFPYLmsTKlpnHBFRPlbSBNQcg3AZZqcnx4oFmAztZQC8bBt64VazaaUKgXX+gDP+WqFSbTbpdZKe+H8rgJHKhLNoty0rpBL0h4MRcvdUPDjICXnleljlJvRCERYosDZu7PVQWzcxMd2DFASQJQHx9hiz+vsBfjYANA2AOsl+eCDYBBRKkWVjeX3Q7wgBRGoMjwIECS2dK0SdIVAFix8TY8qjsB47WzWwss7sSe1+AAlLOl+hbQtTPJfFoQZHqK8v+szVVoMxTheLwVwRh0b9vVambxEBNZmaPU9XWTrF6O-3tetTR3rkNt1NDYbBGWDk6dki6b3MsbKC7mdkkKXZxFRa0TKdqrf3u+vJbq5Buwy2svruJwxiFYVHa3fR1yIkgP1kBFXZRvB2Et8y8LVnYVA536oedp5PCbC2LLFLNfIU8jZi3gGep8l0ezMzGh7Ho7e9B0KHOxi5A-Ihm2wPECLiHGaw1na63nkTtIWJd+lspSFhNu8AhNQRt261qDur3Qtcd+QAnaLVYRvb2UJOwPj-x9qB1X9mAJVhyXbwDrPRwm6HY+RsW+A5FhNXGTAe8B6qseWVZrxgewW07Ftxu25XS0LnUdDd3ZWpfPALk5Ik4kB6mu-5lrCWsx6+NJNYuE3cH3d-B3OebvLFz1oQ1WxA2OJ4w8qZWURqTUIZkoSBit2fH1Twb-EVAFoNiBaqD1w5A9AoaGjTbhPEO8HkWsh9KM4s32JL691m36EIcSGSd69h5QvYRsD2xtujlhxPoFvZ2DLs+y5Y8vksnKl76llM0lqQvWY0bNjZ3gtaGtnblrxNjGyvaIVr257G9vY7A+IwNdC1FFlAkWogcTlPwR93GISEeBHGwDGNy+7QRWvDXHTmzGxzg5CdJrDr7thuF5N2vlO377FLi4cp3zM3AzoFy6wbzHNwQ+DDiqc6yd13CGHdE9dRfOYkOlSlzLs6qW7PpJW6dJShxDdueFV0V9zwRo86JhPO6HcNYSgw85KvMB6TDpG8w6HqxsfnQ9gUuw-Rpj2FWqN4YbKFMDSPFnpLOANPS7rLzfmX7wPNGzc-xPYNMLU6+2x8-SN6hILeJ-5yZsyNSCbLZKdDdmeKOsHMYb1x3jC40BIxJA6M17HYARd2kLAEL2IF3ZxjdAa9kgNKb8oARE4EAyL48BFbSkbxXwSL9GX48FyFA7YFL4IFS5maLzlI6ARwjgb73tLLLY9gJE3cKRT2BY4L9uySAstBwrLJl4IAgvcfkOcU6+9paBZ8dQL7H49xx3smcfcBzOjAFPZUu4BJ6dXBHDPWLEO7auLODTwS6AYrDFW-nDRqxx45724H2lYD1V-y4IeyXNXYDiIy48-uPWhUv9+13K8dfcumbOL11ylWhOcOjdOL71zPbDc93aLC0WV6vuedOumbFdj8Hy4jeDOo3C5jN0XY7sl24Xmb8u8W67aBuU3+RBV0zYUvsPI3gruS6FtrekO0TDlv0HVLm2ltXLDmwc7fj+fMv+j6+ly+8nQ7y6bm8VqK6UX7cEjuAnl3A+FdwTJWx3XONK3W-cvgJp3HTud33tSuQJR3jtkssiDmzHqNXAp1NwFmgc-O0bCCmYNYH2wnziT6L4133qmtElWnpWzawiTSPnbVc2wm8iqc9v423nWxugLe+Pf6Mv9WFu99qQXkqnxru0z9KSc+nfoa+aNta-rw-cXOSyqiwp1yldtAu7XZVjEHB+OsBowkMDMM8sf60WP0PVV3J5si0C6gZGjAP5-AlzV43UjnzrBxi-Ovof-3xMEm6tu2u4fVuJxuBbx9H24H4b8vBD1qauMofuTFwXk7R6usHvxe0p-Byj0npAxyPk6xY8h-fj7zlL01s1-xd4IUnfSCwcN4rUDAmKqbLgEczp9BgUz9PVHzSHQUsr0hvT8p308eEO7NHgXp2DdKDGOIFb5P9I1D1ApU9tPl9QbnGD2t+KxmHhLahJ7AkjNTHaZwbsdPU651emoX5xt+L2pS8DqIzugSYwYBjNxnCLsQUz9Miyt5efPOZ842p91u-OSP-Jzeq0jW7kpavHlK8vkZ6NXHR5AxxALqagSoPSvUgcrzheK+pqZjYR4dXwGmxTQ-PrFsk0zbTNmms3Nnoxx66N3eecjTXh01vR9f8KdLOkShShHy9+eK3qmmk0iZ4yw2OHhSAc2UpCFRYcmw2eLNiXggAewUKoN6M4BgbohevvpeXvfBeGAlp6igTiM+rXxz4Hn0swwGwJSlHKOba+Q6iFhZlB5kIdIwEi-vCGa1GSR0xgBaH4gQhKAZPx+n4XR-P7-G2UUHzB5epPyIGj7dECCcJfNYwiSJSQMbeGwX5ewQkDW4YH1LdggoRtrkL1Ez3Sazin+EH8nsqTz7M6HTg71aeO-oh83SSVHed8z0RaszjXkM1r9ccvKezxnnka59a+L3XlsX2LaKfaWUnkT1J2k2XDg9lPBv4Z+29NdR2gGeDHTic9rp0XZQmXt9wW4N0MrT0+m8yOpBvvWwsfNzyMiKDM0M4WcqFOAG42CyGesE36UWqkYt18oCApfdKP+V13Ki663FCh6Zz7NmfVnhkjuvcxoYKlu6VntktZ2eZkwXmtniba8x5LvMh6HzsevyRHtsN5z7D5zw59ku4AkuyXjAYPz+c7jZTL5okaPY36KlrhFz5Us3Sub30BlDnpIQvyzupurFthUCZP4oHHxcLt4nxVgVTXkTih3xFAFH7kB1Jou4op-7eNDS4UvUJV252n5I7P-bTMsagU8JMACnxhBpYEOnad0QYP2g1JnCvw3NbdLcxr8RwOv07hFndDWWcbJB4Fb88NTZ0iVtnMEED1bzKpzRADnRw2o1LDYfyX83zAfyzknDM2URQtoWfw40fDdtC0h85UzBX9w5G4HX8UZSmSZlxnLeSctP3Y0gL8LvA-2Goj-S2At5E0RF0KALOKWRIhjiFHyIA7-IMFBwUBR-yOV1A1-zkDmAfr3pIVZJOD59--NqC-UUuEAOz9wAtEUOQn-LwkrYJBbkUGZ1A9nFdBXVMAOv9a6VHwdI0AdQInJvGaGmcCYVWxWgCy-WDUUMq-O3TmcRDBzFQCG-DDVX9m-LAJVAvddvwiU-gIwx2cbzPZw0xSApJXIDKQF81Odo9d8xLk9qHtxKVWAqgILkGQTgOskeAxPz4CMZB4A7cKobgF9ta7Qs0pdOsbGXQs13QMBfAfgQIA+smUKRhk4MFFASLEWvOYk+0f3VpEP8SZEW2yYvvPUnyZksLrGxIFjL1zd8fnEfnLwjsbeFU4bQAYKIAhgragAldGMYJhFAPYaQidtlV8AM5Cgf9C9gxoabHoAEAUlBPsqARgA3UUASpkAgAAckGCQAf4L-5LYR4U8ESgSgVfBuTKAC2wZAnYP34niS5iuCxPHgFMdInF8AeCjOZAGeDXg5AEBCTg4ELtBj7DJ2VAT6YRAGBBYfEJhCQQmzhtBpA4iT24lKfrFKBjoZSkt58xJkOnInKFkKh0laNENuD4dGZixD-0f4JpDTOYoAoAGrQay+CCJP-modkUPF3icSvdL3bhzgp4g5oJ+FB1bUwHZJ0ZCLggAwwUoQ7c0eFmQ+XmWZxAKAAPZ-qBUKfsEnZJzVM7Q0B3Qc9QTBxUBfAN-nfkjlTQUBAkHVNSKBINaQGVgawU+VN4PQ0l1swjlHMSZo-Q4tXbUR1StVFROQuYkP5eQ2MMHUdIDtS4Mkw1CVZ4zQ7UNS95vFaDLVlvfHEhFEQ7kL6w0w5UJodeuOh3MAGHcsLSF8wzxwesEnH+wSdBIcFnODy8MEgR8-3WIDYBfSRphzUhw7qQ0AhwxtBHCzAWMA8Q5gZtVzCR+JEMuDjQhAASkYUYoCygGQ9UMrCxsasJm4IgBcIRDmw3cKWEd4dyEnD8EJphnD3udcIPC9A1EJnta3F8B8tSXKeGEAOAa3Exc1wx-WKABgEE2JBPg3sxuB+zWOQAApYQD-4j2Kpn80Lw4cIeZRwypCJAdgc9hfAIIMAFEQNmcELdwoES8OnChw2BGKAlMAxBzUZmG0Nm9Ene0JyVf9ePkeEPuclDwiEIm8PvDJVY4m7A5iZWE4A6AWCHKFt4bYJntrNDbQi0PlVnkp0H+WGibCuQxtDnk4IqcKYiCI+8N4UNlQSNs0rLSt2GB4I68LHD6LNCB7ZgOPtkBZF5CCBgANmMEOTDy8WSKvDEIwiIiADg1UQ5DFwisM-oqwg7kfD0Qu4JmZQgCIFsByFUYz8h2ATF2Upv+VGUUAgIjYxAiEFY4zMiNANFBgMdUZMJbC1kByOPCpIrchci+Q70g-tYddexfAvI0lF8jkGWoACiUAIKN64Qo9JyLhgIkD2OMJMfOCPBSwodUkiUwnkOmtMQW+VjwGohPB3DnIvcOmso8dVHvxOo+KMciTwnqKWFWw-N0zM0UIaMGZbQybwCMKvRLyq9-jP1VPAclMt3GsIfWLDJQXsMIjGZyUWKOzDOAaLgvxBABoBexGSbgkxUZVFVVBUIIK8hQk41VLxLVMwhMK7VjodiKeI8lCxl7kTwZTTEAsIEbEeinQ1NX4B01LMMTCBET6N9Jvoysx1g-o3iPIwJwzSMQi2mB4CA4FEAyJmZcgZUA2YJMd7RGjUo1MPl4SBJUNN5qSWiXm5nVC-BQAsoetgADKYtZCMgLQWmODAgwct2wZTQ30mRCS4LCEfYuYxtB5ir4LCD1k6IEXyRiBQ0LXjdIsOMkYitIgKSvgcufSNA4ZmQRSPC6CU8G00RUHJQWgZgz-HBD2uY0Msj8I3W2KAl8ZACipUDCiLbVS1N6ICxIPKdUSl1ojOwTB9Y2IGmiVvLqONj5I02IiBZo62JejFvGAwmiy3KaPqjPY2wCK8R0VtXmjpvKuhDAkvHhQ+VEpLWPOAdY7GBmDF9ZLn1CkQ2PFkZcIlGOYiiIuKDljrI+8PNjf-SdFkVQtBu251BwwuIUizY73ALUC4uSPli2mPSMxi9jEAHy4CXdWJx4cI72PlibI-3XqtWeCENbirIouNsiS4huIVjdIqLRz8OndoP40YA7sHkN1zG3WUMog-pxMl1DdPXiCuAzAKjlngPQ1SCCNLv0yCe-YgOyh+-LDyfMh-QoJH8znEoJiIFHKKWulJQaUFlByg5IOCwyUXfm-glbYKAQ4WiDs36Z7Qagm2Ds-Gn2uDWdYJB0EegISDn8UwBf3-l2AxcEPi6gkZw39lzAQJAYeHJYPXjlghLAKZvxVLHBIyjAMlyUEHaZA3UizOGE6xIpF8H1hjsGZlfBWEqYHYSZmVhMVEqFFhMOwicbhJfAuALdlfAJAAAX4SSmIuBmZf1ESyQCHHe+wyw3wHEGGDR+ZEKioixPRALQ3GS4NapjQo2190IsNRHHwNre+MqRFtDryI95AIQF+VOXMGVHw7EuKAuBR1Ki3JQXE3NTsSd4PZg9kKsTSWHh4+eZy2kRqUmU3kr-HmQdojA96QDDPYazgVkd8FAVDARHMIn2ormFswvw6SUn0tB6STqmhAkkHwCv1MdfUnRBuwalViS44fiEfJHPdpiEhxpHiAChZdfxKwgGk4UBAAi7HeD6cazbmjPIWk3ZkmkPZZpPmkTgtKTl0pg5FQO1ZgrYCqJ+ed5gb0JYmvl2CcIsEidAFjDGI+ZGjK2E3IfLeCOqlDgm-mwjEMalFQA1yQD3w8iCE8Caj8ww6lap3IGjW6i6GFcOfhyI85PLc97XIAs55kmxMEA7Sbm1uSkIXm0cSyzf6L256ItOBPA7vRtG2S5IulFXkKgT9QtQtAb5O4BSkp-xfBrOXkBUAAoN0DaMwkAchJA2k0J2v5Nk8yMHigE59BfBBALGDhCxiU5PxSIANmVwt1Qd4GvhHQp4ihT8EGFISYpheFOZTmYD+joB2Ux-TmSphPZOJTCYilEOTpAL-HBTaUg2OEZpU8txPjUAeZLe4HuV-RhlHE2wg1S28J-V-gpSKEDnwcYAKF1REUngBRSmbaziCgarQNDxTm4Mgz8h1rZ9DtS0pBlKfAcUU1PxoEbdwh1TPUvqN9JBUmFAb05DJehUSKQcNx3FnTVgkuTuYx5IYgjE1wWwJuPJ8JyjvoIuHuAQuAYFYTN7ACIvt+48ePa4wUlACDxJgrCHVoKUt-kqBNAKaAghw03Ew0APEpEiVDbkqaE8SgU5tNHVMZTsE9hpENcKrSFETQAgg2ASfSsTodF3nlSjY8yPa41yZxJbSIIEUAJiUo5qPSi7bXYILSgE6wXwpbbENJ7TK0lxLnTKU0+WGA6ASQCFDxDUdPzTx0kSNXTL0mdNHVNACgPuSNEq9P34J4tFmfS0hCeMLTnaEtK7Ty03tL3TDkE+WyQ6AIdNrSz3RdIniJ08VInjp09xNnTbVY8GEBUIGAXFTEo9tNzVoEDaJzjTw6sLlS8eH9MmdkAauCIBxgLKEFpEUUjNXJOwCAG7IJWKKlyABsWOmTJkcRjIIl+QSQCOwsoTmgCTu0itL7T90oDJsCIAI23OBCUGvi4iwMzryJkSZXeiI8x0-DP0CBYtKN6jlsTgE8BlIM4PQy50ijXYp5M3gi-Sg8ECjJYzgoGhuCm3HKNGAIAJGVeBxQOYH9gyIJAEUBEpV7XeBY4vYx+i4AcQBTAvki4QIpJ0m9My8tMkGMVDw8XUOojsMwWNjSew9rgKwV0l9Pa5iOKviUyXiZcjiyP0mLMO4iwmwBLDPY6NJ6jUsgWDrDGmBsLCM8s5TIKy8M3gmNCPNVUJQzF0tCmms9MnfESywwJOl-0OcCOIhiu1CLOUzxo6LICzTkeMKW9csnrOJj300HkNjHWbcPxJcOSWOyiMQirkjgUAO8ITBXMs8AGAvkul2C9+gayGCyIHGECyJsJRb3odSsqIF2yws6aXxSXQ3UDdCZmFjP6wPra2yMCws9zjuyOMw7A+sjnAMJgAgwkMMxczGNTPGATItUT2zqIp0FOQish5hKzrAC-FaoXwGAHGBpuR7P2oOcJJ0gcBEF8EBzgcvwm-jsYmjI+z-qXHJESIAAbA+sic+7LJyMc5HCOxKcm6CmgaQWnOcAXwT6FGBPoZWEpz8tUHP0RJAS0OtDHU8oFLTeM-9OrTAMw9NR8RMmADEzzgLiOPoc1STLkyL0hTNvSMMlSLqyFkpyLoAZI9dOLTO07dL4yAMg9OyQcYmvilz1sysC4jLvDrzw93NJqNBSgE5XLnTVcvECeJOI7iOBTxsjz0TID1QXL-Td0kXMNyhMiXNNyZcwzQSlKwGsEH0s3WBR4AG04LJzhUpX7KAzTeDIGSyiKXXILMYYnSDhiLkjens8WwKom-9jiQ7A6B50G7Bc9hyWEljEogJNl9pnANFmF4t6NFgxYzIGjHvFEVF3Itzo1EJNkzFuSDNQYxlXcMryTaDPMbRYY36LR8sIDVhxz2s-PHlTEsuSBuVB8+XibzvqVrmbgEsrCE5pQQNfNny8eRfJ6jK8yfOjCd8ieM-JQEdfLnz+8-fOUyh87cxHyhrH6PhiJ8kkUJyYyJdNeJDuV9M-z2uQnhJA+81VEmymzAfIPz5ebTC+is88fPPovqHHJQ8niOeVJYA0HjN9z+M0XKNzhMk3N59zgM8EkztaLxmmT-MpXMCyEonDOmtY8rAqcTAA44jvoL8TRHvhOgS6NiAyCyDSXV+IM9nUzCue5LGz6AMtzzSlwkgovBH7MWFZBhAf1TPA4SH3J3SUCgPPFyMC8TNhCo8wmTwKIGSrJ3xqssrK4K4Mu9OlzjiP5ToKBSBXloK8IZ+j5S+0jDO0KYEsFHvReCjXI0LTgSAA4LU85dLtA6AawtGjes3kKuc5MlEHEARCm6J+VxC39MkKDcwTJkLRMzArPAwgHAsIwdaM5IgzACzQrMKJjPKPUKWo7OM4LUiigCtj60+DNjjki8HIVUFA6vjIKki4oAoK9CqHxoLqfYKAYLsirQpKLvIiwscKVMwQu8LfC5VX8LdcstKCL-ckIuNywimvlOAoii7QBBNEWqIIKqstIqaK+soLLMBw4K3DKKjCiopNBDCkOhqKY8+DNmKDteYsaLiCsaN5CWi5IB8LRC2CE6Khcv3P7SbMQxPMBxAIYvqIaAKokQ8Xks6g-IHc74GuK0pRWFnSFikOiWKHPSguMKEix3PeLggT4tHUWClIvSiBc4QKKtWi44smSJAmTMyYwhaLGIS4sFYMSw1gihPSxe+AG0YKNiu5S2LHEoLyc9ASuQuJLarILNyKzYp0FxLaiswuYKlQKSDEdmSsInj5DAsIioKufarzpK50z5RDVBQIKFN4Zigkogh5itLAFKMU-nzCJdo3GD58XsE0BA4cYC0Huj-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-R-2qtpmYpuSQG3aB2pIAEA2OxaVg7a2sTu+po2qkxmYfLGoAGAXOjNvM6QO8ztzBlumZkS71gfjrM6huzdsPRmWmZmmwpUUDtubXwXwEYQsEfhJRbVmEbs8NDOVzusB4ARTpDbvgqaFo6N7ZtBgBdQRbrHa5O9QCjaJ218D0lfIzPTftNuztsK6Zwkrt4Ywu4Hs8iFgCQE6tpO+Hqo66OlHDR6LOhTTIgowWrXS7OrS4ExblYaMCngJ5E8B+an2uwpC7FOnyyPAK5TdviIzAQLosA1MtLpfBRgNkB3bvYcwBfa-IfWAm7FO8uXXbue4QCR7GWpAA87wwxYGQAaOzFpmBb5RaWM6-QXNorSx20QHgAXmjHqrxy2mlu9hkXEJua6LAXUDNa6OsQHgQ1uobswQtemZijA0IRtGM7hEWoDt7EUflpkA2AIWDYAUpToHo6QO5EFJUFgOdlfB1opICPaUVSHpyVLgF7HLlMEZdpxDNwawERQr2m9s-b0O4PsLwFu0EyCgdmk3ht6XwZ5tObDHID14rlGhaH6SIARure4GsziUNJMmmAAkBTe2ltxkO6d1rrTJy0vuxh3GyepSzp61RoRMYAPUARbjEQfu28dxeBIvg9PKvqXy4yNxp9bKWDpiMh9eyMM-AtwkzIiRLO2zMPh8gFfq27HM2nFaZ0rMxqaySgRLKUbE3Tvp9amiqoRQRPwfqDicr+6erEa10p4qDxN04ppPlOACzo-6IIT6Huh+mg4mKaLgCOH4SG03-r56hQgAddqi+8lFn7+IGstGyMhYeB2bhm3BFGaJAfFDLt7o4pstDCm18A7o6ALVqoUsB1ZvEBfu7trIHZqy3OIHmcGhOjsYA8v03iZnSIIUSKyPePr8D4jAJ0M-49Z3PM0gv3UTlCA7IIvgLDAoPH9H4k52fjigmgKY1PzMoJLMKgy5TYDR-WoOKl6g21EaDZDCoBaCkkFeIQZOg5l26C-1F2zcoXwabFGAZAfWDUTdE8+omDiIsaEqxpsabEeyXPawdjxjkkkW3gboewemwQW-6hWloS+Kj20RS+EpGKVRJiv5TlXRNUxqyqk6rfSNk0wfMHLBmmtQyz6twcoFrg2OtnsvykUIGBvB6bCiibQMVGkBkihAacKihmIwfSPGqLM3JIh8a0JwHBpwbOC9pdDEXdFYf5Pfh6hnwafKBzIj3ciAWnIZOgGhi+yVSVU+evKqdSUOp2BoI6pgWM2UnZLmtzG8vBApHQu5KqHz6qDKf0ISlTLjJzys9i+YvYUYH1hLB2DhtA56xZPGHC0-uvmSvXTSXJIE1CB3q4ecq0Ii1oc7LOCBOo1wqJi08qUImN4208E+H38vrNodis0I2sAAR6vp+GyvKM3BGZaeQFHp5eMGKHUuspIDJZ4sBPMYBgwpPKyh9NCnGH6bslVWxGwwYeFtDA45EZzCnogdWBGoc0Eevh4eZL2jjCw14cW9Oop9ocHfBsWrvRpANodxBtEx9OqHrY77MTzQugHMpxscjpn4jUHKkZOyYcl0XTDcR4zVuy3wSQFJy-BqnPeyPrAEE9gEcpHNVGboLHI1G1RlUb8JEOJnOpyCc40YxyWctnI1GlMe+AtDnhgsNAc0ciI2saLYj3M-Ttc5Nlgr+FF11jDvRpLXgqawsdFji-houCjiKR1NVjiozIhuWjO4kDlQjhAYQE+gclLCLSpEx5MYDSFhmIf7QYRARClVu+jIv6zCClQq+kIUuhiTGclTMazjJSjxrzjZ0Q6AVTRFC5MQJRGak0hT5hn3AuTDBCaLwdFQQGpA48uArhOH9kklIuGyUuKugzn+p-UEhcoisafK-knkZ4r+UgNM5TrfHxGXiEHegbCDK-ePxUNa-Xc1iCOBrQyw1Vnbgbb845S80viCA3ZzMMcgu+LEH8glJX7hXzaoNfjZB4pRYDFBqoI4CsE1QZwTeAzf3wTWoZaCECAHWhP0HGEg-WdtD+-oJkAGhqwdGCbBjwY6G6EYnHZyQc1wb1B3Bt0dXMcAEMEeHecqhV6wCJ54YoA8sergZcIWigCWp6uYjIhb6PSPF9JM4q3OiKlC8IYuC0bLMbGHYhs-KJSe2+CeSHT6yLPWH+65hrjqMQgYdQmhE0CrpDq+ACJKH0ilyIwo2xh5M4nF9V8Ckn0J5KPMblwkSYyGso8SeyHguR4IGApJ3AEXdhhop3bqcxvsKmHKmGYa2T5hsmvOGTq5YaXH70goLWG0hpsaFKCxpSbRgdh9ob2GlmEAEEAi4UyNOH+WQBJSH8s9CgCnY5fSH0mIKz8oBaEcKqNAivXd4DMmZJ64eftVS+4ZyU7Su4nF9rs2VVjp-qVwEFGMRv7IgASJ60L8Ijpe4hoAmRnLPxwYR2KbHIsIKMeQZ2p9ws6n+QTrLtiOCokaf6AsksaTJHR2sLPB6wmka2HRyZSaDGbY16PLVsw5dFbUpR14cGZnuRaayzmRz2NbDfRoMfdGpx8dA3S4xrGKEt+4p2I2jP8PT0lHIc6UdpGqMsSYEVAxr9Ohp1QcMbjzdp1qc1Mvpib1qyYxzCuTi1orDLp0axyeukZ84y4YUqi0gtE5tHJ6FN9QuxmGp5rex86e7je4jgvYnsxmdEbGJxuIvlTLhh4CEtBJjyd6scdf1I7Gn2NcfQANxugdCD-ExgYiDEA3xX3iLylQePMW-M8ZwCO-PAKvHlMLINvHhB3ILj1jnVJSKDqA8xNKCPx382nBgkJQbOdOZ7gP-GGgwCaBUMSB+leBQJ2gY6Dvg8XVGUeglgbdce4NFM4ATlDCcQm3B2wdXNwQVqlap8sCgG7IKAAbBdnkyI7CCgjpfrDyx+IVqn2o8J2iYoyqFH2gomg5hidoZmJuz1YmRijYMRnqEZyZfScI7sjsjLYM2YtntJqfuEnvJpKbmzDJ-oeMnsQsaAGhzJ6QAKGx4vgr2LwfLYb6zopoSb6nJpxULuH5AB4eqpISG6CeGaWqqcxHQwwkfYzZaDBwJHkADGjazjoROjxItgB6deGiphulmpTOWrN6nbClqfeHPYhecLHER5aZgNjM4eA4qA4yeZpGc55NIWzLJcKJA9XgGrgfdpIFACLmS5ypHlCA4obNxtzce6emmQRxsLpHwBBkYHUfp5efxwSRQAWAFq2L6mjr6fEkb3m3556cyHJo+8GhoEvW0O-nhsssP+mY4wGfoak4g6b9cjplSarGsdYGsKG0qANMKLlUnsKWTJhl6d5rIZusb9bT66Stjw5Kg7leU6Z3WdXjenO6xzcnHI3RGdbwdWeDSGBuDRZmfFfXQWc4gzgY90eZjZz5n0g-AMFnr4+83rQ3x8WefHJZ18ekHLnJBLkH7nOijQSiPcZKRJvnaYJFKUjRWeX9fxtf1Vn1B7ha0GdZtoL0cIJz2A7mUTAIcYmghlFVVq7ihEo1rkSz7zRLjS3vkfrduCes-n-Q9Ee7mLASUs0D1KOwBrYGIfqJjxZKw1ANMf-QZnG91psBdKz4eGSV5BUaiMeLVUlmHPSXBzRWN75bQ+UYHnhoTAGmHYI3eZfnqRhhxQjpmVjPxjxbWWkltiYXH3vgZbf4mkdAAohmACds8WTrA5iPKiRt+xrGM4yIGOSAEd6qR7EWw2ly6sBJ--Xh3vhAIYnwsKjbDUKmWJ+TCBGXMZocdPF-OJ-kOE0pk+dAiLuPYy8y8aRRS0HzYCpbkmUl6pcem6l1aBGgwWPklGwuYVpf0C2SzpfCF74In16WjpfpdwA5iL+m2Xz2fLBeX+q6vH-J14WZcxT9C--0F974YSBWXAVtZZwo7yYZbZr4x6Zlozxl0bBaWdwWFddrqSf-xA574IGP+XVl4Fa7JNljGfPYGl15fW4eQmFf0DH2ElYvwfF++GvgUV2yGpXeorZaxWRSGkyxnm1M8QOXAuF8COWtwCKMpD8gM5drpLlsaiXiaEwmxgDOk-caFdTG4y04XnZfgPRNeF8IN3Gd4rpJrlDxjmZMXEgpVJSCLxzv1HjpF2JV799ne8bICFFwzEkGpZh8aud1Fu+00X5Zsxp0W4jRciYmDFh+HhkMEmoItWSpR2RZcNBlcwISN5IhJAnyjMCZYdbFlbCDmqqFVZwc01yiYcXkEzwnRYgC+NlwgVAKKmwYQwNFndk3sZMl39LEqObVrDMYkBYhvFoeufnjszac8JsBSGupRK6JlZ+x14PPliyL2MOY5HAlyiIKnCFnGCRJqSQdYvxFSwwGVLMAEgXukkEVPmYhvqAeiTZJOLkk1AgKUGBWqHWPIWixX6H1oPXhIamOMF2kBujagr+CTBxg2VhoFnWjSs4lkczQSQCXXDAd6mQAAAPU7xjiA9aD574dddBB5HQvmiwgtPiWpq4ylBGUoSKRUiOpGxKDYOoSKJGleB+ks9b4ksoIMB8F5agNdcXRy0VS1nxVSSJNofq6lCErOOIaXCXnWKJZ3CaFuJe1R6Fvqv6Y+1u8nXhMISUtvpDVLWZxgBQRkjhAfW1+i+AK8jAANS6eFKAFyNx1VcZm1zPhaNXjZ3w1Q0DzTQyb9j40815m+BjIOvGhZx1bvG5FlResNxBiWfdXlF6WboDuAPywCs8rBTcyk5Z-8x4A1WtzBLrw4BSeLKvhJ9xxiigSZuRQSTKcnq8mG7QflrirDj0LTf4FZPchPN43imak0vBUsdwKngEi3vN8a3chxQILoMwAADX1gdYHy0g1xARIG1cQMWIFS2Y7Y90ndjHRbiCIVAReRhRGANQh5hit5JCSBEgd6TOBGAANM9gfYd41PAgwJ-KlgwDCsES3ot0jw5tG5VSxmU4oBrcczqcMrb28FzM6xjB5eU7zzmUTCtwm2guw5QJQQImbdzcJDQbZ82iRm3zW3qtOYCZsfLZWDGgUxuKDVauGuMga2YwP-F5jBPPPFi3Zgx+z22BEBYwwMXp58PLkaLDgADguAZAEL1sW2OUs3ArcS1i3FFeLZFBhMrzaG2sdI7Yy2stnLe8B8t0Nsnkit9baQBStmCd29c3AhI8XRbXvnpAGtnDA7pLJLFgmXokErHeWrobgFJ2dIcnZjAlOc2AkxsGEnfW2yd1ranbC4ETWp214RbDSSw1IArlsS11iD58faqmLpFfa7qgvw4AC6u35++LmrzQzQQCCw2gwbNm-V+IPPgTYrmEI2NYxQMaAfkB6Khnk1B4THTmUPCKZE5sltpp1x9LdoAnHxK4laqrKnwtxwG3YdqLf222lRfCd2WZIyDo8WVC3EXtVt8lEm2IAHXyL8XG+txMghXW3cj2qFHmHoiOie9xldBmZ3fji0XZNyO3DlOHW22G3TVz6G81plHMVs9sPax2OtTdmqNcd22Vm3dtz3aS27tUPZS2sdk7c9hs25WDKbIjPgASwFplvfXAudine5GCcBBGmheXTL3CWpCOoiyqXNyUJjRhd8vfXAxYNHdJV2tntuN6x2wOKUB7+7VM0YZmIMEMbbtrHfXDc9MUH1htFYfa1GqwXMGaNcgDoHuYxYJQHFAgwc6z4AgwNbAPsTfRfY1iEkR7fDmqKHDxYmz0N7Yb34d-TVk9zcYrZQ9NtqL3fcOTSg2MVM-Mxvm2Wmb1LtxMbUDX4MnFHpym1tx+AO3ibNlAJTA0A13QSC1N7APEXNNqRaTkdNm+JEHtMPINdXc5b8YcM8gq5ygDF3azZQSEwP8w9aAIpzZWxEcWP02x2pHbGQB4rRIDkiBEDInOxF3SQ+oRidQUMnbqCN5kpwYwVxRTqKoyLDy7xDuQ-gj1jaVagVc06vge5LKhgxaHS5liOc2DtVzaTZ7qCgFqrOR1+le4YpfRFUZ72FXWcByhyvtcOzGYREoBREGAGEAYpF8E8OLD5w+G5fDmZmkQwgYI8+lQjuQUEDk13f2C3CnbRf0Pwtmp2YsB5UbbBsvK9i2iQJD+CMYsku9Sfcp4Iw5Rx2+gvHYL3uNe8T1c55f7Fp3-gAqoPA+9HDAK4DlD7mbMRiMVxLs8HC3Y3AjrIAxtxF8XVX92SQWLei8RtbRxUnLNKzNT2j0ao9r3GtTV1MOQqCY55gSdd3eAL2NEJDgOl9WY-KO5I3Pem2a9lyjj3D5jyJbdcLTcnmPI9-Pdj3G3M7wEAwey3KT3e6lPanCBzGBZZlOFLPeb3ICK33-3g95xtWPaKmNTMac1Uo4R3AAyfd33p9rStn2IgWGalhJipw58PPpKECgR4CKqjuOB930k8scsPdye2QyQA-rXf3V+2Ys7tOxFe0iqCA+OP8EaA6r3YDda180ftfzWagJnXfxwxqDLVeqdxPBbYBToajA-HMsDyDUD9HxmHdm5Hgv2MKd-tSFBuY-q6MerV+IrQGVOz5VU8xrdpgopWNDhAYbFhjNWwHekwIa0Fs1-wp4HbaL0WOPXA75kdCVPAZ2su0BAZ7mpwwJjRKH54KQaME4Bmt909L0SLBhC93XsPI9gwHTqEbPkslrZA1ODAbmt6bF3QFCsAP5d4z4AO6FZnWAgOicGmtY0QM8b3BRPzMPN0B6QAF6CXOAEVhNwDM-lBSCvtGVhxQIFE5SEUJFBzP4drCtQoAzlrVzPFToQGjPFAL6fVPas8bTyACgIoAiAMUVyJ0Y4z6QATPCVBkxTPSXQuwrPHeExVb8cYF8DVAxNDHzGIg4Y23zAYAF4HvletjOHNx75HwBgBYYPKLqAdzy2H+B1zunyYEyI-Kp1Ob+jDkvJsAHc8vP2iG89-gra185gA3z3c76Boyps-JGekNs692Lz384guXgYRCDOfcRs-bOpm8C7-OXgUdCAuBSP853OXgGMFDk6AVC9OJ0L-89qATypKxsrELyC76BjzrwBIv8Lvc68ATzwBjgJaLvwCDhSLnc+7DoLpLbnIGgdi+i2O8QC-gvt0H8-wusLpABwv+LwwG4ui4O87+J8L1i-vRcLg6iDxhLmsCAu6gHZX0L1QSM92mGgC0DUQaOF8AovTzoOHBADLq3DJ8h+bUCRRRgRi5gAg2icng3Qj-ujkv+LzCmvPl4Wy5QR7LsANM5CtZS+cvVLs4g7wXwMoHwuJL82OkuIL1i5VB-9A88AgYCHfZDkmRlJylC+Lfiv4E8FOGAkvMAWWHivQamkdsAb+6Lmsuc8TiH3OMfJ0CIveoYq8Dhl4GK4R8ZLs8B8vRLmC6B2xLqS5YuILlC7EunaRS8auVLl8CqI1QdS86rs6hh2OiVd3S5BJ9L6y9hhjLoq9HwzL5zyMuKrxgCtw4nfHiZj7zza-VB6uRRRv6vLzq692XL--XBBlrz6s2uoER87Mg9rquiUumr7zcRB+r5BD8OxL3i9AvvN9q53PTrxfA8C8afEVQBMrquhyum60a5Sd2rsoEevW-CH0fpNLpke0uzQCa8CvgMJcusv3LxoGuvNzty6+u28Kn0euaOf4KRv5L0K7av8Loj3-04jnfBMvkq0i+CuILq-iwASb4JCgR4gRIBcgoYLpjIw-zmm5pu6bv8+K5srZ-m5w0nfqFyBTgeU1gA55srz1I18azkRAdzsoH+DqTG08MAFznlwldXBcc9tbF3Ys-gAyz8QBVvTeJc7PGVztc5quNz6q6PpKCDC-IuvAGK9l5prsuWKBwLq8+iuMfO86BvLrxRU9Bxyem4gvP1T84zhvzn26QuALt6-h3HiUO5gB2rqC66ucGNS8BINLhBtGu4bhG7MYaL7wC8A4ney4FIIbgH0muuUWADABCgP0XJio7wjGkR7C1-k+gJiPC4iuCL4gBPTLPPSUL8EFMs9wQoqxgurPaz6XPaufq3BBrO6zlYEKAYwUu9qADL+i5hl7b5eBHuusOa5FPp71X1PBi7tC9rvk6wS9rueOBu8bQFgJu4u8W7vtBYB6rnc9CuVAPi7Au47nBkaAYbvK+TuQAya4MvM7lJ2zuHiya5pv8Lnm9ru-z4+5jQ4Ls++Z9obxO4W8b7p65mZ77uy8fvYL84Csv07my4fu9r-y4gY9LwoDL0d73vToBW7-mMuAG4eq9fva78YA4BIrf67EutT4gALui7jMU4gXb5-QPuP7iC7EB2Cyu+ruDqLRlIfJAJe+MFszYu4+vfbm0FCund8u9yMEAKu8LgWAc+8A5hrhK+vvxr2+8CvQHjy8fuvqoy+hPC71h6tEzL2WDoeK7wR6rB4Hu9cmuF7nCUd4lHsh9P4uHz+7EvECfh5zMtHwuFMeYAHB7fvzYLAFEf-7wBqTupH4B6mvoH2B-vOMbw6GsgWH4u7WueeDa7icH7na8woHL2WAkudH3O8Cv9Hpe47xonw+4guv7nAmSedztZNsf7HiC+yf3ztAGPuXzpx7-vL7gB5WggHvS7HujLym+xuzQfiFke0bsiOhpT7965zuSIPS9yeFARx+SeCbmO+ifnHkp9cfAH9x70ukbqB5PPUbzy8MB6n+y-ge8b3u8kB+76XKaBMH2x8yfsH-C4qA8HxdzBAAn8h-NvggW26dBqnrAhnuYAGK9lva70m7LkYpVAGOekgC57lu-z9+7-Oe4Jm4SB54Nm-aQObnJ8efOn1aCDvINILoJpzxOGGDautIW4FARbm4DU1KoiYylvn9GW-Av5bxW-dPlb-jE9hx9g9X8k21ReUz1fTsrxD9FEx8OZvgkbmsqfl4Jzed3z8w3jJuojv+RBq4gd59Zv3NWk7c0iPcl6Po4EUfZ3AUBA9WvYYIoNFxw6Tx8I5eEGSrdgIJ76B+5wKgPzUFe2+97knvOXm595e1x7F4BUdO4oAVRCnexA5nRX7i0KOJbQbEWwGLqV4duZ47+8gfrLppfmwjX7mEGe5jdk4FfXKE17ovV3BmwsvLX6B4FKotFhcEXnvU9wXMdV6QzGd9VvA63jq-NmfYHzVkRdPHo5M+JtX+Zu1ZoOZFvv302zNx8cj0lFjJQM2H498eSpXvOig0URi9PW6m1Q76pGuFvPCCd8HvDCyDWITQF0PN3jQuE-q4VoyGEgnSgzHuqkPXqG7PFUPeyrB3SqbyjNO9XKzNifr74Ba0-gGjYxpoaeByuNe3r6dLesWD+dyvRrmTTNeyac7g3faxUp5sA1vT6V7eM5wGdZSdIVF-W4SAB6oWiZvd3x7f+z3d9tRp3+kdXeFvdSPiAWrJZybebLuAGxPp36YyZG-3vK7jI33sz1-L9JUQMz0oSe73hQDok1gKkrAWAAuukABQELgxTVZkLsNZ2oAiwUSkCaD5Mdfo1cNRvUU1sWB6IES0gRvBAE63kPouEkQhEERHyByPyj7XQgV9KYItVTf6DfB+MJ6Gjg5gfqCuYXccEHj4BgqsyQzrmy7nA+1MmnDCOOPk+C4+1IcXf4-BPysz8jy26oBE+8W76DFAEjrko4sJfFUig-ITHtzzziZQnaITYsKonZ2FX01+XgXqK5jRQHoPgClBHp21H4dssRbE6xVZIa+WqZHWMt6X6y4jSuYbjR6bcrrbU2EaX1uQR2NeiDYIDyj-RizwhMMdO7yVueIBdLq93T1L4JfpNZJLx8neJEiF3gE7ZnCFYwP5bzOJMfah8SxHk0EF8yvq6vBAf1QPRJ8q6eDZ-Ud4XT9mJFPAQD5N+T4vp4BgP6BDTakAeD4fkzE1r7zwdTfY2KMuvj96o-9fQ71iMV3wd6vflVzp3A1unNVdYXbPJA+1Xo1rhbwTQ3pmbk2EAgRZ3M2Bs1eU3lZ8g7EXeBi+KTfBB4We8lnVxg7viJBlg7H8yAr1dln5-Xw0ve4415wkeQb0Vx9IITQNcB+kTBt-yICP-aLxhyPnFAh-DkEhBELDii6--e-DcM4UA4yI1pY8MxMw-Lgybsd5R+h3s+WhpkyeZ-fLGC7RUSgEkEH+g+L-NeRiQe82qSsXyP3UzoSDZwwZY+5IQQ4-2NsOEO4-7Ycj-JKzg-n6dBy0sIDoQi9RgHI-Pwd4Ch+Ifxxdgogf-Dbor5kuypuwUv0D7h-Rf8X-I+oEOyvR-xfhJ6iA4oDH6XvIzuyomOSfsir7RYEMAEy6pbMJ1hqO4gJfB+3DDX69hszP6qtx5eYHwtEoPXH79isJY36tEC+FuIFwDX5pdtfiYOuOSmETfT7zW1f2H5iOxfvPW1-OsAYAoeMaoor7Q8QLl8WxEpo3-1+MxcmlJPNkdr95MOPDRVuTyf4v5jgxvq4wm-NvgU+d-EAV3-d+JjT39DMK3laFXMgkzWbpIzRWplhhDkF5FuR3kTHKSAZzz4yUg0wG0pgB2OzPSIAUkVAH+DxAWPH+DTYYeG8fbETOpqTM6N4zSlPjBRlEonx5ADoQbgKCDhhMdMzyHUIzFJCc3KkRzcN-E2Z+Und6QNKVR8z5Xalf-ggd-7PosIcRGmQ+kCtdakIsgR3NwA1WjyJ6TMmcD-jwZGFst9JzNgd4ZMTgjCn8gOvINwS3nJpfvlOoFgNAAWLOhh-ehnZGzO4kTAAyB15lEkntEVV84FWASASNkSQD3U28NRYBoitY27NXgaduvAZoNRY6AIUYc8hfdIbrHJRwNJ8JwLJ8xDqAFxwuCU7gPLIJuH-h93L6t09Lc5EoE+5pEO+8FASawGQFWATwGB1yYsAZGWtGBAdmYcLuAQCTKgt9ggIEZUZpWYoAAyAZwux4zDmYCUFBVJqDE+5kcAv8EauVRc9NUAFAAyBgovNxxMOzMzvoxFSfmDIbmmcBDAZwBKAG5kogK4hSxF2sBsJdk4COuFEUE3IEkOCBSxMmRgcDECOjITYvEt4Da5L4Z4UrdNlbhstLoFhB4BpMcw1L24aQH+YDSKF8zxjoUdbEnAXalxsNZFrMQADrJ6ys19wgR5obnrqRtgPiosgZ3AhtGd8OfEwxEgcmQRgVzIu1vbQF5Eq1DAbzkugBLcpvAQCtws1M8rosD4XlLAVgbHFOAFlBwQJMtZaNMtuYBWt6aPGgw-pdh14AcDPyIaQsAgsQMFOnoW4G3BHeMMC3ZkFBWAe1gPlMhke4ieMHgQRIngQLs9oF2EFiD1QS3vDVrXg1R14L-ldUCfQ7gaTxPgdECKAM8DfgdjwoAKLB4+NCCIcLCCfgdNBXgWhV3gceYUQS7NvgTVgXgZcDHMOrQCNu9UZ0E5sXMBABPAVvQWeGjZqQSVA6KN2AG-NJUmAdjAPAfrNTeDxY2SK4DkGB4CyojpEEsO5ByFIKA8YGiVRQfYkp1IiCZuD1gAcNzBoKL0CUwF9pzViQJtgdEgEsHjBJABcC7IH8B09NVsaKAyBesFwC6fAKCieLqAGQKf46UFyCNADIwsEIUAGQL913gCaDneG8Cc1BYDbWhQp-AbBhEULqBLQQxZE+MQQIICgoH0laCrKtShmQNYA6kDKDmjmCDhuDb9CUDG17QQNEowaCC7vBuokAHYA3QfYVPQSz8kACGBMwTionQa9wXQS58aQHCDiYL1htOESDO4NLh09LfICBsig8YOMBy3qhJ4+HjBiEiltEoKqCZsAUDFsOjRUMMcCQQb2D46By4EzBKBydl1JWNgSsBWNpxqTCUwfgDOFgQXsDiYPORqLCaxLQdEhoVotgKwbzYrXuF8ewdzB1qDsNcGuEDwQK7NG6GRM0gfWkJAJSxq8JqF14H2DfNMuBcYIKBlmMP11mN41b2BBwPwUOwR2B+C-mGJs9zoYBicJGBmmJWBC4CMo2CseM1wBn5d4uno-AZgCn6i6METsigWaE8QYIewtPKpvA2Kmd86LB7IBrqJ5HivylOotRgQApBBoILHITkL-pLoOdB14CchdsmC1Wam7Es4Bf0yIQsB+II3U+iKxCoQJeCsISxCGIUCl6QG-57fugxvWlxCjAqf4mGpRDh4BqEV5h14GXmqlzcIxFhHAUs0ILrpCIXMR2tvoF6QCjBEpGadggHuIafPOldIVCgEGPrtiWEbt3xKJMp9u3hFIRUcgiEUQ+ZLHMk0J7Fh9iwVCFs2AKIdi5NwFaAbQDoJtJvIgISMKBP4rdI2kDgA6Cv2NcFnJMXIUhA3ISrgUvqBZiIcBYMwq5C36Fl8o-OBAwWrBBuSAdRU6Bn9mhiT4DSL35kLrMDT-HaVF4lfxiobcNSob61B4OEtndrPETjkEQsJNVVPCmIZWIYqhqWn6VtIWKBTwHpC+ADCB2KJ1C5pN1DjIbZp+oUIQjIb1CTIYg4ZmC60+AG61Ccu1CH6twAJIQMtT-CJDhTpox4aBOR6oagJEmEhYPhsd8WpCRt6SOiBcTtuZfhCLpsGOlCx0JlClsK2M9dDwCzxprRzzGUofEnCBv3ttF4Zhj4g8B04HuEHhsoTctmIBDVK+MFNAWBa0L5hswr1CJtTYG8k7oLFIvmAwFDwAv8-2EbYkYYXdb-rUxdJm4Ne6B0AkPu8lqGKZx7Jv5oXmFMwlmGmc1mHjEBPvxB0QNjCsJmGxPQCLR+fHTE-Qa+DVmOsw6Vl8xtOoP0wWNTCRIHTCMFAzCsGBEgRsCzDoPhX1g9Jk8VYi+BJATUArPLzDv3vzC16IPB7oqCsvmA1g8sFTDFYVjD0VsuQ1YUswCYFrCaYXytK8vrDAWMNBuyEbClYY5QaVm8QpYahFhoKTkFYcbDMyM0VBVtLDHYf1gzQBFM0AFlRtYdlBXYX1kCvkWJiuNXhn+CIVc9J4AD4FPBXrGKAjINZh8FAF59GA6A2emRALAAMBbrPcAigEEA7xO7DUImaZEYH0A2fAaE3BmuQiIHzD1uCc1UAJgVlXh4N4sPElIQmRNOJPXD3DqgBxgejAzYXdlPYgyAUYFbCdYVnMsJpQJtloOM+4nssSuHqJDlgdolssNhyIRRo4nKTCJNi8BhmNj4BwO9xF8ADCb4gV9ZJOiAJ4sQMBQClBCsFM8wIdWAEkCwR2xnJF0IQG8uUGVkn0sU9LYIfUGIhUd5EKUlWTKeYqCg0AOhH8UoADrIgNhpdOIJ7Q22D7RNWDFMb8gdwe+JP08wvwUMsKpweofABpoQ2pVgewAvEOxknAavMfsKpZ8mJuAsoKwAqwFsCX+JVhFYO+CZmIrACEQ9lmugQjesJO0xoDrB+2s11RgNQjJ2sC0mEJO0pgKMBIIs11Exl3sX+EC0QWs10NYEQiX+BrAyEcQiNYJQi+EcrAPsnQiNYJO1lYOlsuEYrBRgDrB5YJO0DhpYNmuvrAvYDrBJ2pVgpgFojmukbBeEcQjfAFMA1EcQi9YJ9BJ2kwhlYMojmujrAxoBYjmugcMHEcQjpsDrB5EYbBLtsQj9YKMBRgCojRgFMAWETIBfEXwiBoLQjiEaMA6EM4iX+DIAkxowjhAMEjwkdNgokYrAclEojJ2jkojYOkjzBukjgWjki9EcQiclIrBs2pO1ExuzkOEfQiSkf4jKkfIiclGNB5EZVhDYJO1zBjYjiETIBakSUjKsAAAtSdrywTWAqI-WABI8pHCI7hGjAEFpBQNVp4IuhCqI-hJTIqpEaTehFODeZE5NGZH0I9hEzMOhDmDNZEvgOhBTAMaAtI7ZFTAUJEOXZ+TRQuYCbAtDS4IscAQwurjmqaqGY5MYK04CgATI9RDIuNBozMCmHrMHeCKwdLY-I7BFnzNjQ3IrwhXNPFrrAerjcwo7p3I8FGPIk-4-I9LZ-I65F6gVEbuZSswgopABgoh5EOHXQKPDN8HQogaDCANxHwo8+aAo+LDG9DGFvIoFEQFVFG1TGZhQozFGvI9FGGhaFGqI-WCEogFGIo81TowlGFIo4FGBA6lH3IxlF0oizgMon5o7wMaBTASrBewVlG1cdlFeEFKTHgbFHswoRSeIPHKjQDHSUo3lHCokfr9ABaD1cWWGJtHeADQabAtzJlSTAYIAKo3IBEInSFTQsaG6onTT6o4eAaInJSVYP5F3IvVFWeHeBTAOCZE4P5FVcM1HvInFGCot5Eywu1Huo4eAd7UYC+AKVEXzJFFyooNEfIrpSLuTqGaoo7o8o+UDJojHQ6omZhuo6FFTAL2DGwF1FYolVEDYb2Eeo-xEsoq5HR4SQDmoymEUAF2Lso4nKqomgDsFP1ENo4tHQosaAGIn1GmovgDVoohGPoWzTjASIb1cDWERNXpADomK7Don7BUKSziuaXlHVYZUC2ojrT2oigCd7A4Z-IsByToxtHao7GCLouWHQorLYEosFARxS7oI5eggUdGkzSuLaCbo-LA7KQ1Ano4RAngRICmWK9Eqoy2H5MJEwkdbC6cAe9Fnop9GXo3qCbot9E3iTgBmdPgByVIYyF2TdF-MCeZngUDHn7NCCfokS6cADwxQYjNE7orNEho6FHCAJWCSo-KbyAVDFqAZvruGTNHBopdGhoigDYYw9E4ABFG6gJFGcolJBIojdEqo6DEuAJD4KmZVENoljGpo0FE0ojFHboogC7o5dFhdInBjQfrB-Iq1FwI2Dppo-1GKo+gAkY7NE7wZWAJ6AaBiYi2DJnVM6F2djrsAH6AEY5wqjQyEF8o+NFyY9DGkYvdE7wGQBE4GQCRoscDSAMgzXozWG1or3b2YnZTqZKXzwxOzHMYlzF7AHSAyAJzGeY-kD0EOgBseCCA6wHWC6YoIAIKYLE6wGQDhYwLHBYmQAxY-zG4AOLGjqPhC6Y8uApScUDRY9LFR4OADigNLGeY8zG+AQ1F-I+8KAYyRG4Ab0G6Y5lRFoh7I7wHWCVYT6BMIcTGwIvqH1cdeY9w4dLPItmEWotDECYjDFkYnNFsI4QDrootTpYq0SCY8jGDQYQCawKNHEovUikorlG3IwtH8okVHDwCJFs5ObEyotLC56ADEyY3rFpYRVrNME5r1cLbzeXNCAtoqFE7wVRGJY6jFEo7bHgkXbFxogNEtQIzgI4eABVo1WIZmJtGngaE7iIXtFUKXHSaaTyy6YmMAXYntG8YgVHIo0T48Y1bFaozBAm9c-byo-bE1ovUgIAE3qTY6FEGI27FdYbtEA4-JhJATqx0MJHqbsT7GcYvrGY4neDZtOCaFTMcC+oiHE9Y1HHkKTwA+FEnGkuXTGswSnHDwYQCVYbNqfQP5HM44Qps4snGGwqULG8ddopAINEKY7nHKwZWDNYl5FCo2rHto4QDiov5GswIdFK44zFEACdGa4y+CCAENTOYmDFBxQebk4rXFc4igA6I+URbY2jHLY+lGQ4tbEUACzEXbP5GNobsALtJmS6Y7-gc4+TGYYxTHKYsaAu4ugBu484BMyBTRngb3EmY6XE7wIaF-IkhGEI+riC4lf5aouPGqY+HL5AIPrIAOPHETGlE2-OloZ4xWDUI6zEGICprhNCgAKI6hH1cG4DG8AnQrtSpo3yelpl4phH1cUAZ-9IUIBWNhGnYrgA-9VvFUKRWCcIsFFJAYQC549PGnNPvHAteriVYHhG94-hEUTKBTpNMvFCI0OaVNaprz4zPGiI+rjYXayTT4iRH1cRQF6QzXL7NBREawSvETNGvFz43AaZ42RGKwR4bjNXhir4hRFKIk-HV4jrSSAHWC34yxgX4xWCqIjfG2tabj9NRWAaIsLHRHQXqhhL2DIgE+RngCeS94y3GTopFyaaTNT6SSc734ztEzMCGEIKYlC944xHlo+HJEY3vHmIx4Zr4XvFWI+WCTomU6SAJhDQQPAn2I7FF6gMlG94pxEJ4k8A29RWCuI6-F3ZVoZIQXvEeI3fEcdIgDD7Lgk+I3fFv8YdJf4-xE-4zlpe7afFBI+riCtK4AIKVNLxHBfGhImQk2-X3BOdXvEbY9rGLuNjD-4mJH84lVFrtJraNoRAA+OeUAg0Y8C94mJGjATdGGEmAByANwymE9YA6EtvGjAJJFP4n4KFAeKydQ3vGpIkgmsuNIzf4PJRpGHwlGwerg0YklQ+E8wbuEgnSJAd+QxgCIll4nJTj4g5qFaNlp6gBImZ4pIlAEizxxE+0yj4wpHZtZvEL-H4K6gDIl94mbFhE8+YIKOhChwXvHxIgPEzMMJoiAECKjAGFr-4+JFTAGQlI4eNTRfFoltEtvHxItglp41BrlyKBStE-BC942FG0TdQ487aZp4ow9HLMd-GW5MVESon-HrhN1qwgo1G04wQ5wAbVyVYVrHTQqhSOo51HpdJ1EHEsaFUKZlE-4o+RVSKhSzI7AmbNYICWMQoDzootTndE-4HDTomzQxZpe7V4kJOd4kbIl4KV4wIB34woDkfeKwMISgCLyBtoUAQEmJY-S4gk54mSAFfHnASEnQk05qAkkbEgPREk6dcj7WbNEkowu4mbI4ElQoJEkznKwB2E4wnaAbGDygV8LHgdEl3E3ZF+EgVrTQJmSMk5QnYk0kk6dRjqEoLgBOdAkkwkmFG-Ii9g97KhSeoyrDeo1lw8ghQBUKcNFF4h5rGAhZ7QATcAsgFZgIKG6FikvNFDEgLyhjMUllo+rh1oo7odoz6C4YgxAQ-YMKVmCkBl2VdHWE1AnCyYBTstNcFHE0LFDEgZHKwbNr1MAzH1MWZCsgMs7UoKhTYYr-Fgo7AFmAQzokdNB5EY4liW5SjFDEwrrQAIF55AZeRv43bGW5J3Gp4mlzHgMaBB493FvtFdHKY1PGMAcziynQuxUKCzFWYg0mdSPgCG9MLrFY6bAVkx4nt6M87FAKhQNYprGPDXIDidVhGJjGQlWiMXrxksMkRmMux4o2bFN9ftRjAEAADQGMBUKDbHKwSvHdopaR4dCgA3Y64loKJElUKbHGVEy0m8o2Uk04hPFfNcQD7E0aH9NHnF84sFHi4+QCS4gMmy4+XFj-BghUKMaAq4k4lmkhwmiFcyo+EupGnY77GZ4hpGzk2lraKDQkyAZklV4jwmSAWIlHNRgDywQlSWE2pH1kpFqx4E5qW5PvFdIs8kRAXvG9I+EkLAKCkW43RFYk4nJwEm9x9QKbxQEx3EiY7YkZkiX7ZkkPG5kvUT+4sIlFk4c4lksvFewAZHXElf5pnEtx940YCp4pokokoI59EiYll4+JGmk3pp-4kID8Ux6A5+UpiGAVspqAv-BnwgVLwRS+GC2a+E9ZZEK4wx8LrzRIDNGXqD8BOpKggTYKnIrqEHZdybrzFKGX9ZyH44LSmIoHSlyyGyBYQGBFHkiHE+kbSm4yWylhHJBC5wNBHj8DBEXoFyn8BP5GGop8mBUzxH+WfCbEIghFEI-yyp4lPG94xWDZ4-BFxU6fFhUwRHKwSKlTAaKlCI6fHxUgKzKwMRFr4w7D1cHKkVYr-HYE0QmmI75FDElWByIqgmFUuxHOI0QmFUpxG94ivHEIwvHT4homCIthGWEm8mKwJhGWE00lj4wxGKwXpGFU9Cnvkwqm1IrvYkI0qk-k6CmFUtpFjQLgmVUjxG946bCVU1gmYEr4kv8LAn0E+EmiEwZFr4ovEBWI5Fl40InEIgxF1E3CnlEspGZ41wmFU1wn1UvWC1UzJGCUp8lIU7pGJE5kkpItJFl4qxGFU4gkaEyqn0I-JHl4+6nSIsvGKI+6k-U26l7U5pGTEuFHEI2FF3EoEnrIhZHI0+Elwk5Gm4UzEl3E5in1ce4m40ramzIg6k7IovE7Ik6lCk-GlI07CnZEy3FrIjRFPk44nrkoMkSdUQnOk7IkHorvbCAFmm5RHDFUKAaALE+Ylc0hYkxky4mHDerjMo0skiY+rhO4zxFKYgaD1ceWmLUx3HKwSUk9tSzFhI8NH1cOUmXE-NEDdLUl6kramsIkxFUKWsky02smXEmQAdU40mGInWBtkmZitk5hGCUyqmDEuolbUzikHUvvEdUzinK0zPFewd2nMUz2nCAaKnxI4RF94galCU6FGaUxgB+UqqR-I8VG4Yu7Fsom3FeEJjENooDFEgDnHqo6TFw4lNE+4wbHXYiwZdoqwAM4ozHQ4qlH44-jFc4ySmeoICEk4XQbrgWSkJIExTAQhuks-BhLjbFwFYIBTaw2DSTZQc6GxgdcA3GCBy9YSoD9YdrYCrCmY7w13gOAGgTCOXXT7UPGAkAKH4k4MPG7cJGx90AUGsvMcB7yGaxPMTdYyvDk5uuDmqe5aTS5EYABkQYkaxAYek5KUenj0-Q4b0VOYj0rj4jBBgjIhFAS90HYA4wYCE3qUtj3qUfhzyFASNsb-LypdSmDXAtAwwm0TX5GcjuyaBlf0E2jX5OeSUCESHQIqoC-hNFEzMfrCxwMB439bBmNcTBEvw5BGJYXIA3ABZgoIn0F2leLBr4LKCv0IsiICMMDOAV+jSkJNiLUTGiv0CHA15Nhmngi4FI6YDR4wwqRV8cECnglIFLUIKBA4JagUAa2hibG8gqKGrbOxQuziBFL7+LbcxfAeAgbBQHyN0M4Ic2aaCQwJerPsTLTtcesoc4b0G2AUEBgAbgDyiabDawORERIN1RcQKEBA4EHLxkvK6lAIyB2M2HAwBfajCbVIaDw2SaewdLYio6fI3QV4lk5HcRPqQEb7FXvg+hNj4sbaGD5hLCDRheRwvAEgTeMyuZ+MnsggbQzzvwbNit+L5avUXYSE+HWRvQgqDv5W-JIkYSBE-ZthV0QCDxmTUp0iD-xouXQTqgdR5xAUIHw1UoCywAbAyST5J0Aa6LtFU8CoAbxaCQZvIxMgxmXpZoKFCG0BfAZqoTkHsgwbRLIvgInC+AOCZcfeliX0AWEohJ0DFA1JlT1VyI4AMZmEFA5kTFL-wRMt4it+GUo7MnvoyeWNiXM74ZxM3cLLkdlglMiEbgkfRDDkOJzbTb8TTrMXbUkeUqFM7JJXRNoqyqQZmFsWWCUQbaLk0cEDiAbE59lQMAZAbiSQLQMbNMkkBUgjYEdMgiTp7IwEGA1BZ80FxioWRAzeVYIauLWuZP1JyGoSRKSvEncRyQIenj-W+lj0iel+Mgt6WwaenypRti2MZ+FPAO6iYAGOTrcFSzRASenmwHlnV4Eph6QNEjzJTuwd9Hdqr0GDwYfBRxnQoqrYMJenZWYCFr0qTQC1R6G9EJCykQPxnAAbNi9DJQ5xtLqxaHBXRLodebHGTIaHTRHxURXfHiAPKlLvbqhYsjLzwLQ6F40ZxmjXcHz5ABYGRYbCQEAvuZ4jMqY4LHxC66WiJskRWryMys5iMCMATxAUDGCNeFX4CrQLQBSby2ARCM2fmxyNRFnRlNLrbTE5DJFaGh40fQFnyHFlPyEGbgOYTL7RDyrdhHeEkLZAD9hF4A+JWmHcxShaDwBtn0bOPDxLDuGcWRNlmxDvDm1Xo6QLPBwLwnPwDEJbg3GAaCbUXPL-xfUK7cfnBPCOSiY+ONkmuQ3iRoePCzBSSIZYcPjYSJe6c5OgG4YIPY7suogjTZJTQIbQAhk1dlTskHiNVfIhebI5TF1HQg2TfCg8QHXZaM2dmwkccjHQSVg9kcjwfsv2gvsiYbnVEwowZG+Ip5cDA4RcUCD0b3iIHEsxKqY5LdqID5UA0gEIQuMmEkBQj8M2FC-KGHBuzWMxkTQ7BYc5AA1sXDlN5Ajl5YRgBRUclj9YXDkfsijnNsCjkjQEaC4cgbAkcl2bg4ejkjQHDmobQ7D5YXDmHYVaixmMRkf08jnscujmobajmobI7C4cujlRUfDmobCtYCcrmTosIjmMc34gUsCjndkKjnEc1DYMcqKhl0Njl8czDnscxTk8c4Tnqc7DnicxTlScrmRosAjnyc6TnEc0jnKc1DaUchzkiczDmHYXTkESLjlCcsHDGcoeZscigAScyRnecmTlWczzm-EbjkKc0jnx0Ajn2cp2aqcpznqctzkhczjkOc3znuc-TmaJELnOcnzmmcyTmBcyznSc6zlcyMLk2ckjncQtQCCgbjmf+C2Ihchjm9YcZGzAz6DikkTEqwBkCVYVrlZQCRnIARrGqI3RGd7X8mtUT1GjAFWBewEhGs5MlhdrT4nywOCbZtPyxMZCgDmDXnGNYlqnV6AToXbJ1GfQQom-EQtadchkDc0zWDKwW0mDrB-xqwXbkyAfblZQUHCVrcQ6nc5WBmDCwYfk16jOzZACWM6xlsE397V0L2AvcsjJkch-wawbNoMgfrAMgUHCfcwMTacneCVwW4ZnbC7Yjkw7mdctrmN0Q9k0gW4Y849bl6wBkBewHyz2ItnJAElAQ5KAaDUItHkY8z6BY8pFFgRUYCNYxWA7clWCncg7kUYqnlnczRnDwCyrPTPkyDrJagtEJbgK4M9nV4EYpAQYAG3Q6CA8RJ8D4QmDTvAbxgQgUhgwYfWQWEKYJusyt5pHSPh41RQGTIOxmpcOX6VIVFlAg+XkXwYoEhoTCm1ANxn5UcqajrGVB68hYaOAn0HfUcxnPcq-G2Mzaix0DGhTBdeblxeU70hPGoFstH4qQnxYqU9DAmMy3ncAXZE5KNbnZtWxntIakhAw3Xm6MsGG-EQuGsMV7Au0MkQGAxd7unM+S2CDLA9kE6jwbPsYqxVTHgM0Lnp8hPmE-fH7SAAwGp8unhaMLGLZ4keEcFDyFPzX3lmMixnCAKxk28txmh8l6iLUfPl28RPn1WZPkGAEijeMUvmo8LRjBpXfygWXsgMvc3nOAmRkaaXkHUg3l4WNHfAVrJ5KGQjyjLJEym+8-8TmMt0l-cgHlA8q-FL8jY4r8gwhJodfkqAK3mN8l7k98cfl18ojLcALfn-cwHkvc3UTAQ2vAP4CojP4IpYWXU3mlrJnhzECaYv5Y3k5wHRmvw0OEgvILgZpBbF68v-gbsw-miAtBxOA90Q38gblDckbmfQGALl5MHxDwqJnQFHRB6nCVYDDd3n3sPxmQoa-ln8pvk2M+-SeskwFzSDVjPkCPm1ABtgcubPzS1SgVqhOaR0C9VRHlTRl+Ef+zX5CaZH8sVYHCPAUFzf9DzRfRj8AQskRcKABWeTSqoSHvnQsTgXEC+AX1863k2Mx0I2nQn5EcRdAkC2-m-c+-m781QXuTdQUGAXMBEcA5QwCx0IT8hAXmMgPlB8w7jmC9yZtRNwGMAPkFngBAWVpSHkZImQAz9E1iGADVi68X-mn9bFwqA2SkaAowIeURLK8C1flyTE-k38iblTcvyx2CsHxRC8bwxC8xnzc7NqLcnWBKRbQEzcOlC8CwIUjobQVIC5WDDcyrCs5WAU2Aqoy3WCBlJCgrAUGUfkcaaoFGBSNDUA3+b0kVvTzxHxaFQDZId6WgEhkjZLAAZuCgc-gVV4ekAtChDmGYFelg6V-kQ6Soi98J9mccekCjs2Ej985wDfsr9k0sEkDLC06qCiEYU0gV-7EAiYXMHcYU0A+grmqKYUv8swjTbK5b-PYnan07aYcbYGDJwE9nQAVyIgC7LAk4S4Vv8m4CGgAtDLsklCTaA4VcAVoXq+OVDwc04Wuqa1wC0btSaAQ4WexLL54wFyR70kKxCVXKEECm7DviEHLiC4wE-yZwCDC2BCnstkL-USpByA9+AdZeggGAk0BicrRIi8a5j0EFwUEA0yC4+SpDoigtDYi31lTISwUb87gDTYa7m3c-WB1IzxlfEOAUW8+vk2CxrHB8lvlbhbEjFAkkVAC7ll9AbBj58uNjx8lkUsCns5TIIwUw+bAiYUE3ZTCZJm+C4kWAC03lOgSpCWC5QXn85vke0Q3l58oETrrWWBqilxLGCzUVyCpNhPkIjanDIYXjDBgRgckohjC8EVlhAtDuAEEWARD4XTCq4Xv8njiroQuAhiowLBi0gH0CXIgeafoVEpULzRimAAhip2Z5sZ9nbC1YUfkQ8gbCjJlbCpIBjsnYXFEFCLNCgMXHeIEWcAWMUOQ9oXUkOGEp6CoDJinAGy1CTb9KEUW2AbkVdcw4Y9clWDLAQ9T+9BkUmA+Zyt+ILRdiv3nii9bkh8lYFyQKfI6IY0V+Qdzzmim-kqCxWARIEATtIdvkIMhdncGIAp30Y9l9k53S1sxUV4gBXAkxIwIXivxlwNLVnZsJ0BpJIAV+DJcW1AB8WOs9uCLirUU7ieITpi+PClAfwXxiz2LYkNZk5QxcWkiwGjvi9Cpx8Q6j58s4VFiaGhusD-zENLpj7yV0UnUTWiXrFhSDMAYBIS2Mb98ECiRVFsXz8koAI8O4XNVLCAx8VAREi40Yvi9+CtmHznjkd4U0gZ-mmEb4WN4fFL4AkwEJxDViywfeFJIOQEUFeg7Ii3sjexBYZKQ1cXmM3sUDIvWAqwPMaiSsKSrWdDgNQ-BCTitiTIAe6SSSk0l9imSXKwGTYE2WCxsC+uKNQp8X6pDYIFvIVkVlIAWGS5GLGSvXlibEvBYsJiUTwiVYotU3lA3JSGkim-rEhLQ7s-Y4zxQm+zWSngAeSkyW-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-xxgQ8onII8qFlhgHj5uXUOoHWmG1EOAsKJPV-V98DDlL6unl98CA1G5GjlxWvg2M8p2y5yosKMcqoAxxEqA8G3jlLgGOIDGonISctfl98HnlfgRIVOMHj5KcsOoD2t+1sOAsKxspXlhgAzlE5Czl4WGOI+mpQQecooABcpWAZwrXlXsou1VdBJ1QeA21R0mtoFhW7AAIG7AxxBLlE5DLlsWGOIMWp011cqRWZwt3lQcsp1ssBrlh1ENlrwHvg8fKwQh1Ax1O2XtoFhUYQx8tjYp6qDw5spWV2bTSwqfD-VQeGtlKyroQZ8qmeZwtPlO2VEZFhTnBdWtl1gK1ueDdEtCrWqroF-Ghl58tT4BKEx8aiFlgautM4qfCgA6oABhLupP+agGOIlcgnIFjDSw4uoeEDdHl1O2R9mFhRDlDh1T4zssOorstV1SMtT47sutVPut119GqB1ZwoflospD1ssCflh1EZ15Wu4VFhSLlr8tT4PssOoFTUT1J0FT4L7Wu1aes-lxxDflE5A-l1dFz1svQboWCFpV7errlN6pCw4IFc5FhTTlK6NT4z2prVPurd1QCoPVXurcADeuQAICsMAAConIQCtnlguvn1DdAB1R0jW1gKxzUFADAVsbCnlh1A8BNutlgdut31LgAH1o2sMAYCrq1aLCv1dMjZES+qDwQCpP1R1Gk13jCDwN+s65qfGB1h1CbB1eqgVsbAh1QeCTlOupllxxAgVE5CgV9AGOI8fJgVh1BTlFAAbla+oIGh1GH1O2Tu1gKwblFADgVsbFh1xgm8YssFGAtusOoBAyQNqfGx1QeCzl1epQVsbH01QeDzlYBoE6xxCQVE5BQV7YFgNVdDQVh1ALlK6vb1G8sOopet+19+uQAA8s7AqfCW1QeD7lr+rt1Yhov1mBv4gW8uQAGCuZVDdDXlMhsOoG8rRlnBtlgKhqDwShvrKkesBWL8rC6OhsHEd8r-1hBuQAxBtP1iSo-1PGowgQODR1gKywVt+sH1gK3j5SZF0EqAFYNQeBQVGhua19howVrYlcNnLFT4rOrU1E+twVBmpn1VcqYN+CsMASGUi1e8rX1CRqDwNcpPV7eskADdDrl+TFT4J2qDwI8oCNyADHlFGPb1Y8sOo2Bp2yzhv4gXcofVgWpn1HcuKNdRov10pAsKE8qYAZhoPlh1A6NF+u31-EGXluMDMNuBpx8jhuL1gKyPlohtT4zOsOou8uKN2RqXJZhsIVG6tcAVwDX1P8uu1jhuN1gKyuAemrMN-LAD1ilysNNhrf1bgHsNuxov19OsBWf8thJ+xtQAzeqDwHXWKNX8tbEP8of8ZhuIVh1BuNrRraNgKwQVRsv2NnhtQAkBqDwUCuKNMCtbEcCtbE-xtaN-RsMApCtv14xu12ugk8NQJqSN8WuONJBqkN9hsIVrYmIVrYlIVMUoEZPwEFAGHODA3HLz4dgFBwjACDAltAoA70uel6gTRYyZCDADJqDVu0oWlgiuDVdgBGgi-FQ2rJpGlnavRYjCvpNXCkuo9eTpNwYG4AH1Huo61BWo0nO4A7fL2VfUqio0ppAExUrEVqG0VNaLnFNG9XpNgprywwptVN3Jt5N8bC1NaLnZN2UuNNjJr6lL0otiAAnUC1JtpNmRQoAQYApNjpppNkpoZNA2CZNdpoFNI0p1NVpv1Nl1B5NfJtdN70uylhpveoqprFNMnKql4ZplNGpvlNXMkVN3HOVNi1HpNiZrlNEnFFNOprjNXpoNNRpuDNqNFNNg0q5NAZuKlQZvLNPpttNHAgdNVJs9NYjNDA4OG1VnptdNy1F6lkrDbN1ZoGwR2EdmUpotNltHJYl1GTI70t6lF3M+o2UvDNPJo45vJu84BZqelFLFGlj3NZNeWDRcC1EtoqUpTN7fPRYo0siWmZok4vJoGwAAlzNtHObY91C8IEZvHNT0t5NxZuWotHNvN5Zo6lwOHn41psuo3nF5NrVArBdwkto3ZubNefF-NzpvJN3nARo5HKAt3pt7NHHK7W-pqqlw5su5Y5qpNX0o+orVAFNrHOBwPtArB+psXNPtDRYUVFXN65vJYW5t+IqZoAE9CtRoXpsYVh0uPNo5pLN71ENNfUv1NIFu1VoZrvN2Uto5o5rRcz5voVK1H1Nwao-NW3O-NIAkAt1tAoA4IH-NrZqAtagXE4VJro54Fp1NlUoGlXhH9NtHNzYbfC7W70urY2Uou5zbGnNQStWlR2AWo+ptHoeWFo5y1A65q5vRYgCyCVDs1TNkrArWQ5tVN2lrXNm5o45opvyw7asWorVHelCdHBwKpo4t75sOlE0t4t4OBuEXlp1NoZp9ooOBdmeWENNFaz-N8bAAtf5oo4Mlu7NEFvoVilunNPJs7V+bB0tXJs0t71HjY0FvelelpEVAAkvNPJpEVplvn44ZqjNVlroV25oAEC1HJYGZsEVTlsiWK1EvNFa1zY8-E8t+pp8tF5pPNXJoCtn5vKtVJsAEYVuKlEVs+o0VtitCcVpNTZoStElslNagSqlx0tStOpok4A2C25-proVHHKHNBZvRYplofN05qSl+WCelCdD6tSUuqlu0pqt55vJYq1BSBipsqlM0q253AFWoK1BAEFHFFNiNHJVaLHKtHUsSlR2HUtwatY5j0vNNT1FWoa5s5NDJurYT0pAEGnN+obfHitLZuEtrpo+odCvE461uKlm1slYKFoZNu1uatB1ofNq1Fo5J1ou5hUpEVHXO8tV1vzYN1qlNubFitoVsetb2HoVL1q8t71uWoefHE431vE4HVsMtXJoBtNbDalxZtBtDyt4t3HM7VM5t4tsNpGliNDdmT1CRt81tEt4ltRtwYENNzbDmtE1vE4PdBWoUVoHNJZtWoiUoOt2Ur6lF3Lwt2pqpNzrHyw5VvRoX0pfNNVrWoDluBwetpDAT1orB3s3dt9JoGlNwhAEDNu+tSUvn4Otv1NzbFptE0vNNl1AmlA0umt1Zvhti1D1tMNqCVQ5o656LESlX0uRtiVskt6to6lNJq1tbUt2lA0unNBtsTtxts+lZtvDNXCkYVfUo6lwdvjodtvoVDtorB46veo25vewFLB7oFLC9t2qs5tftsEVaLADt8dDpt70pDt72DDtItrjt0du9NsdoLt5ZpTtSdqdmidrTtStp5kKtr-NJlpitbUqxtvNqelT1ELtwOGytm5v1N3sxyt2NvLtMlsItCNH1N3HKtNjCqKto0rewwOAPtxFvryK1FzYj5retl1HI4pltFN4nFo58dCSlwdorWW1ovtQ1vywANvrt1ZrRc2qqCtM9qqliNECVWYrmliUvTtS1tdNa9qBtm9uWo29vNtfUr3tubEftGltUt6gW5tUptRogSvPtHFqvtoNuFtUprvtEdsftrtuftbUsCVo5ok47lsCV0NrewJNr-t8dsQt1a3uo-ltAd5LHAd3psgddCtGtG9TgdrVAAtFYOEtC1pRtf5o+tJlrmtBZuxtVUrRc2Dr7tFYIGl5pspN0ZqAE5dvItbUvI4xZtDNZpvDNH5t2l6LGKl25v4diNCNtXtqeoPJp9NNFq0d6gRGl5poGla1BWowDrHNLNu841bGlt72G9tPDoRoJlrzYz1CdYHHI45yDtVtQYEUdE0owdajp3t+turYrjp0d6gT0dy1sVNhjpitebBMdpZv5N3AAsdHausdT9tsdMjq9NzrGdYa1Dz4LjpuEbju84l9sCV+dp8dwasqlA2BUdiNHE42qpCdR0vCdydoq50TqXtYlvHNwOD-No9DItxHLkt2Np1t09oFNi1FAtc5sPt4nElY3ZCUt2Tu1VC1ARo5VvctXCnWd8dHUCMto65DDsAd85oYtgit2lJlsgdg9sWokFp6tl9pEV4nACVJjpkt2qt4tZ1ssdwNoRoyFu84etoWo61ERof5tGdsluWtEztGlUzpUd2tvztetvmdzrFxtPtGWdjVrWdBjs2d7bB2daKrRc+ztzYCNESlI0u3NpzorB5zu4AlztHoVJpudJ0qOw9zq5N5SqedeTpAdkDveoKjo+dvtultPzrb4Tszewhpt6wjZuVtwLvGd71D6lOdt4tTzqqlhUsLtF3IWo1Do0t8bE+oFLDxtaLBEVm5u2d7zsqtBwPMdQ5v+deyu3NtpoOBq1HpN4nDoVJltfNoprztXLqpNwZuWlmloLN45vmlg9sxdH0p7o4Nu7IzbFydXMgxtYnMktfLsktZ5sFdILGFdHHNFdWTtNtf1qld2zo+omzvld91EKlq0v5tDJrGlE0uLWNDo1d20qCV2rr+t8bD1dFzqAEnau4tMZtNdiNHNdQ1stdm5utdZLvRYdrr6lDrvWlMNqYVrrqU5a1A9dIluXtXruWtNbDewT1E3tlju+5+tq5dOVo4tD0pHNMLsVNtTu1VMjvFd8LtGl4Zomla9qttpHOKtm5rnNibuJdXTuBwq1E6t71u84w5uDNIisiW99sPtuqtfNUVEYVc0s450zp+tHStI540uWoQLsQtILtdNbbrJVnbpAE3bvmdvbrb4-buql9ivLtI7sQdQboStllsndUpundnatndKZp5NC7pwt8doGw72FXd0DtTN3Fq044dp3dQ5suo+7rmlh7rBwQAg-tWNvPd0ZrGBVpqWoPLubdt7r-NcbsrNUDuFdVjuW58zu84QAm7I5pq+lefD-t37oKliNCnNA5ug9sFqHdaFpuENwh7oYHp6tX0o7tgis0tWzsKlWpvjYT1Bctdrrz4E0uylgHo0tcruttUQJI9Z7vo9T1BSBLZto5N7uSlpHvtdu0oo91Zqo9Gjto9FLBzNXJsY96NCydfdvPNHJunNnHqHN3Hr2tQAjztAnrvtsDvpNonrGlc0tFN6gSAE8pqpt3zrk9ZFv3d6LGU9Ls1U9nTvU9g1sWt2nuGdbpvbVELsytFaxZtwnu9NX0sCthdqull1HZdFntWolbrz45dvewzFsKleNqpNxUsrtyTtZNnap7oPdBbNYHpbYdtv49IntGl2qorWwjvjY8bBrYirsPtFa1gtiUsPt71FbtBbHJN9ZqdNnToVdm5pSBu0o6df5qjtkXMktcbsAdQSo4tfFsy9+tuy9b2B4dnloK9Q7rewbfHOt9VoHNRDsq95tpq961HfdLtu8tA2Ca9Wpsg9Q5vttvdu0t3XrFdeVr69+1qJttNrml0FvdNDZrPdk3pAEXMhm91bCI9Ylvm9SXoHNtpstt3HOFdiFs+oZXoel8-FCd+pvTdjCvjNJDssdHSs5NApsKl+WFHoQ5qnd29sXNMXqEVE0ubYH5s89TDqpN3nCptCVsVdkS37dCdCcdPFrytC-HBwLJs7Vm5ou5OHpVN-ZuZNI0qFd5JsS9enqh9ZSrfNcPvgd+tv7tyPos9TVrR91nsx971Gx91Nrx9u7sJ9aLmJ9j1reohVop9Inqp9YnFp9vloptaXqrtq0q8dxpp9on1r9NnPs+oyjultvPq7W-PsI9ILCbNHUoq9Ivr7thUvwd65to5jdvWdCNHp9Q5omtFUp195dvKVq0sDtulu4tmnCHdKHqpNjCq19iHvXt6lrstu1s7VEnou5NbFxtKPsTVIipFNeVpMtcLv99tpvXt6PrjdcNoNdXMlVdYFuWtbvsVtQbttNNbESlgXsuljtorW05qjdi5uBwvFpD95PrD9lNpGl8dCj98-Bj94Zrj94TsT9w5uT9nno3NrHPT9vnvJYhptettpoAEefot9hfuVdkPsallLqZdFfv0dr1CUdNftd9qNHr9yXrLo71F6dQauMtHfq+lQSrzYo1o6l0lvWlrJtudoivh9p9qHNj-uqtUprmlmfs2dCppVNHUo89vdroVVJpvNNFou5vUo6l4OF4ta1HywyTo0tzFpuEK5rjdQAZOl7zq0tPtAdm1ftXtJ-vG9Z-rPNl-rRc1-oHNC1GylwSof9nDuKlhTtf98dHf9JDt3dX-vMtCUrb4D0oqlYHpJVQnpotoAeYtb9s69UAYStsAY-tCAe+dmvuwdVdq+l6AfLNt-vBw7HvjdlnPi98dEAEHvvy9J-ult71uBwhTsWd6NBit0tt5Nu5qKtJKp12WHqK93JrADY-ubYa7rmlqpsBt3ZEddXlskD5AeuEvnpwd2qout5Ztml2jvKt3ZDml6LGrtW-vQ9NXved4npZdeHICV3LsktSgZuEKgc+lpTprdZFvLopAeFN8dF0DM9v0DrNrD96tuPdNAd6lIZvMDP-ssDE0usD9JtsDedrLoopo+tQSucDT3tcDwAnFtaTu8DWHr8DxfuHNkZq+dzLu9mkjPCDoPridhpuiDi3sxdgStx91ptWd8-ESDAprsdpDr9NaDo3ti3s8tSLtctJDvZ9pVv5trJs3NYTrWdVNvWDOUoDdvnslYKwfXdrHNWdiwZmDEPo0tjdrGtLJphtkrDGD4NvjYnPpatUQZw5kQb6DzwYb99weGD0tpuD2Uq0DkwcuDqDpq9swes9q1AWD6zv-dBwbH98dB2DX0pKDUIfBwuwae9+wYMthwdBDZE0BDZwbWlQ5v+DkPtGDPwfedQwYct1E1eDjZrE2VFCUI4AG0Qx3w0ap5lCwDFU8+ZMhV2OTOehUSTaZZXkDqXJSKGaUnZDrtRvISrT8S5VCtCRgLmkrdVhVYRE0BIqovuO5QQAcNwQAOwEqQf0pZCNEAQAQUG2YzQlbIaOp9CEEH9VZtEcZoIC1DMASbkQYGjCaJSc4KgAhVB1Fn4X1DryUasxS9Ws1DQUDpQhZAcZPoXukWobK5tobaNLobdDRGTJQAipQEiPIvu3-mwYPwH1kEGpAATPLmklQCCgJAMHp4IDAA4vkMAJAPFAzpFlgnVDLV9jIroHeCTDZtCroaYddUViroEKgGzDHDNTD4IHTDd+szDRYfDDBStLD5YcRVIJGzDGytrDE5DjVfGyrDyYabVzYZQQLasLDyAGzDYqq7DFsQTDWYerD5isHDGqv2oQYCD4bYb7DQQBTDrEChZE5HrDI4aYZXl06oRWCKIBYZnDMYaSBa4cXDRRAnDDYbnD1StLDG4deow4arDr9CbDC4bPDrYaPDr9E7DN4YnIPYe3Dc4YHDT4ZQQW4fvDTir3DZ4Y1V+pEEAC11JkpvG5VvUuF59GtewDQGKE9GrhuYHItAYAAoAFoFbAeEHF50YeVATQHBA4wDQjsYfjDQBRIBE1D3D6YeXDVYZmohEfzDF4dnDWlBLDC4fLDh4ZHDWlBPDNEddUxEcojl+tzDZYZbDFEfwj4IEfDeYe7DXEeVA4IHfDfEaHDlYdYjY4aYjUFATD2gmnD34Ykj64YnIdEcvDQkd-DszIEjD4dUj-EbEjO4evDCkZQQd4ZXDNYY-D54e0jc4eojekc256kZzDp4fIjpkdoZmkYzDepHBAgEdqeKwDwjc4aLIpYcFYbqo3SVkeYZXkbDAPkalIX4cMj5kaoVN6usESkdnDr9EYjnVG8jrzKlILEZ0je4fijRWEMyVkd4j4UaCjQ8ysjwkayjCUdEjvYZ3D8kfyjaUY-IAka0oJUfij1avKjpka0oeUeqjMEoqjPEZSjgUa9Vr-WajukfyjNUYMjJEaMjcUbajNUenVdUd3D7EcajUpCij3Ef8jC4fGjoXOajnkZmjg0d8jTpAgA86FsgiEbNA4wDhuyEe2oqEbDD+0RsuWEfcjBEfYjREeaj00ZEjI2pGjYUdojzUdijHEaKISUcEjXUfTDvUdYjmUfTDL4aPD9UbIjn4eajJUfTD-4ecj-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-pXjJPuZL-PpylGbpstzJeHj08fql3-o5L4VuSlj0tWovfj4+pNgKcR0OWIeIEYi7snRA6MZsAoBV8F-WAjASvP+o4wG4ApPPJ5lPL25xBoJIk4p7FFpep5JtDmZFsSro6ICV5qgPAhlkhxESSAn5TyP95QSOQFZQs+g4EcfqtwMLsQInZWXS3bK2SVb8i1R-EDIfVs2STKUP4o8omAqKE2AtmEY8LDhhwmIgE3F6ZFyVOWIZZTAp-j-4WVG1s+UEV2RkFmV7jKSCcb0w+XxAaAtIk3kkZe-FYQowFfjPjY-1Er4Tkuf42ZZRgPUJvE9dyQYhZd0CxZfq1YsTrAOobHLdIgrLuNR0Lp5kNqw3GLBa4DDL9Zc7EjZY1sZ4xjLr1V4c8ZcOIgdXyg9ST3Lk5d4FdQvAj06ygjnYhA4EECKZp5g6WjQLXLUZY3L+hS3LYdQTLm9ECSh5bE2+8hxj0gD3LWobLLU5aL5BHE7AKyvmg4IACgpZbogMIFnLrfmwYdJAbLhZWvLLwHfLaOrog2JEr4rfn5iw3AmMpkHBZj0IpiKthfLmAC-LscV-LDjMnL18FlgoFfArZFe4hPfGjLT5YIrkWB-hsCG-Lr9FLLf5cnLhxx3gypdW0cL0EWNfN2OS2HxU36ydocG2sEmoH-EQYFOos-CTYM+t1IQglErFD3EryEido7tDkrOuop8ztENI-Eqslo0YwsAJd21yhdULvJLxkErA658BHORGxa2L1lYvTJxYazuRfqzDlfsrjlccr5WfmLVhZMr+QFjoKAgsrWwI65-lZXTF6ZcrzlZCrTlbCrqGzcrlWaWLHlaKApleemvlZ5ketr+dqmdYz2lcKLnleGmyZASrPEZaLambyrymfyraVeMrsVa8rfScbUOqS2BJyYKr1VZqzE2fNUdVYartVaar9Vear4CcNIQUFPV2maS1hQFiLXWCtKbhe6rn2KyrVpVSLY4CpBPVdyLNWNGrOAHGrn2NQ2NWKyLs1aygUVBqxlRcGry1fKrYsHKmQWaWraiZqxPZB2rbXQ2rfVbbw53PKAQUEfVjRaqzgYjc5XhFLE3CZdt4xeur91bUTetq7WHXPeL8SfAT03sK5t1fsrR7uqTH1ckZX1eaT0nNI5Eqp5kz1f+ruVfertScmLQDO+rQPrGBbnJEzgxaJTQNbw5INftTYNa5kj1b6Lf6q6rVmU6kNgCcLrEH3JvVa9xaNdwxYJchLUJZ4zWUGlNLmaJrCUhJraNcTxpNcpraUrJYfir01DNa+oO1ekALNfORHXPZrTvEprqG2prtlrhLpFq7WtOI5z-NfsLzNZWgWUElNotaiolNYXoktfn42tZ1r3-rlrCtbGrgteVrZifCw5NbFrvXGOrktZEVyJaRLvNd7tefCZrRtdZrqHrJrLOJWBlNb1tVta2tGJaOwhBblra8YNrM1adr5yOa9otZQElNfG53NdxLIFvuDHXP9rg7sdrxNfOR9eVNrbtfNr4eOsrVteJLVtvDddtdjj55sDruMGDrErDpdYdaNxZGSXJUdd2Vi-DXtqG39rgpvsVidaFr53NmLZdeAxKtcrrOJb6lOqvpLeddLjAdabrxtfbYqGzbrGtZQEWdZZLE5tmL9dYbjDtYFrSdYlYT1BFrZtfDrFtd+IXhAnrJNsz96Pvrr3cYLrg9dZrtitTrrIHdra9cu5E9f5L91BXjfdc5Lk8cLrStdZr8OePr4gFPrGdexLE9ZFL7PpvrgpYWdjLHnrzdZB5iQdHrZ9aioE9clL5-taou9ad9waoPr5yLjo7geAbb9c9rVdblLztq8ItOLr95NrATsDa4yDQj1tiDeTrkda7rgwYAtwDtpxX8cCV2DbqLatiW4DQrVLIqndkWkE1LKjLiAu0zeI4qlUla4stFciLmEP0qv4HDYklPIr5FiQ0FFVfEM5GdEglnTG3FPfDKUXjJ9ZyDGxI8-QmQhxBzoRHEv5NoHolZHNjMuAovE8CFlWTosYAuYCNLXTVlh71lhhhgHEb4+CdUqXIkbhMaMgGrEsLZGRI5-fGsbXTHEbDU0kb0dG3FtP2wYxsuKmLFZKr1uBIEfjfuIe4rPAYuwGwIpDh+LVk9AJpbNLxsDtL+3NV+NpdP53AEqwiTba12X0dL+fK+ArpZCFnpel27VFzKhDCqBNZfzWU6AhBoZeJWytgVKWzHXLZTcfYpsq1s4IC1DwoFmrYMfmWp0XOiOsgCgggAcZWoZbL2pHfWp5eoghZTnWdTdfLLwEabEID1krTdaZhQAaAToZab-EACgbRoGbNQqGbXYTPGvk1QkUoOiwZ5faotTeGw9TdPitQBlK4Za44iWB6bwMeWbN2Ar6fTdubGzb9IHbK+A3pcQFfpZKFKAvAjB0YXLWIOhONwDWV1JFfUw2Amb7kL6A5ze+WutRcjPkLQAvTf6brNVULxMLQAWlAebf5aLITzbbhqZFRbCLez5WUBRb8Lb0rptGxbOYemoNzbRbn5dfY57DsAeLbJbzofJ8v-IKwWMTCp9KxpbxLY4ZGLc3SFocDI2LZuw+LeWbJLaJbBLfub8LfVUWzbKbTcmpIaLEE4DQHEA15db8BzZ9qILeObD5bKbELcaBULfASQ0jhbyzYrFKgHNl4ICabsze4hYTYcZM8wlByIr+qsEAtlEIHuIpTdObXqqiAEID5bf5ZE4d1D6L8gPrLF+HYlfAGYrIQJIrDzceVZ4f6hjzcArc0nGhssCc4NwoOMZ4w9bmjJNA3rd9brFZubgbZfVIrcBI8rdGbhzaVbV5f3KnZn8g9Wv1D5kEMA+rcNbyzeFA8BFNb6qmYcJrEtbpkEtlxUztbkmDOb8Ky6bVzZVb9rdND2qOMutLcXD7tAhwQUFjbGrHjbSIETb-rYcZKbfLVabdDb4IHDbXqqjbp5jVb--g1b7babbtdMBIQ7c9QI7eySxFYmMybaroQbanb1JHOZLbZNAy7bBbtQEHbXra3b57ddqm8lpEl5dHbu7YDb+7dTbIbcOO7YFob3jk159DaCEaAnhqjDeSQ+5JeqN7e+Iv-K0g3-H7yEaGDry5bjbrEAQr2SXrKk5cUAd5yD4sYA1F0oAvudN3pI4Hd644EdvLG7fvLKfH-LvAtssN5f0KBHfg7O4hIEiHZhAv6zc24SClIatgQFUlYPW9HfIaupEAgJguQ2sPmUrNHdjYyy0EQ6OVlgWkHSlKUF10kGr9ewSAecBOhWBXmQhxYULXrozCtKtkgmcTuoCE6tXbQ0nZfxSKOqhnKAQRlGQBA4oDIZPGsoZkWB1ANDMXi3MafBXWsFA1sp1I6SawgdnZeTjnZIAj3N1ITncd97OCnA5Wa8ItgxQ19-gqz5qmqy3nZqz5WeC73gUirbo387kXaAZXnYC7kXauoIXcC7sXei7UVad4iXfi7aXYy7MXa5kcXZy7golS7yXdy7-nd87zVYiFU4EartWbi7dVeer1Xeareiby7rVadmjXfNUtXZK7WXeK7xAAq7HXYK7XXYC7NXc67BKEy7LVd67Q3dK7rXcG73XYm76XZHBVGsFAY3aa7UXb67lXb87y3dC7NWfC7A3ad4m3dKzdVZ276XdKz+3Z87dcLW7RXaW7Q3eure3Za7W3fC711eurt3fW723Za7l3ZO7F3d27h3ee773fO7SXci7lAgAhrUGUQIhmpDPcC07E1a8Iunfo1CCIWARDLYA5neCgEmys7AjMYQgoCCxw3bRg4vnpsqPbqrv+VR711Zx7U3Ya79AAJ7zXaJ7w3d1IuPd27ETB+7nXYp7M3Ydo9Njs7X5qp73gS8I+Pf67Ls2Z743bZ7PneZ7PPdJ7fPfY1ZPeZ7dWd57yGbZ7d1ZJ7gvYl7H5GF7NWfnyU4BSBkvdR7yZEJ7gvZV7zXaCgKetIwjPY57pPa57nPbl7Bvaq7-PcN7JveN7gvfKz8veG7VvZF7ZvdLERvZGBDvaV7CvdN7avdd7yvdKzNvc97s3da6tnZIA+iSN7rPdF75qnF7pWe57lPbN7KXYt7Efej7M3Yg1rndI5zPYc5J3dR70nN17gvbT7jdCN77HOD7OfdJ7EVZT7LvZQzxoSx7Yvad7WfdJ7ivYr7bvZD7wfft7dvfT7Hvad4bPfV71fdT79lfJ7Rfek5s3cZ1fvfs76fac7iffj7SZE87eveQzJfaL7XhAn7hNFW7tPaD7Zvfn7Uvfd7U3burgfed7LPfX7+vbH7zfeD7H9N37jfanALldz7B-cJoDnNl7uRat7yfZl7+faYzSfe97N-ad4VvdZ7NPcP7tVfP7KQLr7uXZVDDPZIA-ZuNCdnbPB--ZIAmbqf7G3eD7i-bn7J-a37S-Z37kfZf7QvbgHvXdp7UfeQH8A4F7qA6QH1Pd67dncILiWRwHo-b7DJAEl9nfe8Cetun70saW7dnbXN8A4eLJ3aoHH-cr7KieZ7aqcL73gS05RvfYHpPdI5J-e4HbfanAlsR4HYfeD7miXP7efYz74-eP7S3dL7Dlez7J-cz7bPfkHd-dgH4g+UHTffr7NffUH0g8d72-e0HMA90HWg-X7VfZIHRg8-71-Zr7qvdR7SVfX7ANbMHlg+4TVvb1tZ-Yf7LtuYH3CeMHuVZIHyVcwHAXZcHD-aH7gva058A8cr+hCCg3mu17v-a7WQA834rA+l70-ar70-bqroA-N70g9X72-dSHsfYgHSXcyHEXagHQg8QHVvct7+-dsHWA7wHwA6Z7w-dytpQ7bhKA6m7ZA+Z7FA6iHhps67VA-8HTfZEHXA4kH2-faHAQ5qzbPd4H4fdsTrg6e7jA9yL0-av7CQ-+rSg6n7kg7GHH3ZGH+g6L7Cw8JoSw9Yzpg4KHt-Yb7xQ4C7Kw-v75g8MHuw6b7Fg6nAVg74HlbG4TfQ9yrVvZsHDg4779Q9uHpPccHNA-uHKg7+dQw7VT5-d8HNfc+Hdg5QzJA+MTQQ7cHQw+77Dw5j77fdyLIQ-9lffb-7LneiH1fbs70GaqHMPrMH8I4dm5fbiHYA5GHs-ZX7uQ9r7C-ZP7ePaN7e-e37RI9j7JI4wHv+RwHNQ4FYuVfIHkw4qHDA56Hgw5GHdQ5BHxfaN7LI8F7FA7Z7XI6UHnA5UHfI9R7gQ9OHQo+5Hcw9j73Q7aHgg5QzCg+crQw7JHU3feHXQ+sHy-c8o6Q6b7Tg5UHSw+f73g+1HJA8z7eo7f7ZvY1HYI6OHyw7QHyGc8HHg6GH3w+OHgI7N7Lg8FKP-f77lA5IAgA5hHIA7X7Ug6yH+I96HhI5xH8o4QHpI-NHcfaDH3g-QHWA7+HoI4jHMI8ILFI5IA1A+RH8Y75HdncB92A5IALPqqH7HqqHj5qSHHXOn7xzroH-vYIHjPakdMI+E9SQ8iHzPcd9rA67Wq3bs7tG3c7JACO9jY+f8VI6n7rA94H0-YEHXo9P7rA-GHMw9kHpw+1HMo9xHKg+yHBfdOHE45b7ZffmHOI52HyQ6S7849NHAVdOHsNdOHHXKiBdw+srbPY65jg6rH1SYuH1lauHmxat7eY-X7b1fX7zRa2HqG2TtzPY65xo6nA94+VHRKePHL463He49ZHAo6nAUQMvH9la971lZIHydvgHkQ-X7KAlvHpPY65VI8gnwE4tH+49+H1o-X7wnNAn1ScjHRKctHF-beHiE5Qn5-YIHTfdeHrI61HVo+37No7OH9Va3H4Cd5Hz44fHPg6eHIY8lH3g5YH3g+CHwg6-7AuvCHzo6iHbo+H7mbsaHX4+8CHAhhHqY5IH2Pc9HAw+yHBI+JH-o59Hj-aKH6w5kn+Q8Enio8IHqAHY9cY+OSDneH7T0uaHTY-nHeY7vHnQ+UnDY-0no49R7BY6HHmxfzHYo7BHlY9J7P457HtY8LHqAGbHMI8q5wk5pHcE80H345nHNfZsnsfd8n0g83H2-cCngverHq499HrI+mHfg9YHtA5dHz-gZH9E67HBk+kHEo-4HGI-FHHY6snXfZP7L1ZHHnk+pH0o8HHSQ+on2o6KnWE4XH+U7VHr-fKnmfbknGnKUHAY9WHs462HJg5GHFE9an8A5ansffinRfagnJ47gn4E8F7G4-X7u49-Hb49sn1SdfHA08FHfU4gn9g+MnSk5+H94-fHJ-YvHWw6vHl-c2LBo4Anxk+BHjI9wnqU7RrNw7UTG08OnW4+onIE7DHm08wn3g744tE+6nNE4Ynzw7BH3faCgIcqhHvk4AHAk+4nAfeH7y3KqHJloH76Y-2n-E9YH8Q8EnqI8QHEw5Mn2I9OHEk4yHUk-Mnyg8Z7qvcZ7-g8Z7xY-97EM85HZyaUHek80nVI7FTrA6AnPY6qT9k6YH2-bxng07Sn9Y-unonJrHdI8ZHHI5+HKU88o3Q-rHrQ6L7wU6b7XM68nBU-GnfM5Cn4U8Fn0M+8C-k95nWI-ynTM9tHow4+H0U6SntQ5xHH4+xnIs55HUU8nH5w6BHUo7qnrI4lnEwVBnGs5GHfE8Ynh47yn7Y8RnfE8crr48qnvY+vHGw8ZHAY4-pcg4OHVU9NHuo8HHbk-BH7s6mHHU9gnmw-cHdE8fHM0+FnU08DnaE+MnwM71txzuMnJE40TJA6ioUc9mnaiZIHV48AnT0+lnJE7An8A+gnl07Dn9o9Yn0MqdH0I+H7XE+UnPE5hHf089H0-fu7fo8RnDs6jHgY4wHqE6pH4Y4bn0Y8QHLY4BnsU85NUQ8q5Pc6Lnyk4RzsU96tQ8+W5ak8Y9gM51Io9Anne9unntGzUnv1Ann9se0nSZBatVQ--ji8+yTLY+z9iY6TIZ4LXnSmZhHMrHX7Ds0cn-JeXndgfPnmbq3n2gR3n1+fgHXhClnpE8inyk5h5186xnHnbbH5M8ZH2Q-6HLE5JnmU5tnsw7ZH2-e1nMA9AXYI-HHQs9p74C6S7MC-ynAY6nH7-eyn3k4MHzU5VHiGbQX8k5fnTQ9inWAdPnNwkcnIZonnEdsl7n090Hn0+CnAA+IdVQ5Hty8+ktpC9dHSI5oXHo+LnuA5hHals37uNZiHDQ857MU84nCY5bHALroXy3OEnjE-4XwM-ATLM5aThC87ngi-FTaY4FYQk-YXLPrkXGM8UXWM6x77sz7HSNdinZdAJnOi4SH-Y7SHYg6x7XhEpnAA8fNgi85Nwk5ernE87V8A9I5z86x7ig717Li4yHJi4q7E4+n7jiYSHKAh+n386+nUvdRr0-cd9Ti4q7XhDFnFU7yn+XOQXeyenHcS857tvaCXKC+lnsxdFH69agHD89YHn1Z7HiNcRneCcSXUC4q7VfbZ7kpv8Xc-cCXmi7yHyS9UH4S6-nqPcd9Es4XokS465kpqAXaS6mH2Q7SXmS9lHpPZJTtI7tT6I4yXpw5SBXS-+HZM8xruS71nQ4+mXO49qT3i4snzPbaXJ-eWX648WXic8iXsxa1H0vaf7Oy857ey7SH1s-ATRy8SH+y-QXFnJ6XtS6cnB46GHC9BHHdy857js9OHetslNpS9yr8S4Xo-48+Xjy7tnWPYwXSQ++XaQ9dnbXal7IK7n7AY8VTMy+dnz-mhXrVB5nnlFeXSy7-HSK4wnD-cRXrI-KHgvb1TJ-bXH8S8lN-4-xXKK6WH+K-PHmxbmXaNZHHpY4f7VK6xXyK76XdK+Fn8K-jnJ-bPHzy5uX-M6Vnpk96XMA8mLKK7ansfcJXpPY+Lz45pXqPf0Sw09+Xoc6WHpM7Z7F0-iXGi6L7Cq8JoSq+TISq6kd987BTuM-2HR46N7Cc5gHeq65XZE8Tn-K5+H+E9j7Ic5Un0K7pna04ZX009Onn4+1XGk+FnSw6QnWw78X8A9WLGq9znws5NXSXeBnDk+8Hjw62Hqif-HJE9unga99nsfZIn7HIcXac9In+i6TnQw9pnzw4sXmK6x7LtsfnLSczX0nMzX0KYSHmnpiHONdyX4CczXLtrCXOpDuTuS5iXui6Mnevb9TUA-rXQ4+k5cC+xL2JfF7LtqaXP1eLXDyfF7ki4bXFy6HHji5WXXC9OHkxc5XFXZeXUA8nXg69iT4vZ8Tly7bXZy9+ILa+k5XS9XXJ-Ydm46+wmibvbXtSd3Xz03F7uycPX2ifF7G6dYHkxZZnDsz4nV65ZXI68snvKYSHkc837T662HibotXb68370nNdnX6837QDJbXeS+PXwy-3X8K8d9Zq4aXI66f7UVFFXqS7A3U4EmLxU9Q2gq6l7Jw8g3Qc7+X2id2XA66tnsG9VHOG8TdC04nXc0717KQIDHLVvhXO6+fXtq6qnBxamHJE4dmCG9qTXy5InibvunjvoI31y72Tck5o3C-eY3zxa2HLtvY3Vyd9XMK+GXqc+XXn67Q3B05aTty45nFa8Y3nPetXJ0+k3D-eU3Uva8IvK7176m-gHkxaOXDSc374CbbHNg9EXdo9pX9qbgnra857Qo-9nqm7n7sm5atVI5dtu0+cXRE6pnZm+I3V046H4m+8HDs2E3sxaVX2Jdk38NfvnKAg03Pq-unba6znA6-QnVCcKXaNZIHoxeMnVyZ+X206FXHm+Q3Pa94XJ68y3Xm6f7jm837pHKc3FXYK398+K3Oo9K3wk6AZzG8k5+c6rJ708IXgS5RHjk+W5UQ6nnsU7nnLk+SdY89-jLk759PW-83RS437sM7Sn0g91n1S-JHLk4yTPc5G9Pc8ILPc87nPc+7nh85f8cI9c7PJsXn-c6c7KacPn0GfnnmbvnnuVvnnFc+H7VcZW3SZFMT8885Na89Jtt8-LHh89o2NC+W3D26UnAA7W3O85HNDC4FYzyfYXGScEXdpt+3aM9dHNKfYXqKcEXZ4NB3z29dH5QYUX9C+h3MXr5XhC6RHgi+odSO-fnro5vngi8IL-s-KXU4HVXuS-mXzPZPnui5kT7C9ytGO9R3ArAEX5-cpnhq8qXvM6kX6y+Vnj87Mn-C+TXRKZCXDM7tXj87IH+s7Z3Hk5iHOM+LnIi6UHj89Cnsq4G3Qa8SnTI6+HsS63XXg-SXps-eX7I5Wn4u4G34y4GXEs5jX6s7UTh47gXqNZNnTs5kHnm+tnvA6SHfE9mXog+1X1E6v7J0+lXY29gXOI+KnVG4qnZU9NHzGf9n4W8jXTfeE3GC-9nUfYAHqQcEXsi8s3Dyc4n8i7kXDI4AHKi+y3sxdD3Ei+bXMQ8q33C9iTCQ77XuS6HXuS67Xhi+0T0-bHXSe8mXCQ-nX3a683We+GXCy5NruS71t2O7k3eyZz3Ie+D3+e8S3pa4Z36G+L3Cm+T3S66wT5m45Hke-83oy6gHfe6HHq0+A3G67r3da-x3EU8fn8G7z3W68TdW6+OdfE-n3-a+3H9e6WnevZ5Tp66y37m7tTgG4eXmm4HXva-33be4b39K9b3Ru63X4NanXBs-S32u9o3Bu53X2W5bXQa-F7qGzTXni73X9e-I3Mq-P79+9anM+7l32W7ynbG7z3TS5HXoffL3+666Xqs8F7kxbynMB-73wNaHHfG-SXLVo33QG473pG5sH5K8XXri7JXMm6X316833NS9f3FU74njvpXX7K6l7Io75XXS603Iy4y3rU74ntqdQPu+8oPKS51Ixs8D7jB-oPrB5Fn0i6G3D6-r3Es7y3bK683z+8V3OB4pXiW9NnhM+FHOi7Z7Pm6gHmu6f7Sh6XXxB6C3UK8mXYu4SXW+-hX8e6bXTu4i3r6+t3R+-nH2B-cXOI+xLAK+onxzutnNh-03km51IZi4k35U9bXpK+0PUvcQXW+7w34a6t7jid8PsSaf77q+DXGG9i37G9CX9h7Gnam4mnKK-RXGQ+iXIR5U3Wo5erT-eSPiW+XHAR+S3768znr65QETq5b3eR+KXdu-67XS7d3sW-unuyaOnWy6XXeG4SPpm6Q3qPbKXm-ar7Vs5OXRG59Xpo-XXWw9aXER8K3jh7jXkpotXJKa+X1s47XER-C30vYq3lw8D7rR6NXUR9mPpi+hX3RfX7NxefHgK9BXbR8NX0G+wmFq5-XOR7jXdy9onoW4aPLm693bY593gfbOPho4yHwK8WPmq-5naq+wnnm6OPcG5M3YI+ePHG96Pry8i3Oq7N79R+lnDx7i35-fePa47E3wM5JXOo4QP8W-rnUG49Xrx+lnBq9Dn0a7uPpm96Psc6GHCJ8tXia7N7AJ4c3jx+FnSJ5S3rm96PpM9QnGJ+znqE-9X9c4OLVW5HXwk4E3985zX98+EPNi9pP0e-C3Ra+M3Xm+EnJa-vnla85PMW7X3yqfAHDo8jldW90XDW7KHTW8E3w2+9HeO6uX0A8bnRQ6bnwY+bn9c5bn6p5j7VA8xXKY8oX-vcE3Ga8cn126qHwnpbHBC4r3Bk7s7Fa0-n5e8fX1M9-7ne+H7TeUcnO4pHndY9-7piZ7nwnqiHkBfnn-Zvnnj3PnnW2+O3O2+232p9c7B28PnR2+wXNK6c7Si+O3GY8PnWY8Pnli-Inp8+sXyZ7UXh1vPnWk4hPUu7tXz86c7Jp4t3PY6MXYC4d3d+4rP-B48X8C553eU6SXqC6+XyE5Yz5-ddnF+8H33B+c34B+j3La4LX7Z-cPCx67PevbLXUA8T3ex-L3uW9nXfK7-3CB-3XxB83Xx84g3je8o3Px59XeG9WnlR7XPUx7P3sa-L3dJ7hPZrH2PMU73PAc4PPJ58TdbY6PP2W4vPVJ8vPKm5w3jJ9tn459v3N27Znro5YPAA-djak97NsS+43GQ8+HVC4h3ArCh3zC-IXjC7UXP9o+377sgvpO5J3MZ9dHOC5oXqQZoX8i9Q3Ms+LnUe-Qv4F7kD7C9a3Vi4j3ro-TPxc-sXOc4C3OF-J3hLroXRZ8SPhC7NPHs4dPNS7dP04IkXHB7H3As6939O4EPEh+rPme5MPha5lPFU4LPro+cnxi4sPPZ-qXvM5j3sW+rPC9Gp3k-brPhB6qXwC7mPma7BnC-dp3qo-LXMe-pngy+S3my+HHS67gXox6mX7k9an2Q4H3B+7YvdS8svLPa6Xh+733vB5EnC-c0v43fZ3x++gPAu+-nTS+mX966r3rVFkvIm5bXTy-uXQh4QPQy5YPpx+HXaNdcvVe6uTI54G3cK6Jnze5ePN+9S3KV8ZHbS63H-l9xX-U7ivzZ8FPeV-WPBV5b3hE7tTAK9NHem40PCC5nPKK8Mv7+5P3W6743BK+WPkq443Sw6Gn-B9iP0g7+P3gW6vkxeav5U+FXsh4PXBO6v3hq63XL+5H3hu8ZXsS7nPLV9x3k09vXaV+kHWx68IWx8J3-h-Knnq62HW17knxB6H3Wq8fPFq6fHXR6d3V48PH8K5kP-46OvLV+JnVvblXy0-4PFq+yPuY69XGJ6cPuZ7JPVx8NXwm+znJ04KPbcKd31w63H7G60XNq-gnQU5gn8x4kvwY-+vAa6OnvR6DXW05w3Ia9lnEa-BvMA4znJx6qnsm6s3W44TXON893VU96P0y7jnVJ8rXUQ+dYbY6LXYh95Tc6+qvrF86vRW-b3Eh4yvrF9Xn9e-ZvbN8E30KdQvZh6x7pW7pvaB7ZvNB4eTmG95TKR50XEt5y3R+4KXEh46X+V85vhV8Vvil+63W+9VvSt-IP2+8S3jB-X3sW7WPKt9dnSB8S3tV-Fv5E8E34Cd6PsxYs39l+tvcx9tvxx8dTfK7s3eS6lvVR5P3yt6Zvz0yt7U+9fXzK9fXxy4XP0t4kPWx6APvt7xPDt4FPSt5mP+t89veG5vHqx4Jvjt9Yv7G+IzTR+RPEC9k3ZB8hv9t7f3kR4jvMx+6vtqd5vJW6+vud7s3mu+5P8m-yv3V7sP3g9rvld5XPnZ-KvQp9YvuJ65PR+5InxzvC3Mh9Jv7d-dvwm-UPyc+aTsW+Bneh+i33d6xv268uPsyZiPO58jvA5+BnxzrbvVt5Gvky6hPM98Tn7x4GPsJ43vPB-nvud4s3jhELnH08B3jk7LnQ57vX5c9fPxyUYvtGz7nEp4rX-i8tPSI7m3JI8tPnc4BXrA+rnkk57HYXY5vTe84vHh8vvF99P3NS-w3bJ5iHPJ-NPpe+j3pG6MvzB8n3wD+v3jN9PPKD8TdxB-Qfk1-Afxq4Afq++v3eD-A3g59XPl+6JTw+5EPP++VnFD-TX4h+v35+9APty+nPS18I3TD4qn41-ofID8f33K693DV-Yf1+9Nn-+5AfkB4G3UD9tPww4HnqY7HnrW8kfYZ51I7W+O3yTu9PGSf9PMj8Roup9dYgF5ATH29qdWj8qHkZ5RnrnajPHnbgvZ29AvZ26dXTnakfyZ+Mfh2a0f92-YXy26-Pr25oXst+UnMqroXiKe+35j8h3fu8h3pj5KldC6h3SO58fArDh3xc8R37C+R3ET-Iv6O5J3+F4FYxO9YX4F+IH7C8p3gu7if61AB3FO-AvQe-Qv+j8UXmT8udEq7Qvrj9wvxk-UvpM9cvLM5OH96-LX1q9cv1Z5sHAy5ZnoN9cv6l4iX2l8EvArBTPzg7lnxT7tXzT5Mvys7afgz4sXsm6gPPw8gXeZ4On3F9GvRfaNnbB5YvKg7gXR-aVH5s6lHP89V34l88oEs5ynxZ9ynBu4V3qK7LPr64MPTu5qn3s8fP1s-OfRo4N3DU5avjU70HXq4936N9QX1m59nUN+2H2q+bvu5+FPwY9-Pc-ZpPtN5lvjB4Fvet5BfCl4Pv-647Pnt-lvYD81vLj5b3KB45vpG4tvih7svYD9gP0L-YP9N41vaL61vNt+kP6L7FXWL5atah7kPR+5Qfi+5nXy+4VvhL-xfYD5RfRL6svsL+Jfoh9XvfN9zvGD4mv-B5atBe4AXf6+knHL+xfed89v-17I3+W+iP-M6RfqV4RfhR8mXUt+6v9J-43ot-QPER5jvwr7w3QN4Vv2Q+Odmt-fX8d7Dvx0-r3Kd9qPrL-Vvil5Wvqq4TvP54tnKr5U3YR8lvR+7FfQo+9vWG6XXhd4qvqF5KvHt+FfIx8dfEh5w3Xd7Tvjd6k31E4UP-t6rvQD6NfMr5uP8r-M3SR8lfY44Y3Rz693yb+9f1h7df9l-1fKo5dtCb-tXpm-VfC9C2PPRatneb4dfwy7uvmb7mPYr-afRh6KPut+ovlz7zfGb9KvmR+1X5r7lfSw+HPEb-zfKQ6WHOS9dfXt71vqx6OXrfbEnkz7dvY45mPdc-pfKQ9dnGR-svzt-3PjS9-Xib8NXNd4QPg74tX297HPM75Qfg18Hfrs7dnJ+5VXVb4mfR78JvfR5efFXfGXAK+jvo096v4d5vf+58L3p48jfrL4xPfl4BHvaeS3CN8hPKK7DX8SeS34W8u7cE4BPi97S3dq63v+58Q32m7jXle53vgH7XvOV7rvT79avXq+g-Hz5hP3m-3PL67E3BJ4BPqJ7Q-Vr5w-17+8CSq79vYm9k3hO5IHNH+D7a1+hXq06HvgJ4pnr1+DH116wXYI4xPPd+D7lJ5PP4y-QnsXfGR9Ni61NAGxSVQHpseMHVo4euKz-YJpA6tGdl1S6k-pECDo6feU-7sqU-foOU-c2pJHyn8L1Yj+U-PsrFHyn521q3eU-L7WM-0SHVoh2rM-Vn9ueqn6W7yn+j1Bn7s-YcuM-Wn7s-Ecpc-8n9QAIQLSnyn78-Sl4C-AIDEHwX6-nYX953VBaXogX-8XEX4XoxoTi-oX7s-kuXC-yX4BAHI+U-KX8i-1eHVoWX8pnmX4BAsX7S-oV7k-S9Cy-kl6i-uX4BApF-+7wcEB74JzooJAHeqEgB7hlKVgA61EXBV2H2BVjUYKLX-rBEpM6-pwJ6-V4PEAzIH6-lWEG-i2ErBCoJ4OjMd7pvf1WCEMqxKpTFhlpnHhlRGURlQOxRlaMtfltKs-lS5L01K6OJ1osr31FuIoAYERllOBof8SBrm5zcrVljuIqU8kBjV8kAhr5CrTVL35HVdQLFVQ6sFKX35nVlyuz6cKosVhKqbkEiv+-P4akp4gM8VlCppkNkjtm4P5pkdKDhEBTGRQ5DQKYNCuryQeBhlVQC5Vh1Gx-AYfyu0MpRlldAFVxSpUAelXLVr8uLgL6tpVJP89Qn8sroKCG-EzUvdCVdCDA0WH4QKgE3sssFBj1dEMAYQDZ-xCTBoKgCngPP4iwxBqq2bP4iwXCS4zbP4SwU0tP5bP7RKMgCaAbP5Yg6UvEB+KshlPGbX1EICpVFCTylKgGoiNWuJ1hgGoizWtFlZv4nIMKp8sQEAnI+sFqlKgGINtmvO-dv5QQOsC2AaqhQQ6LZxCE5GRlJGjOF7LeQAzUtBNnv7gl-EBV-DBrD-z4f4gn0Gj-+kf4g02EOoMKrhAZwunVhgAm-6Rvj-lkeiVxNCro96oD-5Eev1E5DY1qf9dUYqpUAwfL81DwClOdYPa-w8x-bAlduSLX7r-Y2Dyw8yX6-RODhk4EeVkDQE3qRqhV2A5jhAEvMuNE5BZIPf8MAltEfWvtAH-SEaIr+sn7E9ZQ6-v0M3qSpHVUE-6I4bPIYz5xG2j8-5H-2G2ZIztHMVSCQErZGAgYVJCgjlEsySLQMD08fLYEpwFggbAnFRKJqrotAjBI0NBAEpsClOnf98UZ4xS+9fVG-Tv8TaElbK-84bkp2QPRk3lpjeEAVUnG-UVkbKBI0IsguOwNLdTZII2TYDJIwAPn-G8YYQCJ+THxIQHVUK5xW-DkgP5QL-zw5dACVdnAA4jQ7-ypoB-9UACf-Cb8TqFVFaGNBmEPBYdkIFHG-I8hYbAoOMioWvy4iWABWuQPFPv8L8F3oC0BN1lfoNoF5IGa+WNVDqBjZUKUWiGtsVJg0YCDLfQp+-y1mEQDMADEA-iBeIGa+dNVpANFbKugtdjkA4kBvpEbbSqFG6Ev-IQCLqiy4IjttAO2oWr4tKyucUwCqANroGgD5xDoAwZhgcE3pI6hyJDxoGgDHlTcAj-xYMhIEJwCfAOm4dShixCpoZ-8AgNLSNfV7-1CAkJV-AK9GLkpggKXAWCBfaG8A-3kJvyiAtZVkgJoA7aYEgI8A-kMcgNCAj0h0gMiAr0ZpeTeIHmMIdUaLfvNWbXXzLJ0TcwnzHIM98zS9KfM58ylNQ6Ve8zPBVk0R83E4Js0inWXzJPMe823zL3NZ8zFzOvMu8xfdBKVx80XzfC06gOuEMRlN81LzKQM1gxmAyPMx8wXzdYDWTU6AkYCocy3zMvMNgIjzd7B+gMaA2YClgK6AnWN9gL7zU4D1gOmAzYDq3R2A4XNFgM7zNnNhPW2Aq4Cd8zXzaoMegMGA0fM7gKOAwp02gLFzE4CxgP8DVYD7gMKdXoDzbS+AofN3gOWA7oDd80mAilhaK2ygASUClVJIfJhP2zO0fisNEA1LYo4DAmAAoAptSzYbTwD2fG0FdcUQ+WnyIyBN6jJYX2hjMipA34g6QIIkI8R0xVjFfwV-hV-+eMp5HFDhYDIjQTJQUAVg2iQMUgFc4D-4MkCnAR9LYoVShVZyX15neB0hV4lTICD4MUDRRS4bMgUTYDF2PGgZuC5KZiARIRcFHUAP20cFXUDwUgjALkVMUnySaUlnBWCif8Q4AHxAafl3AW-4XXRl4WvFLZh7hRhFE4V8cBgCR9g50hX5Rlsh5nuVYeZQYHI4VGhvqChVHiAXWB9CEMC9Q2IleztAYijAlcF6SC9AsHxm8mvgakD2kBOSXXQZSn9FGMVSAXZAqsA-xUuEOXYh-lyAVkEiAHZBH4IJyBewZL4bSF10b8QivkLAiABiwNLA94AUEH5VGJB9ok1ENAAw6GtAlkFWYEbA8txcVSfqORBOAR1AMlB9okySRx5e+C7AxgEewIegMsCuiEAyI0EdG1BePRsThCLA6cCOQXBIFVRHoANDIwJKUiNBbEh--EnA1cCFoF7AjZJeQOHAmgRrVTrAhsCZwPeAE0AZoAzLAUDt3DnxQgAe4kXcFwo0ADe4XcDzwMSwIcDmxglCK8C1wLLA5uIBRRyUBkBayWmwTWAGQH1gVJEjYHQAP-hRwMvA7sDjwJvA78QlGgPlSeAeYCQgjBgSQC-Ak8BrXFEiEHgwRULgPMCUsEO4XCCUAA7wTrhnwXW4FVlFNG1wVAAf6VZ4XdwGximFf+ksIPQ4VDAowJTVMqNDwPrAwCDcgESOF4BO2xbA6UMP+WwcM-YBomC+b8QPZX5ALCBPOCiAEwpjwHQgunZ2INKzJSwR+GUZTMCMxWzAmJBBjnIggqAZG174GHw7QAAg5CCOQR3ERKBeIOvA9cCcfCRACchPOHCQHiAKfjx-ANN4yjPAi5JHQiUg4ZoVIKnA6+gneGeQI8DsIPcgotJ6f09QMiDfwNN4V+F522Cg-Qo0IO8gzCDfIKCg+cC9QNoBAiCpcCIg7SDcsix-JLhBwL5AjvBI2x3gCoQlCC8gtlB1O3cWHcR6fls8ESAc-j2gCLwaoOJgaIA4RAQKeCAAGHN2NwQwm0UwESEoRWN2RSxCoJ5UOUCy2QKoakM+6Ve4Y9Z5qiMKFvkLRilFBDZQJTGICJAvqFjoKJt2IN7AwZsEkGToO3k8OQiYG0CnBRcFPIVf+T1FF4By1g2CWGxsGGQA+it47kYrC0BNdlgQPZtA6lWg3MYrVj6APJlgW3l2O0ATm1XbHxIvgHIUamF3agvuYJ5ty0QrPoBymTeKQOpsSDnSPUEAeUNBcV5IhUSyOdIJuDNBC0F7oJnBYbBkkHIQO0EHQX7AjyhYMl5KYsE3QQkAD0EMW2ToGkClu03eFGCIYINBI0EpYFiwI7gEYN0CWwA7qFo5RcCMXiQMeGDzQTpg1jF7ClBCG0A50ksFMIhIhRTmbmDKYADBIMECgnyFffkzQyFghMFzyi7LQ4ReTj4ATTQqAGFgokAuYJv4GbIjqD8IOGClYMsMJ0BpmVug7WwmYJlhJAwLGD+bIJQwcTqQVbIy2T-4BMC0wQgADMFsymRQDrlrYPWAPMF7YN8FLtZ+YJFhFJt5tXuASwsNYMlg3NQRYIpmQZkcwVtg-MFkUDLhU8wH1iOoZ9Y9SB1kbTIZ0HDBfTobLk1Be6D2+HAjKOCN2x8WSQA44Ot+LrVhYIxg8EAU4IxbSTh52xwATWCpYIfSI9szxgzgjlZSOBzg7GAwwTNg2ABC4PpbDyg04JRgsXR0wTDg+6DjQidg3MFu4OLgwSAeYJiFXgVk6BtFEuC3KFULOABTO2nAkfFqUWJAA0CLuDh7feE+oMPwUCwcaFyANyohoOGoIGU8QLkiIApdbDkFZaBOG035XQUd+Re5Y+pjqFMFXXRsGHpYd2gG8jGEXihWzGaEBNgwSEMyY+DBGzv5c+CbeVWqEEh1KXOgzkVyQO4bDcVpoOTIENkNAHFAGaFyviY7Sr44blJhK1l7WyRIdEBvoLF8fkM-lHObGNhASFeqCAA4bnLcMpQsSk9qEGCIADE2fUhiEOVuCEA6IBzgJ2Z-qFbKeMEA4Io0HiBSEP4gVspVxQW1IyATuj1KF7AsoA4QyhDYoAlDM0UgENVApNJjYNsxf5sYUEKMTgANFBSVVEUvsCkbBZhAOzNoEGDZ5kqQPJt3Sw0BYSEREOFWYqQrWyhlZBC+AANIIhCgoDDoc9Y1kHkQixgkQW2BHiFhgGpgD-gerBwrSxCoZSYQ0iDmgmibSIBYm1NLMnkEmxO5JJt06E44FRDghTUQmfhohjSkPqA4+CSQchRPvGJAfUgPGXAjEu5YyxwQ3GBAYNqAbH8ZoVtQJuQgSgcQtwBs-iTbYhCG4UnnKugXmA6bJ3gBFRdeLwBFGxoQ-2DAwRfKINYkWmZcGiBiEMcQyxDCsE4bBbV+IkeCaMBwCTkJOPhMkMPBYSF2kM4ATpCd8HqQoKA+wWoQzjhaEK1g3EBhOBaQ09QIIyq2SpDA4JlbGZCbsCZ5RQDTzE7bGdYL8DKYFXZsfwuiTwgQKAi2Nr8MxT+AYZDc4O5eVAACmG5VAoCqgBRlXmw4gU3AVUB-pB-CHvZNwEsQssNHCCS4CZleSDKbDZDH1i2QuG5dkOfoA5DYgFb-ZkBukNyQ+qCdwEuQ11RYMifQXzB7kJUsJRVBEGeQ+IE3kJKYD5DoZRkFUM5CyVyAdcJdwFy7cCNEoHRoOyCLqCDEUEBOwLeQ2oBTJXQAedB2JUtgOlAyxH5YdGhDqFfhAIC3RQSZM4IJkIrguYAb207bZAD6YOhlAFCwY1cIYFCcgCOQwoxwUOFASFCLkOFQxICbkPBIBZDkInhQ4IB4gUeQ5FCEULRQjFCSmCKBb6gnOAlGZEASmFxQ5lxrcG1Quiszxj5Q8ph-kJ2Q4VD9kJMKUFDYIFOQ6VDoUKKIWFC7kJVQh5CkUL50DVDiEPeQ9b9tUK5kXVCzeQNQo1C4YBNQkwC+gE7bMa5aRG2Qi0BtUPtwBFCGQDCAFo4UUNeQn1D0UL9QnVDQQD1QzGpxBUNQ4LhjUM+QhHtMQIgURcsbgCj2AGUd4PSYIAoHdnq8IEQUtVdAG6CTYLxg8uBM9ClQ0wtfoPrQ-eRcYN6aChQ20JcLcpCaJToQqpCgpguhcCMFbGWQtxkmQOBwPsB50DnwLtCTYP9KVyMMWzYgKoh4+GnQu0BZ0KIrRtDREL8+ICNeBUjZCBh4+F6wGdCgwDnQ7dCtEMXQ-iAl9Cw7aPhV8hA7fQpy+FeADADBEE0Q94FA9HRAV9Cc1GgAqYQuAIvuR9C6SAtALFh50J3QiADf+RXQ3vgixQHMX9D2-3XrMgDAMK3Qz9C-PmNhRDDv0NvWMRZw2CgjMMA2zHIAhDDiwVAwjyhwMLg4O9CUAM8IZ9hoIwAws0AgMPPQt9DiNA-QvDDoQDNQsptYwArWKCN-0OfQ4DCL0OI0fdC2y2Iw39D8sEfWLDCn0Jwwl9D6MOQw0TDGMPtbZjCYMIWoODDKMNwwhdCuMN-5A9COMLfQ4dVAsCR0GtDuDF0A4eAioNW0UtDxEJsAfah1GkrQt7xq0LCbeXhd6UQw5tCKFF+gpRtBECHQwOCIkC0gVhC8UhtFdxkxdjxgZlZFsBTLKZlvqHc1J0AToOX4KnNgcAKZJmFukJ9-MiBoaBG9GiA-i3aoO84Ov2hoLtYaICD-MiB4sIxoO84ksPRAp3hYwH1lbhlA6lAQfksL8DCwrJV9kPlsZ0hhYQywjoR3aHoyAVtUsMjEQvgwEMJbOrCasOqVMIgcsL1-Bxl9YJ-IErDInU7AcrD2qCiwvrDYsLqw1DZksKvQvrDWsOywwwBcsOL1fWDwI3K+QFsP4XGbFXYVSgwrWNh6OxogQtspSCKQ35l4ylfoLUM4bjJIMpRMYLB8TbDe-BUwr9CxfGLgHsw8MO7AICM0gE9AZMCDqGgrejhG6BUA3sB5MJAwq7COSmowy7CgI2vQ8cDKbyKwmiJ+sNuwQvh4JTRrGLDNANfUarDOYz1tMbDRHFhjPIRGsMmw5rCTaFywtHUusPO5Rpk8GF-0HrDKbz6wn38wcL7bVhR4cIFbYnCuWR3eMnCUsJ3eFrDxsO3MXLC2jSxwtAAesLcdQnD+IEiw3IsocMRwrnDCWzKwybDw6y9gyzUGcIB-fLD5sLJQA5tP4QfbFdsXgDVbF7BOIH2wsTZoWxEwhdC7sKXQwSszsMbbest3sLPQlDC1cKvQphpNMNgMQxVV4KUIO5RAgFsQ1UtjMOCECqDFUDdLccEYoDDLX6D4IDRsSGDKYIzgWyDVRGWqA2DlwNA+fjFEETYAO040QlsyRzIYoAvqOn4YAh-FJ0C-8na4A9C62U-WS8DpBCQARZsUuDTEZFYyeFBAEFgHQOogX-kXmCY7GAhBfCmbHaJ+QMg+OcFEIkLYFQBuVh2ySMtXpyVhG2C7YImqesVO22B1O4gCqkbgiMFm4L6bAdsn1Tbw6QApQh7wooAqQV64d0NoZUi8SXJcO174Ojw-CGAFIF5x4Wf4ZcC6egtwzFwG4MisJuCTInDQ2oAMf2KQlYA4wwDKIHYyUCZ5dEBWYItBBoBn9iDwJ0B08IJ8HAgNknaYaagNkg5YI6Qa8JkQtmIisCY4QLBMOAi8TuC1mG7guMoVgWbw1P9e8OcFNfDwQAtALvCbQ1HwlfDiQDpQEph48iHw8JsskJUAGAjirG-4Bw4rrGnwvYVMywlWBfCbEOXw8kE18L-4SuBOOCyoeMMbsAEVYgigoADDWeh4I0ihFecBfB3EFnk2o3TwoMDM8JGgCFgzQyTYKeBnAGtAjyh2AVDKEX8IRBgIKeBHoNqAAX9vwFp-E+4Wm2eKYSAyNW+oIcROIDCAGvoGgGAAMaAgHAWbTABpCJUAMIAqfy5-DEALgCOycQjPUHBAFQi5OzCbXihVQ2QSGQj-oHo7BQjrBA5cbEgNCJOgFaFdAmGAFKDdkk3oLcRHCPWhWJUNfyfYcpgkW1QAXwBHlkUAalsSNCLgv6DKW2mYeNgsoEJ-TsRhIB4gJEgRsGEoe1huCNqFZpJwYwEIztZjVRBIcwjpCIbVKwik2GqkbbCLCJUAW1BDf3KOIsleoQiAAIiHDiwgHwjbailhKvkos2GEJNhFRCMgMoiK+l8AKCt8ngQFejtfABXRdUpOiNLwwu5KiJKAPoiqgGiIOoil9HSlO+AW4M9qZoiSKG7AUvImRCMgIMA8pSygZWAsiJ0I9aEFgF10cLJfCKJhY9h-NECIsmFgiK8QQuC3AnUuCIjVoCiIhtU4ykq+G7AEiJYZZIjf+TjA5FZO1gyIwMQsiI7wHIjDqFMZVFgCiObhYoi1vz1EIYiLAHgAKoixiLhQnX9F9GHhYVZdlhpAGSsSKFaIkEiqQHBAQYjRKBpAf8ReiPjQNEj36GmQCojwSNGImoj+iNRIzoj51QA4B4AwcnDQc4iQGjmIxEjOIEWIoPBliODANYi9REEgLDsXgA8IlQivCIaAMOhkSLhAMIjqrARI7jtZegiQdojcSJ-ITEjFK1l6EkjAyEGI83ADUOGIwkjqiPGIpnBZiPYI+kihICWIg6gViNZIjYiGfy2I5wiuMD5IpzCaSNClQLAMSPmIziBkSPFI9EjuiKxIlojZSI6IvEjFSLBI4oAVSKfQNUiq8NiwkbBNSMZI6wQIkFWI9pANiIeAblY6ZDhSV3l7iKREA2DF8NCmTFwU4GeQvNpiyxjbeRUACNXFWWUgoDKIn0gCSPdI8Hti6kvwhVR34BlNfvhjSh2AIMD7iPiIuYikiMxoFIiVaCHWN4jHk1iuTIjddCT-CQifiOLSYYRuFQaAfIZ1sH46T-AHCKioVsjDCPyGEwj6Iihjd2hciJHIvQjgonyIkigpyPXACDtbCKGTc2J8hnWhWHs8IM1KT0BusB4gB-DaID3wwgjPQHII0gid8NwjFEjyiKVI3MiaiKwgeCMvSMT-JwjXkRWhEWErSK1IpkidSJZI4MjW+VCIi4jzsHvI81waQCMgX0iRSP9I5kigyPWIz8iwyJQzW-C9WB3Ilug9yNqeBw4zgiPIniAyCLjDTMjQSJGI7wJPSI2jMABbyOVuX8jKkD0qACjnyOAot8jQKJBI92szSNiw1cijSKfIv0jtSLDAXUiPyJWBCCiVewF8CcgXdjQARhxS1hSqXyECfH2CB8DxVgvEb055gATAV8DpAHfA1ABh2F64LgEyDHpkWXpDUQggrWBs2jx5NpF8-wx5LWBfAAIROCCtcI04eOha4Pn-QUjPf29I+nCWKNNw2qgcyLlORv9cQLmgu84qsL+guXQEJWeKakg+6XFEJBAeyCiwm+IKaHHeDERoFiW7NWCwYCsCScQzBHSGISoEOFV+VRtrAh8o4fMQlWHYD+odMKW4McFQ8NcFMqD5vxg0AtAbQTa6RMF3gGJoBehQO1XFStUjIDcwgdCNjgcw3YZN6FvoGDsoxRcwm9t3FU4bHGhAyPcZestH0PwYawD+IHIaHmAUMMkAtAAxZVq+A7IZYiTYXHwelhI0ZoFanjHQgqBrkhhFOBAHMILgmmRPoImolpkpqPzggaIzaDWVchptpg80OMElqNyAXcMGgGZQ6RxrAKXDRQ1DqA6ovDC+NnsZAaiKoDsA2ki4Vl+hDzRTqIuIkihcfFaBRSN+IHNDE6iF0LOojhlHqINsKsRGvl6osSNQi25SCmBVxTs1U8wGgUlYCwDcABv-cQD2qLuoj6ieFR6o5r5vqIkw1dtwaM7EXegRqNao8ajbqN+w1oEYQG+osyjMTBCQtRoge3KglXAE1k8WcptU-xVDRVAleTGuS2B2IjMAAxDSqMsMTjhGaL1kaUhFUMsMfsiQYNhwGZDEWFhbJRDWkmv5EGgMCIFAqF4JAGMQHtYGEj6gRWDuUMIFMaj12xUA16C4ADjgiuFoYFUQ6sANAReqVxC3Sy1omfhrDVmQx9h2aJWo0UNeFXslKZkvYMklDJtqEL8IXnwWaJ5QlXByEihlFJCZQSnBdSlLYFN4faIm5H0Qn399ENiw-RCg-0uhYWEwiF58aqjVSjQAJqiisP7CEgQxAKp8U8w8mQJ8V6CUyhhbC5DqYR2AA24IoQqAPZCwhCGowCAKgDUaassO230KPai4O2Y2ddYJkFq+PfDE6Ll2OG5K+EtgQQB06LHAH2j3kJWALOjYVQ7wFiA86Mh-NAByw05jQGiJMFfw-6AvaOiAwEh6YmTos0BK+ADqf2EjQ1XyXWj8m2TwiBgNkLF2USD1OAno+uj4yn0Q9FCHiPVo2ejt8nnowJD-RAdbXuimAPiwr5CthBeAWNtSvlEcQEhS6MbLEEhs2AQQiui0NhGooKAa6OUEOujU6Mbo795u4DborFYHgBzo-OjD0P0KegVwhBTo4bBd6OPyA+j9aMIACMj96BPghvlVQJ3EOlAy-xAaIWjcaJHwss5dQz1IXGjrMIu8MTZr6JDoi+476LhuDeQH6NTo2Oj-qIgY5r5QQCc1VOi5pB-UTAAA6hoY7QRkALQwkiBgRRtKEXxcaKoY9+iwGMnoncQBFQhAFCsJyG-eAyEqOFrFG0oLAjaNBgR-YUqAQyCoLkMASuAXuHBAOPhJGOm4WwjBmAhwKCNvqE4YjRjP-lHLURj+IH9-MH8GyhQQORjz8gnLIxjolQR7H9CVQFSSEui9KK6WEQC1WE7oihiviCoY5hi+qLoYicD1GLpQTApTqLfovxj++AARLximxGDANhjWdhVAPhj16MEYuoERGPMYsTZhGLIraxjZf1lgUQABPj8Y82grGMSYpRiq6AyYrvhiQgZAG0oeGV74XJsAkJgYuoQ4lR2AV5tUhVv5Y7k6eVGAXXQmeQW6M2gqiAcY2+inGLg7FXYyGLcY3vhKGJ-Ubyg2gU9ATzVgGPx8WuiVdlBhTeg+TGSYsxi7QCCgUQjzaLmYsRj5IASY+ZixlQnIGwi89TpAHJj1mNBgcZVkAC2YiCMi0MSwJbh+kMGQwg4UNCaFfZDcGC-hIFCb217-IvhZ-zNAcyVQlHEBa9Yq2wUcG1sx-ySYtVQAYXwA4Eg61VQjXQDZYHLaUMN5IDOFEf9GaDBVBf8LwNBY4FiJnF0wuFRxUIM+CtDYbHD5EFCjkJFAI5D1qCKQakMqWwhWe1tHmI6-Z5ih-wX-FORSGF0NVCNO4TCpQgD9CmBwHf9B-z3-LIJKWOUNaliaQwu1H6VepUZYuf8SNBH-Yf8vLjkAQ-8pSHtoDf8+kyjo0ljmWMuI5WIWWw5YwEhH0LagXliBWP0KOliMMM25HliXmKlYiljBWPF5HNgCGL--V7BWCO3-SVi+WJZYry51ZQX-RFiluHtQ3-8ym2CEcaCwiEVZAcElwR3AQ8FfoOpIDdteHCug8uikKzJQaBDYO0F8C0BSYQXyK6jzqLz1D6EHGUHVCQCLiPDY6mEcw0oVT6ivLgY1ONifVQhAM6jGI2TY794ClQTYtSMq6EzYhxktfzTYichHw3zYlqNwsDwAlBB08J9-VsAK2I04AvUQY1ySCcgq2KCgFMpYGVDYhaNS2KjYotjaSNjYrNjmGRzYqSM82IjY0aMB2MboJNjh2Oe-btihwyHYuNjC2NDYktjh2IhrRtjK2Jj-AqBy2Lf-RgiOcNrY9PCewxTKf4hXCGYyEEg4YxIA8cU-WIfQgXw4EPn-Zti6bDArVdisGFrY2ekw2LC6b5jvf09mQhgH2NXY2WAhWLOFb78Fwzf-fKhX2Krob9jDqM9-Jgig-0ag99j-2M-Y59ivfxyjBlVa2MPIQDiv2JfYxyM4QCYIzxVH-jQ4xSMNlXvY2gREOLg45DjYOJ7DLDiYNh9-FARAMI2jHDYkWNoIFNCwThrMQGUI6NXbEgCGWOww+DCL9WhAclj5IBUwDy5uzEUcOoE3-08VeKjD8FzQkNDbWPtbY4gyMMolTRBrqhl7CFiRDSDAG1sr9SE49aQE0MWY63CfWNageljKJUVYzVjTWOKmOoEWSB2Ykf8WaGo4+KhakMJeVgZhoM04trDtSgkAIER-sHdokWI3aJ2zMEQfmXJkfmiE6JpzcpsPWMfQj7C+CIv1bWRRqNPMA5sN2xA4RdYFw3WbEGVIsDfbBXYAuL3wg5tW-B8SBliwWV2orpjA2LNAUmEUWGBYc-D-oH2oespAuJnVLwhIYyBiPM54sNJoWiAy235bI1s90LArIKB-QIwsW5seICNbMlA5HB1bdODbOPEAZMgMEOogi+5aRASQiAB3oMAhddsL8FEghABBuL6ACVsGgEfQ7EpZW2ySACMgI1foH1DlQyhZfVifkMMAZlCRWKroaLA4kIcg-ridZAkVbaZZlTIQyvCBPgnIMhDh4FbpPRwm6W9WQWxLuNTWfWYO6QpSW1lzTAXkJQg61nnMBcpbWWZADAFq8AveAYRduBQcGgETnFe4bAFDzmrwa95HYgYIDIxzwm5BAllI5nnMb3lPuMNBZRk7pn2mJLJhuFB4xio8FnJZKHi9QHLohoBcCGFeTVlBtBJgf+jD6SdeZqADymB0emAdoE+FViVZhXRwP0VU4D9UXHiQXHPowRBFJVhhDMIhKzlY2+ICY3-bbcx4IDJjZH48uIxAKmNejidY6gtj80WwRmhcfFF2bL4j2wmY1WiZcL6Af1iEVkWbHWROqHjLNqjauOphDLBL6XxZTEwNPGRjNoAO-1oSKuoflBZkatRP-jtwkzBz6BJZfdkBLkbEN+B5vmfmLvlNqCQWVLwl3mosL7ip+iysAVZVWIvuR94B-0C4jTj1nFWKOn5yO0hozGiOZgkAZHjIESysb1QXNDc0Q6C8QFWsJHjvuKlwb7QKeJ2AQiUZzCwYDMJ7wnYbdIgzyGzYKWFSYKAYy2AFxTrAIitZkiR0DVgiCPCogJgM+L94nfRIWPFg3RxU7At4gNQyrjCoASpF8FneUBYDGy2mFZU5olqyYipREEfcMqBGGlL8IAA');


 
