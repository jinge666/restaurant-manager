<template>
	<!-- v-if="show" -->
	<view class="content" v-if="show">
		<!-- 获取用户授权 -->
		<u-modal :title="title" :show="!isAuthorization" :closeOnClickOverlay="true" @close="show = false">
			<u-button 
			  slot="confirmButton"
			  text="一键获取微信信息" 
				icon="weixin-fill" 
				color="#0046F5" 
				iconColor="#ffff"
				shape="circle" 
				@click="getWeixinInfo"
				/>
		</u-modal>
		<!-- 注册登录 -->
		<!-- closeable  不可关闭 -->
		<u-popup @close="popClose" mode="bottom" :show="isAuthorization" :closeOnClickOverlay=false round=8>
			<view class="popup-user">
				<!-- 注册 -->
				<u--form :model="form" ref="uForm" v-if="isRegistered">
					<u-form-item labelWidth="60" label="昵称:" prop="nickName">
						<u-input placeholder="请输入昵称" v-model="form.nickName" border="bottom"></u-input>
					</u-form-item>
					<u-form-item labelWidth="60" label="手机号:" prop="phone" required>
						<u-input placeholder="请输入手机号" v-model="form.phone" type="number" border="bottom"></u-input>
					</u-form-item>
					<u-form-item labelWidth="60" label="密码:" prop="password" required>
						<u-input placeholder="请输入密码" v-model="form.password" type="password" border="bottom"></u-input>
					</u-form-item>
					<u-form-item labelWidth="60" label="确认密码:" prop="rePassword" required>
						<u-input placeholder="请输入密码" v-model="form.rePassword" type="password" border="bottom"></u-input>
					</u-form-item>
				</u--form>
				<!-- 登录 -->
				<u--form :model="form" ref="uForm" v-if="isLogin">
					<u-form-item labelWidth="60" label="手机号:" prop="phone" required>
						<u-input placeholder="请输入手机号" v-model="form.phone" type="number" border="bottom"></u-input>
					</u-form-item>
					<u-form-item labelWidth="60" label="密码:" prop="password" required>
						<u-input placeholder="请输入密码" v-model="form.password" type="password" border="bottom"></u-input>
					</u-form-item>
				</u--form>
				<view class="button">
					<u-button text="提交" :customStyle	="buttonStyle" @click="submit"></u-button>
					<u-button text="取消" :customStyle	="buttonStyle" @click="show = false"></u-button>
				</view>
				<view class="login-reg">
					<!-- isLogin -->
					<text :class="['common',{'word-color':isRegistered}]" @click="toRegister">账号注册</text>
					<text :class="['common','reg',{'word-color':isLogin}]" @click="toLogin">密码登录</text>
				</view>
				<view class="read-accept">
					点击登录/注册{{restaurant}},即表示与阅读并同意
					<view class="accept">
						<text>《隐私政策》</text>
						<text>《用户协议》</text>
					</view>
				</view>
			</view>
		  <!-- 登录 -->
			
		</u-popup>
	</view>
</template>

