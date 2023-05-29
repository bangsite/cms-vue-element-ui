<template>
    <PanelGroup />
    <ElRow :gutter="20" justify="space-between">
        <ElCol :xl="10" :lg="10" :md="24" :sm="24" :xs="24">
            <ElCard shadow="hover" class="mb-20px">
                <ElSkeleton :loading="loading" animated>
<!--                    <Echart :options="pieOptionsData" :height="300" />-->
                </ElSkeleton>
            </ElCard>
        </ElCol>
        <ElCol :xl="14" :lg="14" :md="24" :sm="24" :xs="24">
            <ElCard shadow="hover" class="mb-20px">
                <ElSkeleton :loading="loading" animated>
<!--                    <Echart :options="barOptionsData" :height="300" />-->
                </ElSkeleton>
            </ElCard>
        </ElCol>
        <ElCol :span="24">
            <ElCard shadow="hover" class="mb-20px">
                <ElSkeleton :loading="loading" animated :rows="4">
<!--                    <Echart :options="lineOptionsData" :height="350" />-->
                </ElSkeleton>
            </ElCard>
        </ElCol>
    </ElRow>
</template>
<script setup lang="ts">
import { ref } from "vue";

const loading = ref(true)

</script>
