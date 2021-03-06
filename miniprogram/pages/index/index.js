//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    array : []
  },
  onLoad: function() {
    //基本数据类型
    let a = null, b = undefined, c = '', d = [], e = { p: 'hello' }, f = [{ x: 'hello', y: false, z: 123 }, { x: 'hello', y: false, z: 123}],g,h=[{}],k=function(){
      return 
    },j={}
    // console.log(a,b,c,d,e,f,g)
    // console.log(typeof (a), typeof (b), typeof (c), typeof (d), typeof (e), typeof (f), typeof (g))
    // 判断一个对象是否为空
    // console.log(Object.keys(j).length===0)
    // 给数组赋值
    // let caseOne = [
    // { a: 'hello', b: 'world', c: 1024, d: {} }, 
    // { a: 'hello', b: 'world', c: 1024, d: {} }, 
    // { a: 'hello', b: 'world', c: 1024, d: {} }
    // ]
    // caseOne.map(item=>{
    //   this.data.array.push(item)
    // })   
    // this.setData({
    //   array:this.data.array
    // })
    // let x="array[1].c"
    // this.setData({
    //   [x]:false
    // })
    // console.log(this.data.array,this.data.array.length)
    // 字符串匹配
    // 1.match
    // var test = "   \n   ";
    // //var test = "      ";
    // if (test.match(/^\s+$/)) {
    //   console.log("all space or \\n")
    // }
    // if (test.match(/^[ ]+$/)) {
    //   console.log("all space")
    // }
    // if (test.match(/^[ ]*$/)) {
    //   console.log("all space or empty")
    // }
    // if (test.match(/^\s*$/)) {
    //   console.log("all space or \\n or empty")
    // }
    // wx小程序的交互提示框
    // wx.showToast({
    //   title: '成功',
    //   icon: 'success',
    //   duration: 2000
    // })
    // wx.showActionSheet({
    //   itemList: ['A', 'B', 'C'],
    //   success(res) {
    //     console.log(res.tapIndex)
    //   },
    //   fail(res) {
    //     console.log(res.errMsg)
    //   }
    // })
    // == 和=== 的判断
    // a=false
    // console.log('a==""',a=='','a===""',a==='','a!==null')
    // 关于数组为空的判断
    // let main=[]
    // console.log('dasdasdas', JSON.stringify(main)=='[]')
    // console.log('h length',JSON.stringify(d),d.length,Array.isArray(d),Object.prototype.toString.call(d))
    //1.  array.length>0
    //2. JSON.stringify(array)==='[]'
    //3. ES5的方法 先判断该变量是否为数组+再判断该数组是否为空:Array.isArray(array) && array.length===0
    //4. 若ES5的方法不支持,可以使用Object.prototype.tostring.call(array)==='[object Array]' && array.length===0

    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
   a(e){
    for(var i in e){
  return true
}
return false
},
  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
