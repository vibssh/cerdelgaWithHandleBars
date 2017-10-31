var _DoseBasedProductCode = (function (window) {
  var _Settings = {
    $dataDose: ''
  };
  var _sectionColour = (function (data) {
    var color = {
      1: function () {
        return 'y';
      },

      2: function () {
        return 'b';
      },
      'default': function () {
        return '';
      }
    };
    return (color[data] || color['default'])();
  });

  var _previewDose = function(){
    var $mainBookList = document.querySelectorAll('.main-book-list');
    _Settings.$dataDose = sessionStorage.getItem('dose');

    for (var i = 0, len = $mainBookList.length; i < len; i++) {
      if ($mainBookList[i].getAttribute("data-dose") === 'true') {
        var dosedItem = $mainBookList[i].querySelector('.book-check');
        var prodCode = dosedItem.getAttribute('data-prodcode');
        dosedItem.setAttribute('data-prodcode', prodCode + "-" + _sectionColour(_Settings.$dataDose));

        //Dose level given to preview link 
        var previewLink = $mainBookList[i].querySelectorAll('.preview-link');

        for (var p = 0, len = previewLink.length; p < len; p++) {
          var previewElement = previewLink[p];
          previewElement.setAttribute('data-level', _Settings.$dataDose); // Giving preview link the dose level 
          var previewFileUrl = previewElement.getAttribute('data-fileurl');
          previewElement.setAttribute('data-fileurl', previewFileUrl + _Settings.$dataDose);
        }
      }
    };
  };

  var _previewLink = function(){
    //Preview Link To get as per data level 
    var $previewLink = document.querySelectorAll('.preview-link');
    
    var previewLinkToGetLevel = $('.preview-link:not([data-is="false"])');
    var dataLevelSession = sessionStorage.getItem('pam-level');
    
    $(previewLinkToGetLevel).attr('data-level', dataLevelSession);

    $(previewLinkToGetLevel).each(function(i, obj){
      var dataFileUrl = obj.getAttribute('data-fileurl');
      obj.setAttribute('data-fileurl', dataFileUrl + dataLevelSession);
    });
  };

  var bindUIActions = function(){

    // Accordian for list of Books
    var $triggers = $('.main-book-list-item');
    var $contents = $('.book-section');
    $triggers.each(function(i, obj){
      $(obj).on('click',function(){
        var $trigger = $(this);
        TEWLibrary.accordian( $trigger, $triggers, $contents );
      });
    });

  };

  var init = function () {
    _previewDose();
    _previewLink();
  };

  return {
    init: init,
    eventHandler: bindUIActions
  }
}(window));