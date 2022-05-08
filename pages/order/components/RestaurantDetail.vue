<template>
	<view class="">
		<image :src="form.pictureList[0].url" mode="widthFix" class="img" v-if="form.pictureList[0].url"></image>
		<view class="content">
			<view class="common" v-if="form.address">
				<u-icon name="map" color="#b4b3b1" size="20"></u-icon>
				<text class="desc">{{form.address}}</text>
			</view>
			<view class="common" v-if="form.beginDate || form.endDate">
				<u-icon name="clock" color="#b4b3b1" size="20"></u-icon>
				<text class="desc">{{form.beginDate}} - {{form.endDate}}</text>
			</view>
			<view class="introduction" v-if="form.introduction">
				<text class="intro-title">店铺简介</text>
				<u--textarea v-model="form.introduction" autoHeight disabled></u--textarea>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return{}
		},
		props:{
			form:{
				type:Object,
				default:() => {}
			}
		}
	}
</script>

<style scoped lang="scss">
	.img{
		width: 100%;
	}
	.content{
		margin: 30rpx 3% 0 3%;
		.common{
			height: 70rpx;
			display: flex;
			line-height: 70rpx;
			font-size: 37rpx;
			.desc{
				display: inline-block;
				margin-left: 10rpx;
			}
		}
		.introduction{
			margin: 3rpx 2% 0 2%;
			.intro-title{
				display: inline-block;
				margin: 0 0 8rpx 10rpx;
				font-size: 25rpx;
				color: #909399;
			}
		}
	}
</style>