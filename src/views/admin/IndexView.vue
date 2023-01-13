<template>
  <el-container>
    <el-header id="header">
      <el-menu class="c-el-menu" mode="horizontal" :ellipsis="false" router>
        <el-menu-item index="/"><span id="logo">YII个人博客-后台</span></el-menu-item>
        <div style="flex-grow: 1;" />
        <el-menu-item index="/">
          博客
        </el-menu-item>
        <el-menu-item index="/admin">
          后台
        </el-menu-item>
        <el-sub-menu index="/">
          <template #title>
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          </template>
          <el-menu-item index="/logout">退出</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside width="200px" id="aside">
        <el-menu class="menu" router :collapse="isCollapse">
          <!-- <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <location />
              </el-icon>
              <span>Navigator One</span>
            </template>
            <el-menu-item-group title="Group One">
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>item four</template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu> -->
          <el-menu-item index="/admin">
            <el-icon>
              <Document />
            </el-icon>
            <span>博文管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/post">
            <el-icon>
              <DocumentAdd />
            </el-icon>
            <span>发布博客</span>
          </el-menu-item>
          <el-menu-item index="/admin/comment">
            <el-icon>
              <ChatLineSquare />
            </el-icon>
            <span>评论管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/dashboard">
            <el-icon>
              <PieChart />
            </el-icon>
            <span>状态面板</span>
          </el-menu-item>
          <el-menu-item index="/admin/users">
            <el-icon>
              <User />
            </el-icon>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/usergroup">
            <el-icon>
              <Key />
            </el-icon>
            <span>用户组管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main id="main">
        <router-view />
      </el-main>
    </el-container>
    <el-footer id="footer">
      <span>Powered by Vue/Yii2. | ©️ 2020-2023 MPSTO, All Rights Reserved.</span>
    </el-footer>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isCollapse = ref(false);
</script>

<style lang="scss" scoped>
#header {
  background-color: var(--color-stdblue-1);

  .c-el-menu {
    --el-menu-bg-color: transparent;
    --el-menu-text-color: white;

    #logo {
      font-size: 25px;
    }

  }
}

#aside {

  .menu {
    height: 100%;
    --el-menu-bg-color: var(--color-greengray-3);
    --el-menu-text-color: white;
    --el-menu-active-color: var(--color-greengray-3);
    --el-menu-active-bg-color: white;

    .el-menu-item.is-active {
      background-color: white;
    }
    .el-menu-item:hover {
      color: var(--color-greengray-3);
    }

    :deep(.el-sub-menu__title:hover) {
      color: var(--color-greengray-3);
    }
  }
}

#main {
  min-height: calc(100vh);
}

#footer {
  background-color: var(--color-greengray-2);
  color: white;
  text-align: center;
  padding: 20px 0 20px 0;

  span {
    font-size: 15px;
  }
}
</style>
