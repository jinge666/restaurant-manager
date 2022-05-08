<template>
	<view class="content">
		<view class="list-item" v-for="item in orderList">
			<view class="item-top" @click="toDetail(item)">
				<image class="image" :src="picture" mode="aspectFit"></image>
				<view class="desc">
					<view class="status-name">
						<view class="restaurant-name">
							<text>{{restaurantName}}</text>
							<u-icon name="arrow-right"></u-icon>
						</view>
						<view class="status">{{item.status | getStatus}}</view>
					</view>
					<view class="top-time">{{$u.timeFormat(item.createTime, 'yyyy-mm-dd hh:MM:ss')}}</view>
				</view>
			</view>
			<view class="item-center" @click="toDetail(item)">
				<view class="tag"><u-tag :text="item.number ? item.number : '欢迎'" plain size="mini"></u-tag></view>
				<view class="note">{{item.note ? item.note : '当前顾客无备注'}}</view>
				<view class="price">￥{{item.price}}</view>
			</view>
		</view>	
		<u-empty mode="list" text="当前未创建订单" icon="http://cdn.uviewui.com/uview/empty/list.png" v-if="orderList.length == 0"/>
	</view>
</template>

<script>
	export default {
		data() {
			return{}
		},
		props:{
			orderList:{
				type:Array,
				default:() => []
			},
		},
		filters:{
			getStatus(value) {
				if(value == 1) {
					return '待消费'
				}else if(value == 2) {
					return '待完成'
				}else if(value == 3) {
					return '已完成'
				}else if(value == 4) {
					return '已退款'
				}
			},
		},
		computed:{
			picture() {
				return this.$store.getters.restaurant.pictureList ? this.$store.getters.restaurant.pictureList[0]?.url : ''
			},
			restaurantName() {
				return this.$store.getters.restaurant.name
			},
		},
		methods:{
			// 查看订单详情
			toDetail(item) {
				const orderDetail = JSON.stringify(item)
				uni.navigateTo({
				    url: `../orderDetail/orderDetail?orderDetail=${orderDetail}&manger=true`,
						type:'redirectTo'
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	.content{
		.list-item{
			background-color: #FFFFFD;
			margin: 3%;
			padding: 3%;
			box-shadow: 5px 5px 10px #f4f4f5;
			border-radius: 7px;
			.item-top{
				display: flex;
				align-items: center;
				.image{
					height: 50px;
					width: 50px;
				}
				.desc{
					width: 100%;
					margin: 0 30rpx;
					.status-name{
						display: flex;
						justify-content: space-between;
						.restaurant-name{
							display: flex;
							font-weight: 600;
						}
						.status{
							color: #757575;
							font-size: 29rpx;
						}
					}
					.top-time{
						margin-top: 3rpx;
						font-size: 21rpx;
						color: #757575;
					}
				}
			}
			.item-center{
				display: flex;
				align-items: center;
				.tag{
					width: 37px;
				}
				.note{
					width: 70%;
					font-size: 28rpx;
					margin-left: 30rpx;
					overflow : hidden;
					text-overflow : ellipsis;   //超出的显示省略号
					display : -webkit-box;
					-webkit-box-orient: vertical; //设置对其模式为竖向对齐
					-webkit-line-clamp : 2;  //设置多行行数
				}
			}
			.item-bottom{
				width: 100%;
				display: flex;
				flex-direction: row-reverse;
				margin-top: 23rpx;
				.evaluation{
					width: 25%;
				}
			}
		}
	}
</style>
