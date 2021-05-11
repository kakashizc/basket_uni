<template>
	<view class="content">
		<view class="myinfo">
			<view>
				<image class="userinfo-avatar" :src="userinfo.Image" mode=""></image>
			</view>
			<view>
				{{userinfo.Name}}
			</view>
		</view>
		
		<view class="cat">
			<view>
				简介: {{userinfo.Intro}}
			</view>
		</view>
		<view v-if="isshow == 0">
			<view style="text-align: center;margin-top: 10rpx;" @click="cmyteam">
				<button style="color:#DD524D"> 创建我的球队 </button>
			</view>
			<view style="text-align: center;margin-top: 10rpx; ">
				<button style="color:#F0AD4E"> 寻找加入球队 </button>
			</view>
		</view>
		<view  v-else class="team">
			<view class="teamsons">
				<view>
					队伍名称:
				</view>
				<view>
					{{userinfo.Team.Name}}
				</view>
			</view>
			<view class="teamsons">
				<view>
					队伍图标:
				</view>
				<view>
					<!-- <image src="../../../../static/img/tabbar/homeactive.png" mode="" style="width: 40rpx;height:40rpx"></image> -->
					<image :src="userinfo.Team.Image" mode="" style="width: 40rpx;height:40rpx"></image>
				</view>
			</view>
			<view class="teamsons">
				<view>
					联系队伍:
				</view>
				<view>
					 {{userinfo.Team.Mobile}}
				</view>
			</view>
			<view class="teamsons">
				<view>
					成员列表:
				</view>
				<view @click="toteamers(userinfo.TeamId)">
					点击查看
				</view>
			</view>
			<view class="teamsons" v-if="isteacher == 1" @click="cmyteam" style="color: #F0AD4E;">
				编辑队伍信息
			</view>
			<view class="teamsons" v-if="isteacher == 1"  @click="reqlist(userinfo.TeamId)" style="color: #F0AD4E;">
				申请加入列表
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo:{},
				isshow:1,
				isteacher:0,
			}
		},

		onShow() {
			this.myteam()
		},
		methods: {
			myteam(){
				this.$api.myteams({},ret=>{
					console.log(ret.data.data[0].Team.ID);
					if(ret.data.data[0].Team.ID != 0){
						
						this.userinfo = ret.data.data[0]
					}else{
						this.userinfo = ret.data.data[0]
						this.isshow = 0
					}
					if(ret.data.data[0].Team.ID == ret.data.data[0].TeamId){
						this.isteacher = 1
					}
					
				})
			},
			toteamers(teamid){
				console.log(teamid);
				uni.navigateTo({
					url:"./teamers/teamers?teamid="+encodeURIComponent(JSON.stringify(teamid)),
				})
			},
			cmyteam(){
				uni.navigateTo({
					url:"../cteam/cteam"
				})
			},
			reqlist(teamid){
				uni.navigateTo({
					url:"./req/req?teamid="+encodeURIComponent(JSON.stringify(teamid))
				})
			}
		}
	}
</script>

<style>
	.teamsons{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 2% 0% 3% 0%;
		align-items: center;
	}
	.team{
		display: flex;
		flex-direction: column;
		justify-content:center;
		
	}
	.content{
		padding: 20rpx;
	}
	.myinfo {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 5%;
		border-radius: 15rpx;
		background-color:#00BFFF;
		line-height: 1.5;
	}
	.cat {
		display: flex;
		flex-direction: row;
		justify-content: center;
		color: #aaa;
		padding: 10rpx;
	}
	.userinfo-avatar{
	  overflow: hidden;
	  width: 128rpx;
	  height: 128rpx;
	  border-radius: 50%;
	}
</style>
