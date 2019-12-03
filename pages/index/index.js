//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 把输入框变量，全部清空
    add_username: "", //新用户名
    add_nickname: "", //新用户昵称
    add_password: "", //新用户密码

    //隐藏弹窗
    hiddenmodal: true,

    'role_items': [{
      role_name: '教师',
      role_value: 1
    }, {
      role_name: '学生',
      role_value: 2
    }]
  },

  onLoad: function () {
    wx.request({
      url: app.globalData.DOMAIN + 'api/users/user_info/', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var userinfo = res.data.user_info
        if (res.statusCode == 200) {
          if (userinfo.u_role === 1 || userinfo.u_role === 2) {
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
  },

  onShow: function (e) {
    this.cancel
  },

  bindChangeUsername: function (e) {
    const {
      detail: {
        value
      }
    } = e;
    this.setData({
      username: value
    });
  },

  bindChangePassword: function (e) {
    const {
      detail: {
        value
      }
    } = e;
    this.setData({
      password: value
    })
  },

  login: function (e) {
    wx.request({
      url: app.globalData.DOMAIN + 'api/users/login/', //仅为示例，并非真实的接口地址
      data: {
        req_username: this.data.username,
        req_password: this.data.password
        //req_username:'S17051201',
        //req_password:'iris1999'
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res)=> {
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
        }else{
          wx.showModal({
            title: '提示',
            content: '登陆失败，请检查用户名与密码',
            showCancel:false
          })
          this.setData({
            password: ""
          })
        }
      }
    })
  },

  //绑在按钮上，负责显示弹窗
  create_user: function (e) {
    this.setData({
      hiddenmodal: false
    })
  },
  // 弹窗内按钮

  // 取消按钮  
  cancel: function () {
    this.setData({
      // 把输入框变量，全部清空
      add_username: "", //新用户名
      add_nickname: "", //新用户昵称
      add_password: "", //新用户密码

      //隐藏弹窗
      hiddenmodal: true
    })
  },

  // 确认按钮
  confirm_add_user: function (e) {
    wx.request({
      url: app.globalData.DOMAIN + 'api/users/add_user/',
      method: 'POST',
      data: {
        username: this.data.add_username,
        nickname: this.data.add_nickname,
        password: this.data.add_password,
        role: this.data.add_role
      },
      success: res => {
        wx.showModal({
          title: '',
          content: '注册成功，请继续添加照片信息',
          showCancel: false,//是否显示取消按钮
          success(res) {
            if (res.confirm) {//用户点击确定后，跳转，继续添加照片
              wx.redirectTo({
                url: '/pages/choose_three_image/choose_three_image',
              })
            }

          }
        })
      }
    })
  },

  //绑定弹窗内输入框

  bindChangeUserName_regis: function (e) { // 用户名输入框
    const {
      detail: {
        value
      }
    } = e;
    this.setData({
      add_username: value
    });
  },

  bindChangePassword_regis: function (e) { //密码输入框
    const {
      detail: {
        value
      }
    } = e;
    this.setData({
      add_password: value
    });
  },

  bindChangeNickname: function (e) { //昵称输入框
    const {
      detail: {
        value
      }
    } = e;
    this.setData({
      add_nickname: value
    });
  },

  // 绑定单选按钮组（radio-group）
  radioChange: function (e) {
    console.log(e)
    this.setData({
      add_role: parseInt(e.detail.value)
    })
  }


})