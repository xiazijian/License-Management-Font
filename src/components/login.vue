<template>
  <div id="login">
    <label class="lable" >用户名：</label><el-input v-model="username" placeholder="请输入用户名" v-bind:style="{width: '500px'}"></el-input><br/>
    <label class="lable" >密码：</label><el-input v-model="password" placeholder="请输入密码" v-bind:style="{width: '500px'}"></el-input><br/><br/>
    <el-button type="success" round size="small" v-on:click="login">登录</el-button>
  </div>
</template>

<script>

export default {
  name: 'login',
  data () {
    return {
      username: '4pdadmin',
      password: 'admin'
    }
  },
  methods: {
    login () {
      this.$axios
        .post('http://gateway.prophet-ee-dev.devops.4pd.io/keystone/v1/sessions', {
          password: this.password,
          username: this.username
        })
        .then(successResponse => {
          this.$router.push({
            name: 'prophet',
            params: {
              username: successResponse.data.data.username
            }
          })
        })
        .catch(failResponse => {
          this.$router.push({
            path: '/'
          })
          alert('密码或者用户名错误')
        })
    }
  }
}
</script>

<style>
#login {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
label {
        display: inline-block;
        width: 100px;
        text-align: right;
}
</style>
