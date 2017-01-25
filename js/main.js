'use strict';

$(function() {
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
    $('#main_ad > .carousel-inner > .item').each(function(i, item) {
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



  //回到顶部
  function $$(id) {return document.getElementById(id);}
/*  function show(obj) { obj.style.display = "block";}
  function hide(obj) { obj.style.display = "none";}*/
  function scroll() {
    if(window.pageYOffset != null)  //  ie9+ 和其他浏览器
    {
      return {
        left: window.pageXOffset,
        top: window.pageYOffset
      }
    }
    else if(document.compatMode == "CSS1Compat")  // 声明的了 DTD
    // 检测是不是怪异模式的浏览器 -- 就是没有 声明<!DOCTYPE html>
    {
      return {
        left: document.documentElement.scrollLeft,
        top: document.documentElement.scrollTop
      }
    }
    return { //  剩下的肯定是怪异模式的
      left: document.body.scrollLeft,
      top: document.body.scrollTop
    }
  }


  var goTop=$("#gotop");
  var timer=null;
  var target= 0,leader=0;//他的目标位置永远是最上面的位置,所以是0，改变的数值是leader
  $(window).scroll(function(){
    scroll().top>100?goTop.css("display","block"):goTop.css("display","none");
    //这个leader是随着滚动的时候改变的
    leader = scroll().top;  // 把 卷去的头部 给  起始位置

    //匀速的回到顶部
    var t = scroll().top;  //获取距离页面顶部的距离
    var uptop = $( "#uptop" ); //获取div元素
    if( t >= 100) { //当距离顶部超过100px时
      uptop.css("bottom","5px");//使div距离底部30px，也就是向上出现
    } else { //如果距离顶部小于300px
      uptop.css("bottom","-50px");//使div向下隐藏
    }
  });

  var top=$("#to-top");//获取图片元素
  var uptimer=null;
  top.on("click",function(){
    uptimer=setInterval(function(){ //设置一个计时器
      var ct = document.documentElement.scrollTop || document.body.scrollTop; //获取距离顶部的距离
      ct-=30;
      if(ct>0){//如果与顶部的距离大于零
        window.scrollTo(0,ct);//向上移动10px
      }
      else{//如果距离小于等于零
        window.scrollTo(0,0);//移动到顶部
        clearInterval(uptimer);//清除计时器
      }
    },10);//隔10ms执行一次前面的function，展现一种平滑滑动效果
  });



  $(goTop).on("click",function(){
    timer=setInterval(function(){
      leader=leader+(target-leader)/10;
      window.scrollTo(0,leader);
      if(target==leader){
        clearInterval(timer);
      }
    },10);
  });

  //匀速的滑到顶部


  //插件的使用



  new WOW().init();

  //点击导航栏，菜单隐藏
  $(".navbar-collapse a").click(function(){
    $(".navbar-collapse").collapse('hide');
  });










});
