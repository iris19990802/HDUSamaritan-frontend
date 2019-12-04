// pages/photo_taking/photo_taking.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      'flag':false,
      'course_id': options.course_id,
      'course_name': options.course_name
    })
  },



  choose_file: function () {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有

      success: (res) => {
        this.setData({
          signPhotoSrc: res.tempFilePaths[0],
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
      url: app.globalData.DOMAIN + 'api/attendance/sign_quest/',
      filePath: this.data.signPhotoSrc,
      name: 'file',
      formData: {
        'course_id': this.data.course_id
      },
      success:res=>{
        console.log("res")
        console.log(res.data)
        var rand = Math.random()  // 随机数
        var tmp_data = JSON.parse(res.data)
        console.log(tmp_data)
        this.setData({
          sign_result_info: res.data,
          result_photo_src: app.globalData.DOMAIN + tmp_data['output_photo_src'] + '?random=' + rand,
          flag:true
        })
      }
    })
    console.log("this_data")
    console.log(this.data)
  },

  jump_to_info:function(e){
    wx.redirectTo({
      url: '/pages/sign_result/sign_result?course_id=' + this.data.course_id + '&course_name=' + this.data.course_name+'&sign_result_info=' + this.data.sign_result_info,
    })
  }
})