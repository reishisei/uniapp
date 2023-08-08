<template>

	<view class="u-home" :style="{height: uHomeHeight}">
		<view class="u-page">
			<u-toast ref="uToast"></u-toast>
			<!-- 空 -->
			<u-empty
				width="500"
				textSize="30"
				v-if="Boolean(goodsArr.length) == false && Boolean(goodsArr2.length) == false"
				mode="data" 
				icon="http://cdn.uviewui.com/uview/empty/car.png">
			</u-empty>
			<!-- list -->
			<u-list v-else>
				<view>BY CATEGORIES</view>
				<u-list-item
					class="commodityLevelOne_f"
					v-for="(item, index) in goodsArr" 
					:key="index" >
					<u-cell-group v-if="item.state == 0" class="commodityLevelOne_li">
						<u-cell 
							@click="handleToDetail(item, index)" 
							size="large" 
							:title="item.name" 
							value="" 
							isLink>
						</u-cell>
					</u-cell-group>
				</u-list-item>
				<!-- <view style="margin: 50rpx 0 0 0;">BY COLLECTIONS</view>
				<u-list-item
					class="commodityLevelOne_f"
					v-for="(_item, _index) in goodsArr2" 
					:key="new Date().getTime() + _index" >
					<u-cell-group class="commodityLevelOne_li">
						<u-cell
							@click="handleToDetail(item, index)" 
							size="large" 
							:title="_item.title" 
							value="" 
							isLink>
						</u-cell>
					</u-cell-group>
				</u-list-item> -->
			</u-list>
		</view>
	</view>

</template>

<script>
	import api from "@/api/index.js"
	export default {
		data() {
			return {
				uHomeHeight: 0,
				goodsArr: [],
				goodsArr2: [],
				parentId: '',
				oneName: ''
			};
		},
		onLoad(option) {
			if(option && option.id) {
				this.parentId = option.id
			}
			if(option && option.name) {
				this.oneName = option.name;
				uni.setNavigationBarTitle({
					title: `${this.oneName}`
				});
			}
			console.log(option, '商品二级分类======')
		},
		onShow() {
			let that = this
			uni.getSystemInfo({
				success:function(res){
					that.uHomeHeight = res.windowHeight + "px"
				}
			})
		},
		mounted() {
			const obj = {
				parentId: this.parentId,
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
			// 跳转选择商品
			handleToDetail(item, index) {
				console.log('code', item.code)
				uni.navigateTo({
					url: `/pages/menu/commoditySelect/index?code=${item.code}&name=${item.name}`
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
				.commodityLevelOne_li{
					background: #ffffff;
				}
				.commodityLevelOne_f:first-child {
					.commodityLevelOne_li{
						border-radius: 20rpx 20rpx 0 0;
					}
				}
				.commodityLevelOne_f:last-child {
					.commodityLevelOne_li{
						border-radius: 0 0 20rpx 20rpx;
					}
				}
			}
		}
	}
</style>
