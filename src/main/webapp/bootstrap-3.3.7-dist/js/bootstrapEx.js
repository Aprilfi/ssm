var bootstrapEx = {};
bootstrapEx.language = {
    select: {
        selectnoneText: function () { return '-----请选择-----'; }
    },
    Modal: {
        title: function () { return "窗口标题"; },
        closebtn: function () { return "关闭"; }
    }
};
(function ($) {
    //回调
    doCallback = function (fn, args) {
        return fn.apply(this, args);
    }

    //modal弹出层
    Modal = function () {
        var _Modal = {
            renderto: "",//绘制ID
            header: null,//头元素
            body: null,//body元素
            footer: null,//footer元素
            btns: [],//按钮组
            title: bootstrapEx.language.Modal.title(),//title
            showclosebtn: true,//显示关闭按钮
            InitMax: true,//是否最大化
            firstInit: false,
            setHeigth: function (h) {
                var t = this;
                $(t.renderto).find('.modal-body').css('min-height', h);// - 110 * 2
                $(window).resize(function () {
                    $(t.renderto).find('.modal-body').css('min-height', h);// - 110 * 2
                });
            },//设置高度
            setWidth: function (w) {
                var t = this;
                $(t.renderto).find('.modal-dialog').css('width', w);// - 200 * 2
                $(window).resize(function () {
                    $(t.renderto).find('.modal-dialog').css('width', w);// - 200 * 2
                });
            },//设置宽度
            modal: { show: true, backdrop: 'static' },
            Init: function (isshow) {
                var t = this;
                $(t.renderto).html('');
                var body = t.body;
                t.header = null;
                t.body = null;
                t.footer = null;
                if (!$(t.renderto).hasClass('modal')) {
                    $(t.renderto).addClass('modal');
                }
                if (!$(t.renderto).hasClass('fade')) {
                    $(t.renderto).addClass('fade');
                }
                $(t.renderto).append('<div class="modal-dialog"><div class="modal-content"></div></div>');
                t.header = $('<div class="modal-header"></div>');
                if (t.showclosebtn) {
                    $(t.header).append('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>');
                }
                $(t.header).append('<div class="modal-title">' + t.title + '</div>');
                $(t.renderto).find(".modal-content").append(t.header);
                t.body = $('<div class="modal-body"></div>');
                $(t.renderto).find(".modal-content").append(t.body);
                t.body.append(body);
                t.footer = $('<div class="modal-footer"></div>');
                $(t.renderto).find(".modal-content").append(t.footer);
                t.btns.forEach(function (btn) {
                    var btnclass = btn.class || "btn-primary";
                    var _b = "";
                    if (btn.id != "closebtn") {
                        _b = $('<button class="btn" type="button"  id="' + btn.id + '">' + btn.text + '</button>');
                        $(_b).addClass(btnclass);
                    } else {
                        _b = $('<button class="btn btn-default" type="button" data-dismiss="modal" aria-hidden="true" id="' + btn.id + '">' + bootstrapEx.language.Modal.closebtn() + '</button>');
                    }
                    $(t.footer).append(_b);
                }, this);
                if (t.InitMax) {
                    $(t.renderto).find('.modal-dialog').css('width', $(window).width() - 150 * 2);// - 200 * 2
                    $(t.renderto).find('.modal-body').css('min-height', $(window).height() - 110 * 2);// - 150 * 2
                }
                if (isshow) {
                    var moopt = { show: true, backdrop: 'static' };//keyboard
                    moopt = $.extend(moopt, t.modal);
                    $(t.renderto).modal(moopt);
                }
                $(t.renderto).on('shown.bs.modal', function () {
                    try {
                        eval(t.renderto.replace("#", "").replace(".", "") + "_Show();");
                    } catch (ex) { }
                })

                $(t.renderto).on('hide.bs.modal', function () {
                    try {
                        eval(t.renderto.replace("#", "").replace(".", "") + "_Hide();");
                    } catch (ex) { }
                })
                $(t.renderto).on('hidden.bs.modal', function () {
                    try {
                        eval(t.renderto.replace("#", "").replace(".", "") + "_Hideend();");
                    } catch (ex) { }
                })
                t.firstInit = true;
                doCallback(t.OnfirstInited, [t]);
            },
            setTitle: function (title) {//设置标题
                var t = this;
                t.title = title;
                $(t.header).find('.modal-title').html(t.title);
            },
            toggle: function () {//设置是否显示
                var t = this;
                $(t.renderto).modal('toggle');
            },
            show: function () {//显示
                var t = this;
                if (!t.firstInit) {
                    t.Init();
                }
                var moopt = { show: true, backdrop: 'static' };//keyboard
                moopt = $.extend(moopt, t.modal);
                $(t.renderto).modal(moopt);
            },
            hide: function () {//关闭
                var t = this;
                $(t.renderto).modal('hide');
            },
            OnfirstInited: function () {

            }
        }
        return _Modal;
    }
    //页签tab
    Tab = function () {
        var tabdefault = function () {
            var _tab = {
                id: "",//id
                title: "",//标题
                url: "",//地址
                isiframe: false,//是否生成ifram
                active: false,//是否激活
                iframe: null,//ifram
                iframefn: null,//返回ifram 的中的contentWindow对象 执行function 返回
                tabel: null,//页签元素
                bodyel: null,//body元素
                load: null,//load 事件触发
                showclosebtn: false
            }; return _tab;
        }
        var _tabs = {
            renderto: "",//绘制ID
            navtabs: null,
            tabcontent: null,
            tabs: [],
            fade: true,//是否显示过度效果
            firstInit: false,
            show: function (tab) {
                var tabindex;
                var t = this;
                if (!t.firstInit) {
                    t.init();
                }
                if (typeof tab == "number") {
                    tabindex = parseInt(tab);
                }
                else if (typeof tab == "object") {
                    tabindex = t.tabs.indexOf(tab);
                }
                $(t.renderto).find('li').removeClass('active');
                $(t.renderto).find('div.tab-pane').removeClass('active');
                if ($(t.renderto).find('li').eq(tabindex).css("display") == 'none') {
                    $(t.renderto).find('li').eq(tabindex).css("display", "inline");
                }
                $(t.renderto).find('li').eq(tabindex).addClass('active');
                $(t.renderto).find('div.tab-pane').eq(tabindex).addClass('active');
                if ($(t.renderto).find('div.tab-pane').eq(tabindex).hasClass('fade') && !$(t.renderto).find('div.tab-pane').eq(tabindex).hasClass('in')) {
                    $(t.renderto).find('div.tab-pane').eq(tabindex).addClass('in');
                }
                if (t.tabs && t.tabs[tabindex] && t.tabs[tabindex].id) {
                    eval("var fun;try{fun=" + t.tabs[tabindex].id + "_onactive;}catch(ex){}");
                    if (fun) {
                        fun(t);
                    }
                }
            },
            hide: function (tab) {
                var tabindex;
                var t = this;
                if (typeof tab == "number") {
                    tabindex = parseInt(tab);
                }
                else if (typeof tab == "object") {
                    tabindex = t.tabs.indexOf(tab);
                }
                if (t.tabs.length == 1 && tabindex == 0) { return };
                $(t.renderto).find('li').eq(tabindex).css("display", "none");
                //隐藏后显示后一个，如果后一个本来就隐藏就显示再后一个
                for (var k = tabindex - 1; k >= 0 && k <= t.tabs.length - tabindex; k--) {
                    if ($(t.renderto).find('li').eq(k).css("display") != 'none') {
                        t.show(k);
                        break;
                    }
                }
                if (t.tabs && t.tabs[tabindex] && t.tabs[tabindex].id) {
                    eval("var fun;try{fun=" + t.tabs[tabindex].id + "_onhide;}catch(ex){}");
                    if (fun) {
                        fun(t);
                    }
                }
            },
            Init: function () {//绘制方法
                var t = this;
                t.navtabs = $('<ul class="nav nav-tabs"></ul>');
                t.tabcontent = $('<div class="tab-content"></div>');
                $(t.renderto).append(t.navtabs);
                $(t.renderto).append(t.tabcontent);
                var is_active = false;
                $.each(t.tabs, function (i, _tab) {
                    tab = $.extend(tabdefault(), _tab);
                    tab.tabel = $('<li> <a data-toggle="tab" href="#' + tab.id + '" >' + tab.title + '</a></li>');
                    if (tab.showclosebtn) {
                        tab.tabel = $('<li> <a data-toggle="tab" style="padding-right:25px;" href="#' + tab.id + '" >' + tab.title
                            + '&nbsp;<i class="glyphicon glyphicon-remove small" tabsindex="' + i + '" id="tabclose_' + i + '" style="position: absolute;top: 14px;cursor: pointer; opacity: 0.3;" ></i></a></li>');
                    }
                    var bodyel = tab.bodyel;
                    tab.bodyel = $('<div class="tab-pane" id="' + tab.id + '"></div>');
                    if (tab.isiframe) {
                        tab.iframe = $('<iframe id="' + tab.id + '_iframe" width="100%" height="100%" src="' + tab.url + '" frameborder="0"></iframe>');
                        $(tab.bodyel).append(tab.iframe);
                    }
                    if (t.fade) {
                        $(tab.bodyel).addClass("fade");
                        $(tab.bodyel).addClass("in");
                    }
                    if (!is_active && tab.active) {
                        is_active = true;
                        $(tab.tabel).addClass("active");
                        $(tab.bodyel).addClass("active");
                    }
                    $(t.navtabs).append(tab.tabel);
                    $(t.tabcontent).append(tab.bodyel);
                    tab.bodyel.append(bodyel);
                    t.tabs[i] = tab;
                    if (document.getElementById(tab.id + '_iframe') && document.getElementById(tab.id + '_iframe').contentWindow) {
                        tab.iframefn = document.getElementById(tab.id + '_iframe').contentWindow;
                    }
                    tab.iframe = $('#' + tab.id + '_iframe');
                    var load;
                    if (tab.load) {
                        load = tab.load;
                        $('#' + tab.id + '_iframe').load(function () {
                            load(this);
                        });
                    }
                })
                //$(t.renderto).find('.tab-pane').css('min-height', $(t.renderto).height());
                setTimeout(function () {
                    $(t.renderto).find('.tab-pane').find('iframe').css('min-height', $(window).height() - 140 * 2);
                }, 200);
                $(t.navtabs).find('[tabsindex]').on('click', function () {
                    t.hide(parseInt($(this).attr('tabsindex')));
                    return false;
                })
                t.firstInit = true;
                doCallback(t.OnfirstInited, [t]);
            },
            isactive: function (tab) {
                var tabindex;
                var t = this;
                if (typeof tab == "number") {
                    tabindex = parseInt(tab);
                }
                else if (typeof tab == "object") {
                    tabindex = t.tabs.indexOf(tab);
                }
                if (tabindex == 0) { return };
                return $(t.renderto).find('li').eq(tabindex).css("display") != 'none';
            },
            OnfirstInited: function () {
            }
        };
        return _tabs;
    }
    //表单
    ItemForm = function (_renderto) {
        var _ItemForm = {
            renderto: _renderto,//绘制的ID 需要传入#号
            id: "",
            items: [],//表单绘制项
            readonly: [],//只读的字段
            requireds: [],//要验证的字段
            colunb: 1,//绘制列数
            BSForm: {},//BSForm 底层核心插件
            BSFormop: {},//BSForm 的扩展项
            autoLayout: ['1,11', '1,5', '1,3', '1,2', '1,2,1,2,1,2,1,2'],//布局 根据 列数 对应数组中的值
            //绘制方法
            init: function () {
                var t = this;
                t.id = $(t.renderto).attr('id');
                //BSForm
                t.lodeBSForm();
                setTimeout(() => {
                    //重新布局
                    t.doLayout();

                }, 300);
                //其他方法
                t.InitedControl();
            },
            //根据参数 绘制BSForm 底层核心插件
            lodeBSForm: function () {
                /*根据参数 绘制BSForm 底层核心插件
                BSForm 的核心参数有；
                eles        字段集合
                hides       隐藏的字段集合
                autoLayout  布局信息
                绘制方法为；
                    new BSForm({ eles: _eles, hides: _hides, autoLayout: _autoLayout }).Render('id');
                */
                var t = this;
                var _BSFormop = t.BSFormdefault();//编译绘制参数 非公开
                $.extend(_BSFormop, t.BSFormop);
                t.BSForm = new BSForm(_BSFormop).Render(t.id);
            },
            //编译绘制参数 非公开
            BSFormdefault: function () {
                var t = this;
                var _eles = [], _hides = [];
                var _autoLayout;//正常列 隐藏列 布局

                //绘制 _eles 和 _hides
                var formitem = t.formitem = JSON.parse(JSON.stringify(t.items));//项 
                var colunb = t.colunb;//列数
                if ($.isArray(formitem)) {
                    var c = Math.ceil(formitem.length / colunb);//行数
                    var index = 0;//item计数
                    //循环行 绘制项
                    for (var j = 0; j < c; j++) {
                        var _e = [];//本地对象
                        //循环该行列
                        for (var i = 0; i < parseInt(colunb); i++) {
                            var thisitem = formitem[index];//当前项
                            if (thisitem) {
                                var itemtyoe = thisitem.type;
                                //如果不是隐藏列
                                if (itemtyoe != 'hides') {
                                    //重写项 为BSFrom用
                                    var BSitem = {};
                                    if (itemtyoe == "text") {
                                        BSitem = thisitem;
                                    } else {
                                        var inititem = t.InitBSFormItem[itemtyoe];//得到绘制方法
                                        BSitem = inititem(thisitem);
                                    }
                                    _e.push({ ele: BSitem });
                                    //表单绘制完成后 需要重置表单项 如时间控件 下拉控件
                                    t.InitedControl(itemtyoe, BSitem);
                                }
                                //隐藏列
                                else {
                                    var _d = {};
                                    $.each(thisitem, function (n, m) {
                                        if (n != "type") {
                                            _d[n] = m;
                                        }
                                    })
                                    _hides.push(_d);
                                }
                            }
                            index++;
                        }
                        if (_e.length != 0) {
                            _eles.push(_e)
                        };
                        if (index == formitem.length) {
                            break;
                        }
                    }

                }

                //布局 
                _autoLayout = t.autoLayout[t.colunb - 1];

                return { eles: _eles, hides: _hides, autoLayout: _autoLayout };
            },
            //重新布局 设置只读状态
            doLayout: function () {
                var t = this;
                //整体布局
                //$(t.renderto).find('.form-group').find('div').eq(0).css('margin-bottom','0px');
                $(t.renderto).find('.form-group').prepend('<div class="row" style="margin-bottom:10px"></div>');
                $(t.renderto).find('.form-group').css('margin-bottom', '10px');
                $(t.renderto).find('.control-label').css('line-height', $(t.renderto).find('.form-control').eq(0).outerHeight() + 'px');

                //得到浏览器参数 view 如果为true 则为全部只读
                var view = global.Fn.getparastr("view") === "true" || false;
                //每个项布局
                $.each(t.items, function (i, v) {

                    //如果该项只读 则加入到只读集合
                    if (v.readonly) {
                        if ($.isArray(t.readonly)) {
                            t.readonly.push(v.name);
                        }
                    }
                    //判断是否只读
                    if (view || t.readonly == true || ($.isArray(t.readonly) && t.readonly.indexOf(v.name) >= 0)) {
                        // select 控件只读设置
                        if (v.type && v.type.indexOf("select") >= 0) {
                            var s = selectItem("#" + v.name);
                            s.disabled = true;
                            s.setdisabled();
                            setTimeout(function () {
                                $(t.renderto).find("[data-toggle='dropdown'][data-id='" + v.name + "']").addClass("disabled");
                            }, 600);
                        }
                        //日期控件 强制隐藏 
                        else if (v.type && v.type.indexOf("datetime") >= 0) {
                            $("#" + v.name).parent().datetimepicker('remove');
                            $("#" + v.name).attr("readonly", "");
                        } else {
                            $("#" + v.name).attr("readonly", "");
                        }

                        //删除验证 
                        t.requireds.remove(v.name);
                    }
                    //判断该项 强制在一行 一般是最后一行
                    if (v.oneline) {
                        //重置 控件class
                        var classnames = $("#" + v.name).parent().attr("class").split(' ');
                        $.each(classnames, function (a, b) {
                            if (b.indexOf('col-sm') >= 0) {
                                classnames[a] = 'col-sm-11';
                            }
                        })
                        $("#" + v.name).parent().prev().before('<div class="row" style="margin-bottom: 10px;"></div>');
                        $("#" + v.name).parent().attr("class", classnames.join(' '));
                        //.addClass("col-sm-11");

                        //重置 lable class
                        var lable_classnames = $("#" + v.name).parent().prev().attr("class").split(' ');
                        $.each(lable_classnames, function (a, b) {
                            if (b.indexOf('col-sm') >= 0) {
                                lable_classnames[a] = 'col-sm-1';
                            }
                        })
                        $("#" + v.name).parent().prev().attr("class", lable_classnames.join(' '));

                        //执行换行
                        if (!$("#" + v.name).parent().next().hasClass('row')) {
                            $("#" + v.name).parent().next().before('<div class="row" style="margin-bottom: 10px;"></div>');
                        }
                    }
                    //判断该项后 强制换行
                    if (v.enline) {
                        $("#" + v.name).parent().prev().before('<div class="row" style="margin-bottom: 10px;"></div>');
                    }
                })
            },
            //需要绘制完成后绘制的项
            InitedControls: {
                select: [],//下拉组件
                textarea: [],//多行文本组件
                numbertxt: [],//数量组件
                floattxt: [],//浮点组件
                datetime: []//日期组件
            },
            //根据类型绘制 BSForm项
            InitBSFormItem: {
                //时间类型
                datetime: function (item) {
                    //如果是对象 则返回新的对象配置
                    if (typeof item == 'object') {
                        item.type = "text";
                        item.next = {};
                        item.next.text = '<span class="glyphicon glyphicon-th">';
                        item.group = {};
                        item.group.className = "date form_datetime";
                        item.group.extendAttr = { "date-format": "yyyy-mm-dd" };
                        item.group.extendAttr = { "date-language": "zh-CN" };
                        return item;
                    }
                    //如果是 字符串 则为ID 执行绘制
                    else if (typeof item == 'string') {
                        //限制输入
                        $('#' + item).keydown(function (event) {
                            return global.Fn.checkKeyForFloat($(this).val(), event);
                        });
                        $('#' + item).parent().datetimepicker({
                            weekStart: 1,
                            todayBtn: 1,
                            autoclose: 1,
                            todayHighlight: 1,
                            startView: 2,
                            minView: 2,
                            forceParse: 0,
                            format: "yyyy-mm-dd",
                        });
                    }
                },
                //多文本类型
                textarea: function (item) {
                    //如果是对象 则返回新的对象配置
                    if (typeof item == 'object') {
                        item.type = "text";
                        return item;
                    }
                    //如果是 字符串 则为ID 执行绘制
                    else if (typeof item == 'string') {
                        var h = $('#' + item).parent().html();
                        h = h.replace("<input ", "<textarea ");
                        $('#' + item).parent().html(h);
                    }
                },
                //数字类型
                numbertxt: function (item) {
                    //如果是对象 则返回新的对象配置
                    if (typeof item == 'object') {
                        item.type = "text";
                        return item;
                    }
                    //如果是 字符串 则为ID 执行绘制
                    else if (typeof item == 'string') {
                        //限制输入
                        $('#' + item).keydown(function (event) {
                            return global.Fn.checkKeyForInt($(this).val(), event);
                        });
                    }
                },
                //浮点类型
                floattxt: function (item) {
                    //如果是对象 则返回新的对象配置
                    if (typeof item == 'object') {
                        item.type = "text";
                        return item;
                    }
                    //如果是 字符串 则为ID 执行绘制
                    else if (typeof item == 'string') {
                        //限制输入
                        $('#' + item).keydown(function (event) {
                            return global.Fn.checkKeyForFloat($(this).val(), event);
                        });
                    }
                },
                //浮点类型
                select: function (item) {
                    //如果是对象 则返回新的对象配置
                    if (typeof item == 'object') {
                        var ops;
                        if (item.select) {
                            if (item.items) {
                                item.select.data = item.items;
                            }
                        }
                        if (!item.items) {
                            item.items = [];
                        }
                        if (item.DataBind) {
                            item.DataBind();
                        } else {
                            return item;
                        }
                    }
                }

            },
            //表单绘制完成后 需要重置表单项 如时间控件 下拉控件
            InitedControl: function (type, item) {
                var t = this;
                var InitedControls = t.InitedControls;
                //添加项
                if (type && item) {
                    if (!InitedControls[type]) {
                        InitedControls[type] = [];
                    }
                    if (type == "select") {
                        var s = new selectItem();
                        var ops = $.extend(s, item.select);
                        ops.renderto = "#" + item.name;
                        InitedControls[type].push(ops);
                    } else {
                        InitedControls[type].push(item.name);
                    }
                }
                //执行绘制
                else {
                    for (var i in InitedControls) {
                        var items = InitedControls[i];
                        var fn = t.InitBSFormItem[i];
                        if (fn) {
                            $.each(items, function (j, k) {
                                fn(k);
                            })
                        }
                    }
                }
            },
            //得到值
            GetFormData: function () {
                var d = this.BSForm.GetFormData();
                var t = this;
                $.each(t.items, function (i, v) {
                    //select控件 把选择的中文也赋上 key为str_加name 
                    if (v.type && v.type.indexOf('select') >= 0) {
                        if ($(t.renderto).find("[data-toggle='dropdown'][data-id='" + v.name + "']").length > 0 && $(t.renderto).find("[data-toggle='dropdown'][data-id='" + v.name + "']").attr("title").indexOf('请选择') <= 0) {
                            d["str_" + v.name] = $(t.renderto).find("[data-toggle='dropdown'][data-id='" + v.name + "']").attr("title");
                        }
                    }
                })
                return d;
            },
            //设置值
            SetFormData: function (model) {
                return this.BSForm.InitFormData(model);
            }
        }
        return _ItemForm;
    }

    var __selectitems = {};
    //下拉列表
    selectItem = function (selectop) {
        var GetTreeData = function (_data, parentfield, idfield) {
            var onelevel = [];//第一级
            var _level = 0;
            for (var i = 0; i <= _data.length; i++) {
                var d = _data[i];
                if (d) {
                    var pid = d[parentfield];
                    var n = true;
                    for (var k = 0; k <= _data.length; k++) {
                        var _d = _data[k];
                        if (_d && _d[idfield] && pid && pid == _d[idfield]) {
                            n = false;
                            break;
                        }
                    }
                    if (n) {
                        d._level = _level.toString();
                        onelevel.push(d);
                    }
                }
            }
            var treedata = [];
            for (var i = 0; i <= onelevel.length; i++) {
                treedata.push(onelevel[i]);
                var SonData = GetSonData(_data, onelevel[i], parentfield, idfield, 1);
                if (SonData) {
                    $.each(SonData, function (n, m) {
                        treedata.push(m);
                    })
                }
            }
            return treedata;
        }
        var GetSonData = function (AllData, onedata, parentfield, idfield, _level) {
            var SonData = [];
            _level++;
            for (var i = 0; i <= AllData.length; i++) {
                var d = AllData[i];
                if (d && onedata && d[parentfield] == onedata[idfield] && d[idfield] != onedata[idfield]) {
                    d._level = _level.toString();
                    if (!onedata.allparents) {
                        onedata.allparents = [];
                    }
                    if (!d.allparents) {
                        d.allparents = [];
                    }
                    d.allparents = onedata.allparents.concat();
                    d.allparents.push({ _level: onedata._level == 0 ? 1 : onedata._level, id: onedata.id });
                    SonData.push(d);
                    var _s = GetSonData(AllData, d, parentfield, idfield, _level);
                    if (_s) {
                        $.each(_s, function (n, m) {
                            if (m) {
                                SonData.push(m);
                            }
                        })
                    }
                }
            }
            return SonData;
        }
        var getparentval = function (_data, v) {
            var data = {};
            return data;
        }
        var _selectItem = {
            renderto: "",//绘制
            url: "",//数据地址
            data: [],//数据
            treedata: [],
            idfield: "id",//ID列名
            textfield: "name",//显示列名
            parentfield: "pId",//父ID列名
            tree: false,//是否启用tree
            treelevel: false,//是否自动勾选子集
            firstInit: true,
            disabled: false,//是否禁用
            refresh: function () {

            },//刷新方法
            optdisabledfn: function (d) { return false; },//如果改方法返回true 该项将被 disabled
            removedatafn: function (d) { return false; },//如果该方法返回true 该项将被删除
            DataBind: function (_data) {
                var t = this;
                if (_data) {
                    t.data = _data;
                }
                if (t.firstInit && t.url) {
                    jQuery.support.cors = true;
                    var ajaxop = {
                        url: t.url,
                        type: "POST",
                        async: true
                    };
                    if (JSON.stringify(t.queryData) != '{}') {
                        ajaxop.data = t.queryData;
                    }
                    var _ajax1 = $.ajax(ajaxop);
                    $.when(_ajax1).done(function (responseText) {
                        var _responseText = GetAjaxArray(responseText);
                        t.firstInit = false;
                        t.DataBind(_responseText);
                    }).fail(function () {
                    });
                } else {
                    if (t.tree) {
                        t.data = GetTreeData(t.data, t.parentfield, t.idfield);
                    }
                    $(t.renderto).html('');
                    var _renderto = t.renderto;
                    //class="selectpicker show-tick form-control" multiple data-live-search="true">
                    if (!$(t.renderto).hasClass('selectpicker')) {
                        $(t.renderto).addClass('selectpicker');
                    } if (!$(t.renderto).hasClass('show-tick')) {
                        $(t.renderto).addClass('show-tick');
                    } if (!$(t.renderto).hasClass('form-control')) {
                        $(t.renderto).addClass('form-control');
                    }
                    /* if (t.multiple) {*/
                    $(t.renderto).attr('multiple', "true");

                    /*}
                    else {
                        $(t.renderto).removeAttr('multiple');
                    }*/
                    if (t.search) {
                        $(t.renderto).attr('data-live-search', t.search);
                    }
                    else {
                        $(t.renderto).attr('data-live-search', 'false');
                    }
                    if (!t.data) {
                        t.data = [];
                    }
                    $.each(t.data, function (i, v) {
                        if (v) {
                            //data-content="<i class=\'f-tree-cell-icon\'></i><span class=\'text\'>'+ v.text +'</span>"
                            var item = '<option value="' + v[t.idfield] + '" title="' + v[t.textfield] + '" data-content>' + v[t.textfield] + '</option>';
                            var level = '';
                            for (var k = 1; k < parseInt(v._level); k++) {
                                level += '<i class=\'f-tree-cell-icon\'></i>';
                            }
                            item = item.replace("data-content", 'data-content="' + level + '<span class=\'text\'>' + v[t.textfield] + '</span>"');
                            if (t.optdisabledfn(v)) {
                                item = item.replace("<option ", "<option disabled ")
                            }
                            if (!t.removedatafn(v)) {
                                $(_renderto).append(item);
                            }
                        }
                    })
                    //maxOptions
                    var selectopt = { noneSelectedText: bootstrapEx.language.select.selectnoneText(), actionsBox: true, deselectAllText: "清空", selectAllText: "全选" };
                    //不为多选时 设置为多选并且最大选择项为1 保持单选
                    if (!t.multiple) {
                        selectopt.maxOptions = 1;
                        // selectopt.actionsBox=false;
                    }
                    if (t.disabled) {
                        selectopt.disabled = true;
                    }
                    $(t.renderto).selectpicker(selectopt);
                    $(t.renderto).selectpicker('refresh');
                    //bs-select-all
                    if (!t.multiple) {
                        $(t.renderto).prev().find('.bs-select-all').hide();
                        $(t.renderto).prev().find('.bs-deselect-all').css('width', '100%');
                        $(t.renderto).prev().find('.bs-deselect-all').css('border-radius', '3px');
                    }
                    if (!t.showclear) {
                        $(t.renderto).prev().find('.bs-deselect-all').hide();
                    }
                    if (t.Initval.lenght != 0) { $(t.renderto).selectpicker('val', t.Initval); }
                    t.firstInit = false;
                }

                $(t.renderto).on('changed.bs.select', function (e) {
                    var v = [];
                    if (typeof ($(t.renderto).val()) == "string") {
                        v = $(t.renderto).val().toString().split(',');
                    }
                    else if (typeof ($(t.renderto).val()) == "array") {
                        v = $(t.renderto).val();
                    } else if (typeof ($(t.renderto).val()) == "object") {
                        v = eval($(t.renderto).val());
                    }
                    if (!v) { v = [] }
                    var changeitem = Array.minus(v, t.lastselect);
                    if (changeitem.length != 0) {
                        t.onselectchangeddone = false;
                    }
                    if (t.tree && t.treelevel && t.multiple) {
                        $.each(changeitem, function (k, c) {
                            //得到c的子集
                            var c_data = {};
                            $.each(t.data, function (i, _v) {
                                if (_v && _v[t.idfield] == c) {
                                    c_data = _v;
                                }
                            });
                            var SonData = GetSonData(t.data, c_data, t.parentfield, t.idfield, c_data._level);

                            if (v.indexOf(c) >= 0) {//存在就是新勾选的
                                if (SonData) {
                                    $.each(SonData, function (i, _v) {
                                        if (_v) {
                                            v.push(_v[t.idfield]);
                                        }
                                    });
                                }
                            } else {//不存在就是取消勾选
                                if (SonData) {
                                    $.each(SonData, function (i, _v) {
                                        if (_v) {
                                            v.remove(_v[t.idfield]);
                                        }
                                    });
                                }
                            }
                        })
                    }
                    t.lastselect = v;
                    t.selectpicker('val', v);
                    if (!t.onselectchangeddone) {
                        t.onselectchanged(v);
                        eval("var fun;try{fun=" + t.renderto.replace("#", "").replace(".", "") + "_onselectchanged;}catch(ex){}");
                        if (fun) {
                            fun(v);
                        }
                        t.onselectchangeddone = true;
                    } else { }
                });
                __selectitems[t.renderto] = this;
            },//绑定方法 绘制
            setvalue: function (vals) {
                var t = this;
                $(this.renderto).selectpicker('val', vals);
                t.onselectchanged(vals);
                eval("var fun;try{fun=" + t.renderto.replace("#", "").replace(".", "") + "_onselectchanged;}catch(ex){}");
                if (fun) {
                    fun(vals);
                }
                t.onselectchangeddone = true;
            },//设置方法
            //查询传入的数据
            queryData: {},
            getval: function () {
                var v = [];
                var t = this;
                if (typeof ($(t.renderto).val()) == "string") {
                    v = $(t.renderto).val().toString().split(',');
                }
                else if (typeof ($(t.renderto).val()) == "array") {
                    v = $(t.renderto).val();
                } else if (typeof ($(t.renderto).val()) == "object") {
                    v = eval($(t.renderto).val());
                }
                if (!v) { v = [] }
                return v;
            },//得到选择值
            //得到选择项的data
            getvaldata: function (v) {
                var t = this;
                var val = {};
                if (!v) {
                    v = t.getval();
                    if (!v || v.length <= 0) {
                        return val;
                    }
                }
                var index = t.data.findIndex(function (e) { return e[t.idfield] == v; });
                if (index < 0) {
                } else {
                    val = t.data[index];
                }
                return val;
            },
            Initval: [],//初始值
            multiple: false,//是否多选
            search: true,//是否显示搜索
            onselectchanged: function (v) { },//选择完成后事件
            onselectchangeddone: false,//是否已经执行change事件
            selectpicker: function (k, v) {
                $(this.renderto).selectpicker(k, v);
            },
            showclear: true,
            setdisabled: function (b) {
                var t = this;
                if (b) {
                    setTimeout(function () {
                        $("[data-toggle='dropdown'][data-id='" + t.renderto.replace('#', '') + "']").addClass("disabled");
                    }, 600);
                } else {
                    setTimeout(function () {
                        $("[data-toggle='dropdown'][data-id='" + t.renderto.replace('#', '') + "']").removeClass("disabled");
                    }, 600);
                }
            },
            lastselect: []//上一次勾选
        }
        if (selectop) {
            _selectItem = __selectitems[selectop];
            if (typeof _selectItem !== "undefined") {
                _selectItem.firstInit = true;
            }
        }
        return _selectItem;
    }

    getNowDateInt = function () {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + month + strDate
            + date.getHours() + date.getMinutes()
            + date.getSeconds();
        return currentdate;
    }

})(jQuery);
