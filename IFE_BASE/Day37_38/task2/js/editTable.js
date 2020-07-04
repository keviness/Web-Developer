function initEditTableCell(td) {
    var divObj,
        checkObj,
        cancleObj,
        initValue,
        inputObj;
    divObj = document.createElement("div");
    inputObj = document.createElement("input");
    checkObj = document.createElement("button");
    cancleObj = document.createElement("button");

    divObj.setAttribute("class", "div-obj");

    inputObj.setAttribute("class", "input-obj");
    inputObj.type = "text";
    inputObj.value = td.innerHTML;

    checkObj.setAttribute("class", "check-btn");
    cancleObj.setAttribute("class", "cancle-btn");
    
    divObj.appendChild(inputObj);
    divObj.appendChild(checkObj);
    divObj.appendChild(cancleObj);
    initValue = td.innerHTML;
    td.innerHTML = "";
    td.appendChild(divObj);

    divObj.addEventListener("click", function(event){
        changeEditStatus(event, initValue)
    }, false);
    divObj.addEventListener("keyup", function(event){
        changeEditStatus(event, initValue)
    }, false);

    inputObj.focus();
}

/*
function checkInputValue(event) {
    var targetElement = event.target;
    if (targetElement.nodeName.toLowerCase() === "input") {
        if (isNaN(targetElement.value)) {
            alert("The input must be a number!");
        }
    }
}
*/

function changeEditStatus(event, initValue) {
    var targetElement = event.target,
        eventType = event.type;

    if ((eventType==="click" && targetElement.getAttribute("class")==="cancle-btn")) {
        exitEditStatus(targetElement.parentNode, initValue);
    }

    if ((eventType==="click" && targetElement.getAttribute("class")==="check-btn")) {
        var inputObj = document.querySelector(".input-obj"),
            value = inputObj.value,
            tdObj = targetElement.parentNode.parentNode,
            trObj = tdObj.parentNode,
            cellArray = trObj.cells,
            region = cellArray[1].innerHTML,
            product = cellArray[0].innerHTML;
            index = tdObj.getAttribute("sale-index");

        if (isNaN(value)) {
            alert("The input is not a number!");
            inputObj.focus();
        }else {
            updateLocalStorage(product, region, index, value);
            exitEditStatus(targetElement.parentNode, value);
        }
    }   
}

function exitEditStatus(div, value) {
    var td = div.parentNode;
    td.innerHTML = value;
    td.setAttribute("class", "sale");
    div.setAttribute("class", "checked");
}