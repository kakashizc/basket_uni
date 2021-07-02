import {
	apiBaseUrl
} from './config.js';
const methodsToken = [
	'user.info'
];

export const banners = (data,callback) => urlGet(apiBaseUrl + 'v2/banner', data,callback);
export const cats = (data,callback) => urlPost(apiBaseUrl + 'v2/cat', data,callback);
export const vids = (data,callback) => urlPost(apiBaseUrl + 'v2/vid', data,callback);
export const sendDm = (data,callback) => urlPost(apiBaseUrl + 'v2/danm', data,callback);
export const auth = (data,callback) => urlPost(apiBaseUrl + 'v2/wauth', data,callback);
export const upv = (data,callback) => urlPost(apiBaseUrl + 'v3/upvideo', data,callback);
export const sumb = (data,callback) => urlPostToken(apiBaseUrl + 'v3/sumb', data,callback);
export const myvideos = (data,callback) => urlPostToken(apiBaseUrl + 'v3/myvideos', data,callback);
export const allteams = (data,callback) => urlPostToken(apiBaseUrl + 'v3/allteams', data,callback);//全部队伍列表
export const myteams = (data,callback) => urlPostToken(apiBaseUrl + 'v3/myteams', data,callback);//我的队伍
export const cteam = (data,callback) => urlPostToken(apiBaseUrl + 'v3/cteam', data,callback);//创建我的球队
export const myteamers = (data,callback) => urlPostToken(apiBaseUrl + 'v3/myteamers', data,callback);//队伍下的所有队员信息
export const myinfo= (data,callback) => urlPostToken(apiBaseUrl + 'v3/myinfo', data,callback);//我的个人信息
export const emyinfo= (data,callback) => urlPostToken(apiBaseUrl + 'v3/emyinfo', data,callback);//编辑我的个人信息

export const reqin= (data,callback) => urlPostToken(apiBaseUrl + 'v3/reqin', data,callback);//申请加入队伍
export const checkreq= (data,callback) => urlPostToken(apiBaseUrl + 'v3/checkreq', data,callback);//审核申请
export const reqlist= (data,callback) => urlPostToken(apiBaseUrl + 'v3/reqlist', data,callback);//审核申请

export const stare= (data,callback) => urlPostToken(apiBaseUrl + 'v3/stare', data,callback);//关注某人
export const unstare= (data,callback) => urlPostToken(apiBaseUrl + 'v3/unstare', data,callback);//取关某人

export const myfans= (data,callback) => urlPostToken(apiBaseUrl + 'v3/myfans', data,callback);//我的粉丝
export const mystares= (data,callback) => urlPostToken(apiBaseUrl + 'v3/mystares', data,callback);//我关注的人
export const hervideos= (data,callback) => urlPostToken(apiBaseUrl + 'v3/hervideos', data,callback);//某个人发布的视频
export const getOpenid= (data,callback) => urlPostToken(apiBaseUrl + 'v3/getopenid', data,callback);//根据token获取openid
export const getOpenidOne= (data,callback) => urlPostToken(apiBaseUrl + 'v3/getopenidone', data,callback);//根据token获取openid (仅我的)

export const getUserid= (data,callback) => urlPostToken(apiBaseUrl + 'v3/getUserid', data,callback);//根据openid获取uid

