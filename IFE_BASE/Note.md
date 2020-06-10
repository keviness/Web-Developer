## 一，array.sort([compareFunction])
>数组排序
### compareFunction
>用来指定按某种顺序进行排列的函数。
### 返回值
>排序后的数组。请注意，数组已原地排序，并且不进行复制。
### 描述
&emsp;如果没有指明 compareFunction ，那么元素会按照转换为的字符串的诸个字符的Unicode位点进行排序。
&emsp;例如 "Banana" 会被排列到 "cherry" 之前。当数字按由小到大排序时，9 出现在 80 之前，但因为（没有指明 compareFunction），比较的数字会先被转换为字符串，所以在Unicode顺序上 "80" 要比 "9" 要靠前。
&emsp;如果指明了compareFunction，那么数组会按照调用该函数的返回值排序。a 和 b 是两个将要被比较的元素：

    compareFunction(a, b)<0，a会被排列到b之前；
    compareFunction(a, b)==0，a和b的相对位置不变。
    compareFunction(a, b)>0，b排列到a之前。

### compare(a, b)函数
#### 比较Number与String（通用）
    function compare(a, b) {
        if (a < b ) {   
        return -1;
        }
        if (a > b ) {
            return 1;
        }
        return 0;
    }

#### 比较Number

    function compareNumbers(a, b) {
        return a - b;
    }

### 排序示例
#### 数组排序

    var numbers = [4, 2, 5, 1, 3];
    numbers.sort(function(a, b) {
        return a - b;
    });
    console.log(numbers);
    等价于：
    var numbers = [4, 2, 5, 1, 3]; 
    numbers.sort((a, b) => a - b); 
    console.log(numbers);


#### 对象类型排序

    var items = [
        { name: 'Edward', value: 21 },
        { name: 'Sharpe', value: 37 },
        { name: 'And', value: 45 },
        { name: 'The', value: -12 },
        { name: 'Magnetic' },
        { name: 'Zeros', value: 37 }
    ];
    // sort by value
    items.sort(function (a, b) {
        return (a.value - b.value)
    });

    // sort by name
    items.sort(function(a, b) {
        var nameA = a.name.toUpperCase(); 
        var nameB = b.name.toUpperCase(); 
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });


### 非ASCII字符排序
>当排序非ASCII字符的字符串（如包含类似e、é、è、a、ä等字符的字符串）。一些非英语语言的字符串需要使用String.localeCompare。
#### 示例

    var items = ['réservé', 'premier', 'cliché'];
    items.sort(function (a, b) {
        return a.localeCompare(b);
    });


### 用映射辅助排序
>* compareFunction可能需要对元素做多次映射以实现排序，当 compareFunction较为复杂，且元素较多的时候，可能会导致很高的负载。可使用 map()辅助排序。
>* 基本思想是首先将数组中的每个元素比较的实际值取出来，排序后再将数组恢复。

#### 示例

    var list = ['Delta', 'alpha', 'CHARLIE', 'bravo'];
    var mapped = list.map(function(el, i) {
        return { index: i, value: el.toLowerCase() };
    })

    mapped.sort(function(a, b) {
        return +(a.value > b.value)|| 
        +(a.value === b.value) - 1;
    });

    var result = mapped.map(function(el){
        return list[el.index];
    });

## 二，event.preventDefault()
>阻止默认行为

    <html>
    <head>
    <script type="text/javascript" src="/jquery/jquery.js"></script>
    <script type="text/javascript">
    $(document).ready(function(){
        $("a").click(function(event){
        event.preventDefault();
        });
    });
    </script>
    </head>
    <body>
    <a href="http://w3school.com.cn/">W3School</a>
    </body>
    </html>

    //event.preventDefault() 方法将防止上面的链接打开 URL
    
## event.stopPropagation()
>阻止事件冒泡；

    var btn = document.getElementById('myBtn');
    document.onclick = function(){
        alert(1);
    }
    btn.onclick = function(event){
        event.stopPropagation();
    }

&emsp;这样当点击btn时，绑定在document的事件不会被触发，因为btn的事件冒泡机制被组织了。

### 兼容IE

    if (event.stopPropagation){  
        event.stopPropagation();  
    }else{  
        event.cancelBubble=true;  
    }  

    if (event.preventDefault){  
    event.preventDefault();  
    }else{  
        event.returnValue=false;  
    }  


### 合并表格相同行的内容
>* table：表格或者表格ID（最好是tbody，避免把表尾给合并了)
>* startRow：起始行，没有标题就从0开始
>* endRow：终止行，此参数是递归时检查的范围，一开始时会自动赋值为最后一行
>* col：当前处理的列
>* endCol:终止列
>* isInit:是否初始调用，如果是则在终止行为0时自动取最后一行

    function MergeCell(table, startRow, endRow, col, endCol isInit)    {
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
    }