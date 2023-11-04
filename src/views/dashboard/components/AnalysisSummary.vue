<template>
  <el-card class="summary">
    <div class="para mb-20">
      <h3>Dashboard</h3>
      <p>Overview Of Lasted Month</p>
    </div>
    <div class="para mb-20">
      <h3><CountTo prefix="$" :startAmount="0" :endAmount="7754" /></h3>
      <p>Current Month Earnings</p>
    </div>
    <div class="para mb-20">
      <h3><CountTo :startAmount="0" :endAmount="1234" prefix="" /></h3>
      <p class="mb-40">Current Month Sales</p>
    </div>

    <el-button class="mb-30" type="primary">Last Month Summary</el-button>
  </el-card>
</template>
<script setup lang="ts">
import CountTo from "@/components/common/CountTo.vue";
</script>
