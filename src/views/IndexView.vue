<template>
  <el-container>
    <el-header id="header">
      <el-menu class="c-el-menu" mode="horizontal" :ellipsis="false" router>
        <el-menu-item index="/"><span id="logo">YII个人博客</span></el-menu-item>
        <div style="flex-grow: 1;" />
        <el-menu-item index="/">
          博客
        </el-menu-item>
        <el-sub-menu index="/">
          <template #title>
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          </template>
          <el-menu-item index="/user">用户中心</el-menu-item>
          <el-menu-item index="/logout">退出</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-header>
    <el-main id="main">
      <router-view />
    </el-main>
  </el-container>
</template>

<script lang="ts" setup></script>

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

#main {
  min-height: calc(100vh);
}
</style>
