import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "@/style/element.scss";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import VMdEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import Echarts from "vue-echarts";
import "echarts";
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';

const app = createApp(App);
VMdEditor.use(vuepressTheme);
VMdPreview.use(vuepressTheme);
app.use(store).use(router).use(ElementPlus).use(VMdEditor).use(VMdPreview);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.component("ECharts", Echarts);
app.mount("#app");
