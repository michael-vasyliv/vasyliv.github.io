;
(function($) {

    var defaultsRemoveLater = {
        selector: '.bubble'
    };

    $.fn.removeLater = function(options) {

        var config = $.extend({}, defaultsRemoveLater, options);
        // чистим время
        if (config.time.search(/\d+s/) !== -1) {
            var time = parseFloat(config.time) * 1000;
            config.time = time;
        } else if (config.time.search(/\d+ms/) !== -1) {
            var time = parseFloat(config.time);
            config.time = time;
        } else {
            config.time = 1600;
        }
        return this.each(function(index, elem) {

            var _this = $(this);
            var bubble = _this.find(config.selector);
            setTimeout(function() {
                    bubble.remove();
                },
                config.time);
        });
    };

    var defaultsBubbleEfect = {
        selector: '.bubble-effect',
        background: '',
        width: '',
        height: '',
        time: ''
    };

    $.fn.bubbleEfect = function(options) {

        var config = $.extend({}, defaultsBubbleEfect, options);
        return this.each(function(index, elem) {

            $(this).on('mousedown', config.selector, function(event) {

                var marginLeft = '-' + (parseFloat(config.width) / 2) + 'px';
                var marginTop = '-' + (parseFloat(config.height) / 2) + 'px';
                var bubble = '<div class = "bubble"><div class = "bubble-item"></div></div>';
                var elemTop = $(this).offset().top;
                var elemLeft = $(this).offset().left;
                var eventTop = event.pageY - elemTop;
                var eventLeft = event.pageX - elemLeft;

                $(this).addClass('bubble-effect');

                $(this).append(bubble).removeLater({
                    time: config.time
                });
                $(this).find('.bubble:last').css({
                    'top': eventTop,
                    'left': eventLeft,
                    'width': config.width,
                    'height': config.height,
                    'margin-top': marginTop,
                    'margin-left': marginLeft
                }).find('.bubble-item').css({
                    'width': config.width,
                    'height': config.height,
                    'background': config.background,
                    'animation-duration': config.time,
                });
            });
        });
    };

})(jQuery);
