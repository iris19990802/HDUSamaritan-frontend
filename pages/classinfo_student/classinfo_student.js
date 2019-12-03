// pages/classinfo_student/classinfo_student.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var this_course_id = options.course_id
    this.setData({ 
      'this_user' : options.nickname,
      'this_course_id': options.course_id
    })
    wx.request({
      url: app.globalData.DOMAIN + 'api/users/course_info_student/?course_id=' + this_course_id,
      success: res => {
        this.setData({
          'course_info': res.data
        })
      }
    })
    console.log(this.data)
  },

  quit_course:function(){
    wx.request({
      url: app.globalData.DOMAIN + 'api/users/quit_course_student/?course_id=' + this.data.this_course_id,
      success: res => {
        this.go_back()
      }
    })
  },
  go_back:function(){
    wx.navigateBack({ changed: true })
  }
})