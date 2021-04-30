<template>
	<view class="vid">
		<view v-for="v in vid.data.data" class="videos">
			<view>{{v.Title}} </view>
			<video :id="'abc'+v.ID" :data-ss="v.ID" :src="v.Address" controls="true" ></video>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				vid: [],
			}
		},
		onLoad() {
			this.initdata()
		},
		methods: {
			initdata() {
				this.$api.myvideos({}, ret => {
					console.log(ret);
					console.log(ret.data);
					this.vid = ret
				})
			}
		},
	}
</script>

<style>
	.videos{
		display: flex;
		justify-content:space-between;
		align-items: center;
		flex-direction:column ;
		flex-wrap: wrap;
		text-align: center;
	}
	.videos{
		padding-bottom: 20rpx;
	}
</style>
