// mediaValue: pic video
function showAction(mediaValue, id, hideId){
    api.actionSheet({
        title: '上传',
        cancelTitle: '取消',
        buttons: ['拍照','从手机相册选择']
    }, function(ret, err) {
        if (ret) {
            getPicture(ret.buttonIndex, mediaValue, id, hideId);
        }
    });
}

function getPicture(sourceType, mediaValue, id, hideId) {
    if(sourceType==1){ // 拍照
        api.getPicture({
            sourceType: 'camera',
            encodingType: 'jpg',
            mediaValue: mediaValue,
            allowEdit: false,
            destinationType: 'url',
            quality: 90,
            saveToPhotoAlbum: true
        }, function(ret, err) {
            if (ret && ret.data != "") {
                // alert(ret.data);
                uploadFile(ret, id, mediaValue, hideId);
            }else {
            }
        });
    }
    else if(sourceType==2){ // 从相机中选择
        var t;
        if (mediaValue == 'pic')
            t = "library";
        else
            t = "album";

        api.getPicture({
                sourceType: t,
                encodingType: 'jpg',
                mediaValue: mediaValue,
                destinationType: 'url',
                quality: 90
            }, function(ret, err) {
                // alert(JSON.stringify(ret));
                if (ret && ret.data != "") {
                    // alert(ret.data);


                    // document.getElementById(hideId).value = ret.data;
                    // alert(ret.data);
                    uploadFile(ret, id, mediaValue, hideId);
                } else {
                }
        });
    }
}

function uploadFile(fl, id, mediaValue, hideId) {
    var fs = api.require('fs');
    var res = fs.getAttributeSync({
        path: fl.data
    });
    if (res.status) {
        if (res.attribute.size > 20 * 1024 * 1024) {
            openDialog("上传文件大小不能大于20m!");
            return;
        }
    }

    // var url = "http://192.168.0.101:8080/drp_yjpt/drpServlet"
    var workCode = $("#EventCode").val();
    var Uploader = +getUserInfoByKey("userAccount");

    api.showProgress();//显示加载进度框
    api.ajax({
        url: fileUrl,
        method: 'post',
        dataType: 'text',
        timeout:120,
        data: {
            values : {'workCode': workCode, 'Uploader' : Uploader},
            files: {file:fl.data}
        },
    }, function(ret, err) {
        api.hideProgress();//隐藏加载进度框
        // alert(ret);
        if (ret == "") {
            openDialog("上传文件超时,请重新上传!");
            return;
        }

        ret = ret.replace(new RegExp("\\\\","g"),"");
        ret = ret.replace(new RegExp("\"{","g"),"{");
        ret = ret.replace(new RegExp("}\"","g"),"}");

        var data = $api.strToJson(ret);
        if (data.addAttachmentResult.errorCode == '0'){
            // api.closeWin();
            if (mediaValue == 'pic') {
                $api.html($api.byId(id), "<img height='150px' src=\""+fl.data+"\"/>");
                // document.getElementById(id+"btn").disabled = true;
            }
            else {
                $api.html($api.byId(id), "<button class=\"aui-btn aui-btn-info aui-margin-r-5\""
                + " onclick=\"videoPlay('"+fl.data+"')\">播放</button>");
            }
            document.getElementById(id+"btn").style.display="none";
            document.getElementById(id+"delbtn").style.display="";
            document.getElementById(hideId).value=data.addAttachmentResult.singleInfo;

            api.toast({
                msg: "文件上传成功!",
                duration: 1200,
                location: 'bottom'
            });
            // openDialog("文件上传成功!");
        } else {
            openDialog(data.addAttachmentResult.errorMsg);
        }
    });
}
