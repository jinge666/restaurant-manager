<template>
	<view class="content">
		<view class="abs-body">
			<view class="icon-body">
					<u-icon name="shopping-cart" color="#ffffff" size="45" class="icon"></u-icon>
					<view class="number" v-if="shopNumber">{{shopNumber | max_99}}</view>
			</view>
		</view>
		<view class="center">
			<text v-if="!isVip">{{shopPrice | showPrice}}</text>
			<view class="is-vip" v-if="isVip">
				<text>{{shopPrice*0.85 | showPrice}}</text>
				<text v-if="shopPrice > 0" class="not-vip">{{shopPrice | showPrice}}</text>
			</view>
		</view>
		<view class="button" @click="submit">选好了</view>
	</view>
</template>

<script>
	export default {
		name:"ShopCart",
		data() {
			return {
				
			};
		},
		props:{
			shopList:{
				type:Array,
				default:() => []
			},
		},
		computed:{
			shopNumber() {
				let number = 0
				this.shopList.forEach(item => {
					number += item.number
				})
				return number
			},
			shopPrice() {
				let price = 0
				this.shopList.forEach(item => {
					price += item.price * item.number
				})
				console.log('shopPrice',price);
			  return price	
			}
		},
		filters:{
			// 最大只展示99
			max_99(value) {
				if(value > 99) {
					return '99+'
				}
				return value
			},
			// 展示价格
			showPrice(value) {
				if(value === 0) {
					return '您还未选商品'
				}
				return '￥' + value.toFixed(2) 
			}
		},
		methods:{
			submit() {
				if(this.shopPrice >0 && this.shopNumber > 0) {
					let value = this.shopPrice*0.85
					let shopPrice = this.isVip ? value.toFixed(2) : this.shopPrice
					this.$emit('submit',shopPrice)
				}else{
					uni.$u.toast('请添加商品！')
				}
			}
		}
	}
</script>

<style scoped lang="scss">
.content{
	margin: 0 3%;
	height: 60px;
	width: 100vw;
	background-color: #FFFFFF;
	border-top: 1px solid #EED9BA;
	position: fixed;
	bottom: 0px;
	display: flex;
	justify-content: space-between;
	.abs-body{
		height: 60px;
		width: 60px;
		position: relative;
		.icon-body{
			position: absolute;
			top: -15px;
			height: 100%;
			width: 100%;
			background-color: #FC6117;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			.number{
				width: 20px;
				height: 20px;
				line-height: 20px;
				text-align: center;
				font-size: 10px;
				background-color: #FFFFFF;
				border: 1px solid #FC6117;
				border-radius: 50%;
				color: #FC6117;
				position: absolute;
				left: 45px;
				z-index: 10;
			}
		}
	}
	.center{
		left: 80px;
		line-height: 60px;
		.is-vip{
			.not-vip{
				color: #909399;
					text-decoration: line-through;
					font-size: 22rpx;
					display: inline-block;
					margin-left: 5px;
			}
		}
	}
	.button{
		width: 25%;
		height: 100%;
		background-color: #FC6117;
		float: right;
		text-align: center;
		line-height: 60px;
		font-weight: 550;
	}

}
</style>
