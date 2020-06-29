### 合并表格相同列的内容
>* table：表格或者表格ID（最好是tbody，避免把表尾给合并了)
>* startRow：起始行，没有标题就从0开始
>* endRow：终止行，此参数是递归时检查的范围，一开始时会自动赋值为最后一行
>* col：当前处理的列
>* endCol:终止列
>* isInit:是否初始调用，如果是则在终止行为0时自动取最后一行
~~~js
    function MergeCell(table, startRow, endRow, col, endCol isInit)  {
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
            if (table.rows[startRow].cells[col].innerHTML == table.rows[i + 1].cells[col].innerHTML) {
            //如果相同则隐藏下一行的同列单元格
                table.rows[i + 1].cells[col].style.display = 'none';
            //更新rowSpan属性
                table.rows[startRow].cells[col].rowSpan = (table.rows[startRow].cells[col].rowSpan | 0) + 1;
            //当循环到终止行前一行并且起始行和终止行不相同时递归(因为上面的代码已经检查了i+1行，所以此处只到endRow-1)
                if (i == endRow - 1 && startRow != endRow) {
                MergeCell(table, startRow, endRow, col + 1, endCol, false);
                }
        } else {
            //起始行，终止行不变，检查下一列
            MergeCell(table, startRow, i, col + 1, endCol, false);
            //增加起始行
            startRow = i + 1;
        }
    }
~~~

## SVG 
>* 意为可缩放矢量图形（Scalable Vector Graphics）。
>* 使用 XML 格式定义图像。
## SVG常见绘图
### 圆形 <circle>
~~~js
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
   <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
</svg> 
~~~

### 椭圆 <ellipse>
~~~js
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <ellipse cx="300" cy="80" rx="100" ry="50"
  style="fill:yellow;stroke:purple;stroke-width:2"/>
</svg>
~~~

### 矩形 <rect>
~~~js
//普通矩形
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <rect width="300" height="100"
  style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"/>
</svg>
//圆角矩形
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <rect x="50" y="20" rx="20" ry="20" width="150" height="150"
  style="fill:red;stroke:black;stroke-width:5;opacity:0.5"/>
</svg>
~~~

### 直线 <line>
~~~js
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <line x1="0" y1="0" x2="200" y2="200"
  style="stroke:rgb(255,0,0);stroke-width:2"/>
</svg>
~~~

### 多边形 <polygon>
>* polygon来自希腊。"Poly"意味"many"，"gon"意味"angle".
~~~js
//三角形
<svg  height="210" width="500">
  <polygon points="200,10 250,190 160,210"
  style="fill:lime;stroke:purple;stroke-width:1"/>
</svg>
//五角星
<svg height="210" width="500">
  <polygon points="100,10 40,198 190,78 10,78 160,198"
  style="fill:lime;stroke:purple;stroke-width:5;fill-rule:nonzero;" />
</svg>
~~~

### 曲线 <polyline>
~~~js
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <polyline points="20,20 40,25 60,40 80,120 120,140 200,180"
  style="fill:none;stroke:black;stroke-width:3" />
</svg>
~~~

### 文本 <text>
~~~js
<svg xmlns="http://www.w3.org/2000/svg" version="1.1"
xmlns:xlink="http://www.w3.org/1999/xlink">
  <a xlink:href="http://www.w3schools.com/svg/" target="_blank">
    <text x="0" y="15" fill="red">I love SVG</text>
  </a>
</svg>
~~~

### SVG Stroke 属性
>SVG提供了一个范围广泛stroke 属性。在本章中，我们将看看下面：
#### stroke
>定义一条线，文本或元素轮廓颜色.
~~~js
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <g fill="none">
    <path stroke="red" d="M5 20 l215 0" />
    <path stroke="blue" d="M5 40 l215 0" />
    <path stroke="black" d="M5 60 l215 0" />
  </g>
</svg>
~~~
#### stroke-width
>stroke- width属性定义了一条线，文本或元素轮廓厚度.
~~~js
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <g fill="none" stroke="black">
    <path stroke-width="2" d="M5 20 l215 0" />
    <path stroke-width="4" d="M5 40 l215 0" />
    <path stroke-width="6" d="M5 60 l215 0" />
  </g>
</svg>
~~~
#### stroke-linecap
>定义不同类型的开放路径的终结。
~~~js
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <g fill="none" stroke="black" stroke-width="6">
    <path stroke-linecap="butt" d="M5 20 l215 0" />
    <path stroke-linecap="round" d="M5 40 l215 0" />
    <path stroke-linecap="square" d="M5 60 l215 0" />
  </g>
</svg>
~~~
#### stroke-dasharray
>用于创建虚线样式。
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <g fill="none" stroke="black" stroke-width="4">
    <path stroke-dasharray="5,5" d="M5 20 l215 0" />
    <path stroke-dasharray="10,10" d="M5 40 l215 0" />
    <path stroke-dasharray="20,10,5,5,5,10" d="M5 60 l215 0" />
  </g>
</svg>