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
					<video :src="v.Address" controls="true" show-fullscreen-btn="true" :danmu-list="danmuList" enable-danmu danmu-btn></video>
					<view>{{v.Title}}</view>
				  </view>
				  <!-- #ifndef MP-ALIPAY -->
				  <view class="uni-list uni-common-mt">
					  <view class="uni-list-cell">
						  <view>
							  <view class="uni-label">弹幕内容</view>
						  </view>
						  <view class="uni-list-cell-db">
							  <input v-model="danmuValue" class="uni-input" type="text" placeholder="在此处输入弹幕内容" />
						  </view>
					  </view>
				  </view>
				  <view class="uni-btn-v">
					  <button @click="sendDanmu" class="page-body-button">发送弹幕</button>
				  </view>
				  <!-- #endif -->
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
				danmuList: [{
						text: '第 1s 出现的弹幕',
						color: '#ff0000',
						time: 1
					},
					{
						text: '第 3s 出现的弹幕',
						color: '#ff00ff',
						time: 3
					}
				],
				danmuValue: ''
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
					console.log(res);
					this.vid = res
				})
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
