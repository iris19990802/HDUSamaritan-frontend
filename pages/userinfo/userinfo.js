// pages/userinfo/userinfo.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
    // {{ class_info.class_id }}: {{ class_info.class_name }}


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var this_rolename = options.role;
    if (options.role === "2") {
      this_rolename = "学生";
    }
    else if (options.role == "1") {
      this_rolename = "教师";
    }
    else if (options.role == "0") {
      this_rolename = "管理员"
    }
    this.setData({  // 必须setdata，才能与前端绑定，不能直接等号赋值
      'username': options.username,
      'nickname': options.nickname,
      'role':options.role,
      'role_name':this_rolename
    })
    wx.request({
      // url: app.globalData.DOMAIN + '/api/user/find_course_by_user/',
      url: 'http://127.0.0.1:5000/api/users/find_course_by_user/',
      success: res=>{
        if(this.data.role === "2"){ // 学生
          var lst = new Array();
          for(var i=0;i<res.data.length;i++){
            lst.push(res.data[i]['course'])
          }
          this.setData({'class_info_list': lst})
        }
        else if(this.data.role === "1"){ // 教师
          this.setData({'class_info_list':res.data})
        }
      }
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
          userPhotoSrc: res.tempFilePaths[0]
        })
        console.log(res.tempFilePaths)
        wx.setStorage({ key: "user_photo", data: res.tempFilePaths[0] })
      }
    })
  },

  upload_file: function (res) {
    console.log("in upload")
    wx.uploadFile({
      url: "127.0.0.1:5000"+'/uploader', //仅为示例，非真实的接口地址
      filePath: this.data.userPhotoSrc,
      name: 'file',
      formData: {
        'user': 'test'
      },
      success(res) {
        const data = res.data
      }
    })
  },
  jump_class_info:function(e){
    var course_id = e.target.dataset.id;
    if(this.data.role === "2"){
      wx.navigateTo({
        url: '/pages/classinfo_student/classinfo_student?course_id=' + course_id + '&nickname=' + this.data.nickname,
      })
    }
    else if(this.data.role === "1"){
      wx.navigateTo({
        url: '/pages/classinfo_teacher/classinfo_teacher?course_id=' + course_id,
      })
    }
    
  }

})