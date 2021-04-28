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
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				
				uni.showModal({
					content: '表单数据内容：' + JSON.stringify(formdata),
					showCancel: false
				});
			},
			//点击上传视频
			test: function() {
				var self = this;
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success: function(res) {
						console.log("edu.zhoujiasong.top/v2/upvideo");
						console.log("选择视频成功", res)
						self.showVideo = true
						self.addVideo = false
						self.src = res.tempFilePath;
						uni.uploadFile({
							url: "http://edu.zhoujiasong.top/v2/upvideo", //接口地址
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
								console.log(bold.path)
								self.returnImage = bold.path
								console.log("this.returnImage", self.returnImage)
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
