<template>
  <div>
    <el-form :model="postForm" label-position="top">
      <el-form-item label="标题">
        <el-input v-model="postForm.title" />
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="postForm.author" />
      </el-form-item>
      <el-form-item label="标签">
        <el-select v-model="postForm.tags" multiple filterable allow-create default-first-option
          :reserve-keyword="false" placeholder="添加标签">
        </el-select>
      </el-form-item>
      <el-form-item label="摘要">
        <el-input v-model="postForm.abstract" :autosize="{ minRows: 3, maxRows: 10 }" type="textarea"
          placeholder="输入摘要" />
      </el-form-item>
      <el-form-item label="使用文件">
        <el-switch v-model="postForm.useFile" />
      </el-form-item>
      <el-form-item label="激活">
        <el-switch v-model="postForm.isActive" />
      </el-form-item>
      <el-form-item label="Markdown文件上传" v-if="postForm.useFile">
        <el-upload ref="upload" accept=".md" v-model:file-list="postForm.file" :limit="1" :auto-upload="false">
          <template #trigger>
            <el-button type="primary">选择文件</el-button>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="正文编辑器" v-else>
        <v-md-editor v-model="postForm.htmlText" height="400px"></v-md-editor>
      </el-form-item>
      <el-form-item label="附件上传">
        <el-upload ref="upload" accept=".zip" v-model:file-list="postForm.attachments" :limit="5" :auto-upload="false">
          <template #trigger>
            <el-button type="primary">选择文件</el-button>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="newPost">发布</el-button>
        <el-button type="danger">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import ax from '@/api/api';
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';

const postForm = reactive({
  title: '',
  author: '',
  abstract: '',
  isActive: true,
  attachments: [],
  tags: [],
  useFile: false,
  htmlText: '',
  file: []
})

const newPost = () => {
  if (postForm.useFile && postForm.file.length == 0 || !postForm.useFile && postForm.htmlText == '') return
  if (postForm.title != '')
    ax.post(`posts?access-token=${localStorage.getItem('token')}`, {
      title: postForm.title,
      author: postForm.author,
      abstract: postForm.abstract,
      isActive: postForm.isActive ? 1 : 0,
      updated_at: new Date().getTime(),
      created_at: new Date().getTime(),
      attachment_cnt: postForm.attachments.length,
    }).then((resp) => {
      if (postForm.useFile)
        uploadFile(postForm.file[0]['raw'], resp.data.id)
      else {
        uploadFile(new File([postForm.htmlText], `${resp.data.id}.md`))
      }
      postForm.attachments.forEach((att,index)=>{
        uploadAttachment(att['raw'],resp.data.id,index)
      })
      uploadTags(postForm.tags, resp.data.id)
    }).catch(err => {
      ElMessage.error(err)
    })
}
const uploadFile = (file: File, pid?: number) => {
  if (pid)
    file = new File([file], `${pid}.md`, { type: file.type })
  const formData = new FormData()
  formData.append('file', file)
  ax.postForm(`/posts/file?access-token=${localStorage.getItem('token')}`, formData).then(
    () => {
      ElMessage.success('发布成功')
    }
  ).catch(err => {
    ElMessage.error(err)
  })

}
const uploadAttachment = (file: File, pid: number,fid:number) => {

  const sfile = new File([file], `${fid}.zip`, { type: file.type })
  const formData = new FormData()
  formData.append('file', sfile)
  ax.postForm(`/posts/attachment?pid=${pid}&access-token=${localStorage.getItem('token')}`, formData).then(
    () => {
      ElMessage.success('附件上传成功')
    }
  ).catch(err => {
    ElMessage.error(err)
  })

}
const uploadTags = (tags: Array<never>, pid: number) => {
  tags.forEach(tag => {
    ax.post(`/tags?access-token=${localStorage.getItem('token')}`, {
      content: tag,
      post_id: pid
    })
  })
}
</script>
<style lang="scss" scoped>

</style>s