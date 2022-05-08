<template>
	<view class="all-body">
		<view class="content">
			<view class="order-body">
				<view class="rest-detail">
					<view class="rest-desc">
						<image class="image" :src="picture" mode="aspectFit"></image>
						<text class="rest-name">{{restaurantName}}</text>
					</view>
					<text class="to-order" v-if="status <= 1 && !manger">加单</text>
				</view>
				<view class="order-detail">
					<u-grid :border="false">
						<u-grid-item>
							<view class="title title-first">名称</view>
							<block v-for="(item,index) in shopList" :key="index">
								<view class="item item-left">{{item.name}}</view>
							</block>
						</u-grid-item>
						<u-grid-item>
							<view class="title">数量</view>
							<block v-for="(item,index) in shopList" :key="index">
								<view class="item item-center">x {{item.number}}</view>
							</block>
						</u-grid-item>
						<u-grid-item>
							<view class="title">价格</view>
							<block v-for="(item,index) in shopList" :key="index">
								<view class="item item-right">￥{{item.price}}</view>
							</block>
						</u-grid-item>
					</u-grid>
					<view class="order-price">
						<text class="desc">小计￥</text>
						<text class="price">{{shopPrice}}</text>
					</view>
				</view>
			</view>
			
			<view class="order-other" v-if="!loading">
				<u--form labelPosition="left" :model="orderOther" ref="form1">
					<u-form-item label="人数:" prop="number" borderBottom @click="toSelect" required>
						<u--input v-model="orderOther.number" disabled disabledColor="#ffffff" placeholder="请选择人数" border="none"></u--input>
						<u-icon slot="right" name="arrow-right" v-if="status <= 1"></u-icon>
					</u-form-item>
					<u-form-item label="备注:" borderBottom>
						<u--textarea v-model="orderOther.note" :disabled="status > 1" placeholder="请输入内容" ></u--textarea>
					</u-form-item>
				</u--form>	
			</view>
			<u-action-sheet :actions="list" :title="title" :show="show" :safeAreaInsetBottom="true" closeOnClickOverlay @select="selectPerson"></u-action-sheet>
		</view>
		<view class="bottom" v-show="!loading">
			<view class="customer" v-if="!manger && status <= 1 && !loading">
				<view class="left">总计￥{{shopPrice}}</view>
				<view class="right" @click="submit">微信支付￥{{shopPrice}}</view>
			</view>
			<view class="merchants" v-if="manger && status == 2 && !loading">
				<u-button type="primary" :plain="true" text="确认完成" :customStyle="{height:'100%'}" @click="confirm"></u-button>
			</view>
		</view>
		<u-loading-page :loading-text="loadingText" :loading="loading"></u-loading-page>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopList:[],
				shopPrice:0,
				orderOther:{
					number:'',
					note:''
				},
				show:false,
				list:[
					{name:'1人'},
					{name:'2人'},
					{name:'3人'},
					{name:'4人'},
					{name:'5人'},
					{name:'6人'},
					{name:'包厢'},
				],
				rules:{
					number:[
						{
							// 自定义校验规则
							validator:(rule,value,callback) => {
								if(!this.orderOther.number) {
									return false
								}else{
								  return true	
								}
							},
							message:'请选择用餐人数',
							trigger:['change','blur']
						},
					]
				},
				loading:false,
				orderId:0,  //订单id
				status:0, //订单状态
				manger:false,  //是否是商家
				loadingText:'正在支付中',
			}
		},
		onLoad(option) {
			if(option.shopList) {
				// 从点单页面过来
				this.shopList = JSON.parse(option.shopList)
				this.shopPrice = option.shopPrice
				this.orderId = option.orderId
				this.status = 1
			}else{
				// 从订单页面过来
				this.manger = option.manger
				const orderDetail = JSON.parse(option.orderDetail)
				this.shopPrice = orderDetail.price
				this.orderId = orderDetail.id
				this.orderOther.number = orderDetail.number ? orderDetail.number : ''
				this.orderOther.note = orderDetail.note ? orderDetail.note : ''
				this.status = orderDetail.status
				this.getShopList()
			}
		},
		onReady() {
			this.$refs.form1.setRules(this.rules);
		},
		computed:{
			picture() {
				return this.$store.getters.restaurant.pictureList[0]?.url
			},
			restaurantName() {
				return this.$store.getters.restaurant.name
			}
		},
		methods: {
			// 打开选人数菜单
			toSelect () {
				if(this.status <= 1) {
					this.show = true
				}
			},
			// 选择用餐人数
			selectPerson(data) {
				this.orderOther.number = data.name
				this.show = false
			},
			async submit () {
				this.loading = true
				this.$refs.form1.validate().then(async res => {
					// 改变order的状态
					const params = {
						orderId:this.orderId,
						status:2,
						orderOther:this.orderOther
					}
					const result = await this.$u.api.changeOrder(params)
					setTimeout(() => {
						this.loading = false
						uni.$u.route({
							url: 'pages/orderList/orderList',
							type:"reLaunch"
						})
					},2000)
				}).catch(errors => {
					console.log(errors);
					uni.$u.toast('请选择用餐人数！')
				})
			},
			// 获取点餐shopList，从订单页过来需要获取
		  async getShopList () {
				console.log({orderId:this.orderId});
				const result = await this.$u.api.getShopList({orderId:this.orderId})
				this.shopList = result
				console.log('this.shopList',this.shopList);
			},
			// 确认完成
			async confirm () {
				this.loadingText = '确认中'
				this.loading = true
				const params = {
					orderId:this.orderId,
					status:3,
				}
				const result = await this.$u.api.changeOrder(params)
				setTimeout(() => {
					this.loading = false
					uni.$u.route({
						url: 'pages/orderManage/orderManage',
						type:"reLaunch"
					})
				},2000)
			}
		}
	}
</script>

<style scoped lang="scss">
.all-body{
	.content{
		background-color: #F1F1F1;
		padding: 30px 3%;
		.order-body{
			padding: 5% 4%;
			background-color: #FFFFFF;
			border-radius: 15px;
			.rest-detail{
				display: flex;
				justify-content: space-between;
				align-items: center;
				box-shadow: 0 0 10px #F1F1F1;
				.rest-desc{
					display: flex;
					align-items: center;
					.image{
						height: 40px;
						width: 40px;
					}
					.rest-name{
						display: inline-block;
						margin-left: 8px;
					}
				}
				.to-order{
					color: #FE5F17;
				}
			}
		}
		.order-detail{
			margin-top: 40rpx;
		  margin-bottom: 120rpx;
			.title{
				font-size: 27rpx;
				margin-bottom: 20rpx;
			}
			.title-first{
				width: 100%;
			}
			.item{
				height: 40px;
				line-height: 40px;
			}
			.item-left{
				width: 100%;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.order-price{
				float: right;
				margin: 20rpx 40rpx 0 0;
				.price{
					font-size: 80rpx;
					font-weight: 600;
				}
			}
		}
		.order-other{
			margin: 30px 0 50px 0;
			padding: 5% 4%;
			background-color: #FFFFFF;
			border-radius: 15px;
		}
	}
	.bottom{
		z-index: 1;
		width: 100%;
		height: 50px;
		line-height: 50px;
		position: fixed;
		bottom: 0;
		display: flex;
		.merchants{
			width: 100%;
		}
		.customer{
			width: 100%;
			display: flex;
			.left{
				padding-left: 8px;
				color: #FFFFFF;
				width: 60%;
				background-color: #333333;
			}
			.right{
				padding-left: 8px;
				width: 40%;
				background-color: #FD6117;
				color: #362723;
			}
		}
	}
}
</style>
