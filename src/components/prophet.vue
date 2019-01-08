<template>
  <div id="prophet">
<el-tabs v-model="activeName"  @tab-click="handleClick">
    <el-tab-pane label="Licene" name="first">
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
    <label class="lable">客户名称：</label><el-input v-model="customer" placeholder="请输入内容" size="small" v-bind:style="{width: '1000px'}"></el-input><br/>
    <label class="lable">发布版本：</label><el-input v-model="edition" placeholder="请输入内容" size="small" v-bind:style="{width: '1000px'}"></el-input><br/>
    <label class="lable">租户数量：</label><el-input v-model="maxTenantCount" placeholder="请输入内容" size="small" v-bind:style="{width: '1000px'}"></el-input><br/>
    <el-button type="primary" round size="small" v-on:click="generate">生成</el-button>
    <el-button type="primary" round size="small" v-show="bu" v-on:click="download">下载</el-button><br/>
    <textarea cols="30" rows="10" v-model="responseResult" v-show="ta"></textarea><br/>
    </el-tab-pane>
    <el-tab-pane label="申请中" name="second">
      <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="200">
      </el-table-column>
      <el-table-column
        prop="configuration"
        label="配置">
      </el-table-column>
    </el-table>
    </el-tab-pane>
    <el-tab-pane label="申请成功" name="third">
      <el-table
      :data="tableData1"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="200">
      </el-table-column>
      <el-table-column
        prop="configuration"
        label="配置">
      </el-table-column>
    </el-table>
    </el-tab-pane>
    <el-tab-pane label="申请失败" name="fourth">
      <el-table
      :data="tableData2"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="200">
      </el-table-column>
      <el-table-column
        prop="configuration"
        label="配置">
      </el-table-column>
    </el-table>
    </el-tab-pane>
  </el-tabs>

  </div>
</template>

<script>

export default {
  name: 'Prophet',
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
      product: 'prophet',
      ta: false,
      activeName: 'first'
    }
  },
  beforeCreate: function () {
    this.$axios
      .get('api/judgeSession', {
      })
      .then(successResponse => {
        this.$axios
          .get('api/userListRecord?name=' + localStorage.getItem('username'), {
          })
          .then(successResponse => {
            var array = successResponse.data
            // array.forEach(v => {
            //   console.log(v.id)
            // })
            this.tableData = array
          })
          .catch(failResponse => {})
        this.$axios
          .get('api/userListPassRecord?name=' + localStorage.getItem('username'), {
          })
          .then(successResponse => {
            var array = successResponse.data
            // array.forEach(v => {
            //   console.log(v.id)
            // })
            this.tableData1 = array
          })
          .catch(failResponse => {})
        this.$axios
          .get('api/userListRefudeRecord?name=' + localStorage.getItem('username'), {
          })
          .then(successResponse => {
            var array = successResponse.data
            // array.forEach(v => {
            //   console.log(v.id)
            // })
            this.tableData2 = array
          })
          .catch(failResponse => {})
      })
      .catch(failResponse => {
        this.$router.push({
          path: '/'
        })
        alert('重新登录')
      })
  },
  // 观察select的变化，select的v-model="product"
  watch: {
    product (newVal, oldVal) {
      if (newVal === 'PWS') {
        this.$router.push({
          name: 'pws'
        })
      }
      if (newVal === 'PAS') {
        this.$router.push({
          name: 'pas'
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
        .post('api/generate', {
          username: localStorage.getItem('username'),
          product: this.product,
          machineCode: this.machineCode,
          versionsSupported: this.versionsSupported,
          IssuedDate: this.IssuedDate,
          ExpiredDate: this.ExpiredDate,
          customer: this.customer,
          edition: this.edition,
          maxTenantCount: this.maxTenantCount
        })
        .then(successResponse => {
          this.$message('申请提交成功')
          this.bu = true
          this.ta = true
          this.responseResult = successResponse.data
          this.$axios
            .get('api/userListRecord?name=' + localStorage.getItem('username'), {
            })
            .then(successResponse => {
              var array = successResponse.data
              // array.forEach(v => {
              //   console.log(v.id)
              // })
              this.tableData = array
            })
            .catch(failResponse => {})
        })
        .catch(failResponse => {
          alert('信息格式有误')
        })
    }
  }
}
</script>

<style>
#prophet {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/* 下面的目的是为了让文字右对齐，这样文本框才能对齐*/
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
