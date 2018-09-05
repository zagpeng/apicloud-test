var _typeName = {};
_typeName["204"] = "突发事件";
_typeName["206"] = "应急联动";
_typeName["203"] = "任务";
_typeName["200"] = "预警";
_typeName["209"] = "批示转办";
_typeName["207"] = "通知公告";
_typeName["201"] = "值班信息";

var _typePage = {};
_typePage["204"] = "yjsj";
_typePage["206"] = "yjld";
_typePage["203"] = "rwxq";
_typePage["200"] = "yjxx";
_typePage["209"] = "pszb";
_typePage["207"] = "tzgg";
_typePage["107"] = "zcfg";
_typePage["102"] = "yy_yjzy_wxy";
_typePage["101"] = "yy_yjzy_fhmb";
_typePage["104"] = "yy_yjzy_yjjg";
_typePage["110"] = "yy_yjzy_yjry";
_typePage["210"] = "yy_ldhd_xq";
_typePage["212"] = "yy_bngz_xq";
_typePage["213"] = "txl_xq";
_typePage["214"] = "yy_yjzy_xq";
_typePage["111"] = "yy_yjzy_xq";
_typePage["112"] = "yy_yjzy_xq";
_typePage["113"] = "yy_yjzy_xq";
_typePage["114"] = "yy_yjzy_xq";
_typePage["106"] = "yy_yjzy_xq";
_typePage["108"] = "yy_yjzy_xq_short";
_typePage["201"] = "zbxx";
_typePage["105"] = "yy_yjzy_xq_short";
_typePage["103"] = "yy_yjzy_xq";
_typePage["115"] = "yy_yjzy_xq";

var NSTR = "~!N!";

// var host = "http://192.168.2.175/WcfForAndroid/Service.svc";
var host = "http://111.17.180.238:8081/WcfForAndroid/Service.svc";
// var host = "http://111.17.180.238:8082/Service.svc";
// var host = "http://192.168.2.176/WcfForAndroid/Service.svc";
// var fileUrl = "http://192.168.0.101:8080/drp_yjpt/drpServlet"
var fileUrl = "http://111.17.180.238:9000/drp_yjpt/drpServlet"

function openDialog(message, func){
    var dialog = new auiDialog({})
    dialog.alert({
        title:"提示",
        msg:message,
        buttons:['取消','确定']
    },function(ret){
        if (ret.buttonIndex == 2) {
            if (func != undefined)
                eval(func);
        }
    })
}

String.prototype.startWith=function(str){
  var reg=new RegExp("^"+str);
  return reg.test(this);
}

String.prototype.endWith=function(str){
  var reg=new RegExp(str+"$");
  return reg.test(this);
}
String.prototype.replaceAll = function(s1,s2){
  return this.replace(new RegExp(s1,"gm"),s2);
}

function isEmptyObject(e) {
    if (e == undefined)
        return !0;

    var t;
    for (t in e)
        return !1;
    return !0
}

function closeWin(param){
    api.closeFrame(param);
}

// pagename, type, id, bzid, WFstatus, checkUser, checkUnit
function openDealWin (pagename, type, id, bzid, WFstatus, checkUser, checkUnit) {
    if (bzid == undefined) bzid = "";
    if (WFstatus == undefined) WFstatus = "";
    if (checkUser == undefined) checkUser = "";
    if (checkUnit == undefined) checkUnit = "";

    var param = {};
    param["type"] = type;
    param["id"] = id;
    param["bzid"] = bzid;
    param["WFstatus"] = WFstatus;
    param["checkUser"] = checkUser;
    param["checkUnit"] = checkUnit;

    api.openWin({
        name: pagename,
        url: pagename+'.html',
        pageParam: param
    });
}

function dealStr(str) {
  str = str.substring(1, str.length);
  str = str.substring(0, str.length-1);
  str = str.replace(new RegExp("\\\\","g"),"");

  return str;
}

function getUserInfoJson() {
    var userInfo = $api.getStorage('userInfo');
    var u = $api.strToJson(userInfo);
    return u;
}

function getUserInfoByKey(key) {
    var userInfo = $api.getStorage('userInfo');
    if (userInfo == "" || userInfo == undefined)
        return;

    var u = $api.strToJson(userInfo);

    return u.list[0][key];
}

