export default {
	computed:{
		// 餐厅照片
		restaurantPicture() {
			return this.$store.getters.restaurant.pictureList ? this.$store.getters.restaurant.pictureList[0]?.url : ''
		},
		// 餐厅名字
		restaurantName() {
			return this.$store.getters.restaurant.name
		},
		// 管理员
		administrator() {
			return this.$store.getters.userInfo.identity == 4
		},
		// 店长
		manager() {
			return this.$store.getters.userInfo.identity == 3
		},
		// 服务员
		waiter() {
			return this.$store.getters.userInfo.identity == 2
		},
		// 客人
		guest() {
			return this.$store.getters.userInfo.identity == 1
		},
		// vip
		isVip() {
			return this.$store.getters.userInfo.isVip === 1
		},
		swiperList() {
			return this.$store.state.restaurant.swiperList
		}
	}
}