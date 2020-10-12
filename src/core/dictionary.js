export default {
  /**----------------------字典----------------------**/
//角色状态
  switchRoleStatus(val) {
    switch (val) {
      case 0:return '草稿';
      case 1:return '启用';
      case 2:return '禁用';
      default:return ''
    }
  },
//顾问标记
  switchCounselorFlag(val) {
    switch (val) {
      case 1:return '否';
      case 2:return '是';
      default: return ''
    }
  },
//hr状态
  switchHrStatus(val) {
    switch (val) {
      case 'A':return '在职';
      case 'I':return '离职';
      default:return ''
    }
  },
//是否是领导
  switchLeader(val) {
    switch (val) {
      case 0:return '否';
      case 1:return '是';
      default:return ''
    }
  },
//是否确认
  switchConfirm(val) {
    switch (val) {
      case false:return '否';
      case true:return '已确认';
      default:return ''
    }
  },
}
