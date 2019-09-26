// pages/sign_result/sign_result.js
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
    options.sign_result_info = JSON.parse(options.sign_result_info)
    this.setData({
      course_id:options.course_id,
      course_name:options.course_name,
      student_list:options.sign_result_info.student_sign_list,
      dirc:['否','是']
    })

    var all_cnt = this.data.student_list.length
    var abcense_cnt = 0
    for (var i = 0; i < all_cnt;i++){
      if (this.data.student_list[i]['abcense'] == 0){
        abcense_cnt = abcense_cnt+1;
      }
    }
    this.setData({
      'all_cnt': all_cnt,
      'should_show_up': all_cnt - abcense_cnt,
      'abcense_cnt': abcense_cnt,
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
  

  checkboxChange: function (e) {
    var checked = e.detail.value
    checked = checked.sort()
    console.log(checked)
    var artificial_checked = [];
    for (var i = 0; i < this.data.all_cnt;i++){
      if (checked.indexOf(String(i)) === -1){ // 列表中没有
        artificial_checked.push(0);
        //this.data.student_list[i]['abcense'] = 0;
      }
      else{
        artificial_checked.push(1);
      }
    }
    this.setData({artificial_checked})
    console.log(this.data)

  },

  confirm_attendance: function (e) {
    for (var i = 0; i < this.data.all_cnt; i++) {
      if (this.data.student_list[i]['abcense'] == 0 && this.data.artificial_checked[i] == 1) {
        this.data.student_list[i]['abcense'] = 1
      }
      else{
        this.data.student_list[i]['abcense'] = 0
      }
    }
    console.log(this.data)
    wx.showModal({
      title: '提示',
      content: '签到成功',
      success: function (res) {
        if (res.confirm) {
          console.log('确认')
          wx.navigateBack({ changed: true })
        } else {
          console.log('返回')
          wx.navigateBack({ changed: true })
        }
      },
  })
  },

  go_back:function (e) {
      wx.navigateBack({ changed: true })
    }
})