var key = "dataStorage"

function initStorage() {
    var data = [];
    if (!getStorage()) {
        data = sourceData;
        data = JSON.stringify(data);
        localStorage.setItem(key, data);
    }
}

function getStorage() {
    return JSON.parse(localStorage.getItem(key));
}

function updateLocalStorage(product, region, index, value) {
    var localData = getStorage();

    for (var i=0; i<localData.length; i++) {
        if (localData[i].product === product && localData[i].region === region) {
            localData[i].sale[index] = value;
            break;
        }
    }
    localStorage.setItem(key, JSON.stringify(localData))
}

/*
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
*/