const date = new Date();
let start = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
let leave_start = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + 1);
let end = (date.getFullYear() + 1) + '-' + (date.getMonth() + 1) + '-' + date.getDate();

Component({

  properties: {

  },

  data: {
    // 入住时间
    enter_start: start,
    enter_end: end,
    enter_value: start,
    enter_showDate: '',
    // 离店时间
    leave_start: leave_start,
    leave_end: end,
    leave_value: leave_start,
    leave_showDate: '',
    //住多少晚
    duration:'1'
  },

  methods: {
    bindDateChange_enter(ev) {
      this.setData({
        enter_value: ev.detail.value
      });
    },
    bindDateChange_leave(ev){
      this.setData({
        leave_value: ev.detail.value
      });
    },
    formatShowDate() {
      const str1 = this.data.enter_value.split('-');
      const str2 = str1[1] + '月' + str1[2] + '日';
      this.setData({
        enter_showDate: str2
      });
    },
    formatShowDate_leave() {
      const str1 = this.data.leave_value.split('-');
      const str2 = str1[1] + '月' + str1[2] + '日';
      this.setData({
        leave_showDate: str2
      });
    },
    // 计算住多少晚
    calcDuration(){
      const start = this.data.enter_value.split('-')[2];
      const end = this.data.leave_value.split('-')[2];
      const dur = end - start;
      this.setData({duration:dur});
      const duration = this.data.enter_value;
    }
  },
  lifetimes: {
    attached: function () {
      this.formatShowDate();
      this.formatShowDate_leave();
    },
  },
  observers: {
    'enter_value': function () {
      this.formatShowDate();
      this.calcDuration();
    },
    'leave_value':function(){
      this.formatShowDate_leave();
      this.calcDuration();
    }
  }
})