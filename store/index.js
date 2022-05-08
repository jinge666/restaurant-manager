import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import userInfo from './userInfo.js'
import restaurant from './restaurant.js'

const store = new Vuex.Store({
	modules:{
		userInfo,
		restaurant
	},
	getters:{
		userInfo (state ) {
			return state.userInfo.userInfo
		},
		restaurant (state) {
			return state.restaurant.restaurant
		},
	}
})

export default store