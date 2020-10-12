import axios from "axios";
// import router from "../router";
import { Toast } from "vant";
import Utils from "@/core/utils";

//创建axios实例
const service = axios.create({
  timeout: 15000,
  withCredentials: true,
  responseType: "json",
  cache: false,
});
service.defaults.headers.common["Cache-Control"] = "no-cache";
service.defaults.headers.get["If-Modified-Since"] = "0";
service.defaults.headers["platform"] = "app";

//请求拦截
service.interceptors.request.use(
  (config) => {
    config.headers["x-auth-token"] =
      Utils.getCookie("token") || "b6df0db5e0804094bc6f734f8f8a2458";

    let method = config.method;
    let obj = {
      post: "data",
      get: "params",
    };

    if (Object.keys(obj).includes(method)) {
      config[obj[method]].randomTime = new Date().getTime(); //防止post、get方法缓冲
    }

    let cancelGroupName;
    if (config.method === "post") {
      if (config.data && config.data.cancelGroupName) {
        // post请求ajax取消函数配置
        cancelGroupName = config.data.cancelGroupName;
      }
    } else {
      if (config.params && config.params.cancelGroupName) {
        // get请求ajax取消函数配置
        cancelGroupName = config.params.cancelGroupName;
      }
    }
    if (cancelGroupName) {
      if (service[cancelGroupName] && service[cancelGroupName].cancel) {
        service[cancelGroupName].cancel();
      }
      config.cancelToken = new CancelToken((c) => {
        service[cancelGroupName] = {};
        service[cancelGroupName].cancel = c;
      });
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//响应拦截
service.interceptors.response.use(
  (response) => {
    // 未登陆
    if (response.data.code === -401 || response.data.code === 401) {
      // router.replace("/login");
      console.log("未登录即将跳转至登录页面");
    }

    if (response.data.code == -403) {
      return Promise.resolve(response.data);
    }

    // 接口拦截，用户未登陆
    if (response.data.code !== 200 && response.data.code !== 6001) {
      return Promise.reject(response.data);
    } else {
      return response.data;
    }
  },
  (error) => {
    return Promise.reject((error.response && error.response.data) || {}); // 返回接口返回的错误信息
  }
);

/*
loading为true 调用这个api会打开loading，结束关闭
loading为false  调用只会关闭loading ,主要用于首次打开tab页面，关闭loading
loading为''或者不传  什么都不操作
 */
export default class Http {
  static send(config, loading) {
    const configs = Object.assign(
      {
        headers: {},
        timeout: 30000,
      },
      config
    );

    if (loading) {
      Toast.loading({
        message: "加载中...",
        duration: 0,
        forbidClick: true,
      });
    }

    return service(configs)
      .then((res) => {
        Toast.clear();
        return res;
      })
      .catch((error) => {
        Toast.clear();
        if (error) {
          switch (error.code) {
            case 500:
              Toast(error.message || "系统异常！");
              break;
            case 404:
              Toast("网络异常！");
              break;
            default:
              Toast((error && error.message) || "网络异常！");
          }
        }
        throw error;
      });
  }

  static post(url, params = {}, loading) {
    const config = {
      method: "post",
      url,
      data: params,
    };
    return Http.send(config, loading);
  }

  static put(url, params = {}, loading) {
    const config = {
      method: "put",
      url,
      data: params,
    };
    return Http.send(config, loading);
  }

  static get(url, params = {}, loading) {
    let urlParams = [];
    Object.keys(params).forEach((key) => {
      urlParams.push(`${key}=${encodeURIComponent(params[key])}`);
    });
    if (urlParams.length) {
      urlParams = `${url}?${urlParams.join("&")}`;
    } else {
      urlParams = url;
    }
    const config = {
      url: urlParams,
      params: {
        randomTime: new Date().getTime(), // 防止缓存
      },
    };
    return Http.send(config, loading);
  }
}
