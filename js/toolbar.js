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
    var $content = $('.content');
    var toolbarHeight = $('.ni-toolbar').height();
    $content.css('padding-bottom', toolbarHeight);

    $content.scroll(function() {
      var scrolled = isScrolledIntoView('.ni-product-buy');

      // Caso o scroll chegue ao final da tela o metodo retorna true
      if ($content[0].scrollHeight - $content.scrollTop() - toolbarHeight <= $content.innerHeight()) {
        $('.ni-toolbar').addClass('ni-active');
        return;
      }

      if (scrolled && $('.ni-toolbar').hasClass('ni-active')) {
        $('.ni-toolbar').toggleClass('ni-active');
      }

      if (!scrolled && !$('.ni-toolbar').hasClass('ni-active')) {
        $('.ni-toolbar').toggleClass('ni-active');
      }
    });
  }
}());
