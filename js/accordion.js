/* ========================================================================
 * Ratchet: sidebar.js
 * http://goratchet.com/
 * ========================================================================
 * @Author: Wallysson Nunes
 * ======================================================================== */
!(function () {
  'use strict';

 	//Abre o accordion
  $('.ni-accordion-section-header').on('tap', function(e) {
    // Pega o ID setado na aba para abrir o content corret
    var $el      = $(this);
    var $section = $el.parents('.ni-accordion-section');
    var $content = $section.find('.ni-accordion-section-content');
    var $openSections = $('.ni-accordion-section.ni-active');

    $openSections.removeClass('ni-active');
    $openSections.find('.ni-accordion-section-content').slideToggle(300);

    $section.toggleClass('ni-active');
    $content.slideToggle(300);

    e.preventDefault();
  });
}());
