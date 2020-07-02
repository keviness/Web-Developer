function initEditTableCell(tableId) {
    var divObj,
        tdObj,
        tableObj,
        inputObj;
    tableObj = document.querySelector("#" + tableId);
    tdObj = tableObj.getElementsByTagName("td");
    for (var i=0; i<tdObj.length; i++) {
        if (isNaN(tdObj[i].innerHTML)) {
            continue;
        }
        divObj = document.createElement("div");
        inputObj = document.createElement("input");
        inputObj.type = "text";
        inputObj.value = tdObj[i].innerHTML;
        divObj.appendChild(inputObj);
        tdObj[i].appendChild(divObj);
        tdObj.innerHTML = "";
        inputObj.focus();
    }
}

function saveDataToLocalStorage() {
    var localData,
        table,
        tdObj,
        inputObj,
        region,
        product,
        valueList;      
    localData = getStorage();
    table = document.getElementsByTagName("table")[0];

    for (var i=1; i<table.rows.length; i++) {
        tdObj = table.rows[i].cells
        region = tdObj[0].getElementsByTagName("input")[0].value;
        product = tdObj[1].getElementsByTagName("input")[0].value;
        for (var j=2; j<tdObj.length; j++) {
            inputObj = tdObj[j].getElementsByTagName("input")[0];
            if (!isNaN(inputObj.value)) {
                valueList.push(inputObj.value);
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