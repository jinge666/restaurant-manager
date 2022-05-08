<template>
	<view class="content">
		<block v-if="!loading">
			<MineDetail/>
			<VipItem/>
			<view class="_button">
				<u-button 
				shape="circle" 
				:text="buttonText" 
				size="normal"
				color="#FCDDA4" 
				:customStyle="buttonStyle"
				@click="becomeVip"/>
			</view>
		</block>
		<u-loading-page :loading="loading" loading-text="您即将成为我们的尊贵VIP~"></u-loading-page>
	</view>
</template>
<script>
	import MineDetail from '../mine/compents/MineDetail.vue'
	import VipItem from './components/VipItem.vue'
	export default {
		data() {
			return {
				buttonStyle:{
					color:"#964216",
					width:"96%"
				},
				loading:false
			}
		},
		components:{
			MineDetail,
			VipItem
		},
		computed:{
			buttonText() {
				if(this.$store.state.userInfo.userInfo.isVip == 1) {
					return '尊贵的vip，点我开始点餐'
				}
				return '立即开通188元/终身享受'
			},
		},
		methods: {
			async becomeVip(){
				if(this.$store.state.userInfo.userInfo.isVip == 1) {
					uni.$u.route({
						url: 'pages/order/order',
						type:"redirectTo"
					})
				}else{
					this.loading = true
				  let userId = this.$store.getters.userInfo.id
				  const result = await this.$u.api.becomeVip({userId})
				  this.$store.state.userInfo.userInfo.isVip = 1
					setTimeout(() => {
						this.loading = false
						uni.navigateBack({
							delta: 1
						});
					}, 1000);
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.content{
		._button{
			height: 50px;
			width: 100%;
			position: fixed;
			bottom: 0;
		}
	}
</style>
