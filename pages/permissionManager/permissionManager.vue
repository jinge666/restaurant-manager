<template>
	<view>
		<!-- 头部导航 -->
		<view class="top-tab">
			<u-tabs :list="list" :current="current" @click="tabSwitch"></u-tabs>
		</view>
		<!-- 用户列表 -->
		<view class="user-body">
			<u-list @scrolltolower="scrolltolower">
				<u-list-item v-for="(item, index) in userList" :key="item.id">
					<view class="user">
						<view class="avatar-url">
							<image :src="item.avatarUrl" mode="aspectFit" class="avatar-img"></image>
						</view>
						<view class="for-border">
							<view class="name-phone">
								<text class="name common">{{item.nickName}}</text>
								<text class="phone common">{{item.phone}}</text>
							</view>
							<view class="change-identity">
								<u-button 
								  type="success" 
									:text="currentidentity === 1 ? '修改为服务员' : '修改为客户'"
									@click="change(item.id,index)"
									/>
							</view>
						</view>
					</view>
				</u-list-item>
			</u-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{
						name:'客户',
						identity:1
					},
					{
						name:"服务员",
						identity:2
					}
				],
				current:0,
				userList:[],
				currentidentity:1,
				limit:10,
				offset:0,
			}
		},
		created() {
			this.getUserByIdentity()
		},
		methods: {
			// 获取用户列表
			async getUserByIdentity() {
				const params = {
					limit:this.limit,
					offset:this.offset,
					identity:this.currentidentity
				}
				const result = await this.$u.api.getUserByIdentity(params)
				this.userList.push(...result)
			}, 
			// 切换tabs
			tabSwitch(item) {
				this.currentidentity = item.identity
				this.offset = 0
				this.userList = []
				this.getUserByIdentity()
			},
			// 改变身份
			async change(id,index) {
				const params = {
					userId:id,
					identity:this.currentidentity === 1 ? 2 : 1
				}
				const result = await this.$u.api.changeIdentity(params)
				this.userList.splice(index,1)
				uni.$u.toast(result)
			},
			// 滚动到底部
			scrolltolower() {
				this.offset += this.limit
				this.getUserByIdentity()
			},
		}
	}
</script>

<style scoped lang="scss">
	.top-tab{
		width: 100%;
		position: fixed;
		top: 0;
		background-color: #FFFFFF;
		z-index: 9999;
	}
	.user-body{
		height: 100%;
		width: 100%;
		background-color: #F5F5F5;
		margin-top: 60px;
		.user{
			padding: 10px 20px;
			display: flex;
			align-items: center;
			.avatar-url{
				.avatar-img{
					width: 60px;
					height: 60px;
				}
			}
			.for-border{
				display: flex;
				justify-content: space-between;
				width: 100%;
				.name-phone{
					margin-left: 20px;
					display: flex;
				  flex-direction: column;
					.common{
						display: inline-block;
					}
					.name{
						font-weight: 600;
						margin-bottom: 5px;
					}
					.phone{
						color: #909399;
					}
				}
			}
		}
	}
</style>
