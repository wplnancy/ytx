$(function () {
    // 当文档加载完成才会执行
    /**
     * 根据屏幕宽度的变化决定轮播图片应该展示什么
     */
    function resize() {
        // 获取屏幕宽度
        var windowWidth = $(window).width();
        // 判断屏幕属于大还是小
        var isSmallScreen = windowWidth < 768;
        // 根据大小为界面上的每一张轮播图设置背景
        // $('#main_ad > .carousel-inner > .item') // 获取到的是一个DOM数组（多个元素）
        $('#main_ad > .carousel-inner > .item').each(function (i, item) {
            // 因为拿到是DOM对象 需要转换
            var $item = $(item);
            // var imgSrc = $item.data(isSmallScreen ? 'image-xs' : 'image-lg');
            var imgSrc =
                isSmallScreen ? $item.data('image-xs') : $item.data('image-lg');

            // 设置背景图片
            $item.css('backgroundImage', 'url("' + imgSrc + '")');
            //
            // 因为我们需要小图时 尺寸等比例变化，所以小图时我们使用img方式
            if (isSmallScreen) {
                $item.html('<img src="' + imgSrc + '" alt="" />');
            } else {
                $item.empty();
            }
        });
    }

    $(window).on('resize', resize).trigger('resize');


    new WOW().init();

    //点击导航栏，菜单隐藏
    $(".navbar-collapse a").click(function () {
        $(".navbar-collapse").collapse('hide');
    });


    //回到顶部
    var box = document.getElementById("gotop");
    var toTop = new goTop({
        container: box,
        effect: true,
        dis: 400,
        rate: 5
    });
});


//客户评价
var customer = utils.getElesByClass("customer")[0];
var judgebox = utils.getElesByClass("judgebox")[0];
var preBtn = utils.getElesByClass("prev")[0];
var nextBtn = utils.getElesByClass("next")[0];
var focusList = utils.getElesByClass("focusList")[0];
var focus = focusList.getElementsByTagName("a");
var lis = judgebox.getElementsByTagName('li');
console.log(preBtn);
var step = 0;
function focusAlign() {
    for (var i = 0; i < focus.length; i++) {
        focus[i].className = step == i ? "cur" : "";
    }
}
for (var i = 0; i < focus.length; i++) {
    focus[i].index = i;
    focus[i].onmouseover = function () {
        step = this.index;
        for (var i = 0; i < focus.length; i++) {
            focus[i].className = step == i ? "cur" : "";
            lis[i].className = step == i ? "selected" : "";
        }
    }
}
judgebox.timer = window.setInterval(autoMove, 1000);


preBtn.onclick = function () {
    step--;
    if (step == -1) {
        step = lis.length - 1;
    }
    for (var i = 0; i < lis.length; i++) {
        lis[i].className = step == i ? "selected" : "";
    }
    focusAlign();
};
nextBtn.onclick = autoMove;
function autoMove() {
    step++;
    if (step == lis.length) {
        step = 0;
    }
    for (var i = 0; i < lis.length; i++) {
        lis[i].className = step == i ? "selected" : "";
    }
    focusAlign();
}
customer.onmouseout = function () {
    judgebox.timer = window.setInterval(autoMove, 1000);
};
customer.onmouseover = function () {
    judgebox.timer = window.clearInterval(judgebox.timer);
};


for (var i = 0; i < lis.length; i++) {
    var curLi = lis[i];
    lis[i].index = i;

}

// 下拉菜单

var timer = null;
$(".dropdown").on("mouseenter", function () {
    window.clearInterval(timer);
    timer = window.setTimeout(function () {
        $(".subMenu").fadeIn(600);
    }, 200);

}).on("mouseleave", function () {
    $(".subMenu").fadeOut("fast");
});







