<template>
	<view class="content">
		<view class="page">
			<view class="top">
			</view>
			<view class="muen">
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			menuList: [
			]
		};
	},
	onLoad(option) {
	},
	methods: {
	},
	onReady() {
	}
};
</script>

<style lang="scss">
.content {
	width: 100vw;
	min-height: 100vh;
	background-color: #fff;
	.page {
		.top {
			margin-top: 30;
			width: 500rpx;
			height: 200rpx;
			background-color: #ccc;
			margin: 30rpx auto 0;
			border: 2rpx solid #000;
		}
		.muen {
			margin-top: 30;
			width: 500rpx;
			height: 200rpx;
			background-color: red;
			margin: 30rpx auto 0;
			border: 2rpx solid #000;
		}
	}
}
</style>
