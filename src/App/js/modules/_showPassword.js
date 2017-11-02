var showPasswordSettings,
showPassword = {

    settings: {
        element : ''
    },

    init: function() {
        showPasswordSettings = this.settings;
        this.bindUIActions();

        //Find the @ within an anchor tag and wrap a span around the element
        var el = $('a');
        el.html(function (i, html) {
            return html.replace('@', '<span class="change-font">@</span>');
        });
    },

    bindUIActions: function() {
        $('.show-btn').unbind().bind('click', function (e) {
            e.preventDefault();            
            showPassword.showPasswordField($(this)[0]);
        });

        $('.hide-btn').unbind().bind('click', function (e) {
            e.preventDefault();
            showPassword.hidePasswordField($(this)[0]);
        });
    },

    showPasswordField: function ($clicked) {        
        //var passwordField = $($clicked).parent().prev()[0];
        var passwordField = $('.password-wrapper').find('input');
        var nextBtn = $($clicked).next()[0];
        
       $(passwordField).attr('type', 'text');
        $($clicked).css('display', 'none');
        $(nextBtn).css('display', 'block');
    },

    hidePasswordField: function ($clicked) {
        var prevBtn = $($clicked).prev()[0];
        //var passwordField = $($clicked).parent().prev()[0];
        var passwordField = $('.password-wrapper').find('input');        
       
        $(passwordField).attr('type', 'password');
        $(prevBtn).css('display', 'block');
        $($clicked).css('display', 'none');
    }
};