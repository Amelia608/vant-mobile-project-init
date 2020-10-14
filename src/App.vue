<!--  -->
<template>
	<div id='app'>
		<van-button type="primary">主要按钮</van-button>
		<van-button type="success">成功按钮</van-button>
		<van-button type="default">默认按钮</van-button>
		<van-button type="warning">警告按钮</van-button>
		<van-button type="danger">危险按钮</van-button>
		<van-cell title="请选择"
			:value="text"
			@click="show = true" />
		<van-calendar v-model="show"
			type="range"
			color="#07c160"
			confirm-text="你说了算"
			confirm-disabled-text="请选择结束时间"
			@confirm="onConfirm"
			:formatter="formatter" />
	</div>
</template>

<script>
import { Toast } from 'vant';
import api from '@/api/index'
export default {
	name: '',
	components: {},
	data () {
		return {
			date: '',
			show: false,
			text: ''
		};
	},
	computed: {

	},
	watch: {

	},
	created () {

	},
	mounted () {
		api.mobileProjectDetail({ projectCode: "晶海广场-2020-0227" }).then(res => {
			console.log(res)
		})
	},
	methods: {
		formatter (day) {
			const month = day.date.getMonth() + 1;
			const date = day.date.getDate();

			if (month === 11) {
				if (date === 1) {
					day.topInfo = '劳动节';
				} else if (date === 4) {
					day.topInfo = '青年节';
				} else if (date === 11) {
					day.text = '今天';
				}
			}

			if (day.type === 'start') {
				day.bottomInfo = '入住';
			} else if (day.type === 'end') {
				day.bottomInfo = '离店';
			}

			return day;
    },
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
		onConfirm (date) {
			this.show = false;
      // this.text = `选择了 ${date.length} 个日期`;
      this.text = this.formatDate(date[0])+'-'+this.formatDate(date[1]);
		},
	},
}
</script>
<style lang='scss' scoped>
</style>