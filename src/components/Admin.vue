<template>
  <div id="admin">
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
      label="操作"
      width="110">
      <template slot-scope="scope">
        <el-button @click="pass(scope.row)" type="text" size="small">通过</el-button>
        <el-button @click="refuse(scope.row)" type="text" size="small">不通过</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>

export default {
  name: 'Admin',
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    pass (row) {
      console.log(row.id)
      this.$axios
        .get('api/passApply?id=' + row.id, {
        })
        .then(successResponse => {
          this.tableData = successResponse.data
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
          .get('api/listRecord', {
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
