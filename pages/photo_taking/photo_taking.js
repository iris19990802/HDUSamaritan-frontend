// pages/photo_taking/photo_taking.js
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
    this.setData({
      'course_id': options.course_id,
      'course_name': options.course_name
    })
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

  choose_file: function () {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有

      success: (res) => {
        this.setData({
          signPhotoSrc: res.tempFilePaths[0]
        })
        console.log(res.tempFilePaths)
        wx.setStorage({ key: "user_photo", data: res.tempFilePaths[0] })
      }
    })
  },

  upload_file: function (res) {
    console.log("in upload")
    wx.uploadFile({
      //url: 'http://172.20.10.3:5000/uploader', //仅为示例，非真实的接口地址
      url: 'http://127.0.0.1:5000/api/attendance/sign_quest/',
      filePath: this.data.signPhotoSrc,
      name: 'file',
      formData: {
        'course_id': this.data.course_id
      },
      success:res=>{
        console.log("res")
        console.log(res.data)
        this.setData({
          sign_result_info:res.data
        })
      }
    })
    console.log("this_data")
    console.log(this.data)
  },

  jump_to_info:function(e){
    wx.navigateTo({
      url: '/pages/sign_result/sign_result?course_id=' + this.data.course_id + '&course_name=' + this.data.course_name+'&sign_result_info=' + this.data.sign_result_info,
    })
  }
})