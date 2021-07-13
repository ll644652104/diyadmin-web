<template>
  <div class="main-container" v-cloak>
    <div class="head-container">
      <el-input
          placeholder="请输入名称或者IP地址"
          v-model="input"
          clearable
          >
      </el-input>
      <el-button @click="selectBtn">搜索</el-button>
    </div>

    <div class="list-button">
      <el-button class="add-button" @click="addBtn">新增</el-button>
      <el-button class="delete-button">删除</el-button>
    </div>
    <dialogVisible :dialogVisible="dialogVisible" @func="getMsgFormSon" :updateRow="updateRow" :current="current"></dialogVisible>

    <el-table
        v-loading="loading"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column

          label="IP地址"
          width="120">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.ipaddr }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="端口"
          width="120">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.port }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="remarks"
          label="备注"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="operation"
          label="操作"
          show-overflow-tooltip>
        <template #default="scope">
          <el-button
              size="mini"
              @click="updateBtn(scope.row)">编辑</el-button>

          <!--<dialogVisible :dialogVisible="dialogVisible" @func="getMsgFormSon"></dialogVisible>-->
          <el-button
              size="mini"
              type="danger"
              @click="deleteBtn(scope.row)">删除</el-button>
        </template>


        <!--<el-button class="update-button">修改</el-button>-->
        <!--<el-button class="delete-button" @click="deleteBtn(scope.$index, scope.row)">删除</el-button>-->
      </el-table-column>



    </el-table>

    <div class="block">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          v-model:currentPage="current"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="totalSize"
          hide-on-single-page>

      </el-pagination>
    </div>
  </div>
</template>

<script>

  import {deleteRequest, getRequest} from "../../config/api";

  import dialogVisible from 'components/content/dialog/DialogMenu'

  export default {
    name: "Service",
    components: {
      dialogVisible
    },

    data() {
      return {
        updateRow: {},
        loading: true,
        input: '',
        dialogVisible: false,
        tableData: [],
        totalSize: null,
        pageSize: 5,
        current: 1,
        multipleSelection: [],
        ruleForm: {
          ipAddr: '',
          username: '',
          port: '',
          pass: '',
          remarks: ''
        },
      }
    },

    computed: {

    },

    mounted(){
      this.getTableData(this.current);//在html加载完成后进行，相当于在页面上同步显示后端数据
    },
    methods: {

      addBtn(){
        this.dialogVisible = true;
        this.updateRow = null;
      },

      updateBtn(row){
        this.dialogVisible = true;
        console.log("row"+row);
        let data = JSON.parse(JSON.stringify(row));
        this.updateRow = data;
      },
      deleteBtn(row) {

        this.$confirm('确认是否删除'+row.ipaddr+'该服务器？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          deleteRequest('/api/diyadmin/server',{
            id: row.id
          }).then(()=>{
            this.getTableData(this.current)
          });
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      selectBtn(){
          this.current = 1;
          this.getTableData(this.current);
      },

      getTableData(current) {
        getRequest('/api/get/all/servers',{
          current: current,
          size: this.pageSize,
          param: this.input
        }).then(res => {
          console.log(res);
          this.tableData=res.data.data
          console.log(res.data.total);
          this.totalSize=res.data.total;
          this.loading = false;
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.getTableData(val);
      },

      getMsgFormSon(data){
        this.dialogVisible = data
      }

    },
  }
</script>

<style scoped>
  /* 修改输入框的样式 */
  .el-input {
    width: 250px;
    /*line-height: 30px;*/
  }
  .head-container {
    height: 40px;
    padding: 20px 0;
  }

  /* 修改输入框的样式 */
  .head-container .el-button {
    margin-left: 40px;
    background-color: #13ce66;
    color: #fff;
  }

  .add-button {
    background-color: #0077aa;
    color: #fff;
  }
  .update-button {
    background-color: #ebb563;
    color: #fff;
  }
  .delete-button {
    background-color: #bd2c00;
    color: #fff;
  }
  .block {
    padding-top: 10px;
    font-size:100px;
  }
</style>

<style>
  .el-main {
    background-color: #fff;
  }

  /* 修改输入框清楚按钮的样式 */
  .el-icon-circle-close:before {
    content: "\e79d" !important;
    font-size: 18px;
  }

  /* 修改输入框的高度 */
  .head-container .el-input__inner {
    /*height: 30px;*/
    font-size: 15px;
  }

</style>