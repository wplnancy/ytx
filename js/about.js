/**
 * Created by Administrator on 2016/9/22.
 */
$("#myTab a").on("click",function(){
     $(this).addClass("active").siblings("a").removeClass("active");

});
$("#myTab a").on("mouseenter",function(){
    $(this).addClass("active1").siblings("a").removeClass("active1");

}).on("mouseout",function(){
    $(this).removeClass("active1");
});

$('#myTab a:last').tab('show');
$('#summary a').tooltip(
    { "show": 500, "hide": 100 }
);

//��ͼ��Ӧ��

var map = new AMap.Map('address', {
    resizeEnable: true,
    zoom:11,
    center: [116.397428, 39.90923]
});

var marker = new AMap.Marker({//�������
    position: map.center,//���ñ��λ��
    map:map//����map���ԣ�ʹ�ñ���ܱ�������ӵ���ͼ��
});
//marker.setMap();�Ƴ�����

<!--��ӹ������ͱ�������-->
AMap.plugin(['AMap.ToolBar','AMap.Scale'],function(){//���ع������ͱ�������������ŵ�������
    var toolBar = new AMap.ToolBar();//�ڻص���������пؼ������ɺ����
    var scale = new AMap.Scale();
    map.addControl(toolBar);
    map.addControl(scale);
});
//map.removeControl(toolBar);�Ƴ��ؼ