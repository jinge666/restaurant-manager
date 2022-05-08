export default {
	state: {
		userInfo:{
			avatarUrl:'',
			id:'',
			identity:'',
			nickName:'',
			phone:'',
			isVip:'',
			token:'',
		}
	},
	getters: {},
	mutations: {
		initUser(state,payload) {
			state.userInfo = payload
			console.log('state.userInfo',state.userInfo);
		}
	},
	actions: {}
}