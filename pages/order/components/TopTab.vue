<template>
	<view class="content">
		<view class="top-table">
			<u-tabs :list="list" 
							@click="tabSwitch" 
							:activeStyle="uTabStyle" 
							lineColor="#f56c6c" 
							lineWidth="40" 
							itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;">
			</u-tabs>
		</view>
	</view>
</template>

<script>
	export default {
		name:"TopTab",
		data() {
			return {
				uTabStyle:{
					color: '#303133',
					fontWeight: 'bold',
					transform: 'scale(1.05)'
				},
				list:[
					{
						name:'菜单',
						type:"order"
					},
					{
						name:"商家",
						type:"restaurant"
					}
				]
			};
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
		border: 1px solid $u-border-color;
		.top-table{
			// background-color: #F1F3F4;
		}
	}
</style>
