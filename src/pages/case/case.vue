<template>
<view>
  <uni-list>
    <uni-list-item 
      v-for="(item, index) in list" 
      :key="index"
      :title="item.title" 
      @click="handleGo(item.url)" />  
  </uni-list>
</view>
</template>

<script>
import {uniList,uniListItem} from '@dcloudio/uni-ui'

export default {
  components: {
    uniList,
    uniListItem
  },
  data() {
    return {
      list:[{
        title: '表单案列',
        url: '/form/form'
      }, {
        title: '表单案列2',
        url: '/form/form2'
      }]
    }
  },
  methods: {
    handleGo(path) {
      console.log(path)
      uni.navigateTo({
        url: '/pages' + path
      });
    },
  },
  //头部导航
  onNavigationBarButtonTap(e) {
    console.log("你点击了按钮", e)
  },
  onNavigationBarSearchInputChanged(e) {
    console.log("你输入了信息", e)

  },
  onNavigationBarSearchInputClicked(e) {
    //console.log("disabled=true,你点击了", e)
    uni.navigateTo({
      url: '/pages/search/search'
    });
  }
}
</script>