<template>
	<u-tabbar
		:value="tabValue"
	>
		<u-tabbar-item v-for="(item,index) in list" :text="item.text" :icon="item.icon" :name="item.icon" @click="switchTab(index)"/>
	</u-tabbar>
</template>

<script>
	export default {
		name:'TabBar',
		data(){
			return {
				list:[
					{
						text:'首页',
						icon:'home',
						path:'../index/index'
					},
					{
						text:'评论',
						icon:'chat',
						path:'../comments/comments'
					},
					{
						text:'订单',
						icon:'order',
						path:'../orderList/orderList'
					},
					{
						text:'点餐',
						icon:'play-right',
						path:'../order/order'
					},
					{
						text:'我的',
						icon:"account",
						path:'../mine/mine'
					},
				],
			}
		},
		props:{
			value:{
				type:String,
				default:'home'
			}
		},
		methods:{
			switchTab(index) {
				uni.reLaunch({
				    url: this.list[index].path,
						fail(err) {
							console.log('err',err);
						}
				});
			}
		},
		computed:{
			tabValue () {
				return this.value
			}
		}
	}
</script>

<style>
</style>
