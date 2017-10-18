var isLoggedInSettings,
isLoggedInModule = {
     settings : {
         $isLoggedIn : null
     },

    init: function() {
        isLoggedInSettings = this.settings;

        //Getting the session Storage item which was set on the successful login 
        isLoggedInSettings.$isLoggedIn = sessionStorage.getItem('isLoggedIn');

        //This is to redirect the user to login page is its false
        if (isLoggedInSettings.$isLoggedIn === 'false' || isLoggedInSettings.$isLoggedIn === null) {
            location.reload();
        }

        this.bindUIActions(); 

    },

    bindUIActions: function() {
        //Ajax POSTING
        var $isLoggedInEndPoint = _IsLoggedInEndPoint + isLoggedInSettings.$isLoggedIn;
        TEWLibrary.fetchData($isLoggedInEndPoint, 'GET', {}).done(isLoggedInModule.success).fail(isLoggedInModule.fail);
    },

    //isLoggedIn Success
    success: function (data) {
        console.info(data);
    },

    fail: function (response) {
        console.info(response);
    }
};
