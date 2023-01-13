<template>
  <el-container>
    <el-main id="main">
      <el-breadcrumb :separator-icon="ArrowRight" id="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
        <!-- <el-breadcrumb-item :to="{ path: '/blogs?tags=0000' }">标签为“0000”的博客</el-breadcrumb-item> -->
        <el-breadcrumb-item>{{ blog.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div id="title">
        <span>{{ blog.title }}</span>
      </div>
      <div id="abstract">
        <span class="section-title">简介</span>
        <div>
          {{ blog.abstract }}
        </div>
      </div>
      <div id="article">
        <v-md-preview :text="markdownString"></v-md-preview>
      </div>
      <div id="comments">
        <span class="section-title">评论</span>
        {{ comments.length }}
        <el-input placeholder="发表评论" :disabled="!isLogin" :prefix-icon="Comment" class="comment-input"
          v-model="commentText">
          <template #append>
            <el-button :icon="Position" :disabled="!isLogin" @click="makeComment"></el-button>
          </template>
        </el-input>
        <div class="comments-area">
          <div v-for="comment in comments" :key="comment['id']">
            <p><span style="font-size: 20px;">用户{{ comment['user_id'] }}</span> - {{ new Date(comment['timestamp']).toLocaleString() }}</p>
            <p>{{ comment['content'] }}</p>
          </div>
        </div>
        <!-- <el-pagination class="pg" small background layout="prev, pager, next" :total="50" /> -->
      </div>
    </el-main>
    <el-aside width="200px" id="aside">
      <el-card class="card" shadow="never">
        <template #header>
          <span>文章信息</span>
        </template>
        222000321熊中伟
        <br />
        发表于：{{ blog.created_at.toLocaleString() }}
        <br />
        更新于：{{ blog.updated_at.toLocaleString() }}
        <br/>
        <el-tag class="tag" v-for="tag in tags" :key="tag['id']">{{ tag['content'] }}</el-tag>
      </el-card>
      <el-card class="card" shadow="never">
        <template #header>
          <span>作者信息</span>
        </template>
        {{ blog.author }}
      </el-card>
      <el-card class="card" shadow="never">
        <template #header>
          <span>附件下载</span>
        </template>
        <div v-for="i in blog.attachment_cnt" :key="i">
          <el-link type="primary" :href="`http://localhost:8082/v1/posts/attachment?pid=${blog.id}&fid=${i-1}`">附件{{ i
          }}</el-link>
        </div>
        <el-empty description="暂无附件" :image-size="65" v-if="blog.attachment_cnt == 0" />
      </el-card>
    </el-aside>
  </el-container>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue';
import { ArrowRight, Position, Comment } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router';
import ax from '@/api/api';
import { ElMessage } from 'element-plus';

interface Blog {
  id: number,
  author: string,
  title: string,
  abstract: string,
  attachment_cnt: number,
  isActive: number,
  created_at: Date,
  updated_at: Date,
}
const isLogin = ref(false)
const bid = ref('0')
const commentText = ref('')
const markdownString = ref('')
const blog = reactive<Blog>({
  id: 0,
  title: '',
  author: '',
  abstract: '',
  attachment_cnt: 0,
  isActive: 1,
  updated_at: new Date(),
  created_at: new Date()
})
const comments = ref([])
const comment_cnt = ref(0)
const tags = ref([])
onMounted(() => {
  if (localStorage.getItem('token')) {
    isLogin.value = true;
    console.log(localStorage.getItem('token'))
  }
  if (useRoute().params.bid) {
    bid.value = useRoute().params.bid as string
  } else useRouter().back()
  ax.get(`/posts/${bid.value}`).then((resp) => {
    blog.id = resp.data.id
    blog.abstract = resp.data.abstract
    blog.title = resp.data.title
    blog.author = resp.data.author
    blog.created_at = new Date(resp.data.created_at)
    blog.updated_at = new Date(resp.data.updated_at)
    blog.attachment_cnt = resp.data.attachment_cnt
  })
  ax.get('/tags/search', {
    params: {
      pid: bid.value,
    }
  }).then((resp) => {
    tags.value = resp.data
  })
  ax.head('/comments').then((resp) => {
    comment_cnt.value = parseInt(resp.headers.get('X-Pagination-Total-Count'))
  })
  ax.get('/comments/search', {
    params: {
      pid: bid.value,
      page: 0
    }
  }).then((resp) => {
    comments.value = resp.data
  })
  ax.get('/posts/file', {
    params: {
      pid: bid.value
    }
  }).then((resp) => {
    markdownString.value = resp.data.content
  })
})
const makeComment = () => {
  console.log(localStorage.getItem('uid'))
  if (commentText.value != '') {
    ax.post('/comments', {
      post_id: blog.id,
      user_id: parseInt(localStorage.getItem('uid')||'0'),
      content: commentText.value,
      timestamp: new Date().getTime()
    }).then(() => {
      ElMessage.success('评论发表成功')
    }).catch(() => {
      ElMessage.error('发表失败')
    })
  }
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

  #title {
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: 5px;
    margin-top: 20px;

    span {
      font-size: 30px;
      font-weight: bolder;
    }
  }

  #abstract {
    margin-top: 20px;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.85);

    div {
      margin-top: 10px;
      padding: 5px;
    }
  }

  #article {
    margin-top: 20px;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.85);
  }

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
