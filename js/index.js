$(function(){
    var works_flags=false;
    var works_flags1=false;
    /*ui设计*/
    var t;
    var i;
    var num=0;
    var web=$("#works .screen");
    var work_offsettop=$("#works").offset().top;
    var work_height=$("#works").height();
    $(window).scroll(function(){
    if($(window).scrollTop()>=work_offsettop){
        if(works_flags) return;
        if(works_flags1) return;
        works_flags=true;
        $("#works .container .screen .static_web_page_start").show();
        var static_start=$("#works .container .screen .static_web_page_start div");
        static_start.eq(1).transition({top:"50%"},1000);
        static_start.eq(3).transition({ top:"50%"},1000);
        static_start.eq(5).transition({ top:"50%"},1000);
        static_start.eq(2).transition({ transformOrigin:"left",
            transform:"rotateY(-205deg)",delay:1000},1000);
        static_start.eq(3).transition({ transformOrigin:"left",
            transform:"rotateY(-205deg)"},1000);
        static_start.eq(4).transition({ transformOrigin:"right",
            transform:"rotateY(205deg)",delay:2000},1000);
        static_start.eq(5).transition({ transformOrigin:"right",
            transform:"rotateY(205deg)",delay:1000},1000,function(){
            $("#works .container .screen .static_web_page_start").hide();
            if(!works_flags1){
                 $("#works .container .screen .static_web_page").show();
            }
        });
    }
        if($(window).scrollTop()>$(window).height()){
            $("aside").show().css({display:"block"})
        }
    });
    function three_d(){
    web.find(".ui ol").each(function(index){
        var num=-index*100;
        $(this).find("li").css({backgroundPosition:"center "+num+"px"});
    });
    }
    // t=setInterval(move,3000);


    function move(){
        num++;
        var rotate=-90*num;
        web.find(".ui ol").each(function(index){
            $(this).css({transition:"transform 1s linear "+index*0.2+"s",transformOrigin:"center center -300px",transform:"rotateY("+rotate+"deg)"});
        })
    }
    three_d();
    /*----------------------------------------------上次修改的是这儿----------------------------------*/
    $(window).focus(function(){
        // web.find(".ui ol").each(function(index){
        //     var num=-index*100;
        //     $(this).find("li").css({backgroundPosition:"center "+num+"px"});
        // });
        clearInterval(t);
        clearInterval(i);
        t=setInterval(move,3000);
        i=setInterval(contents,3000);
    });
    $(window).blur(function(){
        clearInterval(t);
        clearInterval(i);
    });
    /*文本动画*/
    var content=web.find(".content dd");
    content.eq(0).show();

    var index=0;
    var next=0;
    // i=setInterval(contents,3000);
    function contents(){
        next++;
        if(next>3){
            next=0;
        }
        content.eq(index).fadeOut(1000)
            .end().eq(next).fadeIn(1000);
        index=next;
    }
    web.find(".content .btn").hover(function(){
        clearInterval(t);
        clearInterval(i);
    },function(){
        t=setInterval(move,3000);
        i=setInterval(contents,3000);
    })
    /*ui设计产品详情*/
    var more=web.find(".content .btn").click(function(){
        var url=$(this).attr("data-img");
        $("<img>").attr({src:"images/"+url+""}).appendTo(".works_zhezhao>div");
        $(".works_zhezhao").show();
        $("body").css("overflow","hidden");
        $(".works_zhezhao .close").click(function(){
            $(this).next().remove();
            $(".works_zhezhao").hide();
            $("body").css("overflow","scroll");
        })
    })
    $(".works_zhezhao").css({height:$(window).height()-68,width:$(window).width()});
   var images_box=$(".works_zhezhao div");
    if(document.addEventListener){
        $(".works_zhezhao div")[0].addEventListener("mousewheel",scrollfn,false);
        $(".works_zhezhao div")[0].addEventListener("DOMMouseScroll",scrollfn,false);
    }else if(document.attacEvent){
        images_box.attachEvent("onmousewheel",scrollfn);
    }
    function scrollfn(e){
        var ev=e||window.event;
        if(ev.wheelDelta==120||ev.detail==-3){
           return scrollUp.call(this,ev);
        }else if(ev.wheelDelta==-120||ev.detail==3){
            return scrollDown.call(this,ev);
        }
    }
    /*ui作品遮照事件*/
    images_box.find(".prev").click(scrollDown);
    images_box.find(".next").click(scrollUp);
    images_box.find(".callback").click(function(){

        images_box.find("img").animate({top:0},1000);
    });
    function scrollDown(ev){

        if(ev.type=="click"){
            tops=100;
        }else{
            tops=30;
        }
        var top=parseInt(images_box.find("img").css("top"));
        var imgLength=images_box.find("img").height();
        if(imgLength+top<=$(window).height()-68){
            return;
        }
        images_box.find("img").css({top:"-="+tops+""});
        // alert(1)
    }
    function scrollUp(ev){
        if(ev.type=="click"){
            tops=100;
        }else{
            tops=30;
        }
        var top=parseInt(images_box.find("img").css("top"));
        var imgLength=images_box.find("img").height();
        if(top>-30){
            return;
        }
        images_box.find("img").css({top:"+="+tops+""})
    }
    /*作为事件的外部函数一般不能传参数，因为那个参数就是事件对象*/




    /*静态网页*/
    /*按钮*/
    var static_flag1=true;
    var static_flag2=true;
    var staticPage=$("#works .container .screen .static_web_page li");
    var static_len=staticPage.length;
    function static_moveL(){
        if(!static_flag1) return;
        static_flag1=false;
        staticPage.each(function(index){
            var static_target=index==0?staticPage.eq(static_len-1):staticPage.eq(index-1);
             if(index<=3){
                 var delay=(3-index)*500;
                 if(index==3){
                 staticPage.eq(3).find("img").first().addClass("start").removeClass("startR").css("width","0").appendTo(staticPage.eq(2)).transition({width:"100%",delay:delay},900,function(){
                     staticPage.eq(2).find("img").first().addClass("start").removeClass("startR").css("width","0").appendTo(staticPage.eq(1)).transition({width:"100%",delay:delay},900,function(){
                         staticPage.eq(1).find("img").first().addClass("start").removeClass("startR").css("width","0").appendTo(staticPage.eq(0)).transition({width:"100%",delay:delay},900,function(){
                             staticPage.eq(0).find("img").first().addClass("start").removeClass("startR").css("width","0").appendTo(staticPage.eq(static_len-1))
                             static_flag1=true;
                         })
                     })
                 });
                 }
              }else{
                  $(this).find("img").first().appendTo(static_target);
              }
         })
    }
    function static_moveR(){
        if(!static_flag1) return;
        static_flag1=false;
        staticPage.each(function(index){
            var static_target=index==static_len-1?staticPage.eq(0):staticPage.eq(index+1);
            if(index<=2||index==static_len-1){
                var delay=0;
                if(index==static_len-1){
                    staticPage.eq(static_len-1).find("img").first().css("width","0").addClass("startR").removeClass("start").appendTo(staticPage.eq(0)).transition({width:"100%"},500,function(){
                        staticPage.eq(0).find("img").first().addClass("startR").removeClass("start").css("width","0").appendTo(staticPage.eq(1)).transition({width:"100%",delay:delay},500,function(){
                            staticPage.eq(1).find("img").first().addClass("startR").removeClass("start").css("width","0").appendTo(staticPage.eq(2)).transition({width:"100%",delay:delay},500,function(){
                                staticPage.eq(2).find("img").first().addClass("startR").removeClass("start").css("width","0").appendTo(staticPage.eq(3));
                                static_flag1=true;
                            })
                        })
                    });
                }
            }else{
                if(index==static_len-1){}
                   $(this).find("img").first().appendTo(static_target);

            }
        })
    }
    var staticPage_btnL=$("#works .container .screen .static_web_page .btnL");
    var staticPage_btnR=$("#works .container .screen .static_web_page .btnR");
    staticPage_btnL.click(static_moveL);
    staticPage_btnR.click(static_moveR);
    /*遮照*/
    staticPage.eq(1).hover(function(){
        if(!static_flag2) return;
        static_flag2=false;
        var name=$(this).find("img").attr("data-name");
        $("<div></div>").addClass("static_web_page_left_top").animate({width:"50%",height:"50%"},function(){
            $(this).css({transition:"transform 1s",transform:"scale(0) rotate(360deg)"});
            $("#works .container .screen .static_web_page dl dd[class="+name+"]").show().parent().css({zIndex:222}).transition({transform:"scaleX(1)"},800,"easeOutQuint");
            // $("<div></div>").addClass("static_web_page_center").animate({width:"100%",height:"50%"}).appendTo(staticPage.eq(1));
        }).appendTo(this);
        $("<div></div>").addClass("static_web_page_left_bottom").animate({width:"50%",height:"50%"},function(){
            $(this).css({transition:"transform 1s",transform:"scale(0) rotate(360deg)"});
        }).appendTo(this);
        $("<div></div>").addClass("static_web_page_right_top").animate({width:"50%",height:"50%"},function(){
            $(this).css({transition:"transform 1s",transform:"scale(0) rotate(360deg)"});
        }).appendTo(this);
        $("<div></div>").addClass("static_web_page_right_bottom").animate({width:"50%",height:"50%"},function(){
            $(this).css({transition:"transform 1s",transform:"scale(0) rotate(360deg)"});
        }).appendTo(this);
    },function(){

    })
    $("#works .container .screen .static_web_page dl").mouseout(function(){
        staticPage.eq(1).find(".static_web_page_left_top,.static_web_page_left_bottom,.static_web_page_right_top,   .static_web_page_right_bottom").remove();
        // staticPage.eq(1).find(".static_web_page_center").transition({background:"rgba(0,0,0,0.8)"},800).queue(function(){
        //     staticPage.eq(1).find(".static_web_page_center").remove().dequeue();
        // })
        $("#works .container .screen .static_web_page dl").transition({transform:"scaleX(0.3)"},800,"easeInBack",function(){
            $("#works .container .screen .static_web_page dl dd").hide().parent().css({zIndex:-111});
            static_flag2=true;
        });
    })
    /*初始动画*/



    /*整站*/
    var full_station=$("#works .container .screen .full_station .slide_bars~div");
    full_station.each(function(){
        var width=$(this).width();
        var full_station_len=$(this).find("img").length+2;
        var per=(96/full_station_len)+"%";
        var paddings=(96/(full_station_len-1))+"px";
        var father_index=$(this).index();
        /*js中利用百分比的方法*/
        $(this).find("img").css({width:per,marginLeft:paddings,marginRight:paddings,transition:"all 0.5s",zIndex:7777})
            .hover(function(){
                var left=width/full_station_len;
                var index=$(this).index();
                full_station.find("img").css({transition:"all  0s",transform:"scale(1)",top:"0",left:0,height:"auto",zIndex:7777});
                if(index==0){
                    $(this).css({transform:"scale(5)",transformOrigin:"left top",top:"30px",zIndex:9999,left:-left,transition:"all 0.5s"});
                }
                if(index==1){
                    $(this).css({transform:"scale(5)",transformOrigin:"left top",top:"30px",zIndex:9999,left:-12*left,transition:"all 0.5s"})
                }
                if(index==2){
                    $(this).css({transform:"scale(5)",transformOrigin:"left top",top:"30px",zIndex:9999,left:-22*left,transition:"all 0.5s"})
                }
                if(father_index==2||father_index==1){
                    $(this).css({transform:"scale(3)",transformOrigin:"left top",top:"30px",zIndex:9999,left:-left/3,transition:"all 0.5s"});
                }
            },function(){
                full_station.each(function(){});
                full_station.find("img").css({
                    transform: "scale(1)",
                    position: "relative",
                    top: "0",
                    left: 0,
                    height: "auto",
                    zIndex: 7777
                });

            });
    });
   $(".full_station .slide_bars li").hover(function(){
       full_station.each(function(){});
       full_station.find("img").css({
               transform: "scale(1)",
               position: "relative",
               top: "0",
               left: 0,
               height: "auto",
               zIndex: 7777
           })
   },function(){});
    $(".full_station .slide_bars li").click(function(){
        var target=$(this).attr("data-obj");
        full_station.each(function(){
            $(this).removeClass("actives");
            if($(this).is("."+target)){
                $(this).addClass("actives");
            }
        })
        $(".full_station .slide_bars li").removeClass("active");
        $(this).addClass("active");
    })

    /*游戏*/
    var game=$("#works .container .screen .game");
    var game_index=0;
    var game_next=0;
    var game_len=game.find(".type").length;
    game.find(".type").each(function(index){
        $(this).hide();
        if(index==0){
            $(this).show();
        }
    })
    var game_t=setInterval(game_move,1500);
    function game_move(){
        game_next++;
        if(game_next>=game_len){
            game_next=0;
        }
    game.find(".type").eq(game_index).fadeOut(1000).end().eq(game_next).fadeIn(1000);
        game_index=game_next;
    }
    game.find(".type").hover(function(){
        clearInterval(game_t)
    },function(){
        game_t=setInterval(game_move,1500);
    });

    /*选项卡*/
    var work_xx=$("#works ul.classify li");
    var work_xx_len=work_xx.length;
    var workClassify=$("#works .container .screen>div");
    var work_xx_flag=true;
    work_xx.click(function(){
        works_flags1=true;
        var workIndex=$(this).index();
        work_xx.removeClass("active");
        $(this).addClass("active");
         workClassify.css({display:"none"});
        workClassify.eq(workIndex).css({display:"block"});
        if(workIndex==0){
            $("#works .container .screen .static_web_page").show();
            $("#works .container .screen .static_web_page_start").hide();
        };
        clearInterval(t);
        clearInterval(i);
        if(workIndex==work_xx_len-1){
            if(work_xx_flag){
                work_xx_flag=false;
            clearInterval(t);
            clearInterval(i);
            i=setInterval(contents,1000);
            t=setInterval(move,1000);
            $("#works .container .screen .ui").show();
            $("#works .container .screen ol li").transition({left:0,top:0,delay:1000},1500,function(){
                $("#works .container .screen .ui ol li").show();
                $("#works .container .screen .ui").animate({top:0},1500,"easeOutBounce");
                clearInterval(i);
                clearInterval(t);
                t=setInterval(move,3000);
                i=setInterval(contents,3000);
                
            });
        }else{
                clearInterval(t);
                clearInterval(i);
                i=setInterval(contents,3000);
                t=setInterval(move,3000);
            }
        }
    })
/*----------------------------------------------上次修改的是这儿----------------------------------*/
    /*导航响应*/
    var floor=$(".floor");
    var floor_arr=[];
    var floor_arr_height=[];
    var nav=$(".top-nav ul li ");
    floor.each(function(){
       floor_arr.push($(this).offset().top);
        floor_arr_height.push($(this).height()/2);
    });
    $(window).scroll(function(e){
        var ev=e||window.event;
        if($(window).scrollTop()>0&&$(window).scrollTop()<floor_arr[1]-floor_arr_height[1]){
            nav.removeClass("active");
            nav.eq(0).addClass("active");
        }
        if($(window).scrollTop()>floor_arr[1]-floor_arr_height[1]&&$(window).scrollTop()<floor_arr[2]-floor_arr_height[2]){
           nav.removeClass("active");
            nav.eq(1).addClass("active");
        }
        if($(window).scrollTop()>floor_arr[2]-floor_arr_height[2]&&$(window).scrollTop()<floor_arr[3]-floor_arr_height[3]){
            nav.removeClass("active");
            nav.eq(2).addClass("active");
        }
        if($(window).scrollTop()>floor_arr[3]-floor_arr_height[3]){
            nav.removeClass("active");
            nav.eq(3).addClass("active");
        }
    })

});
/*响应式*/
$(function(){
    var menu=$(".top-nav .menu");
    menu.click(function(){
        $(this).parent().toggleClass("active");
    });
    menu.nextAll("li").click(function(){
        $(this).parents("ul").toggleClass("active");
    })
});
/*留言*/
$(function(){
    /*联系我*/
    var id=0;
    var liuyan=$("#contacts .box2");
    $.ajax({
        url:"php/select.php",
        data:"",
        dataType:"json",
        success:function(aa){
            $.each(aa,function(index,value){
                id++;
                var date=$("<span></span>").html(value.date);
                liuyan.find("li").html(value.content).append(date);

            })
        }
    });

    liuyan.find("input").click(function(){
        var val=liuyan.find("textarea").val();
        if(val=="") return;
        var time=new Date();
        var year=time.getFullYear();
        var mon=time.getMonth()+1;
        var day=time.getDate();
        var date=$("<span></span>").html(year+"年"+mon+"月"+day+"日");
        var liuyanDate=year+"年"+mon+"月"+day+"日";
        liuyan.find("li").html(val).append(date);
        liuyan.find("textarea").val("");
        id++;
        $.ajax({
            url:"php/insert.php",
            // data:"id="+id+"&"+"content="+val+"&"+"date="+liuyanDate,
            data:{id:id,content:val,date:liuyanDate},
            success:function(){
            }
        });
    });
});
/*侧边导航*/
var aside=$("aside .tx");
aside.click(function(){
    $(this).toggleClass("active");
});
var num = 0;
var dt;
$(".banner").hover(function () {
    clearInterval(dt);
}, function () {
    dt = setInterval(function () {
        $(".banner>ul").transition({rotateY: "-=60"});
    }, 2000);
});
/*表盘*/
var h, m, s;

