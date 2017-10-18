String.prototype.replaceAll = function (target, replacement) {
    return this.split(target).join(replacement);
};

var pamSettings,
    pamLevels = {
        settings: {
            enrolTpl: {
                ClientExtId: "994959312",
                ClientPassKey: "fum4Umpqua8e",
                SubGroupExtId: "568471853",
                ThirdPartyIdentifier: "",
                PrimaryEmail: "no-reply@the-earthworks.com"
            },
            submitQuestionnaireData: '',
            $pamEnrolEndpoint: 'http://soa.cerdelga.tew-staging.com/api/pam/enrol/uat',
            $pamSubmitEndpoint: 'http://soa.cerdelga.tew-staging.com/api/pam/submit/uat',
            answers: [],
            stronglyDisagreeAnswers: 0,
            disAgreeAnswers: 0,
            agreeAnswers: 0,
            stronglyAgreeAnswers: 0,
            naAnswers: 0
        },

        init: function () {
            pamSettings = this.settings;
            this.bindUIActions();
            
            console.info('Answers :', pamSettings.answers);
            console.info('pamSettings.naAnswers ', pamSettings.naAnswers);
            console.info('pamSettings.stronglyDisagreeAnswers ', pamSettings.stronglyDisagreeAnswers);
            console.info('pamSettings.agreeAnswers ', pamSettings.agreeAnswers);
            console.info('pamSettings.stronglyAgreeAnswers ', pamSettings.stronglyAgreeAnswers);


            /* Modal Details */
            pamSettings.$modalTimeOut = 200;
            pamSettings.$modalDirection = 'top';
            pamSettings.$modalBackDrop = $('.m-modal');
            pamSettings.$modalContent = $('.m-modal__table');

            /* PAM Modal */
            Modal.init(pamSettings.$modalBackDrop, pamSettings.$modalContent, pamSettings.$modalDirection, pamSettings.$modalTimeOut);
        },

        bindUIActions: function () {
            $('.page-list-item').on('click', function (event) {
                $('li.page-list-item').not($(this)).removeClass('selected');
                $('li.page-list-item').not($(this)).next().slideUp();
                $(this).toggleClass('selected');
                $(this).next().slideToggle();
                var offset = $(this).offset();
                $('html, body').animate({
                    scrollTop: offset.top - 500
                }, 250);
            });

            
            $('.answer').on('click', function (event) {
                pamLevels.answerToggle();
            });

            $('.pam-results').on('click', function (event) {
                //Submit Questionnaire Method First
                pamLevels.submitQuestionnaire();

                //Enrol UAT AJAX Handler
                TEWLibrary.fetchData(pamSettings.$pamEnrolEndpoint, 'POST', {
                    $data: pamSettings.submitQuestionnaireData,
                    $beforeSend: pamLevels.pamBeforeSend
                }).done(pamLevels.enrolSuccess).fail(pamLevels.postFailed);
            });

            $('.modal-action-btn__accept').on('click', function(e){
                e.preventDefault();
                pamSettings.answers = [];
                pamLevels.pamModalClose();
            });
        },

        answerToggle: function () {
            var subSection = $(event.target).closest('div.book-subsection');
            var questionLi = subSection.prev();
            var checkbox = questionLi.find('span.pam-checkbox-span').first();
            var allAnswers = subSection.find('div.answer');
            var evtAnswer = ($(event.target).hasClass('answer')) ? $(event.target) : $(event.target).parent();
            var selected = evtAnswer.hasClass('selected');
            allAnswers.removeClass('selected');

            if (!selected)
                evtAnswer.addClass('selected');

            if (subSection.find('div.answer.selected').length > 0) {
                checkbox.addClass('selected');

                if (checkbox.children('span').length === 0)
                    checkbox.append('<span></span>');
            } else {
                checkbox.removeClass('selected');
                checkbox.children('span').remove();
            }

            if ($('body').find('.pam-checkbox-span.selected').length === 10) {
                $('.pam-results').removeAttr('disabled');
                $('.pam-results').removeClass('disabled');
            } else {
                $('.pam-results').attr('disabled', 'disabled');
                $('.pam-results').addClass('disabled');
            }
        },

        submitQuestionnaire: function () {
            var tpid = pamLevels.uuid();
            var questionArr = [1, 2, 4, 5, 6, 7, 10, 11, 12, 13];
            var answerArr = [1, 2, 3, 4, 0];

            pamSettings.submitQuestionnaireData = pamSettings.enrolTpl;
            pamSettings.submitQuestionnaireData.ThirdPartyIdentifier = tpid;

            var bookSections = document.querySelectorAll('.book-subsection');
            var questions = document.querySelectorAll('.page-list-item');
            var answer = document.querySelectorAll('.answer');
            var answers = document.querySelectorAll('.answer.selected');

            $.each(bookSections, function (i, e) {                
                $.each($(e).find('.answer'), function (j, f) {
                    if ($(f).hasClass('selected')) {
                        pamSettings.answers.push({
                            QuestionId: questionArr[i],
                            AnswerId: answerArr[j]
                        });
                    }
                });
            });


            $.each(answers, function (l, m) {
                var selectedAnswer = answers[l];
                console.info('selectedAnswer', selectedAnswer);
                var pointsScored = $(selectedAnswer)[0].dataset.points;
                
                //console.info('Points Scored ', pointsScored);
                switch (pointsScored) {
                    case "0":
                        pamSettings.naAnswers += 1;
                        break;

                    case "1":
                        pamSettings.stronglyDisagreeAnswers += 1;
                        break;

                    case "2":
                        pamSettings.disAgreeAnswers += 1;
                        break;

                    case "3":
                        pamSettings.agreeAnswers += 1;
                        break;

                    case "4":
                        pamSettings.stronglyAgreeAnswers += 1;
                        break;

                    default:
                        console.info('something gone wrong here ');
                }
            });

            //Remove these logs once production ready
            console.info('Answers :', pamSettings.answers);
            console.info('pamSettings.naAnswers ', pamSettings.naAnswers);
            console.info('pamSettings.stronglyDisagreeAnswers ', pamSettings.stronglyDisagreeAnswers);
            console.info('pamSettings.agreeAnswers ', pamSettings.agreeAnswers);
            console.info('pamSettings.stronglyAgreeAnswers ', pamSettings.stronglyAgreeAnswers);
        },

        pamBeforeSend: function () {
            var divLoading = '<div class="loading">' + '<img src="/images/icons/loading.gif"/>' + '</div>';
            //console.info('before send triggerd', divLoading);
            $('#pam-result-beforeSend').html(divLoading);
        },

        enrolSuccess: function (data) {
            $('#pam-result-beforeSend').empty();
            //This is where we do another Ajax Call
            var survey = {
                user: pamSettings.submitQuestionnaireData,
                language: 'enu',
                surveyType: 'PAM10',
                systemName: 'CerdelgaGenzyme',
                answers: pamSettings.answers
            };

            TEWLibrary.fetchData(pamSettings.$pamSubmitEndpoint, 'POST', {
                $data: survey,
                $beforeSend: pamLevels.pamBeforeSend
            }).done(pamLevels.pamSubmitSuccess).fail(pamLevels.postFailed);
        },

        pamModalClose: function(){
            //resetting the answers array
            pamSettings.naAnswers = 0;
            pamSettings.stronglyDisagreeAnswers = 0;
            pamSettings.agreeAnswers = 0;
            pamSettings.stronglyAgreeAnswers = 0;
            Modal.modalPopClose();
            $('#pam-result-beforeSend').empty();
        },

        pamSubmitSuccess: function (data) {
            if (pamSettings.naAnswers >= 3 || pamSettings.stronglyDisagreeAnswers === 10 || pamSettings.agreeAnswers === 10 || pamSettings.stronglyAgreeAnswers === 10) {
                /* TODO MAKE A MODAL HERE  */
                //console.info($('.m-modal'));
                Modal.modalPopOpen();
                //alert('Unusual answer pattern: It’s possible the survey respondent didn’t understand the questions or did not answer truthfully');

                $('.page-list-item').removeClass('selected');
                $('.answer').removeClass('selected');
                $('.pam-checkbox-span').removeClass('selected');
                $('.pam-checkbox-span').find('span').remove();
                $('.book-subsection').hide();
                $('.pam-results').addClass('disabled').prop('disabled', 'disabled');
                $('#pam-result-beforeSend').empty();

            } else {
               
                //console.info('This is the Data on PAM Submit Success ', data);
                //var score = data.Score;
                var level = data.Level;

                if (data.Success) {
                    $('#pam-result-beforeSend').empty();
                    sessionStorage.setItem("pam-level", level);

                    /* Template Loader and History setter */
                    _TemplateLoader.init('pamResult', data);
                    
                } else {
                    console.log(response);
                }
            }
        },

        enrolFailed: function (xhr) {
            $('.loading').remove();
            var xhrStatus = xhr.status;
            var status = TEWLibrary.ajaxErrorHandler(xhrStatus);
            var errorBody = "<div>" + "<img src='/images/icons/" + status + ".png'/>" + "</div>";
            $('#login-error-message').find('.panel-heading').html('Server returned ' + status);
            $('#login-error-message').find('.panel-body').html(errorBody);
            $('#login-error-message').fadeIn();
        },

        pad2: function (n) {
            return n < 10 ? '0' + n : n
        },

        uuid: function () {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        }

    };




























