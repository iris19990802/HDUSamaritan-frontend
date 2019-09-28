//index.js
//获取应用实例
const app = getApp()

Page({
  data: {},

  bindChangeUsername: function(e) {
    const {
      detail: {
        value
      }
    } = e;
    this.setData({
      username: value
    });
  },

  bindChangePassword: function(e) {
    const {
      detail: {
        value
      }
    } = e;
    this.setData({
      password: value
    })
  },

  login: function(e) {

    wx.request({
      url: app.globalData.DOMAIN + '/api/users/login/', //仅为示例，并非真实的接口地址
      data: {
        req_username: this.data.username,
        req_password: this.data.password
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        app.globalData.userInfo = {
          username: res.data.username,
          nickname: res.data.u_nickname,
          role: res.data.u_role,
          image0: res.data.u_image_0,
          image1: res.data.u_image_1,
          image2: res.data.u_image_2
        }
        if (res.statusCode == 200) {
          if (res.data.u_role === 1 || res.data.u_role === 2) {
            wx.redirectTo({
              url: '/pages/userinfo/userinfo',
            })
          } else {
            wx.redirectTo({
              url: ';'
            })
          }
        }
      }
    })
    // app.globalData.userInfo = {
    //   username: this.data.username,
    // },
    // wx.redirectTo({
    //   url: `/pages/userinfo/userinfo`,
    // });
  }
})