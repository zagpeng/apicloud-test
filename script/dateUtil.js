function getDateYYYYMM() {
    var mydate = new Date();
    var y = mydate.getFullYear(); //获取完整的年份(4位,1970-????)
    var m = mydate.getMonth(); //获取当前月份(0-11,0代表1月)}

    return y + "-" + ((m+1)<10?"0"+(m+1):(m+1)+"");
}
