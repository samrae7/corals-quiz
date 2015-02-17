function svgInliner() {

    if(Modernizr.svg === true){// && jQuery('.html').hasClass('ie9')) {
        
        var changeColor = function(svg, color) {
            var elms = svg.selectAll('path');

            elms.forEach(function(elm, i) {
                // console.log(elm);
                elm.animate({'stroke': color}, 200);
            });
        },
        count = 0;
        
        jQuery('.svg-ico').each(function(i){
        	
            count++;
            var $this = jQuery(this),
                svgPath = $this.data('svg-src'),
                title = $this.data('svg-title'),
                alt = $this.attr('alt'),
                strokeWidth = $this.data('stroke-width'),
                curSvg;

            // $this.before('<figure id="svg-' + title + '" class="no-boxsizing ' + svgClass +'"></figure>');
            $this.attr('id', 'svg-' + title + "-" + count);

            curSvg = Snap('#svg-' + title + "-" + count);

            Snap.load(svgPath, function(svg) {
                var baseColor;
                
                curSvg.append(svg);

                if ($this.data('base-color') !== undefined && $this.data('base-color') !== '') {
                    baseColor = $this.data('base-color');
                }else{
                    baseColor = $this.css('color');
                }

                changeColor(curSvg, baseColor);

                if ($this.data('stroke-width') !== undefined) {
                    if (typeof strokeWidth === 'string') {
                        strokeWidth = parseInt(strokeWidth);
                    }

                    curSvg.attr({
                        strokeWidth: strokeWidth
                    });
                }

                if (!!$this.data('hover-color')) {
                    var hoverColor = $this.data('hover-color');
                    $this.closest('a').hover(function(e) {                        
                        if(e.type === 'mouseenter') {
                            changeColor(curSvg, hoverColor);
                        }
                        if (e.type === 'mouseleave') {
                            changeColor(curSvg, baseColor);
                        }
                    });
                }

                if ($this.data('mobile-base') !== undefined) {
                    var mobileBase = $this.data('mobile-base');
                    
                    if (jQuery(window).width() < 768) {
                        console.log('running and val is: ' + mobileBase);
                        changeColor(curSvg, mobileBase);
                        $this.closest('a').off('mouseenter mouseleave');
                    }

                    jQuery(window).on('resize', function(e) {
                        var $w = jQuery(this);

                        if ($w.width() < 768) {
                            changeColor(curSvg, mobileBase);
                            $this.closest('a').off('mouseenter mouseleave');
                        } else {
                            changeColor(curSvg, $this.data('base-color'));

                            $this.closest('a').hover(function(e) {

                                if(e.type === 'mouseenter') {
                                    changeColor(curSvg, hoverColor);
                                }

                                if (e.type === 'mouseleave') {
                                    changeColor(curSvg, baseColor);
                                }
                            });
                        }
                    });
                }
            });

        });
    } else {
        jQuery('.svg-ico').each(function(i) {
            var $this = jQuery(this),
                alt = $this.attr('alt'),
                imgPath = $this.data('fallback');
            if(imgPath){
                $this.append('<img src="'+ imgPath +'" alt="'+ alt +'" />');
            }
        });
    }
}

jQuery(window).load(function(){
    jQuery('.shop-slider-wrapper').prepend(jQuery('.shop-slider-wrapper .lSAction'));
    //jQuery('.shop-slider-wrapper').prepend('.shop-slider-wrapper .lSAction');
});

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
	
   /* player = new YT.Player('player', {
        height: '649',
        width: '1440',
        videoId: 'irSDq4WMVmE',
        playerVars: { 'autoplay': 1, 'controls': 1, 'showinfo': 0, 'color': 'white' },
        events: { 
        }});*/
	
	$('.video-wrapper').each(function (){
        var $this = $(this),
            nhmvideoId = $this.data('nhm-videoid'),
            player = new YT.Player(nhmvideoId, {
	            //height: '649',
	            //width: '1440',
	            videoId: nhmvideoId,
	            playerVars: { 'autoplay': 0, 'controls': 1, 'showinfo': 0, 'color': 'white' },
                events: { 
                    onReady: onPlayerReady
	            }
            });
            $this.data('player', player);
	});
	resizeYoutubeFrames();
}

