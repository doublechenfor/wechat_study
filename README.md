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


