<template>
	<view class="content">
		<view class="top-table">
			<u-tabs :list="list" :current="current" @click="tabSwitch"></u-tabs>
		</view>
	</view>
</template>

<script>
	export default {
		name:"TopTab",
		data() {
			return {
				list:[
					{
						name:'全部',
						type:"all",
					},
					{
						name:"待消费",
						type:"consumption",
						status:1
					},
					{
						name:'待完成',
						type:'pending',
						status:2
					},
					{
						name:"已完成",
						type:"completed",
						status:3
					},
					{
						name:"已退款",
						type:"refunded",
						status:4
					}
				]
			};
		},
		props:{
			current:{
				type:Number,
				default:0
			}
		},
		methods:{
			tabSwitch(item) {
				this.$emit('tabSwitch',item)
			}
		}
	}
</script>

<style scoped lang="scss">
	.content{
		.top-table{
			background-color: #F1F3F4;
		}
	}
</style>
