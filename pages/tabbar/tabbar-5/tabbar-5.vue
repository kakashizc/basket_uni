<template>
	<view class="content">
		<view class="cat">
			<view>
				<image class="userinfo-avatar" :src="userinfo.avatar" mode=""></image>
			</view>
			<view>
				{{userinfo.name}}
			</view>
			<view v-if="show == 1">
				<button @click="MyVideo()" class="vids"> -我的视频- </button>
			</view>
			<view>
				<button @click="MyTeam()" class="vids"> -我的球队- </button>
			</view>
			<!--<view>
				<button @click="MyCourt()" class="vids" > -我的球场- </button>
			</view> -->
			<view>
				<button @click="TeamList()" class="vids"> -球队一览- </button>
			</view>
			<view>
				<button @click="MyInfo()" class="vids"> -我的信息- </button>
			</view>
			<view v-if="show == 1">
				<button @click="MyStare()" class="vids"> -我的关注- </button>
			</view>
			<view v-if="show == 1">
				<button @click="MyFans()" class="vids"> -我的粉丝- </button>
			</view>


		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo: {
					name: "请先授权",
				},
				show: 1,
				openid: ''
			}
		},

		onLoad() {
			let that = this
			let token = uni.getStorageSync("token")
			if (!token) {
				uni.navigateTo({
					url: 'auth'
				})
			} else {
				//渲染页面
				this.userinfo = uni.getStorageSync("userinfo")
				console.log(this.userinfo);
			}
			uni.request({
				url: "https://edu.zhoujiasong.top/api/index/check",
				success: (ret) => {
					console.log(ret.data.code);
					if (ret.data.code != 0) {
						this.show = 0
						console.log("77777", this.show);
					}
				}
			})


			this.$api.getOpenidOne({}, ret => {
				console.log(ret);
				if (ret.code != 0) {
					wx.showModal({
						title: "上线失败",
						content: "登录失败,请先授权",
					})

				} else {
					that.openid = ret.data.Openid
					//自动上线
					var socketTask = uni.connectSocket({
						url: 'ws://39.98.152.172:8081/ws', //仅为示例，并非真实接口地址。
						//url: 'ws://127.0.0.1:8081/ws', //仅为示例，并非真实接口地址。
						complete: (ret) => {
							console.log(ret);
						}
					});

					uni.onSocketOpen(function(res) {
						console.log('WebSocket连接已打开!');
						var arr = {
							content: "上线",
							type: 'upline',
							user: that.openid,
							openid: that.openid, //我的openid
						};
						var str = JSON.stringify(arr)
						uni.sendSocketMessage({
							data: str,
							complete: (re) => {
								console.log(re);
							}
						})
					});

				}
			})

			uni.onSocketMessage(function(re) {
				var data = JSON.parse(re.data)
				console.log("data====", data);
				if (data.type == 'upline') { //如果是单独聊天类型 , 弹出聊天框
					
					uni.showModal({
						title: '成功',
						content: '连接聊天服务器成功',
					});
				}

				if (data.type == "sig") {
					//如果是单独聊天 弹出窗口  点击跳转聊天界面
					uni.showModal({
						title: '新消息',
						content: '您有新的消息,请点击查看',
						success: function(s) {
							if (s.confirm) {
								//根据openid 查找用户id 然后跳转 chats页面带过去
								let open = data.openid
								
								//根据openid 换用户teamers表的Id
								that.$api.getUserid({
									openid:that.openid
								}, ret => {
									if(ret.code == 0 ){
										uni.navigateTo({
											url:"chats/chats?to="+ret.data.Id
										})
									}
									uni.showModal({
										title:"失败",
										content:ret.data.msg
									})
								})
							}
						}
					});
				}

			})

		},
		// onShow() {
		// 	let token = uni.getStorageSync("token")
		// 	if(!token){
		// 		uni.navigateTo({
		// 			url:'auth'
		// 		})
		// 	}else{
		// 		//渲染页面
		// 		this.userinfo = uni.getStorageSync("userinfo")
		// 		console.log(this.userinfo);
		// 	}
		// 	uni.request({
		// 		url:"https://edu.zhoujiasong.top/api/index/check",
		// 		success: (ret) => {
		// 			console.log(ret.data.code);
		// 			if(ret.data.code != 0){
		// 				this.show = 0
		// 				console.log("77777",this.show);
		// 			}
		// 		}
		// 	})
		// },
		methods: {
			MyVideo() {
				uni.navigateTo({
					url: "./myvideos/myvideos"
				})
			},
			MyTeam() {
				this.$api.myteams({}, ret => {
					if (ret.code != 0) {
						wx.showModal({
							content: "尚未填写个人信息或加入球队",
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
									uni.navigateBack({

									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						})

					} else {
						uni.navigateTo({
							url: "./myteam/myteam"
						})
					}
				})

			},
			MyCourt() {
				uni.navigateTo({
					url: "./mycourt/mycourt"
				})
			},
			TeamList() {
				uni.navigateTo({
					url: "./teamlist/teamlist"
				})
			},
			MyInfo() {
				uni.navigateTo({
					url: "./myinfo/myinfo"
				})
			},
			Cteam() {
				uni.navigateTo({
					url: "./cteam/cteam"
				})
			},
			MyStare() {
				uni.navigateTo({
					url: "./stare/stare"
				})
			},
			MyFans() {
				uni.navigateTo({
					url: "./fans/fans"
				})
			},


		}
	}
</script>

<style>
	.vids {
		background-color: deepskyblue;
		color: #333333;
	}

	.cat {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #aaa;
	}

	.cat view {
		margin: 10rpx;
	}

	.userinfo-avatar {
		overflow: hidden;
		width: 128rpx;
		height: 128rpx;
		border-radius: 50%;
	}
</style>
