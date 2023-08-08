<template>
	<view class="content">
		<view class="page">
			<view class="user-info">
				<view class="user-name">{{ userDetail.lastName }} {{ userDetail.firstName }}</view>
				<view class="user-id">
					<view class="pos">POS</view>
					<view class="pos-text">
						<view class="pos-iitle">CHANEL Staff</view>
						<view class="pos-id">
							{{ userDetail.id }}
						</view>
					</view>
				</view>
				<view class="inative">
					<view class="inative-text">Inactive</view>
					<view class="inative-text">Limited Reservations</view>
					<view class="inative-icon">?</view>
					<view v-if="popoverType" class="popover">
						<view v-for="(item, index) in popover" :key="index" class="popover-list" @click="toNextPopover(item.path)">
							<view class="menu-text" :style="{color: `${item.fontColor}`}">
								{{ item.name }}
							</view>
							<view class="popover-icon">
								<u-icon :name="item.icon" size="36" color="#141513"></u-icon>
							</view>
						</view>
					</view>
				</view>
				<view class="cannot">
					<view class="cannot-text">Cannot be followed</view>
					<view class="cannot-icon"><u-icon name="calendar" size="50" color="#659f65"></u-icon></view>
					<view class="cannot-list" @click="moreList"><u-icon name="more-dot-fill" size="50" color="#659f65"></u-icon></view>
				</view>
				<view class="phone">
					<view class="phone-icon"><u-icon name="phone" size="50" color="#baaba3"></u-icon></view>
					<view class="phone-title">CELL PHONE</view>
					<view class="phone-num">+33 {{ userDetail.tel }}</view>
				</view>
				<view class="other-phone">
					<view class="phone">
						<view class="phone-icon"><u-icon name="phone" size="50" color="#baaba3"></u-icon></view>
						<view class="phone-title">OTHER PHONE</view>
						<view class="phone-num">+33 {{ userDetail.tel }}</view>
					</view>
					<view class="phone phone-mail">
						<view class="phone-icon mail"><u-icon name="email" size="50" color="#baaba3"></u-icon></view>
						<view class="phone-icon"><u-icon name="arrow-right" size="50" color="#baaba3"></u-icon></view>
						<view class="phone-title">EMAIL ADDRESS</view>
						<view class="phone-num">{{ userDetail.email }}</view>
					</view>
				</view>
			</view>
			<view class="userMenu">
				<view v-for="(item, index) in menuList" :key="index" class="menuList" @click="toNext(item.path, index)">
					<view class="menu-icon">
						<u-icon :name="item.icon" size="50" color="#c3b0a9"></u-icon>
					</view>
					<view class="menu-text" :style="{color: `${item.fontColor}`}">
						{{ item.name }}
					</view>
					<view class="menu-arrow">
						<u-icon name="arrow-right" size="30" color="#c3b0a9"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import api from "@/api/index.js"
export default {
	data() {
		return {
			popoverType: false,
			userDetail: {},
			userID: '',
			name: '',
			menuList: [
				{icon: 'file-text', name: 'Details', path: '', fontColor: "#ccc"},
				{icon: 'man-add', name: 'Client Map', path: '', fontColor: "#ccc"},
				{icon: 'bag', name: 'Purchase history', path: '', fontColor: "#ccc"},
				{icon: 'hourglass', name: 'Reservations', path: '', fontColor: "#ccc"},
				{icon: 'hourglass', name: 'Clienteling', path: '', fontColor: "#ccc"},
				{icon: 'hourglass', name: 'Interactions', path: '', fontColor: "#ccc"},
				{icon: 'hourglass', name: 'KPIs', path: '', fontColor: "#ccc"},
				{icon: 'calendar', name: 'Reminders', path: '', fontColor: "#ccc"},
				{icon: 'chat', name: 'Comment', path: '', fontColor: "#ccc"},
				{icon: 'bell', name: 'Suggestion boards', path: '/pages/wishSeries/wishList/historySuggest', fontColor: "#000"},
				{icon: 'bell', name: 'WishList', path: '/pages/wishSeries/wishList/wishList', fontColor: "#000"},
			],
			popover: [
				{name: 'Send a digital', icon: 'photo', path: '', fontColor: "#ccc"},
				{name: 'Report an action', icon: 'share-square', path: '', fontColor: "#ccc"},
				{name: 'Setup a reminder', icon: 'clock', path: '', fontColor: "#ccc"},
				{name: 'Add interaction', icon: 'file-text', path: '', fontColor: "#ccc"},
				{name: 'Share suggestion board', icon: 'plus', path: '/pages/wishSeries/wishList/suggest', fontColor: "#000"},
				{name: 'Start mirror session', icon: 'plus-circle', path: '', fontColor: "#ccc"},
				// {name: 'Access Chat', icon: 'plus-circle', path: ''},
			],
		};
	},
	onLoad(option) {
		if(option) {
			if(option && option.id) {
				this.userID = option.id;
			}
			console.log('option', option.id)
		}
	},
	onShow() {
		this.popoverType = false
		api.userDetail(this.userID).then(res => {
			if(res.code === 200) {
				this.userDetail = res.data;
				this.name = `${this.userDetail.lastName} ${this.userDetail.firstName}`
				
				uni.setStorageSync('firstName', this.name);
			}
		}).catch(err => {
			console.log(err);
		});
	},
	methods: {
		toNext(path, index) {
			if(index === 10) {
				const gigyaId = uni.getStorageSync('gigyaId');
				api.wishList(gigyaId).then(res => {
					if(res.code === 200) {
						let num = res.data.elementsWishlist.length;
						if(num > 0) {
							this.detailNextPage(path);
						} else {
							uni.showToast({
								icon: "none",
								title: "Client does not hava any wishlist",
								duration: 2000
							});
						}
					}
				}).catch(err => {
					console.log(err);
				});
			} else {
				this.detailNextPage(path);
			}
		},
		detailNextPage(path) {
			uni.navigateTo({
				url: `${path}?name=${this.name}`
			})
		},
		moreList() {
			this.popoverType = !this.popoverType
		},
		toNextPopover(path) {
			console.log('path', path)
			if(path) {
				uni.navigateTo({
					url: path
				})
			}
		}
	},
	onReady() {
	}
};
</script>

