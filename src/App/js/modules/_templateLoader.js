var _TemplateLoader = (function (window) {
  'use strict';
  var init = function (tplName, data) {
    var $tplName = tplName || location.hash.split('#')[1] || undefined;
    var $data = data || undefined;
    var Template = Cerdelga.templates[$tplName]($data);
    $('#content').html(Template);
    location.hash = tplName;

    /* To stop get the window to the top when template is changed because of hashlink */
    setTimeout(function () {
      window.scrollTo(0, 0);
    }, 1);
  };
  return {
    init: init
  }
}(window));