<template>
	<view class="content">
		<u-cell-group>
			<u-cell v-for="item in allList" 
				:icon="item.icon" 
				:title="item.title" 
				:border="false" 
				:url="item.path" 
				clickable
				isLink
				size="large"
			/>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		name:"TabList",
		data() {
			return{

			}
		},
		computed:{
			allList () {
				let list = [
					{
						title:"我的会员卡",
						path:'../myVip/MyVip',
						icon:'plus-people-fill'
					},
					{
						title:"更换手机号",
						path:'../index/index',
						icon:'android-fill'
					},
					{
						title:"邀请好友",
						path:'../index/index',
						icon:'gift-fill'
					},
					{
						title:"联系客服",
						path:'../index/index',
						icon:'kefu-ermai'
					},
				]
				// 管理员
				if(this.administrator || this.manager) {
					list.unshift({
						title:"餐厅管理",
						path:'../manager/manager',
						icon:'setting-fill'
					})
					list.unshift({
						title:"订单管理",
						path:'../orderManage/orderManage',
						icon:"order"
					})
					list.unshift({
						title:"权限管理",
						path:'../permissionManager/permissionManager',
						icon:"account-fill"
					})
					list.unshift({
						title:"设置首页轮播图",
						path:'../setSwiper/setSwiper',
						icon:'photo-fill'
					})
					// 服务员
				}else if(this.waiter) {
					list.unshift({
						title:"订单管理",
						path:'../orderManage/orderManage',
						icon:"order"
					})
					list.unshift({
						title:"菜品管理",
						path:'../manager/manager',
						icon:'setting-fill'
					})
				}
				return list
			}	
		}
	}
</script>

<style scoped lang="scss">
	.content{
		// height: 400rpx;
		margin: 0 3% 0 3%;
		background-color: #F1F3F4;
		border: 1px solid #f4f4f5;
		border-radius: 15rpx;
		box-shadow: 10px 3px 4px #e7e6e4;
	}
</style>
