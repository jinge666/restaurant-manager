export default {
	state: {
		restaurant:{},
		swiperList:[]
	},
	getters: {},
	mutations: {
		initRestaurant(state,payload) {
			state.restaurant = payload
			console.log('state.restaurant',state.restaurant);
		},
		initSwiperList(state,payload) {
			state.swiperList = payload
			console.log('state.restaurant',state.swiperList);
		},
		pushSwiperList(state,payload) {
			state.swiperList.push(payload)
		},
		spliceSwiperList(state,payload) {
			console.log('payload',payload);
			state.swiperList.splice(payload.index,payload.number)
		}
	},
	actions: {}
}