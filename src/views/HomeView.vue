<template>
  <el-container>
    <el-main id="main">
      <el-breadcrumb :separator-icon="ArrowRight" id="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/blogs?tags=0000' }">标签为“0000”的博客</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/blog/1' }">Vue3从入门到精通</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="blogs-list">
        <el-card class="card" shadow="never" v-for="blog in blogs" :key="blog.id">
          <template #header>
            <span>{{ blog.title }}</span>
          </template>
          {{ blog.abstract }}
        </el-card>
      </div>
      <el-pagination class="pg" small background layout="prev, pager, next" :total="50" />
    </el-main>
    <el-aside width="200px" id="aside">
      <el-input placeholder="搜索博文">
        <template #prefix>
          <el-icon class="el-input__icon">
            <search />
          </el-icon>
        </template>
      </el-input>
      <el-card class="card" shadow="never">
        <template #header>
          <span>站长信息</span>
        </template>
        222000321熊中伟
      </el-card>
      <el-card class="card" shadow="never">
        <template #header>
          <span>近期热门</span>
        </template>
        <el-tag class="tag">Tag 1</el-tag>
        <el-tag class="tag" type="success">Tag 2</el-tag>
        <el-tag class="tag" type="info">Tag 3</el-tag>
        <el-tag class="tag" type="warning">Tag 4</el-tag>
        <el-tag class="tag" type="danger">Tag 5</el-tag>
      </el-card>
      <el-card class="card" shadow="never">
        <template #header>
          <span>最新评论</span>
        </template>
        <el-empty description="暂无评论" :image-size="65" v-if="latestComments.length == 0" />
      </el-card>
      <el-card class="card" shadow="never">
        <template #header>
          <span>历史访问</span>
        </template>
        <el-empty description="暂无记录" :image-size="65" v-if="historyVisited.length == 0" />
      </el-card>
    </el-aside>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue'


const latestComments = ref([])
const historyVisited = ref([])
const blogs = ref([
  {
    id: 1,
    title: '文章',
    abstract: '简介',
    author: '1111'
  },
  {
    id: 2,
    title: '文章',
    abstract: '简介',
    author: '1111'
  },
  {
    id: 3,
    title: '文章',
    abstract: '简介',
    author: '1111'
  },
  {
    id: 4,
    title: '文章',
    abstract: '简介',
    author: '1111'
  },
  {
    id: 5,
    title: '文章',
    abstract: '简介',
    author: '1111'
  },
])
</script>

<style lang="scss" scoped>
#aside {
  padding: 10px;
  background-color: rgba(216, 216, 216, 0.5);

  .card {
    margin-top: 10px;
  }

  .tag {
    margin: 5px;
  }
}

#main {
  padding: 10px;
  margin-right: 10px;
  background-color: rgba(216, 216, 216, 0.5);

  #breadcrumb {
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: 5px;
  }

  .blogs-list {
    margin: 20px 40px 50px 40px;

    .card {
      margin-bottom: 10px;
    }
  }

  .pg {
    width: 100%;
    justify-content: center;
  }
}
</style>
