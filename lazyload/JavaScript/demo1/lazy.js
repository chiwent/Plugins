;
(function() {
    "use strict";

    var _extends = Object.assign ||
        function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };

    var _typeof =
        typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function(obj) {
            return typeof obj;
        } :
        function(obj) {
            return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }


    var getSettings = function(opts) {
        var defaults = {
            timeout: 300,
            dataSet: '',
            className: '',
            errorImg: ''
        };
        return _extends({}, defaults, opts);
    };


    var LazyLoad = function LazyLoad(settings) {
        this._settings = getSettings(settings);
        this._init();
    };

    LazyLoad.prototype = {
        constructor: LazyLoad,
        _debounce: function(func, wait) {
            var _this1 = this;
            var timeout, args, context, timestamp;
            var later = function() {
                var last = Date.now() - timestamp;
                if (last < wait && last > 0) {
                    timeout = setTimeout(later, wait - last);
                } else {
                    timeout = null;
                    func.apply(context, args);
                    if (!timeout) context = args = null;
                }
            }
            return function() {
                context = _this1;
                args = arguments;
                timestamp = Date.now();
                // 如果延时不存在，重新设定延时
                if (!timeout) { timeout = setTimeout(later, wait) };
            }
        },

        _getPosition: function(dom) {
            var scrollX = document.body.scrollLeft || document.documentElement.scrollLeft,
                scrollY = document.body.scrollTop || document.documentElement.scrollTop;
            try {
                var pos = dom.getBoundingClientRect();
                return {
                    top: pos.top + scrollY,
                    bottom: pos.bottom + scrollY,
                    left: pos.left + scrollX,
                    right: pos.right + scrollX
                }
            } catch (error) {

            }
        },

        _count: function(o) {
            var t = typeof o;
            if (t == 'string') {
                return o.length;
            } else if (t == 'object') {
                var n = 0;
                for (var i in o) {
                    n++;
                }
                return n;
            }
            return false;
        },

        _loadImg: function() {

            var settings = this._settings;
            var _this2 = this;
            var scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
            var clientHeight = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
            var imgs = document.getElementsByClassName(settings.className);
            var len = _this2._count(imgs);
            for (var i = 0; i < len; i++) {
                try {
                    var position = _this2._getPosition(imgs[i]),
                        positionTop = position.top,
                        positionBottom = position.bottom,
                        screenTop = clientHeight + scrollTop;
                    if ((positionTop > scrollTop && positionTop < screenTop) || (positionBottom > scrollTop && positionBottom < screenTop)) {
                        if (!imgs[i].getAttribute(settings.dataSet))
                            break;
                        imgs[i].src = imgs[i].getAttribute(settings.dataSet);
                    } else {
                        //
                    }
                } catch (error) {

                }
            }

        },

        _init: function() {
            var settings = this._settings;
            var _this3 = this;
            var imgs = document.querySelectorAll('img');
            var len = imgs.length;
            window.addEventListener('scroll', _this3._debounce(function() {
                imgs.forEach(function() {
                    _this3._loadImg();
                });
            }, settings.timeout));
            document.addEventListener('DOMContentLoaded', function() {
                for (var i = 0; i < len; i++) {
                    var positionTop = _this3._getPosition(imgs[i]).top;
                    var clientHeight = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
                    if (positionTop < clientHeight) {
                        if (!imgs[i].getAttribute(settings.dataSet))
                            break;
                        imgs[i].src = imgs[i].getAttribute(settings.dataSet);
                        console.log(imgs[i].getAttribute(settings.dataSet));
                    }
                    imgs[i].addEventListener('error', function() {
                        this.src = settings.errorImg;
                        this.removeAttribute(settings.dataSet);
                    });
                }
            });

        },

    };
    window.LazyLoad = LazyLoad;

})();