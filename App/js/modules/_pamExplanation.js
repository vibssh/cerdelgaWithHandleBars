var _PAMExplanation = (function (window) {
  'use strict';

  /* PAM Explanation from Result Page */
  var init = function (el) {
    $(el).on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      _TemplateLoader.init('pamExplanation');
    });
  };

  return {
    init: init
  }

}(window));