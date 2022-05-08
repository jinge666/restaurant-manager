<template>
	<view class="content">
		<m-form @nextStep="nextStep" v-if="step == 1" v-show="!loading"/>
		<create-food 
			@backStep="step = 1"
			@submit="submit"
			:form="form1" 
			v-if="step == 2" 
			ref="food"
			v-show="!loading"/>
			<u-loading-page :loading="loading" loading-mode="spinner" :loading-text="loadingText" font-size="24" bgColor="#4C4C4C" color="#4197EF"></u-loading-page>
	</view>
</template>

<script>
	import MForm from './MForm.vue'
	import CreateFood from './CreateFood.vue'
	export default {
		data() {
			return {
				step:1,
				form1:{},
				loading:false,
				loadingText:'正在创建您的店铺'
			}
		},
		components:{
			MForm,
			CreateFood
		},
		methods: {
			nextStep(form1) {
				this.form1 = form1
				this.step = 2
			},
			async submit(navCategory) {
				this.form1.navCategory = navCategory
				this.loading = true
				if(this.form1.id) {
					this.loadingText = '正在保存中...'
					console.log(this.form1);
					// 执行保存
					const result = await this.$u.api.saveRestaurant(this.form1)
				}else{
					this.loadingText = '正在创建您的店铺'
					// 执行创建
					const result = await this.$u.api.createRestaurant(this.form1)
				}
				uni.$u.route({
					url: 'pages/index/index',
					type:"reLaunch",
				})
				this.loading = false
			},
		}
	}
</script>

<style scoped lang="scss">
.content{
	margin:0 3% 0 3%;
}
</style>
