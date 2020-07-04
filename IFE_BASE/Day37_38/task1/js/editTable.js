//为单元格动态创建input元素，使单元格进入编辑状态
function initEditTableCell(tableId) {
    var divObj,
        tdObj,
        tableObj,
        inputObj;
    tableObj = document.querySelector("#" + tableId + " table");
    tdObj = tableObj.getElementsByTagName("td");
    for (var i=0; i<tdObj.length; i++) {
        if (isNaN(tdObj[i].innerHTML)) {
            continue;
        }
        divObj = document.createElement("div");
        inputObj = document.createElement("input");
        inputObj.type = "text";
        inputObj.value = tdObj[i].innerHTML;
        tdObj[i].innerHTML = "";
        divObj.appendChild(inputObj);
        tdObj[i].appendChild(divObj);
        inputObj.onblur = function(event) {
            checkInputValue(event);
        }
    }
}

function saveDataToLocalStorage() {
    var localData,
        table,
        tdObj,
        region,
        product,
        valueList;      
    localData = getStorage();
    table = document.getElementsByTagName("table")[0];
    valueList = [];
    for (var i=1; i<table.rows.length; i++) {
        tdObj = table.rows[i].cells;
        region = tdObj[0].innerHTML;
        product = tdObj[1].innerHTML;
        for (var j=2; j<tdObj.length; j++) {
            if (!isNaN(tdObj.innerHTML)) {
                valueList.push(tdObj.innerHTML);
            }
        }
        updateLocalStorage(product, region, valueList);
    }
}

function checkInputValue(event) {
    var targetElement = event.target;
    if (targetElement.nodeName.toLowerCase() === "input") {
        if (isNaN(targetElement.value)) {
            alert("The input must be a number!");
        }
    }
}