<template>
	<view>
		<top-tab @tabSwitch='tabSwitch'/>
		<restaurant-detail :form="form" v-show="showType == 'restaurant'"/>
		<to-order 
			:form="form" 
			v-show="showType == 'order'"
		/>
		<login ref="login"/>
		<!-- <tab-bar :value="value"/> -->
	</view>
</template>

<script>
	import TabBar from '@/components/TabBar'
	import login from '@/components/login.vue'
	import TopTab from './components/TopTab.vue'
	import RestaurantDetail from './components/RestaurantDetail.vue'
	import ToOrder from './components/ToOrder.vue'
	import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				value:'play-right',
				form:{
					navCategory:[]
				},
				showType:'order'
			}
		},
		components:{
			TabBar,
			login,
			TopTab,
			RestaurantDetail,
			ToOrder,
		},
		onShow() {
			let userInfo = this.$store.state.userInfo.userInfo
			if(!userInfo.token) {
				this.$refs.login.open()
			}
		},
		created() {
			this.getForm()
		},
		methods: {
			// 获取vuex中的mutation
			...mapMutations(['initRestaurant']),
			// 触发topTab的切换点击事件
			tabSwitch(item) {
				this.showType = item.type
			},
			// 获取餐馆相关信息
			async	getForm () {
				if(this.$store.getters.restaurant.id) {
					this.form = this.$store.getters.restaurant
				}else{
				  const result = await this.$u.api.getRestaurant()
					this.initRestaurant(result)
					this.form = this.$store.getters.restaurant
				}
			},
		}
	}
</script>

<style>

</style>
