<template>
	<view class="content">
		<view class="page">
			<view class="top">
				<view class="top-icon">
					<image src="https://cce-campaign.oss-cn-shanghai.aliyuncs.com/chanel/fsn-wishlist-poc/chanel-poc/logo.png"></image>
				</view>
				<!-- <view class="top-con">
					<view class="top-text">Welcome to</view>
					<view class="top-text">My Little Black Book</view>
				</view> -->
			</view>
			<view class="muen">
				<view v-for="item in menuList" class="menu-list">
					<view class="menu-icon">
						<u-icon :name="item.icon" color="#bfb2a9" size="53"></u-icon>
					</view>
					<view class="menu-text">
						{{ item.name }}
					</view>
					<view class="menu-arrow">
						<u-icon name="arrow-right" color="#cbcbcb" size="30"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			menuList: [
				{icon: "calendar", name: 'My Portfollo', path: ''},
				{icon: "share-square", name: 'My Actions', path: ''},
				{icon: "photo", name: 'My digital Cards', path: ''},
				{icon: "minus", name: 'My Kpis', path: ''},
				{icon: "file-text", name: 'Chat', path: ''},
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
	min-height: 100vh;
	padding: 0 40rpx;
	background-color: #f5f5f5;
	.page {
		position: relative;
		min-height: 100vh;
		.top {
			position: absolute;
			top: 40rpx;
			left: 0;
			width: 100%;
			.top-icon {
				display: flex;
				justify-content: center;
				width: 100%;
				height: 500rpx;
				image {
					width: 500rpx;
					height: 100%;
				}
			}
			.top-con {
				.top-text {
					display: flex;
					justify-content: center;
				}
			}
		}
		.muen {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			padding-bottom: 30rpx;
			.menu-list {
				width: 100%;
				position: relative;
				display: flex;
				justify-content: flex-start;
				height: 80rpx;
				line-height: 80rpx;
				background-color: #fff;
				border-radius: 20rpx;
				margin-bottom: 30rpx;
				.menu-icon {
					display: flex;
					align-items: center;
					margin-left: 30rpx;
				}
				.menu-text {
					display: flex;
					width: 500rpx;
					align-items: center;
					flex-wrap: nowrap;
					margin-left: 35rpx;
					color: #ccc;
					white-space: nowrap;
				}
				.menu-arrow {
					display: flex;
					align-items: center;
				}
			}
		}
	}
}
</style>
