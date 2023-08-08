<script>
export default {
	onLaunch: function() {
		console.log('App Launch');

		setTimeout(() => {
			// uni.setTabBarBadge({
			// 	index: 0,
			// 	text: ''
			// },{
			// 	index: 1,
			// 	text: ''
			// },{
			// 	index: 2,
			// 	text: ''
			// },{
			// 	index: 3,
			// 	text: ''
			// });
			// uni.showTabBarRedDot({
			// 	index: 0
			// });
		}, 1000);
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */ 
*{
	color: #000000;
}
/*每个页面公共css */ 
uni-page-body{
	height: 100%;
}
</style>
