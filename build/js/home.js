$(document).ready(function() {
  scroll()
  rolloverLogo()
  initMap()
  burgerMenu()
  // addScrollListener()
})

// CALL JSON FILE & RETRIEVE DATA-SET
var mapStyle = (function() {
    $.ajax({
        'async': false,
        'global': false,
        'url': "../js/data-sets/map.json",
        'dataType': "json",
        'success': function(data) {
            mapStyle = data;
        }
    })
    return mapStyle;
})()

function initMap() {
  var uluru = { lat: 51.541310, lng: -0.076217 };
  var mapOptions = {
    zoom: 14,
    center: uluru,
    mapTypeId: 'roadmap',
    disableDefaultUI: true,
    gestureHandling: 'none',
    styles: mapStyle
    // disableDoubleClickZoom: true,
    // scrollwheel:  false,
    // zoomControl: false,
    // draggable: false,
    // scaleControl: true,
  };

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  var iconBase = '../images/';
  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    icon: iconBase + 'icon-pin.png'
  });

  const shepsBarUrl = "https://www.google.co.uk/maps/place/Shep's/@51.5412938,-0.0782348,17z/data=!3m1!4b1!4m5!3m4!1s0x48761c93ff82b983:0xde9fb412f41062e2!8m2!3d51.5412905!4d-0.0760461"

  marker.addListener('click', function() {
    window.open(shepsBarUrl)
   });
}

function scroll() {
  $("a").on('click', function(event) {

    if (this.hash !== "") {
      event.preventDefault()
      var hash = this.hash
      var isCocktail = hash === '#cocktails'

      var baseOffset = $(hash).offset().top
      var offset = isCocktail
        ? baseOffset - 120
        : baseOffset

      $('html, body').animate({
        scrollTop: offset
      }, 330);
    }
  });
}

// var lastKnownScrollPosition = 0;
// var ticking = false;
//
// function handleChangeFonts(scrollPosition) {
//   var menuItem = $('.menuItem')
//   var burgerMenu = $('.burger-menu-piece')
//   console.log(scrollPosition)
//   if (scrollPosition >= 1091 && scrollPosition <= 2816) {
//     menuItem.addClass('menuItemDark')
//     burgerMenu.addClass('burgerMenuDark')
//   } else {
//     menuItem.removeClass('menuItemDark')
//     burgerMenu.removeClass('burgerMenuDark')
//   }
// }

function addScrollListener() {
  window.addEventListener('scroll', function(e) {
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function() {
        handleChangeFonts(lastKnownScrollPosition);
        ticking = false;
      });

      ticking = true;
    }
  });
}

function burgerMenu() {
  var clickDelay = 500
  var clickDelayTimer = null

  $('.burger-menu').on('click', function () {

    if(clickDelayTimer === null) {
      this.classList.toggle("change");
      $(".menu").toggleClass("reveal");

      var $burger = $(this)
      $burger.toggleClass('active')
      $burger.parent().toggleClass('is-open')

      if(!$burger.hasClass('active')) {
        $burger.addClass('closing')
      }

      clickDelayTimer = setTimeout(function () {
        $burger.removeClass('closing')
        clearTimeout(clickDelayTimer)
        clickDelayTimer = null
      }, clickDelay)
    }
  })
}


function rolloverLogo() {
  $("#logoBar").hover(function() {
    $(".home").toggleClass("pattern-1");
  });

  $("#logoKorean").hover(function() {
    $(".home").toggleClass("pattern-2");
  });

  $("#logoRestaurant").hover(function() {
    $(".home").toggleClass("pattern-3");
  });
}