function createBp() {
    /*创建刻度*/
    for (var i = 0; i < 60; i++) {
        var widths = 2;
        var heights = 8;
        if (i % 5 == 0) {
            widths = 4;
            heights = 16;
        }
        var num = i * 6;
        $("<div></div>").css({
            width: widths,
            height: heights,
            background: "rgba(55, 72, 148, 0.85)",
            position: "absolute",
            left: "149px",
            top: "7px",
            transformOrigin: "1px 143px",
            transform: "rotate(" + num + "deg)"
        }).appendTo(".biaopan");
    }
    /*创建数字*/
    for (var i = 0; i < 12; i++) {
        var biaonum = (i + 6) % 12;
        if (biaonum == 0) {
            biaonum = 12;
        }
        var biaoangle = -i * 30 * Math.PI / 180;
        var biaoleft = 135 + 120 * Math.sin(biaoangle) + "px";
        var biaotop = 135 + 120 * Math.cos(biaoangle) + "px";
        $("<div>" + biaonum + "</div>")
            .css({
                width: "30px",
                height: "30px",
                position: "absolute",
                left: biaoleft,
                top: biaotop,
                fontSize: "20px",
                fontWeight: "800",
                textAlign: "center",
                lineHeight: "30px"
            }).appendTo(".biaopan");
    }

    /*创建时间*/
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var soc = date.getSeconds();
    /*时针*/
    h = $("<div></div>").css({
        width: 10,
        height: 55,
        background: "#000",
        borderRadius: "6px 6px 5px 5px/15px 15px 3px 3px",
        position: "absolute",
        left: 145,
        bottom: 148,
        zIndex: 3,
        transformOrigin: "5px 53px",
        transform: "rotate(" + (hour * 30 + min * 0.5) + "deg)"
    }).appendTo(".biaopan");
    /*分针*/
    m = $("<div></div>").css({
        width: 8,
        height: 70,
//                    background: "#000",
        borderRadius: "5px 5px 5px 5px",
        position: "absolute",
        backgroundImage: "linear-gradient(to bottom,#292929 0%,#292929 60%,#0A0A0A 90%)",
        left: 146,
        bottom: 140,
        zIndex: 2,
        transformOrigin: "center 60px",
        transform: "rotate(" + min * 6 + "deg)"
    }).appendTo(".biaopan");
    /*秒针*/
    s = $("<div></div>").css({
        width: 4,
        height: 120,
        background: "#f00",
        borderRadius: "5px 5px 5px 5px",
        position: "absolute",
        left: 148,
        bottom: 125,
        zIndex: 1,
        transformOrigin: "2px 95px",
        transform: "rotate(" + soc * 6 + "deg)"
    }).appendTo(".biaopan");
}


