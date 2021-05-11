<template>
	<view class="content">
			<view v-if="isnull == 0">
				<view>无数据</view>
			</view>
			<view  v-else v-for="u in userinfo" >
				<view class="myinfo">
					<view >
						<image class="userinfo-avatar" :src="u.Image" mode=""></image>
					</view>
					<view>
						{{u.Name}}
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
		onLoad(option) {
			this.teamid = JSON.parse(decodeURIComponent(option.teamid))
			this.initdata()
		},
		methods: {
			initdata(){
				this.$api.myteamers({"teamid":this.teamid},ret=>{
					
					if(ret.code == 0){
						this.userinfo = ret.data
					}else{
						this.isnull = 0
					}

				})
			},
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
