function win(attr, val) {
    if (typeof val !== 'undefined') {
        document.documentElement[attr] = val;
        document.body[attr] = val;
    }
    return document.documentElement[attr] || document.body[attr];
}



function goTop(config) {
    this.speed = config.speed || 120;
    this.rate = config.rate || 8;
    this.effect = config.effect || false;
    this.dis = config.dis || win("clientHeight");
    this.container = config.container;
    this.target = 0;
    this.init();
}

goTop.prototype.bindEvent = function () {
    var _that = this;
    this.container.onclick = function () {
        _that.timer && clearInterval(_that.timer);
        _that.timer = setInterval(function () {
            _that.target = win("scrollTop");
            _that.target -= _that.effect ? Math.ceil(_that.target / _that.rate) : _that.speed;
            if (_that.target <= 0) {
                clearInterval(_that.timer);
                win("scrollTop", 0);
                window.onscroll = function () {
                    fn.call(_that);
                };
                return;
            }
            win("scrollTop", _that.target);
        }, 20);
        this.style.display = "none";
        window.onscroll = null;
        window.onmousewheel = function () {
            clearInterval(_that.timer);
            window.onscroll = function () {
                fn.call(_that);
            };
        }
    };
    window.onscroll = function () {
        fn.call(_that);
    };
    function fn() {
        var scrollHeight = win("scrollTop");
        if (scrollHeight > this.dis) {
            _that.container.style.display = "block";
        } else {
            _that.container.style.display = "none";
        }
    }
};
goTop.prototype.init = function () {
    this.bindEvent();
};

