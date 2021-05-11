<template>
	<view class="content">
		<view v-for="v in teams">
			
			<view @click="req(v.ID)" style="text-align: center;">
				<view style="color: #F0AD4E;">
					申请加入
				</view>
			</view>
			<view class="cat" @click="teamers(v.ID)">
				<view>
					<image class="userinfo-avatar" :src="v.Image" mode=""></image>
				</view>
				<view>
					{{v.Name}}
				</view>
				<view>
					{{v.Mobile}}
				</view>
				<view>
					{{v.Says}}
				</view>
			</view>
			
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				teams: {},
			}
		},
		onLoad() {
			this.initdata()
		},
		methods: {
			initdata() {
				this.$api.allteams({}, ret => {
					if (ret.code != 0) {
						wx.showModal({
							content: ret.msg,
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									uni.navigateBack({})
								}
							}
						})
					} else {
						this.teams = ret.data
					}
				})
			},
			teamers(teamid){
				console.log(teamid);
				uni.navigateTo({
					url:"../myteam/teamers/teamers?teamid="+encodeURIComponent(JSON.stringify(teamid)),
				})
			},
			//申请加入球队
			req(teamid){
				console.log(teamid);
				uni.navigateTo({
					url:"./reqin/reqin?teamid="+encodeURIComponent(JSON.stringify(teamid)),
				})
			}
		}
	}
</script>

<style lang="less">
	.content {
		padding: 20rpx;
	}

	.cat {
		height: 100px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 5%;
		border-radius: 15rpx;
		background-color:#00BFFF;
		line-height: 1.5;
		margin-bottom: 30rpx;
		flex-wrap: wrap;
	}

	.userinfo-avatar {
		overflow: hidden;
		width: 128rpx;
		height: 128rpx;
		border-radius: 50%;
	}
</style>
