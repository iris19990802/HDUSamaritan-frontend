// pages/sign_result/sign_result.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ans:[]
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
    })

    var all_cnt = this.data.student_list.length
    var abcense_cnt = 0
    for (var i = 0; i < all_cnt;i++){
      this.data.ans.push(this.data.student_list[i]['abcense'])
      if (this.data.student_list[i]['abcense'] == 0){
        abcense_cnt = abcense_cnt+1;
      }
      this.setData({
        ans: [...this.data.ans]
      })
    }

    this.setData({
      'all_cnt': all_cnt,
      'should_show_up': all_cnt - abcense_cnt,
      'abcense_cnt': abcense_cnt,
    })
    console.log(this.data)
  },


  

  checkboxChange: function (e) {
    var checked = e.detail.value.sort()
    console.log(checked)
    for(var i=0;i<this.data.ans.length;i++){
      this.data.student_list[i].abcense = 0
    }
    for(var i=0;i<checked.length;i++){
      this.data.student_list[checked[i]].abcense = 1
    }
    this.setData({
      student_list: [...this.data.student_list]
    })
    
  },

  confirm_attendance: function (e) {
    wx.request({
      url: app.globalData.DOMAIN + 'api/attendance/confirm_sign/',
      method: 'POST',
      data: {
        course_id: this.data.course_id,
        user_abcense: this.data.student_list
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res);
      }
    })
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