//var pam = {

//    init: function () {
//        alert('submit questionnaire');
//        this.bindEvents();
//        this.getQuestions();
//    },

//    answerArr: [
//        { id: 0, text: 'Disagree Strongly', iconUrl: '' },
//        { id: 1, text: 'Disagree', iconUrl: '' },
//        { id: 2, text: 'Agree', iconUrl: '' },
//        { id: 3, text: 'Strongly Agree', iconUrl: '' },
//        { id: 4, text: 'Not Applicable', iconUrl: '' }
//    ],
//    enrolTpl: {
//        ClientExtId: "994959312",
//        ClientPassKey: "fum4Umpqua8e",
//        SubGroupExtId: "568471853",
//        ThirdPartyIdentifier: "",
//        PrimaryEmail: "no-reply@the-earthworks.com"
//    },
//    questionTpl: '<div class="page-list">' +
//        '<li class="page-list-item" data-subpage="{0}">' +
//        '<span class="pam-checkbox-span" data-subpage="{0}">' +
//        '<input type="checkbox" id="pgsLabel" data-check="{0}" class="pages-checkbox" />' +
//        '</span>' +
//        '<label class="pages-label">{1}</label>' +
//        '<div class="page-button">' +
//        '<button class="book-btn book-subsection-btn" data-subpage="{0}"></button>' +
//        '</div>' +
//        '</li>' +
//        '<div class="book-subsection" data-subpage="{0}" style="display:none;">' +
//        '<div style=""></div>' +
//        '<div class="answer"><div class="pam-sprite pam-sprite-strongdisagree"></div><div class="pam-sprite-text">Disagree Strongly</div></div>' +
//        '<div class="answer"><div class="pam-sprite pam-sprite-disagree"></div><div class="pam-sprite-text">Disagree</div></div>' +
//        '<div class="answer"><div class="pam-sprite pam-sprite-agree"></div><div class="pam-sprite-text">Agree</div></div>' +
//        '<div class="answer"><div class="pam-sprite pam-sprite-strongagree"></div><div class="pam-sprite-text">Agree Strongly</div></div>' +
//        '<div class="answer"><div class="pam-sprite pam-sprite-na"></div><div class="pam-sprite-text">Not Applicable</div></div>' +
//        '</div>' +
//        '</div>',

