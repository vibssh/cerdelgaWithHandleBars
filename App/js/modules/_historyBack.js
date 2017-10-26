var _HistoryBackModule = (function (window) {
  'use strict';
  

  var init = function (eventState) {
    $(window).on('popstate', function (event) {
      var $hashLink = location.hash.split('#')[1];
      
      console.info('History Back Module', $hashLink);
      var data = function($hashLink){
          var dataHandler = {
            "pamQuestionnaire" : function(){
                return _pamQuestionnaireData.init();
            },

            "default" : function(){
              return undefined;
            }
          };

          return (dataHandler[$hashLink] || dataHandler['default'])();
      };

      var $data =  data($hashLink);
      var Template = Cerdelga.templates[$hashLink]($data);
      $('#content').html(Template);
      location.hash = $hashLink;
      
      //var Template = Cerdelga.templates[$hashLink]($data);
      //$('#content').html(Template);
    });
  }

  return {
    init: init
  }
}(window));