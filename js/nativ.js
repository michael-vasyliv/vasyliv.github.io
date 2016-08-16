(function($) {


    $(function() {
        console.log('socces nativ');
        $.fn.removeLater = function() {
            return this.each(function(index, elem) {
                var _this = $(this);
                var bubble = _this.find('.bubble');
                setTimeout(function() {
                    bubble.remove();
                }, 1600);
            });
        };
        $.fn.bubbleEfect = function(selector) {
            return this.each(function(index, elem) {
                $(this).on('mousedown', selector, function(event) {
                    var bubble = '<div class = "bubble"><div></div></div>';
                    var elemTop = $(this).offset().top;
                    var elemLeft = $(this).offset().left;
                    var eventTop = event.pageY - elemTop;
                    var eventLeft = event.pageX - elemLeft;
                    if (!$(this).hasClass('bubble-effect')) {
                        $(this).addClass('bubble-effect');
                    }
                    $(this).append(bubble).removeLater();
                    $(this).find('.bubble:last').css({
                        'top': eventTop,
                        'left': eventLeft
                    });
                });
            });
        };

        $(document).bubbleEfect('.btn');
    });

    
})(jQuery);
