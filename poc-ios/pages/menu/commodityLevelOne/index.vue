<template>

	<view class="u-home" :style="{ height: uHomeHeight }">
		<view class="u-page">
			<u-toast ref="uToast"></u-toast>
			<!-- 空 -->
			<u-empty
				v-if="Boolean(goodsArr.length) == false"
				width="500"
				textSize="30"
				mode="data" 
				icon="http://cdn.uviewui.com/uview/empty/car.png">
			</u-empty>
			<!-- list -->
			<u-list v-else>
				<u-list-item
					class="commodityLevelOne_f"
					v-for="(item, index) in goodsArr" 
					:key="index">
					<view v-if="item.state==0" class="commodityLevelOne" @click="handleToDetail(item, index)">
						<view class="commodityLevelOne_left">
							<view class="commodityLevelOne_left_image">
								<image :src="item.categoryImg"></image>
							</view>
							<view>{{ item.name }}</view>
						</view>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</u-list-item>
			</u-list>
		</view>
	</view>

</template>

<script>
	import api from "@/api/index.js"
	export default {
		data() {
			return {
				uHomeHeight: 0,// 当前页面高度
				goodsArr: [],
			};
		},
		onLoad(option) {
			console.log(option, '商品一级分类======')
		},
		onShow() {
			let that = this
			uni.getSystemInfo({
				success:function(res){
					that.uHomeHeight = res.windowHeight + "px"
				}
			})
		},
		onBackPress(event){},
		mounted() {
			const obj = {
				parentId: 0
			}
			api.categoryList(obj).then(res => {
				if(res.code === 200) {
					this.goodsArr = res.data;
					console.log('res', res.data)
				}
			}).catch(err => {
				console.log(err);
			});
		},
		methods: {
			// 商品二级分类
			handleToDetail(item, index) {
				uni.navigateTo({
					url: `/pages/menu/commodityLevelTwo/index?id=${item.id}&name=${item.name}`
				});
			},
		}
	};
</script>

<style scoped lang="less">
	.u-home {
		min-height: 100vh;
		background-color: #f5f5f5;
	}
	/* 隐藏滚动条 */
	scroll-view ::-webkit-scrollbar {
	  display: none;
	  width: 0;
	  height: 0;
	  color: transparent;
	}
	img {
		width: 100%;
		height: 100%;
	}

	image {
		width: 100%;
		height: 100%;
	}
	html,body{
		width: 100%;
		height: 100%;
		overflow: hidden;
		.u-home{
			width: 100%;
			background: #f5f5f5;
			overflow: hidden;
			.u-page{
				height: calc( 100% - 60rpx );
				margin: 30rpx;
				overflow: hidden;
				.u-list{
					height: 100%!important;
				}
				.commodityLevelOne{
					display: flex;
					justify-content: space-between;
					padding: 20rpx;
					background: #ffffff;
					border-bottom: 1rpx solid #e6e6e6;
					// margin: 0 0 20rpx 0;
					.commodityLevelOne_left{
						display: flex;
						align-items: center;
						.commodityLevelOne_left_image{
							width: 130rpx;
							height: 180rpx;
							margin: 0 30rpx 0 0;
						}
					}
				}
				.commodityLevelOne:active {
					background: #f3f4f6;
				}
				.commodityLevelOne_f:first-child {
					.commodityLevelOne{
						border-radius: 20rpx 20rpx 0 0;
					}
				}
				.commodityLevelOne_f:last-child {
					.commodityLevelOne{
						border-radius: 0 0 20rpx 20rpx;
					}
				}
			}
		}
	}
</style>
