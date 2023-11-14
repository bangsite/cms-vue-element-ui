<template>
  <el-row :gutter="15" justify="center" align="middle">
    <el-col :span="12" class="flex justify-center align-center">
      <div class="flex flex-col justify-center align-center" style="max-height: 40rem">
        <NoPermissionSvg v-if="+exception === 403" name="403" />
        <NotFoundSvg v-if="+exception === 404" name="404" />
        <NetworkError v-if="+exception === 500" name="500" />

        <div class="mb-20">
          {{ $t(`EXCEPTION.${exception}`) }}
        </div>

        <el-button type="primary" @click="goBackHome">
          {{ $t("COMMON.BTN_BACK_HOME") }}
        </el-button>
      </div>
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import router from "@/router";

import NoPermissionSvg from "@/components/svgs/NoPermissionSvg.vue";
import NotFoundSvg from "@/components/svgs/NotFoundSvg.vue";
import NetworkError from "@/components/svgs/NetworkError.vue";

defineProps({
  exception: {
    type: Number,
    default: 404,
  },
});

const goBackHome = () => {
  router.push("/");
};
</script>
<style scoped lang="scss"></style>
