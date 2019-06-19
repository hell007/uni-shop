<template>
  <view>
   <!--  <page-head :title="title"></page-head> -->
    <view class="uni-padding-wrap uni-common-mt">
      <form @submit="formSubmit" @reset="formReset">
        <view class="demo-title">-input</view>
        <view class="uni-form-item uni-column">
          <view class="title">可自动聚焦的input</view>
          <input class="uni-input" focus placeholder="自动获得焦点" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">键盘右下角按钮显示为搜索</view>
          <input class="uni-input" confirm-type="search" placeholder="键盘右下角按钮显示为搜索" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">控制最大输入长度的input</view>
          <input class="uni-input" maxlength="10" placeholder="最大输入长度为10" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">实时获取输入值：{{inputValue}}</view>
          <input class="uni-input" @input="onKeyInput" placeholder="输入同步到view中" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">控制输入的input</view>
          <input class="uni-input" @input="replaceInput" v-model="changeValue" placeholder="连续的两个1会变成2" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">控制键盘的input</view>
          <input class="uni-input" ref="input1" @input="hideKeyboard" placeholder="输入123自动收起键盘" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">数字输入的input</view>
          <input class="uni-input" type="number" placeholder="这是一个数字输入框" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">密码输入的input</view>
          <input class="uni-input" password type="text" placeholder="这是一个密码输入框" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">带小数点的input</view>
          <input class="uni-input" type="digit" placeholder="带小数点的数字键盘" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">身份证输入的input</view>
          <input class="uni-input" type="idcard" placeholder="身份证输入键盘" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">控制占位符颜色的input</view>
          <input class="uni-input" placeholder-style="color:#F76260" placeholder="占位符字体是红色的" />
        </view>

        <view class="demo-title">-switch</view>
        <view class="uni-form-item uni-column">
          <view class="title">开启</view>
          <view>
            <switch name="switch" checked />
          </view>
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">关闭</view>
          <view>
            <switch name="switch" color="red" />
          </view>
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">禁用</view>
          <view>
            <switch name="switch" disabled />
          </view>
        </view>

        <view class="demo-title">-radio</view>
        <view class="uni-form-item uni-column">
          <view class="title">性别</view>
          <radio-group name="radio">
            <label>
              <radio value="radio1" checked />男
            </label>
            <label>
              <radio value="radio2" />女
            </label>
            <label>
              <radio value="radio3" disabled />保密
            </label>
          </radio-group>
        </view>

        <view class="demo-title">-checkbox</view>
        <view class="uni-form-item uni-column">
          <view class="title">水果</view>
          <checkbox-group name="checkbox">
            <label>
              <checkbox value="checkbox1" checked />苹果
            </label>
            <label>
              <checkbox value="checkbox2" />香蕉
            </label>
            <label>
              <checkbox value="checkbox2" disabled/>巴拉
            </label>
          </checkbox-group>
        </view>

        <view class="demo-title">-slider</view>
        <view class="uni-form-item uni-column">
          <view class="title">范围</view>
          <slider value="100" min="50" max="200" show-value />
        </view>
        
        <view class="demo-title">-textarea</view>
        <view class="uni-form-item uni-column">
          <view class="uni-textarea">
            <textarea auto-height placeholder-style="color:#333" placeholder="请输入" />
          </view>
        </view>

        <view class="demo-title">-editor</view>
        <view class="uni-form-item uni-column">
          <editor id="editor" placeholder="请输入" @ready="onEditorReady"></editor>
        </view>

        <view class="demo-title">-picker</view>
        <view class="uni-form-item uni-column">
          <view class="uni-title uni-common-pl">地区选择器</view>
          <view class="uni-list">
            <view class="uni-list-cell">
              <view class="uni-list-cell-left">
                当前选择
              </view>
              <view class="uni-list-cell-db">
                <picker @change="bindPickerChange" :value="index" :range="array">
                  <view class="uni-input">{{array[index]}}</view>
                </picker>
              </view>
            </view>
          </view>
        </view>
        
        <view class="demo-title">-picker</view>
        <view class="uni-form-item uni-column">
          <view class="uni-title uni-common-pl">时间选择器</view>
          <view class="uni-list">
            <view class="uni-list-cell">
              <view class="uni-list-cell-left">
                当前选择
              </view>
              <view class="uni-list-cell-db">
                <picker mode="time" :value="time" start="09:01" end="21:01" @change="bindTimeChange">
                  <view class="uni-input">{{time}}</view>
                </picker>
              </view>
            </view>
          </view>
        </view>

        <view class="demo-title">-picker</view>
        <view class="uni-form-item uni-column">
          <view class="uni-title uni-common-pl">日期选择器</view>
          <view class="uni-list">
            <view class="uni-list-cell">
              <view class="uni-list-cell-left">
                当前选择
              </view>
              <view class="uni-list-cell-db">
                <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
                    <view class="uni-input">{{date}}</view>
                </picker>
              </view>
            </view>
          </view>
        </view>

        <view class="demo-title">-button</view>
        <view class="uni-form-item uni-column">
          <button type="warn" size="mini">warn</button>
        </view>
        <view class="uni-form-item uni-column">
          <button type="default" formType="reset" size="mini">Reset</button>
        </view>
        <view class="uni-form-item uni-column">
          <button type="primary" formType="submit" size="mini">submit</button>
        </view>


      </form>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    const currentDate = this.getDate({
      format: true
    })
    return {
      //input
      focus: false,
      inputValue: '',
      changeValue: '',
      //form
      title: 'form',
      pickerHidden: true,
      chosen: '',
      //picker
      array: ['中国', '美国', '巴西', '日本'],
      index: 0,
      date: currentDate,
      time: '12:01'
    }
  },
  computed: {
    startDate() {
      return this.getDate('start');
    },
    endDate() {
      return this.getDate('end');
    }
  },
  methods: {
    //input
    onKeyInput: function(event) {
      this.inputValue = event.target.value
    },
    replaceInput: function(event) {
      var value = event.target.value;
      if (value === '11') {
        this.changeValue = '2';
      }
    },
    hideKeyboard: function(event) {
      if (event.target.value === '123') {
        uni.hideKeyboard();
      }
    },
    //editor
    onEditorReady() {
      uni.createSelectorQuery().select('#editor').context((res) => {
        this.editorCtx = res.context
      }).exec()
    },
    // form
    pickerConfirm: function(e) {
      this.pickerHidden = true
      this.chosen = e.target.value
    },
    pickerCancel: function(e) {
      this.pickerHidden = true
    },
    pickerShow: function(e) {
      this.pickerHidden = false
    },
    formSubmit: function(e) {
      console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
    },
    formReset: function(e) {
      console.log('清空数据')
      this.chosen = ''
    },
    //picker
    bindPickerChange: function(e) {
      console.log('picker发送选择改变，携带值为', e.target.value)
      this.index = e.target.value
    },
    bindDateChange: function(e) {
      this.date = e.target.value
    },
    bindTimeChange: function(e) {
      this.time = e.target.value
    },
    getDate(type) {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      if (type === 'start') {
          year = year - 60;
      } else if (type === 'end') {
          year = year + 2;
      }
      month = month > 9 ? month : '0' + month;;
      day = day > 9 ? day : '0' + day;
      return `${year}-${month}-${day}`;
    }
  }
}
</script>
<style>
/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
@import '../../styles/uni.css';

.uni-form-item .title {
  padding:20upx 0;
}

.demo-title {
  color:#11B0FE;
  font-size:20px;
  padding-top:20upx;
}

#editor {
  width: 100%;
  height: 100px;
  background-color: #eee;
}
</style>
