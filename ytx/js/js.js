setTimeout(function () {
    $(".ad")
        .slideDown("normal")
        .slideUp("slow")
        .fadeIn(1000)
        .children("span").click(function () {
        $(this).parent().fadeOut();
    });

}, 1000);


//渐显的轮播图的显示
//1、获取数据
var banner = document.getElementById("banner");
var bannerInner = utils.getElesByClass('bannerInner', banner)[0];
var imgs = bannerInner.getElementsByTagName('img');
var focusList = utils.getElesByClass('focusList', banner)[0];
var lis = focusList.getElementsByTagName("li");
var left = banner.getElementsByTagName('a')[0];
var right = banner.getElementsByTagName('a')[1];

// 发送ajax请求
var data = null;
;(function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'data/imgs_data_news.txt?_=' + Math.random(), false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            data = utils.jsonParse(xhr.responseText);
        }
    };
    xhr.send(null);
})();


//绑定数据
;(function bindData() {
    if (data && data.length) {
        var str = '';
        var strLi = '';
        for (var i = 0; i < data.length; i++) {
            var curObj = data[i];
            str += '<div><img src="" alt="" trueSrc="' + curObj.src + '"/></div>';
            strLi += i === 0 ? '<li class="selected"></li>' : '<li></li>'
        }
        bannerInner.innerHTML = str;
        focusList.innerHTML = strLi;
    }
})();

left.onclick = function () {
    if (banner.isOkClick) {
        banner.isOkClick = false;
        step--;
        if (step == -1) {
            step = imgs.length - 1;
        }
        setImg();
    }
};

right.onclick = autoMove;
//图片的延迟加载
;
(function lazyLoadImg() {
    for (var i = 0; i < imgs.length; i++) {
        var curImg = imgs[i];
        var tempImg = new Image();
        tempImg.src = curImg.getAttribute('trueSrc');
        tempImg.index = i;
        tempImg.onload = function () {
            imgs[this.index].src = this.src;
            if (this.index === 0) {
                //显示第一张图片
                $(imgs[0]).parent().css("zIndex", 1);
                $(imgs[0]).parent().animate({
                    opacity: 1
                }, 500);
            }
        }
    }
})();

var step = 0;
function autoMove() {
    if (banner.isOkClick) {
        banner.isOkClick = false;
        if (step === imgs.length - 1) {
            step = -1
        }
        step++;
        setImg();
    }
}
;(function () {
    for (var i = 0; i < lis.length; i++) {
        lis[i].index = i;
        lis[i].onclick = function () {
            step = this.index;
            setImg();
        }
    }
})();

function setImg() {
    for (var i = 0; i < imgs.length; i++) {
        if (i === step) {
            $(imgs[i]).parent().css("zIndex", 1);
            $(imgs[i]).parent().animate({
                opacity: 1
            }, 500, function () {
                //回调函数
                var otherDivs = $(imgs[step].parentNode).siblings('div');
                otherDivs.each(function (index, item) {
                    $(item).css("opacity", 0);
                });
                window.setTimeout(function () {
                    banner.isOkClick = true;
                });
            })
        } else {
            $(imgs[i]).parent().css("zIndex", 0);
        }
    }
    focusAlign();
}

function focusAlign() {
    for (var i = 0; i < lis.length; i++) {
        lis[i].className = i == step ? "selected" : "";
    }
}
banner.isOkClick = true;
banner.timer = window.setInterval(autoMove, 2000);
banner.onmouseover = function () {
    window.clearInterval(banner.timer);
};
banner.onmouseout = function () {
    banner.timer = window.setInterval(autoMove, 2000);
};


function tab(obj) {
    var target = document.getElementById(obj);
    var spans = target.getElementsByTagName("span");
    var lis = target.getElementsByTagName("li");
    for (var i = 0; i < spans.length; i++) {
        var otimer = null;
        spans[i].onmouseover = function (num) {
            return function () {
                clearTimeout(otimer);
                otimer = setTimeout(function () {
                    for (var j = 0; j < spans.length; j++) {
                        spans[j].className = "";
                        lis[j].className = "";
                    }
                    spans[num].className = "current";
                    lis[num].className = "show";
                }, 100);

            }
        }(i);
        spans[i].onmouseout = function () {
            clearTimeout(otimer);
        }
    }
}
tab("one");

