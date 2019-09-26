// pages/classinfo_teacher/classinfo_teacher.js
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
    console.log(options)
    var this_course_id = options.course_id
    wx.request({
      url: 'http://127.0.0.1:5000/api/users/course_info_teacher/?course_id='+this_course_id,
      success:res=>{
        console.log(res.data)
        this.setData({
          'data_info': res.data,
          'course_info':res.data[0].course
        })
      }
    })
    console.log(this.data)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  jump_qiandao:function(){
    wx.navigateTo({
      url: '/pages/photo_taking/photo_taking?course_id=' + this.data.course_info.c_id+"&course_name="+this.data.course_info.c_name,
    })
  }
})