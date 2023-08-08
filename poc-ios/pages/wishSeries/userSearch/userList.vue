<template>
	<view class="content">
		<view class="page">
			<view class="search">
				<u-search
					searchIconSize="40"
					:showAction="false"
					placeholder="Seatch..."
					v-model="keyword"
					shape="square"
					bgColor="#fff"
					confirm-type="search"
					@search="keyForData"
					></u-search>
			</view>
			<view class="userInfo">
				<view v-for="item in userList" class="userList" @click="toDetail(item.id, item.gigyaId)">
					<view class="userTop">
						<view class="userName">{{ item.lastName || '' }} {{ item.firstName || '' }}</view>
						<view class="userId">{{ item.id }}</view>
					</view>
					<view class="userAddress userHasIcon"><u-icon name="map" color="#bba294"></u-icon>{{ item.address }}</view>
					<view class="userMail userHasIcon"><u-icon name="email" color="#bba294"></u-icon>{{ item.email }}</view>
					<view class="userPhone userHasIcon"><u-icon name="phone" color="#bba294"></u-icon>{{ item.tel }}</view>
					<view class="userIcon">
						<u-icon name="arrow-right"></u-icon>
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
			keyword: '',
			userName: '',
			userList: [],
			userNum: 0
		};
	},
	onLoad(option) {
		if(option) {
			this.userName = option.userName;
		}
	},
	onShow() {
		this.getUserList();
	},
	methods: {
		getUserList(key) {
			let userName;
			key? userName = this.keyword : userName = this.userName
			api.cliebtUser({lastName: userName}).then(res => {
				if(res.code === 200) {
					this.userList = res.data;
					this.userNum = res.data.length;
					uni.setNavigationBarTitle({
						title: `${this.userNum} clients found`
					});
					if(res.data.length == 0) {
						uni.showToast({
							icon: "none",
							title: "没有数据",
							duration: 2000
						});
					}
				}
				console.log(this.userList);
			}).catch(err => {
				console.log(err);
			});
		},
		toDetail(id, gigyaId) {
			uni.setStorageSync('gigyaId', gigyaId);
			uni.navigateTo({
				url: `/pages/wishSeries/userDetail/index?id=${id}`
			})
		},
		keyForData(val) {
			console.log('软键盘确认触发', val)
			this.getUserList(true);
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
	height: 100vh;
	.page {
		padding: 20rpx 0;
		.userInfo {
			margin-top: 40rpx;
			border-radius: 30rpx;
			overflow: hidden;
			.userList {
				position: relative;
				background-color: #fff;
				padding: 20rpx;
				border-bottom: 2rpx solid #efefef;
				.u-icon {
					margin-right: 6rpx;
				}
				.iconStyle {
					margin-right: 10rpx;
				}
				.userTop {
					display: flex;
					justify-content: space-between;
					padding: 0 40rpx 0 20rpx;
					.userName {
						font-size: 28rpx;
						font-weight: bold;
					}
					.userId {
						font-size: 22rpx;
						color: #5e5e5e;
					}
				}
				.userHasIcon {
					display: flex;
					justify-content: flex-start;
					font-size: 22rpx;
					color: #000;
					margin-top: 6rpx;
				}
				.userIcon {
					position: absolute;
					right: 36rpx;
					top: 80rpx;
				}
			}
		}
	}
}
</style>
