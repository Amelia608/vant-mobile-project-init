/***---------------全局过滤器--------------***/
export default {
  install (vue) {
    // 格式化日期
    vue.filter('formatDate',function (value, fmt='yyyy-MM-dd') {
      if(!value){return ''}
      let date = new Date(Number(value));
      let o = {
        "M+" : date.getMonth()+1,                 //月份
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S"  : date.getMilliseconds()             //毫秒
      };
      if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
      for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      return fmt;
    });
    // 中文转换--是否
    vue.filter('switchBool',function (value) {
      switch (value) {
        case 0:return '否';
        case 1:return '是';
        case false:return '否';
        case true:return '是';
        default:return ''
      }
    });
    //将金额转换成 xxx,xxx,xxx.xx格式
    vue.filter('formatMoney',function (value) {
      value = parseFloat(value);
      if (!value && value !== 0) return '';
      let s = Math.floor(value).toString();
      let ss = s;
      if (s.indexOf('-') === 0) {
        s = s.slice(1);
      }
      let i = s.length % 3;
      let h = i > 0 ? (s.slice(0, i) + (s.length > 3 ? ',' : '')) : '';
      let f = '.' + value.toFixed(2).slice(-2);
      if (ss.indexOf('-') === 0) {
        return '-' + h + s.slice(i).replace(/(\d{3})(?=\d)/g, '$1,') + f;
      } else {
        return h + s.slice(i).replace(/(\d{3})(?=\d)/g, '$1,') + f;
      }
    });
    // 单位展示过滤
    vue.filter('showUnit', function(value, unitName) {
      if (value || value === 0) {
        if (unitName) {
          return `${value}${unitName}`
        } else {
          return `${value}`
        }
      } else {
        return ''
      }
    });

  }
}
