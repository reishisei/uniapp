<template>


	<!-- <view class="u-home" :style="{height: uHomeHeight}"> -->
	<view class="u-home">
		<u-modal 
			:show="modalShow" 
			content='是否要删除此商品？' 
			@confirm="modalShow = false">
		</u-modal>
		<view class="u-page" >
			<u-toast ref="uToast"></u-toast>
			<!-- 空 -->
			<u-empty width="500" textSize="30" v-if="false" mode="data"
				icon="http://cdn.uviewui.com/uview/empty/car.png">
			</u-empty>
			<!-- list -->
			
				<view class="commodityPush_li">
					<view class="commodityPush_li_title">TITLE</view>
					<u--input
						class="commodityPush_li_title_input" 
						placeholder="请输入内容" 
						border="surround"
						:disabled="leftButtonState"
						v-model="boards.title">
					</u--input>
				</view>
				
				<u-cell-group 
					class="commodityPush_li" 
					customStyle="background: #ffffff;border-radius: 20rpx">
					<u-cell
						disabled="true"
						size="large"
						title="CLIENT"
						:label="firstName"
						value=""
						isLink>
					</u-cell>
				</u-cell-group>
				
				<view class="commodityPush_li">
					<view class="">DESCRIPTION</view>
					<u--input
						class="commodityPush_li_title_input" 
						placeholder="请输入内容" 
						border="surround" 
						:disabled="leftButtonState"
						v-model="boards.descriptionSuggestionBoard">
					</u--input>
				</view>
				
				<view class="commodityPush_li_switch">
					<view>Suggestion boards visible bu/others</view>
					<u-switch 
						size="50"
						v-model="goodsDetail.uSwitchValue" 
						@change="hancleSwitch">
					</u-switch>
				</view>
				
				<view class="commodityPush_li_Add" >
					<view>Selected Products/Looks</view>
					<view v-if="!leftButtonState" @click="handleAddItem" style="color: #ff9200">Add item</view>
					<view v-else @click="handleAddItem" style="color: #c9c9c9">Add item</view>
				</view>
				
				<delSlideLeft 
					ref="delSlideLefts"
					class="commodityPush_li_Add_item" 
					v-for="(item, index) in goodsArr" 
					:key="index"
					@delItem="handleSwipeAction(item, index)">
					<view class="commodityPush_li_Add_list">
						<view class="commodityPush_li_Add_list_image">
							<image :src="item.galleryAssets[0].assetBaseUrl + 'q_auto%2Cf_auto%2Cfl_lossy%2Cdpr_auto/w_250/' + item.galleryAssets[0].typology + '-' + item.galleryAssets[0].assetId + '.jpg'"></image>
						</view>
						<view class="commodityPush_li_Add_list_text">
							<view>{{ item.titleLabel.zh }}</view>
							<view>{{ item.formattedId }}</view>
							<view>{{ item.collection.label.zh }}</view>
						</view>
					</view>
				</delSlideLeft>
				
				<view class="commodityPush_li_Add_item_stop" v-show="leftButtonState"></view>
					
			
			<view class="commodityPush_button">
				<button v-if="butType === 0" @click="handleSave(0)">Save</button>
				<button v-if="butType === 1" @click="handleSave(1)">Send for Review</button>
				<button v-if="butType === 2" @click="handleSave(2)">Send</button>
			</view>
			
		</view>
	</view>

</template>

