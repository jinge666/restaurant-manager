<template>
	<view>
		<u-swiper :list="list2" keyName="url" indicator circular :height="height" @click="navTo">
		</u-swiper>
	</view>
</template>

<script>
	export default {
		name:"swiper",
		data() {
			return {
				list:[
					{
						url:'http://localhost:8000/picture/1434289d47091d39cc9c949533759a74.png',
						type:'image',
						navTo:'../index/index',
					},
					{
						url:"https://cdn.uviewui.com/uview/swiper/swiper2.png",
						type:'image',
						navTo:'../orderList/orderList',
					},
					{
						url:"https://cdn.uviewui.com/uview/swiper/swiper1.png",
						type:'image',
						navTo:"../order/order",
					},
					{
						url:"https://cdn.uviewui.com/uview/swiper/swiper2.png",
						type:'image',
						navTo:'../mine/mine',
					}
				]
			};
		},
		props:{
			height:{
				type:String,
				default:"220"
			}
		},
		computed:{
			list2() {
				if(this.swiperList.length) {
					let list = this.swiperList.map(item => {
						return {url:item.url+'.png',navTo:'../order/order'}
					})
					return list
				}
				return this.list
			}
		},
		methods:{
			navTo(index) {
				uni.navigateTo({
					url:this.list2[index].navTo
				})
			}
		},
	}
</script>

<style>

</style>
