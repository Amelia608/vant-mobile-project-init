import CryptoJS from 'crypto-js'
export default {
  /**--------------获取cookies--------------**/
  getCookie(name) {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return (arr[2]);
    else
      return null;
  },

  /**--------------设置cookies--------------**/
  setCookie(c_name, value, expiredays) {
    let exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + value + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
  },

  /**--------------删除cookies--------------**/
  delCookie(name) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  },
  /**
   * 设置localStorage
   */
  setStorage(name, content) {
    if (!name) return false
    if (typeof content !== 'string') {
        content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
  },
  getLocalStorage(key,isObj=true){
    let value = localStorage.getItem(key);
    if(isObj){
        value = JSON.parse(value);
    }
    return value;
  },
  delLocalStorage(key){
    localStorage.removeItem(key);
  },

  /**--------------sessionStorage获取对象--------------**/
  getSession(key, isObj = true) {
    let value = sessionStorage.getItem(key);
    if (isObj) {
      value = JSON.parse(value);
    }
    return value;
  },

  /**--------------sessionStorage设置对象--------------**/
  setSession(key, value) {
    let str = value;
    if (value !== undefined && typeof (value) === 'object') {
      str = JSON.stringify(value);
    }
    sessionStorage.setItem(key, str);
  },

  /**--------------sessionStorage删除对象--------------**/
  delSession(key) {
    sessionStorage.removeItem(key);
  },

  /*-----------------手机号隐藏中间4位-------------------*/
  hidePhoneNum(phone) {
    let result = "";
    if (phone != null) {
      result = phone.substring(0, 3) + "****" + phone.substring(7);
    }
    return result;
  },
    /**
 * 手机号验证
 * @param poneNum
 */
  isPoneAvailable(poneNum) {

    var myreg=/^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;
    if (!myreg.test(poneNum)) {
    return false;
    } else {
    return true;
    }
  },
  // 验证码校验
  validateSmsCode (value) {
    return /^[0-9]{6}$/g.test(value.replace(/\s/g, '')) ? true : false; 
  },
  // AES加密
  encrypt(word, keyStr, ivStr) {
    keyStr = keyStr ? keyStr : "123456789qazwsxe";
    ivStr = ivStr ? ivStr : "123456789qazwsxe";
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let iv = CryptoJS.enc.Utf8.parse(ivStr);
    let srcs = CryptoJS.enc.Utf8.parse(word);

    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      // padding: CryptoJS.pad.ZeroPadding
    });
    return encrypted.toString();
  },
  //AES解密
  decrypt(word, keyStr, ivStr) {
    keyStr = keyStr ? keyStr : "123456789qazwsxe";
    ivStr = ivStr ? ivStr : "123456789qazwsxe";
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    let iv = CryptoJS.enc.Utf8.parse(ivStr);

    var decrypt = CryptoJS.AES.decrypt(word, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      // padding: CryptoJS.pad.ZeroPadding
    });
    return decrypt.toString(CryptoJS.enc.Utf8);
  },

  /*---------------------获取当前最新时间----------------------*/
  getNowDate(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second = date.getSeconds();
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
  },

  /**----------------- 数字转换金额------------------ ***/
  numberToAmount(num, n = 2) {
    if (!num&&num!==0) {
      return '';
    }
    if (!isNaN(num)) {
      num = parseFloat(num).toFixed(n);
    } else {
      num = num;
    }
    var re = /(\d{1,3})(?=(\d{3})+(?:\.))/g;
    return num.replace(re, "$1,");
  },

  /**-------------------------- 金额转换数字----------------------**/
  amountToNumber(value) {
    let num = value;
    if (!num) {
      return '';
    }
    num = num.toString();
    num = num.replace(/[ ]/g, "");
    num = num.replace(/,/gi, '');
    if (!isNaN(num)) {
      return Number(num);
    }
    return num;
  },
  /**-------------------------- 字符串转数字且保留两位有效小数----------------------**/
  stringToNumber(val){
    if (!val) {return '';}
    val = val.replace(/[ ]/g, "");
    val = val.replace(/,/gi, '');
    if (!isNaN(val)) {
      return parseFloat(val).toFixed(2);
    }
    return val;

  },
  /**--------------检查上传文件的大小--------------**/
  checkFileSize(file, size = 10) {
    if (file.size > size * 1024 * 1024) {
      MessageBox.confirm(`文件大小不能超过${size}MB`, {
        confirmButtonText: '知道了',
        type: 'warning',
        showCancelButton: false,
        showClose: false,
      });
      return false;
    }
    return true;
  },
  /**--------------日期转化--------------**/
  dateFormatter(value, fmt = 'yyyy-MM-dd hh:mm:ss') {
    if (!value) {
      return ''
    }
    let date = new Date(Number(value));
    let o = {
      "M+": date.getMonth() + 1,                 //月份
      "d+": date.getDate(),                    //日
      "h+": date.getHours(),                   //小时
      "H+": date.getHours(),
      "m+": date.getMinutes(),                 //分
      "s+": date.getSeconds(),                 //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  },

  /**----------------超出字数显示省略号---------------------------**/
  overPartWord(value) {
    if (!value) {
      return ''
    }
    if (value.length > 10) {
      return value.substring(0, 10) + '...'
    }
    return value
  },
  /**-------------------对象或数组深拷贝---------------------------**/
  objDeepCopy(source) {
    let sourceCopy = source instanceof Array ? [] : {};
    for (let item in source) {
      sourceCopy[item] = typeof source[item] === 'object' && source[item] !== null
        ? this.objDeepCopy(source[item]) : source[item] === null
          ? '' : source[item];

    }
    return sourceCopy;
  },
  /*-------------------json数组去重---------------------------*/
  unique(arr, key) {
    var r = [];
    for (var i = 0, l = arr.length; i < l; i++) {
      for (var j = i + 1; j < l; j++) {
        if (key) {
          if (arr[i][key] === arr[j][key]) {
            j = ++i;
          }
        } else {
          if (arr[i] === arr[j]) {
            j = ++i;
          }
        }
      }
      r.push(arr[i]);
    }
    return r;
  },
  /**------保留n位小数(直接截取，不会四舍五入)-------**/
  pointTo(num, n = 2) {
    if (isNaN(num)) {
      return ''
    }
    if (!num && num !== 0) {
      return ''
    }
    if (num && num <= 0) {
      return ''
    }
    if ((num.toString()).indexOf('.') > -1) {
      let intp = num.toString().split('.')[0];
      let pp = num.toString().split('.')[1];
      if (pp.length > n) {
        pp = pp.substr(0, n);
      };
      return num = Number(intp + '.' + pp);
    } else {
      return num = Number(num);
    }
  },
  // 判断是否是0-100的非负整数
  checkNonInt(num) {
    let reg = new RegExp("^(\\d|[1-9]\\d|100)$");
    return reg.test(num)
  },
  // 判断是否是整数
  checkInt(val, n = 15) {
    let flag = isNaN(''+val);
    if(flag){return false;}
    let str = '^\\d{1,' + n + '}$';
    let reg = new RegExp(str);
    return reg.test(val);
  },
  // 判断是否只有n位小数
  checkFloat(val, n = 2) {
    let flag = isNaN(''+val);
    if(flag){return false;}
    let str = '^[0-9]+(\.\\d{1,' + n + '})?$';
    let reg = new RegExp(str);
    return reg.test(val);
  },
  checkFloatNeg(val, n = 2) {
    let flag = isNaN(''+val);
    if(flag){return false;}
    let str = '^-?[0-9]+(\.\\d{1,' + n + '})?$';
    let reg = new RegExp(str);
    return reg.test(val);
  },

  /**-------------将对象转成路由字符串参数--------------**/
  createPath(url, params = {}) {
    let urlParams = [];
    Object.keys(params).forEach((key) => {
      urlParams.push(`${key}=${encodeURIComponent(params[key])}`)
    });
    if (urlParams.length) {
      urlParams = `${url}?${urlParams.join('&')}`
    } else {
      urlParams = url
    }
    return urlParams;
  },
  /**--------------------数字金额 转 汉字金额----------------------**/
  moneyToUppercase(n){
    if (!/^\-?(0|[1-9]\d*)(\.\d+)?$/.test(n)) {return "非法数字";}
    let fuhao = (n.toString().indexOf("-")===0?"负":"");
    let unit = "千百拾亿千百拾万千百拾元角分", str = "";
    n += "00";
    //如果是负数就就截取
    if(fuhao === "负"){
      n = n.substring(1, n.length);
    }
    let p = n.indexOf('.');
    if (p >= 0)
      n = n.substring(0, p) + n.substr(p+1, 2);
    unit = unit.substr(unit.length - n.length);
    for (var i=0; i < n.length; i++)
      str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
    return fuhao+str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
  },
  /**-------------------- 数组去重 ----------------------**/
  distinctArray(arr,key){
    let result = [];
    let obj = {};
    for(var i =0; i<arr.length; i++){
      if(!obj[arr[i][key]]){
        result.push(arr[i]);
        obj[arr[i][key]] = true;
      }
    }
    return result;
  },
   //是否包含中文
   hasChinese(value){
    let cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/g;
    let mat = value.match(cnReg);
    return mat;
  },
   /*--------------精确到小数点后两位,.后补0和.前补0-------------------------*/
   saveNumberTwo(num){
    if ((!num && num!=0)||num =='') {return '';}
    if (!isNaN(num)) {
      num = parseFloat(num).toFixed(2);
    }
    num += '';
    num = num.replace(/[^0-9|\.]/g, ''); //清除字符串中的非数字非.字符

    if(/^0+/) {//清除字符串开头的0
        num = num.replace(/^0+/, '');
    }
    if(!/\./.test(num)) {//为整数字符串在末尾添加.00
        num += '.00';
    }
    if(/^\./.test(num)){ //字符以.开头时,在开头添加0
        num = '0' + num;
        num += '00';        //在字符串末尾补零
        num = num.match(/\d+\.\d{2}/)[0];
    }
    return num
  },
}
