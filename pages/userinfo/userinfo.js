// pages/userinfo/userinfo.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    filePath: null, 
    input_course_code_teacher:"", //教师输入的课号
    input_course_code_student: "", // 学生输入的课号
    input_course_name_teacher:"" // 教师输入的“课程名”
  },
  // {{ class_info.class_id }}: {{ class_info.class_name }}


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    console.log(app)
    var this_rolename = app.globalData.userInfo.role;
    if (app.globalData.userInfo.role === 2) {
      this_rolename = "学生";
    } else if (app.globalData.userInfo.role == 1) {
      this_rolename = "教师";
    } else if (app.globalData.useInfo.role == 0) {
      this_rolename = "管理员"
    }
    var rand = Math.random()  // 随机数
    this.setData({ // 必须setdata，才能与前端绑定，不能直接等号赋值
      'username': app.globalData.userInfo.username,
      'nickname': app.globalData.userInfo.nickname,
      'role': app.globalData.userInfo.role,
      'role_name': this_rolename,
      'filePath': 'http://127.0.0.1:5000/' + app.globalData.userInfo['image0'] + '?random=' + rand,
      'hidden': app.globalData.userInfo.role==1, //显示那个按钮（'教师/学生'）
      'hiddenmodalput_teacher': true, // 教师弹窗是否显示('True'表示不显示)
      'hiddenmodalput_student': true, // 学生弹窗是否显示
      // 两弹窗刚开始都是“不显示”
    })
    wx.request({
      // url: app.globalData.DOMAIN + '/api/user/find_course_by_user/',
      url: 'http://127.0.0.1:5000/api/users/find_course_by_user/' + '?random=' + rand,
      success: res => {
        if (this.data.role === 2) { // 学生
          var lst = new Array();
          for (var i = 0; i < res.data.length; i++) {
            lst.push(res.data[i]['course'])
          }
          this.setData({
            'class_info_list': lst
          })
        } else if (this.data.role === 1) { // 教师
          this.setData({
            'class_info_list': res.data
          })
        }
      }
    })
  },

  onShow: function(options) {
    console.log("onshow", `http://127.0.0.1:5000/${app.globalData.userInfo['image0']}`);
    const path = `http://127.0.0.1:5000/${app.globalData.userInfo['image0']}`;
    var rand = Math.random()  // 随机数
    this.setData({
      filePath: 'http://127.0.0.1:5000/' + app.globalData.userInfo['image0'] + '?random=' + rand
    })
  },


  jump_class_info: function(e) {
    var course_id = e.target.dataset.id;
    if (this.data.role === 2) {
      wx.navigateTo({
        url: '/pages/classinfo_student/classinfo_student?course_id=' + course_id + '&nickname=' + this.data.nickname,
      })
    } else if (this.data.role === 1) {
      wx.navigateTo({
        url: '/pages/classinfo_teacher/classinfo_teacher?course_id=' + course_id,
      })
    }

  },
  jump: function(e) {
    wx.navigateTo({
      url: '/pages/choose_three_image/choose_three_image',
    })
  },


  //  ------------------- 操控弹窗（教师/学生）--------------------- 

  // userinfo界面按钮（决定是否显示弹窗）
  modalinput_teacher:function(e){ // 教师按钮（“添加课程”）
    this.setData({
      hiddenmodalput_teacher: !this.data.hiddenmodalput_teacher
    })
  },
  modalinput_student: function (e) { // 学生按钮（“加入课程”）
    this.setData({
      hiddenmodalput_student: !this.data.hiddenmodalput_student
    })
  },

  // 弹窗内按钮

  // 取消按钮  
  cancel: function () {
    this.setData({
      // 把输入框变量，全部晴空
      input_course_code_teacher: "", //教师输入的课号
      input_course_code_student: "", // 学生输入的课号
      input_course_name_teacher: "", // 教师输入的“课程名”

      //把两个弹窗，都隐藏
      hiddenmodalput_teacher: true, 
      hiddenmodalput_student: true

    });
  },

  // 确认按钮（教师）
  confirm_teacher: function (e) {
    wx.request({
      url: 'http://127.0.0.1:5000/api/course/add_course/',
      method: 'POST',
      data: {
        course_code: this.data.input_course_code_teacher,
        course_name: this.data.input_course_name_teacher
      },
    })
    this.cancel()
    this.onLoad()
  },

  // 确认按钮（学生）
  confirm_student: function (e) {
    wx.request({
      url: 'http://127.0.0.1:5000/api/course/register_course_student/',
      method: 'POST',
      data: {
        course_code: this.data.input_course_code_student,
      },
    })
    this.cancel()
    this.onLoad()
  },

  // 绑定弹窗内输入框
  bindChangeCourseName: function (e) { // 课程名输入框
    const {
      detail: {
        value
      }
    } = e;
    this.setData({
      input_course_name_teacher: value
    });
  },

  bindChangeCourseCodeTeacher: function (e) { //课程号输入框（教师）
    const {
      detail: {
        value
      }
    } = e;
    this.setData({
      input_course_code_teacher: value
    })
  },

  bindChangeCourseCodeStudent: function (e) { //课程号输入框（学生）
    const {
      detail: {
        value
      }
    } = e;
    this.setData({
      input_course_code_student: value
    })
  },

  
})