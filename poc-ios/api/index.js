import request from "@/config/index.js"

export default {
	// 查询客户端用户列表
	cliebtUser(params) {
		return request(`/api/wishlist/clientUser/list`, params, 'GET');
	},
	
	// 查询客户端用户详情
	userDetail(params) {
		return request(`/api/wishlist/clientUser/${params}`, '', 'GET');
	},
	
	// 查询客户心愿列表
	wishList(params) {
		return request(`/api/fa/clients/${params}/wishlists`, '', 'GET');
	},
	
	// 获取建议单列表
	suggestList(params) {
		return request(`/api/fa/suggestionboards`, '', 'GET');
	},
	
	// 获取客户推荐单列表
	getSuggestList(params) {
		return request(`/api/fa/clients/${params}/suggestionboards`, '', 'GET');
	},
	
	// 删除建议单
	delSuggest(params) {
		return request(`/suggestionboards/${params}`, '', 'GET');
	},
	
	// 查询建议单商品信息
	getSuggestGoods(params) {
		return request(`/api/wishlist/product/listByIds?${params}`, '', 'GET');
	},
	
	// 删除建议单产品
	delSuggestGoods(params) {
		return request(`/suggestionboards/${params.idSuggestionBoard}/elements/${params.idElement}`, '', 'GET');
	},
	
	// 查询商品分类
	categoryList(params) {
		return request(`/api/wishlist/category/list`, params, 'GET');
	},
	
	// 查询商品列表
	goodsList(params) {
		return request(`/api/wishlist/product/list`, params, 'GET');
	},
	
	// 查询商品详情
	goodsDetail(params) {
		return request(`/api/wishlist/product/${params}`, 'GET');
	},
	
	// 获取建议单详情
	getOrderDetail(params) {
		return request(`/api/fa/clients/${params.idClient}/suggestionboards/${params.idSuggestionBoard}`, 'GET');
	},
	
	// 创建建议单
	createOrder(params) {
		return request(`/api/fa/suggestionboards`, params, 'POST');
	},
	
	// 建议单添加商品
	orderAddGoods(params) {
		return request(`/api/fa/suggestionboards/${params.id}/elements`, params.obj, 'POST');
	},
	
	// 建议单删除商品
	orderDelGoods(params) {
		return request(`/api/fa/suggestionboards/${params.id}/elements/${params.idElement}`, '', 'DELETE');
	},
	
	// 向客户发送建议单
	creatUseClient(params) {
		return request(`/api/fa/suggestionboards/${params.idSuggestionBoard}/client`, '', 'POST');
	},
}
