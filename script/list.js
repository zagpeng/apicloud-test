

/**
突发事件 204
应急联动 207
任务 203
预警 200
批示转办 209
*/
function dealIcon(type) {
    var s = "";
    if (type == "204")
        s = "<div class=\"aui-label aui-label-danger\">"+_typeName[type]+"</div>";
    else if (type == "206")
        s = "<div class=\"aui-label aui-label-success\">"+_typeName[type]+"</div>";
    else if (type == "203")
        s = "<div class=\"aui-label aui-label-info\">"+_typeName[type]+"</div>";
    else if (type == "200")
        s = "<div class=\"aui-label aui-label-warning\">"+_typeName[type]+"</div>";
    else if (type == "209")
        s = "<div class=\"aui-label aui-label-primary\">"+_typeName[type]+"</div>";
    else if (type == "201")
        s = "<div class=\"aui-label aui-label-info\">"+_typeName[type]+"</div>";

    return s;
}

function initItem(params) {

    var mdiv = "<div class=\"aui-card-list\" id=\"listItem\">";

    var tdiv = "<div class=\"aui-card-list-header aui-font-size-14\">";
    // <div>滕州市发生重大交通事故</div>
    tdiv += "title_"+params.titleId;

    // <div class=\"aui-label aui-label-danger\">突发事件</div>
    if (params.hasIcon)
        tdiv += "hasIcon"

    tdiv += "</div>";

    if (params.hasTitle)
        mdiv += tdiv;

    mdiv += "<ul class=\"aui-list1 aui-list-in aui-margin-b-1\" onclick=\"openDealWin()\">";
    mdiv += "    <li class=\"aui-list-item aui-list-item-arrow aui-bottom-border\" style=\"display:block\">";

    for (var i = 0; i < params.item.length; i ++) {
        mdiv += "        <div class=\"aui-clearfix\">";
        mdiv += "            <div class=\"aui-card-list-user-avatar\">";
        mdiv += "                <img src=\"../image/"+params.item[i].type+".png\" class=\"aui-margin-r-10\" style=\"width:0.9rem;\">";
        mdiv += "            </div>";
        mdiv += "            <div class=\"aui-card-list-user-name text-light\">";
        mdiv += "                <div class=\"aui-font-size-14\">"+params.item[i].name+"：data_"+params.item[i].id+"</div>";
        mdiv += "            </div>";
        mdiv += "        </div>";
    }

    mdiv += "    </li>";
    mdiv += "</ul>";
    mdiv += "</div>";

    return mdiv;
}

var dataExample = {
    errorCode:'0',
    errorMsg:'',
    list:[
        {
            id:'10',
            bt:'测试标题10',
            rq:"2017-01-01 12:01:01",
            dw:"测试单位10",
            type:"204"
        },{
            id:'11',
            bt:'测试标题11',
            rq:"2017-02-01 12:01:01",
            dw:"测试单位11",
            type:"203"
        },{
            id:'12',
            bt:'测试标题12',
            rq:"2017-01-03 12:01:01",
            dw:"测试单位12",
            type:"207"
        }
    ]
};

function setData(mdiv, data, params, type) {
    var html = "";
    var ndiv = "";
    var t = "";
    for (var i = 0; i < data.list.length; i ++) {
        ndiv = mdiv;
        var item = data.list[i];
        if (isEmptyObject(item))
            return;

        // 待办工作使用item中的type, 其他列表使用传入的type
        if (type == undefined || type == '')
            t = item.type;
        else
            t = type;

        ndiv = ndiv.replace("listItem", "listItem"+item.id);
        if (params.canClick) {

            if (params.clickType != undefined && params.clickType == "tele")
                ndiv = ndiv.replace("openDealWin()", "teleCall('"+item.MobilePhone+"')");
            else if (t == '204' && item.WFstatus == '0') {
                ndiv = ndiv.replace("openDealWin()", "openDealWin('yy_yjsjEdit','"+t+"','"+item.id+"','','"+item.WFstatus+"')");
            }
            else
                ndiv = ndiv.replace("openDealWin()", "openDealWin('"+_typePage[t]+"','"+t+"','"+item.id+"','','"+item.WFstatus+"')");
            // 这里增加
        }
        else {
            ndiv = ndiv.replace("openDealWin()", "");
            ndiv = ndiv.replace("aui-list-item-arrow", "");
        }

        if (params.hasTitle)
            ndiv = ndiv.replace("title_"+params.titleId, "<div>"+item[params.titleId].replaceAll("u000a", "")+"</div>");
        if (params.hasIcon)
            ndiv = ndiv.replace("hasIcon", dealIcon(item.type));

        for (var n = 0; n < params.item.length; n ++) {
            ndiv = ndiv.replace("data_"+params.item[n].id, item[params.item[n].id]);
        }
        html += ndiv;
    }

    var o = $api.byId(params.divId);

    $api.append(o, html);
}

function getList(params, url, type, isXl) {
    var mdiv = initItem(params);
    url = encodeURI(url);
    api.showProgress();//显示加载进度框
    api.ajax({
        url: url,  //例如：这是我的地址
        method: 'get',
        dataType: 'text'
    }, function(ret, err) {
        api.hideProgress();//隐藏加载进度框
        if (ret == "" || ret == undefined) {
            openDialog('获取数据失败!');
            return;
        }
// alert(ret);
        ret = dealStr(ret);
        var data = $api.strToJson(ret);

        if (data.errorCode == '0') {
            setData(mdiv, data, params, type);
            if (isXl != undefined && isXl == "1")
                api.refreshHeaderLoadDone();
        } else {
            openDialog(data.errorMsg);
            // $api.toast(data.errorMsg, 2000);
        }
    });
}

function clearDiv(params) {
    document.getElementById(params.divId).innerHTML = "";
}
