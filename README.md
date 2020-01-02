### 小程序 笔记
> 创建小程序项目
###### git init 
###### 添加.gitignore文件
切记:在第一次push代码前添加.gitignore文件,不然后续添加起来比较麻烦(后续也是可行的,但是会对commit记录有影响)
#### npm 安装

###### ===============
###### 第一步:npm init (成功后会生成package.json文件描述本项目的配置情况)
###### 第二步:npm install (微信小程序中安装npm包命令:npm install **** -S --production)
###### 安装成功后,会生成node_modules文件夹
###### 第三步:details->local settings->use npm modules
###### 第四步:工具->构建npm
#### ERROR:若出现npm package not found,考虑以下几个原因:
##### 1.此处并没有强制要求 node_modules 必须在小程序根目录下（即 project.config.js 中的 miniprogramRoot 字段），也可以存在于小程序根目录下的各个子目录中。但是不允许 node_modules 在小程序根目录外。
##### 2. 是否执行了npm init
##### 3. 是否勾选了设置中的使用使用npm模块
###### 至此 npm包安装成功,后续就可以使用

> 关于数组赋值
###### ![avatar](./miniprogram/images/1assign_value.png) 
###### 在使用setData({})进行赋值时,官方的样例是:
```
this.setData({
  'array[0].text':'change data'
})
```
###### 在利用setData({})进行赋值时,只能赋值一个静态值,于是上图的赋值可以改为下图:
###### ![avatar](./miniprogram/images/assign_value_1.png) 
###### 向数组中添加元素时,由于push方法是将新数组作为一个元素加入在数组中,而concat将新数组每个元素分别加入到数组中,于是可以通过concat解决数组的添加 
```
    // 给数组赋值
    let caseOne = [
    { a: 'hello', b: 'world', c: 1024, d: {} }, 
    { a: 'hello', b: 'world', c: 1024, d: {} }, 
    { a: 'hello', b: 'world', c: 1024, d: {} }
    ]
    this.setData({
      array:this.data.array.concat(caseOne)
    })
    console.log(this.data.array,this.data.array.length)
```
###### 或者:
```
    // 给数组赋值
    let caseOne = [
    { a: 'hello', b: 'world', c: 1024, d: {} }, 
    { a: 'hello', b: 'world', c: 1024, d: {} }, 
    { a: 'hello', b: 'world', c: 1024, d: {} }
    ]
    caseOne.map(item=>{
      this.data.array.push(item)
    })   
    this.setData({
      array:this.data.array
    })
    console.log(this.data.array,this.data.array.length)
```
###### 只要最后赋给setData({})时,是一个静态值就ok~~
###### ![avatar](./miniprogram/images/assign_value_2.png)


> watch监听器,监听父组件传递的值的变化
###### 若多个页面需要用到watch监听,则在app.js中写入监听器
```
onLaunch: function () {},
// 设置监听器
watch: function (ctx, obj) {
  Object.keys(obj).forEach(key => {
    this.observer(ctx.data, key, ctx.data[key], function (value) {
      obj[key].call(ctx, value)
    })
  })
},
// 监听属性，并执行监听函数
observer: function (data, key, val, fn) {
  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get: function () {
      return val
    },
    set: function (newVal) {
      if (newVal === val) return
      fn && fn(newVal)
      val = newVal
    },
  })
}
```
###### 在子组件中使用时,写入:
```
const app = getApp()
Page({
  data: {
    test: 0
  },
  onLoad: function () {
    // 调用监听器，监听数据变化
    app.watch(this, {
      test: function (newVal) {
        console.log(newVal)
      }
    })
  }
```
> 关于对象为空的判断
###### 1.使用JSON.stringify方法,将javascript的值转换成json字符串
```
 console.log(JSON.stringify(e)==='{}')
```
ps:toString()方法也是将数据转化为字符串,这里使用toString不能判断,对于空对象,toString()返回的是它的类型表示符"[object Object]"
###### ![avatar](./miniprogram/images/assign_value_3.png)
###### 2.ES6的新方法 Object.keys()方法(该方法会返回一个由一个给定对象的自身可枚举属性组成的数组)
```
console.log(Object.keys(j).length===0)
```
>微信小程序中父子组件之间传值问题
###### 1.父组件向子组件传值
```
<my-component name="{{name}}" age="{{age}}"></my-component>
```
###### 上例中,父组件在引用子组件时,向其传入name和age值,在子组件中properties里接收该值,通过this.properties.name获取  
在实际项目开发时,可同时搭配watch值,监听该传递值的变化,同时,传递的值发生变化时,子组件会重新渲染,实现数据的绑定
###### 2.子组件向父组件传值
```
parent wxml中
<my-component name="{{name}}" age="{{age}}" bind:bindchangeName="changeName"></my-component>
parent js中
changeName(event) {
  console.log(event.detail)

  // { name: '李四' }
}
```
###### 上例中,在父组件wxml和js中分别添加上述代码,js中的`event`即为传递给父组件的数据
> wx中hidden和wx:if的选择和区别
###### 在进行条件选择渲染时,`使用hidden,在初始渲染时,各模块和组件均会渲染,初始渲染较慢较重,但是在切换时,各组件模块不会销毁  
和重新渲染`;`在使用wx:if时,初始时为局部渲染,减少了初始渲染的消耗,在初始渲染时,速度快且较轻便,但是每次条件更变切换时,组件都会销毁和重新渲染,故条件切换时,渲染速度较慢`
###### 所以在使用时,根据需求改变使用,若较频繁切换条件选择,则使用hidden若条件切换情况较少,则可使用wx:if
###### ps:hidden只对块级元素有用
> 字符串为空格或者空的判断
###### 1.match方法,match(RegExp)参数必须为要匹配字符串的正则表达式对象,若该参数不是正则表达式对象,则先将其传递给RegExp
构造函数,将其转化为正则表达式的对象:
```
var re = new RegExp("ab+c");  // RegExp 构造函数创建了一个正则表达式对象，用于将文本与一个模式匹配,返回该文本的正则表达式模式
```
```
var test = "   \n   ";
//var test = "      ";
if(test.match(/^\s+$/)){
    console.log("all space or \\n")  // 空格 or 换行
}
if(test.match(/^[ ]+$/)){
    console.log("all space")  // 全部是空格
}
if(test.match(/^[ ]*$/)){
    console.log("all space or empty") //空格或者是什么都没有
}
if(test.match(/^\s*$/)){
    console.log("all space or \\n or empty") //换行或者什么都没有
}
```
