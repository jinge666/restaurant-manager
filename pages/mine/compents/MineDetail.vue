<template>
	<!-- 页面区域 允许滚动 -->
	<view class="page-item">
		<!-- 用户信息卡片 -->
		<view class="user-info">
			<image class="hbg" src="@/static/hbg.png" mode="aspectFit" />
			<image class="user-info-content" src="@/static/ubg.png" mode="aspectFit" />
			<view class="user-content">
				<view class="user-imgbox">
					<view class="user-img">
						<u-avatar :src="userInfo.avatarUrl ? userInfo.avatarUrl : '@/static/nopic.png'" size="60"></u-avatar>
					</view>
				</view>
				<view class="user-text">
					<text class="user-name">{{userInfo.nickName ? userInfo.nickName : 'xxxx'}}</text>
					<view class="is-vip" v-if="isVip">
						<u-badge value="vip"shape="horn"/>
					</view>
				</view>
				<view class="other-item">
					<view class="balance">
						<text>余额</text>
						<text class="next">0</text>
					</view>
					<view class="balance">
						<text>积分</text>
						<text class="next">0</text>
					</view>
					<view class="balance">
						<text>优惠卷</text>
						<text class="next">0</text>
					</view>
				</view>
			</view>
		<!-- 下面的半圆导航 -->
		<view class="view-circle" />
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		computed:{
			userInfo() {
				return this.$store.state.userInfo.userInfo
			}
		},
	}
</script>

<style scoped lang="scss">
	.page-item {
		width: 750upx;
		overflow-x: hidden;
	}
	// 用户信息
	.user-info {
		position: relative;
		z-index: 1;
		display: flex;
		justify-content: center;
		width: 750upx;
		height: 708upx;
		background: linear-gradient(to top, #1d293c, #25354b);
	
		.hbg {
			position: absolute;
			width: 300upx;
			height: 300upx;
			top: 0;
			left: 0;
			z-index: 3;
		}
	
		.user-info-content {
			position: absolute;
			width: 620upx;
			height: 568upx;
			bottom: 0;
			z-index: 4;
		}
	
		.user-content {
			position: absolute;
			width: 620upx;
			height: 538upx;
			bottom: 0;
			z-index: 5;
			background-size: cover;
			border: none;
			border-radius: 20upx 20upx 0 0;
			font-size: 28upx;
			padding: 0;
			text-align: center;
			line-height: 40upx;
			font-weight: normal;
			font-style: normal;
			.user-text {
				text-align: left;
				width: 560upx;
				height: 180upx;
				position: absolute;
				top: 200upx;
				left: 50upx;
				z-index: 99;
				display: flex;
				.user-name {
					font-weight: 400;
					font-size: 40upx;
					color: #001432;
					font-style: normal;
					letter-spacing: 0;
					line-height: 60upx;
					padding-bottom: 12upx;
				}
				.is-vip{
					padding: 8px;
				}
				.user-brief {
					width: 550upx;
					font-weight: 400;
					font-size: 24upx;
					color: #757474;
					font-style: normal;
					line-height: 36upx;
				}
			}
			.other-item{
				margin-top: 110rpx;
				display: flex;
				font-size: 38rpx;
				justify-content: space-around;
				.balance{
					display: flex;
					flex-direction: column;
					.next{
						display: block;
						margin-top: 30rpx;
					}
				}
			}
			.user-imgbox {
				height: 118upx;
				margin-top: 70upx;
				margin-bottom: 80upx;
				.user-img {
					width: 118upx;
					height: 118upx;
					margin-left: 30upx;
					overflow: hidden;
					border-radius: 30upx;
					margin-bottom: 80upx;
					image {
						width: 118upx;
						height: 118upx;
					}
				}
			}
		}
	
		.view-circle {
			overflow: hidden;
			border-width: 0;
			border-style: solid;
			position: absolute;
			z-index: 9;
			width: 750upx;
			height: 300upx;
			background: url(@/static/half-circle.png) no-repeat center;
			background-size: cover;
			bottom: 0;
	
			.view-circle-bg {
				width: 750upx;
				height: 100%;
			}
		}
	}
</style>
