<template>

	<view class="u-home" :style="{height: uHomeHeight}">
		<view class="u-page">
			<view class="top-but">
				<view v-if="!forsug" class="top-select" @click="topButton">SELECT</view>
				<!-- <view v-else class="top-select" style="color: #ccc;">SELECT</view> -->
			</view>
			<u-toast ref="uToast"></u-toast>
			<!-- 空 -->
			<u-empty
				width="500"
				textSize="30"
				v-if="Boolean(goodsDetail.swiper) == false" 
				mode="data" 
				icon="http://cdn.uviewui.com/uview/empty/car.png">
			</u-empty>
			<u-list v-else>
				<!-- 轮播图 -->
				<swiper 
					class="swiper" 
					circular 
					:indicator-dots="true" 
					:autoplay="false"
					:duration="500">
					<swiper-item v-for="(item, index) in goodsDetail.swiper" :key="index">
						<view class="swiper_image">
							<image :src="item.assetBaseUrl + 'q_auto%2Cf_auto%2Cfl_lossy%2Cdpr_auto/w_750/' + item.typology + '-' + item.assetId + '.jpg'"></image>
						</view>
					</swiper-item>
				</swiper>
				<!-- 菜单 -->
				<u-cell-group class="commodityLevelOne_li" >
					<u-cell @click="handleToDetail"
						size="large" title="DRESS" label="Spring-Summer 2022" :disabled="true">
					</u-cell>
				</u-cell-group>
				
				<u-cell-group class="commodityLevelOne_li">
					<u-cell @click="handleToDetail" size="large" title="Dress" isLink :disabled="true"></u-cell>
					<u-cell @click="handleToDetail" size="large" title="Cotton Tweed" isLink :disabled="true"></u-cell>
					<u-cell @click="handleToDetail" size="large" title="Pink" isLink :disabled="true"></u-cell>
				</u-cell-group>
				
				<u-cell-group class="commodityLevelOne_li">
					<u-cell @click="handleToDetail" size="large" title="Boutique price" isLink :disabled="true"></u-cell>
				</u-cell-group>
				
				<u-cell-group class="commodityLevelOne_li">
					<u-cell @click="handleToDetail" size="large" title="Details" isLink :disabled="true"></u-cell>
					<u-cell @click="handleToDetail" size="large" title="Variations(0)" isLink :disabled="true"></u-cell>
					<u-cell @click="handleToDetail" size="large" title="Communication" isLink :disabled="true"></u-cell>
				</u-cell-group>
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
				goodsDetail: {},
				goodsId: '',
				forsug: false,
			};
		},
		onShow() {
			let that = this
			that.getGoodsArr()
			uni.getSystemInfo({
				success:function(res){
					that.uHomeHeight = res.windowHeight + "px"
				}
			})
		},
		onLoad(option) {
			if(option && option.id) {
				this.goodsId = option.id
			}
			if(option && option.forsug) {
				this.forsug = JSON.parse(option.forsug);
			}
			uni.setNavigationBarTitle({
				title: `${this.goodsId}`
			});
			console.log(option, '商品详情======', typeof(this.forsug))
		},
		mounted() {
			api.goodsDetail(this.goodsId).then(res => {
				if(res.code === 200) {
					this.goodsDetail = {
						swiper: res.data.galleryAssets,
						title: '123'
					}
					// this.goodsArr = res.data.content;
					console.log('res', res.data)
				}
			}).catch(err => {
				console.log(err);
			});
		},
		methods: {
			// 右上角 - 跳转到推荐单详情页
			topButton() {
				const orderId = uni.getStorageSync('orderId');
				const obj = {
					elementsSuggestionBoard: [{
						idElement: this.goodsId,
						typeElement: 'PRODUCT',
						divisionElement: 'FASHION',
					}]
				}
				const params = {
					id: orderId,
					obj: obj
				}
				console.log('params', params)
				api.orderAddGoods(params).then(res => {
					if(res.code === 200) {
						// uni.redirectTo({
						// 	url: `/pages/menu/commodityPush/index`
						// });
						uni.navigateBack({
							delta: 4
						})
					}
				}).catch(err => {
					console.log(err);
				});
			},
			// 获取列表数据
			async getGoodsArr() {
				// const data = await test(0)
			
				setTimeout(() => {
					let arrSwiper = [
						'../../../static/logo.png',
						'../../../static/logo.png',
						'../../../static/logo.png',
						'../../../static/logo.png',
						'../../../static/logo.png',
						'../../../static/logo.png',
					]
					this.goodsDetail = {
						swiper: arrSwiper,
						title: '123'
					}
				}, 0)
			
			},
			// 跳转到推荐单详情页
			handleToDetail(item, index) {
				// uni.redirectTo({
				// 	url: `/pages/menu/commodityPush/index?item=${JSON.stringify(this.goodsDetail)}`
				// });
			},
		}
	};
</script>

<style scoped lang="less">
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
				height: calc( 100% - 60rpx );
				margin: 30rpx;
				overflow: hidden;
				.top-but {
					width: 100%;
					display: flex;
					justify-content: flex-end;
					color: #b98c77;
					padding: 10rpx 0;
				}
				.u-list{
					height: 100%!important;
				}
				.swiper{
					height: 600rpx;
					background: #ffffff;
					border-radius: 20rpx;
					margin: 0 0 20rpx 0;
					.swiper_image{
						width: 100%;
						height: 600rpx;
					}
				}
				.commodityLevelOne_li{
					background: #ffffff;
					border-radius: 20rpx;
					margin: 0 0 20rpx 0;
				}
			}
		}
	}
</style>
