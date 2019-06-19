<template>
<view class="page">  

  <view class="page-header page-fixed-header">
    <!-- 搜索 -->
    <uni-nav-bar
      :fixed="true"
      color="white"
      background-color="rgb(0, 193, 112)"
      left-icon="back"
      left-text="返回"
      @click-left="back">
      <block slot="right">
        <text>取消</text>
      </block>
      <view class="search-view">
        <uni-icon
          type="search"
          size="22"
          color="#666666"/>
        <input
          confirm-type="search"
          class="search-view-input"
          type="text"
          placeholder="输入搜索关键词"
          @confirm="confirm" >
      </view>
    </uni-nav-bar>
    <!--筛选-->
    <view class="search-filter">
      <view
        :class="filter.onSale == 1 ? 'active' : ''"
        @click="handleFilter('onSale')">销量</view>
      <view
        :class="filter.onShelf == 1 ? 'active' : ''"
        @click="handleFilter('onShelf')">上架时间</view>
      <view
        :class="filter.onSort ? 'search-filter-price desc' : 'search-filter-price asc'"
        @click="handleFilter('onSort')">
        <text>价格</text>
      </view>
      <view @click="handleFilerSearch">筛选</view>
      <view 
        :class="filter.style ? 'search-filter-style column' : 'search-filter-style row'"
        @click="handleSwitchStyle"></view>
    </view>
  </view>
  
  <!-- 列表 -->
  <view class="page-main">
    <view 
      :class="filter.style ? 'search-list' : 'search-list search-column'">
      <navigator 
        v-for="(item, index) in list"
        :key="index"
        class="search-list-item" 
        :url="'../product/product?id='+item.id+'&title='+item.title">
        <image :src="item.image" />
        <view class="info">
          <text class="title">{{item.title}}</text>
          <text class="desc">{{item.desc}}</text>
          <text class="price">￥{{item.price}}</text>
        </view>
      </navigator>
    </view>
    <!-- 加载更多 -->
    <uni-load-more 
      :status="status" 
      :content-text="contentText" />
  </view>

  <!-- 弹窗 -->
  <form 
    :class="'dialog dialog-right dialog-closable ' 
    + (dialog.visiable ? 'dialog-show' : '')">
    <view class="dialog-main">
      <scroll-view 
        class="dialog-body" 
        scroll-y="true">
        <view class="search-dialog-box">
          <view class="search-dialog-title">
            <text class="fl">价格区间：</text>
          </view>
          <view class="search-dialog-price">
            <input class="uni-input" type="number" placeholder="最小价格" />
            <text class="line">-</text>
            <input class="uni-input" type="number" placeholder="最大价格" />
          </view>
        </view>
        <view class="search-dialog-box">
          <view class="search-dialog-title">
            <text class="fl">品牌：</text>
            <view 
              class="fr" 
              @click="handleToggle()">
              <text 
                :class="'search-dialog-more '
                +(extend.brand ? 'toggle' : '')">更多</text>
            </view>
          </view>
          <view 
            class="search-dialog-item">
            <view 
              :class="'label '+(item.id == form.brand ? 'on' : '') 
              +(index > 5 && extend.brand ? 'hide' : '')"
              v-for="(item, index) in brandList"
              :key="index"
              :value="item.title" 
              @click="handleChecked(item.id)">
              <text>{{item.title}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
      <view class="dialog-footer">
        <view 
          @click="handleDialog"
          class="dialog-action dialog-action-cancel btn-gray">取消</view>
        <view 
          formType="submit"
          class="dialog-action dialog-action-confirm btn-primary">确定</view>
      </view>
    </view>
  </form>
</view>  
</template>

<script>
import {uniNavBar, uniLoadMore, uniIcon} from '@dcloudio/uni-ui'
import {ajax} from 'utils'

// import {
//   mapState,
//   mapMutations
// } from 'vuex'

const data = {
  list: [{
    id: "11",
    title: "iPhone7黑色32G",
    desc: "【双十一限时特价】首次支持IP67级防水防尘；后置1200万前置700万像素拍照，配备4颗闪光灯，支持光学防抖；采用全新A10 Fusion处理器，性能更强更省电；7，在此！",
    image: "../../static/upload/pic1.jpg",
    price: "4899.00"
  }, {
    id: "12",
    title: "华为P9移动版",
    desc: "【双十一限时特价】莱卡双摄像头，3D指纹信息提取技术，麒麟955强劲芯片，打造不一样的高端品质。",
    image: "../../static/upload/pic2.jpg",
    price: "2380.00"
  }, {
    id: "13",
    title: "红米手机3s全网通",
    desc: "【不可思议的蜕变】4100mAh电池超长待机，熠熠生辉的金属机身，支持背部指纹识别！",
    image: "../../static/upload/pic3.jpg",
    price: "780.00"
  }, {
    id: "11",
    title: "iPhone7黑色32G",
    desc: "【双十一限时特价】首次支持IP67级防水防尘；后置1200万前置700万像素拍照，配备4颗闪光灯，支持光学防抖；采用全新A10 Fusion处理器，性能更强更省电；7，在此！",
    image: "../../static/upload/pic4.jpg",
    price: "4899.00"
  }, {
    id: "12",
    title: "华为P9移动版",
    desc: "【双十一限时特价】莱卡双摄像头，3D指纹信息提取技术，麒麟955强劲芯片，打造不一样的高端品质。",
    image: "../../static/upload/pic5.jpg",
    price: "2380.00"
  }, {
    id: "13",
    title: "红米手机3s全网通",
    desc: "【不可思议的蜕变】4100mAh电池超长待机，熠熠生辉的金属机身，支持背部指纹识别！",
    image: "../../static/upload/pic3.jpg",
    price: "780.00"
  }],
}

export default {
  components: {
    uniNavBar,
    uniLoadMore,
    uniIcon
  },
  data() {
    return {
      filter: {
        onSale: 1,
        onShelf: 0,
        onSort: true,
        style: true,
      },
      //下拉
      page: 1,
      list: [],
      hasMore: true,
      list: [],
      //
      dialog: {
        visiable: false
      },
      extend: {
        brand: true
      },
      form: {
        brand: '',
      },
      brandList:[{
        id: "11",
        title: "苹果"
      }, {
        id: "12",
        title: "小米"
      }, {
        id: "13",
        title: "三星"
      }, {
        id: "14",
        title: "华为"
      }, {
        id: "15",
        title: "oppo"
      }, {
        id: "16",
        title: "vivo"
      }, {
        id: "17",
        title: "360"
      }, {
        id: "18",
        title: "乐视"
      }, {
        id: "19",
        title: "一加"
      }],
      //下拉
      status: 'more',
      contentText: {
        contentdown: '正在刷新,请稍等...',
        contentrefresh: '加载中...',
        contentnomore: '没有更多商品了'
      }
    }
  },
  computed: {
    //...mapState(['hasLogin', 'forcedLogin'])
  },
  methods: {
    //...mapMutations(['logout']),
    back() {
      uni.navigateBack({
        delta: 1
      })
    },
    confirm() {
      uni.showToast({
        title: '搜索'
      })
    },
    handleFilter(param) {
      const self = this;
      if (param === 'onSale') {
        //根据销量筛选
        self.filter.onSale = 1
        self.filter.onShelf = 0
      } else if (param === 'onShelf') {
        //根据上架时间筛选
       self.filter.onShelf = 1
       self.filter.onSale = 0
      } else if (param === 'onSort') {
        //根据价格筛选
        self.filter.onSort = !self.filter.onSort
      }
      console.log('filter==',self.filter)
    },
    handleSwitchStyle() {
      const self = this;
      self.filter.style = !self.filter.style
    },
    handleFilerSearch() {
      this.dialog.visiable = true

      /*uni.showToast({
        title: '筛选'
      })*/
    },
    handleToggle() {
      this.extend.brand = !this.extend.brand 
    },
    //选中操作
    handleChecked(id) {
      console.log('id==',id)
      this.form.brand = id

      console.log(this.form)
    },
    // 弹窗
    handleDialog() {
      this.dialog.visiable = false
      this.form = {
        brand: ''
      }
    },
  },
  onLoad: function (options) {
    setTimeout(function () {
        console.log('start pulldown');
    }, 1000);
    uni.startPullDownRefresh();

    uni.request({
      url: "http://127.0.0.1:3000/user/item",
      data: {id:2},
      dataType: 'json',
      success: (res) => { 
        console.log(res)
      },
      fail: (err) => {
        console.log(err)
      }
    });
  },
  onPullDownRefresh () {
    // 页面上拉刷新
    const self = this;
    console.log('onPullDownRefresh')
    self.list = []
    setTimeout(function () {
      self.list = data.list
      self.page = 1
      uni.stopPullDownRefresh()
    }, 2000)
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
    const self = this
    console.log('hasMore==',self.hasMore)
    if (self.hasMore) {  
      //模拟
      self.page++
      //发送请求
      self.status = 'loading'
      setTimeout(function () {
        if (self.page < 5) {
          self.list = self.list.concat(data.list)
          self.status = 'more'
        } else {
          self.status = 'noMore'
          self.hasMore = false
        }
      }, 3000)
    } else {
      self.hasMore = false
      uni.stopPullDownRefresh()
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/search.scss';
.page-main {
  padding-top:200upx;
}
</style>
