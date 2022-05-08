<template>
	<view class="content">
		<u--form :model="form" ref="uForm">
			<u-form-item labelWidth="70" label="店铺名称:" prop="name">
				<u-input placeholder="请输入店铺名称" v-model="form.name" border="none" :disabled="!manager"></u-input>
			</u-form-item>
			
			<u-form-item labelWidth="70" label="店铺简介:" prop="introduction">
				<u--textarea placeholder="输入店铺简介" v-model="form.introduction" :disabled="!manager" count/>
			</u-form-item>
			
			<u-form-item labelWidth="70" label="店铺地址:" prop="address">
				<u-input placeholder="请输入店铺地址" v-model="form.address" border="none" :disabled="!manager"></u-input>
			</u-form-item>
			
			<u-form-item labelWidth="70" label="店铺图片:" prop="address">
				<u-upload
				  v-if="manager"
				  :fileList="form.pictureList"
					@afterRead="afterRead"
					@delete="deletePic"
					deletable
					:maxCount="1"
				></u-upload>
				<image v-else :src="restaurantPicture" mode="aspectFill" style="width: 80px;height: 80px;"></image>
			</u-form-item>
			
			<u-form-item labelWidth="70" label="营业开始时间:" prop="beginDate">
				<u-cell title="开始时间" clickable isLink name="beginDate" @click="selectDate" :value="form.beginDate" :disabled="!manager"></u-cell>
			</u-form-item>
			
			<u-form-item labelWidth="70" label="营业结束时间:" prop="endDate">
				<u-cell title="结束时间" clickable isLink name="endDate" @click="selectDate" :value="form.endDate" :disabled="!manager"></u-cell>
			</u-form-item>
			
			<u-form-item labelWidth="70" label="左侧导航类别:" prop="navCategory">
				<view class="nav-category" v-for="(item,index) in form.navCategory">
					<u-input placeholder="请输入导航类别" v-model="form.navCategory[index].name" border="bottom"></u-input>
					<view class="nav-item" @click="delNav(index)">
						<u-icon name="close-circle-fill" size="20" color="#e45656"></u-icon>
					</view>
				</view>
				<view class="nav-icon" slot="right" @click="addNav">
					<u-icon name="plus-circle-fill" size="20" color="#5ac725"></u-icon>
				</view>
			</u-form-item>
		</u--form>
		
		<u-button type="primary" text="下一步" shape="circle" :customStyle="btnStyle" @click="nextStep"></u-button>
		<u-datetime-picker
			ref="datetimePicker"
			:show="beginShow"
			v-model="form.beginDate"
			mode="time"
			:formatter="formatter"
			@confirm="beginShow=false"
			@cancel="beginShow=false"/>
			
		<u-datetime-picker
			ref="datetimePicker"
			:show="endShow"
			v-model="form.endDate"
			mode="time"
			:formatter="formatter"
			@confirm="endShow=false"
			@cancel="endShow=false"/>
		<u-modal 
			:show="show" 
			content="该操作将永久删除该条导航类别,请谨慎操作" 
			showCancelButton 
			confirmText="删除"
			@cancel="show = false"
			@confirm="toDo"></u-modal>
	</view>
</template>

<script>
	import {uploadFilePromise,deleteFilePromise} from '../../utils/upload.js'
	import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				form:{
					name:'',
					navCategory:[
						{
							name:'',
							food:[
								{
									insert:true,
									foodName:'',
									foodPicture:[],
									price:null,
								}
							]
						}
					],
					introduction:'',
					address:'',
					beginDate:'',
					endDate:'',
					pictureList:[]
				}, //初始化用户信息表单
				rules:{
					name:[
						{
							required: true,
							message: '请填写店铺名称',
							trigger:'blur'
						}
					],
					navCategory:[
						{
							validator:(rule,value,callback) => {
								if(!this.form.navCategory[0].name) {
									return false
								}
								return true
							},
							message:'请输入类别',
							trigger:'blur'
						},
						{
							validator:(rule,value,callback) => {
								let nameList = []
								value.forEach(item => {
									nameList.push(item.name)
								})
								for (var i = 0; i < nameList.length; i++) {
									if(nameList.indexOf(nameList[i]) != i) {
											return false
									}
								}	
							},
							message:'请不要输入重复导航栏',
							trigger:'blur'
						}
					]
				},
				beginShow:false,  
				endShow:false,
				show:false,
				delIndex:'',  //记录要删除的index
				btnStyle:{
					marginTop:'30rpx'
				}
			}
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.uForm.setRules(this.rules)
		},
		created() {
			this.getForm()
		},
		methods: {
			// 获取vuex中的mutation
			...mapMutations(['initRestaurant']),
			// 获取form
			async	getForm () {
				if(this.$store.getters.restaurant.id) {
					this.form = this.$store.getters.restaurant
				}else{
				  const result = await this.$u.api.getRestaurant()
					this.initRestaurant(result)
					this.form = this.$store.getters.restaurant
				}
			},
			// 添加左侧导航类别
			addNav(){
				this.form.navCategory.push({
					name:'',
					insert:true,    //新加入保存操作时插入数据库
					food:[
						{
							insert:true,
							foodName:'',
							foodPicture:[],
							price:null,
						}
					]
				})
			},
			// 删除左侧导航类别
			delNav(index){
				if(this.form.navCategory.length > 1){
					// id存在删除数据库中的
					if(this.form.navCategory[index].id) {
						this.show = true
						this.delIndex = index
					}else{
						// 否则单纯删除
						this.form.navCategory.splice(this.delIndex,1)
					}
				}else{
					uni.$u.toast('至少有一个左侧导航类别！')
				}
			},
			// 确认删除
			toDo() {
				let navCategoryId = this.form.navCategory[this.delIndex].id
				this.form.navCategory.splice(this.delIndex,1)
				this.show = false
				this.$u.api.delNavCagetory(navCategoryId)
			},
			// 选择时间
			selectDate(dateType) {
				if(dateType.name === 'beginDate') {
					this.beginShow = true
				}else if(dateType.name === 'endDate') {
					this.endShow = true
				}
			},
			// 下一步
			nextStep() {
				this.$refs.uForm.validate().then(async res => {
				  this.$emit('nextStep',this.form)		
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			// 上传店铺图片
		 	async afterRead(event) {
				event.file.status = 'uploading',
				event.file.message = '上传中'
				this.form.pictureList.push(event.file)
				const result = await uploadFilePromise(event.file.url)
				console.log('result',result);
				this.form.pictureList.splice(0, 1, Object.assign({
					status: 'success',
					message: '',
					url: result
				}))
			},
			// 删除店铺图片
			deletePic(event) {
				const index = event.file.url.lastIndexOf('/')
				const filename = event.file.url.substring(index+1)
				this.form.pictureList.splice(event.index,1)
				deleteFilePromise(filename)
			}
		}
	}
</script>

<style scoped lang="scss">
	.nav-category{
		display: flex;
		.nav-item{
			margin-left: 5rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
	}
	.nav-icon{
		margin-left: 15rpx;
	}
</style>
