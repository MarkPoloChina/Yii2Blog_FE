<template>
  <div>
    <el-row :gutter="20" class="row">
      <el-col :span="12">
        <e-charts class="chart" :option="option" />

      </el-col>
      <el-col :span="12">
        <e-charts class="chart" :option="option2" />

      </el-col>
    </el-row>
    <el-row :gutter="20" class="row">
      <el-col :span="12">
        <e-charts class="chart big" :option="option3" />

      </el-col>
      <el-col :span="12" class="sec-container">
        <div class="sec" style="background-color: rgba(236, 146, 146, 0.35);">
          <div class="t">总访问量</div>
          <div class="v">231</div>
        </div>
        <div class="sec" style="background-color: rgba(146, 210, 236, 0.35);">
          <div class="t">总博客量</div>
          <div class="v">8</div>
        </div>
        <div class="sec" style="background-color: rgba(146, 236, 182, 0.35);">
          <div class="t">总评论数</div>
          <div class="v">12</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';


const option = computed(() => {
  return {
    title: {
      text: '过去7天访问量和评论量'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: data.value.map(el => el.name)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: data.value.map(el => el.hits),
        type: 'bar',
        name: '访问量'
      },
      {
        data: data.value.map(el => el.commentCnt),
        type: 'bar',
        name: '评论量'
      }
    ],
    legend: {
      right: 10,
    },

  }
})
const option2 = computed(() => {
  return {
    title: {
      text: '过去7天博客量'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: data2.value.map(el => el.name)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: data2.value.map(el => el.hits),
        type: 'line',
        name: '博客量'
      },
    ],
    legend: {
      right: 10,
    },

  }
})
const option3 = computed(() => {
  return {
    title: {
      text: '标签比例'
    },
    legend: {
      top: 'bottom'
    },
    series: [
      {
        name: '标签比例',
        type: 'pie',
        radius: [50, 250],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: data3.value
      }
    ]
  }
})
const data = ref([
  { hits: 0, name: '1.7', commentCnt: 0 },
  { hits: 0, name: '1.8', commentCnt: 0 },
  { hits: 0, name: '1.9', commentCnt: 0 },
  { hits: 40, name: '1.10', commentCnt: 0 },
  { hits: 0, name: '1.11', commentCnt: 0 },
  { hits: 58, name: '1.12', commentCnt: 3 },
  { hits: 85, name: '1.13', commentCnt: 1 },
])

const data2 = ref([
  { hits: 0, name: '1.7' },
  { hits: 0, name: '1.8' },
  { hits: 0, name: '1.9' },
  { hits: 1, name: '1.10', },
  { hits: 0, name: '1.11', },
  { hits: 5, name: '1.12', },
  { hits: 1, name: '1.13', },
])
const data3 = ref([
  { value: 2, name: '标签1' },
  { value: 2, name: '标签2' },
  { value: 1, name: '标签3' },
])
</script>
<style lang="scss" scoped>
.chart {
  height: 350px;
  background-color: rgba(238, 238, 238, 0.65);
  padding: 5px;
  border-radius: 5px;
}

.big {
  height: 650px;
}

.row {
  margin: 10px 0 10px 0;
}

.sec-container {
  height: 660px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;

  .sec {
    width: calc(100% - 40px);
    margin: 10px;
    padding: 10px;
    border-radius: 5px;

    .t {
      font-size: larger;
      font-weight: bolder;
      margin-bottom: 10px;
    }

    .v {
      font-size: large;
    }
  }
}
</style>