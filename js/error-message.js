(function($){
  var methods = {
    init : function(options) {
      console.warn(options);
      $(this).tooltip({
        title: options,
        trigger: 'manual',
        template: '<div class="tooltip tooltip-error" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
      }).tooltip('show');
    }
  };

  $.fn.errorMessage = function(methodOrOptions) {
    return methods.init.apply( this, arguments );
  };
})( jQuery );