<script>
	var testModule = uni.requireNativePlugin("DCTestUniPlugin-TestModule")
	import api from "@/api/index.js"
	import qs from 'qs'
	import moment from 'moment'
	import image from "uview-ui/libs/config/props/image";
	import delSlideLeft from '../../../components/comSlideleft/index.vue'
	export default {
		components: {
			delSlideLeft
		},
		data() {
			return {
				// 建议单信息
				boards: {
					title: '',
					descriptionSuggestionBoard: ''
				},
				// 建议单商品id list
				goodsId: [],
				// 建议单商品详情
				goodsArr: [],
				// direction: 0,
				modalShow:false,
				leftButtonState: false,
				
				uHomeHeight: 0,
				goodsDetail: {
					uSwitchValue: ''
				},
				firstName: '',
				havGoods: 0,
				butType: 0,// null 初始状态，0 有商品未保存，1 以保存未审核，2 已审核未分享
				// 建议单ID
				idSuggestionBoard: '',
			};
		},
		onLoad(option) {
		},
		onShow() {
			let that = this
			that.firstName = uni.getStorageSync('firstName');
			that.getSuggestGoods()
			// uni.removeStorage({
			// 	success: function (res) {}
			// })
			uni.getSystemInfo({
				success: function(res) {
					that.uHomeHeight = res.windowHeight + "px"
				}
			})
		},
		methods: {
			// 获取建议单商品数据
			getSuggestGoods() {
				console.log('商品加载');
				
				this.goodsId = uni.getStorageSync('goodsId');
				if(this.goodsId.length > 0) {
					const goodsSting = qs.stringify({productIds: this.goodsId}, { indices: false });
					api.getSuggestGoods(goodsSting).then(res => {
						if(res.code === 200) {
							console.log('getSuggestGoods', res)
							this.goodsArr = res.data;
							this.goodsArr = [...this.goodsArr];
							console.log('goodsSting', this.goodsArr);
						}
					}).catch(err => {
					});
				} else {
					this.goodsArr = [];
				}
			},
			// 开关选择
			hancleSwitch() {
			},
			// add item
			handleAddItem() {
				uni.navigateTo({
					url: '/pages/menu/commodityLevelOne/index'
				})
			},
			// 图片列表删除按钮
			handleSwipeAction(item, index) {
				console.log('delete goods', index, this.$refs.delSlideLefts[index].resetBut());
				let loaclGoodsArr = [];
				// 从本地获取商品ID
				if(uni.getStorageSync('goodsId') && uni.getStorageSync('goodsId').length > 0) {
					loaclGoodsArr = uni.getStorageSync('goodsId');
					let index = loaclGoodsArr.indexOf(item.id);
					// 本地存在就删除
					if(index > -1) {
						loaclGoodsArr.splice(index, 1)
					}
					uni.setStorageSync('goodsId', loaclGoodsArr)
				}
				this.getSuggestGoods();
			},
			// save
			handleSave(i) {
				// 0 = 创建建议单，1 = 审核，2 = 分享
				if(i == 0){
					if(this.goodsArr.length <= 0) {
						uni.showToast({
							icon: "none",
							title: "请添加商品",
							duration: 2000
						});
						return
					}
					if(!this.boards.title) {
						uni.showToast({
							icon: "none",
							title: "必须填写建议单标题",
							duration: 2000
						});
						return;
					}
					
					const gigyaId = uni.getStorageSync('gigyaId');
					const sugGoodsArr = [];
					this.goodsId.forEach(item => {
						const goodsObj = {
							idElement: item,
							typeElement: 'PRODUCT',
							divisionElement: 'FASHION',
						}
						sugGoodsArr.push(goodsObj);
					})
					const obj = {
						nameSuggestionBoard: this.boards.title,
						descriptionSuggestionBoard: this.boards.descriptionSuggestionBoard,
						codeBoutique: '01',
						countryBoutique: 'CN',
						divisionBoutique: 'FASHION',
						clientIdSuggestionBoard: gigyaId,
						elementsSuggestionBoard: sugGoodsArr
					}
					console.log('createOrder', obj)
					api.createOrder(obj).then(res => {
						if(res.code === 200) {
							this.butType = 1;
							this.leftButtonState = true;
							this.idSuggestionBoard = res.data.idSuggestionBoard
							this.$refs.uToast.show({
								type: 'default',
								title: '默认主题',
								message: "保存成功",
							})
						}else{
							uni.showToast({
								title: res.msg
							})
						}
					}).catch(err => {
					});
					
				}
				if(i == 1){
					if(this.goodsArr.length){
						uni.showLoading({
							title: '审核中...'
						});
						setTimeout(()=>{
							this.butType = 2;
							uni.hideLoading();
						},800)
					}else{
						uni.showToast({
							icon: "none",
							title: "审核失败!",
							duration: 2000
						});
					}
				}
				if(i == 2){
					
					api.creatUseClient({
						idSuggestionBoard: this.idSuggestionBoard
					}).then(res => {
						if(res.code === 200) {
							// console.log(this.goodsArr[0], '==========')
							
							let item = this.goodsArr[0].galleryAssets[0]
							
							let a = item?.assetBaseUrl
							
							let b = item?.typology
							
							let c = item.assetId
							
							let imgPath = a + 'q_auto%2Cf_auto%2Cfl_lossy%2Cdpr_auto/w_180/' + b + '-' + c + '.jpg'
							
							// 调用异步方法
							testModule.testAsyncFunc({
								'name': this.boards.title,
								'summary': imgPath
							},
							(ret) => {
								uni.navigateBack({
									delta: 2
								})
								uni.showToast({
									title:'调用异步方法 ' + ret,
									icon: "none"
								})
							})
						}
						if(res.code == 500){
							uni.showToast({
								title: `分享失败${res.msg}!`,
								icon:"none",
								mask: true,
								duration: 2000
							})
						}
					})
					
				}
			},
		},
		filters: {
			dateFilter(val) {
				if(val) {
					return moment(new Date(val)).format('YYYY-MM-DD HH:MM')
				} else {
					return ""
				}
			}
		},
	};
