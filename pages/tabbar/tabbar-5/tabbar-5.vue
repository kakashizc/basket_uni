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
				<button @click="MyVideo()" class="vids" > -我的视频- </button>
			</view>
			<view>
				<button @click="MyTeam()" class="vids" > -我的球队- </button>
			</view>
			<!--<view>
				<button @click="MyCourt()" class="vids" > -我的球场- </button>
			</view> -->
			<view>
				<button @click="TeamList()" class="vids" > -球队一览- </button>
			</view>
			<view>
				<button @click="MyInfo()" class="vids" > -我的信息- </button>
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
			MyVideo(){
				uni.navigateTo({
					url:"./myvideos/myvideos"
				})
			},
			MyTeam(){
				this.$api.myteams({},ret=>{
					if (ret.code != 0){
						wx.showModal({
							content:"尚未填写个人信息或加入球队",
							showCancel:false,
							success: function (res) {
							        if (res.confirm) {
							            console.log('用户点击确定');
										uni.navigateBack({
										
										})
							        } else if (res.cancel) {
							            console.log('用户点击取消');
							        }
							    }
						})
						
					}else{
						uni.navigateTo({
							url:"./myteam/myteam"
						})
					}
				})
				
			},
			MyCourt(){
				uni.navigateTo({
					url:"./mycourt/mycourt"
				})
			},
			TeamList(){
				uni.navigateTo({
					url:"./teamlist/teamlist"
				})
			},
			MyInfo(){
				uni.navigateTo({
					url:"./myinfo/myinfo"
				})
			},
			Cteam(){
				uni.navigateTo({
					url:"./cteam/cteam"
				})
			},
		}
	}
</script>

<style>
	.vids{
		background-color: deepskyblue;
		color: #333333;
	}
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