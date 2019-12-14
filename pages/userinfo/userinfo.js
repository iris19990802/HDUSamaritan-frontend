// pages/userinfo/userinfo.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    filePath: null,
    input_course_code_teacher: "", //教师输入的课号
    input_course_code_student: "", // 学生输入的课号
    input_course_name_teacher: "", // 教师输入的“课程名”
    'hiddenmodalput_teacher': true, // 教师弹窗是否显示('True'表示不显示)
    'hiddenmodalput_student': true, // 学生弹窗是否显示
  },
  // {{ class_info.class_id }}: {{ class_info.class_name }}


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

    var rand = Math.random()  // 随机数

    wx.request({
      url: app.globalData.DOMAIN + 'api/users/user_info/' + '?random=' + rand,
      success: res => {
        // -------------------  配置用户信息 -------------------
        var user_info = res.data.user_info
        // 绑定this_data
        var this_rolename = user_info.role;
        if (user_info.u_role === 2) {
          this_rolename = "学生";
        } else if (user_info.u_role == 1) {
          this_rolename = "教师";
        } else if (user_info.u_role == 0) {
          this_rolename = "管理员"
        }
        //console.log(res)
        this.setData({ // 必须setdata，才能与前端绑定，不能直接等号赋值
          'username': user_info.username,
          'nickname': user_info.u_nickname,
          'role': user_info.u_role,
          'role_name': this_rolename,
          'filePath': app.globalData.DOMAIN + user_info.u_image_0 + '?random=' + rand,
          'hidden': user_info.u_role == 1, //显示那个按钮（'教师/学生'）
          // 两弹窗刚开始都是“不显示”
        })


        // ----------------  配置课程信息  ---------------------
        var course_info = res.data.course_info;
        if (this.data.role === 2) { // 学生
          var lst = new Array();
          for (var i = 0; i < course_info.length; i++) {
            lst.push(course_info[i]['course'])
          }
          this.setData({
            'class_info_list': lst
          })
        } else if (this.data.role === 1) { // 教师
          this.setData({
            'class_info_list': course_info
          })
        }
      }
    })
  },

  onShow: function (options) {
    this.onLoad();
  },
  logout: function (e) {
    wx.request({
      url: app.globalData.DOMAIN + 'api/users/logout/',
    })
    wx.redirectTo({
      url: '/pages/index/index',
    })

  },

  jump_class_info: function (e) {
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
  jump: function (e) {
    wx.redirectTo({
      url: '/pages/choose_three_image/choose_three_image',
    })
  },


  //  ------------------- 操控弹窗（教师/学生）--------------------- 

  // userinfo界面按钮（决定是否显示弹窗）
  modalinput_teacher: function (e) { // 教师按钮（“添加课程”）
    this.setData({
      hiddenmodalput_teacher: !this.data.hiddenmodalput_teacher,
      input_course_code_teacher: "", //教师输入的课号
      input_course_code_student: "", // 学生输入的课号
      input_course_name_teacher: "", // 教师输入的“课程名”
    })
  },
  modalinput_student: function (e) { // 学生按钮（“加入课程”）
    this.setData({
      hiddenmodalput_student: !this.data.hiddenmodalput_student,
      input_course_code_teacher: "", //教师输入的课号
      input_course_code_student: "", // 学生输入的课号
      input_course_name_teacher: "", // 教师输入的“课程名”
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
    }, () => {
      this.setData({
        //把两个弹窗，都隐藏
        hiddenmodalput_teacher: true,
        hiddenmodalput_student: true
      })
    });
  },

  // 确认按钮（教师）
  confirm_teacher: function (e) {
    wx.request({
      url: app.globalData.DOMAIN + 'api/course/add_course/',
      method: 'POST',
      data: {
        course_code: this.data.input_course_code_teacher,
        course_name: this.data.input_course_name_teacher
      },
      success: res => {
        this.cancel()
        this.onLoad()
      }
    })

  },

  // 确认按钮（学生）
  confirm_student: function (e) {
    wx.request({
      url: app.globalData.DOMAIN + 'api/course/register_course_student/',
      method: 'POST',
      data: {
        course_code: this.data.input_course_code_student,
      },
      success: res => {
        if (res.data === "Course Not Exist"){
          wx.showModal({
            title: '提示',
            content: '课程不存在'
          })
        }else{
          this.cancel()
          this.onLoad()
        }
        //console.log(res.data)
      }
    })
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