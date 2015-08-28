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
 * @Author: Luiz Gustavo, Wallysson Nunes
 * ======================================================================== */

(function($) {
  $.fn.counter = function(options) {

    var defaults = {
      type: 'inline',
      min: 1,
      max: 10,
      value: 0,
      customPlus: undefined,
      beforeCustomPlus: undefined,
      customMinus: undefined,
      beforeCustomMinus: undefined,
      maxLimitMsg: "O limite máximo foi atingido",
      minLimitMsg: "O limite minino foi atingido",
    };

    // template do contador, com variação da classe que distingue os tipos de exibição.
    var template = '<div><div class="ni-more"><button>+</button></div><div class="ni-value" data-value="' + settings.min + '">' + settings.min + '</div><div class="ni-less"><button>-</button></div></div>';

    var getBaseClass = function(type) {
      return(type === 'inline') ? 'ni-counter' : 'ni-counter2';
    }

    var updateValue = function(num, $el) {
      // Fechando o Tooltip
      $el.find('>div').tooltip('destroy');

      // Valida se o valor do contador esta acima do permitido
      if(num > settings.max) {
        $el.find('>div').tooltip({
          title: settings.maxLimitMsg
        }).tooltip('show');
        return;
      } else if(num < settings.min) {
        $el.find('>div').tooltip({
          title: settings.minLimitMsg
        }).tooltip('show');
        return;
      }

      // Seta o valor no atributo
      $el.data('value', num);
      $el.find('.ni-value').text(num);
    }

    var settings = $.extend({}, defaults, options);

    return this.each(function() {
      var self = this;
      var $el = $(this);

      if($el.data('type'))
        settings.type = $el.data('type');

      if($el.data('value'))
        settings.value = $el.data('value');

      if($el.data('min')) {
        settings.min = $el.data('min');

        if(settings.value < settings.min) {
          settings.value = settings.min;
        }
      }

      if($el.data('max')) {
        settings.max = $el.data('max');
      }

      if(typeof $el.data('value') === 'undefined') {
        $el.data('value', settings.value);
      }

      // Renderiza o template no elemento selecionado.
      var $tpl = $(template).addClass(getBaseClass(settings.type));

      // Aplica o template
      $el.html($tpl);

      updateValue(settings.value, $el);

      /* Evento de clique para incrementar o valor. */
      $el.find('.ni-more').on('click', function() {
        // Executa a função beforeCustomPlus caso tenha sido configurada
        if(typeof settings.beforeCustomPlus === 'function')
          beforeCustomPlus();

        updateValue($el.data('value') + 1, $el);

        // Executa a função customPlus caso tenha sido configurada
        if(typeof settings.customPlus === 'function')
          customPlus();
      });

      /* Evento de click para decrementar o valor */
      $(this).find('.ni-less').on('click', function() {

        // Executa a função beforeCustomMinus caso tenha sido configurada
        if(typeof settings.beforeCustomMinus === 'function')
          beforeCustomMinus();

        updateValue($el.data('value') - 1, $el);

        // Executa a função customMinus caso tenha sido configurada
        if(typeof settings.customMinus === 'function')
          customMinus();

      });
    });
  };
})(jQuery);
