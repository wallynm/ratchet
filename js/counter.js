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

(function( $ ){
  $.fn.counter = function(options) {

  	var defaults = {
			type : 'ni-counter',
			min  : 1,
			max  : 10,
			customPlus: undefined,
			beforeCustomPlus: undefined,
			customMinus: undefined,
			beforeCustomMinus: undefined,
			maxLimitMsg: "O limite máximo foi atingido",
			minLimitMsg: "O limite minino foi atingido",
    };

    var settings = $.extend( {}, defaults, options );

    // template do contador, com variação da classe que distingue os tipos de exibição.
    var template = '<div class="'+settings.type+'"><div class="ni-more"><button>+</button></div><div class="ni-value" data-value="'+settings.min+'">'+settings.min+'</div><div class="ni-less"><button>-</button></div></div>';

    return this.each (function() {
    	// Renderiza o template no elemento selecionado.
    	var el = $(template);
      var self = this;
      $(this).append(el);

      /* Evento de clique para incrementar o valor. */
      $(this).find('.ni-more').on('click', function() {
      	// Executa a função beforeCustomPlus caso tenha sido configurada.
      	if(typeof settings.beforeCustomPlus === 'function')
      		beforeCustomPlus();

      	// Fechando o Tooltip
      	$(el).tooltip('destroy');

      	// Elemento que exibe o valor do contador.
      	var $val = $(this).parent().find('.ni-value');

      	// Valor convertido para inteiro.
      	var num = parseInt($val.text()) + 1;

      	// Valida se o valor do contador esta acima do permitido.
      	if(num > settings.max) {
          $(el).tooltip({ title: settings.maxLimitMsg }).tooltip('show');
      		return;
      	}

      	// Seta o valor no atributo.
      	$val.text(num).attr("data-value", num);

      	// Executa a função customPlus caso tenha sido configurada.
      	if(typeof settings.customPlus === 'function')
      		customPlus();
      });

      /* Evento de click para decrementar o valor. */
      $(this).find('.ni-less').on('click', function() {

      	// Executa a função beforeCustomMinus caso tenha sido configurada.
      	if(typeof settings.beforeCustomMinus === 'function')
      		beforeCustomMinus();

      	// Destroi o Tooltip
      	$(el).tooltip('destroy');

      	// Elemento que exibe o valor do contador.
      	var $val = $(this).parent().find('.ni-value');

      	// Valor do elemento convertido para inteiro.
      	var num = parseInt($val.text()) - 1;

      	// Valida se o valor do contador esta abaixo do permitido.
      	if(num < settings.min) {
          $(el).tooltip({ title: settings.minLimitMsg }).tooltip('show');
      		return;
      	}

      	// Seta o valor no atributo.
      	$val.text(num).attr("data-value", num);

      	// Executa a função customMinus caso tenha sido configurada.
      	if(typeof settings.customMinus === 'function')
      		customMinus();
      });

    });
  };
})( jQuery );
