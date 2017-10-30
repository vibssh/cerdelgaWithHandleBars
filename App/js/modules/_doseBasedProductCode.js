var _DoseBasedProductCode = (function (window) {
  var _Settings = {
    $dataDose: sessionStorage.getItem('dose')
    
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
    
    for (var i = 0, len= $mainBookList.length; i < len; i++) {
      if ($mainBookList[i].getAttribute("data-dose") === 'true') {
        // This is not required in production. Just for Demo purpose to check which colour to give to list
        var className = _sectionColour(_Settings.$dataDose);
        $mainBookList[i].classList.add(className);
        var dosedItem = $mainBookList[i].querySelector('.book-check');
        var prodCode = dosedItem.getAttribute('data-prodcode');
        dosedItem.setAttribute('data-prodcode', prodCode + "-" + _sectionColour(_Settings.$dataDose));
      }
    }
  };

  return {
    init: init
  }
}(window));