<style lang="scss">
.content {
	padding: 0 40rpx;
	background-color: #f5f5f5;
	.page {
		padding: 20rpx 0;
		background-color: #f5f5f5;
		.user-info{
			.userMenu {
				margin-top: 24rpx;
			}
			.user-name {
				width: 50%;
				padding-left: 20rpx;
				font-size: 38rpx;
				font-weight: bold;
			}
			.user-id {
				display: flex;
				justify-content: flex-start;
				margin-top: 28rpx;
				.pos {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 72rpx;
					height: 72rpx;
					border: 2rpx solid #91c392;
					border-radius: 50%;
					margin-right: 16rpx;
					font-size: 20rpx;
					color: #91c392;
				}
				.pos-text {
					.pos-title {
						font-size: 24rpx;
					}
					.pos-id {
						font-size: 22rpx;
						color: #595959;
						margin-top: .12rpx;
					}
				}
			}
			.inative {
				display: flex;
				justify-content: flex-start;
				margin-top: 20rpx;
				position: relative;
				.popover {
					position: absolute;
					top: 160rpx;
					right: 0;
					width: 480rpx;
					background-color: #edf4ee;
					border-radius: 20rpx;
					overflow: hidden;
					z-index: 10;
					.popover-list {
						display: flex;
						justify-content: space-between;
						padding: 26rpx 32rpx;
						border-bottom: 2rpx solid #d5e3d6;
					}
					.popover-list:last-child {
						border-bottom: 0;
					}
					.menu-text {
						font-size: 30rpx;
					}
				}
				.inative-text {
					display: inline;
					background-color: #fff;
					border-radius: 6rpx;
					overflow: hidden;
					padding: 6rpx 20rpx;
					font-size: 22rpx;
					color: #838383;
					border-radius: 6rpx;
					margin-right: 14rpx;
				}
				.inative-icon {
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 50%;
					width: 44rpx;
					height: 44rpx;
					background-color: #c89579;
					color: #fff;
				}
			}
			.cannot {
				display: flex;
				justify-content: flex-start;
				padding-top: 24rpx;
				.cannot-text {
					display: inline-block;
					font-size: 22rpx;
					padding: 30rpx 80rpx;
					color: #606060;
					background-color: #fff;
					border-radius: 20rpx;
				}
				.cannot-icon {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 84rpx;
					height: 84rpx;
					border: 2rpx solid #606060;
					background-color: #fff;
					border-radius: 50%;
					margin-left: 64rpx;
				}
				.cannot-list {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 84rpx;
					height: 84rpx;
					background-color: #fff;
					border-radius: 50%;
					margin-left: 64rpx;
				}
			}
			.phone {
				position: relative;
				margin-top: 24rpx;
				background-color: #fff;
				border-radius: 24rpx;
				padding: 24rpx;
				.phone-icon {
					position: absolute;
					top: 40rpx;
					right: 32rpx;
				}
				.mail {
					right: 100rpx;
				}
				.phone-title {
					color: #696969;
					font-size: 20rpx;
				}
				.phone-num {
					margin-top: 14rpx;
					color: #000;
					font-size: 32rpx;
				}
			}
			.phone-mail {
				margin-top: 0;
			}
			.other-phone {
				.phone {
					border-bottom-left-radius: 0;
					border-bottom-right-radius: 0;
					border-bottom: 2rpx solid #f1f1f1;
				}
				.phone-mail {
					border-top-left-radius: 0;
					border-top-right-radius: 0;
					border-bottom-left-radius: 24rpx;
					border-bottom-right-radius: 24rpx;
					border: 0;
				}
			}
		}
		.userMenu {
			margin-top: 24rpx;
			padding-bottom: 100rpx;
			.menuList {
				position: relative;
				display: flex;
				justify-content: flex-start;
				height: 86rpx;
				line-height: 86rpx;
				background-color: #fff;
				border-radius: 20rpx;
				margin-bottom: 24rpx;
				.menu-icon {
					display: flex;
					justify-content: center;
					align-items: center;
					margin-left: 40rpx;
				}
				.menu-text {
					font-size: 24rpx;
					margin-left: 48rpx;
				}
				.menu-arrow {
					position: absolute;
					top: 32rpx;
					right: 30rpx;
				}
			}
		}
	}
}
</style>