function getDetial(url) {
  // alert(url);
    api.showProgress();//显示加载进度框
    api.ajax({
        url: url,  //例如：这是我的地址
        method: 'get',
        dataType: 'text'
    }, function(ret, err) {
        api.hideProgress();//隐藏加载进度框
        if (ret == "" || !ret.startWith("\"{") || !ret.endWith("}\""))
            return;

        ret = dealStr(ret);
        var data = $api.strToJson(ret);
        if (data.errorCode == '0'){
            loadData(data);
            initButton("btnList", data.btnlist);
            initFj("formTable", data.fj);
        } else {
            openDialog(data.errorMsg);
            // $api.toast(data.errorMsg, 2000);
        }
    });
}

function loadData(data) {
    if (data == undefined)
        return;

    var t = "";
    var list = $api.domAll("td");
    for (var i = 0; i < list.length; i ++) {
        if ($api.attr(list[i], "id") != "" && $api.attr(list[i], "id") != undefined
            && $api.attr(list[i], "id") != null
            && data[$api.attr(list[i], "id")] != "" && data[$api.attr(list[i], "id")] != undefined) {
              // alert("span--"+$api.attr(list[i], "id")+"--"+data[$api.attr(list[i], "id")])
                t = data[$api.attr(list[i], "id")].replaceAll("00:00:00", "");
                t = t.replaceAll("0:00:00", "");
                t = t.replaceAll("u000a", "");
                $api.html(list[i], t);
            }
    }

    list = $api.domAll("span");
    for (var i = 0; i < list.length; i ++) {
        if ($api.attr(list[i], "id") != "" && $api.attr(list[i], "id") != undefined
            && $api.attr(list[i], "id") != null
            && data[$api.attr(list[i], "id")] != "" && data[$api.attr(list[i], "id")] != undefined) {
                t = data[$api.attr(list[i], "id")].replaceAll("00:00:00");
                t = t.replaceAll("0:00:00", "");
                t = t.replaceAll("u000a", "");
                $api.html(list[i], t);
            }
    }

    list = $api.domAll("input");
    for (var i = 0; i < list.length; i ++) {
        if ($api.attr(list[i], "id") != "" && $api.attr(list[i], "id") != undefined
            && $api.attr(list[i], "id") != null
            && data[$api.attr(list[i], "id")] != "" && data[$api.attr(list[i], "id")] != undefined) {
                // alert("input--"+$api.attr(list[i], "id")+"--"+data[$api.attr(list[i], "id")])
                t = data[$api.attr(list[i], "id")].replaceAll("00:00:00");
                t = t.replaceAll("0:00:00", "");
                t = t.replaceAll("u000a", "");
                $api.val(list[i], t);
            }
    }

    list = $api.domAll("textarea");
    for (var i = 0; i < list.length; i ++) {
        if ($api.attr(list[i], "id") != "" && $api.attr(list[i], "id") != undefined
            && $api.attr(list[i], "id") != null
            && data[$api.attr(list[i], "id")] != "" && data[$api.attr(list[i], "id")] != undefined) {
                t = data[$api.attr(list[i], "id")].replaceAll("00:00:00");
                t = t.replaceAll("0:00:00", "");
                t = t.replaceAll("u000a", "");
                $api.html(list[i], t);
            }
    }
}

