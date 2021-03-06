---
title: 文档流与BFC感悟
tag: CSS
date: 2020.2.14
---
## 文档流
1. 文档流包括正常文档流，脱离文档流。
2. 浮动元素具有破坏性，包裹性及浮动性。会造成父元素高度塌陷，但可以形成文字环绕的效果，应合理应用float元素。
3. 元素浮动后，块级元素将忽略他的存在，BFC将重新感知它的存在。
4. block级元素具有流体性质，会自动填满父级元素，可利用该性质，在布局上形成自适应宽度的效果。
***
## BFC
> Block Format Context 块级元素格式上下文
1. 简单来说，块级元素形成BFC后，会在内部形成一个独立渲染区域，不管外部元素如何进行渲染，BFC总是“泰山崩于前而不改其色”。
2. 在浮动图片与块级元素（文字）同一布局时，文字形成环绕，可将块级文字用overflow:hidden;形成BFC独立渲染区域，文字将不再环绕图片。