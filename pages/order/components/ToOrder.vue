<template>
	<view class="content">
		<view class="commodity">
			<!-- 左 -->
			<view class="order-left">
				<scroll-view scroll-y="true" class="scroll-Hei" :scroll-with-animation="true" :enhanced="true" :show-scrollbar="false">
					<block v-for="(item,index) in category" :key="index">
						<view class="itemize-text" :class="{active: index == trigger}" @click="itemIze(index,item.id)">
							<text>{{item.name}}</text>
						</view>
					</block>
				</scroll-view>
			</view>
			<!-- 右 -->
			<view class="order-right">
				<scroll-view scroll-y="true" class="scroll-Hei"  :scroll-with-animation="true" :enhanced="true" :show-scrollbar="false" :scroll-into-view="scroll_into" @scroll="scroLl">
					<block v-for="(item,index) in goods" :key="index">
					<view :id="item.categoryId" class="rig-height">
						<view class="image">
							<u--image :showLoading="true" :src="item.foodPicture" width="80px" height="80px" radius="8"></u--image>
						</view>
						<view class="item-right">
							<view class="food-name">{{item.foodName}}</view>
							<view class="food-price">
								<text v-if="!isVip">￥{{item.price}}</text>
								<view class="is-vip" v-if="isVip">
									<text>￥{{item.price * 0.85}}</text>
									<view class="not-vip">￥{{item.price}}</view>
								</view>
							  <view class="order-food">
							  	<u-icon name="plus" color="#000000" bold size="25" v-if="item.hasOrder === 0" @click="addOrder(item,index)"></u-icon>
									<view class="to-order" v-else>
										<u-icon name="minus-circle-fill" size="25" color="#FC6117" @click="reduceOrder(item.id,index)"/>
										<text class="number">{{item.hasOrder}}</text>
										<u-icon name="plus-circle-fill" size="25" color="#FC6117" @click="addOrder(item,index)"/>
									</view>
							  </view>
							</view>
						</view>
					</view>
					</block>
					<view style="height: 400rpx;"></view>
				</scroll-view>
			</view>
		</view>
		<ShopCart :shopList="shopList" @submit="submit"/>
		<u-loading-page :loading="loading" loading-text="正在为您创建订单..."></u-loading-page>
	</view>
</template>

