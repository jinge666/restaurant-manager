<template>
	<view class="content">
		<view class="top">
			<view class="left">VIP专享特权</view>
			<view class="right" @click="backForward">
				<u--text suffixIcon="arrow-right" iconStyle="font-size: 18px" text="查看详情"></u--text>
			</view>
		</view>
		<view class="main">
			<view class="item" v-for="(item,index) in mainContent" :key="index">
				<view class="item-top">
					<u-icon :name="item.icon" color="#2979ff" size="30"></u-icon>
				</view>
				<view class="item-center">
					<view class="title">
						<text>{{item.title1}}</text>
						<text class="title2">{{item.title2}}</text>
					</view>
					<view class="title-desc">{{item.desc}}</view>
				</view>
				<view class="item-bottom">{{item.itemDesc}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mainContent:[
					{
						icon:"coupon-fill",
						title1:"立减",
						title2:"10元",
						desc:"开通首单立减",
						itemDesc:"品质优价更优"
					},
					{
						icon:"coupon-fill",
						title1:"下单即享",
						title2:"8.5折",
						desc:"终身不限次",
						itemDesc:"近10000家门店"
					},
					{
						icon:"coupon-fill",
						title1:"会员",
						title2:"精选",
						desc:"最低抵扣",
						itemDesc:"5亿用户推荐"
					},
				]
			}
		},
		methods:{
			backForward() {
				uni.$u.route({
					url: 'pages/order/order',
					type:"back"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content{
		background-color: #FFFFFF;
		width: 100%;
		.top{
			display: flex;
			justify-content: space-between;
			padding: 0 3%;
			.left{
				font-size: 20px;
				font-weight: 600;
			}
		}
		.main{
			display: flex;
			justify-content: space-around;
			.item{
				box-shadow:5px 5px 4px #e7e6e4;
				width: 30%;
				border: 1px solid #f4f4f5;
				border-radius: 8px;
				.item-top{
					height: 70px;
					display: flex;
					justify-content: center;
				}
				.item-center{
					text-align: center;
					margin-bottom: 5px;
					.title{
						font-weight: 550;
						height: 25px;
						line-height: 25px;
						.title2{
							color: red;
						}
					}
					.title-desc{
						font-size: 12px;
						color: #82848a;
					}
				}
			}
			.item-bottom{
				height: 30px;
				color: #FFFFFF;
				font-size: 14px;
				line-height: 30px;
				text-align: center;
				background-color: #434551;
				border-bottom: 1px solid #f4f4f5;
			}
		}
	}
</style>
