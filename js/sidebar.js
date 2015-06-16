/* ========================================================================
 * Ratchet: sidebar.js
 * http://goratchet.com/
 * ========================================================================
 * Licensed under MIT (https://github.com/twbs/ratchet/blob/master/LICENSE)
 * ======================================================================== */

 !(function () {
   'use strict';

   $('.ni-overlay').on('touchstart', function() {
     $('.ni-menu-checkbox:checked').prop( "checked", false );
   });

   $('.ni-menu').on('touchstart', function(e) {
     e.stopPropagation();
     var indx = $(e.target).is('label') ? -2 : -1;
     if( !$('.ni-menu-checkbox:checked + .ni-menu').eq(indx).is(this)){
       $(this).find('.ni-menu-checkbox:checked').prop( "checked", false );
     }
   });

   $('.ni-menu a').on('touchstart', function(){
     var clickedMenu = $(this).parents('.ni-menu');
     var currentMenu = $('.ni-menu-checkbox:checked + .ni-menu:last');
     if(!clickedMenu.is(currentMenu)){
       clickedMenu.trigger('touchstart');
       return false;
     }
   });
 }());