</script>

<style scoped lang="less">
	.u-home {
		min-height: 100vh;
		background-color: #f5f5f5;
	}
	/* 隐藏滚动条 */
	scroll-view ::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
		color: transparent;
	}

	img {
		width: 100%;
		height: 100%;
	}

	image {
		width: 100%;
		height: 100%;
	}

	html,
	body {
		width: 100%;
		height: 100%;
		overflow: hidden;

		.u-home {
			width: 100%;
			background: #f5f5f5;
			.u-page {
				margin: 30rpx;
				padding: 0 0 300rpx 0;
				.commodityPush_li_Add_item_stop{
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					z-index: 999;
				}
				scroll-view{
					height: 100%;
				}
				.u-list {
					height: 100% !important;
				}

				.commodityPush_li{
					margin: 0 0 20rpx 0;
					.commodityPush_li_title{
						position: relative;
						width: 110rpx;
					}
					.commodityPush_li_title::after{
						content: '*';
						position: absolute;
						right: 0;
						top: 0;
						color: red;
					}
					.commodityPush_li_title_input{
						background: #ffffff;
					}
				}
				.commodityPush_li_switch{
					display: flex;
					background: #ffffff;
					justify-content: space-between;
					align-items: center;
					padding: 12rpx 18rpx;
					border-radius: 8rpx;
					border: 1rpx solid #dadbde;
					view:first-child{
						font-size: 24rpx;
						width: 77%;
					}
				}
				.commodityPush_li_Add{
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin: 20rpx 0;
					position: relative;
					view:last-child{
						color: #ff9200;
					}

				}
				.commodityPush_li_Add_item{
					margin: 0 0 20rpx 0;
					border-radius: 20rpx;
					background: #ffffff;
					position: relative;
					overflow: hidden;
					.commodityPush_li_Add_list{
						display: flex;
						align-items: center;
						color: black;
						.commodityPush_li_Add_list_image{
							width: 200rpx;
							height: 200rpx;
							margin: 0 20rpx 0 0;
						}
						.commodityPush_li_Add_list_text{
							font-size: 24rpx;
						}
					}
				}
				.commodityPush_button{
					width: -webkit-fill-available;
					position: fixed;
					bottom: 30rpx;
					left: 0;
					z-index: 999;
					display: flex;
					padding: 0 40rpx;
					button{
						width: 100%;
						background: #3a3a3a;
						color: #ffffff;
					}
					.commodityPush_button_li{
						width: 45%;
						height: 100%;
						font-size: 30rpx;
					}
				}
				
			}
		}
	}
</style>
