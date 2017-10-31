var _PAMResult = (function (window) {
  'use strict';
  var _bindUIActions = function () {
    
    /* Retake PAM Test */  
    $('.take-pam').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      _TakePAM.init();
    });

    $('.create-book').on('click',function(e){
      e.preventDefault();
      e.stopPropagation();
      var bookData = _BookData.init(); // Data to pass to the 
      console.info(bookData);
      _TemplateLoader.init('bookCreator',bookData);
      $('section#content').addClass('book-creator');
    });
  };

  return {
    init: _bindUIActions
  }
}(window));