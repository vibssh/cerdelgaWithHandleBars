var treatmentCentreChoice = {
  
  init: function() {
      this.bindUIActions();
  },

  bindUIActions: function() {
      $('.change-centre').on('click', function(e) {
          e.preventDefault();
          treatmentCentreChoice.showChoiceScreen();
      });
  },

  showChoiceScreen: function () {
      $('form').parent().addClass('hide-me');
      $('.treatment-centre-choice').removeClass('hide-me');
      
  }


};