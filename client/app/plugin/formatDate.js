function addZero(num, len, str, location) {
  if (len === void 0) { len = 2; }
  if (str === void 0) { str = "0"; }
  if (location === void 0) { location = "before"; }
  //传入位数,自动补零
  len = len - num.toString().length;
  var tmp = "";
  for (var i = 0; i < len; i++) {
      tmp += location === "before" ? str + num : num + str;
  }
  return tmp || num + "";
}
/**
 * 格式化时间戳
 * @param time 时间戳
 * @param type 返回格式：
 * Y-M-D H-M-S：2020年10月24日 12时10分24秒
 * y-m-d h-m-s: 2020-10-24 12:10:24
 * Y-M-D：2020年10月24日
 * y-m-d：2020-10-24
 * H-M-S：12时10分24秒
 * h-m-s：12:10:24
 * Y-M-D H-M：2020年10月24日 12时10分
 * y-m-d h-m：2020-10-24 12:10
 * M-D：10月24日
 * m-d：10-24
 *@example formatDate('Y-M-D H-M-S') => 2020年10月24日 12时10分24秒
 */
export default function formatDate(type, time) { 
  if (time === void 0) { time = Date.now(); }
  var date = new Date(time);
  var year = date.getFullYear();
  var month = addZero(date.getMonth() + 1);
  var day = addZero(date.getDate());
  var hour = addZero(date.getHours());
  var minute = addZero(date.getMinutes());
  var second = addZero(date.getSeconds());
  switch (type) {
      case "H-M-S":
          return hour + "时" + minute + "分" + second + "秒";
      case "h-m-s":
          return hour + ":" + minute + ":" + second + "秒";
      case "M-D":
          return month + "月" + day + "日";
      case "m-d":
          return month + "-" + day ;
      case "Y-M-D":
          return year + "年" + month + "月" + day + "日";
      case "y-m-d":
          return year + "-" + month + "-" + day;
      case "Y-M-D H-M":
          return (year + "年" + month + "月" + day + "日 " + hour + "时" + minute + "分");
      case "y-m-d h-m":
          return year + "-" + month + "-" + day + " " + hour + ":" + minute;
      case "Y-M-D H-M-S":
          return (year +
              "年" +
              month +
              "月" +
              day +
              "日 " +
              hour +
              "时" +
              minute +
              "分" +
              second +
              "秒");
      case "y-m-d h-m-s":
          return (year +
              "-" +
              month +
              "-" +
              day +
              " " +
              hour +
              ":" +
              minute +
              ":" +
              second);
      default:
          return "";
  }
}
