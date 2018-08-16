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
            this.startX = undefined;
            this.startY = undefined;
            this.endX = undefined;
            this.endY = undefined;
            this.nowX = undefined;
            this.nowY = undefined;
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
        //var _this = this;
        this.initMousewheel();
        this.initTouch();
    }
    initMousewheel() {
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
    initTouch() {
        this.addEventHandler(document, 'touchstart', this.touchStart.bind(this));
        this.addEventHandler(document, 'touchend', this.touchEnd.bind(this));
        this.addEventHandler(document, 'touchmove', this.touchMove.bind(this));
        this.addEventHandler(document, 'touchcancel', this.touchCancel.bind(this));
    }
    addEventHandler(oTarget, sEventType, fnHandler) {
        if (oTarget.addEventListener) {
            oTarget.addEventListener(sEventType, fnHandler, false);
        } else if (oTarget.attachEvent) {
            oTarget.attachEvent("on" + sEventType, fnHandler);
        } else {
            oTarget["on" + sEventType] = fnHandler;
        }
    };
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
        // var _this = this;
        return new Promise((resolve, reject) => {
            if (resolve) {
                this.move(now, direction);
                resolve();
            } else {

            }
        })
    }

    move(now, direction) {

        clearInterval(this.sliderTimer);
        let _this = this;
        this.sliderTimer = setInterval(() => {
            let speed = 0;
            if (direction === "down") {
                if (this.now < 0 && this.now < this.wrapper.offsetTop) {
                    speed = -10;
                    this.wrapper.style.top = this.wrapper.offsetTop + speed + "px";
                    if (this.wrapper.style.top <= this.now) {
                        this.wrapper.style.top = this.now + "px";
                        console.log('2:', this.wrapper.style.top);
                    }
                } else {
                    this.wrapper.style.top = this.now + "px";
                    speed = 0;
                    clearInterval(this.sliderTimer);
                }
            } else if (direction === "up") {
                if (this.now <= 0 && this.now >= this.wrapper.offsetTop) {
                    speed = 10;
                    this.wrapper.style.top = this.wrapper.offsetTop + speed + "px";
                    if (this.wrapper.style.top >= this.now) {
                        this.wrapper.style.top = this.now + "px";
                    }
                } else {
                    this.wrapper.style.top = this.now + "px";
                    speed = 0;
                    clearInterval(this.sliderTimer);
                }
            }

        }, 10);
    }
    judgeSlide() {
        if (Math.abs(this.endY - this.startY) > 0) {
            return true;
        }
        return false;
    }
    slide(e) {
        e = e || window.event;
        var startTime = new Date().getTime();
        //var endTime = 0;
        if ((this.endTime - startTime) < -this.delay) {
            if (this.endY < this.startY && parseInt(this.wrapper.offsetTop) > -(this.pageHeight * (this.pagesNum - 1))) {
                this.now = this.now - this.pageHeight;
                this.turnToPage(this.now, "down").then(this.callback);
                this.callback();
            }
            if (this.endY > this.startY && parseInt(this.wrapper.offsetTop) < 0) {
                this.now = this.now + this.pageHeight;
                this.turnToPage(this.now, "up").then(this.callback);
                this.callback();
            }
            this.endTime = new Date().getTime();
        } else {
            e.preventDefault();
        }


        // this.now = this.now - this.pageHeight;
        // // console.log()
        // console.log('this.now: ', this.now);
        // if (this.endY > this.startY) {
        //     this.turnToPage(this.now, 'up')
        // } else if (this.endY < this.startY) {
        //     this.turnToPage(this.now, 'down');
        // }
    }
    touchStart(e) {
        e = e || widnow.event;
        this.startX = e.changedTouches[0].pageX;
        this.startY = e.changedTouches[0].pageY;
        //e.preventDefault();
    }
    touchEnd(e) {
        e = e || window.event;
        this.endX = e.changedTouches[0].pageX;
        this.endY = e.changedTouches[0].pageY;
        this.judgeSlide() && this.slide(e);
    }
    touchMove(e) {
        e = e || window.event;
        this.nowX = e.changedTouches[0].pageX;
        this.nowY = e.changedTouches[0].pageY;
    }
    touchCancel(e) {
            e = e || window.event;
            this.endX = e.changedTouches[0].pageX;
            this.endY = e.changedTouches[0].pageY;
            this.judgeSlide() && this.slide(e);
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