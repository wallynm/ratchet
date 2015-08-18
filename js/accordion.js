/* ================================================================================
 *       ▄▄▄▄▄▄▄        ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄   ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
 *     ▓▓▓▓▓▓▓█▓▓▓▄    ▓▓▓▓▓███████████████████████████████████  ████████████████▓▓
 *   ▓▓▓▓▓▓▌   ▓▓▓▓▓▄ ▓▓▓▓▌                                             ▓▓▓▓░
 *  ▓▓▓▓▓██▀  ▓▓▓▓▓▓  ▓▓▓▓▄▄▄▄▄▄▄▄▄▄▄▄▄    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄          ▓▓▓▓░
 * '▓▓▓▓▓▄▄   ▓▓▓▓▓▓▓▌  ▀▀███████████▓▓▓▓▓▄  ██████████████████         ▓▓▓▓░
 * '▓▓▓▓▓▓▓   ▓▓▓▓▓▓▓                 ▓▓▓▓▓                             ▓▓▓▓░
 *  ╙▓▓▓▓▓▌   ▓▓▓▓▓▓▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▓▓▓▓▓█  ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄         ▓▓▓▓░
 *    ╙█▓▓     ████████████████████████▀▀   ██████████████████          ▓▓▓▓░
 *
 * ========================================================================
 * @Author: Luiz Gustavo, Wallysson Nunes
 * ======================================================================== */

!(function () {
  'use strict';

  //Abre o accordion
  $('.ni-accordion-section-header').on('click', function(e) {
    // Pega o ID setado na aba para abrir o content corret
    var $el      = $(this);
    var $section = $el.parents('.ni-accordion-section');
    var $content = $section.find('.ni-accordion-section-content');
    var $openSections = $('.ni-accordion-section.ni-active');
    var currentState  = $section.hasClass('ni-active');
    var aniTiming = 'fast';

    // Desativa todos os accordions e os fecha com o slideToggle
    $openSections.removeClass('ni-active');
    $openSections.find('.ni-accordion-section-content').slideToggle(aniTiming);

    // Caso o elemento clicado esteja fechado
    if (!currentState) {
      // Ativa o accordion e abre o conteudo
      $section.toggleClass('ni-active');
      $content.slideToggle(aniTiming, function() {

        // Para conseguir armazenar o offsetSection eu preciso fazer alguns calculos uma
        // vez que o parent dele e absolute fazendo com que nao funcione como esperado
        var offsetSection = $('.ni-active.ni-accordion-section').height() + ($('.ni-active.ni-accordion-section').offset().top - $(window).height());
        var scrollTo = offsetSection + $('.content').scrollTop();

        // Apenas aplica o scrollTo caso o elemento ainda nao esteja visivel
        if (offsetSection > 0) {
          $('.content').animate({ scrollTop: scrollTo }, aniTiming);
        }
      });
    }

    e.preventDefault();
  });
}());
