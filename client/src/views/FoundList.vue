<template>
  <div class="fillcontain">
    <el-form>
      <el-form-item class="btnRight">
        <el-button 
        type="primary" 
        @click="AddData" 
        size="small"
        icon="view">添加</el-button>
      </el-form-item>
    </el-form>






    <el-table 
    v-if="tableData.length>0" 
    :data="tableData" 
    max-height="450"
    border style="width: 100%">
      <el-table-column  align="center"  prop="index" label="序号" width="150" type="index"></el-table-column>
      <el-table-column  align="center"  prop="time" label="创建日期" width="150"  sortable>
         <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{scope.row.date }}</span>
      </template>
      </el-table-column>
      <el-table-column  align="center" prop="type" label="收支类型" width="120"></el-table-column>
      <el-table-column  align="center" prop="descript" label="收支描述" width="120"></el-table-column>
      <el-table-column  align="center" prop="income" label="收入" width="120" >
         <template slot-scope="scope">
        <i class="el-icon-plus"></i>
        <span style="color:#67C23A;margin-left:20px">{{  "￥"+scope.row.income }}</span>
      </template>
      </el-table-column>
      <el-table-column  align="center" prop="expend" label="支出" width="120">
         <template slot-scope="scope">
        <i class="el-icon-minus"></i>
        <span style="color:red;margin-left:20px" >{{ "￥"+scope.row.expend }}</span>
      </template>
      </el-table-column>
      <el-table-column  align="center" prop="cash" label="账户现金" width="120">
        <template slot-scope="scope">
        <i class="el-icon-money"></i>
        <span  >{{ "￥"+scope.row.cash }}</span>
      </template>
      </el-table-column>
      <el-table-column  align="center" prop="remake" label="备注" width="200">
        <template slot-scope="scope">
        <i class="el-icon-notebook-2"></i>
        <span>{{ scope.row.remake }}</span>
      </template>
      </el-table-column>
      <el-table-column   align="center" label="操作" width="360">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="warning" size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 会话组件 -->
  <DialogFund :dialog="dialog"></DialogFund>
  </div>
</template>
<script>

import DialogFund from "../components/DialogFund.vue"
export default {
  name: "foundlist",
    data() {
      return {
        tableData: [
         
        ],
        dialog:{
          show:false,
        }
      };
    },
  
  created() {
    this.getProfile();
  },
  methods: {
     handleClick(row) {
      console.log(row);
    },
    getProfile() {
      // alert( 123 )
      this.$axios("/api/profile").then(res => {
        console.log(res);
        this.tableData=res.data
      });
    },
    AddData(){
      // alert(123)
      this.dialog={
        show:true,
        title:"添加资金信息",
        option:"add"
      }
    }
  },
  components:{
    DialogFund,
  }
};
</script>


<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>