<template>
	<view class="content">
			<view v-if="isnull == 0">
				<view>我的粉丝</view>
			</view>
			<view  v-else v-for="u in userinfo" >
				<view @click="req(u.UserId)" style="text-align: center;">
					<view style="color: #F0AD4E;">
						查看他的视频
					</view>
				</view>
				<view class="myinfo">
					<view >
						<image class="userinfo-avatar" :src="u.Teamers.Image" mode=""></image>
					</view>
					<view>
						{{u.Teamers.Name}}
					</view>
					
				</view>
			</view>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo:[],
				teamid:0,
				isnull:1,
			}
		},
		onLoad() {
			this.initdata()
		},
		methods: {
			initdata(){
				this.$api.myfans({},ret=>{
					console.log(ret);
					if(ret.code == 0){
						this.userinfo = ret.data
						console.log(this.userinfo);
					}else{
						this.isnull = 0
					}

				})
			},
			stare(uid){
				console.log(uid);
				this.$api.unstare({
					id:uid
				},ret=>{
					console.log(this);
					wx.showModal({
						title: "ok",
						content: ret.msg
					})
					
				})
			},
			req(uid){
				uni.navigateTo({
					url:"../hervideo/hervideo?id="+uid,
				})
			}
		}
	}
</script>

<style lang="less">
	.content {
		padding: 20rpx;
	}
	.myinfo {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 5%;
		border-radius: 15rpx;
		background-color:#00BFFF;
		line-height: 1.5;
		margin-top: 20rpx;
	}
	.userinfo-avatar{
	  overflow: hidden;
	  width: 128rpx;
	  height: 128rpx;
	  border-radius: 50%;
	}
</style>
