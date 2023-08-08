import NEV from "./request.js"

// 登陆更新
// import logout from "@/utils/logout.js"

const defauls = {
	method: "GET",
	loading: true
}

export default (path, data = {}, method, config = defauls) => {
	// console.log ('请求拦截', path, data, method, config);
	const token = uni.getStorageInfoSync("token");
	const Authorization = token ? `Bearer ${uni.getStorageSync("token")}` : "";
	
	if(config.loading) {
		uni.showLoading({
			title: "加载中",
			mask: true
		});
	}
	
	return new Promise((resolve, reject) => {
		console.log('api', NEV.api)
		uni.request({
			header: {
				Authorization
			},
			url: NEV.api + path,
			method: method,
			data,
			success(response) {
				// console.log("相应拦截", response);
				if(response.data.code === 401 || response.data.code === 400) {
					// logout();
				}
				if(response.data.code !== 20) {
					// uni.showToast({
					// 	icon: "none",
					// 	title: response.data.msg
					// });
				}
				
				resolve(response.data)
			},
			fail(err) {
				uni.showToast({
					icon: "none",
					title: "服务器响应失败"
				});
				console.error(err);
				reject(err);
			},
			complete() {
				uni.hideLoading();
			}
		});
	});
	
};
