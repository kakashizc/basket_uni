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
		        userinfo: {},
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
					success:(res)=>{ 
						console.log(res);
						if(res.errMsg == "getUserProfile:ok"){//授权成功
							//调用后台接口,发送code
							this.$api.auth({
								"avatarUrl":res.userInfo.avatarUrl,
								"nickName":res.userInfo.nickName,
								"gender":res.userInfo.nickName,
								"code":this.code,
							},ret=>{
								console.log(ret);
								if(ret.code == 0){
									console.log(res.userInfo.avatarUrl);
									this.userinfo.name = res.userInfo.nickName,
									this.userinfo.avatar = res.userInfo.avatarUrl,
									uni.setStorageSync("token",ret.token)
									console.log(this.userinfo);
									uni.setStorageSync("userinfo",this.userinfo)
								}
								uni.navigateBack({
									url:'./tabbar-5'
								})
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