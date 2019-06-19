<template>
<view class="page">
  <view class="page-main">
    <scroll-view 
      class="page-scroller" 
      scroll-y="true">
      <view class="login-form uni-column">
        <view class="uni-form-item">
          <view class="login-form-item">
            <text class="login-form-title">手机号：</text>
            <input 
              class="login-form-input"  
              placeholder="请输入手机号" />
          </view>
        </view>
        <view class="uni-form-item">
          <view class="login-form-item">
            <text class="login-form-title">密码：</text>
            <input 
              class="login-form-input" 
              password 
              type="text" 
              placeholder="请输入密码" />
          </view>
        </view>
        <view class="uni-form-item">
          <view class="login-form-item">
            <text class="login-form-title">验证码：</text>
            <input 
              class="login-form-input" 
              type="number" 
              placeholder="请输入验证码" />
            <text 
              :class="send.state ? 'login-form-send' : 'login-form-send disabled'"
              @click="handleSend">{{send.text}}</text>
          </view>
        </view>
        <view class="uni-form-item">
          <view class="login-form-item" style="background:none;">
            <button 
              class="login-form-btn" 
              type="primary" 
              size="mini" 
              @tap="handleRegister">注册</button>
          </view>
        </view>
        <view class="uni-form-item">
          <view class="login-form-opt">
            <text style="text-align:center;"
              @click="handleLogin">已注册，去登录吧！</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</view>  
</template>

<script>

// import {
//   mapState,
//   mapMutations
// } from 'vuex'

export default {
  data() {
    return {
      account:'',
      password: '',
      send: {
        state: true,
        text: '发送验证码'
      }
    }
  },
  computed: {
    //...mapState(['hasLogin', 'forcedLogin'])
  },
  methods: {
    //...mapMutations(['logout']),
    handleSend() {
      const self = this
      if (self.send.state) {
        self.send.state = false
        self.send.text = '30s后重新发送'
        //发送验证码
      }
    },
    handleRegister() {
      const self = this
      if (self.account.length != 11) {
        uni.showToast({
          icon: 'none',
          title: '手机号错误'
        });
        return;
      }
      if (self.password.length < 6) {
        uni.showToast({
          icon: 'none',
          title: '密码最短为 6 个字符'
        });
        return;
      }

      const data = {
        account: self.account,
        password: self.password
      };
      const validUser = service.getUsers().some(function(user) {
        return data.account === user.account && data.password === user.password;
      });

      if (validUser) {
        self.toMain(self.account);
      } else {
        uni.showToast({
          icon: 'none',
          title: '用户账号或密码不正确',
        });
      }
    },
    handleLogin() {
      uni.navigateTo({
        url: '/pages/login/login',
      });
    }
  }
}
</script>

<style>
.login-form-item {
  display:flex;
  flex-direction:row;
  align-items:center;
  flex:1;
  margin:20upx 30upx;
  padding:16upx 20upx;
  border-radius:999upx;
  background:#fff;
}
.login-form-title {
  width:140upx;
  text-align:right;
  font-size:14px;
  color: #999;
}
.login-form-input {
  flex:5;
  margin-left:10upx;
  font-size:14px;
}
.login-form-send {
  padding-left:20upx;
  border-left:1px solid #eee;
  font-size:14px;
  color: #999;
}
.login-form-send.disabled {
  color:rgb(66, 185, 131);
}
.login-form-btn {
  flex:1;
  padding:8upx 0;
  border-radius:999upx;
  font-size:16px;
  background-color: rgb(66, 185, 131);
  box-shadow:2px 2px 5px #efefef;
}
.login-form-opt {
  flex:1;
  margin:20upx;
  padding:0 40upx;
  font-size:14px;
  color:#999;
}
</style>
