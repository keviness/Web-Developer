/*** Day34~36: task2 ***/
"use strict"
var CHECKBOXWRAPPER_IDS = ["region-radio-wrapper", "product-radio-wrapper"];

/******************** 动态创建CheckBox *******************/

function checkboxHandle(wrapperId, configData) {
    var resultHTML,
        key,
        checkBox;

    //动态构建checkBox HTML结构：
    resultHTML = "";
    resultHTML += "<section id='radios'>";
    if (configData[0].name === "region") {
        resultHTML += "<section id='region'><input id='selectAllRegion' class='All' type='checkbox' name='"+configData[0].name+"'value='selectAll'/>";
        resultHTML += "<lable for='selectAllRegion'>全选</lable>";
    }
    if (configData[0].name === "product") {
        resultHTML += "<section id='product'><input id='selectAllProduct' class='All' type='checkbox' name='"+configData[0].name+"'value='selectAll'/>";
        resultHTML += "<label for='selectAllProduct'>全选</label>";
    }
    for (var i=0; i<configData.length; i++) {
        key = Object.keys(configData[i]);
        if (key.indexOf("id")===-1 || key.indexOf("name")===-1){
            console.log("WARN: the config information is wrong!");
            return;
        }
        resultHTML += "<input id='"+ configData[i].id +"' class='single' type='checkbox' name='"+configData[i].name+"' value='"+configData[i].id+"'/>";
        resultHTML += "<label for='"+ configData[i].id +"'>"+configData[i].id+"</label>";
    }
    resultHTML +="</section>"
    resultHTML += "</section>";

    //checkBox事件处理：
    checkBox = document.querySelector("#"+wrapperId);
    checkBox.innerHTML = resultHTML;

    checkBox.onclick = function(event) {
        var targetElement,
            singleCheckedArray,
            alredayCheckedArray,
            selectedAll;

        targetElement = event.target;
        selectedAll = document.querySelector("#"+wrapperId+" input[class='All']");
        singleCheckedArray = Array.apply(null,document.querySelectorAll("#"+wrapperId+" input[class='single']"));
        alredayCheckedArray = singleCheckedArray.filter(function(item, index, array){
            return item.checked === true;
        });
        
        if (targetElement.nodeName.toLowerCase() === "input") {
            if (targetElement === selectedAll) {
                if (alredayCheckedArray.length === singleCheckedArray.length) {
                    event.preventDefault();
                }
                singleCheckedArray.forEach(function(item, index, array){
                    item.checked = true;
                });
            }else {
                if (alredayCheckedArray.length === singleCheckedArray.length) {
                    selectedAll.checked = true;
                }else if (alredayCheckedArray.length === 0) {
                    event.preventDefault();
                    targetElement.checked = true;
                }else {
                    selectedAll.checked = false;
                }
            }
        }
    }
}

/****************** 筛选数据 ********************/
//根据选中的内容筛选出数据
function FilterDataSource() {
    var data,
        checkedValue;

    data = getStorage() || sourceData;
    for (var i=0; i<CHECKBOXWRAPPER_IDS.length; i++) {
        checkedValue = getCheckedValue(CHECKBOXWRAPPER_IDS[i]);
        if (CHECKBOXWRAPPER_IDS[i] === "region-radio-wrapper") {
            data = data.filter(function(item, index, array) {
                for (var i=0; i<checkedValue.length; i++) {
                    if (item.region === checkedValue[i]) {
                        return true;
                    }
                }
                return false;
            });
        }
        if (CHECKBOXWRAPPER_IDS[i] === "product-radio-wrapper") {
            data = data.filter(function(item, index, array) {
                for (var i=0; i<checkedValue.length; i++) {
                    if (item.product === checkedValue[i]) {
                        return true;
                    }
                }
                return false;
            })
        }
    }

    /*
    //对数据进行排序
    data.sort(function(a, b) {
        var s = ChineseSort(a.region, b.region);
        if (!s) {
            return ChineseSort(a.product, b.product);
        }
        return s;
    })
    */
   
    return data;
}

/*
//按照汉语拼音对数据进行排序
function ChineseSort(a, b) {
    return a.localeCompare(b, 'zh-Hans-CN', {sensitivity: "accent"});
}
*/

//获取选中wrapper的值
function getCheckedValue(Id) {
    var wrapperObj,
        inputObjects,
        result;

    result = [];
    wrapperObj = document.querySelector("#"+Id);
    inputObjects = wrapperObj.getElementsByClassName("single");
    for (var i=0; i<inputObjects.length; i++) {
        if (inputObjects[i].checked) {
            result.push(inputObjects[i].value);
        }
    }
    return result;
}

