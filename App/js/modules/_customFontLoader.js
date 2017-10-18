var _CustomFontLoader = (function (window) {

  /* Private Settings  */
  var _PrivateSettings = {
    customFonts: ['/fonts/Cabin-Regular.woff', '/fonts/Cabin-Bold.woff', '/fonts/Changa-Bold.woff', '/fonts/fontawesome-webfont.woff', '/fonts/MaterialIcons-Regular.woff2'],
    fontCSSFile: '/css/fastTrackFonts.css',
    isSuccess: false
  };

  /* Font Success */
  var _fontSuccess = function (data) {
    _PrivateSettings.isSuccess = true;
  }

  /* Font Failure Method */
  var _fontFailure = function (xhr) {
    console.info(xhr.status);
  };

 /* Append Font css */
  var _appendFontCss = function () {
    $("<link />")
      .appendTo($("head"))
      .attr({
        type: 'text/css',
        rel: 'stylesheet'
      })
      .attr('href', _PrivateSettings.fontCSSFile);
  };

  /* Ajax Fetch Fonts  */
  var _ajaxFetch = function () {
    return $.each(_PrivateSettings.customFonts, function (i, u) {
      $.ajax({
        url: u,
        beforeSend: function (xhr) {
          xhr.overrideMimeType("application/octet-stream");
        },
        async: false // this makes the global variable being access
      }).done(_fontSuccess).fail(_fontFailure);
    });
  };

  /* Public Init Method  */
  var init = function () {
    _ajaxFetch();
    if(_PrivateSettings.isSuccess){
      _appendFontCss();
    }
  };

  return {
    init: init
  }
}(window));
