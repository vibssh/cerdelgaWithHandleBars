/* Global Variables to be used throughout the applications */
var _NurseEndPoint = 'http://soa.cerdelga.tew-dev.com/api/Nurse/';
var _TreatmentEndPoint = 'http://soa.cerdelga.tew-dev.com/api/TreatmentCentre/';
var _IsLoggedInEndPoint = 'http://soa.tew-dev.com/api/emsmock/isLoggedin/';

var _HandlebarsTemplate = (function (window) {

  var _header = function () {
   
    var headerTpl = Cerdelga.templates.header; // Without any data being passed
    $('#header').append(headerTpl);
  }; 

  var _footer = function () {
    
    var footerTpl = Cerdelga.templates.footer;
    $('#footer').append(footerTpl);
  };

  var _login = function () {
    _TemplateLoader.init('login');

  };

  var init = function () {
    _header();
    _footer();
    _login();
  }

  return {
    init: init
  }

}(window));