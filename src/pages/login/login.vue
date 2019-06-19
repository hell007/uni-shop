<template>
<view class="page">
  <view class="page-main">
    <scroll-view 
      class="page-scroller" 
      scroll-y="true">
      <view class="login-form uni-column">
        <view class="uni-form-item">
          <view class="login-form-item">
            <!-- <uni-icon
              type="person" 
              size="32" 
              color="#999"></uni-icon> -->
            <text class="login-form-title">账户：</text>
            <input 
              class="login-form-input"  
              placeholder="请输入账户/手机号" />
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
              @tap="handleLogin">登录</button>
          </view>
        </view>
        <view class="uni-form-item">
          <view class="login-form-opt">
            <text class="fl" 
              @click="handlePwd">忘记密码</text>
            <text class="fr" 
              @click="handleReg">用户注册</text>
          </view>
        </view>
      </view>

      
    </scroll-view>
  </view>
</view>  
</template>

<script>
//import {uniIcon} from '@dcloudio/uni-ui'

// import {
//   mapState,
//   mapMutations
// } from 'vuex'

export default {
  components: {
    //uniIcon
  },
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
    handleLogin() {
      const self = this
      if (self.account.length < 5) {
        uni.showToast({
          icon: 'none',
          title: '账号最短为 5 个字符'
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
    toMain(userName) {
      this.login(userName);
      /**
       * 强制登录时使用reLaunch方式跳转过来
       * 返回首页也使用reLaunch方式
       */
      if (this.forcedLogin) {
        uni.reLaunch({
          url: '../main/main',
        });
      } else {
        uni.navigateBack();
      }

    },
    handleReg() {
      uni.navigateTo({
        url: '/pages/reg/reg',
      });
    },
    handlePwd() {
      uni.navigateTo({
        url: '/pages/pwd/pwd'
      });
    }
  },
  onReady() {
    //this.initPosition();
    //this.initProvider();
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
