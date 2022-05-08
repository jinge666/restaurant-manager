<template>
	<view class="content">
		<u-sticky>
			<top-tab :current="current" @tabSwitch='tabSwitch'/>
		</u-sticky>
		<u-list @scrolltolower="scrolltolower" enableBackToTop pagingEnabled>
			<list :orderList="orderList"/>
		</u-list>
		<login ref="login" @loginSuccess="loginSuccess"/>
		<tab-bar :value="value"/>
	</view>
</template>

<script>
	import TabBar from '@/components/TabBar'
	import TopTab from '@/components/TopTab.vue'
	import login from '@/components/login.vue'
	import List from './components/List.vue'
	export default {
		data() {
			return {
				value:"order",
				status:0,  //订单状态
				current:0, //当前选中的导航栏
				orderList:[],  //订单列表
				limit:10,  //一次请求条数
				offset:0,  //偏移量
			}
		},
		components:{
			TabBar,
			TopTab,
			login,
			List
		},
		created() {
			this.getOrder()
		},
		onShow() {
			let userInfo = this.$store.state.userInfo.userInfo
			if(!userInfo.token) {
				this.$refs.login.open()
			}
		},
		methods: {
			// 触发topTab的切换点击事件
			tabSwitch(item) {
			  this.current = item.index
				this.status = item.status
				// 判断是否处于登录状态
				if(!this.$store.state.userInfo.userInfo.token) {
					this.$refs.login.open()
				}else{
					this.offset = 0
					this.orderList = []
					this.getOrder()
				}
			},
			// 获取订单信息
			async getOrder () {
				let params = {
					limit:this.limit,
					offset:this.offset,
					status:this.status,
				}
			  const	result = await this.$u.api.getOrder(params)
				console.log('result',result);
				this.orderList.push(...result)
			},
			// 登录成功执行
			loginSuccess () {
				this.getOrder()
			},
			// 滚动到底部事件
			scrolltolower () {
				this.offset += 1 * this.limit
				this.getOrder()
			}
		}
	}
</script>

<style scoped lang="scss">
.content{
	width: 100%;
	height: 100vh;
	background-color: #F4F4F4;
	overflow-y: auto;
}
</style>
