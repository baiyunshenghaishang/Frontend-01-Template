# 每周总结可以写在这里

## css

### css 动画

css 动画的使用分为两步

1. 定义关键帧
2. 定义动画的参数

第一步使用@keyframe 描述，第二步使用 animation 属性描述

animation 属性是下列属性的快捷方式

-   animation-name
-   animation-duration
-   animation-timing-function
-   animation-delay
-   animation-iteration-count
-   animation-direction
-   animation-fill-mode
-   animation-play-state

#### 贝塞尔曲线

贝塞尔曲线一般推荐直接用 ease
如果是离开页面的元素，用 ease-out
进入页面的元素，用 ease-in

### 颜色

相比于 rgb 颜色，hsl 颜色其实更好理解，而且用于动画也更好控制

很多时候，图片可以使用 svg

## html

### html 语义化

这块不是很感兴趣，就不太想梳理了

### DOM

操作 api

-   appendChild
-   insertBefore
-   removeChild
-   replaceChild

导航类

-   parentNode
-   childNodes
-   firstChild
-   lastChild
-   nextSibling
-   previousSibling

高级操作

-   compareDocumentPosition
-   contains
-   isEqualNode
-   cloneNode


