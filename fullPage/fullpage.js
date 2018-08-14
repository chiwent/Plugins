class FullPage {
    constructor(options) {
            const defaultOptions = {
                wrapper: '',
                pagesEle: [],
                pagesNum: '',
                delay: 1000,
                isShowDots: true,
                callback: () => {}
            };
            this.options = Object.assign(defaultOptions, options);
            this.callback = this.options.callback;
            this.wrapper = this.options.wrapper;
            this.pagesEle = this.options.pagesEle;
            this.pagesNum = this.options.pagesNum;
            this.dots = [];
            this.pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
            this.currentIndex = 0;
            this.delay = this.options.delay;
            this.startY = undefined;
            this.now = 0;
            this.sliderTimer = null;
            this.endTime = 0;
        }
        /*
        extends() {
            return Object.assign ||
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
        }
        */
    init() {
        for (var i = 0; i < this.pagesNum; i++) {
            this.pagesEle[i].style.height = this.pageHeight + "px";
        }
        var _this = this;
        if ((navigator.userAgent.toLowerCase().indexOf("firefox") != -1)) {
            document.addEventListener("DOMMouseScroll", this.scrollFn.bind(this), false);
        } else if (document.addEventListener) {
            document.addEventListener("mousewheel", this.scrollFn.bind(this), false);
        } else if (document.attachEvent) {
            document.attachEvent("onmousewheel", this.scrollFn.bind(this));
        } else {
            document.onmousewheel = this.scrollFn.bind(this);
        }
    }
    scrollFn(e) {
        var startTime = new Date().getTime();
        //var endTime = 0;
        var delta = e.detail || (-e.wheelDelta);
        if ((this.endTime - startTime) < -this.delay) {
            if (delta > 0 && parseInt(this.wrapper.offsetTop) > -(this.pageHeight * (this.pagesNum - 1))) {
                this.now = this.now - this.pageHeight;
                this.turnToPage(this.now, "down").then(this.callback);
                this.callback();
            }
            if (delta < 0 && parseInt(this.wrapper.offsetTop) < 0) {
                this.now = this.now + this.pageHeight;
                this.turnToPage(this.now, "up").then(this.callback);
                this.callback();
            }
            this.endTime = new Date().getTime();
        } else {
            e.preventDefault();
        }
    }

    turnToPage(now, direction) {
        var _this = this;
        return new Promise(function(resolve, reject) {
            if (resolve) {
                _this.move(now, direction);
                resolve();
            } else {

            }
        })
    }

    move(now, direction) {

            clearInterval(this.sliderTimer);
            let _this = this;
            this.sliderTimer = setInterval(function() {
                let speed = 0;
                if (direction === "down") {
                    if (_this.now < 0 && _this.now < _this.wrapper.offsetTop) {
                        speed = -10;
                        _this.wrapper.style.top = _this.wrapper.offsetTop + speed + "px";
                        if (_this.wrapper.style.top <= _this.now) {
                            _this.wrapper.style.top = _this.now + "px";
                            console.log('2:', _this.wrapper.style.top);
                        }
                    } else {
                        _this.wrapper.style.top = _this.now + "px";
                        speed = 0;
                        clearInterval(_this.sliderTimer);
                    }
                } else if (direction === "up") {
                    if (_this.now <= 0 && _this.now >= _this.wrapper.offsetTop) {
                        speed = 10;
                        _this.wrapper.style.top = _this.wrapper.offsetTop + speed + "px";
                        if (_this.wrapper.style.top >= _this.now) {
                            _this.wrapper.style.top = _this.now + "px";
                        }
                    } else {
                        _this.wrapper.style.top = _this.now + "px";
                        speed = 0;
                        clearInterval(_this.sliderTimer);
                    }
                }

            }, 10);
        }
        /*
        throttle(method, context, delay) {
            let wait = false;
            return function(...args) {
                if (!wait) {
                    method.apply(context, args);
                    wait = true;
                    setTimeout(() => {
                        wait = false;
                    }, delay);
                }
            };
        }
        debounce(method, context, event, delay) {
            clearTimeout(method.tId);
            method.tId = setTimeout(() => {
                method.call(context, event);
            }, delay);
        }
        */
}