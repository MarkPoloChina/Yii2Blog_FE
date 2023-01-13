<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID" width="120" />
      <el-table-column prop="name" label="用户组名" width="120" />
      <el-table-column fixed="right" label="操作">
        <template #default>
          <el-button link size="small">修改权限</el-button>
          <el-button link size="small">查看用户</el-button>
          <el-button link type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
const tableData = [{
  id:1,
  name:'普通用户'
},
{
  id:2,
  name:'访客'
},
{
  id:3,
  name:'普通管理员'
},
{
  id:3,
  name:'超级管理员'
}]

</script>
<style lang="scss" scoped>
  
</style>