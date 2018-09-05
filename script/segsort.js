function pySegSort(arr,key) {
    if(!String.prototype.localeCompare)
        return null;
    var charts = "*abcdefghjklmnopqrstwxyz";
    var letters = charts.split('');
    var zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split('');

    var segs = [];
    var curr;
    $.each(letters, function(i){
        var l = this;
        // curr = {letter: this, data:[]};
        for (var n = 0; n < arr.length; n ++) {
            var item = arr[n];
            var t = item[key].substring(0, 1).toLowerCase();
            var idx = charts.indexOf(t);
            if (idx > 0) 
                t = zh[idx-1];

            if((!zh[i-1] || zh[i-1].localeCompare(t) <= 0)
                && (t.localeCompare(zh[i], 'zh') == -1)) {
                // curr.data.push(this);
                segs.push(l.toUpperCase()+" "+item[key]);
            }
        }
        // $.each(arr, function() {
        //     if((!zh[i-1] || zh[i-1].localeCompare(this[key]) <= 0) && this[key].localeCompare(zh[i]) == -1) {
        //         // curr.data.push(this);
        //         segs.push(l.toUpperCase()+" "+this[key]);
        //     }
        // });
        // if(empty || curr.data.length) {
        //     segs.push(curr);
        //     curr.data.sort(function(a,b){
        //         return a.localeCompare(b);
        //     });
        // }
    });
    return segs;
}
