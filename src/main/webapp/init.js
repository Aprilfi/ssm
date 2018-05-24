function initTable(url,searchArgs) {
    $('#test-table').bootstrapTable({
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
        //按需求设置不同的样式：5个取值代表5中颜色['active', 'success', 'info', 'warning', 'danger'];
        rowStyle: function (row, index) {
            var style = "";
            style='active';
            return { classes: style }
        },
        url: url,//这个接口需要处理bootstrap table传递的固定参数
        //queryParamsType: 'limit', //默认值为 'limit' ,在默认情况下 传给服务端的参数为：offset,limit,sort
        queryParamsType:'',
        queryParams: function queryParams(params) {
            var param = {
                pageNumber: params.pageNumber,
                pageSize: params.pageSize
            };
            for(var key in searchArgs){
                param[key]=searchArgs[key]
            }
            return param;
        },
        // 设置为 ''  在这种情况下传给服务器的参数为：pageSize,pageNumber
        //queryParams: queryParams,//前端调用服务时，会默认传递上边提到的参数，如果需要添加自定义参数，可以自定义一个函数返回请求参数
        sidePagination: "server",   //分页方式：client客户端分页，server服务端分页
        //search: true,      //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        showColumns: true,  //显示下拉框勾选要显示的列
        //showRefresh: true,     //是否显示刷新按钮
        minimumCountColumns: 2,    //最少允许的列数
        //showColumns: true,  //显示下拉框勾选要显示的列
        //clickToSelect: true,    //是否启用点击选中行
        searchOnEnterKey: true,
        buttonsAlign:"right",  //按钮位置
        showToggle:true,       //是否显示详细视图和列表视图的切换按钮
        showRefresh: true,     //是否显示刷新按钮
        height: $(window).height()-50, //自定义表格的高度
        
        columns: [{
            checkbox:true
        },{
            field: 'orderid',
            title: '订单编号',
            align: "center",
            switchable: true
        }, {
            field: 'ordertime',
            title: '下单时间',
            align: "center",
            switchable: true
        }, {
            field: 'orderprice',
            title: '订单总价',
            align: "center",
            switchable: true
        }, {
            field: 'orderuser',
            title: '用户',
            align: "center",
            switchable: true
        }, {
            field: 'orderdescribe',
            title: '订单描述',
            switchable: true,
            align: "center",
            sortable: true
        }, {
            field: "operation",
            title: "操作",
            formatter: function (value, row, index) {
                return ["<a class='btn btn-default'>查看</a>",
                    "<a class='btn btn-default' href='?method=findById&id[]=" + row.id + "&state=1'>编辑</a>",
                    "<a class='btn btn-default' href='?method=delete&row=" + row.id + "&state=2'>删除</a>"].join(" ");
            },
            align: "center"
        }],

        locale: 'zh-CN',//中文支持,
        onClickRow:function (row,ele,field) {
            //row:点击当前行的所有数据
            //ele:点击的当前行元素tr
            //filed:点击当前列的filed
            var id = row.orderid;
            var name = row.orderuser;
            if (field == "operation") {
                parent.layer.open({
                    type: 2,
                    title: '订单号 '+id+' 详情',
                    content: 'orderItemDetail.html?id=' + id,
                    area: ["950px", "400px"],
                    btn: "确定"
                });
            }
        },
        paginationPreText: "上一页",
        paginationNextText: "下一页",
    });
}

function params() {

}