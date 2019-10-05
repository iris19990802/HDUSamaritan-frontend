//show.js   
//获取应用实例    
var app = getApp()
Page({
  data: {
    hiddenmodalput: true,
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框  
  },
  //点击按钮弹窗指定的hiddenmodalput弹出框  
  modalinput: function() {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮  
  cancel: function() {
    this.setData({
      course_code:"",
      course_name:"",
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function(e) {
    wx.request({
      url: '',
      data:{
        course_code: this.data.course_code,
        course_name: this.data.course_name
      }
    })
    this.setData({
      course_code: "",
      course_name: "",
      hiddenmodalput: true
    })
  },

  // 绑定输入框
  bindChangeCourseName: function(e) {
    const {
      detail: {
        value
      }
    } = e;
    this.setData({
      course_name: value
    });
  },

  bindChangeCourseCode: function(e) {
    const {
      detail: {
        value
      }
    } = e;
    this.setData({
    course_code: value
    })
  },

})