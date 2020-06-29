
# web本地存储(web storage) 
## 本地存储定义：
>* 存储对象是简单的键值存储，类似于对象。
>* 可以像访问对象一样访问这些值，或者使用Storage.getItem()和 Storage.setItem() 方法。
~~~js
    localStorage.colorSetting = '#a4509b';
    localStorage['colorSetting'] = '#a4509b';
    localStorage.setItem('colorSetting', '#a4509b');
~~~
## 本地存储常用方法
~~~js
    localStorage/sessionStorage.setItem('myCat', 'Tom');  //添加项，加入到本地存储中
    let cat = localStorage/sessionStorage.getItem('myCat'); //获取项的相应值
    localStorage/sessionStorage.removeItem('myCat');  //移除指定项
    localStorage/sessionStorage.clear();  //清空本地所有存储的数据
~~~
## Web Storage包含如下两种：
### sessionStorage 
>sessionStorage方法针对一个session进行数据存储。当用户关闭浏览器窗口后，数据会被删除(页面刷新和恢复，存储数据不会清除)。
### sessionStorage应用示例
~~~js
    function clickCounter() {
        if(typeof(Storage) !== "undefined") {
            if (sessionStorage.clickcount) {
                sessionStorage.clickcount = Number(sessionStorage.clickcount)+1;
            } else {
                sessionStorage.clickcount = 1;
            }
            document.getElementById("result").innerHTML = "在本 session中，点击按钮 " + sessionStorage.clickcount + " 次。";
        } else {
            document.getElementById("result").innerHTML = "抱歉！您的浏览器不支持 Web Storage ...";
        }
    }
~~~
### localStorage 
>与sessionStorage相似，在浏览器关闭，重新打开页面后数据仍然存在。
~~~js
    if (localStorage.pagecount)
	{
	    localStorage.pagecount=Number(localStorage.pagecount) +1;
	}
    else
	{
	    localStorage.pagecount=1;
	}
    document.write("Visits: " + localStorage.pagecount + " time(s).");
~~~

## StorageEvent（存储事件）
>* 通过StorageEvent响应存储的变化
>* Storage对象发生变化时（创建/更新/删除数据项时，重复设置相同的键值不会触发该事件，Storage.clear() 方法至多触发一次该事件），
>* StorageEvent事件在同一个页面内发生的改变不会起作用，在相同域名下的其他页面（如一个新标签或 iframe）发生的改变才会起作用。在其他域名下的页面不能访问相同的 Storage 对象。
>* 这里，我们为window对象添加了一个事件监听器，在当前域名相关的 Storage 对象发生改变时该事件监听器会触发。改变的数据项的键，改变前的旧值，改变后的新值，改变的存储对象所在的文档的 URL，以及存储对象本身。
~~~js
    window.addEventListener('storage', function(e) {  
        document.querySelector('.my-key').textContent = e.key;
        document.querySelector('.my-old').textContent = e.oldValue;
        document.querySelector('.my-new').textContent = e.newValue;
        document.querySelector('.my-url').textContent = e.url;
        document.querySelector('.my-storage').textContent = e.storageArea;
});
~~~
