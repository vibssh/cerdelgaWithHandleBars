var _Profile = (function (window) {
  'use strict';

  var _Settings = {
    // Tabs
    $trigger: $('.nurse-tab-link'),
    $tabs: $('.tabs'),

    /* Currently hard Coded to be 0 but when we get the login API we can tie this to the user profile */
    $nurseEndPoint: 'http://soa.cerdelga.tew-staging.com/api/Nurse/0',
    $treatmentCentreEndPoint: 'http://soa.cerdelga.tew-staging.com/api/TreatmentCentre/0',
    /* 0 is hard coded this should be tied up with the nurse data api  */

    $profileId: $('.link-profile').data('id'),

    $profileData: {
      'Nurse': [],
      'TreatmentCentre': []
    }

  };


  // Tabs
  var _nurseViewTabs = function ($clickedItem) {
    var tabId = $clickedItem.data('tab');
    var tab = $('.tabs[data-tab="' + tabId + '"]');

    // Remove Active from all the Triggers and only add to the clicked one
    $('.nurse-tab-link').removeClass('active');
    $clickedItem.addClass('active');

    // Remove Active from all Tabs and add to the clicked one
    $('.tabs').removeClass('active');
    tab.addClass('active');
  };

  // Nurse Data GET
  var _getNurseData = function () {
    // This is called on Login
    //Ajax Call Here using Multiple Simultaenous call
    return $.when(
      $.get(_Settings.$nurseEndPoint, function (data) {
        _Settings.$profileData.Nurse.push(data);
      }),

      $.get(_Settings.$treatmentCentreEndPoint, function (data) {
        _Settings.$profileData.TreatmentCentre.push(data);


      })
    ).then(_getNurseSuccess);

    //TEWLibrary.fetchData(_Settings.$nurseEndPoint, 'GET', {}).done(_getNurseSuccess).fail(_getNurseFailure);
  };

  var _getNurseSuccess = function () {
    /* This will render the Template */
    var $data = _Settings.$profileData;
    console.info('Nurse Data', $data);
   // $('.link-profile').bind('click'); // Rebinding the click event so that user can go back in the profile section if need be
  };

  // This methods pulls in the Template for Nurse Details View Pageb
  var _viewProfile = function(){
    var $data = _Settings.$profileData;
    _TemplateLoader.init('profile', $data);
  };


  var _getNurseFailure = function (xhr) {
    console.info(xhr.status);
  }

  var bindUIActions = function () {
    /* Nurse / Patient Name click Event on the top  */
    $('.link-profile').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      //Call Nurse Template
      _viewProfile();
    });


    //Tabs
    $(document).on('click', '.nurse-tab-link', function (e) {
      e.preventDefault();
      _nurseViewTabs($(this));
    });
  };

  // 
  return {
    init: bindUIActions,
    getNurseData: _getNurseData,
    settings: _Settings
  }

}());