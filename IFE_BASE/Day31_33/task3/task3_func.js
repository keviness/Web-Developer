/*** Day31~33: task3 functions ***/
var CHECKBOXWRAPPER_IDS = ["region-radio-wrapper", "product-radio-wrapper"];

function checkboxHandle(wrapperId, configData) {
    var resultHTML;

    resultHTML = "";
    resultHTML += "<section id="+wrapperId+">";
    if (configData[0].name === "region") {
        resultHTML += "<input id='selectAllRegion' type='checkbox' name='"+configData[0].name+"'value='selectAll'/>";
        resultHTML += "<lable for='selectAllRegion'>全选</lable>";
    }
    if (configData[0].name === "product") {
        resultHTML += "<input id='selectAllProduct' type='checkbox' name='"+configData[0].name+"'value='selectAll'/>";
        resultHTML += "<label for='selectAllProduct'>全选</label>";
    }
    for (var i=0; i<configData.length; i++) {
        resultHTML += "<input id='"+ configData[i].region +"' type='checkbox' name='"+configData[i].name+"' value='"+configData[i].region+"'/>";
        resultHTML += "<label for='"+ configData[i].region +"'>"+configData[i].region+"</label>";
    }
    resultHTML += "</section>";
}