<script>
	import ShopCart from '@/components/ShopCart.vue'
	export default {
		data() {
			return{
				trigger:0,//类目选中的值
				scroll_into:'',
				tophei:0,//滚动时距离顶部的高度
				heightset:[], //存储右边每一个分类菜品的高度
				shopList:[],  //存放购物列表
				goods:[], //存放菜品
				orderId:'', //订单id，标识是否已经创建orderId
				loading:false
			}
		},
		props:{
			form:{
				type:Object,
				default:() => {}
			}
		},
		components:{
			ShopCart
		},
		computed:{
			// 获取左侧导航分类
			category() {
				return this.form.navCategory?.map(item => {
					return {
						id: 'navCategory' + item.id,
						name:item.name,
					}
				})
			},
		},
		methods:{
			// 点击类目加上背景色,并将scroll_into改为当前需要滑动到的categoryid
			itemIze(index,id){
				this.trigger = index
				this.scroll_into = id
				setTimeout(()=>{
					this.scroll_into = ''
				},200)
			},
			// 滚动时执行的函数
			scroLl(event) {
				let scrollTop = event.detail.scrollTop
				if(scrollTop >= this.tophei){//上拉
					// 当前分类商品的高度小于滚动高度时跳转下一个分类
					if(scrollTop >= this.heightset[this.trigger]){
						this.trigger += 1
						if(this.trigger >= this.category.length -1) {
							this.trigger = this.category.length -1
						}
					}
				}else{//下拉
					// 当前分类商品的高度大于滚动高度时跳转下一个分类
					if(scrollTop < this.heightset[this.trigger - 1]){
						this.trigger -= 1
					}
				}
				
				this.tophei = scrollTop
			},
			//存储右边每一个分类菜品的高度
			getHeight () {
				const query = uni.createSelectorQuery().in(this)
				let m = {}; //设置对象存储不同的相加高度
				let height = 0  // 设置对应的高度
				query.selectAll('.rig-height').boundingClientRect(data => {
					data.forEach((item,index) => {
						m[item.id] = (m[item.id] || 0) + item.height
					})
					Object.values(m).forEach(item => {
						height += item
						this.heightset.push(height)
					})
				}).exec();
			},
			// 添加购物车
			addOrder(food,index) {
				this.goods[index].hasOrder += 1
				let isShop = false
				let shopIndex = 0
				// 判断是否已经加入购物车
				this.shopList.forEach((item,itemIndex) => {
					if(item.id === food.id) {
						isShop = true
						shopIndex = itemIndex
					}
				})
				if(!isShop) {
					this.shopList.push({
						id:food.id,
						name:food.foodName,
						number:this.goods[index].hasOrder,
						price:food.price
					})
				}else{
					this.shopList[shopIndex].number = this.goods[index].hasOrder
				}
			},
			// 减少或删除购物车
			reduceOrder (id,index) {
				this.goods[index].hasOrder -= 1
				let shopIndex = 0
				this.shopList.forEach((item,itemIndex) => {
					if(item.id === id) {
						shopIndex = itemIndex
					}
				})
				if(this.shopList[shopIndex].number > 0 ) {
					this.shopList[shopIndex].number -= 1
				}else{
					this.shopList.splice(shopIndex,1)
				}
			},
			async submit (shopPrice) {
				this.loading = true
				if(!this.orderId) {
					const orderDetail = {
						shopList:this.shopList,
						shopPrice,
						orderOther:{},
						restaurantId:this.$store.getters.restaurant.id
					}
					const result = await this.$u.api.createOrder(orderDetail)
					this.orderId = result.orderId
				}
				let shopList = JSON.stringify(this.shopList)
				setTimeout(() => {
					this.loading = false
					uni.navigateTo({
					    url: `../orderDetail/orderDetail?shopPrice=${shopPrice}&shopList=${shopList}&orderId=${this.orderId}`
					});
				}, 2000);
			}
		},
		watch:{
			// 监听form取值，将分类导航id传入每一个食物对象中
			form:{
				handler (value) {
					// 获取菜品
					this.form.navCategory?.forEach(item1 => {
						let categoryId = 'navCategory' + item1.id
						item1.food.forEach(item2 => {
							this.goods.push({
								categoryId,
								foodName:item2.foodName,
								foodId:item2.id,
								foodPicture:item2.foodPicture[0].url,
								price:item2.price,
								id:item2.id,
								hasOrder:0,
							})
						})
					})
					// 获取分类菜品高度
					this.$nextTick(function(){
						this.getHeight()
					})
				},
				deep:true,
				immediate:true
			}
		}
	}
</script>

<style scoped lang="scss">
	.content{
		.commodity{
			display: flex;
			position: fixed;
			top: 120rpx;
			left: 0;
			right: 0;
			.order-left{
				background-color: #fafafa;
				width: 150rpx;
				overflow-y: auto;
				.itemize-text{
					font-size: 27rpx;
					padding: 30rpx 10rpx;
					display: flex;
					align-items: center;
					color: #797979;
					
					text:nth-child(1){flex: 1;}
					text:nth-child(2){
						background-color: #eb5941;
						border-radius: 50%;
						font-size: 20rpx;
						color: #FFFFFF;
						width: 30rpx;
						height: 30rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						margin-left: 2rpx;
					}
			  }
				/* 点击分类列表加上背景色 */
				.active{
					background-color: #FFFFFF;
					color: #000000 !important;
				}
			}
			.order-right{
				background-color: #FFFFFF;
				flex: 1;
				overflow-y: auto;
				.rig-height{
					display: flex;
					.image{
						margin-top: 20rpx;
					}
					.item-right{
						width: 65%;
						margin: 20rpx 0 0 20rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						.food-price{
							width: 100%;
							color: #FC6117;
							display: flex;
							justify-content: space-between;
							.order-food{
								.to-order{
									display: flex;
									.number{
										display: inline-block;
										margin: 0 10rpx;
									}
								}
							}
							.is-vip{
								display: flex;
								align-items: flex-end;
								.not-vip{
									margin-left: 3px;
									color: #909399;
									text-decoration: line-through;
									font-size: 22rpx;
								}
							}
						}
					}
				}
			}
			.scroll-Hei{
				height: calc(100vh - 60px);
			}
		}
	}
</style>
