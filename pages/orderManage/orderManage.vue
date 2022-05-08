<template>
	<view>
		<u-sticky>
			<top-tab :current="current" @tabSwitch='tabSwitch'/>
		</u-sticky>
		<u-list @scrolltolower="scrolltolower" enableBackToTop>
			<order-list :orderList="orderList"/>
		</u-list>
	</view>
</template>

<script>
	import TopTab from '@/components/TopTab.vue'
	import OrderList from './components/OrderList.vue'
	export default {
		data() {
			return {
				orderList:[],
				current:2, //当前选中的导航栏
				status:2,  //订单状态
				limit:10,  //一次请求条数
				offset:0,  //偏移量
				timeout:null, //定时器
			}
		},
		components:{
			OrderList,
			TopTab,
		},
		created() {
			this.getOrder()
		},
		methods: {
			scrolltolower() {
				this.offset += 1 * this.limit
				this.getOrder()
			},
			// 触发topTab的切换点击事件
			tabSwitch(item) {
			  this.current = item.index
				this.status = item.status
				this.offset = 0
				this.orderList = []
				this.getOrder()
			},
			// 获取订单，未完成的订单必须全部获取
			async getOrder() {
				if(this.status == 2) {
					let params = {
						status:this.status,
						limit:1000,
						offset:0,
					}
					const result = await this.$u.api.getMerchantList(params)
					this.orderList = result
				}else{
					let params = {
						limit:this.limit,
						offset:this.offset,
						status:this.status,
					}
					const	result = await this.$u.api.getMerchantList(params)
					this.orderList.push(...result)
				}
			},
		},
		onUnload() {
			clearInterval(this.timeout)
		},
		watch:{
			status:{
				handler(value) {
					if(value == 2) {
						this.timeout = setInterval(() => {
							this.getOrder()
						},5000)
					}else{
						if(this.timeout) {
							clearInterval(this.timeout)
						}
					}
				},
				immediate: true
			}
		}
	}
</script>

<style>

</style>
