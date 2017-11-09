var _Profile = (function (window) {
  'use strict';

  var _Settings = {
    // Tabs
    $trigger: $('.nurse-tab-link'),
    $tabs: $('.tabs'),

    /* Currently hard Coded to be 0 but when we get the login API we can tie this to the user profile */
    $nurseEndPoint: 'http://soa-cerdelga.tew-dev.com/api/emsmock/getUser/',
    $treatmentCentreEndPoint: 'http://soa-cerdelga.tew-dev.com/api/TreatmentCentre',
    /* 0 is hard coded this should be tied up with the nurse data api  */

    $profileId: null,

    $profileData: {
      'Nurse': [],
      'TreatmentCentre': []
    },
    $bearerToken : ''

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

  //Nurse Data GET
  var _getNurseData = function ($clicked) {
    var userData = JSON.parse(sessionStorage.getItem("userData"));
    _Settings.$bearerToken = userData.Token;
    

    //Ajax Call to Get User Data
    var clickedId = $($clicked).data('id');
    var storedId = userData.UserId;
    _Settings.$profileId = (clickedId) ? clickedId : storedId;
    //_Settings.$profileId = $($clicked).data('id');

    //If currentTime is greater or equal to future time fire the _TokenHandler function to receive new Token
    var currentTime = new Date().getTime();
    var futureTime = new Date(userData.Expiry).getTime();
    console.info('Current Time ', currentTime);
    console.info('Future Time',  futureTime);

    if(currentTime >= futureTime) {
       console.info("currentTime is greater than future time i am firing getuser api")
       _TokenHandler.init();  
       _Settings.$bearerToken =  userData.Token;    
    }

    TEWLibrary.fetchData(_Settings.$nurseEndPoint + _Settings.$profileId, 'GET' , {$beforeSend: _getUserBeforeSend }).done(_getNurseSuccess).fail(_getNurseFailure);
  };

  var _getUserBeforeSend = function(xhr){
    xhr.setRequestHeader('Authorization', 'bearer '+ _Settings.$bearerToken);
  };



  var _getNurseSuccess = function (data) {
    /* This will render the Template */
    var nurseData = {
      'Id': data.Id,
      'FullName': data.FullName,
      'Email': data.Email,
      'TreatmentCentreId': data.TreatmentCentreId
    };

    _Settings.$profileData["Nurse"] = [];
    _Settings.$profileData.Nurse.push(nurseData);
    var $data = _Settings.$profileData;
    console.info('Nurse Data', $data);
    _TemplateLoader.init('profile', $data);

   // $('.link-profile').bind('click'); // Rebinding the click event so that user can go back in the profile section if need be
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
      _getNurseData($(this));
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