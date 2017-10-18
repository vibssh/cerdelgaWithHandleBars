var _TakePAM = (function () {

  var init = function(){
    //Resetting the PAM settings here
    $('#pam-result-beforeSend').empty();
    pamSettings.naAnswers = 0;
    pamSettings.stronglyDisagreeAnswers = 0;
    pamSettings.agreeAnswers = 0;
    pamSettings.stronglyAgreeAnswers = 0;
    pamSettings.answers=[];
   
    var questionData = _pamQuestionnaireData.init();
    _TemplateLoader.init('pamQuestionnaire', questionData);    
}

  return {
    init: init
  }
}());



