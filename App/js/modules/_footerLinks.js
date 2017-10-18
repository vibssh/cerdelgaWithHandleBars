var _FooterLinks = (function(window){
  'use strict';
  var _loadClickedTemplate = function($clicked){
    
    var templateName = $clicked[0].className;
    _TemplateLoader.init(templateName);
  };

  var _bindUIActions = function(){
    $('.post-footer-right a').on('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      $("html, body").animate({ scrollTop: 0 }, 100);
      _loadClickedTemplate($(this));
      $('#content').addClass('pages');
    });
  };

  var _historyTrackFooterLinks = function(eventState){
    _HistoryBackModule.init(eventState);          
    $('.back-link').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        $("html, body").animate({ scrollTop: 0 }, 100);
        history.back();
    });
  };

  return {
    init: _bindUIActions,
    footerHistory: _historyTrackFooterLinks
  }

}(window));