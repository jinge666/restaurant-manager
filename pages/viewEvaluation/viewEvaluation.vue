<template>
	<view class="content">
		<view class="album">
			<album-evaluation :userInfo="userInfo" :commentInfo="commentInfo"/>
		</view>
		<view class="evaluation">
			<view class="title">
				<text>菜品评价</text>
			</view>
			<view class="dishes">
				<view class="dishes-item" v-for="(item,index) in shopList" :key="index">
					<text>{{item.name}}</text>
					<view class="degree">
						<u--text prefixIcon="thumb-up" :type="item.evaluation == 'good' ? 'warning' : ''" :iconStyle="{fontSize: '19px',color:item.evaluation == 'good' ? '#F9AE3D' : ''}" text="满意"></u--text>
						<u--text prefixIcon="more-circle" :type="item.evaluation == 'general' ? 'warning' : ''" :iconStyle="{fontSize: '19px',color:item.evaluation == 'general' ? '#F9AE3D' : ''}" text="一般"></u--text>
						<u--text prefixIcon="thumb-down" :type="item.evaluation == 'poor' ? 'warning' : ''" :iconStyle="{fontSize: '19px',color:item.evaluation == 'poor' ? '#F9AE3D' : ''}" text="不满意"></u--text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import AlbumEvaluation from '@/components/AlbumEvaluation.vue'
	export default {
		data() {
			return {
				shopList:[],   //菜品列表
				orderId:null, //订单id
				commentInfo:{
					pictureList:[] //评论图片列表
				}, //评论信息
			}
		},
		components:{
			AlbumEvaluation,
		},
		computed:{
			userInfo () {
				return this.$store.getters.userInfo
			},
		},
		onLoad(option) {
			this.orderId = option.orderId
			this.getShopList()
			this.getComment()
		},
		methods: {
			// 获取shopList
			async getShopList() {
				const result = await this.$u.api.getShopList({orderId:this.orderId})
				this.shopList = result
			},
			// 获取评论信息及星级信息
			async getComment() {
				const result = await this.$u.api.getComment({orderId:this.orderId})
				this.commentInfo = result
			},
		},
	}
</script>

<style scoped lang="scss">
.content{
	height: 100%;
	width: 100%;
	background-color: #F4F4F4;
	padding-top: 4px;
	padding-bottom: 100px;
	.album{
		background-color: #FFFFFF;
		padding: 3% 0;
	}
	.evaluation{
		background-color: #FFFFFF;
		margin: 3%;
		padding: 2% 0;
		.title{
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.dishes{
			margin-top: 15px;
			.dishes-item{
				height: 40px;
				display: flex;
				justify-content: space-between;
			}
			.degree{
				width: 55%;
				display: flex;
				justify-content: space-around;
			}
		}
	}
}
</style>