function resizeYoutubeFrames() {
	// Find all YouTube videos
	var $allVideos = $("iframe[src^='http://www.youtube.com'],iframe[src^='https://www.youtube.com']"),

	    // The element that is fluid width
	    $fluidEl = $(".video-wrapper");

	// Figure out and save aspect ratio for each video
	$allVideos.each(function() {
		$(this)
			.data('aspectRatio', this.height / this.width)
			.data('originalHeight', this.height)
			.data('originalWidth', this.width)
			// and remove the hard coded width/height
			.removeAttr('height')
			.removeAttr('width');

	});

	// When the window is resized
	// (You'll probably want to debounce this)
	$(window).resize(function() {

		var newWidth = $fluidEl.width();
	
		// Resize all videos according to their own aspect ratio
		$allVideos.each(function() {
			var $el = $(this);
			if(newWidth == $el.data('originalWidth')) {
				$el
				.width(newWidth)
				.height($el.data('originalHeight'));
			} else {
			
				$el
				.width(newWidth)
				.height(newWidth * $el.data('aspectRatio'));
			}
		});

	// Kick off one resize to fix all videos on page load
	}).resize();

}

function onPlayerReady(event) {
    var player = event.target;
    if(player.playWhenReady){
        player.playVideo();
    }
}

jQuery(document).ready(function() {
    
    svgInliner();

    jQuery(document).foundation();
	
    //var thumbnails = $(this).data('nhm-thumbnails');
    $('.carousel').each(function (carousel){
        var $this = $(this),
            items =  $this.find('li').length,
            thumbnails = $this.data('nhm-thumbnails'),
            autoscroll = $this.data('nhm-autoscroll'),
            autoscrollDuration = $this.data('nhm-autoscroll-duration'),
            grouping = $this.data('nhm-grouping') || 1;
	    
	    carousel = $this.lightSlider({
	    	gallery: thumbnails,
	        item: grouping,
	        controls: true,
            pager: true,
	        slideMove: grouping,
            slideMargin: 0,
	        thumbMargin: 4,
	        auto: autoscroll,
	        pause: autoscrollDuration,
	        loop: true,
	        currentPagerPosition: 'left',
	        mode: 'slide',
	        onAfterSlide: function(){
	            var currentSlide = carousel.getCurrentSlideCount(),
	                totalSlides = carousel.find('li').length,
	                prev = carousel.closest('.lSSlideOuter').find('.lSPrev'),
	                next = carousel.closest('.lSSlideOuter').find('.lSNext');
	            if(currentSlide===1){
	                prev.fadeOut(100);
	                next.fadeIn(100);
	            } else if (currentSlide===totalSlides){
	                prev.fadeIn(100);
	                next.fadeOut(100);
	            } else {
	                prev.fadeIn(100);
	                next.fadeIn(100); 
	            }
	        },
            onSliderLoad: function(){ 
                var width = $this.closest('.carousel-wrapper').width(),
                    thumbWidth = Math.ceil((width/items)-(items));
                sliderOuter.find('.lSGallery').find('li').css('min-width', thumbWidth+"px").css('max-width', thumbWidth+"px");
            }
        });

        var sliderOuter = carousel.closest('.lSSlideOuter');
        sliderOuter.find('.lSAction').addClass('desktop'); 

    });    
    
    jQuery('.quote-slider').lightSlider({
        item:1,
        controls:false,
        currentPagerPosition:'middle'
    });

    var events = jQuery('.event-slider').lightSlider({
        item:3,
        slideMove:3,
        slideMargin:20,
        controls:true,
        responsive:[
            {
                breakpoint:768,
                settings: {
                    item:1,
                    slideMove:1,
                }
            }
        ],
        onAfterSlide: function(){
            var currentSlide = events.getCurrentSlideCount(),
                totalSlides = events.closest('.lSSlideOuter').find('.lSpg li').length,
                prev = events.closest('.lSSlideOuter').find('.lSPrev'),
                next = events.closest('.lSSlideOuter').find('.lSNext');
            if(currentSlide===1){
                prev.fadeOut(100);
                next.fadeIn(100);
            } else if (currentSlide===totalSlides){
                prev.fadeIn(100);
                next.fadeOut(100);
            } else {
                prev.fadeIn(100);
                next.fadeIn(100); 
            }
        }
    });

    var shop = jQuery('.shop-slider').lightSlider({
        item:1,
        slideMove:1,
        slideMargin:60,
        controls:true,
        currentPagerPosition:'middle',
        galleryMargin:10,
        onAfterSlide: function(){
            var currentSlide = shop.getCurrentSlideCount(),
                totalSlides = shop.find('li').length,
                prev = shop.closest('.shop-slider-wrapper').find('.lSPrev'),
                next = shop.closest('.shop-slider-wrapper').find('.lSNext');
            if(currentSlide===1){
                prev.fadeOut(100);
                next.fadeIn(100);
            } else if (currentSlide===totalSlides){
                prev.fadeIn(100);
                next.fadeOut(100);
            } else {
                prev.fadeIn(100);
                next.fadeIn(100); 
            }
        }

    });
    
    jQuery('.feature--sections').on('click', 'a', function(e){
        e.preventDefault();
        var item = jQuery(this),
            pos = item.parent().index(),
            list = jQuery(this).closest('.feature--sections'),
            content = list.next('.feature--content');
        list.find('.selected').removeClass('selected');
        content.find('.selected').removeClass('selected');
        item.parent().addClass('selected');
        content.find('li').eq(pos).addClass('selected');
    });

    jQuery('.image-info').on('click', function(){
        jQuery(this).toggleClass('open');
    });

    jQuery('.expandable').on('click', function(e){
        e.preventDefault();
        jQuery(this).toggleClass('open');
        jQuery(this).next().slideToggle();
    });

    jQuery('.play-video').on('click', function(e){
        e.preventDefault();
        var hero = jQuery(this).closest('.hero'),
            player = hero.find('.video-wrapper').data('player');
        hero.find('.video-wrapper, .close-video').addClass('open');
        jQuery('.youtubeplayer').fadeIn();
        if(player.playVideo){
            player.playVideo();
        }else{
            player.playWhenReady = true;
        }
        if (jQuery(window).width() < 768) { jQuery(this).closest('.promo-link').hide(); }
    });
    
    jQuery('.close-video').on('click', function(e){
        e.preventDefault();
        var $this = jQuery(this),
            player = $this.next('.video-wrapper').data('player');
        player.pauseVideo();
        $this.closest('.video-wrapper, .close-video').removeClass('open');
        jQuery('.youtubeplayer').hide();
        if (jQuery(window).width() < 768) { jQuery('.hero .promo-link').fadeIn(); }
    });

    // Still needed? Can't see any subnav-class elements in current HTML
    // jQuery('.subnav').on('click', 'a', function(e){
    //     e.preventDefault();
    //     var adjust = jQuery('.global-header').height() + jQuery('.subnav').height();
    //     jQuery('html, body').animate({ scrollTop: jQuery('a[name='+jQuery(this).attr('href').replace('#','')+']').offset().top - adjust }, 1000);
    // });

    // Dynamic hover code to override CSS and provide a bit of delay before open/close
    jQuery('.level-1 > .nav-list__item.has-children').hoverIntent({ 
        over: function(){ jQuery(this).addClass('open'); }, 
        out: function(){ jQuery(this).removeClass('open'); }, 
        timeout: 200
    });

    // Megamenu click handling
    jQuery('.level-1 > .nav-list__item.has-children').on('click', function(e){   
        if(jQuery(e.target).closest('li').hasClass('has-children')){  
            var $this = jQuery(this);     
            if(jQuery(window).width() < 768){    
                e.preventDefault(); // don't affect clicks on items with submenus to open
                if($this.hasClass('selected')) {
                    jQuery('.global-menu-trigger').removeClass('return');
                    $this.removeClass('selected').siblings().removeClass('selected-siblings');
                } else {
                    jQuery('.global-menu-trigger').addClass('return');
                    jQuery('.nav-list__item').removeClass('selected');
                    $this.addClass('selected').siblings().addClass('selected-siblings');
                }                                
            }                       
        }
    });

    //Megamenu touch handling
    jQuery('.level-1 > .nav-list__item.has-children').on('touchstart', function(e){ 
        if(jQuery(e.target).closest('li').hasClass('has-children')){
            e.preventDefault(); // stop touch acting as a click on items with submenus
            e.stopPropagation(); // stop a click event from also firing
            
            var $this = jQuery(this);            

            if($this.hasClass('open')) {
                $this.removeClass('open').removeClass('touch');
            } else {
                jQuery('.nav-list__item').removeClass('open');
                $this.addClass('open').addClass('touch');
            }

            if(jQuery(window).width() < 768){    
                if($this.hasClass('selected')) {
                    jQuery('.global-menu-trigger').removeClass('return');
                    $this.removeClass('selected').siblings().removeClass('selected-siblings');
                } else {
                    jQuery('.global-menu-trigger').addClass('return');
                    jQuery('.nav-list__item').removeClass('selected');
                    $this.addClass('selected').siblings().addClass('selected-siblings');
                }                                
            }     
        }
    });

    // Mobile nav
    jQuery('#mobile-navigation').on('click', function(e){
        e.preventDefault();
        if(jQuery('.global-menu-trigger').hasClass('return')) {
            jQuery('.nav-list__item').removeClass('selected selected-siblings');
            jQuery('.global-menu-trigger').removeClass('return');
        } else {
            jQuery('.global-nav-menu').toggle(function() {
                if(jQuery('.global-menu-trigger').hasClass('clicked')) {
                    jQuery('.global-menu-trigger, .global-nav-menu').removeClass('clicked');
                } else {
                    jQuery('.global-menu-trigger, .global-nav-menu').addClass('clicked');
                }
            });
        }
    });

    jQuery(document).scroll(function() {
        if (jQuery(window).width() > 767) {
            var position=jQuery(this).scrollTop(),
                subNav = jQuery('.subnav'),
                mainNav = jQuery('.global-header'),
                hero = jQuery('.hero'),
                infoSection = jQuery('.row.info'),
                heroPos = hero.position();
            if(position > 0){
                mainNav.addClass('sticky');
            } else {
                mainNav.removeClass('sticky');
            }

            if(!!heroPos && position >= heroPos.top + hero.height() - mainNav.height()){
                subNav.addClass('fixed');
                infoSection.addClass('fixed');

                jQuery('.subnav-section').each(function(i){
                    var fixedNav = mainNav.height() + subNav.height(),
                        section = jQuery(this);
                    if(section.position().top <= position + fixedNav){
                        jQuery('.subnav__item').removeClass('active').eq(i).addClass('active');
                    }
                });
            } else {
                subNav.removeClass('fixed');
                infoSection.removeClass('fixed');
                subNav.find('.subnav__item').removeClass('active');
            }
        }
    });

    if (!$.cookie('feedbackBar-cookie')) {
        $('#feedback-bar').show();
    } else {
        $('#feedback-bar').remove(); 
    }

    $('.feedback-close').click(function() {
        $.cookie('feedbackBar-cookie', 'Feedback', { expires: 365, path: '/' });
        $('#feedback-bar').remove();
    });
    // IE8 interchange image shim - SVG support began with IE9
    if(!Modernizr.svg){
        $('[data-interchange]').each(function(){
            var icimg = $(this),
                match = icimg.attr('data-interchange').match(/.*\[(.*), \(large\)\]/m);
            if(match && match.length > 0){
                icimg.attr('src', match[1]);
            }
        });
    }
});
