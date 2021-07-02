<template>
	<view class="vid">
		<view v-for="v in vid.data" class="videos">
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
				uid: 0,
			}
		},
		onLoad(option) {
			this.uid = option.id
			this.initdata()
			
		},
		methods: {
			initdata() {
				this.$api.hervideos({
					id:this.uid
				}, ret => {
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
