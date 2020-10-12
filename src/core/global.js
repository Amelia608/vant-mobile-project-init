/***---------------vue全局实例方法-------------***/
import {Message} from "element-ui";
import API from '../api/globalApi'
import VARS from '../core/variable'

export default {
  install(Vue) {
    //修正浮点数运算的精度问题
    Vue.prototype.$fixMath = function (math) {
      //math为运算式,必须确保是数字类型进行运算
      return parseFloat(Number(math).toPrecision(14))
    };

    //检验表单是否通过
    Vue.prototype.$checkForm = function (formName) {
      let flag = false;
      this.$refs[formName].validate((valid) => {
        flag = valid;
      });
      return flag;
    };
    //成功提示后回调
    Vue.prototype.$success = function (msg,fn,time=1000) {
      Message({
        message:msg,
        type:'success',
        duration:time,
        onClose(){
          fn();
        }
      })
    };
    // 获取数据字典
    Vue.prototype.$getOptions = function (params) {
      return new Promise((resolve,reject)=>{
        API.getDoctionaryList(params).then((data)=>{
          return resolve(data.data);
        }).catch(err=>{
          return reject(err);
        })
      });
    };


    // 内容换行展示处理
    Vue.prototype.$switchLineText = function(value) {
      let reg = /[\r\n]+/g;
      let result = value;
      if (!result) return ''; 
      if(reg.test(result)){
        result = result.replace(/[\r\n]+/g, "<br />")
        result = `<p>${result}</p>`
      }
      return result;
    };
    
  }
}
