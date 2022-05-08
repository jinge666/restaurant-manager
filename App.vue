<script>
	import {mapMutations} from 'vuex'
	export default {
		onLaunch: function() {
			// 初始化userInfo
		  const	userInfo = {
				avatarUrl:'',
				id:'',
				identity:'',
				nickName:'',
				phone:'',
				token:'',
			}
			const value = uni.getStorageSync('userInfo');
			userInfo.avatarUrl = value.avatarUrl
			userInfo.nickName = value.nickName
			this.initUser(userInfo)
			this.getRestaurant()
			this.getSwiperList()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			// 获取vuex中的mutation
			...mapMutations(['initRestaurant','initUser','initSwiperList']),
			// 获取餐厅信息
			async	getRestaurant () {
				if(!this.$store.getters.restaurant.id) {
				  const result = await this.$u.api.getRestaurant()
					console.log('result',result);
					this.initRestaurant(result)
				}
			},
			async getSwiperList () {
				const result =await this.$u.api.getSwiper()
				this.initSwiperList(result)
			}
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
</style>
