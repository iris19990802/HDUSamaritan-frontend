// pages/userinfo/userinfo.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    filePath: null
  },
  // {{ class_info.class_id }}: {{ class_info.class_name }}


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    console.log(app)
    var this_rolename = app.globalData.userInfo.role;
    if (app.globalData.userInfo.role === 2) {
      this_rolename = "学生";
    } else if (app.globalData.userInfo.role == 1) {
      this_rolename = "教师";
    } else if (app.globalData.useInfo.role == 0) {
      this_rolename = "管理员"
    }
    var rand = Math.random()  // 随机数
    this.setData({ // 必须setdata，才能与前端绑定，不能直接等号赋值
      'username': app.globalData.userInfo.username,
      'nickname': app.globalData.userInfo.nickname,
      'role': app.globalData.userInfo.role,
      'role_name': this_rolename,
      'filePath': 'http://127.0.0.1:5000/' + app.globalData.userInfo['image0'] + '?random=' + rand
    })
    wx.request({
      // url: app.globalData.DOMAIN + '/api/user/find_course_by_user/',
      url: 'http://127.0.0.1:5000/api/users/find_course_by_user/',
      success: res => {
        if (this.data.role === 2) { // 学生
          var lst = new Array();
          for (var i = 0; i < res.data.length; i++) {
            lst.push(res.data[i]['course'])
          }
          this.setData({
            'class_info_list': lst
          })
        } else if (this.data.role === 1) { // 教师
          this.setData({
            'class_info_list': res.data
          })
        }
      }
    })
  },

  onShow: function(options) {
    console.log("onshow", `http://127.0.0.1:5000/${app.globalData.userInfo['image0']}`);
    const path = `http://127.0.0.1:5000/${app.globalData.userInfo['image0']}`;
    var rand = Math.random()  // 随机数
    this.setData({
      filePath: 'http://127.0.0.1:5000/' + app.globalData.userInfo['image0'] + '?random=' + rand
    })
  },


  jump_class_info: function(e) {
    var course_id = e.target.dataset.id;
    if (this.data.role === 2) {
      wx.navigateTo({
        url: '/pages/classinfo_student/classinfo_student?course_id=' + course_id + '&nickname=' + this.data.nickname,
      })
    } else if (this.data.role === 1) {
      wx.navigateTo({
        url: '/pages/classinfo_teacher/classinfo_teacher?course_id=' + course_id,
      })
    }

  },
  jump: function(e) {
    wx.navigateTo({
      url: '/pages/choose_three_image/choose_three_image',
    })
  }

})