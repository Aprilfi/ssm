<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" import="java.util.*"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <title>Title</title>
    <link href="${path}/bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="${path}/bootstrap-3.3.7-dist/bootstrap-table/bootstrap-table.css" rel="stylesheet" type="text/css">
    <link href="${path}/layer-v3.1.1/layer/mobile/need/layer.css" rel="stylesheet" type="text/css">
    <script src="${path}/bootstrap-3.3.7-dist/jquery_3.2.1/jquery.min.js"></script>
    <script src="${path}/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
    <script src="${path}/bootstrap-3.3.7-dist/bootstrap-table/bootstrap-table.js"></script>
    <script src="${path}/bootstrap-3.3.7-dist/bootstrap-table/bootstrap-table-zh-CN.js"></script>
    <script src="${path}/layer-v3.1.1/layer/layer.js"></script>

    <script src="${path}/init.js"></script>

</head>
<body>
<div>
    <div class="layer_notice"></div>
    <div id="toolbar_a" class="search" style="padding-top: 20px;padding-left: 10px;">
            价格：<input id="pricestart" type="number"/>  ~
            <input id="priceend" type="number"/>
            <button id="btn_search_a" class="btn btn-default">
                查询
            </button>
            <spand style="margin-left: 150px">下单时间：</spand><input id="timetart" type="datetime-local"/>  ~
            <input id="timeend" type="datetime-local"/>
            <button id="btn_search_b" class="btn btn-default">
                查询
            </button>
    </div>
    <%--工具栏--%>
    <div id="toolbar" class="btn-group" style="margin-left: 10px;">
        <button id="btn_add" type="button" class="btn btn-default">
            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
        </button>
    </div>

        <%--表格--%>
    <table id="test-table" class="col-xs-12" data-toolbar="#toolbar"></table>

        <%--弹出层--%>
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">操作</h4>
                    </div>
                    <div class="modal-body">

                        <div class="form-group">
                            <label for="txt_orderid">订单编号</label>
                            <input type="text" name="txt_orderid" data-bind="value:orderid" class="form-control"
                                   id="txt_orderid" placeholder="订单编号">
                        </div>

                        <div class="form-group">
                            <label for="txt_orderprice">订单总价</label>
                            <input type="text" name="txt_orderprice" data-bind="value:orderprice" class="form-control"
                                   id="txt_orderprice"
                                   placeholder="订单总价">
                        </div>

                        <div class="form-group">
                            <label for="txt_orderdescribe">订单描述</label>
                            <input type="text" name="txt_orderdescribe" data-bind="value:orderdescribe" class="form-control"
                                   id="txt_orderdescribe"
                                   placeholder="订单描述">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>关闭</button>
                        <button type="button" id="btn_submit" class="btn btn-primary" data-dismiss="modal"><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存</button>
                    </div>
                </div>
            </div>
        </div>
</div>
<script type="text/javascript">
    $(function() {
        initTable("<%=basePath%>findOrderByPage",{});
        var arr = location.href.substr(location.href.indexOf("?")+1).split('?');
        layer.msg('欢迎登陆，'+arr, {time: 3000, icon:6});

        $("#btn_search_a").click(function(){
            var searchArgs={
                pricestart:$("#pricestart").val(),
                priceend:$("#priceend").val(),
            };
            initTable(searchArgs)
        });

        $('#btn_add').on("click", function () {
            $("#myModal").modal().on("shown.bs.modal", function () {
                $("#btn_submit").click(function(){
                    //获取表单内数据
                    var orderid = $("#txt_orderid").val();
                    var orderprice = $("#txt_orderprice").val();
                    var orderdescribe = $("#txt_orderdescribe").val();
                    $.post(
                        "/GoodsServlet?method=addGoods",
                        {orderid:orderid,orderprice:orderprice,orderdescribe:orderdescribe},
                        function(message){
                            if(message.indexOf("success") == 0){
                                //捕获页
                                layer.msg('添加成功', {time: 3000, icon:6});
                                $("#txt_orderid").val('');
                                $("#txt_orderprice").val('');
                                $("#txt_orderdescribe").val('');
                            } else {
                                //捕获页
                                layer.msg('添加失败', {time: 3000, icon:6});
                            }
                        }
                    );

                });
            }).on('hidden.bs.modal', function () {
            });
        });

        $("#btn_search_a").click(function(){
            var pricestart = $("#pricestart").val();
            var priceend = $("#priceend").val();
            if(pricestart.length == 0 || priceend.length == 0) layer.msg('请填写查询关键字',{time:1000,icon:6});
            $.post(
                "SearchServlet?method=priceSearch",
                {pstart:pricestart,pend:priceend},
                function(message){
                    //failure
                    if(message == "fair"){
                        layer.msg("查询结果为空",{time:2000,icon:26});
                    }else{
                        alert(message);
                    }
                }
            );

        });

        $("#btn_search_b").click(function(){
            var timestart = $("#timetart").val();
            var timeend = $("#timeend").val();
            $.post(
                "SearchServlet?method=timeSearch",
                {tstart:timestart,tend:timeend},
                function(message){
                    if(message == "fair"){
                        layer.msg("查询结果为空",{time:2000,icon:26});
                    }else{
                        layer.msg(message,{time:2000,icon:26});
                    }
                }
            );

        });

    })


</script>
</body>
</html>
