<template>
  <view>
    <view class="uni-padding-wrap uni-common-mt">
      <form @submit="formSubmit" @reset="formReset">
        <view class="demo-title">-uploader</view>
        <view class="uni-form-item uni-column">
          
        </view>
      </form>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
  computed: {
    
  },
  methods: {
    formReset() {
      console.log('清空数据')
      this.chosen = ''
    }
  }
}
</script>
<style>

.uni-form-item .title {
  padding:20upx 0;
}

.demo-title {
  color:#11B0FE;
  font-size:20px;
  padding-top:20upx;
}

</style>
