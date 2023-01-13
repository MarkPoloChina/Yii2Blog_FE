<template>
  <el-container>
    <el-main id="main">
      <el-tabs class="demo-tabs" v-model="activeName">
        <el-tab-pane label="个人信息" name="info">个人信息</el-tab-pane>
        <el-tab-pane label="历史记录" name="history">历史记录</el-tab-pane>
        <el-tab-pane label="我的评论" name="comments">我的评论</el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
// import { ArrowRight, Position, Comment } from '@element-plus/icons-vue'
// import { useRoute, useRouter } from 'vue-router';

const activeName = ref('info')
// const files = ref([])
// const bid = ref('0')
// onMounted(() => {})
</script>

<style lang="scss" scoped>
#main {
  padding: 10px;
  background-color: rgba(216, 216, 216, 0.5);

  #comments {
    margin-top: 20px;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.85);

    .comment-input {
      margin-top: 10px;
    }

    .comments-area {
      margin-top: 10px;
      padding: 5px;
    }
  }

  .section-title {
    font-size: 20px;
  }

  .pg {
    width: 100%;
    justify-content: center;
  }
}
</style>
