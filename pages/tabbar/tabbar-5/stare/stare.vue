<template>
	<view class="content">
			<view v-if="isnull == 0">
				<view>我的关注</view>
			</view>
			<view  v-else v-for="u in userinfo" >
				<view class="chats">
					<view @click="req(u.StareId)"  style="color: #F0AD4E;">
						查看他的视频
					</view>
					<view @click="chats(u.StareId)" style="color: #F0AD4E;">
						发起聊天
					</view>
				</view>
				<view class="myinfo">
					<view >
						<image class="userinfo-avatar" :src="u.Teamers.Image" mode=""></image>
					</view>
					<view>
						{{u.Teamers.Name}}
					</view>
					<view style="color: #333333;" @click="stare(u.StareId)" :class="u.StareId" >
						取消关注
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
				this.$api.mystares({},ret=>{
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
			},
			chats(StareId){
				uni.navigateTo({
					url:"../chats/chats?to="+StareId
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
	.chats{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0, 0,10rpx ,10rpx;
	}
</style>
