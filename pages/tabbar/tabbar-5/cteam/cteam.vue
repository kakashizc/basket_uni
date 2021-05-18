<template>
	<view class="content">
		<form @submit="formSubmit">
			<view class="myinfo">
				<view class="teamsons">
					<view>
						名称:
					</view>
					<view>
						<input type="text" :value="userinfo.Name" name="name">
					</view>
				</view>
				<view class="teamsons">
					<view>
						简介:
					</view>
					<view>
						<input type="text" :value="userinfo.Says" maxlength="20" name="says">
					</view>
				</view>
				<view class="teamsons">
					<view>
						联系方式:
					</view>
					<view>
						<input type="text" :value="userinfo.Mobile" name="mobile">
					</view>
				</view>
				<view class="teamsons">
					<view>
						图标:
					</view>
					<view @click="selectimg">
						<view v-if="userinfo.Image">
							<image :src="userinfo.Image" mode="" style="width: 100rpx;height:100rpx">
							</image>
						</view>
						<view v-else>
							<image :src="tx" mode="" style="width: 100rpx;height:100rpx"></image>
						</view>

					</view>
				</view>
				<view class="uni-btn-v">
					<button form-type="submit">提交</button>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo: {},
				tx: "../../../../static/img/tabbar/homeactive.png",
				returnImage:'',
			}
		},
		onLoad() {
			this.myteam()
		},
		methods: {
			myteam() {
				this.$api.myteams({}, ret => {
					console.log("66666",ret);
					this.userinfo = ret.data.data[0].Team
					console.log(this.userinfo);
				})
			},
			formSubmit(e) {
				var formdata = e.detail.value
				console.log(formdata);
				if (this.returnImage != '') {
					e.detail.value.image = this.returnImage
				}
				this.$api.cteam({
					"name": e.detail.value.name,
					"says": e.detail.value.says,
					"mobile": e.detail.value.mobile,
					"image": e.detail.value.image?e.detail.value.image:'',
				},ret=>{
					if(ret.code == 0){
						uni.showModal({
							content:ret.msg,
							showCancel:true,
							success(rs) {
								if(rs.confirm){
									uni.navigateBack({
										
									})
								}
							}
						})
					}
				})

			},
			selectimg() {
				var self = this;
				uni.chooseImage({
					count: 1,
					sourceType: ['camera', 'album'],
					success: function(res) {
						self.tx = res.tempFilePaths[0]
						self.userinfo.Image = res.tempFilePaths[0]
						uni.uploadFile({
							url: "https://edu.zhoujiasong.top/router/v3/upvideo", //接口地址
							filePath: res.tempFilePaths[0],
							name: 'files',
							header: {
								Authorization: uni.getStorageSync('token')
							},
							success: (uploadFileRes) => {
								let bold = JSON.parse(uploadFileRes.data)
								if (bold.code != 0) {
									wx.showModal({
										content: bold.msg
									})
									return
								}
								self.returnImage = bold.data.path
								wx.showModal({
									title: "ok",
									content: bold.msg
								})
							},
							complete(re) {
								console.log(re);
							}
						});
					}
				});
			}
		}
	}
</script>

<style>
	.myinfo {
		display: flex;
		flex-direction: column;
		flex-wrap: no-wrap;
	}

	.teamsons {
		display: flex;
		justify-content: space-between;
		padding: 2% 0% 3% 0%;
	}

	.content {
		padding: 20rpx;
	}
</style>
