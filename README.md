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
###### 3.