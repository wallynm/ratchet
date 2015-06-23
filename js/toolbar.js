/* ========================================================================
 * Ratchet: toolbar.js
 * http://goratchet.com/
 * ========================================================================
 * @Author: Wallysson Nunes
 * ======================================================================== */

!(function () {
  'use strict';

  var isScrolledIntoView = function(elem) {
    var $elem = $(elem);
    var $window = $(window);
    var barHeight = $('.ni-toolbar').height();

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height() - barHeight;

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  };

  if ($('.ni-product-buy').length !== 0){
    $('.content').scroll(function() {
      var scrolled = isScrolledIntoView('.ni-product-buy');

      if (scrolled && $('.ni-toolbar').hasClass('ni-active')) {
        $('.ni-toolbar').toggleClass('ni-active');
      }

      if (!scrolled && !$('.ni-toolbar').hasClass('ni-active')) {
        $('.ni-toolbar').toggleClass('ni-active');
      }
    });
  }
}());
