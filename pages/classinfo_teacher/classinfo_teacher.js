// pages/classinfo_teacher/classinfo_teacher.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLoad: function (options) {
    console.log(options)
    this.setData({
      'this_course_id': options.course_id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {

    wx.request({
      url: app.globalData.DOMAIN + 'api/users/course_info_teacher/?course_id='+this.data.this_course_id,
      success:res=>{
        // console.log(res.data)
        this.setData({
          'data_info': res.data.student,
          'course_info':res.data,
        })
      }
    })
    // console.log(this.data)

  },


  jump_qiandao:function(){
    wx.navigateTo({
      url: '/pages/photo_taking/photo_taking?course_id=' + this.data.course_info.c_id+"&course_name="+this.data.course_info.c_name,
    })
  },

  go_back:function() {
    url:'/pages/userinfo/userinfo'
  }
})