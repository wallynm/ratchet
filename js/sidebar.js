/* ========================================================================
 * Ratchet: sidebar.js
 * http://goratchet.com/
 * ========================================================================
 * Licensed under MIT (https://github.com/twbs/ratchet/blob/master/LICENSE)
 * ======================================================================== */

 !(function () {
   'use strict';

   $('.ni-container').on('swipeleft swiperight', function(e) {
     var $el = $(e.target);
     var $el = $(e.target);

     // valida se o swipe esta sendo executado em um slider
     if ($el.parents('.ni-slider').length === 0) {
       if (e.type === 'swipeleft') {
         if ($el.closest('.ni-menu').length !== 0) {
           $el.closest('.ni-menu').prev('.ni-menu-checkbox:checked').prop( "checked", false );
         }
       } else {
         $('#menu').prop("checked", true);
       }
       
       toggleSidebarIcon();
     }
   });


   $('#ni-sidebar').on('tap', function() {
     toggleSidebarIcon();
   });

   $('.ni-overlay').on('tap', function() {
     $('.ni-menu-checkbox:checked').prop( "checked", false );
     toggleSidebarIcon();
   });

   $('.ni-menu').on('tap', function(e) {
     e.stopPropagation();
     var indx = $(e.target).is('label') ? -2 : -1;
     if( !$('.ni-menu-checkbox:checked + .ni-menu').eq(indx).is(this)){
       toggleSidebarIcon();
       $(this).find('.ni-menu-checkbox:checked').prop( "checked", false );
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

   var toggleSidebarIcon = function() {
     var icon = ($('.ni-menu-checkbox:checked').length === 0) ? false : true;
     $('#ni-sidebar').toggleClass('ni-active');
   }
 }());
