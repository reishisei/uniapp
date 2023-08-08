<template>
	<view class="content">
		<view class="page">
			<view class="title">
				<view class="title-left">WISHLIST</view>
				<view class="title-right">select items</view>
			</view>
			<view v-for="item in wishList" class="goods-list" @click="toDetail(item)">
				<view class="goods-img">
					<image :src="item.product.galleryAssets[0].assetBaseUrl + 'q_auto%2Cf_auto%2Cfl_lossy%2Cdpr_auto/w_200/' + item.product.galleryAssets[0].typology + '-' + item.product.galleryAssets[0].assetId + '.jpg'"></image>
				</view>
				<view class="goods-des">
					<view class="goods-name">{{ item.product.titleLabel.zh }}</view>
					<view class="goods-num">{{ item.idElement }}</view>
					<view class="wish-data">{{ item.dateUpdateStatusElement | dateFilter() }}</view>
					<view class="list-data">{{ item.dateUpdateStatusElement | dateFilter() }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import api from "@/api/index.js"
import moment from 'moment'
export default {
	data() {
		return {
			gigyaId: '',
			wishList: [],
			userName: '',
		};
	},
	onLoad(option) {
		if(option && option.name) {
			this.userName = option.name
			uni.setNavigationBarTitle({
				title: `${this.userName}`
			});
		}
	},
	methods: {
		toDetail(item) {
			uni.navigateTo({
				url: `/pages/menu/commodityDetailCopy/index?id=${item.idElement}&forsug=true`
			})
		}
	},
	mounted() {
		const gigyaId = uni.getStorageSync('gigyaId');
		api.wishList(gigyaId).then(res => {
			if(res.code === 200) {
				this.wishList = res.data.elementsWishlist;
			}
			console.log(res);
		}).catch(err => {
			console.log(err);
		});
	},
	onReady() {
	},
	filters: {
		dateFilter(val) {
			if(val) {
				return moment(new Date(val)).format('YYYY-MM-DD HH:MM')
			} else {
				return ""
			}
		}
	}
};
</script>

<style lang="scss">
.content {
	padding: 0 40rpx;
	min-height: 100vh;
	background-color: #f5f5f5;
	.page {
		padding: 20rpx 0 100rpx 0;
		background-color: #f5f5f5;
		.title {
			height: 80rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.title-left {
				font-size: 32rpx;
				color: #020202;
			}
			.title-right {
				font-size: 26rpx;
				// color: #c88f7a;
				color: rgb(204, 204, 204);
			}
		}
		.goods-list {
			display: flex;
			justify-content: flex-start;
			width: 670rpx;
			height: 200rpx;
			margin-bottom: 20rpx;
			border: 2rpx solid #bcbcbc;
			border-radius: 16rpx;
			overflow: hidden;
			background-color: #fff;
			.goods-img {
				width: 200rpx;
				height: 200rpx;
				background-color: #fff;
				box-shadow: 0 0 35rpx #f7f7f7;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.goods-des {
				padding-top: 20rpx;
				margin-left: 35rpx;
				.goods-name {
					line-height: 42rpx;
					font-size: 30rpx;
					color: #000;
				}
				.goods-num {
					line-height: 38rpx;
					font-size: 26rpx;
					color: #000;
				}
				.wish-data {
					line-height: 38rpx;
					font-size: 26rpx;
					color: #000;
				}
				.list-data {
					line-height: 38rpx;
					font-size: 26rpx;
					color: #717171;
				}
			}
		}
	}
}
</style>
