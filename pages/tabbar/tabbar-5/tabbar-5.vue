<template>
	<view class="content">
		<view @click="getUserInfo">
			123123
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		    return {
		        userinfo: '',
		    }
		},
		onLoad() {
			let userinfo = uni.getStorageSync("token")
			if(!userinfo){
				uni.navigateTo({
					url:'auth'
				})
			}
		},
		methods: {
			//回调函数
			getUserInfo(){
				uni.getUserProfile({
					desc:'123',
					success:function(res){
						console.log(res);
					}
				})
			}
		}
	}
</script>

<style>
</style>