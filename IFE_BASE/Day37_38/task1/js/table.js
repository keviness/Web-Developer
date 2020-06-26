/*********************** 表格渲染 ***************************/
//动态创建Table Form
function createTableForm(data) {
    var tableHTML,
        tableWrapper,
        rows,
        values,
        i,
        j;

        tableHTML = '';
        tableHTML += '<table border="1" width ="100%" style = "text-align:center; border-collapse:collapse;">';
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
/*
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
*/

///合并表格相同行的内容
///table：表格或者表格ID（最好是tbody，避免把表尾给合并了)
///startRow：起始行，没有标题就从0开始
///endRow：终止行，此参数是递归时检查的范围，一开始时会自动赋值为最后一行
///col：当前处理的列
///endCol:终止列
///isInit:是否初始调用，如果是则在终止行为0时自动取最后一行
function MergeCell(table, startRow, endRow, col, endCol, isInit) {
    if (typeof (table) == 'string')
        table = document.getElementById(table);
    if (col >= table.rows[0].cells.length || col > endCol) {
        return;
    }
    if (isInit == undefined) isInit = true;
    //当检查第0列时检查所有行
    if ((col == 0 || endRow == 0) && isInit) {
        endRow = table.rows.length - 1;
    }
    for (var i = startRow; i < endRow; i++) {
        //程序是自左向右合并
        if (table.rows[startRow].cells[col].innerHTML === table.rows[i + 1].cells[col].innerHTML) {
            //如果相同则隐藏下一行的同列单元格
            table.rows[i + 1].cells[col].style.display = 'none';
            //更新rowSpan属性
            table.rows[startRow].cells[col].rowSpan = (table.rows[startRow].cells[col].rowSpan | 0) + 1;
            //当循环到终止行前一行并且起始行和终止行不相同时递归(因为上面的代码已经检查了i+1行，所以此处只到endRow-1)
            if (i == endRow - 1 && startRow != endRow) {
                MergeCell(table, startRow, endRow, col + 1, endCol, false);
            }
        } 
        else {
            //起始行，终止行不变，检查下一列
            MergeCell(table, startRow, i, col + 1, endCol, false);
            //增加起始行
            startRow = i + 1;
        }
    }
}
