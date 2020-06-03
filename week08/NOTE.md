# 每周总结可以写在这里

## 选择器

选择器部分从两个维度去看

1. 不同类型的选择器
2. 选择器的权重

### 选择器类型

选择器从复杂到简单可以分为四类

1. 选择器列表
2. 复杂选择器
3. 复合选择器
4. 简单选择器

#### 简单选择器

简单选择器，顾名思义，最简单最基础的的选择器。其它选择器都是由简单选择器组成的
简单选择器分为六类。

##### id 选择器

使用`#id` 表示，匹配元素的 id，需要 id 和匹配 id 完全相等

##### class 选择器

使用`.cls` 表示。匹配元素的 class，只要元素 class 中包含 cls 就行

##### 标签选择器

使用标签名表示，如 `div`,`span`。匹配元素的标签名，不区分大小写

##### 通用选择器

\*。 匹配所有

##### 属性选择器

使用`[attr=value]`表示，其中 attr 是属性名，value 是属性值。除了 `=`外，还有`| ~ ^ $ *`，以及不包含`=`六种形式

##### 伪类和伪元素选择器

###### 伪元素

伪元素选择器比较少，常用的只有四个

-   ::first-letter
-   ::first-line
-   ::before
-   ::after

还有一些类似于::selection 这种的伪元素，要么兼容性太差，要么不常用

###### 伪类

相比伪元素，伪类要多一些，常用的伪类包括：

-   链接类。如 :visited,:link
-   状态类。如 :focus, :hover, :active
-   位置类。如 :nth-child, :nth-type
-   逻辑类 :not

#### 复合选择器

复合选择器是有多个简单选择器组成的，多个选择器之间不能有空格和其它符号

如 `div#id.cls[attr]`

#### 复杂选择器

复杂选择器则是复合选择器和连接符组成。
连接符分为四种

-   相邻兄弟选择器 +
-   通用兄弟选择器 ~
-   子代选择器 >
-   子孙选择器 空格

如`div#id.cls > p#id2.cls2`

#### 选择器列表

选择器列表是复杂选择器和逗号组成

如 `#id.cls , p#id2`

### 选择器权重

选择器的权重首先分为 important 和非 important，important 的权重都比非 important 高，

对于 important 相同的选择器，其选择器权重计算规则如下

1. 选择器权重是针对复杂选择器，选择器列表中每一个复杂选择器权重单独计算
2. 选择器权重可以用一个长度为四的数组表示，如[0,0,0,0],
3. 如果是行内样式，第一位为 1，否则第一位为 0
4. 第二位表示选择其中 id 选择器的数量，
5. 第三位表示 class 选择器、属性选择器、伪类、伪元素选择器的总数量，其中:not 不算，但是:not 内部的选择器要算，连接符不参与计算
6. 第四位表示标签选择器的数量
7. 算出来两个选择器的数组后，从第一位开始比较，大的那个选择器权重高，如果相同，则比较后一位
8. 如果四位都相同，css 书写位置靠后的一个权重更高

## 盒模型

这个比较简单，一个盒子会包含 margin、border、padding、content 四部分。四部分的宽度之和就是父元素的 content 宽度（某些特殊情况除外）。图就不贴了

## 正常流

### inline formatting context

ifc 描述的是水平方向上的布局，就是从左往右，放不下就换行。
文本布局这块比较复杂。
简单来讲就是 line-height 控制当前行盒的最小行高。因为子元素的行高可能超过设置的行高，导致行高被撑高
vertical-align 用来控制行内元素在行盒中的位置。比较奇特的是`display: inline-block`的元素，如果内部没有文字，那么 baseline 会被认定为元素的底部

### block formatting context

bfc 其实很简单，描述的是正常流在纵向的布局。就是从上往下，依次排列。然后每个块级盒子的左端一定和 bfc 的左端一起，如果是从右往左的文字，就是右端。
即使有 float 元素也是如此。

bfc 比较麻烦的地方在于和 margin 合并、float 的相互关系

#### 生成新 bfc 的条件

先理解三个概念
block-level 块级盒子，不是 inline 或者 inline 开头的 display 元素都是，run-in 不了解，先不管。winter 那句可以放入 bfc 还是挺准确的
block-container 块容器盒子。应该只有 block 和 inline-block,table-cell 等，容纳的是正常流的，就是块容器盒子。也就是 winter 说的，可以包含 bfc
block-boxes 块盒子。既是 block-level，也是 block-container。只有 block 元素

生成新 bfc 的条件是一下之一

1. float 元素
2. 绝对定位元素,包含 position:absolute 和 fixed
3. 是 block-container 但不是 block-level 的元素。这个比较难理解，以 flex 为例。flex 的里面肯定不是正常流，应该不符合 bfc 的布局规则，从上往下依次排列。所有 flex 不是 block-container，但是 flex 的直接子元素，如果本身不是 display:flex 的，那里面就是正常流，那就属于 block-container。但是很明显，flex 的直接子元素不是块级盒子，因为 flex 的子元素肯定没法放入 bfc，放入了就不是 flex 的子元素了嘛。所有 flex 的直接子元素就属于是 block-container 但不是 block-level,所有会生成新的 bfc。
4. block-boxes，但是 overflow 不是 visible
5. display 设置为 flow-root，这个属性是专门为 bfc 设置的

### margin 合并

margin 合并块级元素的上下边距在某些情况下只会保留最大值。

margin 合并有三种情况，最简单的是前一个块级元素设置了下边距，后一个块级元素设置了上边距，则两个之间的间距不是上下边距之和，而是上下边距中较大的那一个
margin 合并的另外两种情况是父子元素边距合并和空元素边距合并。

并不是所有的块级元素都会发生边距折叠，以下情况例外

1. float 元素
2. 绝对定位元素
3. 不同 bfc 的元素
4. 不属于 bfc，如 display:flex 的直接子元素之间不是发生 margin 合并，是因为他们根本不是在 bfc 中

### float

float 本身其实也比较简单，就是简单的往左或者往右浮动
float 麻烦的地方在于高度塌陷和 bfc 之间的关系

float 元素只会在同一个 bfc 内浮动，clear 也只能影响同一个 bfc 内的浮动元素。
浮动元素的高度塌陷问题也可以通过让父元素形成新的 bfc 来实现
