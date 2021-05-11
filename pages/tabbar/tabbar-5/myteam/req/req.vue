<template>
	<view style="padding: 30rpx;">
		<view class="team" v-for="v in list">
			<view class="teamsons" >
				<view>
					<view>姓名:{{v.User.NickName}}</view>
				</view>
				<view style="text-align: center;">
					<image :src="v.User.AvatarUrl" class="userinfo-avatar"></image>
				</view>
			</view>

			<view class="teamsons">
				<view>
					<view>留言:{{v.Says}}</view>
				</view>
			</view>
			<view class="teamsons" style="margin-bottom: 30rpx;">
				<button @click="pass(v.ID,1,v.UserId)" class="uni-btn-v">通过</button>
				<button @click="pass(v.ID,2,v.UserId)" class="uni-btn-v">拒绝</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: {},
				teamid: 0,
			}
		},
		onLoad(option) {

			this.teamid = JSON.parse(decodeURIComponent(option.teamid))
			this.initdata()

		},
		methods: {
			initdata() {
				this.$api.reqlist({
					"teamid": this.teamid
				}, ret => {
					this.list = ret.data
				})
			},
			pass(id, status,userid) { //status = 1 通过, status = 2 拒绝
				this.$api.checkreq({
					"id": id,
					"status": status,
					"user_id":userid,
					"teamid":this.teamid
				}, ret => {
					wx.showModal({
						content: ret.msg,
						showCancel: false,
						success: function(res) {
							if (res.confirm) {
								uni.navigateBack({})
							}
						}
					})
				})
			}
		}
	}
</script>

<style>
	.teamsons {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 5%;
		border-radius: 15rpx;
		background-color: #00BFFF;
		line-height: 1.5;
	}

	.team {
		display: flex;
		flex-direction: column;
		justify-content: center;

	}

	.userinfo-avatar {
		overflow: hidden;
		width: 128rpx;
		height: 128rpx;
		border-radius: 50%;
	}
</style>