function createTime() {
    setInterval(function () {
        var date = new Date();
        var hour = date.getHours();
        var min = date.getMinutes();
        var soc = date.getSeconds();
        s.css({transform: "rotate(" + soc * 6 + "deg)"});
        m.css({transform: "rotate(" + min * 6 + "deg)"});
        h.css({transform: "rotate(" + (hour * 30 + min * 0.5) + "deg)"});
        /*连接一个集合需要需要用括号圈起来*/
    }, 1000);
}


// 雨滴
function start() {
    var width = document.documentElement.clientWidth;
    var height = document.documentElement.clientHeight;
    var arr = [];
    for (var i = 0; i < 200; i++) {
        var rleft = parseInt(width * Math.random());
        var rtop = -100 * Math.random() - 30;
        var div = document.createElement("div");
        div.style.cssText = "width:3px;height:5px;background:#e4f8ff;position:absolute;left:" + rleft + "px;top:" + rtop +
            "px;transition:all ease-in 3s " + 3 * Math.random() + "s";
        /*这儿的延迟时间最好设置的比动画时间打一点*/
        /*div.style.cssText
         * 等于号后面是双引号，每个样式用分号隔开*/
        arr.push(div);

        document.getElementsByClassName("yudibox")[0].appendChild(div);
    }

    setTimeout(function () {
        for (var j = 0; j < arr.length; j++) {
            arr[j].style.transform = "translateY(" + (height + 140) + "px)";
            arr[j].addEventListener("transitionend", function () {
                this.style.transition = "";
                this.style.transform = "translateY(0)";
                var that = this;
                setTimeout(function () {
                    that.style.transition = "all 3s ease-out";
                    that.style.transform = "translateY(" + (height + 140) + "px)"
                }, 0)
            }, false);
        }
    }, 0);
    /*时间函数放在循环的内部和外部不一样？？？？？*/
}