function initFj(divid, fjlist) {
    if (isEmptyObject(fjlist))
        return;

    var html = "";
    var page = "";
    var el = document.getElementById(divid);
    for (var i = 0; i < fjlist.length; i ++) {
        var item = fjlist[i];
        //item.url = "http://a.hiphotos.baidu.com/image/w%3D400/sign=2abe1c77d4ca7bcb7d7bc62f8e086b3f/64380cd7912397ddf9f4bdb05a82b2b7d1a287f0.jpg";

        if (item.url.toLowerCase().endWith("jpg") || item.url.toLowerCase().endWith("jpeg")
            || item.url.toLowerCase().endWith("png") || item.url.toLowerCase().endWith("gif")
            || item.url.toLowerCase().endWith("bmp") || item.url.toLowerCase().endWith("svg")) {
            api.imageCache({
                url: item.url
            }, function(ret, err) {
                if (ret.status) {
                    var url = ret.url;

                    html = "<tr>"
                            +"  <th>附件</th>"
                            +"  <td colspan=\"3\"><img id=\"imgfile\" src=\""+url+"\"></td>"
                            +"</tr>";
                    $api.append(el, html);
                }
            })
        } else if (item.url.toLowerCase().endWith("mp4") || item.url.toLowerCase().endWith("3gp")) {
             html = "<tr>"
                     +"  <th>"+item.name+"</th>"
                     +"  <td colspan=\"3\"><button class=\"aui-btn aui-btn-info aui-margin-r-5\" onclick=\"videoPlay('"+item.url+"')\">播放</button></td>"
                     +"</tr>";
             $api.append(el, html);
        } else {
            html = "<tr>"
                    +"  <th>"+item.name+"</th>"
                    +"  <td colspan=\"3\"><button class=\"aui-btn aui-btn-info aui-margin-r-5\" onclick=\"downLoadFile('"+item.url+"')\">下载</button></td>"
                    +"</tr>";
            $api.append(el, html);
        }
    }
}


function initFjDown(divid, fjlist) {
    if (isEmptyObject(fjlist))
        return;

    var html = "";
    var page = "";
    var el = document.getElementById(divid);
    for (var i = 0; i < fjlist.length; i ++) {
        var item = fjlist[i];
        //item.url = "http://a.hiphotos.baidu.com/image/w%3D400/sign=2abe1c77d4ca7bcb7d7bc62f8e086b3f/64380cd7912397ddf9f4bdb05a82b2b7d1a287f0.jpg";
        if (item.url.toLowerCase().endWith("mp4") || item.url.toLowerCase().endWith("3gp")) {
            html = "<tr id='tpzz"+i+"'>"
                    +"  <th><div class=\"aui-btn aui-btn-info aui-margin-r-5\" onclick=\"delFile('tpzz"+i+"', '', '"+item.tblIndex+"');return false;\">删除</div></th>"
                    +"  <td colspan=\"3\"><button class=\"aui-btn aui-btn-info aui-margin-r-5\" onclick=\"videoPlay('"+item.url+"')\">播放</button></td>"
                    +"</tr>";
            $api.append(el, html);
        } else {
            html = "<tr id='tpzz"+i+"'>"
                    +"  <th><div class=\"aui-btn aui-btn-info aui-margin-r-5\" onclick=\"delFile('tpzz"+i+"', '', '"+item.tblIndex+"');return false;\">删除</div></th>"
                    +"  <td colspan=\"3\"><button class=\"aui-btn aui-btn-info aui-margin-r-5\" onclick=\"downLoadFile('"+item.url+"');return false;\">下载</button></td>"
                    +"</tr>";
            $api.append(el, html);
        }
    }
}

function initButton(divid, btnlist) {
    if (isEmptyObject(btnlist))
        return;

    var html = "";
    var page = "";
    for (var i = 0; i < btnlist.length; i ++) {
        var item = btnlist[i];
        // html += "<p><div class=\"aui-btn aui-btn-info aui-btn-block aui-btn-sm\" "
        //     +"onclick=\"doJob('"+page+"','"+item.id+"')\">"+item.name+"</div></p>";

        html += "<p><div class=\"aui-btn aui-btn-info aui-btn-block aui-btn-sm\" "
            +"onclick=\"openDealWin('ry', '"+type+"', '"+id
            +"', '"+item.id+"', '', '"+item.checkUser+"', '"
            +item.checkUnit+"')\">"+item.name+"</div></p>";

        //(pagename, type, id, bzid, WFstatus, checkUser, checkUnit)
        // openDealWin('ry', type, id, item.id, '', item.checkUser, item.checkUnit);
    }
    document.getElementById(divid).innerHTML = html;
}

/**
 *  id 记录id
 *  type 类型
 *  bzid 状态id
 *  dw 单位
 *  account 账号
 *  yj 意见
 *  status 0无后续处理，关闭界面，1查询detail信息
 *  url 当status为1时必传，查询数据
 */
