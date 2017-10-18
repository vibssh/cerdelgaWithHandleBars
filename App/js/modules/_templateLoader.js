var _TemplateLoader = (function(window){
  'use strict';
  var init = function(tplName, data){
   var $data = data  || undefined;
    var Template = Cerdelga.templates[tplName]($data);
    $('#content').html(Template);
    var stateObj = {
      'Tpl': tplName
    };
    history.pushState(stateObj, tplName, tplName + '.html');
  };

  return {
    init: init
  } 
}(window));
