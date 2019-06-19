<template>
<view class="page">

  <view class="page-main">

    <scroll-view 
      class="page-scroller" 
      scroll-y="true">

      <swiper class="product-gallery" 
        :indicator-dots="gallery.indicatorDots" 
        :autoplay="gallery.autoplay" 
        :interval="gallery.interval" 
        :duration="gallery.duration">
        <swiper-item 
        	class="product-gallery-item"
        	v-for="(item, index) in gallery.list">
          <navigator url="product/product?id=item.id" hover-class="navigator-hover">
            <image 
              :src="item.images" 
              mode="scaleToFill"></image>
          </navigator>
        </swiper-item>
      </swiper>

      <view class="product-info">
        <text 
          class="product-info-title">
          {{goods.title}}
        </text>
        <text 
          class="product-info-desc">
          {{goods.desc}}
        </text>
        <view class="product-info-price">
          <text class="fl">￥{{goods.price}}</text>
          <view class="fr product-share">
            <uni-icon
              type="redo"
              size="28"
              color="#666666"/>
            <text>分享</text>
          </view>
        </view>
      </view>

      <view 
        class="product-check"
        bindtap="handleOpenModal">
        <view class="fl product-check-info">
          <text>已选</text>
          <text>{{goodschecked}}</text>
        </view>
        <uni-icon
          type="arrowright"
          size="22"
          color="#666666"/>
      </view>

      <view class="product-comment">
        <view class="product-comment-list">
          <view class="product-comment-item">
            <view class="product-comment-item-hd">
              <image src="../../static/images/avatar/avatar-1.jpg" />
              <text>最后一个大佬</text>
            </view>
            <view class="product-comment-item-bd">
              <text>买完回来发现没有发票，你们这里都没发票的吗？</text>
              <text>2016-08-17  颜色分类：银白色：套餐类型：官方标配</text>
            </view>
          </view>
        </view>
        <text class="product-comment-more">查看全部评价</text>
      </view>

      <view class="product-tab">
        <text 
          :class="tabIndex == 0 ? 'active' : ''" 
          @click="handleSwitchTab(0)" 
          data-index="0">图文详情</text>
        <text 
          :class="tabIndex == 1 ? 'active' : ''" 
          @click="handleSwitchTab(1)"  
          data-index="1">产品参数</text>
        <text 
          :class="tabIndex == 2 ? 'active' : ''" 
          @click="handleSwitchTab(2)" 
          data-index="2">商家推荐</text>
      </view>

      <!--图文详情-->
      <view 
        class="product-pannel"
        :hidden="tabIndex == 0 ? false : true">
        <view 
          class="product-pannel-picture">
          <rich-text :nodes="goods.html"></rich-text>
        </view>
      </view>

      <!--产品参数-->
      <view 
        class="product-pannel"
        :hidden="tabIndex == 1 ? false : true">
        <view class="product-pannel-param">
          <text class="product-pannel-title">基本参数</text>
          <text>商品名称：iPhone 7（A1660）国行版</text>
          <text>品牌：苹果（Apple）</text>
          <text>指纹识别：支持正面识别</text>
          <text>网络制式：4G全网通,移动4G,联通4G,电信4G</text>
          <text>操作系统：苹果（iOS）</text>
          <text>NFC技术：支持</text>
          <text>CPU型号：64位苹果 A10 Fusion+ M10 运动协处理器</text>
        </view>
      </view>

      <!--商家推荐-->
      <view 
        class="product-pannel"
        :hidden="tabIndex == 2 ? false : true">
        <view class="product-commend-list">
          <navigator 
            v-for="(item, index) in commendList"
            :url="'../product/product?id='+item.id+'&title='+item.title">
            <image :src="item.images" />
            <text>{{item.title}}</text>
            <text class="price">￥{{item.price}}</text>
          </navigator>
        </view>
      </view>

    </scroll-view>
  </view>

  <view class="page-footer">
    <view class="bar">
      <view class="bar-left">
        <view 
          class="bar-store">
          <uni-icon
            type="star"
            size="22"
            color="#666666"/>
          <text>收藏</text>
        </view>
      </view>
      <view class="bar-right">
        <button 
          class="btn btn-primary" 
          @click="handleOpenModal">加入购物车</button>
        <button 
          class="btn btn-orange" 
          @click="handleOrder">立即购买</button>
      </view>
    </view>
  </view>

  <!-- 弹窗 -->
  <view 
    :class="'dialog dialog-bottom '+(dialog.visible ? 'dialog-show' : '')">
    <view class="dialog-main">
      <view class="product-dialog-header">
        <view class="goods">
          <image src="../../static/upload/pic2.jpg" />
        </view>
        <view class="info">
          <text class="price">￥{{ goods.price }}</text>
          <text>库存{{ goods.sku }}件</text>
          <text>已选：“{{ goodschecked }}”</text>
        </view>
        <view 
          class="close" 
          @click="handleCloseModal">
        </view>
      </view>

      <scroll-view 
        class="product-dialog-body" 
        style="height:400rpx;" 
        scroll-y="true">
        <!--颜色分类-->
        <view class="product-dialog-body-item">
          <text class="i-name">颜色分类</text>
          <view class="i-list">
            <radio-group 
              name="color">
              <view 
                v-for="(item, index) in colorList"
                :key="index"
                :class="'check '+(colorChecked == item.id ? 'checked' : '')">
                <radio 
                  class="check-native-control"
                  :value="item.title" /> 
                {{item.title}}
              </view>
            </radio-group>
          </view>
        </view>

        <!--容量-->
        <view class="product-dialog-body-item">
          <text class="i-name">容量</text>
          <view class="i-list">
            <radio-group 
              name="size">
              <view 
                v-for="(item, index) in colorList[colorIndex].sizeList"
                :key="index"
                :class="'check '+(sizeChecked == item.id ? 'checked' : '')">
                <radio 
                  class="check-native-control"
                  :value="item.title"
                  @click="handleChecked" /> 
                {{item.title}}
              </view>
            </radio-group>
          </view>
        </view>
        
        <!--购买数量-->
        <view class="product-dialog-body-item product-dialog-body-number">
          <text class="fl">购买数量</text>
          <view class="fr number-btns">
            <image 
              src="/images/minus.png" 
              bindtap="handleMinusNumber" />
            <input 
              type="number" 
              name="number" 
              :value="form.number" 
              disabled 
              min="1" 
              :max="goods.sku"/>
            <image 
              src="/images/add.png" 
              bindtap="handleAddNumber" />
          </view>
        </view>
        
        <view class="product-dialog-body-btn">
          <button 
            formType="submit" 
            data-flag="cart">确定</button>
        </view>
      </scroll-view>
    </view>
  </view>

