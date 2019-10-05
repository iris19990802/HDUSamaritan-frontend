// pages/choose_three_image/choose_three_image.js

const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:[0,0,0],
    userPhotoSrc:["","",""],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    console.log(app)
    var rand = Math.random()  // 随机数
    if (app.globalData.userInfo['image0']!=null){
      this.data.userPhotoSrc[0] = 'http://127.0.0.1:5000/' + app.globalData.userInfo['image0'] + '?random=' + rand
    }
    if (app.globalData.userInfo['image1'] != null){
      this.data.userPhotoSrc[1] = 'http://127.0.0.1:5000/' + app.globalData.userInfo['image1'] + '?random=' + rand
    }
    if (app.globalData.userInfo['image2'] != null){
      this.data.userPhotoSrc[2] = 'http://127.0.0.1:5000/' + app.globalData.userInfo['image2'] + '?random=' + rand
    }
    console.log("this.data.userPhotoSrc")
    console.log(this.data.userPhotoSrc)
    this.setData({
      userPhotoSrc: [...this.data.userPhotoSrc],
    })
    console.log(this.data)
  },
  choose_photo: function (e) {
    var this_button_id = parseInt(e.target.dataset['id'])
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        this.data.userPhotoSrc[this_button_id] = res.tempFilePaths[0]
        this.data.flag[this_button_id] = 1
          this.setData({
            userPhotoSrc: [...this.data.userPhotoSrc],
            flag:[...this.data.flag]
          })
      }
    })

  },

  upload_photo: function (e) {

    var this_button_id = parseInt(e.target.dataset['id'])

    if (this.data.flag[this_button_id] === 0){
      return ;
    }
    
    wx.uploadFile({
      url: "http://127.0.0.1:5000" + '/api/users/upload_user_photo/', //仅为示例，非真实的接口地址
      filePath: this.data.userPhotoSrc[this_button_id],
      name: 'file',
      formData: {
        'pos': e.target.dataset['id'],
       },
      success(res) {
        const data = JSON.parse(res.data)
        console.log(data)
        app.globalData.userInfo = {
          username: data.username,
          nickname: data.u_nickname,
          role: data.u_role,
          image0: data.u_image_0,
          image1: data.u_image_1,
          image2: data.u_image_2
        }

      }
    })
    console.log(this.data.userPhotoSrc)
  },
  back_button:function(e){
    wx.navigateBack({
      
    })
  }
})