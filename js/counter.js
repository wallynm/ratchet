
(function($) {
  $.fn.counter = function(options) {

    var defaults = {
      type: 'inline',
      min: 1,
      max: 10,
      value: undefined,
      name: 'counter-value',
      customPlus: undefined,
      beforeCustomPlus: undefined,
      customMinus: undefined,
      updateMin: undefined,
      beforeCustomMinus: undefined,
      maxLimitMsg: "limite máximo atingido",
      minLimitMsg: "limite mínimo atingido",
    };

    var settings = $.extend({}, defaults, options);

    var getBaseClass = function(type) {
      return(type === 'inline') ? 'ni-counter' : 'ni-counter2';
    }

    this.updateMaxMin = function(val) {
      $counter = $(this);
      $counter.data('min', val.min);
      $counter.data('max', val.max);

      this.find('.ni-value').val(val.min);
    };

    return this.each(function() {
      var self = this;
      var $el = $(this);

      $el.updateValue = function(val) {
        // Fechando o Tooltip
        this.find('>div').tooltip('destroy');
        var currentVal = parseInt(this.find('.ni-value').val());
        var updateVal = currentVal + val;

        // Valida se o valor do contador esta acima do permitido
        if(updateVal > $el.data('max')) {
          this.find('>div').tooltip({
            title: settings.maxLimitMsg,
            trigger: 'manual'
          }).tooltip('show');
          return;
        } else if(updateVal < $el.data('min')) {
          this.find('>div').tooltip({
            title: settings.minLimitMsg,
            trigger: 'manual'
          }).tooltip('show');
          return;
        }

        settings.value = updateVal;

        // Seta o valor no atributo
        this.find('.ni-value').val(updateVal);
      }

      if($el.data('type'))
        settings.type = $el.data('type');

      if($el.data('name'))
        settings.name = $el.data('name');

      if($el.data('min'))
        settings.min = $el.data('min');

      if($el.data('value')) {
        settings.value = $el.data('value');
      } else {
        settings.value = settings.min;
      }

      if($el.data('max')) {
        settings.max = $el.data('max');
      }

      // Renderiza o template no elemento selecionado.
      var $tpl = $('<div><div class="ni-more"><button type="button">+</button></div><input name="' + settings.name + '" class="ni-value" readonly="readonly" value="' + settings.value + '"/><div class="ni-less"><button type="button">-</button></div></div>')
      .addClass(getBaseClass(settings.type));

      // Aplica o template e atualiza seu value especifico
      $el.html($tpl);

      /* Evento de clique para incrementar o valor. */
      $el.find('.ni-more').on('click', function() {
        // Executa a função beforeCustomPlus caso tenha sido configurada
        if(typeof settings.beforeCustomPlus === 'function')
          settings.beforeCustomPlus.call(this);                   

        $el.updateValue(+1);

        // Executa a função customPlus caso tenha sido configurada
        if(typeof settings.customPlus === 'function')
          settings.customPlus.call(this);
      });

      /* Evento de click para decrementar o valor */
      $(this).find('.ni-less').on('click', function() {
        // Executa a função beforeCustomMinus caso tenha sido configurada
        if(typeof settings.beforeCustomMinus === 'function')
          settings.beforeCustomMinus.call(this);

        $el.updateValue(-1);

        // Executa a função customMinus caso tenha sido configurada
        if(typeof settings.customMinus === 'function')
          settings.customMinus.call(this);          
      });
    });
  };
})(jQuery);