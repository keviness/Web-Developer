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
            localData[i].sales[index] = value;
            break;
        }
    }
    localStorage.setItem(key, JSON.stringify(localData))
}