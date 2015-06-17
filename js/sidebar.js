/* ========================================================================
 * Ratchet: sidebar.js
 * http://goratchet.com/
 * ========================================================================
 * @Author: Wallysson Nunes
 * ======================================================================== */

 !(function () {
   'use strict';

   $('.ni-container').on('swipeleft swiperight', function(e) {
     var $el = $(e.target);
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
         $('#menu').prop("checked", true);
       }
     }
   });

   $('.ni-overlay').on('tap', function() {
     $('.ni-menu-checkbox:checked').prop("checked", false).trigger("change");
   });

   $('.ni-menu').on('tap', function(e) {
     e.stopPropagation();
     var indx = $(e.target).is('label') ? -2 : -1;
     if( !$('.ni-menu-checkbox:checked + .ni-menu').eq(indx).is(this)){
       $(this).find('.ni-menu-checkbox:checked').prop("checked", false).trigger("change");
     }
   });

   $('.ni-menu a').on('click', function(e) {
     var clickedMenu = $(this).parents('.ni-menu');
     var currentMenu = $('.ni-menu-checkbox:checked + .ni-menu:last');

     if(!clickedMenu.is(currentMenu)){
       clickedMenu.trigger('touchstart');
       return false;
     }
   });

   $('#ni-sidebar').on('click', function(e) {
     $(this).find('.ni-menu-checkbox:checked').prop("checked", false).trigger("change");
   });

   $('.ni-menu-checkbox').change(function(){
     var icon = ($('.ni-menu-checkbox:checked').length === 0) ? false : true;
     $('#ni-sidebar').toggleClass('ni-active', icon);
   });
 }());
