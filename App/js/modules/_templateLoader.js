var _TemplateLoader = (function (window) {
  'use strict';
  var init = function (tplName, data) {
   var $tplName = tplName || location.hash.split('#')[1] || undefined;
   var $data = data || undefined;
   var Template = Cerdelga.templates[$tplName]($data);
   $('#content').html(Template);
   location.hash = tplName;
  };

  return {
    init: init
  }
}(window));