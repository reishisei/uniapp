<template>

	<!-- <view class="u-home" :style="{height: uHomeHeight}"> -->
	<view class="u-home">
		<view class="u-page">
			<u-toast ref="uToast"></u-toast>
			<!-- 空 -->
			<u-empty
				width="500"
				textSize="30"
				v-if="Boolean(goodsArr.length) == false"
				mode="data" 
				icon="http://cdn.uviewui.com/uview/empty/car.png">
			</u-empty>
			<!-- list -->
			<u-list v-else>
				<view class="commodityLevelOne_header">
					<view class="commodityLevelOne_header_left"></view>
					<view v-if="!forsug" class="commodityLevelOne_header_right" @click="handleCheckBox">{{ checkbox ? '完成' : '选择' }}</view>
					<!-- <view v-else class="commodityLevelOne_header_right" style="color: #ccc">选择</view> -->
				</view>
				<view class="commodityLevelOne">
					<view class="commodityLevelOne_li" 
						v-for="(item, index) in goodsArr" 
						:key="index" >
						<!-- <view 
							v-if="checkbox"
							@click="handleStar(item, index)" 
							:class="item.state ? 'commodityLevelOne_li_NewStar' : 'commodityLevelOne_li_star'">⭐️</view> -->
						<view
							v-if="checkbox"
							@click="handleStar(item, index)" 
							:class="item.goodsSuggestionType ? 'commodityLevelOne_li_NewStar' : 'commodityLevelOne_li_star'">
							<image src="../../../static/img/star.png" mode=""></image>
						</view>
						<view @click="handleToDetail(item, index)">
							<view class="commodityLevelOne_li_image">
								<image :src="item.galleryAssets[0].assetBaseUrl + 'q_auto%2Cf_auto%2Cfl_lossy%2Cdpr_auto/w_250/' + item.galleryAssets[0].typology + '-' + item.galleryAssets[0].assetId + '.jpg'"></image>
							</view>
							<view class="commodityLevelOne_li_1">{{ item.titleLabel.zh }}</view>
							<view class="commodityLevelOne_li_2">{{ item.formattedId }}</view>
							<view class="commodityLevelOne_li_3">
								<view>
									{{ item.price.formattedPrice }}
								</view>
								<view class="commodityLevelOne_li_3_text" v-if="item.stateElement == 'REFUSED'">
									已拒绝
								</view>
							</view>
						</view>
					</view>
				</view>
			</u-list>
		</view>
	</view>

</template>

