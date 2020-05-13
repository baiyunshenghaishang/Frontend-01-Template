# 每周总结可以写在这里

## 结构化编程

### 执行上下文栈

执行上下文栈是执行上下文的栈，每次有函数执行，就会将当前函数的执行上下文推入执行上下文栈，函数执行完毕，就会将当前执行上下文出栈

### 执行上下文

执行上下文包含包含 7 个部分

-   code evaluation state 用于 async 函数，记录 await 的位置
-   function 函数执行形成的执行上下文才有
-   script/module script/module 执行的上下文才有
-   generator generator 函数才有
-   realm 可以认为是全局对象
-   lexical environment 词法环境
-   variable environment 变量环境

### lexical environment

在 execution context 的其中类型中，lexical environment 是最重要的，因为这个是定义变量的部分，所有的变量都是从这儿获取的

lexical environment 包含一个 environment record 和一个指向外部 environment record 的引用，如果不存在外部 environment record,则是 null

environment record 分为几类

-   Object environment record
-   global environment record
-   declarative environment record
-   function environment record
-   module environment record

虽然执行上下文包含 lexical environment 包含 lexical environment 并不是只会在执行上下文生成时生成，否则无法解释块级作用域，此处需要查规范进一步确认

## 玩具浏览器

主要是用代码实现了如何使用 net 模块模拟发送 http 请求，并处理返回值

发送请求分别模拟了请求行、请求头、请求体
接受请求返回值的处理使用了状态机来处理服务端的 http 请求返回值
