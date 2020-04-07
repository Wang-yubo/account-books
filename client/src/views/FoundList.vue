<template>
  <div class="fillcontain">
    
      <el-form :inline="true" ref="search_data" :model="search_data">
        <el-form-item label="投标时间筛选:">
          <el-date-picker v-model="search_data.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>--
          <el-date-picker v-model="search_data.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" size="small" icon="search" @click="onScreeoutMoney()">筛选</el-button>
        </el-form-item>

      <el-form-item class="btnRight">
        <el-button type="primary" @click="AddData" size="small" icon="view" v-if="user.identity=='employee'">添加</el-button>
      </el-form-item>
    </el-form>
    

    <el-table
      v-if="tableData.length>0"
      :data="tableData"
      max-height="450"
      border
      style="width: 100%"
    >
      <el-table-column align="center" prop="index" label="序号" width="150" type="index"></el-table-column>
      <el-table-column align="center" prop="time" label="创建日期" width="150" sortable>
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="type" label="收支类型" width="120"></el-table-column>
      <el-table-column align="center" prop="descript" label="收支描述" width="120"></el-table-column>
      <el-table-column align="center" prop="income" label="收入" width="120">
        <template slot-scope="scope">
          <i class="el-icon-plus"></i>
          <span style="color:#67C23A;margin-left:20px">{{ "￥"+scope.row.income }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="expend" label="支出" width="120">
        <template slot-scope="scope">
          <i class="el-icon-minus"></i>
          <span style="color:red;margin-left:20px">{{ "￥"+scope.row.expend }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="cash" label="账户现金" width="120">
        <template slot-scope="scope">
          <i class="el-icon-money"></i>
          <span>{{ "￥"+scope.row.cash }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="remake" label="备注" width="200">
        <template slot-scope="scope">
          <i class="el-icon-notebook-2"></i>
          <span>{{ scope.row.remake }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="360">
        <template slot-scope="scope">
          <el-button @click="onEdit(scope.row)" type="warning" size="small" v-if="user.identity=='employee'">编辑</el-button>
          <el-button @click="onDelete(scope.row,scope.$index)" type="danger" size="small" v-if="user.identity=='employee'">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
<el-row >
  <el-col :span="24">
    <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.page_index"
      :page-sizes="pagination.page_sizes"
      :page-size="pagination.page_size"
      :layout="pagination.layout"
      :total="pagination.totle">
    </el-pagination>
  </div>
  </el-col>
</el-row>
    <!-- 会话组件 -->
    <DialogFund :dialog="dialog" :formData="formData" @updata="getProfile"></DialogFund>
  </div>
</template>
<script>
import DialogFund from "../components/DialogFund.vue";
export default {
  name: "foundlist",
  data() {
    return {
      tableData: [],
      allTabData:[],
      filterTableData: [],
      dialog: {
        show: false,
        title: ""
      },
      formData: {
        type: "",
        descript: "",
        income: "",
        expend: "",
        cash: "",
        remake: "",
        id: ""
      },
      pagination:{
        page_index:1,
        totle:0,
        page_size:5,
        page_sizes:[5,10,15,20],
        layout:"total, sizes, prev, pager, next, jumper"
      },
      search_data: {
        startTime: "",
        endTime: ""
      }
    };
  },
  //* 钩子函数,创建页面时获取数据
  created() {
    this.getProfile();
  },
  //* 从商店中拿到user的身份
  computed: {
    user(){
      return this.$store.getters.user
    }
  },
  methods: {
    //* 控制默认显示的页码和默认的条数
    handleSizeChange(page_size){
      this.pagination.page_index=1;
      this.pagination.page_size=page_size;
      this.tableData=this.allTabData.filter((item,index)=>{
        return index<page_size
      })
    },
    //* 根据页码显示对应的数据
    handleCurrentChange(page){
      //* 设置一个中间量,用来过滤
      //* 根据当前页码来计算出这个中间量
      let sortNum = this.pagination.page_size*(page-1);
      //* 过滤索引大小掉低于中间量的数据
      let table = this.allTabData.filter((item,index)=>{
        return index >= sortNum
      });
      //* 在上一次过滤的结果之后再根据每页最大数量拿到小于这个数量的数据
      this.tableData = table.filter((item,index)=>{
        return index<this.pagination.page_size
      })
    },
    //* 设置分页
    setPagination(){
      //* 获取总长度
      this.pagination.totle=this.allTabData.length;
      //* 设置默认显示页
      this.pagination.page_index=1;
      //* 设置默认分页数
      this.pagination.page_size=5;
      //* 设置过滤后显示的结果
      this.tableData = this.allTabData.filter((item,index)=>{
        return index<this.pagination.page_size
      }) 
    },

    //* 获取数据
    getProfile() {
      // alert( 123 )
      this.$axios("/api/profile").then(res => {
        this.tableData = res.data;
        this.allTabData = res.data;
        this.filterTableData = res.data;

        //* 拿到分页过滤后的数据
        this.setPagination();
      });
    },
    //* 添加
    AddData() {
      // alert(123)
      this.dialog = {
        show: true,
        title: "添加信息",
        option: "add"
      },
        this.formData = {
          type: "",
          descript: "",
          income: "",
          expend: "",
          cash: "",
          remake: "",
          id: ""
        };
    },
    //* 编辑
    onEdit(row) {
      this.dialog = {
        show: true,
        title: "修改信息",
        option: "edit"
      },
      this.formData = {
        type: row.type,
        descript: row.descript,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remake: row.remake,
        id: row._id
      };
    },
    //* 删除
    onDelete(row) {
      // console.log( index )
      this.$axios.delete(`/api/profile/delete/${row._id}`)
      .then(res => {
        this.$message({
          message: '恭喜你删除成功',
          type: 'success'
        })
        this.getProfile()
      }
    ) 
     .catch(err=>{
        console.log(err);
      })
    },
    onScreeoutMoney() {
      // 筛选
      if (!this.search_data.startTime || !this.search_data.endTime) {
        this.$message({
          type: "warning",
          message: "请选择时间区间"
        });
        //* 这里调用的目的在于筛选之后可以恢复成筛选前
        this.getProfile();
        return;
      }
      const stime = this.search_data.startTime.getTime();
      const etime = this.search_data.endTime.getTime();
      this.allTabData = this.filterTableData.filter(item => {
        let date = new Date(item.date);
        let time = date.getTime();
        return time >= stime && time <= etime;
      });
      // 分页数据
      this.setPagination();
    }
  },
  components: {
    DialogFund
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