var _HistoryBackModule = (function (window) {
  'use strict';
  
  var init = function () {
    history.back();
    $(window).on('hashchange', function(){
      var $hashLink = location.hash.split('#')[1];
      var data = function($hashLink){
          var dataHandler = {
            "pamQuestionnaire" : function(){
                return _pamQuestionnaireData.init();
            },

            "profile" : function(){
              return _Profile.settings.$profileData;
            },

            "bookCreator": function(){
              return _BookData.init();
            },

            "default" : function(){
              return undefined;
            }
          };

          return (dataHandler[$hashLink] || dataHandler['default'])();
      };

      var $data =  data($hashLink) || undefined;
      console.info('i am triggered again ', $data);
      _TemplateLoader.init($hashLink, $data);
    });
    
  }

  return {
    init: init
  }
}(window));