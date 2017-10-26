var _HistoryBackModule = (function (window) {
  'use strict';
  

  var init = function () {
    $(window).on('popstate', function (event) {
      var $hashLink = location.hash.split('#')[1];
      var data = function($hashLink){
          var dataHandler = {
            "pamQuestionnaire" : function(){
                return _pamQuestionnaireData.init();
            },

            "profile" : function(){
              return _Profile.getNurseData();
            },

            "default" : function(){
              return undefined;
            }
          };

          return (dataHandler[$hashLink] || dataHandler['default'])();
      };

      var $data =  data($hashLink) || undefined;
      console.info($data);
      var Template = Cerdelga.templates[$hashLink]($data);
      $('#content').html(Template);
      
      //var Template = Cerdelga.templates[$hashLink]($data);
      //$('#content').html(Template);
    });
  }

  return {
    init: init
  }
}(window));