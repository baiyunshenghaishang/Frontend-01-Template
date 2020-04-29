# 每周总结可以写在这里

本周两讲讲了表达式和语句。

表达式部分从优先级由低到高依次讲解。整体上分为左值表达式和右值表达式。左值表达式的优先级高于右值表达式。
这里面有个重点是 Reference 类型

语句部分分为简单语句、复合语句、声明语句三类。

# Expression

## Left Handside Expression

### Member Expression

- a.b
- a[b]
- super.b
- super['b']
- new.target
- new Foo() 此处注意，带()的 new Foo()优先级比 new Foo 高
- foo`string`

Member Expression 不一定是 Member 操作，只是为了标识优先级.

Member Expression 返回的是 Reference 类型

#### Reference

Reference 类型包含两部分

- Key
- Object

可以以类似 JS 代码理解

```javascript
class Reference {
  constructor(object, property) {
    this.object = object;
    this.property = property;
  }
}
```

Reference 有个重要特性是可以写

### Call Expression

可以理解为 只要有了函数调用，Member Expression 的优先级就变为了 Call Expression

- foo()
- super()
- foo()['b']
- foo()[b]
- foo()`abc`

## Right Handside Expression

### Update Expression

- a++
- a--
- ++a
- --a

### Unary Expression

- delete a.b
- void foo()
- +a
- -a
- ~a
- !a
- await a

### Exponental Expression

- \*\*

### Multiplicative Expression

- \*
- /
- %

### Additive

- +
- -

# Statement 语句

## Completion Record

- [[type]] : normal, break, continue, return throw
- [[value]] : Types
- [[target]]: label

## 简单语句

- ExpressionStatement 表达式语句
- EmptyStatement 空语句
- DebuggerStatement
- ThrowStatement
- ContinueStatement
- BreakStatement
- ReturnStatement

## 复合语句

- BlockStatement
- IfStatement
- SwitchStatement
- IterationStatement
- WithStatement
- LabelledStatement
- TryStatement

## Declaration 声明语句

- FunctionDeclaration
- GeneratorDeclaration
- AsyncFunctionDeclaration
- AsyncGeneratorDeclaration
- VariableStatement
- ClassDeclaration
- LexicalDeclaration
