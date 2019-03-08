<template>
  <div id="admin">
    <el-tabs v-model="activeName" >
    <el-tab-pane label="License审核" name="first">
      <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="name"
      label="用户"
      width="120">
    </el-table-column>
    <el-table-column
      prop="configuration"
      label="配置信息"
      width="1200">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button @click="pass(scope.row)" type="text" size="small">通过</el-button>
        <el-button @click="refuse(scope.row)" type="text" size="small">不通过</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1,2,50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="licenseCount">
    </el-pagination>
  </div>
    </el-tab-pane>

    <el-tab-pane label="已通过" name="second">
      <el-table
    :data="tableData1"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="name"
      label="用户"
      width="120">
    </el-table-column>
    <el-table-column
      prop="configuration"
      label="配置信息"
      width="200">
    </el-table-column>
    <el-table-column
      prop="license"
      label="License">
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="currentPage1" :page-sizes="[1,2,50, 100]" :page-size="pagesize1" layout="total, sizes, prev, pager, next, jumper" :total="licenseCount1">
    </el-pagination>
  </div>
    </el-tab-pane>

    <el-tab-pane label="未通过" name="third">
      <el-table
    :data="tableData2"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="name"
      label="用户"
      width="120">
    </el-table-column>
    <el-table-column
      prop="configuration"
      label="配置信息">
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="currentPage2" :page-sizes="[1,2,50, 100]" :page-size="pagesize2" layout="total, sizes, prev, pager, next, jumper" :total="licenseCount2">
    </el-pagination>
  </div>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>

export default {
  name: 'Admin',
  data () {
    return {
      activeName: 'first',
      tableData: [],
      licenseCount: 0,
      currentPage: 1,
      pagesize: 1,
      tableData1: [],
      licenseCount1: 0,
      currentPage1: 1,
      pagesize1: 1,
      tableData2: [],
      licenseCount2: 0,
      currentPage2: 1,
      pagesize2: 1
    }
  },
  methods: {
    handleSizeChange (val) {
      this.currentPage = 1
      console.log(`每页 ${val} 条` + `当前页 ${this.currentPage}`)
      this.pagesize = val
      this.$axios
        .get('api/getLimitList?start=' + this.currentPage + '&' + 'limit=' + val, {
        })
        .then(successResponse => {
          var array = successResponse.data
          // array.forEach(v => {
          //   console.log(v.id)
          // })
          this.tableData = array
        })
        .catch(failResponse => {})
    },
    handleCurrentChange (val) {
      this.currentPage = val
      console.log(`当前页: ${val}` + `+${this.currentPage}`)
      this.$axios
        .get('api/getLimitList?start=' + val + '&' + 'limit=' + this.pagesize, {
        })
        .then(successResponse => {
          var array = successResponse.data
          // array.forEach(v => {
          //   console.log(v.id)
          // })
          this.tableData = array
        })
        .catch(failResponse => {})
    },
    handleSizeChange1 (val) {
      this.currentPage1 = 1
      console.log(`每页 ${val} 条` + `当前页 ${this.currentPage1}`)
      this.pagesize1 = val
      this.$axios
        .get('api/listAllPassRecordLimit?start=' + this.currentPage1 + '&' + 'limit=' + val, {
        })
        .then(successResponse => {
          var array = successResponse.data
          // array.forEach(v => {
          //   console.log(v.id)
          // })
          this.tableData1 = array
        })
        .catch(failResponse => {})
    },
    handleCurrentChange1 (val) {
      this.currentPage1 = val
      console.log(`当前页: ${val}` + `+${this.currentPage1}`)
      this.$axios
        .get('api/listAllPassRecordLimit?start=' + val + '&' + 'limit=' + this.pagesize1, {
        })
        .then(successResponse => {
          var array = successResponse.data
          // array.forEach(v => {
          //   console.log(v.id)
          // })
          this.tableData1 = array
        })
        .catch(failResponse => {})
    },
    handleSizeChange2 (val) {
      this.currentPage2 = 1
      console.log(`每页 ${val} 条` + `当前页 ${this.currentPage2}`)
      this.pagesize2 = val
      this.$axios
        .get('api/listAllRefuseLimitRecord?start=' + this.currentPage2 + '&' + 'limit=' + val, {
        })
        .then(successResponse => {
          var array = successResponse.data
          // array.forEach(v => {
          //   console.log(v.id)
          // })
          this.tableData2 = array
        })
        .catch(failResponse => {})
    },
    handleCurrentChange2 (val) {
      this.currentPage2 = val
      console.log(`当前页: ${val}` + `+${this.currentPage2}`)
      this.$axios
        .get('api/listAllRefuseLimitRecord?start=' + val + '&' + 'limit=' + this.pagesize2, {
        })
        .then(successResponse => {
          var array = successResponse.data
          // array.forEach(v => {
          //   console.log(v.id)
          // })
          this.tableData2 = array
        })
        .catch(failResponse => {})
    },
    pass (row) {
      console.log(row.id)
      this.$axios
        .get('api/passApply?id=' + row.id, {
        })
        .then(successResponse => {
          this.tableData = successResponse.data
          this.$axios
            .get('api/listAllPassRecord', {
            })
            .then(successResponse => {
              var array = successResponse.data
              // array.forEach(v => {
              //   console.log(v.id)
              // })
              this.tableData1 = array
            })
            .catch(failResponse => {})
        })
        .catch(failResponse => {})
    },
    refuse (row) {
      console.log(row.id)
      this.$axios
        .get('api/refuseApply?id=' + row.id, {
        })
        .then(successResponse => {
          this.tableData = successResponse.data
          this.$axios
            .get('api/listAllRefuseRecord', {
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
        .catch(failResponse => {})
    }
  },
  beforeCreate: function () {
    this.$axios
      .get('api/judgeAdminSession', {
      })
      .then(successResponse => {
        this.$axios
          .get('api/LicenseRecordCount', {
          })
          .then(successResponse => {
            this.licenseCount = successResponse.data
          })
          .catch(failResponse => {})
        this.$axios
          .get('api/getLimitList?start=' + this.currentPage + '&' + 'limit=' + this.pagesize, {
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
          .get('api/LicensePassRecordCount', {
          })
          .then(successResponse => {
            this.licenseCount1 = successResponse.data
          })
          .catch(failResponse => {})
        this.$axios
          .get('api/listAllPassRecordLimit?start=' + this.currentPage1 + '&' + 'limit=' + this.pagesize1, {
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
          .get('api/LicenseRefuseRecordCount', {
          })
          .then(successResponse => {
            this.licenseCount2 = successResponse.data
          })
          .catch(failResponse => {})
        this.$axios
          .get('api/listAllRefuseLimitRecord?start=' + this.currentPage2 + '&' + 'limit=' + this.pagesize2, {
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
        alert('使用管理员账号重新登录')
      })
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
