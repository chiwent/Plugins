(function() {
    'use strict';

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
            targetEle: '',
            imgList: [],
            showBtn: true,
            showAnchor: true,
            animation: 'scale(1.3)',
            rippleWidth: '80px',
            autoPlay: true,

        };

        return _extends({}, defaults, opts);
    };

    var Slider = function Slider(settings) {
        this._settings = getSettings(settings);
        // console.log('before init');
        this._init();
        // console.log('after init');
        this._slide();
    }

    Slider.prototype = {
        constructor: Slider,

        _init: function() {
            var targetEle = this._settings.targetEle;
            var parent = document.createElement('div');
            parent.className = 'parent';
            var Ele = `
            <button type="button" id='right' class='right' name="button">
            
            <svg version="1.1" id="Capa_1" width='40px' height='40px ' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 477.175 477.175" style="enable-background:new 0 0 477.175 477.175;" >
            <g>
             <path style='fill: #9d9d9d;' d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5
               c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z
               "/>
            </g>
     
            </svg>
     
            </button>
            <button type="button" id='left' class='left' name="button">
            <svg version="1.1" id="Capa_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 477.175 477.175" style="enable-background:new 0 0 477.175 477.175;" >
            <g>
             <path style='fill: #9d9d9d;' d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225
               c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/>
            </g>
            </svg>
            </button>
            <div class="slider">
                <svg id='svg2' class='up2' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <circle id='circle1' class='circle1 steap' cx="-15%" cy="53%" r="15%"  />
                    <circle id='circle2' class='circle2 steap' cx="-15%" cy="53%" r="30%"  />
                    <circle id='circle3' class='circle3 steap' cx="-15%" cy="53%" r="45%"  />
                    <circle id='circle4' class='circle4 steap' cx="-15%" cy="53%" r="60%"  />
                    <circle id='circle5' class='circle5 steap' cx="-15%" cy="53%" r="75%"  />
                    <circle id='circle6' class='circle6 steap' cx="-15%" cy="53%" r="90%"  />
                    <circle id='circle7' class='circle7 steap' cx="-15%" cy="53%" r="105%"  />
                    <circle id='circle8' class='circle8 steap' cx="-15%" cy="53%" r="120%"  />
                    <circle id='circle9' class='circle9 steap' cx="-15%" cy="53%" r="135%"  />
                    <circle id='circle10' class='circle10 steap' cx="-15%" cy="53%" r="150%"  />
                    </svg>
                <svg id='svg1' class='up2' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <circle id='circle11' class='circle11 steap' cx="115%" cy="53%" r="15%"  />
                    <circle id='circle12' class='circle12 steap' cx="115%" cy="53%" r="30%"  />
                    <circle id='circle13' class='circle13 steap' cx="115%" cy="53%" r="45%"  />
                    <circle id='circle14' class='circle14 steap' cx="115%" cy="53%" r="60%"  />
                    <circle id='circle15' class='circle15 steap' cx="115%" cy="53%" r="75%"  />
                    <circle id='circle16' class='circle16 steap' cx="115%" cy="53%" r="90%"  />
                    <circle id='circle17' class='circle17 steap' cx="115%" cy="53%" r="105%"  />
                    <circle id='circle18' class='circle18 steap' cx="115%" cy="53%" r="120%"  />
                    <circle id='circle19' class='circle19 steap' cx="115%" cy="53%" r="135%"  />
                    <circle id='circle20' class='circle20 steap' cx="115%" cy="53%" r="150%"  />
                </svg>
            </div>
            `

            parent.innerHTML = Ele;
            targetEle.appendChild(parent);
            var slider = document.getElementsByClassName('slider')[0];
            var imglen = this._settings.imgList.length;

            var frag = document.createDocumentFragment('div');
            for (var i = 0; i < imglen; i++) {
                var slideImg = document.createElement('div');
                slideImg.id = "slide" + i;
                slideImg.className = "slide" + i;
                (i == 0) ? slideImg.className += ' up1': slideImg.className += '';
                var img = document.createElement('img');
                img.src = this._settings.imgList[i];
                slideImg.appendChild(img);
                frag.appendChild(slideImg);
            }
            slider.appendChild(frag);
            var button = parent.getElementsByTagName('button');
            if (this._settings.showBtn === false) {
                Array.prototype.map.call(button, function(item) { item.style.display = "none"; })
            }
            var anchorBox = document.createElement('div');
            anchorBox.className = 'slideanchor';

            var anchorFrag = document.createDocumentFragment('div');
            for (var i = 0; i < imglen; i++) {
                var anchor = document.createElement('span');
                anchor.id = 'slide-anchor-button' + i;
                anchor.textContent = i + 1;
                anchorFrag.appendChild(anchor);
            }
            anchorBox.appendChild(anchorFrag);
            parent.appendChild(anchorBox);
            if (this._settings.showAnchor === false) {
                anchorBox.style.display = 'none';
            }


            this.curpage = 0;
            this.sliding = false;
            this.slide = parent.getElementsByClassName('slider');
            this.left = parent.getElementsByClassName('left')[0];
            this.right = parent.getElementsByClassName('right')[0];
            this.pagePrefix = 'slide';
            this.pageShift = 500;
            this.transitionPrefix = 'circle';
            this.svg = true;
        },


        _leftSlide: function() {
            var self = this;
            var _imgLen = self._settings.imgList.length
            if (self.click) {
                if (self.curpage == 0) self.curpage = _imgLen;
                self.sliding = true;
                self.curpage--;
                self.svg = true;
                self.click = false;

                for (var k = 0; k < _imgLen; k++) {
                    var al = document.getElementById(self.pagePrefix + k);
                    al.className += ' tran';
                }
                // setTimeout(() => {
                self._move();
                //   }, 200);
                setTimeout(() => {
                    for (var k = 0; k < self._settings.imgList.length; k++) {
                        var al = document.getElementById(self.pagePrefix + k);
                        al.classList.remove('tran');
                    }
                }, 1400);
            }
        },
        _rightSlide: function() {
            var self = this;
            var _imgLen = self._settings.imgList.length;
            if (self.click) {
                if (self.curpage == _imgLen - 1) self.curpage = -1;
                self.sliding = true;
                self.curpage++;
                self.svg = false;
                self.click = false;
                for (var k = 0; k < _imgLen; k++) {
                    var al = document.getElementById(self.pagePrefix + k);
                    al.className += ' tran';
                }
                //  setTimeout(() => {
                self._move();
                // }, 200);
                setTimeout(() => {
                    for (var k = 0; k < self._settings.imgList.length; k++) {
                        var al = document.getElementById(self.pagePrefix + k);
                        al.classList.remove('tran');
                    };
                }, 1400);
            }
        },
        _move: function() {
            var self = this;
            if (self.sliding) {
                self.sliding = false;
                if (self.svg) {
                    for (var j = 1; j <= 10; j++) {
                        var c = document.getElementById(self.transitionPrefix + j);
                        c.classList.remove('steap');
                        c.setAttribute('class', (self.transitionPrefix + j) + " streak")
                    }
                } else {
                    for (var j = 11; j <= 20; j++) {
                        var c = document.getElementById(self.transitionPrefix + j);
                        c.classList.remove('steap');
                        c.setAttribute('class', (self.transitionPrefix + j) + " streak")
                    }
                }

                setTimeout(() => {
                    for (var i = 0; i < self._settings.imgList.length; i++) {
                        if (i == self.curpage) {
                            var a = document.getElementById(self.pagePrefix + i);
                            a.className += ' up1';
                        } else {
                            var b = document.getElementById(self.pagePrefix + i);
                            b.classList.remove("up1");
                        }
                    };
                    self.sliding = true;
                }, 600);
                //  setTimeout(() => {
                self.click = true;
                // }, 1700);



                setTimeout(() => {
                    if (self.svg) {
                        for (var j = 1; j <= 10; j++) {
                            var c = document.getElementById(self.transitionPrefix + j);
                            c.classList.remove("streak");
                            c.setAttribute("class", self.transitionPrefix + j + " steap");
                        }
                    } else {
                        for (var j = 11; j <= 20; j++) {
                            var c = document.getElementById(self.transitionPrefix + j);
                            c.classList.remove("streak");
                            c.setAttribute("class", self.transitionPrefix + j + " steap");
                        }
                        self.sliding = true;
                    }
                }, 850);
                var anchor = document.getElementsByClassName('slideanchor')[0].getElementsByTagName('span');
                Array.prototype.filter.call(anchor, (item, index) => {
                        console.log(self.curpage);
                        if (index == self.curpage)
                            item.style.backgroundColor = 'rgba(255,0,0,0.5)';
                        else
                            item.style.backgroundColor = 'rgba(242, 237, 237, 0.5)'
                    })
                    // setTimeout(() => {
                self.click = true;
                //}, 1700);

            }
        },
        _slide: function() {
            var self = this;

            self.left.addEventListener('mousedown', () => {
                this.click = true;
                self._leftSlide();
            });
            self.right.addEventListener('mousedown', () => {
                this.click = true;
                self._rightSlide();
            });
            document.addEventListener("keydown", (e) => {
                if (e.keyCode == 37) {
                    self._leftSlide();
                } else if (e.keyCode == 39) {
                    self._rightSlide();
                }
            });
            var anchor = document.getElementsByClassName('slideanchor')[0].getElementsByTagName('span');
            anchor[0].style.backgroundColor = 'rgba(255,0,0,0.5)';
            //setTimeout(() => {
            // self._rightSlide();
            // }, 500);
        }
    }
    window.Slider = Slider;
})();