<script>
	import api from "@/api/index.js"
	export default {
		data() {
			return {
				uHomeHeight: 0,
				checkbox: false,
				goodsArr: [],
				code: '',
				forsug: false,
				sugOrderId: '',
				twoName: ''
			};
		},
		onLoad(option) {
			if(option && option.code) {
				this.code = option.code
			}
			if(option && option.forsug && option.orderId) {
				this.forsug = true;
				this.sugOrderId = option.orderId
			}
			if(option && option.name) {
				this.twoName = option.name
			}
			console.log(option, '选择商品======', this.sugOrderId, this.forsug)
		},
		onShow() {
			let that = this
			uni.getSystemInfo({
				success:function(res){
					that.uHomeHeight = res.windowHeight + "px"
				}
			})
			console.log('code', this.code, this.forsug)
			if(this.forsug) {
				const gigyaId = uni.getStorageSync('gigyaId');
				const obj = {
					idClient: gigyaId,
					idSuggestionBoard: this.sugOrderId
				}
				api.getOrderDetail(obj).then(res => {
					if(res.code === 200) {
						const arr = [];
						res.data.elementsSuggestionBoard.forEach(item => {
							item.product.stateElement = item.stateElement
							arr.push(item.product);
						})
						this.goodsArr = arr;
						console.log('goodsArr', this.goodsArr)
						uni.setNavigationBarTitle({
							title: `${res.data.nameSuggestionBoard}`
						});
					}
				}).catch(err => {
					console.log(err);
				});
			} else {
				console.log('123qwe')
				const obj = {
					filter: this.code,
				}
				api.goodsList(obj).then(res => {
					if(res.code === 200) {
						this.goodsArr = res.data.content;
						uni.setNavigationBarTitle({
							title: `${this.twoName} (${this.goodsArr.length} Item(s))`
						});
						const goodsId = uni.getStorageSync('goodsId');
						this.goodsArr.forEach(j => {
							if(goodsId.includes(j.id)) {
								j.goodsSuggestionType = true;
							} else {
								j.goodsSuggestionType = false;
							};
						})
						console.log('goodsArr', this.goodsArr, 'goodsid', goodsId)
					}
				}).catch(err => {
					console.log(err);
				});
			}
		},
		// 右上角 - 跳转到商品详情页
		onNavigationBarButtonTap() {},
		methods: {
			// 跳转到商品详情页
			handleToDetail(item, index) {
				if(this.forsug){
					uni.navigateTo({
						url: `/pages/menu/commodityDetailCopy/index?id=${item.id}&forsug=${this.forsug}`
					});
				}else{
					uni.navigateTo({
						url: `/pages/menu/commodityDetail/index?id=${item.id}&forsug=${this.forsug}`
					});
				}
			},
			// 多选星星
			handleStar(item, index) {
				const orderId = uni.getStorageSync('orderId');
				if(this.checkbox){
					let goodsArrCopy = [...this.goodsArr]
					this.goodsArr = goodsArrCopy.concat([])	
					let loaclGoodsArr;
					if(!item.goodsSuggestionType) {
						// 从本地拿商品数组
						if(uni.getStorageSync('goodsId') && uni.getStorageSync('goodsId').length > 0) {
							loaclGoodsArr = uni.getStorageSync('goodsId')
						} else {
							loaclGoodsArr = []
						}
						if(loaclGoodsArr.indexOf(item.id) == -1) {
							loaclGoodsArr.push(item.id);
						}
						// 点亮星星
						let goodsIndex = this.goodsArr.findIndex(ele => ele.id === item.id);
						this.goodsArr[goodsIndex].goodsSuggestionType = true;
						let newObj = this.goodsArr[goodsIndex];
						this.$set(this.goodsArr, goodsIndex, newObj);
					} else {
						// 从本地获取商品ID
						if(uni.getStorageSync('goodsId') && uni.getStorageSync('goodsId').length > 0) {
							loaclGoodsArr = uni.getStorageSync('goodsId');
							let index = loaclGoodsArr.indexOf(item.id);
							// 本地存在就删除
							if(index > -1) {
								loaclGoodsArr.splice(index, 1)
							}
						}
						console.log('删除商品');
						// 熄灭星星
						let goodsIndex = this.goodsArr.findIndex(ele => ele.id === item.id);
						let newObj = this.goodsArr[goodsIndex].goodsSuggestionType = false;
						this.$set(this.goodsArr, 'goodsIndex', newObj);
					}
					uni.setStorageSync('goodsId', loaclGoodsArr)
				}
			},
			// 多选/完成
			handleCheckBox() {
				this.checkbox = !this.checkbox
				if(!this.checkbox){
					// uni.navigateTo({
					// 	url: `/pages/menu/commodityPush/index`
					// });
					uni.navigateBack({
						delta: 3
					});	
				}
			}
			
		}
	};
</script>

<style scoped lang="less">
	.u-home {
		height: 100vh;
		// min-height: 100vh;
		background-color: #f5f5f5;
		display: flex;
		align-items: center;
		justify-content: center;
		.u-page{
			width: 100%;
			height: 100%;
		}
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
	html,body{
		width: 100%;
		height: 100%;
		overflow: hidden;
		.u-home{
			width: 100%;
			background: #f5f5f5;
			overflow: hidden;
			.u-page{
				// height: calc( 100% - 60rpx );
				height: 100%;
				margin: 30rpx;
				overflow: hidden;
				.u-list{
					height: 100%!important;
				}
				.commodityLevelOne_header{
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin: 0 0 30rpx 0;
					.commodityLevelOne_header_right{
						display: flex;
						align-items: center;
						justify-content: space-between;
					}
				}
				.commodityLevelOne{
					display: flex;
					flex-wrap: wrap;
					.commodityLevelOne_li{
						background: #ffffff;
						width: 44%;
						padding: 14rpx;
						border-radius: 14rpx;
						.commodityLevelOne_li_star{
							width: 40rpx;
							height: 40rpx;
							text-align: right;
							filter: brightness(0.3);
							margin: 20rpx 0 20rpx auto;
						}
						.commodityLevelOne_li_NewStar{
							width: 40rpx;
							height: 40rpx;
							text-align: right;
							margin: 20rpx 0 20rpx auto;
						}
						.commodityLevelOne_li_image{
							width: 100%;
							height: 350rpx;
							margin: auto;
						}
						.commodityLevelOne_li_1{
							font-size: 32rpx;
						}
						.commodityLevelOne_li_2{
							font-size: 24rpx;
						}
						.commodityLevelOne_li_3{
							display: flex;
							justify-content: space-between;
							font-size: 32rpx;
							.commodityLevelOne_li_3_text {
								font-size: 26rpx;
							}
						}
					}
					.commodityLevelOne_li:nth-child(odd) {
						 margin: 0 auto 14px 0;
					}
					.commodityLevelOne_li:nth-child(even) {
						 margin: 0 0 14px auto;
					}
					
				}
			}
		}
	}
</style>
