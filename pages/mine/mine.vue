<template>
	<view class="me">
		<mine-detail/>
		<tab-list/>
		<login ref="login"/>
		<tab-bar :value="value"/>
	</view>
</template>

<script>
	import TabBar from '@/components/TabBar'
	import TabList from './compents/TabList.vue'
	import login from '@/components/login.vue'
	import MineDetail from './compents/MineDetail.vue'
	export default {
		data() {
			return {
				// 是否显示 navbar
				navBarShow: false,
				feedsList: [],
				bio: '',
				value:"account",
			}
		},
		components:{
			TabBar,
			TabList,
			login,
			MineDetail
		},
		onShow() {
			let userInfo = this.$store.state.userInfo.userInfo
			if(!userInfo.token) {
				this.$refs.login.open()
			}
		},
		onReady() {
		}
		// onPageScroll(res) {
		// 	if (res.scrollTop > 100) {
		// 		this.navBarShow = true;
		// 	} else {
		// 		this.navBarShow = false;
		// 	}
		// },
		// onPullDownRefresh() {
		// 	console.log('下拉刷新了')
		// 	this.$refs.waterfall.clear()
		// 	this.getInfos()
		// },
	}
</script>

<style lang="scss" scoped>
	
</style>
