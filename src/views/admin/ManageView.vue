<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID" width="120" />
      <el-table-column prop="title" label="标题" width="200" />
      <el-table-column prop="author" label="作者" width="120" />
      <el-table-column prop="abstract" label="摘要" width="200" />
      <el-table-column label="状态" width="120" >
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.isActive==1">激活</el-tag>
          <el-tag type="warning" v-else>下架</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="140">
        <template #default>
          <el-button link type="primary" size="small">下架</el-button>
          <el-button link type="danger" size="small">删除</el-button>
          <el-button link type="warning" size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pg" :total="blogs_cnt" :page-size="20" small background layout="total, prev, pager, next" />

  </div>
</template>
<script lang="ts" setup>
import ax from '@/api/api';
import { onMounted, ref } from 'vue';
interface Blog {
  id: number,
  author: string,
  title: string,
  abstract: string,
  isActive: number,
}

const tableData = ref<Blog[]>([])
const blogs_cnt = ref(0)
onMounted(() => {
  ax.get(`/posts`).then((resp) => {
    tableData.value = resp.data
  })
  ax.head('/posts').then((resp) => {
    blogs_cnt.value = parseInt(resp.headers.get('X-Pagination-Total-Count'))
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