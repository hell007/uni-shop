<template>
<view class="page">
  <view class="page-main">
    <scroll-view 
      class="page-scroller" 
      scroll-y="true">
      <view class="my-header">
        <image class="my-header-picture" :src="avatar"/>
        <text class="my-header-name">Hi,您未登录</text>
        <uni-icon class="my-header-arrow" 
          type="arrowright" 
          size="24" 
          color="#999"
          @click="handleLogin"></uni-icon>
      </view>
      <uni-list>
        <uni-list-item 
          v-for="(item, index) in list" 
          :key="index"
          :title="item.title" 
          @click="handleGo(item.url)" />  
      </uni-list>

      <uni-list class="my-space-margin">
        <uni-list-item
          title="退出登录" 
          @click="handleLogout()" />  
      </uni-list>
    </scroll-view>
  </view>
</view>  
</template>

<script>
import {uniList, uniListItem, uniIcon} from '@dcloudio/uni-ui'

// import {
//   mapState,
//   mapMutations
// } from 'vuex'

export default {
  components: {
    uniList,
    uniListItem,
    uniIcon
  },
  data() {
    return {
      avatar: '/static/images/avatar/avatar-1.jpg',
      list: [{
        title: '我的收藏',
        url: ''
      }, {
        title: '我的关注',
        url: ''
      }, {
        title: '修改密码',
        url: ''
      }, {
        title: '关于',
        url: ''
      }]
    }
  },
  computed: {
    //...mapState(['hasLogin', 'forcedLogin'])
  },
  methods: {
    //...mapMutations(['logout']),
    handleLogin() {
      uni.navigateTo({
        url: '/pages/login/login',
      });
    },
    handleLogout() {
      uni.switchTab({
        url: '/pages/index/index',
      });
    },
    handleGo(path) {
      console.log(path)
      uni.navigateTo({
        url: '/pages' + path
      });
    }
  }
}
</script>

<style>
.my-header {
  display:flex;
  flex-direction:row;
  align-items:center;
  padding:40upx 20upx;
  margin-bottom:36upx;
  background:#fff;
}
.my-header-picture {
  width:180upx;
  height:180upx;
  border-radius:999upx;
  margin-right:50upx;
}
.my-header-name {
  flex:5;
  font-size:36upx;
}
.my-header-arrow {
  justify-content:flex-end;
}
.my-space-margin {
  margin-top:200upx;
}
</style>
