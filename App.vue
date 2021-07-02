<script>
export default {
	onLaunch: function() {
		console.log('App Launch');

		setTimeout(() => {
			uni.setTabBarBadge({
				// index: 1,
				// text: '31' //设置一个数字提醒
			});
			uni.showTabBarRedDot({
				//index: 3 //设置一个大圆点
			});
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
/*每个页面公共css*/ 
</style>
