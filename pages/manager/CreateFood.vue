<template>
	<view class="content">
		 <u-collapse accordion :value="value" ref="collapse">
			<u-collapse-item v-for="(fatherItem,fatherIndex) in navCategory" :title="fatherItem.name" :name="fatherIndex">
					<view class="food-coll">
						<view class="coll-item" v-for="(item,index) in fatherItem.food">
							<view class="upload">
								<text class="upload-desc">上传菜品图片</text>
								<u-upload
								  :fileList="item.foodPicture"
									@afterRead="afterRead"
									@delete="deletePic"
									deletable
									:name="fatherIndex + '-' + index"
									:maxCount="1"
								></u-upload>
							</view>
							<view class="input-food">
								<view class="last-input">
									<u-input placeholder="请输入菜品名字" v-model="item.foodName"></u-input>
								</view>
								<view class="next-input">
									<u-input placeholder="请输入菜品金额" v-model="item.price" type="number"></u-input>
								</view>
							</view>
							<view class="control">
								<u-icon name="close-circle-fill" size="30" color="#e45656" @click="delFood(fatherIndex,index)"></u-icon>
								<u-icon name="plus-circle-fill" size="30" color="#5ac725" @click="addFood(fatherIndex,index)" v-if="index === fatherItem.food.length - 1"></u-icon>
							</view>
						</view>
					</view>
			</u-collapse-item>
		</u-collapse>
			
		<view class="manger-button">
			<u-button text="上一步" :customStyle="btnStyle" @click="backStep"></u-button>
			<u-button type="primary" text="提交" :customStyle="btnStyle" @click="submit"></u-button>
		</view>
		
		<u-modal
			:show="show" 
			content="该操作将永久删除该菜品,请谨慎操作" 
			showCancelButton 
			confirmText="删除"
			@cancel="show = false"
			@confirm="toDo"></u-modal>
			
	</view>
</template>

<script>
	import {uploadFilePromise,deleteFilePromise} from '../../utils/upload.js'
	export default {
		data() {
			return {
				btnStyle:{
					width:"35%"
				},
				value:0,
				navCategory:[],
				show:false,
				delFatherIndex:'',  //记录删除的菜品fatherIndex
				delIndex:'',  //记录删除菜品的index
			}
		},
		props:{
			form:{
				type:Object,
				default:{}
			}
		},
		created() {
			this.navCategory = this.form.navCategory
		},
		methods:{
			// 回到上一步
			backStep () {
				this.$emit('backStep')
			},
			// 添加菜品
			addFood(fatherIndex,index) {
				this.value = fatherIndex
					// fatherIndex:类别的index
					// index：菜品的index
					this.navCategory[fatherIndex].food.push({
						insert:true,
						foodName:'',
						foodPicture:[],
						price:null,
					})
					this.init()
			},
			// 删除菜品
			delFood(fatherIndex,index) {
				this.value = fatherIndex
				if(this.navCategory[fatherIndex].food.length > 1) {
					if(this.navCategory[fatherIndex].food[index].id) {
						this.delFatherIndex = fatherIndex
						this.delIndex = index
						this.show = true
					}else {
						this.navCategory[fatherIndex].food.splice(index,1)
						this.init()
					}
				}else{
					uni.$u.toast('至少有一个菜品！')
				}
			},
			// 确认删除
			toDo() {
				let foodId = this.navCategory[this.delFatherIndex].food[this.delIndex].id
				this.navCategory[this.delFatherIndex].food.splice(this.delIndex,1)
				this.init()
				this.show = false
				this.$u.api.delFood(foodId)
			},
			// 重新计算高度
			init() {
				this.$nextTick(function(){
					this.$refs.collapse.init()
				})
			},
			// 读取图片
			async afterRead(event) {
				let index = event.name.split('-')
				// 菜品分类index
				let fatherIndex = index[0]
				// 菜的index
				let sonIndex = index[1]
				event.file.status = 'uploading'
				event.file.mesage = '上传中'
				this.navCategory[fatherIndex].food[sonIndex].foodPicture.push(event.file)
				const result = await uploadFilePromise(event.file.url)
				this.navCategory[fatherIndex].food[sonIndex].foodPicture.splice(0,1,Object.assign({
					status:'success',
					message:'',
					url:result
				}))
			},
			// 删除图片
			deletePic(event) {
				let index = event.name.split('-')
				// 菜品分类index
				let fatherIndex = index[0]
				// 菜的index
				let sonIndex = index[1]
				console.log('index',index);
				const nameIndex = event.file.url?.lastIndexOf('/')
				const filename = event.file.url?.substring(nameIndex+1)
				this.navCategory[fatherIndex].food[sonIndex].foodPicture.splice(0,1)
				deleteFilePromise(filename)
			},
			submit() {
				this.$emit('submit',this.navCategory)
			}
		}
	}
</script>

<style scoped lang="scss">
	.content{
		.food-coll{
			.coll-item{
				display: flex;
				.upload{
					.upload-desc{
						font-size: 22rpx;
						color: #767676;
					}
				}
				.input-food{
					display: flex;
					flex-direction: column;
					justify-content: space-around;
				}
				.control{
					margin-left: 8rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
				}
			}
		}
	}
	.manger-button{
		display: flex;
		justify-content: space-around;
	}
</style>
