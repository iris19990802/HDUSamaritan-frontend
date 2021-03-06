// pages/choose_three_image/choose_three_image.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    kind: ['正面照', '左侧15度', '右侧15度'],
    next: ['下一步', '下一步', '提交'],
    cnt: 0,
    disabled: false,
    choosingFile: false,
    userPhotoSrc: ["", "", ""],
  },

  onLoad: function() {
    this.setData({
      cnt: 0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    var rand = Math.random() // 随机数
    if (this.data.choosingFile) {
      return;
    }
    wx.request({
      url: app.globalData.DOMAIN + 'api/users/user_info/' + '?random=' + rand,
      success: res => {
        // -------------------  配置用户信息 -------------------
        var user_info = res.data.user_info
        if (user_info.u_image_0 != null) {
          this.data.userPhotoSrc[0] = app.globalData.DOMAIN + user_info.u_image_0 + '?random=' + rand
        }
        if (user_info.u_image_1 != null) {
          this.data.userPhotoSrc[1] = app.globalData.DOMAIN + user_info.u_image_1 + '?random=' + rand
        }
        if (user_info.u_image_2 != null) {
          this.data.userPhotoSrc[2] = app.globalData.DOMAIN + user_info.u_image_2 + '?random=' + rand
        }
        this.setData({
          userPhotoSrc: [...this.data.userPhotoSrc],
        }, () => console.log(""));
      }
    })
  },
  choose_photo: function(e) {
    var this_button_id = this.data.cnt;
    this.setData({
      choosingFile: true,
    });
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        this.data.userPhotoSrc[this_button_id] = res.tempFilePaths[0]
        this.setData({
          userPhotoSrc: [...this.data.userPhotoSrc],
          choosingFile: false,
        })
      }
    })

  },

  upload_photo: function(e) {

    var this_button_id = parseInt(e.target.dataset['id'])
    this.setData({
      disabled: true
    })
    //console.log(this.data.userPhotoSrc[this.data.cnt].indexOf('http'));
    // 如果没选择照片或者照片没变，那么就不上传图片
    //console.log(this.data.userPhotoSrc[this.data.cnt]);
    if (!this.data.userPhotoSrc[this.data.cnt] ||
      this.data.userPhotoSrc[this.data.cnt].indexOf('static') !== -1) {
      this.setData({
        cnt: this.data.cnt + 1
      })
      if (this.data.cnt === 3) {
        wx.redirectTo({
          url: '/pages/userinfo/userinfo',
        })
      } else {
        return new Promise((s, j) => s());
      }
    }
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: app.globalData.DOMAIN + 'api/users/upload_user_photo/',
        filePath: this.data.userPhotoSrc[this.data.cnt],
        name: 'file',
        formData: {
          'pos': this.data.cnt,
        },
        success: (res) => {
          console.log(res)
          if (res.statusCode != 200) {
            wx.showModal({
              title: '提示',
              content: '啊哦，页面跑丢了，请稍后再试',
              showCancel: false
            })
            resolve();
          } 
          else {
            const data = JSON.parse(res.data);
            //console.log(data);

            if (data.requested === 1) {
              if (data.status === 0 || data.status === 1) {
                this.setData({
                  cnt: this.data.cnt + 1,
                })
                //console.log(this.data.cnt);
                if (this.data.cnt === 3) {
                  wx.redirectTo({
                    url: '/pages/userinfo/userinfo',
                  })
                } else {
                  wx.showModal({
                    title: '提示',
                    content: '添加成功',
                    showCancel: false
                  })
                }
              } else if (data.status === 2) {
                // this.setData({
                //   cnt: 0,
                // })
                wx.showModal({
                  title: '提示',
                  content: '对不起，照片质量低，请重新添加',
                  showCancel: false
                })
              }
            }
            resolve();
          }
        },
        fail: (res) => {
          console.log(res);
          reject();
        }
      })
    });
  },

  next_step_button: function(e) {

    this.upload_photo(e).then(() => {
      this.setData({
        disabled: false //disabled为false，说明可以按“下一步”按钮
      })

    }).catch(() => {
      wx.redirectTo({
        url: '/pages/userinfo/userinfo',
      })
    });
  }
})