const urlGet =  (url,data,callback) => {
	uni.showLoading({
		title: '加载中'
	});
	uni.request({
		url: url,
		header: {
			'content-type':'application/x-www-form-urlencoded;charset=UTF-8', //自定义请求头信息
		},
		data:data,
		method: 'GET',
		success: (response) => {
			uni.hideLoading();
			callback(response.data);
		},
		fail: (error) => {
			console.log(error);
			uni.hideLoading();
			if (error && error.response) {
				showError(error.response);
			}
		},
		complete: () => {
			setTimeout(function() {
				uni.hideLoading();
			}, 250);
		}
	});
}
const urlPostToken =  (url,data,callback) => {
	uni.showLoading({
		title: '加载中'
	});
	uni.request({
		url: url,
		header: {
			'content-type':'application/x-www-form-urlencoded;charset=UTF-8', //自定义请求头信息
			'Authorization':uni.getStorageSync('token'),
		},
		data:data,
		method: 'POST',
		success: (response) => {
			uni.hideLoading();
			callback(response.data);
		},
		fail: (error) => {
			console.log(error);
			uni.hideLoading();
			if (error && error.response) {
				showError(error.response);
			}
		},
		complete: () => {
			setTimeout(function() {
				uni.hideLoading();
			}, 250);
		}
	});
}
const urlPost =  (url,data,callback) => {
	uni.showLoading({
		title: '加载中'
	});
	uni.request({
		url: url,
		header: {
			'content-type':'application/x-www-form-urlencoded;charset=UTF-8', //自定义请求头信息
		},
		data:data,
		method: 'POST',
		success: (response) => {
			uni.hideLoading();
			callback(response.data);
		},
		fail: (error) => {
			console.log(error);
			uni.hideLoading();
			if (error && error.response) {
				showError(error.response);
			}
		},
		complete: () => {
			setTimeout(function() {
				uni.hideLoading();
			}, 250);
		}
	});
}
const post = (method, data, callback,complete) => {
	uni.showLoading({
		title: '加载中'
	});

	// 判断token是否存在
	if (methodsToken.indexOf(method) >= 0) {
		// 获取用户token
		let userToken = db.get("userToken");
		if (!userToken) {
			common.jumpToLogin();
			return false;
		} else {
			data.token = userToken;
		}
	}

	data.method = method;

	uni.request({
		url: apiBaseUrl + 'api.html',
		data: data,
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			// 'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
		},
		method: 'POST',
		success: (response) => {
			uni.hideLoading();
			const result = response.data
			if (!result.status) {
				// 登录信息过期或者未登录
				if (result.data === 14007 || result.data === 14006) {
					db.del("userToken");
					uni.showToast({
						title: result.msg,
						icon: 'none',
						duration: 1000,
						complete: function() {
							setTimeout(function() {
								uni.hideToast();
								// #ifdef H5 || APP-PLUS || APP-PLUS-NVUE
								uni.navigateTo({
									url: '/pages/login/login/index1'
								})
								// #endif
								// #ifdef MP-WEIXIN || MP-ALIPAY || MP-TOUTIAO
								uni.navigateTo({
									url: '/pages/login/choose/index',
									animationType: 'pop-in',
									animationDuration: 200
								});
								// #endif
							}, 1000)
						}
					});
				}
			}
			callback(result);
		},
		complete: (response) => {
			setTimeout(function() {
				uni.hideLoading();
			}, 1000)
			complete?complete(): "";
		},
		fail: (error) => {
			uni.showLoading({
				title: '网络开小差了'
			});
			setTimeout(function() {
				uni.hideLoading();
			}, 1000)
			if (error && error.response) {
				showError(error.response);
			} else {
				
			}
			
		},
	});

}

// 上传图片
export const uploadImage = (num, callback) => {
	uni.chooseImage({
		count: num,
		success: (res) => {
			uni.showLoading({
				title: '上传中...'
			});
			let tempFilePaths = res.tempFilePaths
			for (var i = 0; i < tempFilePaths.length; i++) {
				uni.uploadFile({
					url: apiBaseUrl + 'api.html',
					filePath: tempFilePaths[i],
					fileType: 'image',
					name: 'file',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'multipart/form-data',
					},
					formData: {
						'method': 'images.upload',
						'upfile': tempFilePaths[i]
					},
					success: (uploadFileRes) => {
						callback(JSON.parse(uploadFileRes.data));
					},
					fail: (error) => {
						if (error && error.response) {
							showError(error.response);
						}
					},
					complete: () => {
						setTimeout(function() {
							uni.hideLoading();
						}, 250);
					},
				});
			}
		}
	});
}