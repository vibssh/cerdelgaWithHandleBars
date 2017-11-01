var levelSettings,
    levelFilter = {
        settings: {
            $wrapper: $('#wrapper'),
            $body: $('body'),
            $bodyTopPos: '',

            $inputClicked: '',

            $checkedArray: [],

            $filterTrigger: $('#filter-level').find('input[type="radio"]'),
            $pamChecked: '', // All the filter Button on the header
            $checkedInput: $('input[type="radio"]:checked'),
            $checkedPrevious: '',
            $checkedId: '',
            $lockedInput: '',
            $lockedPreviewLink: ''
        },

        init: function (modalBackDrop, modalContent, modalDirection, modalTimeOut, modalAccept, modalDecline) {
            levelSettings = this.settings;
            levelSettings.$modalBackDrop = modalBackDrop;
            levelSettings.$modalContent = modalContent;
            levelSettings.$modalDirection = modalDirection;
            levelSettings.$modalTimeOut = modalTimeOut;
            levelSettings.$modalAccept = modalAccept;
            levelSettings.$modalDecline = modalDecline;

            /*On Load give direction to the Content to come from by adding class */
            levelSettings.$modalContent.addClass(levelSettings.$modalDirection);

            //Capturing Body Scroll Position
            levelSettings.$bodyTopPos = levelSettings.$body.scrollTop;
            // this.bindUIActions();

            // //Getting Level from PAM Level
            if (sessionStorage.getItem('pam-level') !== null) {
                levelSettings.$checkedId = sessionStorage.getItem('pam-level');
                var levelId = 'level-' + levelSettings.$checkedId;
                console.info('Level id ', levelId);

                var checkThisInput = document.getElementById(levelId);
                $(checkThisInput).prop('checked', 'checked');

                //This gets the initial level value of the filters checked - used for the preview pages purpose
                //var checkedLevel = levelChecked[0].dataset.level;
                levelSettings.$checkedArray.unshift(checkThisInput);
            }

            var grandParent = $('.main-book-list');
            var parent = $('.page-level').parent().parent();
            var matchedParent = $('.page-level[data-level="' + levelSettings.$checkedId + '"]').parent().parent();
            var matchedGrandParent = $(matchedParent).closest('.main-book-list');

            if (sessionStorage.getItem('pam-level') !== null) {
                $('#content').addClass('unmuted').addClass('book-creator');
                $('.filter-details').css({
                    'visibility': 'hidden'
                });
                $('body').removeClass('no-scroll');
                $(parent).hide();
                $(matchedParent).show();
                $(grandParent).hide();
                $(matchedGrandParent).show();


            } else {
                $('#content').removeClass('unmuted');
                $('body').addClass('no-scroll');
            }

            $('.locked').show(); //compulsory section

            this.bindUIActions();
        },

        bindUIActions: function () {

            //Modal Dont-show click
            $('.modal-no-show').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                localStorage.setItem("modal", "no-show");
                $('input[type="radio"]').prop('checked', false);
                levelSettings.$inputClicked.prop('checked', 'checked');
                levelFilter.filterPanel();
                $('.book-check').not('.locked-checkbox').prop('checked', false);
                levelFilter.acceptModal();
            });


            $('.level-check').on('change', function (e) {
                e.preventDefault();
                levelSettings.$inputClicked = $(this);
                $(this).prop('checked', false);
                levelSettings.$checkedInput = $(this);
                levelSettings.$checkedId = $(this).data('level');
                if (localStorage.getItem("modal") !== null) {
                    $('input[type="radio"]').prop('checked', false);
                    levelSettings.$inputClicked.prop('checked', 'checked');
                    levelFilter.filterPanel();
                    $('.book-check').not('.locked-checkbox').prop('checked', false);
                    levelFilter.acceptModal();
                } else {
                    levelFilter.modalPop();
                }

            });


            levelSettings.$modalAccept.on('click', function (e) {
                e.preventDefault();
                levelFilter.acceptModal();
            });

            levelSettings.$modalDecline.on('click', function (e) {
                e.preventDefault();
                levelFilter.closeModal();
                $('input[type="radio"]').prop('checked', false);
                levelSettings.$checkedPrevious = levelSettings.$checkedArray[0];
                $(levelSettings.$checkedPrevious).prop('checked', 'checked');
            });

            levelSettings.$modalBackDrop.on('click', function (e) {
                e.preventDefault();
                levelFilter.closeModal();
                $('input[type="radio"]').prop('checked', false);
                levelSettings.$checkedPrevious = levelSettings.$checkedArray[0];
                $(levelSettings.$checkedPrevious).prop('checked', 'checked');
            });

        },


        acceptModal: function () {
            //Remove the visibility of the filter-details text on the level filter panel
            $('.filter-details').css({
                'visibility': 'hidden'
            });

            if ($('.main-book-list-item').hasClass('selected')) {
                $('.main-book-list-item.selected').next().css('display', 'none');
                $('.main-book-list-item').removeClass('selected');
            }
            levelFilter.closeModal();

            $('#content').addClass('unmuted').addClass('book-creator');
            $('body').removeClass('no-scroll');

            $('input[type="radio"]').prop('checked', false);
            levelSettings.$inputClicked.prop('checked', 'checked');

            //Preview Link Data-level changes when the levels are changed 
            var checkedLevel = levelSettings.$inputClicked[0].dataset.level;

            console.info('Checked Level ', checkedLevel);
            sessionStorage.setItem('pam-level', checkedLevel);

            //Preview Link get data-level value same as checkedlevel
            var previewLink = document.querySelectorAll('.preview-link');
            for (var i = 0; i < previewLink.length; i++) {
                var el = previewLink[i];
                el.setAttribute('data-level', checkedLevel);
                //console.info(el);
            };

            var doseCheckLevel = sessionStorage.getItem("dose");

            var lockedPreviewLink = document.querySelectorAll("[data-dose='true'] .preview-link");
            for (var k = 0; k < lockedPreviewLink.length; k++) {
                var kl = lockedPreviewLink[k];
                kl.setAttribute('data-level', doseCheckLevel);
            }

            levelFilter.filterPanel();
            $('.book-check').not('.locked-checkbox').prop('checked', false);

        },

        modalPop: function () {
            levelSettings.$wrapper.css('top', -levelSettings.$bodyTopPos);
            levelSettings.$body.addClass('no-scroll');


            //Activating Modal
            levelSettings.$modalBackDrop.fadeIn().addClass('activate');
            setTimeout(function () {
                levelSettings.$modalContent.removeClass(levelSettings.$modalDirection);
            }, levelSettings.$modalTimeOut);

        },

        closeModal: function () {
            levelSettings.$body.removeClass('no-scroll');
            levelSettings.$body.scrollTop = levelSettings.$bodyTopPos;
            levelSettings.$wrapper.css('top', 0);

            levelSettings.$modalContent.addClass(levelSettings.$modalDirection);
            levelSettings.$modalBackDrop.removeClass('activate').fadeOut();
        },

        filterPanel: function () {
            levelSettings.$checkedArray.unshift(levelSettings.$inputClicked[0]);
            var grandParent = $('.main-book-list');
            var generalParent = $('.page-level').parent().parent();
            var matchedParent = $('.page-level[data-level="' + levelSettings.$checkedId + '"]').parent().parent();
            var matchedGrandParent = $(matchedParent).closest('.main-book-list');
            // Hide all SubLists to start with
            $(generalParent).hide();
            $(grandParent).hide();
            // Show only SubLists that match
            $(matchedGrandParent).show();
            $(matchedParent).show();
            $('.locked').show(); // Compulsory section
            levelFilter.fileUrl(); // This will change the value of data-fileurl
        },

        fileUrl: function () {
            var previewLinkToGetLevel = $('.preview-link:not([data-is="false"])');
            $(previewLinkToGetLevel).each(function (i, obj) {
                var dataFileUrl = obj.getAttribute('data-fileurl');
                var stringUrl = dataFileUrl.substring(0, dataFileUrl.lastIndexOf("-"));
                obj.setAttribute('data-fileurl', stringUrl + '-' + levelSettings.$checkedId);
            });
        }

    };