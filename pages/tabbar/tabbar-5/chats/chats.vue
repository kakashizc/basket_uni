<template>
	<view class="content">
		<view class="title">
			<view>开始聊天吧~!</view>
		</view>
		
		<view class="chatContent">
			
			<view v-for="v in chat_list">
				{{v}}
			</view>
		</view>
		
		<view class="myinfo">
				<input type="text" value="" v-model="says" placeholder="请输入" >
				<button @click="sendmsg()"> 发送 </button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				says:'',
				chat_list:[],
				username:'',
				openid:'123',
				topenid:'1'
			}
		},
		onLoad(options) {
			console.log(options);
			let that = this
			var userinfo =  uni.getStorageSync('userinfo')
			that.username = userinfo.name
			//获取用户的唯一 openid
			that.$api.getOpenid({
				to:options.to
			},ret=>{
				console.log(ret);
				if(ret.code == 0){
					that.openid = ret.data.Myopen
					that.topenid = ret.data.Heopen
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
							content: '大家好,我是黄发',
							type: 'login',
							user: '黄发',
							openid: that.openid,//我的openid
							topenid : that.topenid //聊天对象的openid
						};
						var str = JSON.stringify(arr)
						uni.sendSocketMessage({
							data: str,
							complete: (re) => {
								console.log(re);
							}
						})
					});
					
					//发送检测聊天对象是否存在
					var arr1 = {
						type: 'check',
						user: '黄发',
						openid: that.openid,//我的openid
						topenid : that.topenid //聊天对象的openid
					}
					var str1 = JSON.stringify(arr1)
					uni.sendSocketMessage({
						data:str1,
						complete:(rett) =>{
							console.log(rett);
						}
					})
					uni.onSocketMessage(function(res) {
						console.log('onsocketmsg=====',res.data);
						var data = JSON.parse(res.data)
						if(data.type ==  'not'){
							wx.showModal({
								title:"不在线",
								content:"对方不在线",
								success() {
									uni.navigateBack({
										
									})
								}
							})
							uni.closeSocket({
								
							})
						}
						if(data.sigto != ''){
							that.chat_list.push(data.from+ ':'+data.content)
						}
						
					});
				}else{
					//跳转授权
					uni.navigateTo({
						url:"../auth"
					})
				}
			})
		},
		methods: {
			sendmsg() {
				var that = this
				var msg = {
					content: that.says,
					type: 'sig',
					from: that.username,
					to: '127.0.0.1:53026'
				};
				var str = JSON.stringify(msg)
				uni.sendSocketMessage({
					data: str,
					success:(res)=>{
						//追加要页面聊天框
						that.chat_list.push(that.username+':'+that.says)
						that.says = '';
					},
					complete: (re) => {
						
					},
					fail: (ret) => {
						
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.title{
		text-align: center;
	}
	.content {
		padding: 20rpx;
	}
	.myinfo {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		text-align: center;
		position: fixed;
		bottom: 10rpx;
		left: 0;
		right: 0;
		button{
			width: 500rpx;
		}
	}
	
</style>