function dealButton(id, type, bzid, dw, account, yj, status, toUrl) {
    //DriveToNext/ userAccount / bzid / id /204/ dw / account / yj
    var url = host+"/DriveToNext/" + getUserInfoByKey("userAccount") + "/"
        + bzid + "/" + id + "/" + type + "/"
        + dw + "/" + account +"/" + yj;
// alert(url);
    url = encodeURI(url);
    api.showProgress();//显示加载进度框
    api.ajax({
        url: url,  //例如：这是我的地址
        method: 'get',
        dataType: 'text'
    }, function(ret, err) {
        api.hideProgress();//隐藏加载进度框
// alert(ret);
        if (ret == "" || ret == undefined) {
            openDialog('获取数据失败!');
            // $api.toast('提示', '获取数据失败!', 1000);
            return;
        }

        ret = dealStr(ret);
        var data = $api.strToJson(ret);

        if (data.errorCode == '0'){
            if (status == undefined || status == '0') {
                api.closeToWin({name: "html/main"});
            } else if (status == '1') {
                getDetial(toUrl, id, type);
            }
        } else {
            openDialog(data.errorMsg);
            // $api.toast(data.errorMsg, 2000);
        }
    });
}

function genRyList(list, divid) {
    if (list == undefined)
        return;

    var html = "<li class=\"aui-list-header\">请选择：</li>";
    for (var i = 0; i < list.length; i ++) {
        item = list[i];
        html += "<li class=\"aui-list-item\">"
            +"<div class=\"aui-list-item-inner\">"
            +"<label><input class=\"aui-radio\" type=\"radio\" name=\""+divid+"radio\" value=\""+item.userCode+","+item.UserUnit+"\">"+item.UserName+"</label>"
            +"</div>"
            +"</li>";
    }
    document.getElementById(divid).innerHTML = html;
}

function getRyJgList(type, divid) {

    var url = host+"/getSubmitUserLeader/"+getUserInfoByKey("userUnit");
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

        ret = dealStr(ret);
        var data = $api.strToJson(ret);

        if (data.errorCode == '0'){
            genRyList(data.list, divid)
        } else {
            openDialog(data.errorMsg);
            // $api.toast(data.errorMsg, 2000);
        }
    });
}

function doJob(pagename) {
    openDealWin (pagename, type, id);
}

function videoPlay(filePath) {
    var videoPlayer = api.require('videoPlayer');
    videoPlayer.play({
      texts: {
          head: {
              title: '返回'
          }
      },
      styles: {
          head: {
              bg: 'rgba(0.5,0.5,0.5,0.7)',
              height: 24,
              titleSize: 20,
              titleColor: '#fff',
              backSize: 20,
              backImg: 'fs://img/back.png',
              setSize: 20,
              setImg: 'fs://img/set.png'
          },
          foot: {
              bg: 'rgba(0.5,0.5,0.5,0.7)',
              height: 20,
              playSize: 20,
              playImg: 'fs://img/back.png',
              pauseImg: 'fs://img/back.png',
              nextSize: 20,
              nextImg: 'fs://img/back.png',
              timeSize: 14,
              timeColor: '#fff',
              sliderImg: 'fs://img/slder.png',
              progressColor: '#696969',
              progressSelected: '#76EE00'
          }
      },
      path: filePath,
      autoPlay: true //（可选项）布尔类型；打开时是否自动播放；默认：true（自动播放）
    }, function(ret, err) {
    });
}

function downLoadFile (url) {
    // alert(url);
    api.showProgress();//显示加载进度框
    api.download({
      url: url,
      report: true,
      cache: true,
      allowResume: true
    }, function(ret, err) {
        api.hideProgress();//隐藏加载进度框
        if (ret.state == 1) {
            // alert(ret.savePath);
            var docInteraction = api.require('docInteraction');
            docInteraction.open({
                path: ret.savePath
            }, function(ret, err) {
                if (ret.status) {
                } else {
                    openDialog("打开文件失败!");
                }
            });
        } else {
            // openDialog("文件下载失败!");
        }
    });
}

function serachList(isXl) {
    var s = document.getElementById("search-input").value;
    if ($api.trim(s) == "")
        s = NSTR;
// alert(url+s)
    document.getElementById("dblist").innerHTML = "";
    getList(params, url+s, '', isXl);
}

