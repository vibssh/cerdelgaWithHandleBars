var _TemplateLoader = (function (window) {
  'use strict';
  var init = function (tplName, data) {
   var $tplName = tplName || location.hash.split('#')[1] || undefined;
   var $data = data || undefined;
   var Template = Cerdelga.templates[$tplName]($data);
   $('#content').html(Template);
   location.hash = tplName;
   
    // location.hash = tplName;
    // var pathName = location.pathname.split('/')[1];
    // var previousTplName = pathName.substr(0, pathName.indexOf('.')); 
    // var stateObj = {
    //   'Tpl': tplName,
    //   'previous_url': previousTplName
    // };
    // history.pushState(stateObj, tplName, tplName + '.html');

    //On hashchange make the template different
    //console.info('window location ', window.location.hash);

  };

  return {
    init: init
  }
}(window));