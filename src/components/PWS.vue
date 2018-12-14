<template>
  <div id="pws">
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
       下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" v-model="product2">
        <el-dropdown-item command="prophet">prophet</el-dropdown-item>
        <el-dropdown-item command="PAS" value="PAS">PAS</el-dropdown-item>
        <el-dropdown-item command="PWS">PWS</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown><br/>
    <label class="lable" >产品：</label><el-select v-model="product" placeholder="请选择" v-bind:style="{width: '1000px'}">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select><br/>
    <label class="lable" >版本：</label><el-input v-model="versionsSupported" placeholder="请输入内容" size="small" v-bind:style="{width: '1000px'}"></el-input><br/>
    <label class="lable">机器码：</label><el-input v-model="machineCode" placeholder="请输入内容" size="small" v-bind:style="{width: '1000px'}"></el-input><br/>
    <label class="lable">启用时间：</label><el-input v-model="IssuedDate" placeholder="请输入内容" size="small" v-bind:style="{width: '1000px'}"></el-input><br/>
    <label class="lable">过期时间：</label><el-input v-model="ExpiredDate" placeholder="请输入内容" size="small" v-bind:style="{width: '1000px'}"></el-input><br/>
    <label class="lable">Cores：</label><el-input v-model="MaxCpuCores" placeholder="请输入内容" size="small" v-bind:style="{width: '1000px'}"></el-input><br/>
    <label class="lable">GPU：</label><el-input v-model="MaxGpuUnits" placeholder="请输入内容" size="small" v-bind:style="{width: '1000px'}"></el-input><br/>
    <el-button type="success" round size="small" v-on:click="generate">生成</el-button>
    <el-button type="primary" round size="small" v-show="bu" v-on:click="download">下载</el-button><br/>
    <textarea cols="30" rows="10" v-model="responseResult" v-show="ta"></textarea><br/>

  </div>
</template>

<script>
export default {
  name: 'PWS',
  data () {
    return {
      responseResult: [],
      options: [{
        value: 'prophet',
        label: 'prophet'
      }, {
        value: 'PAS',
        label: 'PAS'
      }, {
        value: 'PWS',
        label: 'PWS'
      }],
      product: 'PWS',
      ta: false,
      bu: false
    }
  },
  // 观察select的变化，select的v-model="product"
  watch: {
    product (newVal, oldVal) {
      if (newVal === 'prophet') {
        this.$router.push({
          name: 'prophet',
          params: {
            username: this.$route.params.username
          }
        })
      }
      if (newVal === 'PAS') {
        this.$router.push({
          name: 'pas',
          params: {
            username: this.$route.params.username
          }
        })
      }
    }
  },
  methods: {
    download () {
      var eleLink = document.createElement('a')
      eleLink.download = 'license.txt'
      eleLink.style.display = 'none'
      var blob = new Blob([this.responseResult])
      eleLink.href = URL.createObjectURL(blob)
      document.body.appendChild(eleLink)
      eleLink.click()
      document.body.removeChild(eleLink)
    },
    generate () {
      this.$axios
        .post('/generate', {
          username: this.$route.params.username,
          product: this.product,
          machineCode: this.machineCode,
          versionsSupported: this.versionsSupported,
          IssuedDate: this.IssuedDate,
          ExpiredDate: this.ExpiredDate,
          MaxCpuCores: this.MaxCpuCores,
          MaxGpuUnits: this.MaxGpuUnits
        })
        .then(successResponse => {
          this.bu = true
          this.ta = true
          this.responseResult = successResponse.data
        })
        .catch(failResponse => {})
    }
  }
}
</script>

<style>
#pws {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/* 下面的目的是为了让文字右对齐，这样文本框才能对齐，但是用了element其实不写下面的样式也会自动对齐*/
label {
        display: inline-block;
        width: 100px;
        text-align: right;

}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
