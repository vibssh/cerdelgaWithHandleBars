var modalSettings,
  Modal = {
    settings: {
    },

    init: function (modalBackDrop, modalContent, modalDirection, modalTimeOut) {
      modalSettings = this.settings;
      modalSettings.$modalBackDrop = modalBackDrop;
      modalSettings.$modalContent = modalContent;
      modalSettings.$modalDirection = modalDirection;
      modalSettings.$modalTimeOut = modalTimeOut;

      /*On Load give direction to the Content to come from by adding class */
      modalSettings.$modalContent.addClass(modalSettings.$modalDirection);
    },

    
    modalPopOpen: function () {
      //Activating Modal
      modalSettings.$modalBackDrop.fadeIn().addClass('activate');
      setTimeout(function () {
        modalSettings.$modalContent.removeClass(modalSettings.$modalDirection);
      }, modalSettings.$modalTimeOut);

    },

    modalPopClose: function () {
      modalSettings.$modalContent.addClass(modalSettings.$modalDirection);
      modalSettings.$modalBackDrop.removeClass('activate').fadeOut();
    },
   
  };