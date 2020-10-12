import Http from "@/core/axios";
const ng = "/api-v1";
export default {
  mobileProjectDetail: (params) =>
    Http.get(`${ng}/mobileProject/mobileProjectDetail`, params, true),
};
