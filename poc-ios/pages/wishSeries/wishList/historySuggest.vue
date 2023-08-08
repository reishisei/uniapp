<template>
	<view class="content">
		<view class="page">
			<view class="title-top">SUGGESTION BOARDS</view>
			<view class="menu">
				<view class="menu-button" :class="{ active: menuType }" @click="checkMenu(0)">By me</view>
				<view class="menu-button" :class="{ active: !menuType }" @click="checkMenu(1)">By others</view>
			</view>
			<view v-for="item in wishList" class="goods-list">
				<view class="goods-des" @click="toList(item.idSuggestionBoard)">
					<view class="goods-top">
						<view class="goods-name">{{ item.visibilitySuggestionBoard }}</view>
						<view class="goods-num">{{ item | dateFilter() }}</view>
					</view>
					<view class="wish-data">{{ item.nameSuggestionBoard }}</view>
					<view class="list-data">{{ item.descriptionSuggestionBoard }}</view>
					<view class="arrow-icon">
						<u-icon name="arrow-right" color="#bababa" size="22"></u-icon>
					</view>
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
			menuType: false,
			wishList: []
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
	mounted() {
		const gigyaId = uni.getStorageSync('gigyaId');
		api.getSuggestList(gigyaId).then(res => {
			if(res.code === 200) {
				this.wishList = res.data;
				console.log('res', res.data)
			}
		}).catch(err => {
			console.log(err);
		});
	},
	methods: {
		checkMenu(num) {
			return
			if(num === 0) {
				this.menuType = false;
			} else {
				this.menuType = true;
			}
		},
		toList(orderId) {
			uni.navigateTo({
				url: `/pages/menu/commoditySelect/index?orderId=${orderId}&forsug=${true}`
			})
		}
	},
	onReady() {
	},
	filters: {
		dateFilter(val) {
			if(val.statusSuggestionBoard != 'DRAFT') {
				return moment(new Date(val.publicationDateSuggestionBoard)).format('YYYY-MM-DD HH:MM')
			} else {
				return "未分享"
			}
		}
	}
};
</script>

<style lang="scss">
.content {
	padding: 0 40rpx;
	background-color: #f5f5f5;
	min-height: 100vh;
	.page {
		padding: 20rpx 0 100rpx 0;
		.title-top {
			font-size: 32rpx;
			color: #020202;
		}
		.menu {
			display: flex;
			justify-content: flex-start;
			margin: 20rpx 0;
			height: 64rpx;
			border-radius: 10rpx;
			overflow: hidden;
			.menu-button {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 50%;
				height: 64rpx;
				font-size: 26rpx;
				// color: #fff;
				background-color: #000;
				color: rgb(204, 204, 204)!important;
			}
			.active {
				background-color: #fff;
				color: #000;
			}
		}
		.goods-list {
			display: flex;
			justify-content: flex-start;
			width: 670rpx;
			margin-bottom: 20rpx;
			border: 2rpx solid #bcbcbc;
			border-radius: 16rpx;
			overflow: hidden;
			background-color: #fff;
			.goods-des {
				position: relative;
				width: 100%;
				padding: 30rpx 23rpx;
				.goods-top {
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 100%;
					.goods-name {
						line-height: 32rpx;
						font-size: 20rpx;
						color: #717172;
					}
					.goods-num {
						margin-right: 70rpx;
						line-height: 32rpx;
						font-size: 25rpx;
						color: #858585;
					}
				}
				.wish-data {
					line-height: 38rpx;
					font-size: 22rpx;
					color: #000;
				}
				.list-data {
					line-height: 36rpx;
					font-size: 23rpx;
					color: #000;
				}
				.arrow-icon {
					position: absolute;
					top: 75rpx;
					right: 37rpx;
				}
			}
		}
	}
}
</style>
