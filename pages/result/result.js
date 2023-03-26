// pages/result/result.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentDate: '',
    age1: '',
    age2: '',
    belong: '',
    constellation: '',
    survivalDays: '',
    nextDesc: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    const _this = this
    const eventChannel = this.getOpenerEventChannel()
    // eventChannel.emit('acceptDataFromOpenedPage', {data: 'test'});
    // eventChannel.emit('someEvent', {data: 'test'});
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      const {
        time,
        currentDate: date
      } = data
      _this.setData({
        currentDate: date,
        age1: _this.setAge1(date), // 周岁
        age2: _this.setAge2(date), // 虚岁
        belong: _this.setBelong(date), // 生肖
        constellation: _this.setConstellation(date), // 星座
        survivalDays: _this.setSurvivalDays(time), // 生存天数
        nextDesc: _this.setNextDesc(date),
      })
    })
  },
  // 周岁 date: 1996-10-23
  setAge1(val) {
    let age = ''
    let currentYear = new Date().getFullYear() //当前的年份
    let calculationYear = new Date(val).getFullYear() //计算的年份
    const wholeTime = currentYear + val.substring(4) //周岁时间
    const calculationAge = currentYear - calculationYear //按照年份计算的年龄
    //判断是否过了生日
    if (new Date().getTime() > new Date(wholeTime).getTime()) {
      age = calculationAge
    } else {
      age = calculationAge - 1
    }
    if (age < 0) {
      age = 0
    }
    return age
  },
  // 虚岁
  setAge2(val) {
    let currentYear = new Date().getFullYear() //当前的年份
    let calculationYear = new Date(val).getFullYear() //计算的年份
    return currentYear - calculationYear + 1 //按照年份计算的年龄
  },
  // 生肖
  setBelong(val) {
    const myYear = parseInt(val.split('-')[0])
    var num = (myYear - 1912) % 12; //设定1912为初始年份 
    // var belongs = ["子鼠", "丑牛", "寅虎", "卯兔", "辰龙", "巳蛇", "午马", "未羊", "申猴", "酉鸡", "戌狗", "亥猪"];
    var belongs = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
    return belongs[num]
  },
  // 星座
  setConstellation(date) {
    const month = app.$dayjs(date).month() + 1
    const day = app.$dayjs(date).date()
    var s = "魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
    var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
    return s.substr(month * 2 - (day < arr[month - 1] ? 2 : 0), 2);
  },
  // 到下次生日还有多少天
  getDaysToBirthday(month, day) {
    var nowTime = new Date();
    var thisYear = nowTime.getFullYear();
    //今年的生日
    var birthday = new Date(thisYear, month - 1, day);
    //今年生日已过，则计算距离明年生日的天数
    if (birthday < nowTime) {
      birthday.setFullYear(nowTime.getFullYear() + 1);
    }
    console.log(birthday);
    var timeDec = birthday - nowTime;
    var days = timeDec / (24 * 60 * 60 * 1000);
    const transWeeks = ['日', '一', '二', '三', '四', '五', '六']
    const week = transWeeks[app.$dayjs(birthday).day()]
    return {
      days: Math.ceil(days),
      week: week
    };
  },
  //根据年份计算二月天数
  getSpecialDays(y) {
    if (y % 400 == 0 || (y % 4 == 0 && y % 100 != 0)) return 29;
    return 28;
  },
  // 存活天数
  setSurvivalDays(startTime) {
    const nowTime = new Date().getTime()
    return Math.floor((nowTime - startTime) / 24 / 60 / 60 / 1000)
  },
  // 下次生日
  setNextDesc(val) {

    const month = app.$dayjs(val).month() + 1
    const day = app.$dayjs(val).date()
    const {
      days,
      week
    } = this.getDaysToBirthday(month, day)
    return `还有${days}天，那天是星期${week}`
  },
  // 返回首页（上一页）
  backHome() {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})