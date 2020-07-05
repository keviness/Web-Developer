/******************** 主函数 ************************/
//主函数控制：
function mainFunction() {
    initStorage();
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
            if (regionValueNum.length > 1) {
                MergeCell(table, 0, 9, 0, 13, true);
            }
            if (regionValueNum.length===1 && productValueNum.length>1) {
                MergeCell(table, 0, 9, 1, 13, true);
            }
        }
    }

    var tableObj = document.querySelector("#table-wrapper");
    tableObj.onmouseover = function(event) {
        if (event.target.nodeName.toLowerCase() == "td") {
            var tableDataList,
                svgWrapper,
                lineWrapper,
                selectCells;

            tableDataList = [];
            selectCells = event.target.parentElement.cells;
            for (var i=0; i<selectCells.length; i++) {
                tableDataList.push(selectCells[i].innerHTML);
            }
            tableDataList = tableDataList.filter(function(item, index, array){
                return !isNaN(item);
            });

            //draw histogram:
            svgWrapper = document.querySelector("#svg-wrapper");
            if (svgWrapper.firstChild) //移除第一个子元素
            {
                svgWrapper.removeChild(svgWrapper.firstChild);
            }
            histogram.svgWrapperId = "svg-wrapper";
            histogram.drawMainFunction(tableDataList);

            //draw lineChart:
            lineWrapper = document.querySelector("#line-wrapper");
            if (lineWrapper.firstChild)
            {
                lineWrapper.removeChild(lineWrapper.firstChild);
            }
            lineChart.lineWrapperId = "line-wrapper";
            lineChart.drawMainFunction(tableDataList);
        }
    }
    //绘制多条直方图和折线图
    document.querySelector("#table-wrapper").onmouseout = function(event) {
        var dataArray,
            colorArray,
            svgWrapper,
            lineWrapper;

        data = getStorage() || sourceData;
        dataArray = [];
        colorArray = ["green", "blue", "yellow", "pink", "black", "red", "gray", "brown", "orange"];
        for (var i=0; i<data.length; i++) {
            dataArray.push(data[i].sale);
        }
        
        //draw histogram:
        svgWrapper = document.querySelector("#svg-wrapper");
        if (svgWrapper.firstChild) {
            svgWrapper.removeChild(svgWrapper.firstChild);
        }
        histogram.svgWrapperId = "svg-wrapper";
        histogram.drawHistogramGroup(dataArray, colorArray);

        //draw lineChart:
        lineWrapper = document.querySelector("#line-wrapper");
        if (lineWrapper.firstChild) {
            lineWrapper.removeChild(lineWrapper.firstChild);
        }
        lineChart.lineWrapperId = "line-wrapper";
        lineChart.drawLineChartGroup(dataArray, colorArray);
    }

    /*
    //处理localStorage
    
    var saveBtn = document.querySelector("#save-btn");
    saveBtn.onclick = function() {
        initEditTableCell("table-wrapper");
        saveDataToLocalStorage();

        var tableObj = document.querySelector("#table-wrapper");
        tableObj.onblur = function(event) {
            checkInputValue(event);
        }
    }
    */

    //为table添加事件，点击表格进入编辑状态
    function editStatusTable(event) {
        var tdObj = event.target;
        if (tdObj.nodeName.toLowerCase() === "td") {
            var editCell = document.querySelector(".div-obj");
            if (editCell) {
                exitEditStatus(editCell, editCell.firstChild.value);
            }
            if (tdObj.getAttribute("class") === "sale") {
                initEditTableCell(tdObj);
            }
        }
    }    
    document.querySelector("#table-wrapper").addEventListener("click", editStatusTable, false);


    //关闭多余进入编辑状态的单元格
    function exitEditStatusTable(event) {
        var targetElement = event.target;
        if ((targetElement.nodeName.toLowerCase()!=="button") && (targetElement.nodeName.toLowerCase()!=="td")) {
            var editCell = document.querySelector(".div-obj");
            if (editCell) {
                exitEditStatus(editCell, editCell.firstChild.value);
            }
        }
    }
    document.querySelector("#table-wrapper").addEventListener("click", exitEditStatusTable, false);

    /*
    //用svg生成华东地区数据直方图
    histogram.svgWrapperId = "svg-wrapper";
    histogram.init(sourceData[0]);
    histogram.drawBar();
    //generateHistogram(sourceData[0]);
    //用canvas生成华东地区数据折线图
    lineChart.lineWrapperId = "line-wrapper";
    lineChart.init(sourceData[0]);
    lineChart.drawLineChart();
    //drawLineChart(sourceData[0]);
    */
}

window.onload = function(event) {
    alert("include successfully!");
    mainFunction();
}