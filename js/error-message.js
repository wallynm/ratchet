(function($){
  var methods = {
    init : function(options) {
      console.warn(options);
      $(this).tooltip({
        title: options,
        trigger: 'manual'
      }).tooltip('show');
    }
  };

  $.fn.errorMessage = function(methodOrOptions) {
    return methods.init.apply( this, arguments );
  };
})( jQuery );