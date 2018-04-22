;
(function($) {

    var defaults = {
        timeout: 300,
        errorImg: '',
    }

    function throttle(fn, delay, min) {
        var timeout = null,
            startTime = Date.now();
        var endTime = Date.now();
        clearTimeout(timeout);
        var ti = endTime - startTime;
        if (ti >= min) {
            fn();
            startTime = endTime;
        } else {
            timeout = setTimeout(fn, delay);
        }
    }


    function getPosition(dom) {
        var scrollX = document.body.scrollLeft || document.documentElement.scrollLeft,
            scrollY = document.body.scrollTop || document.documentElement.scrollTop;
        var pos = dom.getBoundingClientRect();
        return {
            top: pos.top + scrollY,
            bottom: pos.bottom + scrollY,
            left: pos.left + scrollX,
            right: pos.right + scrollX
        }
    }

    function setSrc() {
        var scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
        var clientHeight = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
        var imgs = $('img.lazyload');
        var len = imgs.length;
        for (var i = 0; i < len; i++) {
            var position = getPosition(imgs[i]),
                positionTop = position.top,
                positionBottom = position.bottom,
                screenTop = clientHeight + scrollTop;
            if ($(this).attr("src") && (positionTop > scrollTop && positionTop < screenTop) || (positionBottom > scrollTop && positionBottom < screenTop)) {
                if (!imgs[i].getAttribute('data-src'))
                    break;
                imgs[i].src = imgs[i].getAttribute('data-src');
            } else {
                //
            }

        }
    }

    function init(opts) {
        var imgs = $('img');
        var len = imgs.length;
        defaults = $.extend(defaults, opts);

        $(window).on('scroll resize', function() {
            if (!len) {
                return;
            } else {
                throttle(setSrc, defaults.timeout, 100);
            }
        })

        $(document).ready(function() {
            for (var i = 0; i < len; i++) {
                var positionTop = getPosition(imgs[i]).top;
                var clientHeight = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
                if (positionTop < clientHeight) {
                    if (!imgs[i].getAttribute('data-src'))
                        break;
                    imgs[i].src = imgs[i].getAttribute('data-src');
                }
                $(imgs[i]).error(function() {
                    $(this).attr("src", defaults.errorImg).removeAttr('data-src');
                });
            }
        });

    }
    window.LazyLoad = init;
})($ || jQuery || Zepto);