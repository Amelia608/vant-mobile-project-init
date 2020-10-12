
/**---------------------定义全局变量---------------------**/

//登录地址
// const loginHref = process.env.VUE_APP_CURRENTMODE==='prd'
//   ?'https://urms.mmall.com/passport/login?service=https://xfz.mmall.com'
//   :process.env.VUE_APP_CURRENTMODE==='uat1'
//     ?'http://urms.uat1.rs.com/passport/login?service=http://progress.uat1.rs.com'
//     :process.env.VUE_APP_CURRENTMODE==='stg'
//       ?'https://urms.mklmall.com/passport/login?service=https://progress.mklmall.com'
//       // :'http://urms.dev.rs.com/passport/login?service=http://progress.dev.rs.com';
//       :'http://urms.dev.rs.com/passport/login?service=http://prolocal.dev.rs.com:8000';


// //注销地址
// const logoutHref = process.env.VUE_APP_CURRENTMODE==='prd'
//   ?'https://urms.mmall.com/passport/logout?redirectUrl=https://xfz.mmall.com'
//   :process.env.VUE_APP_CURRENTMODE==='uat1'
//     ?'http://urms.uat1.rs.com/passport/logout?redirectUrl=http://progress.uat1.rs.com'
//     :process.env.VUE_APP_CURRENTMODE==='stg'
//       ?'https://urms.mklmall.com/passport/logout?redirectUrl=https://progress.mklmall.com'
//       :'http://urms.dev.rs.com/passport/logout?redirectUrl=http://progress.dev.rs.com';
      // :'http://urms.dev.rs.com/passport/logout?redirectUrl=http://prolocal.dev.rs.com:8000';

// 上传文件地址
const fileAction = process.env.VUE_APP_CURRENTMODE==='prd'
?'https://file-yun.mmall.com/file/private/upload/e'
:process.env.VUE_APP_CURRENTMODE==='uat1'
  ?'http://file-yun.uat1.rs.com/file/private/upload/e'
  :process.env.VUE_APP_CURRENTMODE==='stg'
    ?'https://file-yun.mklmall.com/file/private/upload/e'
    :'http://file-yun.dev.rs.com/file/private/upload/e';

    // 下载文件地址
const fileDownAction = process.env.VUE_APP_CURRENTMODE==='prd'
?'https://file-yun.mmall.com/file/private/download/e'
:process.env.VUE_APP_CURRENTMODE==='uat1'
  ?'http://file-yun.uat1.rs.com/file/private/download/e'
  :process.env.VUE_APP_CURRENTMODE==='stg'
    ?'https://file-yun.mklmall.com/file/private/download/e'
    :'http://file-yun.dev.rs.com/file/private/download/e';


// 优势
const advantage = [
  {namecode:"hasPark",name:"公园"},
  {namecode:"hasLake",name:"湖泊"},
  {namecode:"hasRiver",name:"江河"},
  {namecode:"hasForest",name:"森林"},
  {namecode:"hasProvincialGovernment",name:"省政府"},
  {namecode:"hasCityGovernment",name:"市政府"},
  {namecode:"hasDistrictGovernment",name:"区政府"},
  {namecode:"hasStadium",name:"体育场"},
  {namecode:"goodOther",name:"其他"}]
// 劣势
const inferiority = [
  {namecode:"hasRailway",name:"铁路"},
  {namecode:"hasChemicalPlant",name:"化工厂"},
  {namecode:"hasElectroplateFactory",name:"电镀厂"},
  {namecode:"hasFuneralParlor",name:"殡仪馆"},
  {namecode:"hasPharmaceuticalFactory",name:"制药厂"},
  {namecode:"hasPaperMill",name:"造纸厂"},
  {namecode:"hasBuriedRegion",name:"填埋区"},
  {namecode:"hasCokingPlant",name:"炼胶厂"},
  {namecode:"badOther",name:"其他"}]
 
export default {
  fileAction,
  fileDownAction,
  advantage,
  inferiority
}
