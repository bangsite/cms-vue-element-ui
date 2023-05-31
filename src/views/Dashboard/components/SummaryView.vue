<template>
  <ElCard class="summary">
    <div class="para mb-40">
      <h3>Dashboard</h3>
      <p>Overview Of Lasted Month</p>
    </div>
    <div class="para mb-40">
      <h3><CountTo prefix="$" :startAmount="0" :endAmount="7754" /></h3>
      <p>Current Month Earnings</p>
    </div>
    <div class="para mb-40">
      <h3><CountTo :startAmount="0" :endAmount="1234" prefix="" /></h3>
      <p class="mb-40">Current Month Sales</p>
    </div>

    <el-button class="btn" type="primary">Last Month Summary</el-button>
  </ElCard>
</template>
<script setup lang="ts">
import CountTo from "@/components/CountTo.vue";
</script>
