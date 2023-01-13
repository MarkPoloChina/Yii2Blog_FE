<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID" width="120" />
      <el-table-column prop="username" label="用户名" width="120" />
      <el-table-column label="创建时间" width="200">
        <template #default="scope">
          <el-tag>{{ new Date(scope.row.created_at*1000).toLocaleString() }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template #default>
          <el-button link type="warning" size="small">禁言</el-button>
          <el-button link type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pg" :total="users_cnt" :page-size="20" small background layout="total, prev, pager, next" />

  </div>
</template>
<script lang="ts" setup>
import ax from '@/api/api';
import { ref, onMounted } from 'vue';

interface User {
  id: number,
  username: string,
}
const tableData = ref<User[]>([])
const users_cnt = ref(0)
onMounted(() => {
  ax.get(`/users?access-token=${localStorage.getItem('token')}`).then((resp) => {
    tableData.value = resp.data
  })
  ax.head(`/users?access-token=${localStorage.getItem('token')}`).then((resp) => {
    users_cnt.value = parseInt(resp.headers.get('X-Pagination-Total-Count'))
  })
})
</script>
<style lang="scss" scoped>
.pg {
  margin-top: 50px;
  width: 100%;
  justify-content: center;
}
</style>