//    bindEvents: function () {
//        $('body').on('click', 'li.page-list-item', function (event) {
//            $('.page-list-item.selected').not(this).each(function () {
//                $(this).removeClass('selected');
//                $(this).next().slideUp();
//            });

//            var offset = $(this).offset();
//            $('html, body').animate({ scrollTop: offset.top - 500 }, 250);
//        });

//        $('body').on('click', 'div.answer', function (event) {

//            var subSection = $(event.target).closest('div.book-subsection');
//            var questionLi = subSection.prev();
//            var checkbox = questionLi.find('span.pam-checkbox-span').first();
//            var allAnswers = subSection.find('div.answer');
//            var evtAnswer = ($(event.target).hasClass('answer')) ? $(event.target) : $(event.target).parent();
//            var selected = evtAnswer.hasClass('selected');
//            allAnswers.removeClass('selected');

//            if (!selected)
//                evtAnswer.addClass('selected');

//            if (subSection.find('div.answer.selected').length > 0) {
//                checkbox.addClass('selected');

//                if (checkbox.children('span').length === 0)
//                    checkbox.append('<span></span>');
//            } else {
//                checkbox.removeClass('selected');
//                checkbox.children('span').remove();
//            }

//            if ($('body').find('.pam-checkbox-span.selected').length === 10) {
//                $('.pam-results').removeAttr('disabled');
//                $('.pam-results').removeClass('disabled');
//            } else {
//                $('.pam-results').attr('disabled', 'disabled');
//                $('.pam-results').addClass('disabled');
//            }
//        });

