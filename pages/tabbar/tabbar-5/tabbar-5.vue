<template>
	<view class="content">
		<view class="cat">
			
			<view>
				<image class="userinfo-avatar" :src="userinfo.avatar" mode=""></image>
			</view>
			<view>
				{{userinfo.name}}
			</view>
			<view>
				<text style="color: #F0AD4E"> -我发布的视频- </text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		    return {
		        userinfo: {
					name:"请先授权"
				},
		    }
		},
		onShow() {
			let token = uni.getStorageSync("token")
			if(!token){
				uni.navigateTo({
					url:'auth'
				})
			}else{
				//渲染页面
				this.userinfo = uni.getStorageSync("userinfo")
				console.log(this.userinfo);
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.cat{
		 display: flex;
		 flex-direction: column;
		 align-items: center;
		 color: #aaa;
	}
	.cat view{
		margin: 10rpx;
	}
	.userinfo-avatar{
	  overflow: hidden;
	  width: 128rpx;
	  height: 128rpx;
	  border-radius: 50%;
	}
</style>