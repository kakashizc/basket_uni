<template>
	<view style="padding: 30rpx;">
		<view style="display: flex; flex-direction: column; align-items: center;margin-top: 300rpx;">
			<form @submit="formSubmit">

				<view style="text-align: center;height: 50rpx;">
					<input maxlength="20" type="text" value="" name="says" placeholder="输入申请宣言" />
				</view>

				<view class="uni-btn-v">
					<button form-type="submit">提交</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				teamid: 0,
			}
		},
		onLoad(option) {
			this.teamid = JSON.parse(decodeURIComponent(option.teamid))
		},
		methods: {
			formSubmit(e) {
				var formdata = e.detail.value
				this.$api.reqin({
					"says": e.detail.value.says,
					"teamid": this.teamid,
				}, ret => {
					wx.showModal({
						content: ret.msg,
						showCancel: false,
						success: function(res) {
							if (res.confirm) {
								uni.navigateBack({})
							}
						}
					})
				})
			},
		}
	}
</script>

<style>

</style>
