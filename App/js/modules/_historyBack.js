var _HistoryBackModule = (function (window) {
  'use strict';

  var _updateContent = function (stateObj) {
    if (stateObj) {
      var url = stateObj.Tpl;
      var templ = Cerdelga.templates[url];
      $('#content').html(templ);
    }
  };

  var init = function (eventState) {
    $(window).on('popstate', function () {
      _updateContent(eventState);
    });
  }

  return {
    init: init
  }
}(window));