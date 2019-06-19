<template>
<view class="page">
	<!-- page-head -->
	<view class="uni-page-head">
		<uni-nav-bar
      :fixed="true"
      color="white"
      background-color="rgb(0, 193, 112)"
      @click-left="city"
      @click-right="scan">
      <block slot="left">
        <view class="uni-page-head-city">
          <view>昆明</view>
          <uni-icon
            type="arrowdown"
            color="white"
            size="22"/>
        </view>
      </block>
      <block slot="right">
        <view class="uni-page-head-scan">
          <uni-icon
            type="scan"
            color="white"
            size="22"/>
        </view>
      </block>
      <view class="uni-page-head-search">
        <uni-icon
          type="search"
          size="22"
          color="#999"/>
        <input
          confirm-type="search"
          class="uni-page-head-search-input"
          type="text"
          disabled
          placeholder="输入搜索关键词"
          @click="search" >
      </view>
    </uni-nav-bar>
	</view>
	
	<!-- page-main -->
  <view class="page-main">
    <scroll-view 
      class="page-scroller" 
      scroll-y="true">
      <!--banner-->
      <swiper class="home-swiper" 
        :indicator-dots="banner.indicatorDots" 
        :autoplay="banner.autoplay" 
        :interval="banner.interval" 
        :duration="banner.duration">
        <swiper-item 
        	class="home-swiper-item"
        	v-for="(item, index) in banner.list"
        	:key="index">
          <navigator 
          	:url="'../product/product?id='+item.id" 
          	hover-class="navigator-hover">
            <image 
            	class="home-swiper-image"
              :src="item.image" 
              mode="scaleToFill"></image>
          </navigator>
        </swiper-item>
      </swiper>

      <!--限时抢购-->
      <view class="home-section">
        <view class="home-section-hd">
          <text class="h-title">限时抢购</text>
          <text class="h-more"> 今日抢购进行中</text>
        </view>
        <scroll-view 
          class="home-section-scroll" 
          scroll-x="true">
          <view class="home-section-bd">
				    <navigator 
				      class="home-section-item" 
				      v-for="(item, index) in flash"
				      :key="index"
				      :url="'../product/product?id='+item.id">
				      <image :src="item.image" />
				      <text>{{item.title}}</text>
				    </navigator>
          </view>
        </scroll-view>
      </view>

      <!--今日推荐-->
      <view class="home-section">
        <view class="home-section-hd">
          <text class="h-title">今日推荐</text>
          <text class="h-more"> 好东西大家共分享</text>
        </view>
        <view>
	        <uni-grid
		      	class="home-section-grid"
		        :options="adsList"
		        :show-out-border="false"/>
        </view>
      </view>

      <view 
      	class="home-ads"
        @click="handleTest(ads.id)">
        <image :src="ads.image" />
      </view>

    </scroll-view>
  </view>
</view>
</template>

<script>
import {uniNavBar, uniGrid, uniIcon} from '@dcloudio/uni-ui'

// import {
//   mapState
// } from 'vuex'

export default {
	components: {
		uniNavBar,
    uniGrid,
    uniIcon
  },
  //computed: mapState(['userName']),
  data() {
    return {
    	title:'首页',
      banner: {
      	indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
	      list: [{
		      id: "1",
		      title: "b1",
		      image: '../../static/upload/bg1.png'
		    },
		    {
		      id: "2",
		      title: "b2",
		      image: '../../static/upload/bg2.png'
		    },
		    {
		      id: "3",
		      title: "b3",
		      image: '../../static/upload/bg3.jpg'
		    }]
	    },
	    flash: [{
		      id: "11",
		      title: "iPhone7黑色32G",
		      image: "../../static/upload/pic1.jpg"
		    },
		    {
		      id: "12",
		      title: "华为P9移动版",
		      image: "../../static/upload/pic2.jpg"
		    },
		    {
		      id: "13",
		      title: "红米手机3s全网通",
		      image: "../../static/upload/pic3.jpg"
		    },
		    {
		      id: "14",
		      title: "iPhone7黑色32G",
		      image: "../../static/upload/pic4.jpg"
		    },
		    {
		      id: "15",
		      title: "华为P9移动版",
		      image: "../../static/upload/pic5.jpg"
		    },
		    {
		      id: "16",
		      title: "红米手机3s全网通",
		      image: "../../static/upload/pic1.jpg"
		    }
		  ],
		  adsList: [{
		      id: "21",
		      text: "华为P9移动版",
		      image: '../../static/upload/pic1.jpg'
		    },
		    {
		      id: "22",
		      text: "iPhone7黑色32G",
		      image: '../../static/upload/pic2.jpg'
		    },
		    {
		      id: "23",
		      text: "华为P9移动版",
		      image: '../../static/upload/pic3.jpg'
		    },
		    {
		      id: "24",
		      text: "红米手机3s全网通",
		      image: '../../static/upload/pic4.jpg'
		    },{
		      id: "25",
		      text: "iPhone7黑色32G",
		      image: '../../static/upload/pic5.jpg'
		    },
		    {
		      id: "26",
		      text: "红米手机3s全网通",
		      image: '../../static/upload/pic2.jpg'
		    }
		  ],
		  ads: {
		  	id: "26",
	      text: "红米手机3s全网通",
	      image: '../../static/upload/bg2.png'
		  }
    }
	},
	methods: {
		city() {
			console.log('city')
		},
		scan() {
			console.log('scan')
		},
		search() {
			uni.navigateTo({
	      url: '/pages/search/search'
	    });
		},
		handleTest(id) {
			console.log('id==',id)
		},
	},
}
</script>

<style lang="scss">
@import '../../styles/index.scss';


.uni-page-head {

	&-city {
	  display:flex;
	  flex-direction:row;
	  align-items:center;
	  justify-content:center;
	  width:100%;
	  margin-left:8px;
		white-space:nowrap;
		font-size:13px;
	}

	&-search {
    display:flex;
    flex:1;
    background-color:white;
    height:30px;
    border-radius:15px;
    padding:0 4%;
    flex-wrap:nowrap;
    margin:7px 0;
    line-height:30px;

    & .uni-icon {
      line-height:30px !important;
    }

    &-input {
      height:30px;
      line-height:30px;
      width:94%;
      padding:0 3%;
      font-size:14px;
      color:#999;
    }
  }
}
</style>
