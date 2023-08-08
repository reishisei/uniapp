<template>
	<view class="content">
		<view class="page">
			<view class="sent">
				<view class="text">Suggestion boards</view>
				<view class="toLink" @click="toLink">Create</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
		};
	},
	onLoad(option) {
	},
	onShow() {
		let firstName = uni.getStorageSync('firstName')
		uni.setNavigationBarTitle({
			title: `${firstName}`
		});
	},
	methods: {
		toLink() {
			uni.setStorageSync('orderId', "");
			uni.setStorageSync('goodsId', "");
			uni.navigateTo({
				url: '/pages/menu/commodityPush/index'
			})
		}
	},
	onReady() {
	},
};
</script>

<style lang="scss">
.content {
	background-color: #f5f5f5;
	min-height: 100vh;
	.page {
		.sent {
			position: relative;
			height: 100rpx;
			border-bottom: 2rpx solid #c3c3c3;
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
			background-color: #fff;
			.text {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				font-size: 30rpx;
			}
			.toLink {
				position: absolute;
				top: 38rpx;
				right: 40rpx;
				font-size: 24rpx;
				color: #b98c77;
			}
		}
	}
}
</style>
