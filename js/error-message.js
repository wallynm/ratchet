(function($){
  var destroyTimeout = undefined;
  var obj = {
    timeout: 5000,
    errorMesage : function(options) {
      obj.destroyMessage(obj.timeout);
      $(this).tooltip({
        title: options,
        trigger: 'manual',
        template: '<div class="tooltip tooltip-error" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
      }).tooltip('show');
    },

    destroyMessage: function(timer) {
    $('.tooltip-error').tooltip('destroy');

      // var t = timer | 0;
      // destroyTimeout = setTimeout(function(){ 
      //   $('.tooltip-error').fadeOut(function(){
      //     $('.tooltip-error').tooltip('destroy');
      //   });
      // }, t);
    }
  };

  $.fn.errorMessage = function(methodOrOptions) {
    return obj.errorMesage.apply( this, arguments );
  };
  $.fn.destroyErrorMessage = function(methodOrOptions) {
    return obj.destroyMessage.apply( this, arguments );
  };  
})( jQuery );