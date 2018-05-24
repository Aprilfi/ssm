<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" import="java.util.*"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <title>Bootstrap-Table</title>
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
<div class="col-*-12">
    <%--<div id="toolbar_a" class="search" style="padding-top: 20px;padding-left: 10px;">
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
    </div>--%>
    <%--工具栏--%>
        <div id="toolbar">
            <div class="btn btn-primary glyphicon glyphicon-pencil" id="btn_add" data-toggle="modal"
                 data-target="#addModal">添加记录
            </div>
            <div class="btn btn-danger glyphicon glyphicon-remove" onclick="javascript:dels();">批量删除</div>
        </div>

        <%--表格--%>
        <table id="table" data-toolbar="#toolbar"></table>

        <%--弹出层-增加--%>
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel_add">操作</h4>
                    </div>
                    <div class="modal-body">
                        <form role="form" action="javascript:void(0)" id="addForm">
                        <div class="form-group">
                            <label for="orderid">订单编号</label>
                            <input type="text" name="orderid" data-bind="value:orderid" class="form-control"
                                   id="txt_orderid" placeholder="订单编号">
                        </div>

                        <div class="form-group">
                            <label for="txt_orderprice">订单总价</label>
                            <input type="text" name="orderprice" data-bind="value:orderprice" class="form-control"
                                   id="txt_orderprice"
                                   placeholder="订单总价">
                        </div>
                        <div class="form-group">
                            <label for="txt_ordertime">下单时间</label>
                            <input type="text" name="ordertime" data-bind="value:ordertime" class="form-control"
                                   id="txt_ordertime"
                                   placeholder="下单时间">
                        </div>
                        <div class="form-group">
                            <label for="txt_orderuser">下单用户</label>
                            <input type="text" name="orderuser" data-bind="value:orderuser" class="form-control"
                                   id="txt_orderuser"
                                   placeholder="下单用户">
                        </div>

                        <div class="form-group">
                            <label for="txt_orderdescribe">订单描述</label>
                            <input type="text" name="orderdescribe" data-bind="value:orderdescribe" class="form-control"
                                   id="txt_orderdescribe"
                                   placeholder="订单描述">
                        </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>关闭</button>
                        <button type="button" id="addRecord" class="btn btn-primary" data-dismiss="modal"><span
                                class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存</button>
                    </div>
                </div>
            </div>
        </div>

        <%--弹出层-修改--%>
        <!-- 更新 -->
        <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel_update">更新记录</h4>
                    </div>
                    <div class="modal-body">
                        <form role="form" action="javascript:void(0)" id="updateForm">
                            <input type="text" hidden="hidden" name="id" id="id">
                            <div class="form-group">
                                <input type="text" class="form-control" name="orderid" id="orderid">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" name="ordertime" id="ordertime">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" name="orderprice" id="orderprice">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" name="orderuser" id="orderuser">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" name="orderdescribe" id="orderdescribe">
                            </div>
                            <%--<div class="form-group">--%>
                                <%--<label class="checkbox-inline">--%>
                                    <%--<input type="radio" name="useable" id="used" value="1" checked>可用--%>
                                <%--</label>--%>
                                <%--<label class="checkbox-inline">--%>
                                    <%--<input type="radio" name="useable" id="unused"  value="0">禁用--%>
                                <%--</label>--%>
                            <%--</div>--%>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" id="updateRecord">提交</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    $(function() {
        $('#table').bootstrapTable({
            url: "<%=basePath%>findOrderByPage",//这个接口需要处理bootstrap table传递的固定参数
            method: 'post',
            toolbar: '#toolbar',    //工具按钮用哪个容器
            striped: true,      //是否显示行间隔色
            cache: false,      //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,     //是否显示分页
            sortable: false,      //是否启用排序
            dataType: "json",
            direction: 'asc',
            contentType: "application/x-www-form-urlencoded",
            pageNumber: 1,      //初始化加载第一页，默认第一页
            pageSize: 5,      //每页的记录行数
            pageList: [5, 10, 25, 50, 100],  //可供选择的每页的行数
            searchAlign: "left",//查询框对齐方式
            //queryParamsType: 'limit', //默认值为 'limit' ,在默认情况下 传给服务端的参数为：offset,limit,sort
            sidePagination: "server",   //分页方式：client客户端分页，server服务端分页
            search: true,      //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            showColumns: true,  //显示下拉框勾选要显示的列
            showRefresh: true,     //是否显示刷新按钮
            clickToSelect: true,    //是否启用点击选中行
            buttonsAlign:"right",  //按钮位置
            showToggle:true,       //是否显示详细视图和列表视图的切换按钮
            height: $(window).height()-50, //自定义表格的高度
            sortName : "orderid",
            locale: 'zh-CN',//中文支持,
            queryParamsType:'',
            queryParams: function queryParams(params) {
                var param = {
                    pageNumber: params.pageNumber,
                    pageSize: params.pageSize
                };
                return param;
            },

            columns: [{
                title: "全选", field: "select", checkbox: true, width: 20,align: "center",valign: "middle"//垂直
            },{
                field: 'orderid',
                title: '订单编号',
                align: "center",
            }, {
                field: 'ordertime',
                title: '下单时间',
                align: "center",
            }, {
                field: 'orderprice',
                title: '订单总价',
                align: "center",
            }, {
                field: 'orderuser',
                title: '用户',
                align: "center",
            }, {
                field: 'orderdescribe',
                title: '订单描述',
                align: "center",
            }, {
                field: "operation",
                title: "操作",
                formatter: function (value, row, index) {
                    var edit =
                        '<button type="button" class="btn btn-default" onclick="javascript:showUpdateModal(\'' +
                        row.orderid + '\',\'' + row.ordertime + '\',\'' + row.orderprice + '\',\'' + row.orderuser +
                        '\',\'' +
                        row.orderdescribe +
                        '\')"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>更新</button>';
                    var del = '<button type="button" class="btn btn-default" onclick="javascript:dels(\'' +
                        row.orderid +
                        '\')"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除</button>';
                    return edit + del;
                },
                align: "center"
            }],
            paginationPreText: "上一页",
            paginationNextText: "下一页",
        });

        $('#btn_add').on("click", function () {
            $("#myModal").modal().on("shown.bs.modal", function () {
            }).on('hidden.bs.modal', function () {
            });
        });

        //添加数据
        $("#addRecord").click(function(){
            var data = $("#addForm").serializeArray();
            alert(data);
            $.ajax({
                url: "addOrder",
                dataType: "json",
                type: "post",
                data: data,
                success: function (req){
                    if (req) {
                        $('#addModal').modal('hide');
                        $('#table').bootstrapTable('refresh');
                        layer.msg('添加成功', {time: 3000, icon:6});
                        return;
                    }
                        //捕获页
                        layer.msg('添加失败', {time: 3000, icon:6});
                },
                error: function(req){}
            });
        });

        //更新数据
        $("#updateRecord").click(function(){
            var data = $("#updateForm").serialize();
            $.ajax({
                url: "updateOrder",
                dataType: "json",
                type: "post",
                data: data,
                success: function (req){
                    if (req) {
                        $('#updateModal').modal('hide');
                        $('#table').bootstrapTable('refresh');
                    } else {
                        alert("更新失败");
                    }
                },
                error: function(req){}
            });
        });
    });

    //显示更新模态框
    function showUpdateModal(orderid, ordertime, orderprice, orderuser, orderdescribe){
        $("#orderid").val(orderid);
        $("#orderprice").val(orderprice);
        $("#orderdescribe").val(orderdescribe);
        $("#ordertime").val(ordertime);
        $("#orderuser").val(orderuser);

        $('#updateModal').modal('show');
    }

    //获取选择ID
    function getIdSelections() {
        return $.map($('#table').bootstrapTable('getSelections'), function(row) {
            return row.orderid
        });
    }


    //删除记录
    function dels(ids) {
        if(confirm("确定删除选中记录吗?")){
            if(undefined == ids){
                ids = getIdSelections();
                //捕获页
                layer.msg('请选择一行及以上的数据', {time: 3000, icon:6});
            }

            $.ajax({
                url : "deleteByOrderid?ids=" + ids,
                type : "post",
                traditional: true, //traditional 为true阻止深度序列化
                dataType : "json",
                success : function(req) {
                    if (req) {
                        $('#table').bootstrapTable('refresh');
                        layer.msg('删除成功', {time: 3000, icon:6});
                        return;
                    }
                    layer.msg('删除失败', {time: 3000, icon:6});

                },
                error : function(req) {}
            });
        }
    }
</script>
</body>
</html>
