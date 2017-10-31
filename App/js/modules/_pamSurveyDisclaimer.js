var pamSurveyDisclaimer = {
    settings: {
        $pamWarning: $('.pam-create'),
        $personalisedWarning: $('.personalised-choice'),
        $pamButton: $('.pam-warning-button'),
        $personalisedButton: $('.personalised-warning-button')
    },
    init: function () {
        this.bindUIActions();

        /* Check if the Local storage exists if it does than dont show the entire block */
        if (localStorage.getItem("pamChoice") === null) {
            $('.pam-create').removeClass('hide-me');
        } else {
            $('.pam-create').addClass('hide-me');
        }


        if (localStorage.getItem("personalisedChoice") === null) {
            $('.personalised-choice').removeClass('hide-me');
        } else {
            $('.personalised-choice').addClass('hide-me');
        }


        /*If the user is logged out or navigated to the Home page which in this case is the login page then remove the localStorage */
        //if (window.location.pathname === '/') {
        //    localStorage.removeItem("pamChoice");
        //    localStorage.removeItem("personalisedChoice");
        //}

    },
    bindUIActions: function () {
        $(document).on('click', '.pam-warning-button', function (e) {
            e.preventDefault();
            pamSurveyDisclaimer.pamDisclaimerOff($('.pam-create'));
        });

        $(document).on('click', '.personalised-warning-button', function (e) {
            e.preventDefault();
            pamSurveyDisclaimer.personalisedDisclaimerOff($('.personalised-choice'));
        });

        //Questionnaire button click event
        $('.select-questionnaire').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var questionData = _pamQuestionnaireData.init();
            _TemplateLoader.init('pamQuestionnaire',questionData );
        });

        //Create a book button click event
        $('.select-bookcreator').on('click', function (e) {
            console.info('bookcreator link clicked');
            e.preventDefault();
            e.stopPropagation();
            _TemplateLoader.init('personalisedPack');
            // var welcomeTPL = Cerdelga.templates.welcome;
            // $('#content').html(welcomeTPL);
        });

    },
    pamDisclaimerOff: function (warning) {
        warning.addClass('hide-me');
        localStorage.setItem('pamChoice', 'yes');
    },

    personalisedDisclaimerOff: function (warning) {
        warning.addClass('hide-me');
        localStorage.setItem('personalisedChoice', 'yes');
    }

};