<script>
	import {restaurant}  from '@/config/config.js'
	import {mapMutations} from 'vuex'
	export default {
		name:"login",
		data() {
			return {
				show:false,
				// restaurant:restaurant,
				title:`${restaurant}欢迎您`,
				isAuthorization:true,   //是否已经获取微信授权
				isLogin:true,
				isRegistered:false,
				form:{
					nickName:'',
					password:'',
					phone:null,
					avatarUrl:''
				}, //初始化用户信息表单
				rules:{
					phone:[
						{
							required: true,
							message: '请输入手机号码',
							trigger:'blur'
						},
						{
							// 自定义校验规则
							validator:(rule,value,callback) => {
								return uni.$u.test.mobile(value)
							},
							message:'非正确手机号码',
							trigger:['change','blur']
						},
						{
							validator:(rule,value,callback) => {
								if(this.isRegistered) {
									// 查询数据库是否已经注册
									
								}
								return true
							},
							message:'该手机号码已经注册',
							trigger:'blur'
						}
					],
					password:[
						{
							required: true,
							message: '请输入密码',
							trigger:'blur'
						},
						// 正则判断为字母或数字
						{
							pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/g,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: '密码必须包含字母或数字，长度6-20'
						},
					],
					rePassword:[
						{
							// 自定义校验规则
							validator:(rule,value,callback) => {
								if(value != this.form.password) {
									return false
								}
								return true
							},
							message:'密码错误',
							trigger:['change','blur']
						}
					]
				},  //表单验证规则
				buttonStyle:{
					width:'80px',
					backgroundColor: '#e2e2e2'
				},     //按钮样式
			};
		},
		computed:{
			restaurant() {
				return this.restaurantName ? this.restaurantName : restaurant
			}
		},
		methods:{
			// 获取vuex中的mutation
			...mapMutations(['initUser']),
			// 打开
			open() {
				const value = uni.getStorageSync('userInfo');
				this.isAuthorization = value ? true : false
				this.show = true
			},
			popClose() {
				this.show = false
				this.isLogin = true
				this.isRegistered = false
			},
			// 获取用户微信身份信息
			getWeixinInfo(){
				uni.getUserProfile({
					desc:'Wexin',
					success: res => {
						this.form.nickName = res.userInfo.nickName
						this.form.avatarUrl = res.userInfo.avatarUrl
						this.isAuthorization = true
						this.toRegister()
						let that = this
						uni.setStorage({
						    key: 'userInfo',
						    data: res.userInfo,
						    success: function () {
									// 初始化userInfo
									const	userInfo = {
										avatarUrl:'',
										id:'',
										identity:'',
										nickName:'',
										phone:'',
										token:'',
									}
									userInfo.avatarUrl = that.form.avatarUrl
									userInfo.nickName = that.form.nickName
									that.initUser(userInfo)
						    }
						});
					},
					fail: () => {
						console.log('用户未授权！')
					}
				})
			},
			// 注册
			toRegister() {
				this.isRegistered = true
				this.isLogin = false
			},
			// 登录
			toLogin() {
				this.isLogin = true
				this.isRegistered = false
			},
			// 提交登录及注册
			submit(){
				this.$refs.uForm.validate().then(async res => {
					if(this.isLogin) {
						// 执行登录
						try{
							const res = await this.$u.api.login(this.form)
							uni.$u.toast('登陆成功~')
							this.initUser(res)
							this.show = false
							this.$emit('loginSuccess')
						}catch(e){
							uni.$u.toast(e.data)
						}
						
					}else if(this.isRegistered) {
						// 执行注册
						if(!this.form.avatarUrl) {
							const value = uni.getStorageSync('userInfo');
							this.form.avatarUrl = value.avatarUrl
						} 
						const res = await this.$u.api.registered(this.form)
						uni.$u.toast('注册成功')
					  this.isLogin = true
						this.isRegistered = false
					}
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
		},
		watch:{
			isLogin:{
				handler (newShow,oldShow) {
					if(this.show){
						this.$nextTick(function(){
							this.$refs.uForm.setRules(this.rules);
						})
					}
				},
				immediate:true
			},
			show(newShow,oldShow) {
				if(newShow) {
					this.$nextTick(function(){
						this.$refs.uForm.setRules(this.rules);
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
.content{
	.popup-user{
		margin: 100rpx 80rpx 0 80rpx;
		height: 850rpx;
		.button{
			margin:30rpx 0 50rpx 0;
			display: flex;
			justify-content: space-around;
		}
		.login-reg{
			font-size: 22rpx;
			margin-bottom: 20rpx;
			display: flex;
			justify-content: center;
			.common{
				display: inline-block;
			}
			.reg{
				margin-left: 50rpx;
			}
			.word-color{
				color: #2A80BB;
			}
		}
		.read-accept{
			font-size: 24rpx;
			text-align: center;
			.accept{
				color: #718BC1;
			}
		}
	}
}
</style>
