var welcomeSettings,
    welcomeSlide = {
        settings: {
            $slide: $('.welcome-slide'),
            $radios: $('.welcome-dots').find('input[type="radio"]'),
            $noshow: $('.no-show-slide')
        },


        init: function () {
            welcomeSettings = this.settings;
            this.bindUIActions();
        },

        bindUIActions: function () {

            //Clicking Dots
            $("input[type='radio']").on('change', function () {
                welcomeSlide.dotsNavigation();
            });

            //Clicking Next Button
            $('.next > a').on('click', function (e) {
                e.preventDefault();
                console.info('hello');
                welcomeSlide.nextNav();
            });

            //Clicking Back Button
            $('.back > a').on('click', function (e) {
                e.preventDefault();
                welcomeSlide.prevNav();
            });


            //Clicking Finish Button
            $('.welcome-btn.finish').click(function (e) {
                e.preventDefault();
                e.stopPropagation();
                /* Template Loading and History State */
                _TemplateLoader.init('pamChoice');
            });

            //Clicking Don't Show me these welcome screens
            $('.no-show-slide').on('click', function () {
                welcomeSlide.dontShow();
            });
        },
        
        //Dots Navigation
        dotsNavigation: function () {
            $('.welcome-dots').find('input[type="radio"]').each(function (i, e) {
                var id = $('input[type="radio"]:checked').attr('id');

                $('.welcome-slide').each(function (index) {
                    var screen = $('.welcome-slide[data-id="' + id + '"]');
                    $('.welcome-slide').removeClass('active');
                    screen.addClass('active');
                    var i = index;
                    var pos = index * 1000;
                    //var posAfter = index * 1000 * 2;
                    var currentSlide = $('.welcome-slide.active').next();
                    var pastSlide = $('.welcome-slide.active').prev();

                    if ($(this).hasClass('active')) {
                        $('.welcome-screen-wrapper').css('transform', 'translateX(-' + pos + 'px)');
                        ('-webkit-transform', 'translateX(-' + pos + 'px)');
                        ('-ms-transform', 'translateX(-' + pos + 'px)');
                        ('-moz-transform', 'translateX(-' + pos + 'px)');
                        ('-o-transform', 'translateX(-' + pos + 'px)');
                        //$(this).prev().css('transform', 'translateX(-' + posAfter + 'px)');
                    }

                    if (pastSlide.length > 0) {
                        $('.back').css('display', 'inline-block');
                    } else {
                        $('.back').css('display', 'none');
                    }

                    if (currentSlide.length < 1) {
                        $('.back').css('display', 'inline-block');
                        $('.next').css('display', 'none');
                        $('.finish').css('display', 'inline-block');
                    } else {
                        $('.next').css('display', 'inline-block');
                        $('.finish').css('display', 'none');
                    }
                });
            });
        },

        //Next Navigation
        nextNav: function () {
            var i = $('.welcome-slide.active').next().index() + 1;
            var j = $('.welcome-slide.active').next().index();
            var slide = $('.welcome-slide[data-id="screen-' + i + '"]');
            var input = $('input[name="screen-dots"]');
            $('.welcome-slide').removeClass('active');
            $(slide).addClass('active');

            //Dots controlled for Next Navigation
            $(input).each(function (index) {
                var radioId = 'screen-' + i;
                var activeRadio = $('input[name="screen-dots"][id="' + radioId + '"]');
                $('.welcome-dots').find('input[type="radio"]').attr('checked', false);
                $(activeRadio).prop('checked', true);
            });

            var nextSlide = $(slide).next();
            var idx = $(slide).index() * 1000;
            $('.welcome-screen-wrapper').css('transform', 'translateX(-' + idx + 'px)');
            ('-webkit-transform', 'translateX(-' + idx + 'px)');
            ('-ms-transform', 'translateX(-' + idx + 'px)');
            ('-moz-transform', 'translateX(-' + idx + 'px)');
            ('-o-transform', 'translateX(-' + idx + 'px)');

            if (nextSlide.length > 0) {
                $('.back').css('display', 'inline-block');
            } else {
                $('.next').css('display', 'none');
                $('.finish').css('display', 'inline-block');
            }
        },

        //Back Navigation
        prevNav: function () {
            var i = $('.welcome-slide.active').prev().index() + 1;
            var j = $('.welcome-slide.active').next().index();
            var slide = $('.welcome-slide[data-id="screen-' + i + '"]');
            var input = $('input[name="screen-dots"]');
            $('.welcome-slide').removeClass('active');
            $(slide).addClass('active');

            //Dots controlled for Next Navigation
            $(input).each(function (index) {
                var radioId = 'screen-' + i;
                var activeRadio = $('input[name="screen-dots"][id="' + radioId + '"]');
                $('.welcome-dots').find('input[type="radio"]').attr('checked', false);
                $(activeRadio).prop('checked', true);
            });

            var prevSlide = $(slide).prev();
            var idx = $(slide).index() * 1000;
            $('.welcome-screen-wrapper').css('transform', 'translateX(-' + idx + 'px)');
            ('-webkit-transform', 'translateX(-' + idx + 'px)');
            ('-ms-transform', 'translateX(-' + idx + 'px)');
            ('-moz-transform', 'translateX(-' + idx + 'px)');
            ('-o-transform', 'translateX(-' + idx + 'px)');

            if (prevSlide.length > 0) {
                $('.back').css('display', 'inline-block');
                $('.finish').css('display', 'none');
                $('.next').css('display', 'inline-block');
            } else {
                $('.back').css('display', 'none');
                $('.next').css('display', 'inline-block');
                $('.finish').css('display', 'none');
            }
        },

        //Don't show welcome screen
        dontShow: function () {
            localStorage.setItem('welcomeMsg', 'no');
        }

    };