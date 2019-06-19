/**
 * name: index.js
 * author: jie
 */
"use strict";

//全局定义
const URI = "http://127.0.0.1:3000";

// ajax
const ajax = opt => {
	opt = opt || {};
	opt.url = opt.url || '';
	opt.data = opt.data || null;
	opt.method = opt.method || 'GET';
	opt.header = opt.header || {
		"Content-Type": "application/json"
	};
	opt.success = opt.success || function() {};

	uni.request({
		url: URI + opt.url,
		data: opt.data,
		method: opt.method,
		header: opt.header,
		dataType: 'json',
		success: function(res) {
			opt.success(res);
		},
		fail: function() {
			uni.showToast({
				title: '请求错误，请重新加载...'
			});
		}
	})
}

// uploadFile
const uploadFile = opt => {
	opt = opt || {};
	opt.url = opt.url || '';
	opt.filePath = opt.filePath || null; //要上传文件资源的路径。   
	opt.name = opt.name || null; //文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容 

	opt.filePath = opt.filePath || null;
	opt.success = opt.success || function() {};

	uni.uploadFile({
		url: ApiUrl + opt.url,
		filePath: opt.filePath,
		name: opt.name,
		success: function(res) {
			opt.success(res);
		},
		fail: function() {
			uni.showToast({
				title: '请稍后重试'
			});
		}
	})
}

module.exports = {
	ajax: ajax,
	upload: uploadFile
};