function initCol(item) {
    var d = "";
    if (item.default != undefined)
        d = item.default;

    var mdiv = "";
    if (item.type == "input")
        mdiv += "<input id=\""+item.id+"\" name=\""+item.id+"\" type=\"text\" placeholder=\""+d+"\" onclick=\""+item.onclick+"\" redonly>";
    else if (item.type == "date")
        mdiv += "<input id=\""+item.id+"\" name=\""+item.id+"\" type=\"date\" placeholder=\""+d+"\">";
    else if (item.type == "time")
        mdiv += "<input id=\""+item.id+"\" name=\""+item.id+"\" type=\"time\" placeholder=\""+d+"\">";
    else if (item.type == "hidden")
        mdiv += "<input id=\""+item.id+"\" name=\""+item.id+"\" type=\"hidden\" >";
    else if (item.type == "select")
        mdiv += "<select id=\""+item.id+"\" name=\""+item.id+"\" onchange=\""+item.onchange+"\"></select>";
    else if (item.type == "textarea")
        mdiv += "<textarea id=\""+item.id+"\" name=\""+item.id+"\" placeholder=\""+d+"\"></textarea>";
    else if (item.type == "button")
        mdiv += "<button class=\"aui-btn aui-btn-info aui-margin-r-5\" onclick=\""+item.onclick+"\">"+item.name+"</button>";

    return mdiv;
}

function initItem(params) {
    var mdiv = "";

    var flag = false;
    for (var i = 0; i < params.item.length; i ++) {
        item = params.item[i];


        if (item.cols == '1' && !flag) {
            if (params.canInput == undefined || params.canInput == "0") {
                mdiv += "<tr>"
                        +"  <th>"+item.name+"</th>"
                        +"  <td colspan=\"3\" style=\"line-height:1rem;vertical-align: top;padding: 10px;text-align: left;\" id=\""+item.id+"\"></td>"
                        +"</tr>";
            }
            else {
                mdiv += "<tr>"
                        +"  <th>"+item.name+"</th>"
                        +"  <td colspan=\"3\" align=\"left\">";

                mdiv += initCol(item);
                mdiv += "  </td>"
                        +"</tr>";
            }
        } else if (item.cols == '1' && flag) {
            if (params.canInput == undefined || params.canInput == "0") {
                mdiv +=  "  <th>"+item.name+"</th>"
                        +"  <td id=\""+item.id+"\"></td>"
                        +"</tr>";
            }
            else {
                mdiv +=  "  <th>"+item.name+"</th>"
                        +"  <td>";

                mdiv += initCol(item);
                mdiv += "  </td>"
                        +"</tr>";
            }
            flag = false;
        } else if (item.cols == '2' && !flag) {
            if (params.canInput == undefined || params.canInput == "0") {
                mdiv +=  "<tr>"
                        +"  <th>"+item.name+"</th>"
                        +"  <td id=\""+item.id+"\"></td>";
            }
            else {
                mdiv +=  "<tr>"
                        +"  <th>"+item.name+"</th>"
                        +"  <td>";

                mdiv += initCol(item);
                mdiv += "  </td>";
            }
            flag = true;
        } else if (item.cols == '4') {
            if (item.type == "button") {
                mdiv +=  "<tr>"
                        +"  <th colspan=\"4\">"
                        +"    <button class=\"aui-btn aui-btn-info aui-margin-r-5\""
                        +"        onclick=\""+item.onclick+"\">"+item.name+"</button>"
                        +"  </th>"
                        +"</tr>";
            } else {
                mdiv +=  "<tr>"
                        +"  <th colspan=\"4\"  id=\""+item.id+"\">"
                        +" </th>"
                        +"</tr>";
            }
        }
    }
    var el = document.getElementById(params.divId);
    $api.append(el, mdiv);
}

function initItemDetail(params) {
    var mdiv = "";

    var flag = false;
    var func = "";
    for (var i = 0; i < params.item.length; i ++) {
        item = params.item[i];

        func = item.func;
        if (item["func"] != undefined && item["func"] != "")
            func = "<span>openPhone('"+item["MobilePhone"]+"')</span>";

        if (item.cols == '1' && !flag) {
            mdiv += "<tr>"
                    +"  <td style=\"line-height:1rem;vertical-align: top;padding: 10px 0;text-align: right;\">"+item.name+"</td>"
                    +"  <td colspan=\"3\" style=\"line-height:1rem;vertical-align: top;padding: 10px 0;text-align: left;\" id=\""+item.id+"\"></td>"
                    +"</tr>";
        } else if (item.cols == '1' && flag) {
            mdiv +=  "  <td style=\"line-height:1rem;vertical-align: top;padding: 10px 0;text-align: right;\">"+item.name+"</td>"
                    +"  <td style=\"line-height:1rem;vertical-align: top;padding: 10px 0;text-align: left;\" id=\""+item.id+"\"></td>"
                    +"</tr>";
            flag = false;
        } else if (item.cols == '2' && !flag) {
            mdiv +=  "<tr>"
                    +"  <td style=\"line-height:1rem;vertical-align: top;padding: 10px 0;text-align: right;\">"+item.name+"</td>"
                    +"  <td style=\"line-height:1rem;vertical-align: top;padding: 10px 0;text-align: left;\" id=\""+item.id+"\"></td>";
            flag = true;
        } else if (item.cols == '4') {
            if (item.id == "bt" || item.id == "rwbt")
                mdiv +=  "<tr>"
                        +"  <td style=\"font-size: 22px;line-height: 2.5rem;\" colspan=\"4\"  id=\""+item.id+"\">"
                        +"  </td>"
                        +"</tr>";
            else
                mdiv +=  "<tr>"
                        +"  <td style=\"line-height:1rem;vertical-align: top;padding: 10px 0;text-align: left;\" colspan=\"4\"  id=\""+item.id+"\">"
                        +"  </td>"
                        +"</tr>";
        }
    }
    var el = document.getElementById(params.divId);
    $api.append(el, mdiv);
}
//
// function initItem(params) {
//     var mdiv = "";
//     for (var i = 0; i < params.item.length; i ++) {
//         item = params.item[i];
//
//         if (item.cols == '1')
//             mdiv += "<li class=\"aui-list-item\">";
//         else
//             mdiv += "<li class=\"aui-list-item aui-pull-left\" style=\"width: 50%;\">";
//
//         mdiv += "      <div class=\"aui-list-item-inner\">";
//         mdiv += "        <div class=\"aui-list-item-label\">";
//         mdiv += "          "+item.name+"：";
//         mdiv += "        </div>";
//         mdiv += "        <div class=\"aui-list-item-input\">";
//
//         var d = "";
//         if (item.default != undefined)
//             d = item.default;
//
//         if (item.type == "input")
//             mdiv += "          <input id=\""+item.id+"\" type=\"text\" placeholder=\""+d+"\">";
//         else if (item.type == "textarea")
//             mdiv += "          <textarea id=\""+item.id+"\" placeholder=\""+d+"\"></textarea";
//
//         mdiv += "        </div>";
//         mdiv += "      </div>";
//         mdiv += "    </li>";
//
//     }
//
//     document.getElementById(params.divId).innerHTML = mdiv;
// }
