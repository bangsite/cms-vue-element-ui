<template>
  <div class="flex flex-col items-center justify-center h-full">
    <NoPermissionSvg v-if="+exception === 403" name="403" class="max-h-96" />
    <NotFoundSvg v-if="+exception === 404" name="404" class="max-h-96" />
    <NetworkError v-if="+exception === 500" name="500" class="max-h-96" />

    <div class="mb-20">
      {{ $t(`EXCEPTION.${exception}`) }}
    </div>

    <el-button type="primary" @click="goBackHome">
      {{ $t("COMMON.ACTIONS.BACK_HOME") }}
    </el-button>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

import NoPermissionSvg from "@/components/svgs/NoPermissionSvg.vue";
import NotFoundSvg from "@/components/svgs/NotFoundSvg.vue";
import NetworkError from "@/components/svgs/NetworkError.vue";

defineProps({
  exception: {
    type: Number,
    default: 404,
  },
});

const router = useRouter();

const goBackHome = () => {
  router.push("/");
};
</script>
<style scoped lang="scss"></style>
