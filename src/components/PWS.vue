<template>
  <div id="pws">
    <el-tabs v-model="activeName" @tab-click="handleClick">
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
    <label class="lable">Cores：</label><el-input v-model="MaxCpuCores" placeholder="请输入内容" size="small" v-bind:style="{width: '1000px'}"></el-input><br/>
    <label class="lable">GPU：</label><el-input v-model="MaxGpuUnits" placeholder="请输入内容" size="small" v-bind:style="{width: '1000px'}"></el-input><br/>
    <el-button type="success" round size="small" v-on:click="generate">生成</el-button>
    </el-tab-pane>
    <el-tab-pane label="申请情况" name="second">
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
        label="配置"
        width="200">
      </el-table-column>
      <el-table-column
        prop="license"
        label="License"
        width="950"
        v-show="false">
      </el-table-column>
      <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button @click="download(scope.row)" type="text" size="small">下载</el-button>
      </template>
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
      if (newVal === 'prophet') {
        this.$router.push({
          name: 'prophet'
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
    download (row) {
      var eleLink = document.createElement('a')
      eleLink.download = 'license.txt'
      eleLink.style.display = 'none'
      var blob = new Blob([row.license])
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
          MaxCpuCores: this.MaxCpuCores,
          MaxGpuUnits: this.MaxGpuUnits
        })
        .then(successResponse => {
          this.$message('申请提交成功')
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
