// pages/choose_three_image/choose_three_image.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    kind:['正面照','左侧面照','右侧面照'],
    next:['下一步','下一步','提交'],
    cnt:0,
    disabled:false,
    userPhotoSrc: ["", "", ""],
  },

  onLoad:function(){
    this.setData({
      cnt:0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var rand = Math.random()  // 随机数
    wx.request({
      url: app.globalData.DOMAIN + 'api/users/user_info/' + '?random=' + rand,
      success: res => {
        // -------------------  配置用户信息 -------------------
        var user_info = res.data.user_info
        if (user_info.u_image_0 != null) {
          this.data.userPhotoSrc[0] = app.globalData.DOMAIN + user_info.u_image_0 + '?random=' + rand
        }
        if (user_info.u_image_1 != null) {
          this.data.userPhotoSrc[1] = app.globalData.DOMAIN + user_info.u_image_1 + '?random=' + rand
        }
        if (user_info.u_image_2 != null) {
          this.data.userPhotoSrc[2] = app.globalData.DOMAIN + user_info.u_image_2 + '?random=' + rand
        }
        console.log("this.data.userPhotoSrc")
        console.log(this.data.userPhotoSrc)
        this.setData({
          userPhotoSrc: [...this.data.userPhotoSrc],
        }, () => console.log(this.data));
      }
    })
  },
  choose_photo: function (e) {
    var this_button_id = this.data.cnt;
    
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        this.data.userPhotoSrc[this_button_id] = res.tempFilePaths[0]
        this.setData({
          userPhotoSrc: [...this.data.userPhotoSrc],
        })
      }
    })

  },

  upload_photo: function (e) {

    var this_button_id = parseInt(e.target.dataset['id'])
    this.setData({
      disabled: true
    })
    wx.uploadFile({
      url: app.globalData.DOMAIN + 'api/users/upload_user_photo/', //仅为示例，非真实的接口地址
      filePath: this.data.userPhotoSrc[this.data.cnt],
      name: 'file',
      formData: {
        'pos': this.data.cnt,
      },
      success: (res) => {
        const data = JSON.parse(res.data);
        console.log(data);
      }
    })
    console.log(this.data.userPhotoSrc)
  },

  func_button: function(e){
    this.upload_photo(e);
    if(this.data.cnt == 2){
      wx.redirectTo({
        url: '/pages/userinfo/userinfo',
      })
    }else{
      this.setData({
        cnt: this.data.cnt + 1,
        disabled: false //disabled为false，说明可以按“下一步”按钮
      })
    }
    
  }
})