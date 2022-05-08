<template>
	<view class="content">
		<view class="item" v-for="(item,index) in comments" :key="index"> 
			<album-evaluation :userInfo="item.userInfo" :commentInfo="item.commentInfo"/>
		</view>
		<view class="empty">
			<u-empty
			  mode="data" 
				text="暂无评论" 
				icon="http://cdn.uviewui.com/uview/empty/data.png" 
				v-if="comments.length == 0"
			/>
		</view>
		<tab-bar :value="value"/>
	</view>
</template>

<script>
	import AlbumEvaluation from '@/components/AlbumEvaluation.vue'
	import TabBar from '@/components/TabBar'
	export default {
		data() {
			return {
				limit:8,
				offset:0,
				comments:[],
				value:'chat'
			}
		},
		created() {
			this.getAllComment()
		},
		components:{
			AlbumEvaluation,
			TabBar
		},
		methods: {
			// 获取所有评论消息
			async getAllComment() {
				const params = {
					limit:this.limit,
					offset:this.offset
				}
				const result = await this.$u.api.getAllComment(params)
				this.comments = result
			}
		}
	}
</script>

<style scoped lang="scss">
	.content{
		height: 100vh;
		background-color: #F4F4F4;
		padding-top: 4px;
		padding-bottom: 100px;
		.item{
			background-color: #FFFFFF;
			padding: 3% 0;
			padding-right: 3%;
		}
	}
</style>