</view>
</template>

<script>
import {uniIcon} from '@dcloudio/uni-ui'
import {
  mapState
} from 'vuex'

export default {
  components: {
    uniIcon
  },
  computed: mapState(['userName']),
  data() {
    return {
      form: {
        number: 1,
        price: '',
      },
      goods: {
        id: '1000',
        title: "iPhone 7（A1660）国行版黑色行货 32GB ",
        desc: "【火热销售中】首次支持IP67级防水防尘；后置1200万前置700万像素拍照，配备4颗闪光灯，支持光学防抖；采用全新A10 Fusion处理器，性能更强更省电；7，在此！",
        price: '6000',
        sku: 5,
        html: '<img style="width:100%;height:auto" src="https://img2.ch999img.com//pic/edt/product/20181012/20181012174857_3961.jpg.webp" />'
      },
      gallery: {
        list: [{
          id: "11",
          images: "../../static/upload/pic2.jpg"
        }, {
          id: "12",
          images: "../../static/upload/pic4.jpg"
        }, {
          id: "13",
          images: "../../static/upload/pic5.jpg"
        }],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
      },
      goodschecked: '请选择',
      colorChecked: null,
      sizeChecked: null,
      colorIndex: 0,
      colorList: [{
         id: "11",
         title: "黑色",
         sizeList: [{
           id: "111",
           pid: '11',
           title: "32G",
           price: "5800"
         }, {
           id: "112",
           pid: '11',
           title: "128G",
           price: "6800"
         }]
       }, {
         id: "12",
         title: "金色",
         sizeList: [{
           id: "121",
           pid: '12',
           title: "128G",
           price: "6850"
         }]
       }, {
         id: "13",
         title: "玫瑰色",
         sizeList: [{
           id: "131",
           pid: '13',
           title: "32G",
           price: "5860"
         }]
       }],
      //tab
      tabIndex: 0,
      //商家推荐
      commendList: [{
         id: "11",
         title: "iPhone7黑色32G",
         price: "5800",
         images: "../../static/upload/pic2.jpg"
       }, {
         id: "12",
         title: "华为P9移动版",
         price: "3800",
         images: "../../static/upload/pic1.jpg"
       }, {
         id: "13",
         title: "红米手机3s全网通",
         price: "2300",
         images: "../../static/upload/pic3.jpg"
       }, {
         id: "14",
         title: "iPhone7黑色32G",
         price: "5650",
         images: "../../static/upload/pic1.jpg"
       }, {
         id: "15",
         title: "华为P9移动版",
         price: "1830",
         images: "../../static/upload/pic2.jpg"
       }, {
         id: "16",
         title: "红米手机3s全网通",
         price: "2340",
         images: "../../static/upload/pic3.jpg"
       }],
      dialog: {
        visible: false,
      },
    }
	},
	methods: {
		//跳转
    handleOrder: function() {
     const self = this
     if (self.data.goodschecked === '请选择') {
       //没有选择需要先选择
       self.handleOpenModal()
     } else {
       //提交数据 成功跳转到确认订单
       // app.api.selectOne("url",self.data.buy).then(function(res){
       //   if(res.success){
       //     wx.redirectTo({
       //       url: '../order/order'
       //     })
       //   }
       // })

       wx.navigateTo({
         url: '../order/order'
       })

     }
    },
    //切换
    handleSwitchTab: function(index) {
     const self = this
     self.tabIndex = index
    },
    //减操作
    handleMinusNumber: function() {
     const self = this
     let num = self.data.form.number
     const gprice = self.data.goods.price

     if (num > 1) {
       self.setData({
         form: {
           number: (num - 1),
           price: (num - 1) * gprice
         }
       })
     }
    },
    //加操作
    handleAddNumber: function() {
     const self = this
     let num = self.data.form.number
     const gprice = self.data.goods.price
     const sku = self.data.goods.sku
     if (num >= sku) return;

     self.setData({
       form: {
         number: num + 1,
         price: (num + 1) * gprice
       }
     })
    },
    //显示弹窗
    handleOpenModal() {
      this.dialog.visible = true
    },
    //关闭弹窗
    handleCloseModal() {
      this.dialog.visible = false
    },
	},
  onLoad: function(options) {
    const self = this
    console.log('options==',options)
    uni.setNavigationBarTitle({
    　title:'产品详情页'
    })
  },
}
</script>

<style lang="scss">
@import '../../styles/product.scss';
</style>
