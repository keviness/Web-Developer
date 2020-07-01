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

## Canvas定义

>* HTML5 canvas标签用于绘制图像。
>* getContext()方法可返回一个对象，该对象提供了用于在画布上绘图的方法和属性。
>* canvas元素创造了一个固定大小的画布，它公开了一个或多个渲染上下文，其可以用来绘制和处理要展示的内容。
>* canvas元素有一个叫做 getContext()的方法，这个方法是用来获得渲染上下文和它的绘画功能。getContext()只有一个参数，上下文的格式。
~~~js
var canvas = document.getElementById('tutorial');
var ctx = canvas.getContext('2d');
~~~

## Canvas绘制常见图形

### 线条
~~~js
beginPath()  //新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
closePath()  //闭合路径之后图形绘制命令又重新指向到上下文中。
stroke()  //通过线条来绘制图形轮廓。
fill()  //通过填充路径的内容区域生成实心的图形。
lineTo(x, y)  //绘制一条从当前位置到指定x以及y位置的直线。
moveTo(x, y)  //将笔触移动到指定的坐标x以及y上。
~~~

#### 示例
~~~js
//绘制三角形
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
  var ctx = canvas.getContext('2d');

  // 填充三角形
  ctx.beginPath();
  ctx.moveTo(25, 25);
  ctx.lineTo(105, 25);
  ctx.lineTo(25, 105);
  ctx.fill();

  // 描边三角形
  ctx.beginPath();
  ctx.moveTo(125, 125);
  ctx.lineTo(125, 45);
  ctx.lineTo(45, 125);
  ctx.closePath();
  ctx.stroke();
  }
}
~~~

###  矩形
~~~js
fillRect(x, y, width, height)  //绘制一个填充的矩形
strokeRect(x, y, width, height)  //绘制一个矩形的边框
clearRect(x, y, width, height)  //清除指定矩形区域，让清除部分完全透明。
~~~

#### 示例
~~~js
//绘制矩形
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
  }
}
~~~

### 圆弧
>* 画一个以（x,y）为圆心的以radius为半径的圆弧（圆），从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成。
>* arc()函数中表示角的单位是弧度，不是角度。角度与弧度的js表达式:
弧度=(Math.PI/180)*角度。
~~~js
arc(x, y, radius, startAngle, endAngle, anticlockwise)
~~~
#### 示例
~~~js
//绘画一个笑脸
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // 绘制
    ctx.moveTo(110, 75);
    ctx.arc(75, 75, 35, 0, Math.PI, false);   // 口(顺时针)
    ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // 左眼
    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // 右眼
    ctx.stroke();
  }
}
~~~

### 曲线
~~~js
quadraticCurveTo(cp1x, cp1y, x, y)  //绘制二次贝塞尔曲线，cp1x,cp1y为一个控制点，x,y为结束点。
bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)  //绘制三次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点。
~~~
#### 示例
~~~js
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    // 二次贝塞尔曲线
    ctx.beginPath();
    ctx.moveTo(75, 25);
    ctx.quadraticCurveTo(25, 25, 25, 62.5);
    ctx.quadraticCurveTo(25, 100, 50, 100);
    ctx.quadraticCurveTo(50, 120, 30, 125);
    ctx.quadraticCurveTo(60, 120, 65, 100);
    ctx.quadraticCurveTo(125, 100, 125, 62.5);
    ctx.quadraticCurveTo(125, 25, 75, 25);
    ctx.stroke();
   }
}
~~~

### 文本
~~~js
fillText(text, x, y [, maxWidth]) //在指定的(x,y)位置填充指定的文本，绘制的最大宽度是可选的.
strokeText(text, x, y [, maxWidth])  //在指定的(x,y)位置绘制文本边框，绘制的最大宽度是可选的.
~~~
#### 示例
~~~js
//填充文本
function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.font = "48px serif";
  ctx.fillText("Hello world", 10, 50);
}
//文本边框
function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.font = "48px serif";
  ctx.strokeText("Hello world", 10, 50);
}
~~~