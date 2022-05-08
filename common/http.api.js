const install = (vm) => {
	let api = {}
	const http = uni.$u.http
	// 注册接口
	api.registered = (params) => http.post('/users',params)
	// 登录接口
	api.login = (params) => http.post('/login',params)
	// 上传图片接口
	api.uploadFile = (params) => http.post('/upload/picture',params)
	// 删除图片接口
	api.deletePicture = (filename) => http.delete(`/picture/${filename}`)
	// 创建餐厅接口
	api.createRestaurant = (params) => http.post('/restaurant',params)
	// 获取餐厅信息接口
	api.getRestaurant = () => http.get('/restaurant')
	// 删除菜品导航栏接口
	api.delNavCagetory = (id) => http.delete(`/restaurant/delNavCagetory/${id}`)
	// 删除菜品接口
	api.delFood = (id) => http.delete(`/restaurant/delFood/${id}`)
	// 更新餐厅信息接口
	api.saveRestaurant = (params) => http.post('/restaurant/save',params)
	// 创建订单接口
	api.createOrder = (params) => http.post('/order',params)
	// 获取订单接口
	api.getOrder = (params) => http.get('/order',{params:params})
	// 修改订单状态接口
	api.changeOrder = (params) => http.post('/order/change',params)
	// 获取订单购物详情shopList
	api.getShopList = (params) => http.get('/order/shopList',{params:params})
	// 商家获取订单
	api.getMerchantList = (params) => http.get('/order/merchantList',{params:params})
	// 评论订单
	api.commentOrder = (params) => http.post('/order/comment',params)
	// 获取评论信息
	api.getComment = (params) => http.get('/order/comment',{params:params})
	// 获取所有评论信息
	api.getAllComment = (params) => http.get('/order/allComment',{params:params})
	// 成为vip
	api.becomeVip = (params) => http.post('/users/vip',params)
	// 通过identity获取用户
	api.getUserByIdentity = (params) => http.get('/users/list',{params})
	// 修改用户身份
	api.changeIdentity = (params) => http.post('/users/change',params)
	// 上传轮播图
	api.uploadSwiper = (params) => http.post('/restaurant/swiper',params)
	// 删除轮播图
	api.deleteSwiper = (id) => http.delete(`/restaurant/delSwiper/${id}`)
	// 获取所有轮播图
	api.getSwiper = () => http.get('/restaurant/swiper')
	
	// 将api挂载到this.$u
	uni.$u.api = api
}

export default {
	install
}