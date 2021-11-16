#### 操作DOM

阅读: 5959073

---

由于HTML文档被浏览器解析后就是一棵DOM树，要改变HTML的结构，就需要通过JavaScript来操作DOM。

始终记住DOM是一个树形结构。操作一个DOM节点实际上就是这么几个操作：

* 更新：更新该DOM节点的内容，相当于更新了该DOM节点表示的HTML的内容；
* 遍历：遍历该DOM节点下的子节点，以便进行进一步操作；
* 添加：在该DOM节点下新增一个子节点，相当于动态增加了一个HTML节点；
* 删除：将该节点从HTML中删除，相当于删掉了该DOM节点的内容以及它包含的所有子节点。

在操作一个DOM节点前，我们需要通过各种方式先拿到这个DOM节点。最常用的方法是 `document.getElementById()`和 `document.getElementsByTagName()`，以及CSS选择器 `document.getElementsByClassName()`。

由于ID在HTML文档中是唯一的，所以 `document.getElementById()`可以直接定位唯一的一个DOM节点。`document.getElementsByTagName()`和 `document.getElementsByClassName()`总是返回一组DOM节点。要精确地选择DOM，可以先定位父节点，再从父节点开始选择，以缩小范围。

例如：

```js
// 返回ID为'test'的节点：
var test = document.getElementById('test');

// 先定位ID为'test-table'的节点，再返回其内部所有tr节点：
var trs = document.getElementById('test-table').getElementsByTagName('tr');

// 先定位ID为'test-div'的节点，再返回其内部所有class包含red的节点：
var reds = document.getElementById('test-div').getElementsByClassName('red');

// 获取节点test下的所有直属子节点:
var cs = test.children;

// 获取节点test下第一个、最后一个子节点：
var first = test.firstElementChild;
var last = test.lastElementChild;
```

第二种方法是使用 `querySelector()`和 `querySelectorAll()`，需要了解selector语法，然后使用条件来获取节点，更加方便：

```js
// 通过querySelector获取ID为q1的节点：
var q1 = document.querySelector('#q1');

// 通过querySelectorAll获取q1节点内的符合条件的所有节点：
var ps = q1.querySelectorAll('div.highlighted > p');
```

注意：低版本的IE<8不支持 `querySelector`和 `querySelectorAll`。IE8仅有限支持。

严格地讲，我们这里的DOM节点是指 `Element`，但是DOM节点实际上是 `Node`，在HTML中，`Node`包括 `Element`、`Comment`、`CDATA_SECTION`等很多种，以及根节点 `Document`类型，但是，绝大多数时候我们只关心 `Element`，也就是实际控制页面结构的 `Node`，其他类型的 `Node`忽略即可。根节点 `Document`已经自动绑定为全局变量 `document`。
