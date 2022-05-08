<template>
	<view class="content"> 
		<block v-if="!loading">
			<!-- 第一个盒子 -->
			<view class="score common">
				<view class="restaurant">
					<u-avatar :src="restaurantPicture"></u-avatar>
					<text class="restaurant-name">{{restaurantName}}</text>
				</view>
				<view class="rate">
					<u-rate :count="count" v-model="value" size="40"></u-rate>
				</view>
			</view>
			<!-- 第二个盒子 -->
			<view class="note common">
				<text class="desc">您对我们的服务满意吗</text>
				<u--textarea v-model="note" placeholder="请输入您的建议(选填)" ></u--textarea>
			</view>
			<!-- 第三个盒子 -->
			<view class="upload common">
				<view>
					<u-upload
						:fileList="fileList"
						@afterRead="afterRead"
						@delete="deletePic"
						multiple
						:maxCount="9"
					/>
				</view>
				<view class="desc" v-if="fileList.length == 0">
					<text class="title">上传图片</text>
					<text class="title-desc">内容丰富的评价有机会成为优质评价哦</text>
				</view>	
			</view>
			<!-- 第四个盒子 -->
			<view class="evaluation common">
				<view class="title">
					<text>菜品评价</text>
					<view class="botton">
						<u-button type="primary" :plain="true" shape="circle" text="一键好评" @click="allGood"></u-button>
					</view>
				</view>
				<view class="dishes">
					<view class="dishes-item" v-for="(item,index) in shopList" :key="index">
						<text>{{item.name}}</text>
						<view class="degree">
							<u--text prefixIcon="thumb-up" :type="item.evaluation == 'good' ? 'warning' : ''" :iconStyle="{fontSize: '19px',color:item.evaluation == 'good' ? '#F9AE3D' : ''}" text="满意" @click="degree('good',index)"></u--text>
							<u--text prefixIcon="more-circle" :type="item.evaluation == 'general' ? 'warning' : ''" :iconStyle="{fontSize: '19px',color:item.evaluation == 'general' ? '#F9AE3D' : ''}" text="一般" @click="degree('general',index)"></u--text>
							<u--text prefixIcon="thumb-down" :type="item.evaluation == 'poor' ? 'warning' : ''" :iconStyle="{fontSize: '19px',color:item.evaluation == 'poor' ? '#F9AE3D' : ''}" text="不满意" @click="degree('poor',index)"></u--text>
						</view>
					</view>
				</view>
			</view>
			<!-- 底下盒子 -->
			<view class="bottom">
				<u-button type="primary" :plain="true" shape="circle" text="提交" @click="submit"></u-button>
			</view>
		</block>
		
		<u-loading-page :loading="loading" loading-text="感谢您的反馈~"></u-loading-page>
	</view>
</template>

<script>
	import {uploadFilePromise,deleteFilePromise} from '@/utils/upload.js'
	export default {
		data() {
			return {
				count:5,  // 最多可以选的星星数量
				value:0, // 选中的星星数量
				note:'', // 建议
				fileList:[], //上传图片
				shopList:[], //购物的信息
				orderId:null,  //评价的订单id
				loading:false
			}
		},
		onLoad(option) {
			const orderDetail = JSON.parse(option.orderDetail)
			this.orderId = orderDetail.id
			this.getShopList()
		},
		methods: {
			// 上传图片
			afterRead(event) {
				event.file.forEach(item => {
					this.fileList.push({
						...item,
						status:'uploading',
						message:'上传中'
					})
				})
				this.fileList.forEach( async(item,index) => {
					const result = await uploadFilePromise(item.url)
					this.fileList.splice(index,1,{url:result})
				})
			},
			// 删除图片
			deletePic(event) {
				let index = event.index
				this.fileList.splice(index,1)
				const nameIndex = event.file.url.lastIndexOf('/')
				const filename = event.file.url.substring(nameIndex+1)
				deleteFilePromise(filename)
			},
			// 获取shopList
			async getShopList() {
				const result = await this.$u.api.getShopList({orderId:this.orderId})
				this.shopList = result
			},
			// 评价
			degree(type,index) {
				this.shopList[index].evaluation = type
			},
			// 一键好评
			allGood() {
				this.shopList.forEach(item => {
					item.evaluation = 'good'
				})
			},
			// 提交
			submit() {
				this.validation().then(async() => {
					this.loading = true
					let fileList = this.fileList.map(item => {
						return item.url
					})
					let shopList = this.shopList.map(item => {
						return {
							evaluation:item.evaluation,
							foodId:item.id
						}
					})
					const params = {
						orderId:this.orderId,
						dregg:this.value,
						comments:this.note,
						fileList,
						shopList
					}
					const result = await this.$u.api.commentOrder(params)
					setTimeout(() => {
						this.loading = false
						uni.redirectTo({
							url: `../viewEvaluation/viewEvaluation?orderId=${this.orderId}`,
						});
					}, 2000);
				}).catch(err => {
					uni.$u.toast(err)
				})
			},
			// 验证是否通过评论最基本要求
			validation () {
				return new Promise((resolve,reject) => {
					if(!this.value) {
						return reject('请评分!')
					}else if(!this.note) {
						return reject('请填写评论建议！')
					}else{
						let isEvaluation = false
						this.shopList.forEach(item => {
							if(!item.evaluation) {
								isEvaluation = true
							}
						})
						if(isEvaluation == true) {
							reject('请完善菜品评价！')
						}
					}
					resolve()
				})
			}
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
	.common{
		background-color: #FFFFFF;
		margin: 3%;
		padding: 2% 0;
	}
	.score{
		padding-left: 3%;
		.restaurant{
			display: flex;
			align-items: center;
			justify-content: center;
			.restaurant-name{
				display: inline-block;
				margin-left: 3%;
			}
		}
		.rate{
			display: flex;
			justify-content: center;
		}
	}
	.note{
		padding: 3%;
		.desc{
			display: block;
			margin-bottom: 10px;
		}
	}
	.upload{
		padding: 3%;
		display: flex;
		.desc{
			display: flex;
			flex-direction: column;
			padding-top: 6%;
			.title-desc{
				font-size: 20rpx;
				color: #909399;
			}
		}
	}
	.evaluation{
		.title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.botton{
				margin-right: 5%;
				width: 30%;
			}
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
	.bottom{
		width: 96%;
		margin-left: 2%;
		background-color: #F4F4F4;
		position: fixed;
		bottom: 0;
	}
}
</style>
