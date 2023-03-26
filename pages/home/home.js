const app = getApp();
console.log(app);

Page({
  // options: {
  //   styleIsolation: 'shared',
  // },
  data: {
    styleIsolation: 'shared',
    showDatePanel: false,
    isDaytime: true,
    currentDateText: app.$dayjs(new Date()).format('YYYY-MM-DD'),
    currentDate: new Date().getTime(),
    minDate: new Date(1912).getTime(),
    maxDate: new Date().getTime(),
    
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
  },
  confirmDate(event) {
    this.closeDate()
    this.setData({
      currentDate: event.detail,
    });
    this.setData({
      currentDateText: app.$dayjs(event.detail).format('YYYY-MM-DD'),
    });
  },
  cancelDate(event) {
    this.closeDate()
  },
  showResult(event) {
    const _this = this
    wx.navigateTo({
      url: `../result/result`,
      // events: {
      // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      // acceptDataFromOpenedPage: function(data) {
      //   console.log(data)
      // },
      // someEvent: function(data) {
      //   console.log(data)
      // }
      // },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          currentDate: _this.data.currentDateText,
          time: _this.data.currentDate
        })
      }
    })
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
  // 弹出日期选择框
  showDate: function () {
    console.log('------');
    this.setData({
      showDatePanel: true
    })
  },
  // 关闭日期选择框
  closeDate: function () {
    this.setData({
      showDatePanel: false
    })
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

  }
})

// Component({
//   options: {
//     styleIsolation: 'shared',
//   },
// });