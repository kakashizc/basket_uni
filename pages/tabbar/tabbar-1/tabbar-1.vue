<template>
	<view>
		<swiper class="swiper" :indicator-dots="false" :autoplay="true" :interval="3000" :circular="true">
			<swiper-item v-for="item in db.data">
				<image :src="item.Image" mode="aspectFill"></image>
			</swiper-item>
		</swiper>

		<!-- <scroll-view scroll-x="true" class="tabbar-list" show-scrollbar="0">
				<view  class="tabbar-item"  v-for="it in cat.data" >
					<image :src="it.Image" style="width: 78px; height: 78px;" mode="aspectFill"></image>
					<view class="active-tabbar">{{it.Name}}</view>
				</view>
			</scroll-view> -->

		<view class="cat">
			<view v-for="it in cat.data">
				<image :src="it.Image"></image>
				<view class="active-tabbar vit">{{it.Name}}</view>
			</view>
		</view>

		<view class="vid">
			<view v-for="v in vid.data" class="videos">
				<view>{{v.Title}} </view>
				<video :id="'abc'+v.ID" :data-ss="v.ID" :src="v.Address" controls="true"
					@timeupdate="videoTimeUpdateEvent" :danmu-list="v.Comments" enable-danmu danmu-btn></video>

				<!-- #ifndef MP-ALIPAY -->
				<view class="uni-list uni-common-mt">
					<view class="uni-list-cell">
						<view class="uni-list-cell-db">
							<input v-model="danmuValue" class="uni-input" type="text" placeholder="输入弹幕" />
						</view>
					</view>
				</view>
				<view class="uni-btn-v">
					<button @click="sendDanmu" :data-id="v.ID" class="page-body-button send">发送</button>
				</view>
				<!-- #endif -->
			</view>
			<!-- wx52a8b1ff0844198a
				 1fd89b44c3c553da50bfd968262340e5 -->
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				db: [],
				cat: [],
				vid: [],
				curtime: [],
				src: '',
				danmuValue: '',
				page:1,
				num:2
			}
		},
		onLoad() {
			this.indexData()
		},
		onReachBottom(){// 划到最底
			this.page++
			this.$api.vids({
				"page": this.page,
				"num": this.num
			}, res => {
				console.log(res.data);
				if(res.data.length == 0){
					uni.showToast({
						title:"已经到底啦!",
						duration:2000
					})
				}
				this.vid.data = this.vid.data.concat(res.data);//合并数组
				this.vid.data.forEach((item, key) => {
					//弹幕时间
					this.curtime[item.ID] = key
					item.Comments.forEach((v, k) => {
						v['text'] = v.Says //弹幕内容
						v['time'] = v.Second //弹幕出现的秒数
					})
				})
			})
		},
		methods: {
			indexData() {
				this.$api.banners({}, res => {
					this.db = res
				})
				this.$api.cats({
					"shows": "1"
				}, res => {
					this.cat = res
				})
				this.$api.vids({
					"page": this.page,
					"num": this.page
				}, res => {
					this.vid = res
					res.data.forEach((item, key) => {
						//弹幕时间
						this.curtime[item.ID] = key
						item.Comments.forEach((v, k) => {
							v['text'] = v.Says //弹幕内容
							v['time'] = v.Second //弹幕出现的秒数
						})
					})
					console.log(this.curtime);
				})
			},

			sendDanmu: function(e) {
				let oid = e.currentTarget.dataset.id
				this.videoContext = uni.createVideoContext("abc" + oid)
				this.videoContext.sendDanmu({
					text: this.danmuValue,
					color: "#FFF",
				});
				//1,获取当前播放的描述
				let second = this.curtime[oid]
				console.log(second)
				//2,数据发送给后台
				this.$api.sendDm({
					'Second': parseInt(second),
					'Says': this.danmuValue,
					'VideoId': oid
				}, res => {
					if (res.code == 0) {
						uni.showModal({
							title: '成功',
						})
					} else {
						uni.showModal({
							title: res.msg
						})
					}
				})

				this.danmuValue = '';

			},
			videoTimeUpdateEvent(e) { // 播放进度改变
				//记录当前视频的当前播放秒数,提供给发送弹幕后台使用
				this.curtime[e.currentTarget.dataset.ss] = e.detail.currentTime
			},
		}
	};
</script>

<style lang="less">
	.vid {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		border: 5px solid deepskyblue;
		text-align: center;
	}

	.videos {
		padding-bottom: 20rpx;
	}

	.send {
		width: 70px;
		height: 30px;
		font-size: 10px;
		background-color: lightblue
	}

	uni-video {
		width: 362px;
	}

	.cat {
		height: 120px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;
		text-align: center;
		padding: 20rpx;
		image{
			width: 60px;
			height: 60px;
		}
		.vit{
			font-size: 15px;
			color: #808080;
		}
		
	}

	.content {
		text-align: center;
		height: 400upx;
		margin-top: 200upx;
	}

	.swiper {
		height: 400rpx;
		padding: 20rpx;
		box-sizing: border-box;

		image {
			width: 100%;
			height: 100%;
			border-radius: 20rpx;
		}
	}

	.tabbar-list {
		padding: 10rpx 0;
		background-color: #fff;
		white-space: nowrap;
		width: 100%;
		display: flex !important;
		justify-content: space-between !important;
		text-align: center;

	}

	.tabbar-item {
		display: inline-block;
		padding: 10rpx 16rpx;

	}

	/deep/::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
	}
</style>
