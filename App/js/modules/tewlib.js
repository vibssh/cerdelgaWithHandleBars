/*TEW Lib
 * Author   : Leo Jacobs
 * Company  : The Earthworks
 * Email    : leo@the-earthworks.com
 * DOC      : 18.11.2016
 */

// Checking for Namespace if it exists use that or create a new one
(function (window) {
  'use strict';

  function tewLibFunction() {
      var tewLibObj = { 
          //Accordian
          accordian: function (trigger, triggers, contents) {

              $.each(trigger, function (i) {
                  var thisTrigger = trigger[i];
                  var nextItem = $(thisTrigger).next();

                  if (nextItem.is(":visible")) {
                      nextItem.slideUp();
                      $(thisTrigger).removeClass('selected');
                  } else {
                      contents.slideUp();
                      triggers.removeClass('selected');
                      nextItem.slideDown();
                      $(thisTrigger).addClass('selected');
                  }
              });

          },

          //Ajax Utility
          fetchData: function ($endpoint, $method, options) {
              var options = options || {};
              var $data = options.$data || null || undefined;
              var $beforeSend = options.$beforeSend || null || undefined;
              var $dataType = options.$dataType || 'json';
              return $.ajax({
                  url: $endpoint,
                  type: $method,
                  dataType: $dataType,
                  crossDomain: true,
                  data: $data,
                  beforeSend: $beforeSend
              });
          },

          //Ajax Error Handler
          ajaxErrorHandler: function ($xhrStatus) {
              var errorCode = {
                  0: function () {
                      return 0;
                  },
                  302: function () {
                      return 302;
                  },
                  400: function () {
                      return 400;
                  },
                  401: function () {
                      return 401;
                  },
                  403: function () {
                      return 0;
                  },
                  404: function () {
                      return 404;
                  },
                  409: function() {
                      return 409;
                  },
                  418: function () {
                      return 418;
                  },
                  500: function () {
                      return 500;
                  },
                  502: function () {
                      return 502; 
                  },
                  'default': function () {
                      return 'unknown';
                  }

              };
              return (errorCode[$xhrStatus] || errorCode['default'])();
          }
      };
      return tewLibObj;
  };

  if (typeof (window.TEWLibrary) === 'undefined' || typeof jQuery !== 'undefined') {
      window.TEWLibrary = tewLibFunction();
  }

}(window));