$(window).focus(function () {
    document.getElementsByClassName("yudibox")[0].innerHTML = "";
    start();
});
$(window).blur(function () {
    document.getElementsByClassName("yudibox")[0].innerHTML = "";
})



var cssFlag=true;
var h5Flag=true;
var otherFlag=true;
aside.find("div.item").click(function(){

    if($(window).width()>=1000&&$(this).html()=="CSS3"&&cssFlag==true){
            cssFlag=false;
        h5Flag=true;
        otherFlag=true;
        $(".banner").show();
        $(".others").hide();
            createBp();
             dt = setInterval(function () {
                $(".banner>ul").transition({rotateY: "-=60"});
                window.rotatenum = num % 6;
                num++;
            }, 2000);
            createTime();
            start();
        $(".h5play").hide()
    }else if($(window).width()<1000&&$(this).html()=="CSS3"&&cssFlag==true){
        cssFlag=false;
        $(".banner").hide();
        $(".smallScreen").show();
        $(".h5play").hide();
        $(".others").hide();
        h5Flag=true;
        otherFlag=true;
    }else if($(this).html()=="HTML5"&&h5Flag==true){
        $(".h5play").show();
        $(".banner").hide();
        $(".smallScreen").hide();
        $(".others").hide();
        h5Flag=false;
        cssFlag=true;
        otherFlag=true;
    }else if($(this).html()=="其它"&&otherFlag==true){
        h5Flag=true;
        cssFlag=true;
        otherFlag=false;
        $(".h5play").hide();
        $(".banner").hide();
        $(".smallScreen").hide();
        $(".others").show();
    }
   $(this).parents(".tx").next(".show").slideDown();
});
$(".show .close").click(function(){
    $(".show").hide();
})