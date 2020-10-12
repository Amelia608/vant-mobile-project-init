<!--  -->
<template>
	<div id='app'>
		<van-button type="primary">主要按钮</van-button>
		<van-button type="success">成功按钮</van-button>
		<van-button type="default">默认按钮</van-button>
		<van-button type="warning">警告按钮</van-button>
		<van-button type="danger">危险按钮</van-button>
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

		};
	},
	computed: {

	},
	watch: {

	},
	created () {

	},
	mounted () {
    api.mobileProjectDetail({projectCode:"晶海广场-2020-0227"}).then(res=>{
      console.log(res)
    })
	},
	methods: {

	},
}
</script>
<style lang='scss' scoped>
</style>