<template>
	<view class="content">
		<view class="page">
			<u-form
				labelPosition="top"
				:model="model"
				:rules="rules"
				ref="form"
				:label-style="{'font-size': '20rpx'}">
				<u-form-item
					label="LAST NAME"
					prop="lastName"
					required='true'
					labelWidth="150">
					<u-input
						class="input-name"
						v-model="model.lastName"
						:custom-style=inputStyleS></u-input>
				</u-form-item>
				<u-form-item
					label="FIRST NAME"
					labelWidth="150">
					<u-input
						fontSize='26'
						v-model="model.firstName"
						disabled
						:custom-style=inputStyle></u-input>
				</u-form-item>
				<u-form-item
					label="DOCUMENT NUMBER"
					labelWidth="250">
					<view class="doc-box">
						<view class="doc-input">
							<u-input
								fontSize='26'
								disabled
								v-model="model.document"
								:custom-style=inputStyle></u-input>
						</view>
						<view class="doc-icon">
							<u-icon name="camera" size="40" color="#bc9887"></u-icon>
						</view>
					</view>
				</u-form-item>
				<u-form-item
					label="PHONE NUMBERS"
					labelWidth="200">
					<view class="phone-num">
						<view class="phone-box">
							+33
							<view class="phone-icon">
								<u-icon name="arrow-right" size="30" color="#b6b6b6"></u-icon>
							</view>
						</view>
						<view class="phone-input">
							<u-input
								fontSize='26'
								v-model="model.phone"
								disabled
								:custom-style=inputStyle></u-input>
						</view>
					</view>
				</u-form-item>
				<u-form-item
					label="EMAIL ADDTESS"
					labelWidth="200">
					<u-input
						fontSize='26'
						v-model="model.maril"
						disabled
						:custom-style=inputStyle></u-input>
				</u-form-item>
				<u-form-item
					label="CLIENT ID"
					labelWidth="150">
					<u-input
						fontSize='26'
						v-model="model.client"
						disabled
						:custom-style=inputStyle></u-input>
				</u-form-item>
				<u-form-item>
					<view class="qrcode">
						<view class="qrcode-icon"><u-icon name="scan" size="45" color="#cb9583"></u-icon></view>
						<view class="qrcode-text">Client QR Code</view>
					</view>
				</u-form-item>
			</u-form>
			<view class="submit">
				<u-button
					type="primary"
					@click="submit"
					icon-color="#bcbcbc"
					color='#000'
					:custom-style="{'width': '320rpx'}">SEARCH</u-button>
			</view>
		</view>
	</view>
</template>

<script>
import api from "@/api/index.js"
export default {
	data() {
		return {
			title: 'Hello',
			inputStyle: {
				'background-color': '#f3f3f3'
			},
			inputStyleS: {
				'background-color': '#fff'
			},
			model: {
				lastName: '',
				firstName: '',
				document: '',
				phone: '',
				maril: '',
				client: '',
				qrcode: '',
			},
			rules: {
			}
		};
	},
	onLoad() {},
	onShow() {
		console.log('123');
		this.model.lastName = '';
	},
	methods: {
		submit() {
			
			const obj = {
				firstName: this.model.lastName,
			}
			api.cliebtUser(obj).then(res => {
				console.log(res);
				uni.navigateTo({
					url: `/pages/wishSeries/userSearch/userList?userName=${this.model.lastName}`
				})
			}).catch(err => {
				console.log(err);
			});
			console.log('name', this.model.lastName);
			
			// this.$refs.form.validate().then(res => {
			// 	uni.$u.toast('校验通过');
			
			// }).catch(errors => {
			// 	uni.$u.toast('校验失败')
			// })
		}
	},
	onReady() {
		this.$refs.form.setRules(this.rules)
	}
};
</script>

<style lang="scss">
.content {
	padding: 0 40rpx;
	min-height: 100vh;
	background-color: #f5f5f5;
	.page {
		padding: 20rpx 0;
		.u-form-item__body__left__content__required {
			left: 120rpx;
			top: 0;
		}
		.input-name {
			height: 40rpx;
		}
		.doc-box {
			display: flex;
			justify-content: space-between;
			.doc-input {
				width: 560rpx;
			}
			.doc-icon {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 70rpx;
				height: 70rpx;
				border: 2rpx solid #cbcbcb;
				border-radius: 8rpx;
				margin-left: 20rpx;
				background-color: #f3f3f3;
			}
		}
		.phone-num {
			display: flex;
			justify-content: space-between;
			.phone-box {
				position: relative;
				width: 200rpx;
				line-height: 70rpx;
				height: 70rpx;
				padding-left: 30rpx;
				border-radius: 8rpx;
				border: 1rpx solid #cbcbcb;
				background-color: #f3f3f3;
				.phone-icon {
					position: absolute;
					top: 25rpx;
					right: 40rpx;
				}
			}
			.phone-input {
				width: 405rpx;
			}
		}
		.qrcode {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			width: 100%;
			height: 74rpx;
			border: 2rpx solid #cecece;
			border-radius: 14rpx;
			background-color: #f3f3f3;
			.qrcode-icon {
				margin: 0 30rpx;
			}
			.qrcode-text {
				color: #ccc;
			}
		}
		.submit {
			width: 100%;
			margin: 50rpx auto;
		}
	}
}
</style>
