## JavaScript Timing 事件
>* window 对象允许以指定的时间间隔执行代码，这些时间间隔称为定时事件。
>* `setTimeout(function, milliseconds)`
>* `setInterval(function, milliseconds)`
>* `setInterval()`等同于 `setTimeout()`，但持续重复执行该函数。
>* `setTimeout()` 和 `setInterval()`都属于 HTML DOM Window对象的方法。

### setTimeout()
 `window.setTimeout(function, milliseconds);`
>* `window.setTimeout()`可不带window前缀来编写。
>* 第一个参数是要执行的函数，第二个参数指示执行之前的毫秒数。

#### 停止执行clearTimeout() 
>* 停止执行`setTimeout()`中规定的函数。
>* `clearTimeout()`使用从`setTimeout()`返回的变量：
>* `window.clearTimeout(timeoutVariable)`

~~~js
myVar = setTimeout(function, milliseconds);
clearTimeout(myVar);
~~~

#### 示例
~~~js
<button onclick="myVar = setTimeout(myFunction, 3000)">试一试</button>
<button onclick="clearTimeout(myVar)">停止</button>
function myFunction() {
  alert("Hello");
}
~~~

### setInterval()
>* 在每个给定的时间间隔重复给定的函数。
>* `window.setInterval(function, milliseconds);`
>* 第一个参数是要执行的函数。
>* 第二个参数每个执行之间的时间间隔的长度。
>* `window.setInterval()`方法可以不带window前缀。

#### 示例
~~~js
//显示当前时间：
//1s=1000ms
var myVar = setInterval(myTimer, 1000);
function myTimer() {
    var d = new Date();
    document.getElementById("demo").innerHTML = d.toLocaleTimeString();
}
~~~

#### 停止执行clearInterval() 
>* 停止`setInterval()`方法中指定的函数的执行。
>* `window.clearInterval(timerVariable)`
>* `clearInterval()`方法使用从`setInterval()`返回的变量：
~~~js
myVar = setInterval(function, milliseconds);
clearInterval(myVar);
~~~

#### 示例
~~~js
<p id="demo"></p>
<button onclick="clearInterval(myVar)">停止时间</button>
var myVar = setInterval(myTimer, 1000);
 function myTimer() {
    var d = new Date();
    document.getElementById("demo").innerHTML = d.toLocaleTimeString();
}
~~~