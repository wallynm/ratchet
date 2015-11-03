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
      valueInputName: 'counter-value',
      customPlus: undefined,
      beforeCustomPlus: undefined,
      customMinus: undefined,
      beforeCustomMinus: undefined,
      maxLimitMsg: "O limite máximo foi atingido",
      minLimitMsg: "O limite minino foi atingido",
    };

    var settings = $.extend({}, defaults, options);

    // template do contador, com variação da classe que distingue os tipos de exibição.
    var template = '<div><div class="ni-more"><button type="button">+</button></div><input name="' + settings.valueInputName + '" class="ni-value" disabled="disabled" value="' + settings.min + '"/><div class="ni-less"><button type="button">-</button></div></div>';

    var getBaseClass = function(type) {
      return(type === 'inline') ? 'ni-counter' : 'ni-counter2';
    }

    return this.each(function() {
      var self = this;
      var $el = $(this);

      $el.updateValue = function(val) {
        // Fechando o Tooltip
        this.find('>div').tooltip('destroy');
        var currentVal = parseInt(this.find('.ni-value').val());
        var updateVal = currentVal + val;

        // Valida se o valor do contador esta acima do permitido
        if(updateVal > settings.max) {
          this.find('>div').tooltip({
            title: settings.maxLimitMsg
          }).tooltip('show');
          return;
        } else if(updateVal <= settings.min) {
          this.find('>div').tooltip({
            title: settings.minLimitMsg
          }).tooltip('show');
          return;
        }

        // Seta o valor no atributo
        this.find('.ni-value').val(updateVal);
      }

      if($el.data('type'))
        settings.type = $el.data('type');

      if($el.data('value'))
        settings.value = $el.data('value');

      if($el.data('value-name'))
        settings.valueInputName = $el.data('value-name');

      if($el.data('min')) {
        settings.min = $el.data('min');

        if(settings.value < settings.min) {
          settings.value = settings.min;
        }
      }

      if($el.data('max')) {
        settings.max = $el.data('max');
      }

      // Renderiza o template no elemento selecionado.
      var $tpl = $(template).addClass(getBaseClass(settings.type));

      // Aplica o template e atualiza seu value especifico
      $el.html($tpl).updateValue(settings.value);

      /* Evento de clique para incrementar o valor. */
      $el.find('.ni-more').on('click', function() {
        // Executa a função beforeCustomPlus caso tenha sido configurada
        if(typeof settings.beforeCustomPlus === 'function')
          beforeCustomPlus();

        $el.updateValue(+1, $el);

        // Executa a função customPlus caso tenha sido configurada
        if(typeof settings.customPlus === 'function')
          customPlus();
      });

      /* Evento de click para decrementar o valor */
      $(this).find('.ni-less').on('click', function() {
        // Executa a função beforeCustomMinus caso tenha sido configurada
        if(typeof settings.beforeCustomMinus === 'function')
          beforeCustomMinus();

        $el.updateValue(-1);

        // Executa a função customMinus caso tenha sido configurada
        if(typeof settings.customMinus === 'function')
          customMinus();

      });
    });
  };
})(jQuery);