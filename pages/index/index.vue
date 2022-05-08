<template>
	<view class="content">
		<my-swiper :height="300"/>
		<home-body></home-body>
		<tab-bar :value="value"/>
		<login ref="login"/>
	</view>
</template>

<script>
	import TabBar from '@/components/TabBar'
	import login from '@/components/login.vue'
	import MySwiper from '@/components/swiper.vue'
	import HomeBody from './components/HomeBody.vue'
	import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				value:"home"
			}
		},
		components:{
			TabBar,
			login,
			MySwiper,
			HomeBody
		},
		onLoad() {
		},
		onShow() {
			let userInfo = this.$store.state.userInfo.userInfo
			if(!userInfo.token) {
				this.$refs.login.open()
			}
		},
	}
</script>

<style>
	
</style>
