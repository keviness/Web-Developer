/*** Day31~33: task3 functions ***/
"use strict"
var CHECKBOXWRAPPER_IDS = ["region-radio-wrapper", "product-radio-wrapper"];

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

//根据选中的内容筛选出数据
function FilterDataSource() {
    var data,
        checkedValue;

    data = sourceData;
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
    return data;
}


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

//动态创建Table Form
function createTableForm(data) {
    var tableHTML,
        tableWrapper,
        rows,
        values,
        i,
        j;

        tableHTML = '';
        tableHTML += '<table border="1" width ="80%" style = "text-align:center; border-collapse:collapse;">';
        tableHTML += '<tr><th>Product</th><th>Reigon</th><th>1月</th><th>2月</th><th>3月</th>';
        tableHTML += '<th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th>';
        tableHTML += '<th>11月</th><th>12月</th></tr>';
        rows = "";
        for (i=0; i<data.length; i++) {
            rows += "<tr>";
            rows += "<td>" + data[i].product + "</td>";
            rows += "<td>" + data[i].region + "</td>";
            for (j=0; j<data[i].sale.length; j++) {
                rows += "<td>" + data[i].sale[j] + "</td>";
            }
            rows += "</tr>";
        }
        tableHTML += rows;
        tableHTML += '</table>';
        tableWrapper = document.querySelector("#table-wrapper");
        tableWrapper.innerHTML = tableHTML;
}

//合并表格的重复单元格:从row行开始合并colum列的重复单元格
function autoRowSpan(tb, row, colum) {
    var currentValue,
        previousValue,
        count;

    count = 0;
    previousValue = "";
    currentValue = "";
    for (var i=row; i<tb.rows.length; i++){
        currentValue = tb.rows[i].cells[colum].innerHTML;
        if (previousValue === currentValue) {
            tb.rows[row].deleteCell(colum);
            tb.rows[i-row-count].cells[colum].rowSpan = row+count+1;
            count++;
        }else {
            previousValue = currentValue;
            count = 0;
        }
    }
}

//主函数控制：
function mainFunction() {
    var radiosWrapper = document.querySelector("#radio-wrapper");

    checkboxHandle("region-radio-wrapper", [
        {id: "华北", name: "region"},
        {id: "华东", name: "region"},
        {id: "华南", name: "region"}
    ]);
    checkboxHandle("product-radio-wrapper", [
        {id: "手机", name: "product"},
        {id: "笔记本", name: "product"},
        {id: "智能音箱", name: "product"}
    ]);

    radiosWrapper.onclick = function(event) {
        var targetElement = event.target;
        if (targetElement.nodeName.toLowerCase() === "input") {
            createTableForm(FilterDataSource());

            var table = document.querySelector("#table-wrapper table");
            var regionValueNum = getCheckedValue("region-radio-wrapper");
            var productValueNum = getCheckedValue("product-radio-wrapper");
        /*    if (regionValueNum.length > 1) {
                autoRowSpan(table, 1, 0);
            }
            if (regionValueNum.length===1 && productValueNum.length>1) {
                autoRowSpan(table, 0, 1);
            }
        */
        }
    }
}



window.onload = function(event) {
    alert("include successfully!");
    mainFunction();
}