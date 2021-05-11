<template>
	<view class="content">
		<form @submit="formSubmit">
			<view class="myinfo">
				<view class="teamsons">
					<view>
						姓名:
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
						<input type="text" :value="userinfo.Intro" maxlength="20" name="intro">
					</view>
				</view>
				<view class="teamsons">
					<view>
						位置:
					</view>
					<view>
						<input type="text" :value="userinfo.Position" name="position">
					</view>
				</view>
				<view class="teamsons">
					<view>
						头像:
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
				this.$api.myinfo({}, ret => {
					this.userinfo = ret.data
					console.log(this.userinfo);
				})
			},
			formSubmit(e) {
				var formdata = e.detail.value
				console.log(formdata);
				if (this.returnImage != '') {
					e.detail.value.image = this.returnImage
				}
				this.$api.emyinfo({
					"name": e.detail.value.name,
					"intro": e.detail.value.intro,
					"position": e.detail.value.position,
					"image": e.detail.value.image?e.detail.value.image:'',
				},ret=>{
					console.log(ret);
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
							url: "http://edu.zhoujiasong.top:8080/v3/upvideo", //接口地址
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
