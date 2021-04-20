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
			
			<view class="cat" >
				<view v-for="it in cat.data">
					<image :src="it.Image" style="width: 78px; height: 78px;"></image>
					<view class="active-tabbar">{{it.Name}}</view>
				</view>
			</view>
			
			<view class="vid">
				  <view v-for="v in vid.data">
					<video :src="v.Address"  controls="true"  :danmu-list="v.Comments" enable-danmu danmu-btn></video>
					<view>{{v.Title}} </view>
					<view>{{v.ID}}</view>
					<!-- #ifndef MP-ALIPAY -->
					<view class="uni-list uni-common-mt">
						<view class="uni-list-cell">
							<view class="uni-list-cell-db">
							  <input v-model="danmuValue" class="uni-input" type="text" placeholder="输入弹幕" />
							</view>
						</view>
					</view>
					<view class="uni-btn-v">
						<button @click="sendDanmu" class="page-body-button">发送</button>
					</view>
					<!-- #endif -->
				  </view>
				 
			</view>
			
	</view>
</template>

<script>
export default {
		data() {
	        return {
	            db: [],
				cat:[],
				vid:[],
				src: '',
				danmuValue: '123'
	        }
	    },
		onLoad() {
			this.indexData()
		},
	    methods: {
	        indexData() {
				this.$api.banners({},res=>{
					this.db = res
				})
				this.$api.cats({"shows":"1"},res=>{
					this.cat = res
				})
				this.$api.vids({},res=>{
					this.vid = res
					res.data.forEach((item,key) =>{
						item.Comments.forEach((v,k) =>{
							v['text'] = v.Says //弹幕内容
							v['time'] = v.Second //弹幕出现的秒数
						})
					})
				})
	        },
			
			sendDanmu: function() {
				console.log(this.danmuValue);
				this.videoContext.sendDanmu({
					text: this.danmuValue,
					color: this.getRandomColor()
				});
				// this.danmuValue = '';
			},
	    }
};
</script>

<style lang="less">
	.vid{
		display: flex;
		justify-content: space-between;
		flex-direction:column ;
		border: 5px solid deepskyblue;
		text-align: center;
	}
	uni-video {
	    width: 362px;
	}
	.cat{
		height: 150px;
		display: flex;
		flex-direction:row ;
		justify-content: space-between;
		flex-wrap: wrap;
		text-align: center;
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

	.tabbar-list{
		padding: 10rpx 0;
		background-color: #fff;
		white-space: nowrap;
		width: 100%;
		display: flex!important;
		justify-content: space-between!important;
		text-align: center;
		
	}
	.tabbar-item{
		display: inline-block;
		padding: 10rpx 16rpx;
		
	}
	/deep/::-webkit-scrollbar {
	   display: none;
	   width: 0;
	   height: 0;
	} 
	
	
</style>
