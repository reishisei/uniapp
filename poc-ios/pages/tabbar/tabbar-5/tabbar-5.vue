<template>
	<view class="content">
		<view style="color: black" class="viewColoe">敬请期待</view>
		<button @click="handle">分享</button>
		<image src="qa.png"></image>
	</view>
</template>

<script>
	// var testModule = uni.requireNativePlugin("DCTestUniPlugin-TestModule")
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			handle(){
				// 调用异步方法
				// testModule.testAsyncFunc({
				// 	'name': 'uni-app',
				// 	'summary': 'https://www.chanel.com/images/q_auto%2Cf_auto%2Cfl_lossy%2Cdpr_auto/w_250/PACKSHOT_OTHER-9516162711582.jpg'
				// },
				// (ret) => {
				// 	uni.showToast({
				// 		title:'调用异步方法 ' + ret,
				// 		icon: "none"
				// 	})
				// })
				// plus.share.sendWithSystem({
				// 	type: "image",
				// 	content: '香奈儿时尚精品小程序',
				// 	href: 'https://dev-fsn-wishlist-poc.comeyes.com/test.html',
				// 	pictures: ['/Documents/Pandora/apps/69BB11942C53221C14AAE1592B77DB4B/www/static/img/qa.png']
				// }, function() {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '成功'
				// 	})
				// })
			}
		}
	}
</script>

<style scoped lang="less">
	.content {
		color: black;
		min-height: 100vh;
		text-align: center;
		padding-top: 200rpx;
		background-color: #f5f5f5;
		.viewColoe{
			color: black;
		}
	}
</style>