function teleCall (tel) {
    api.call({
      type: 'tel_prompt',
      number: tel
    });
}
function openPhone(phone) {
	  api.call({type:'tel_prompt',number:phone})
}
function openSmsDialog(phone) {
		api.sms({
				numbers: [phone],
				text: ''
		}, function(ret, err) {
				if (ret && ret.status) {
				} else {
				}
		});
}

function sendMsg() {
    api.notification({
        notify: {
          content: '您有新的待办事件,请查阅!',
          extra:'11'
        }
    }, function(ret, err) {
    });
}

function getNowFormatDate() {
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
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    if (hour >= 0 && hour <= 9)
        hour = "0" + hour;
    if (minute >= 0 && minute <= 9)
        minute = "0" + minute;
    if (second >= 0 && second <= 9)
        second = "0" + second;

    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + hour + seperator2 + minute
            + seperator2 + second;
    return currentdate;
}

function getNowFormatDate1(format) {
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
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    if (hour >= 0 && hour <= 9)
        hour = "0" + hour;
    if (minute >= 0 && minute <= 9)
        minute = "0" + minute;
    if (second >= 0 && second <= 9)
        second = "0" + second;

    var currentdate = "";
    if (format == "YYYY-MM-DD")
        currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    else if (format == "YYYY-MM-DD HH:mm:ss")
        currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + hour + seperator2 + minute
            + seperator2 + second;
    else if (format == "HH:mm")
        currentdate = hour + seperator2 + minute;
    return currentdate;
}

function checkVersion(type) {
    var url = host+"/GetNewVersion";
    api.ajax({
        url: url,  //例如：这是我的地址
        method: 'get',
        dataType: 'text'
    }, function(ret, err) {
        // api.hideProgress();//隐藏加载进度框
        if (ret == "" || !ret.startWith("\"{") || !ret.endWith("}\""))
            return;

        ret = dealStr(ret);
        var data = $api.strToJson(ret);
        var xzjd = $api.byId('xzjd');
        var jdt = $api.byId('jdt');

        if (data.errorCode == '0'){
            var version = data.list[0].Verson;
            var apkurl = data.list[0].URL;
            if (api.appVersion == version) {
                if (type == '0')
                    openDialog("您的软件版本已是最新!");

                if (type == '1')
                    noLogIn();
            } else {
                var dialog = new auiDialog({})
                dialog.alert({
                    title:"提示",
                    msg:'有新的版本,是否下载并安装 ',
                    buttons:['取消','确定']
                },function(ret){
                    if (ret.buttonIndex == 2) {
                        if (api.systemType == "android") {
                            api.download({
                                url : apkurl,
                                report : true,
                                cache: false
                            }, function(ret, err) {
                                if (ret && 0 == ret.state) {/* 下载进度 */
                                    if (xzjd.style.display=="none")
                                        xzjd.style.display = "block";

                                    jdt.style.width = ret.percent + "%"
                                }
                                if (ret && 1 == ret.state) {/* 下载完成 */
                                    var savePath = ret.savePath;
                                    xzjd.style.display="none"
                                    api.installApp({
                                        appUri : savePath
                                    });
                                }
                            });
                        }
                        if (api.systemType == "ios") {
                            api.installApp({
                                appUri : result.source
                            });
                        }
                    } else {
                        if (type == '1')
                            noLogIn();
                    }
                });
            }
        } else {
            openDialog(data.errorMsg);
        }
    });
}

function noLogIn() {
    var userInfo = $api.getStorage('userInfo');
    if ($api.trim(userInfo) != '') {
        var url = host+"/CheckIsKick/"+getUserInfoByKey("userAccount");
        api.ajax({
            url: url,  //例如：这是我的地址
            method: 'get',
            dataType: 'text'
        }, function(ret, err) {
            if (ret == "" || !ret.startWith("\"{") || !ret.endWith("}\""))
                return;

            ret = dealStr(ret);
            var data = $api.strToJson(ret);
            if (data.errorCode == '0') {
                if (data["singleInfo"] != undefined && data["singleInfo"] != '')
                    time = data["singleInfo"] * 1000;
                getMsg();
                t1 = window.setInterval(getMsg, time);
            } else {
                openDialog(data.errorMsg);
            }
        });
        //setAjPush(getUserInfoByKey("userAccount"));
        openDealWin('html/main');
    }
}
