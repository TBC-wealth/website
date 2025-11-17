jQuery( document ).ready(function($) {

	var prevArrow = '<button class="prev-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43" fill="none"><path d="M13.4381 21.5L26.8756 34.9375L28.7568 33.0562L17.2006 21.5L28.7568 9.94375L26.8756 8.0625L13.4381 21.5Z" fill="url(#paint0_linear_149_350)"></path><defs><linearGradient id="paint0_linear_149_350" x1="36.5" y1="37.5" x2="40.5711" y2="20.3239" gradientUnits="userSpaceOnUse"><stop stop-color="#0C2D2A"></stop><stop offset="1" stop-color="#B2724A"></stop></linearGradient></defs></svg></button>';

	var nextArrow = '<button class="next-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43" fill="none"><path d="M29.5619 21.5L16.1244 34.9375L14.2432 33.0562L25.7994 21.5L14.2432 9.94375L16.1244 8.0625L29.5619 21.5Z" fill="url(#paint0_linear_149_352)"></path><defs><linearGradient id="paint0_linear_149_352" x1="6.5" y1="37.5" x2="2.42888" y2="20.3239" gradientUnits="userSpaceOnUse"><stop stop-color="#0C2D2A"></stop><stop offset="1" stop-color="#B2724A"></stop></linearGradient></defs></svg></button>';

	/**
	* Utility function to calculate the current theme setting.
	* Look for a local storage value.
	* Fall back to system setting.
	* Fall back to light mode.
	*/
	function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
	  return "dark";
	  if (localStorageTheme !== null) {
		return localStorageTheme;
	  }

	  if (systemSettingDark.matches) {
		return "dark";
	  }

	  return "light";
	}
	
	/**
	* Utility function to update the button text and aria-label.
	*/
	function updateButton({ buttonEl, isDark }) {
	  const newCta = isDark ? buttonEl.prop('checked', true) : buttonEl.prop('checked', false);
	}

	/**
	* Utility function to update the theme setting on the html tag
	*/
	function updateThemeOnHtmlEl({ theme }) {
	  jQuery('html').attr("data-theme", theme);
	}
	
	/**
	* On page load:
	*/

	/**
	* 1. Grab what we need from the DOM and system settings on page load
	*/
	const themeToggleButton = $(".theme-toggle .checkbox");
	const localStorageTheme = localStorage.getItem("theme");
	const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

	/**
	* 2. Work out the current site settings
	*/
	let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });

	/**
	* 3. Update the theme setting and button text accoridng to current settings
	*/
	updateButton({ buttonEl: themeToggleButton, isDark: currentThemeSetting === "dark" });
	updateThemeOnHtmlEl({ theme: currentThemeSetting });

	/**
	* 4. Add an event listener to toggle the theme
	*/
	/*button.addEventListener("click", (event) => {
	  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

	  localStorage.setItem("theme", newTheme);
	  updateButton({ buttonEl: button, isDark: newTheme === "dark" });
	  updateThemeOnHtmlEl({ theme: newTheme });

	  currentThemeSetting = newTheme;
	}); 
	// Light/Dark Toggle*/
	themeToggleButton.on('change', function () {
		const newTheme = $(this).is(':checked') ? "dark" : "light";	
		localStorage.setItem("theme", newTheme);
		updateThemeOnHtmlEl({ theme: newTheme });
		currentThemeSetting = newTheme;

	});

    $(".menu-toggle").click(function () {
		$("body").toggleClass("open-menu");
	})

	var divs = $('.herofade');
	$(window).on('scroll', function () {
		var st = $(this).scrollTop();
				if (st < 500) {
					console.log(st);
						divs.css({
			'margin-top': -(st / 0) + "px",
			'opacity': 0 + st / 500
		});
	}
	});

	jQuery(function() {
		var header = jQuery(".header");
		jQuery(window).scroll(function() {    
			var scroll = jQuery(window).scrollTop();
			if (scroll >= 50) {
				header.addClass("sticky-header");
			} else {
				header.removeClass("sticky-header");
			}
		});
	});

	// Menu
	var windowWidth = $(window).width();
	$('.navbar-menu .menu > li > span').click(function (e) {
		e.preventDefault();
		var $ul = $(this).siblings('.sub-menu');
		if ($ul.length > 0) {
			$ul.slideToggle(300, 'linear');
			$(".sub-menu").not($ul).slideUp(300, 'linear');
			return false;
		}
	});

	$('.video-box').each(function(){
		var $obj = $(this);
		var $videoBgAspect = $obj.find(".videobg-aspect");
		var $videoBgWidth = $obj.find(".videobg-width");
		var videoAspect = $videoBgAspect.outerHeight() / $videoBgAspect.outerWidth();

		windowAspect = ($(this).parent().height() / $(this).parent().width());
		if (windowAspect > videoAspect) {
			$videoBgWidth.width((windowAspect / videoAspect) * 101 + '%');
		} else {
			$videoBgWidth.width(101 + "%")
		}
	})

	$('.platform-slider').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		asNavFor: '.platform-content-slider',
		dots: false,
		infinite: true,
		focusOnSelect: true,
		prevArrow: prevArrow,
    	nextArrow: nextArrow,
		responsive: [
			{
			breakpoint: 1199,
				settings: {
					slidesToShow: 4,
				}
			},
			{
			breakpoint: 992,
				settings: {
					slidesToShow: 3,
				}
			},
			{
			breakpoint: 767,
				settings: {
					slidesToShow: 2,
				}
			},
			{
			breakpoint: 567,
				settings: {
					slidesToShow: 1,
				}
			},
		]
	});

	$('.platform-content-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.platform-slider'
	});

	$('.platform-slider .slick-slide').hover(function() {
		if($(window).width() >= 1199){
			$(this).trigger('click');
		}
	});

	AOS.init({once: true});

	// var modalEl = document.getElementById('accessModalPopup');
    // var modal = new bootstrap.Modal(modalEl);

    // Show popup only if cookie is not set
    if (!getCookie("country_restriction")) {
        modal.show();
    }

	function setCountryRestrictionCookie() {
		setCookie('country_restriction', true);
	}

	function goBack() {
		if (document.referrer && document.referrer !== window.location.href) {
		window.history.back();
		} else {
		window.close();
		window.location.href = "https://www.google.com/";
		}
	}

	function setCookie(cname, cvalue, exdays) {
		const d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		let expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	function getCookie(cname) {
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for(let i = 0; i <ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
		}
		return "";
	}
		
	$(".btn-continue").on('click', function () {
		setCountryRestrictionCookie();
		modal.hide();
			
	});

	$(".btn-back").on('click', function () {
		goBack();
	});

});