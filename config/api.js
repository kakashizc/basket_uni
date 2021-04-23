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