<template>
	<view class="content">
		<view class="add_picture">
			<label class="title">视频</label><br>
			<view class="many_photo" v-show="addVideo">
				<image src="../../../static/img/video.png" @click="test"></image>
			</view>
			<view class="" v-show="showVideo" style="position: relative;">
				<video :src="src" style="video"></video>
				<image src="../../../static/img/qa.png" @click="DelImg" class="close-img" style="height: 36rpx;">
				</image>
			</view>
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item uni-column">
					<input class="uni-input" name="title" placeholder="视频简介" />
				</view>
				<view class="uni-btn-v">
					<button form-type="submit">提交</button>
					<!-- <button type="default" form-type="reset">Reset</button> -->
				</view>
			</form>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				src: '',
				showVideo: false,
				addVideo: true,
			}
		},
		onLoad() {

		},
		onShow() {
			let token = uni.getStorageSync("token")
			if (!token) {
				uni.navigateTo({
					url: '../../tabbar/tabbar-5/auth'
				})
			}
		},
		methods: {
			formSubmit: function(e) {
				var self = this
				var formdata = e.detail.value
				if (self.returnImage != undefined) {
					e.detail.value.videopath = self.returnImage
				} else {
					uni.showModal({
						title: "提交失败",
						content: "请先上传视频"
					})
					return
				}
				console.log('form发生了submit事件，携带数据为：' + (e.detail.value))
				//调用接口 上传到服务器
				self.$api.sumb({
					"title": e.detail.value.title,
					"address": e.detail.value.videopath,
				}, ret => {
					console.log(ret);
					if (ret.code == 0) {
						uni.showModal({
							title: "提交成功",
							content: "提交成功",
							success: function(re) {
								if (re.confirm) {
									uni.navigateBack({
										delta: 2
									})
								} else if (re.cancel) {
									console.log('用户点击取消');
								}
							}
						})

					} else {
						uni.showModal({
							title: "提交失败",
							content: "提交失败"
						})
					}

				})
			},
			//点击上传视频
			test: function() {
				var self = this;
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success: function(res) {
						console.log("选择视频成功", res)
						if (res.duration >= 30){
							uni.showModal({
								title: "视频过长",
								content: "请上传短于30秒的视频"
							})
							return
						}
						self.showVideo = true
						self.addVideo = false
						self.src = res.tempFilePath;
						uni.uploadFile({
							url: "https://edu.zhoujiasong.top/router/v3/upvideo", //接口地址
							filePath: res.tempFilePath,
							name: 'files',
							// formData: {
							//     'user': 'test'
							// },
							header: {
								Authorization: uni.getStorageSync('token')
							},
							success: (uploadFileRes) => {
								console.log('1张', uploadFileRes);
								let bold = JSON.parse(uploadFileRes.data)
								console.log(bold)
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
						});
					}
				});
			},
			//右上角删除视频
			DelImg() {
				this.src = '',
					this.showVideo = false,
					this.addVideo = true,
					this.returnImage = false
			},

		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 200upx;
	}

	/deep/uni-video {
		margin-top: 20rpx;
		margin-left: 5%;

	}

	.close-img {
		position: absolute;
		height: 36rpx !important;
		width: 36rpx !important;
		top: -18rpx;
		/* right: -18rpx; */
	}
</style>
