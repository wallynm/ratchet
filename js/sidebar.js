/* ================================================================================
 *       ▄▄▄▄▄▄▄        ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄   ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
 *     ▓▓▓▓▓▓▓█▓▓▓▄    ▓▓▓▓▓███████████████████████████████████  ████████████████▓▓
 *   ▓▓▓▓▓▓▌   ▓▓▓▓▓▄ ▓▓▓▓▌                                             ▓▓▓▓░
 *  ▓▓▓▓▓██▀  ▓▓▓▓▓▓█ ▓▓▓▓▄▄▄▄▄▄▄▄▄▄▄▄▄    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄          ▓▓▓▓░
 * '▓▓▓▓▓▄▄   ▓▓▓▓▓▓▓▌  ▀▀███████████▓▓▓▓▓▄  ██████████████████         ▓▓▓▓░
 * '▓▓▓▓▓▓▓   ▓▓▓▓▓▓▓                 ▓▓▓▓▓                             ▓▓▓▓░
 *  ╙▓▓▓▓▓▌   ▓▓▓▓▓▓▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▓▓▓▓▓█  ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄         ▓▓▓▓░
 *    ╙█▓▓     ████████████████████████▀▀   ██████████████████          ▓▓▓▓░
 *
 * ========================================================================
 * @Author: Wallysson Nunes
 * ======================================================================== */
!(function () {
   'use strict';
   var $overlay = $('.ni-overlay');

   var closeMenu = function($target) {
     var $target = (typeof target !== 'undefined') ? target : $('.ni-menu-checkbox:checked');
     $target.prop("checked", false).trigger("change");
   };

   $('.ni-container').on('swipeleft swiperight', function(e) {
     var $el = $(e.target);

     // valida se o swipe esta sendo executado em um slider
     if ($el.parents('.ni-slider').length === 0) {
       if (e.type === 'swipeleft') {
         var $menu = $el.closest('.ni-menu');
         if ($menu.length !== 0) {
           $menu.prev('.ni-menu-checkbox:checked').prop( "checked", false ).trigger("change");
           $menu.find('.ni-menu-checkbox:checked').prop( "checked", false ).trigger("change");
         }
       } else {
         $('#menu').prop("checked", true).trigger("change");
       }
     }
   });

   $overlay.on('click', function() {
     closeMenu();
   });

   $('.ni-menu a').on('click', function(e) {
    var clickedMenu = $(this).parents('.ni-menu');
    var currentMenu = $('.ni-menu-checkbox:checked + .ni-menu:last');

    if(!clickedMenu.is(currentMenu)){
      clickedMenu.trigger('touchstart');
      return false;
    }
  });

   $('.ni-menu-checkbox').change(function(e){
     $('.ni-menu').removeClass('ni-active');
     $('.ni-menu-checkbox:checked + .ni-menu ').last().addClass('ni-active');

     var status = ($('.ni-menu-checkbox:checked').length === 0) ? false : true;
     $('#ni-sidebar').toggleClass('ni-active', status);
     $('body').toggleClass('no-scroll', status);
   });
 }());
