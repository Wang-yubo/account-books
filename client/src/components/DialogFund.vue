<template>
  <div class="logFund">
    <el-dialog 
    :title="dialog.title" 
    :visible.sync="dialog.show">
      <div class="form">
        <el-form ref="form" :model="formData" label-width="80px" :rules="form_rules">
          <!-- 类型 -->
          <el-form-item label="收支类型">
            <el-select v-model="formData.type" placeholder="请选择">
              <el-option
                v-for="(item,index) in format_type_list"
                :key="index"
                :label="item.label"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 描述 -->
          <el-form-item prop="descript" label="描述信息">
            <el-input type="descript" v-model="formData.descript" placeholder="请输入描述信息"></el-input>
          </el-form-item>
          <!-- 收入 -->
          <el-form-item prop="income" label="收入">
            <el-input type="income" v-model="formData.income" placeholder="收入"></el-input>
          </el-form-item>
          <!-- 支出 -->
          <el-form-item prop="expend" label="支出">
            <el-input type="expend" v-model="formData.expend" placeholder="支出"></el-input>
          </el-form-item>
          <!-- 账户现金 -->
          <el-form-item prop="cash" label="账户余额">
            <el-input type="cash" v-model="formData.cash" placeholder="账户余额"></el-input>
          </el-form-item>
          <!-- 备注 -->
          <el-form-item prop="remake" label="备注信息">
            <el-input type="remake" v-model="formData.remake" placeholder="请输入备注信息"></el-input>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item >
            <el-button @click="dialog.show=false">取消</el-button>
           <el-button type="primary" @click="onSubmit('form')">提交</el-button>
          </el-form-item>

        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "dialogfund",
  props: {
    dialog: Object,
    formData:Object
  },
  data() {
    return {
      format_type_list: [
        "通讯物流",
        "文体教育",
        "医疗保健",
        "生活日用",
        "交通出行",
        "服饰美容",
        "休闲娱乐",
        "餐饮美食",
        "其他开支"
      ],
      form_rules: {
        descript: [
          { required: true, message: "收支描述不能为空！", trigger: "blur" }
        ],
        income: [
          { required: true, message: "收入不能为空！", trigger: "blur" }
        ],
        expend: [
          { required: true, message: "支出不能为空！", trigger: "blur" }
        ],
        cash: [{ required: true, message: "账户不能为空！", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit(form){
      this.$refs[form].validate(valid=>{
        if(valid){
          const url = this.dialog.option=="add"?"add":`edit/${this.formData.id}`
          this.$axios
          .post(`/api/profile/${url}`,this.formData)
          .then(res=>{
            this.$message({
              message: '数据保存成功',
              type: 'success'
            })
            //* 提交之后关闭会话
             this.dialog.show=false
            //* 然后让父组件数据更新
            this.$emit('updata')
          })
        }
      })
    }
  },
};
</script>