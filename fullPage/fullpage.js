//TODO:



class FullPage {
    constructor(options) {
            const defaultOptions = {
                wrapper: '',
                pagesEle: [],
                dots: [],
                delay: 1000,
                isShowDots: true,
                callback: () => {}
            };
            this.options = Object.assign(defaultOptions, options);
            this.callback = this.options.callback;
            this.wrapper = this.options.wrapper;
            this.pagesEle = this.options.pagesEle;
            this.pagesNum = this.pagesEle.length;
            this.dots = this.options.dots;
            this.pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
            this.currentIndex = 1;
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
            this.index = 1;
            this.isShowDots = this.options.isShowDots;
            this.currection = 1;
            this.backup = 1;
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
        this.initMousewheel();
        this.initTouch();
        if (this.isShowDots) {
            this.clickHandler();
        } else {
            document.getElementsByClassName('pagenavigation')[0].style.display = 'none';
        }
    }

    initMousewheel() {
        if ((navigator.userAgent.toLowerCase().indexOf("firefox") != -1)) {
            document.addEventListener("DOMMouseScroll", this.throttle(this.scrollFn).bind(this), false);
        } else if (document.addEventListener) {
            document.addEventListener("mousewheel", this.throttle(this.scrollFn).bind(this), false);
        } else if (document.attachEvent) {
            document.attachEvent("onmousewheel", this.throttle(this.scrollFn).bind(this));
        } else {
            document.onmousewheel = this.throttle(this.scrollFn).bind(this);
        }
    }
    initTouch() {
        this.addEventHandler(document, 'touchstart', this.throttle(this.touchStart).bind(this));
        this.addEventHandler(document, 'touchend', this.throttle(this.touchEnd).bind(this));
        this.addEventHandler(document, 'touchmove', this.throttle(this.touchMove).bind(this));
        this.addEventHandler(document, 'touchcancel', this.throttle(this.touchCancel).bind(this));
    }
    addEventHandler(oTarget, sEventType, fnHandler) {
        if (oTarget.addEventListener) {
            oTarget.addEventListener(sEventType, fnHandler, false);
        } else if (oTarget.attachEvent) {
            oTarget.attachEvent("on" + sEventType, fnHandler);
        } else {
            oTarget["on" + sEventType] = fnHandler;
        }
    }
    toggleActive() {
        for (let item of this.dots) {
            this.removeClass(item, 'active');
        }
        this.addClass(this.dots[this.currentIndex - 1], 'active');
    }
    scrollFn(e) {
        // var startTime = new Date().getTime();
        // var endTime = 0;
        var delta = e.detail || (-e.wheelDelta);
        //if ((this.endTime - startTime) < -this.delay) {
        if (delta > 0 && parseInt(this.wrapper.offsetTop) > -(this.pageHeight * (this.pagesNum - 1))) {
            this.now = this.now - this.pageHeight;
            this.currentIndex++;
            this.toggleActive();
            this.turnToPage(this.now, "down").then(this.callback);
            // this.callback();
        }
        if (delta < 0 && parseInt(this.wrapper.offsetTop) < 0) {
            this.now = this.now + this.pageHeight;
            this.currentIndex--;
            this.toggleActive();
            this.turnToPage(this.now, "up").then(this.callback);
            // this.callback();
        }
        this.endTime = new Date().getTime();
        // } else {
        //     e.preventDefault();
        // }
    }
    turnToPage(now, direction) {
        var _this = this;
        return new Promise((resolve, reject) => {
            if (resolve) {
                this.move(this.now, direction);
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

                if (this.now < 0 && this.now < this.wrapper.offsetTop && this.currentIndex < this.pagesNum) {
                    // this.currentIndex = this.currentIndex < this.pagesNum ? this.currentIndex += 1 : 0;
                    speed = -10;
                    this.wrapper.style.top = this.wrapper.offsetTop + speed + "px";
                    if (this.wrapper.style.top <= this.now) {
                        this.wrapper.style.top = this.now + "px";
                    }
                } else {
                    this.wrapper.style.top = this.now + "px";
                    speed = 0;
                    clearInterval(this.sliderTimer);
                }
            } else if (direction === "up") {
                if (this.now <= 0 && this.now >= this.wrapper.offsetTop && this.currentIndex > 1) {
                    // this.currentIndex = this.currentIndex >= 0 ? this.currentIndex - 1 : this.pagesNum;
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
        // var startTime = new Date().getTime();
        // var endTime = 0;
        // console.log('slide current ', this.currentIndex)
        //if ((this.endTime - startTime) < -this.delay) {
        // console.log(this.currentIndex)
        if (this.endY < this.startY && parseInt(this.wrapper.offsetTop) > -(this.pageHeight * (this.pagesNum - 1))) {
            this.now = this.now - this.pageHeight;
            this.currentIndex += 1 ? this.currentIndex < this.pagesNum : this.currentIndex = this.pagesNum;
            console.log('down:', this.currentIndex);
            this.toggleActive();
            this.turnToPage(this.now, "down").then(this.callback);
            // this.callback();
        }
        if (this.endY > this.startY && parseInt(this.wrapper.offsetTop) < 0) {
            this.now = this.now + this.pageHeight;
            this.currentIndex -= 1 ? this.currentIndex > 1 : this.currentIndex = 1;
            console.log('up:', this.currentIndex);
            this.toggleActive();
            this.turnToPage(this.now, "up").then(this.callback);
            // this.callback();
        }
        // if (this.wrapper.style.top === 0) {
        //     this.currentIndex = 1;
        // }
        //   this.endTime = new Date().getTime();
        // } else {
        //     e.preventDefault();
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
    hasClass(obj, className) {
        return obj.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }
    addClass(obj, className) {
        if (!this.hasClass(obj, className))
            obj.className += "" + className;
    }
    removeClass(obj, className) {
        if (this.hasClass(obj, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            obj.className = obj.className.replace(reg, '');
        }
    }
    toggleClass(obj, className) {
        if (this.hasClass(obj, className)) {
            this.removeClass(obj, className)
        } else {
            this.addClass(obj, className)
        }
    }
    judge() {

        for (let item of this.dots) {
            if (this.hasClass(item, 'active'))
                return item.getAttribute('index')
        }
    }
    gotoPage(e, index) {
        // console.log('Goto Page')
        e = e || window.event;
        //var startTime = new Date().getTime();
        //var endTime = 0;
        // if ((this.endTime - startTime) < -this.delay) {
        // if (this.judge() !== index) {
        if (this.backup < index && parseInt(this.wrapper.offsetTop) > -(this.pageHeight * (this.pagesNum - 1))) {
            this.now = this.now - this.pageHeight * (Math.abs(index - this.backup));
            // index += 1 ? index < this.pagesNum : index = this.pagesNum;
            this.turnToPage(this.now, "down").then(() => {
                console.log('down current2:', index)
                this.removeClass(this.dots[this.backup - 1], 'active');
                this.addClass(this.dots[index - 1], 'active');

            }).then(this.callback);

        }
        if (this.backup > index) {
            //this.toggleActive();
            this.now = this.now + this.pageHeight * (Math.abs(index - this.backup));
            this.turnToPage(this.now, "up").then(() => {
                this.removeClass(this.dots[this.backup - 1], 'active');
                this.addClass(this.dots[index - 1], 'active');

            }).then(this.callback);
        }
        //this.endTime = new Date().getTime();
        //this.index = index
        //  } else {
        //      e.preventDefault();
        // }
        // }
    }

    clickHandler(e) {

        for (let item of this.dots) {

            this.addEventHandler(item, 'click', (e) => {

                this.backup = this.currentIndex
                console.log('backup:', this.backup)
                this.currentIndex = parseInt(item.getAttribute('index'));
                // this.currection =
                //     Math.abs(Math.ceil(this.wrapper.offsetTop / this.pageHeight))
                this.gotoPage(e, this.currentIndex);
            });
        }

    }

    throttle(fn, interval = this.delay) {
        let canRun = true;
        return function() {
            if (!canRun) return;
            canRun = false;
            setTimeout(() => {
                fn.apply(this, arguments);
                canRun = true;
            }, interval);
        };
    }
    debounce(fn, wait = this.delay) {
        var timer = null;
        return function() {
            var context = this
            var args = arguments
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(function() {
                fn.apply(context, args)
            }, wait)
        }
    }
}