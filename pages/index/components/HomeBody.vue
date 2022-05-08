<template>
	<view class="content">
		<view class="to-order">
			<view class="order" @click="toOrder">
				开始下单
			</view>
			<u-line direction="col" :hairline="false" length="70%"></u-line>
			<view class="restaur-picture">
				<image class="image" :src="restaurantPicture" mode="aspectFit"></image>
			</view>
		</view>
	  <view class="list">
	  	<block v-for="(item,index) in list" :key="index">
				<view class="list-item">
					<view class="title">{{item.title}}</view>
					<view class="desc"><text>{{item.desc}}</text></view>
					<view class="icon"><u-icon :name="item.icon" size="50"></u-icon></view>
				</view>
			</block>
	  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return{
				list:[
					{
						title:"积分商城",
						desc:'积分兑好礼',
						icon:"grid"
					},
					{
						title:"兑换码",
						desc:"点击兑好卷",
						icon:"coupon"
					},
					{
						title:"优惠卷",
						desc:"用卷更划算",
						icon:"gift"
					}
				]
			}
		},
		methods:{
			toOrder() {
				uni.$u.route({
					url: 'pages/order/order',
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content{
		.to-order{
			transform:translateY(-10px);
			margin: 0 auto;
			width: 90%;
			height: 335rpx;
			background-color: #FFFFFF;
			border: 1px solid #e4e7ed;
			box-shadow: 6px 10px 10px #c8c9cc;
			border-radius: 15px;
			display: flex;
			align-items: center;
			.order{
				width: 48%;
				text-align: center;
				line-height: 335rpx;
				font-weight: 600;
				font-size: 30px;
			}
			.restaur-picture{
				width: 48%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				.image{
					height:72%;
				}
			}
		}
		.list{
			.list-item{
				display: inline-block;
				margin-left: 2%;
				width: 30%;
				background-color: #FFFFFF;
				border: 1px solid #e4e7ed;
				box-shadow: 3px 5px 10px #c8c9cc;
				border-radius: 8px;
				text-align: center;
				.title{
					font-weight: 550;
					margin: 45rpx 0 20rpx 0;
					font-size: 40rpx;
				}
				.desc{
					color: #909399;
					font-size: 25rpx;
				}
				.icon{
					margin: 20rpx 0 45rpx 0;
					display: flex;
					justify-content: center;
				}
			}
		}
	}
</style>
