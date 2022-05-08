<template>
	<view>
		<my-swiper :height="300" :swiperList="swiperList"/>
		<view class="title">
			请选择上传图片
			<u-upload
				:fileList="fileList"
				@afterRead="afterRead"
				@delete="deletePic"
				name="3"
				:maxCount="5"
				:previewFullImage="true"
			></u-upload>
		</view>
	</view>
</template>

<script>
	import MySwiper from '@/components/swiper.vue'
	import {mapMutations} from 'vuex'
	import {uploadFilePromise,deleteFilePromise} from '../../utils/upload.js'
	export default {
		data() {
			return {
				fileList:[],
			}
		},
		components:{
			MySwiper
		},
		onReady() {
			this.getSwiper()
		},
		methods: {
			...mapMutations(['pushSwiperList','spliceSwiperList']),
			// 读取图片
			async afterRead(event) {
				event.file.status = 'uploading'
				event.file.mesage = '上传中'
				this.fileList.push(event.file)
				let index = this.fileList.length - 1
				const result = await uploadFilePromise(event.file.url)
				const swiperMessage =await this.$u.api.uploadSwiper({url:result})
				swiperMessage.url = result
				console.log(result);
				this.pushSwiperList(swiperMessage)
				this.fileList.splice(index,1,Object.assign({
					status:'success',
					message:'',
					url:result
				}))
			},
			// 删除图片
			async deletePic(event) {
				let index = event.index
				let id = this.swiperList[index]?.id
				const nameIndex = event.file.url?.lastIndexOf('/')
				const filename = event.file.url?.substring(nameIndex+1).split('.')[0]
				this.fileList.splice(index,1)
				this.spliceSwiperList({index,number:1})
				deleteFilePromise(filename)
			 	this.$u.api.deleteSwiper(id)
			},
			// 获取轮播图资源
			async getSwiper() {
				this.fileList.push(...this.swiperList)
			}
		}
	}
</script>

<style scoped lang="scss">
.title{
	margin: 20rpx;
}
</style>
