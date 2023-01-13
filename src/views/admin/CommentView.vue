<template>
  <div>
    <el-table :data="comments" style="width: 100%">
      <el-table-column prop="id" label="ID" width="120" />
      <el-table-column prop="user_id" label="用户ID" width="120" />
      <el-table-column prop="post_id" label="博文ID" width="120" />
      <el-table-column label="发布时间" width="150">
        <template #default="scope">
          <el-tag>{{ new Date(scope.row.timestamp).toLocaleString() }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容" width="300" />
      <el-table-column label="状态" width="120">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.isActive == 1">通过</el-tag>
          <el-tag type="warning" v-else>未审核</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="passComment(scope.row)">通过</el-button>
          <el-button link type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pg" small background layout="total,prev, pager, next" :total="comment_cnt" />

  </div>
</template>
<script lang="ts" setup>
import qs from 'qs'
import ax from '@/api/api';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
const comments = ref([])
const comment_cnt = ref(0)
const curPage = ref(1)
onMounted(() => {
  ax.head('/comments').then((resp) => {
    comment_cnt.value = parseInt(resp.headers.get('X-Pagination-Total-Count'))
  })
  ax.get('/comments/search', {
    params: {
      page: curPage.value - 1,
      pid: -1
    }
  }).then((resp) => {
    comments.value = resp.data
  })
})
const passComment = (comment: any) => {
  ax.put(`/comments/${comment['id']}`, qs.stringify({
    // ...comment,
    isActive: 1
  })).then(()=>{
    ElMessage.success('修改成功')
  })
}
</script>
<style lang="scss" scoped>
.pg {
  margin-top: 50px;
  width: 100%;
  justify-content: center;
}
</style>