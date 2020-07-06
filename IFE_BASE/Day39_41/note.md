## Location 对象属性
|属性|	描述|
|:----:|:-----:|
|hash  |设置或返回从井号 (#) 开始的 URL（锚）。|
|host  |设置或返回主机名和当前 URL 的端口号。|
|hostname|设置或返回当前 URL 的主机名。|
|href	|设置或返回完整的 URL。|
|pathname|设置或返回当前 URL 的路径部分。|
|port	|设置或返回当前 URL 的端口号。|
|protocol	|设置或返回当前 URL 的协议。|
|search	|设置或返回从问号 (?) 开始的 URL（查询部分）。|
## Location 对象方法
|属性|  描述 |
|:----:|:-------:|
|assign()|加载新的文档。|
|reload()|重新加载当前文档。|
|replace()|用新的文档替换当前文档。|

## change事件
- change事件在`<input>`, `<select>`, 和`<textarea>`元素的值更改时触发；与input事件不同，change事件不一定会对元素值的每次更改触发。
- `<input type="radio">`和`<input type="checkbox">`的默认选项被修改时，例如：通过点击或者键盘事件；
如：点击了`<select>`中的一个选项，从`<input type="date">`标签选择了一个日期，通过`<input type="file">`标签上传了一个文件等；
* 当标签的值被修改并且失焦后，但并未进行提交，例如：对`<textarea>`或者`<input type="text">`的值进行编辑后。

## History对象
* history.pushState()会增加历史记录的条目，但是不会触发hashchange和popstate；
* hashchange也可以增加历史记录的条目，但是它却可以触发popstate。
