<template>
  <el-container>
    <el-main id="main">
      <el-breadcrumb :separator-icon="ArrowRight" id="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
        <!-- <el-breadcrumb-item :to="{ path: '/blogs?tags=0000' }">标签为“0000”的博客</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/blog/1' }">Vue3从入门到精通</el-breadcrumb-item> -->
      </el-breadcrumb>
      <div class="blogs-list">
        <el-card @click="toBlog(blog)" class="card" shadow="never" v-for="blog in blogs" :key="blog.id">
          <template #header>
            <el-row>
              <el-col :span="12"><span style="font-size: 20px;font-weight: bold;">{{ blog.title }}</span></el-col>
              <el-col :span="12"><span>作者：{{ blog.author }}</span></el-col>
            </el-row>
          </template>
          {{ blog.abstract }}
        </el-card>
      </div>
      <el-pagination class="pg" :total="blogs_cnt" :page-size="20" small background layout="total, prev, pager, next" />
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
        <el-tag class="tag" v-for="tag in tags" :key="tag['id']">{{ tag }}</el-tag>
        <el-empty description="暂无标签" :image-size="65" v-if="tags.length == 0" />
      </el-card>
      <el-card class="card" shadow="never">
        <template #header>
          <span>最新评论</span>
        </template>
        <div v-for="comment in comments" :key="comment['id']">
          <p><span style="font-size: 13px;">用户{{ comment['user_id'] }} - {{
            new
                      Date(comment['timestamp']).toLocaleString()
          }}</span></p>
          <p>{{ comment['content'] }}</p>
        </div>
        <el-empty description="暂无评论" :image-size="65" v-if="comments.length == 0" />
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
import { ref, onMounted } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router';
import ax from '@/api/api';

interface Blog {
  id: number,
  author: string,
  title: string,
  abstract: string,
  isActive: number,
}
const historyVisited = ref([])
const tags = ref([])
const blogs = ref<Blog[]>([])
const comments = ref([])
const blogs_cnt = ref(0)
const route = useRoute()
const router = useRouter()
onMounted(() => {
  if (Object.keys(route.query).length == 0) {
    ax.get(`/posts`).then((resp) => {
      blogs.value = resp.data
    })
    ax.head('/posts').then((resp) => {
      blogs_cnt.value = parseInt(resp.headers.get('X-Pagination-Total-Count'))
    })
  }
  ax.get('/tags').then((resp) => {
    const s = new Set()
    resp.data.forEach((tag) => {
      s.add(tag.content)
    })
    tags.value = Array.from(s) as never[]
  })
  ax.get('/comments/search', {
    params: {
      page: 0,
      pid: -1
    }
  }).then((resp) => {
    comments.value = resp.data.slice(0,5)
  })
})
const toBlog = (blog: Blog) => {
  router.push(`/blog/${blog.id}`)
}
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
    margin: 20px 10px 50px 10px;

    .card {
      margin-bottom: 10px;
      cursor: pointer;
    }
  }

  .pg {
    width: 100%;
    justify-content: center;
  }
}
</style>
