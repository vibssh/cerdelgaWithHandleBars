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

  var init = function () {

    var $mainBookList = document.querySelectorAll('.main-book-list')
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
        }
      }
    }

  };









  return {
    init: init
  }
}(window));