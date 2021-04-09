<template>
	 <view>
	        <swiper class="swiper" :indicator-dots="false" :autoplay="true" :interval="3000" :circular="true">
	        	<swiper-item v-for="item in db.data">
	        		<image :src="item.image" mode="aspectFill"></image>
	        	</swiper-item>
	        </swiper>
	        
	</view>
</template>

<script>
export default {
		data() {
	        return {
	            db: [],
	        }
	    },
		onLoad() {
			this.indexData()
		},
	    methods: {
	        indexData() {
				uni.request({
				    url: 'https://wx.zhoujiasong.top/api/index/getBanner', 
				    success: (res) => {
				        console.log(res.data.data);
						this.db = res.data
				    }
				});
	        },
	    }
};
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 200upx;
	}
	.swiper {
		height: 400rpx;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.swiper image {
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
	}
</style>
