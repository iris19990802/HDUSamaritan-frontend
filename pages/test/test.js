// pages/test/test.js
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
          tempFilePaths: res.tempFilePaths[0]
        })
        console.log(res.tempFilePaths)
        wx.setStorage({ key: "card", data: res.tempFilePaths[0] })
      }
    })
  },
  upload_file: function (res) {
    console.log("in upload")
    wx.uploadFile({
      //url: 'http://192.168.249.151:5000/uploader', //仅为示例，非真实的接口地址
      url: 'https://x.b1n.top:12350/uploader',
      filePath: this.data.tempFilePaths,
      name: 'file',
      formData: {
        'user': 'test'
      },
      success(res) {
        console.log(res)
        const data = res.data
      }
    })
  }

})