//        $('body').on('click', 'button.pam-results', function (event) {
//            //console.info('i am clicked');
//            //pam.submitQuestionnaire();
//        });
//    },




//    submitQuestionnaire: function () {

//        var tpid = pam.uuid();
//        var questionArr = [1, 2, 4, 5, 6, 7, 10, 11, 12, 13];
//        var answerArr = [1, 2, 3, 4, 0];

//        var data = pam.enrolTpl;
//        data.ThirdPartyIdentifier = tpid;

//        console.info(data);
//        var answers = [];
//        var stronglyDisagreeAnswers = 0;
//        var agreeAnswers = 0;
//        var stronglyAgreeAnswers = 0;
//        var naAnswers = 0;

//        $.each($('div.book-subsection'), function (i, e) {

//            if ($(e).find('.selected').length === 0)
//                answers.push({ QuestionId: i + 1 });
//            else {
//                $.each($(e).find('.answer'), function (j, f) {
//                    if ($(f).hasClass('selected')) {
//                        answers.push({ QuestionId: questionArr[i], AnswerId: answerArr[j] });

//                        naAnswers += (answerArr[j] === 0) ? 1 : 0;
//                        stronglyDisagreeAnswers += (answerArr[1] === 0) ? 1 : 0;
//                        agreeAnswers += (answerArr[3] === 0) ? 1 : 0;
//                        stronglyAgreeAnswers += (answerArr[4] === 0) ? 1 : 0;
//                    }
//                });
//            }
//        });

//        if (naAnswers >= 3 || stronglyDisagreeAnswers === 10 || agreeAnswers === 10 || stronglyAgreeAnswers === 10) {
//            alert('Unusual answer pattern: It’s possible the survey respondent didn’t understand the questions or did not answer truthfully');
//            return;
//        }

//        $.ajax({
//            type: 'POST',
//            url: 'http://soa.cerdelga.tew-staging.com/api/pam/enrol/uat',
//            dataType: 'text/json',
//            data: data
//        }).always(function (response) {

//            var survey = {
//                user: data,
//                language: 'enu',
//                surveyType: 'PAM10',
//                systemName: 'CerdelgaGenzyme',
//                answers: answers
//            };

//            console.log(survey);

//            $.ajax({
//                type: 'POST',
//                url: 'http://soa.cerdelga.tew-staging.com/api/pam/submit/uat',
//                dataType: 'text/json',
//                data: survey,
//                success: function (response, textStatus, jqXHR) {
//                    var data = $.parseJSON(response.responseText);

//                    var score = data.Score;
//                    var level = data.Level;
//                    console.info('Score: ' + score + '; Level: ' + level);
//                },

//                error: function (response, textStatus, jqXHR) {
//                    console.info(textStatus.statusText);
//                }

//            });


//        });


//    },

//    pad2: function (n) { return n < 10 ? '0' + n : n },

//    uuid: function () {
//        var d = new Date().getTime();
//        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//            var r = (d + Math.random() * 16) % 16 | 0;
//            d = Math.floor(d / 16);
//            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
//        });
//        return uuid;
//    }
//}