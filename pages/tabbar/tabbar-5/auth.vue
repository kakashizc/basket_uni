<template>
	<view class="content">
		<view @click="getUserInfo">
			<button style="margin-top: 300px;">点击授权</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		    return {
		        userinfo: '',
				code:'',
		    }
		},
		methods: {
			
			//回调函数
			getUserInfo(){
				uni.login({
					success: ret => {
					 	if(ret.errMsg == "login:ok"){
					 		this.code = ret.code
					 	}
					}
				}) 
				
				uni.getUserProfile({
					desc:'123',
					success:function(res){
						if(res.errMsg == "getUserProfile:ok"){//授权成功
							//调用后台接口,发送code
							
							//跳转到我的页面
							uni.navigateBack({
								url:'./tabbar-5'
							})
						}else{
							alert("授权失败")
						}
					}
				})
				
			}
		},
	}
</script>

<style>
</style>