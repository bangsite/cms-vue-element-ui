<template>
  <div class="flex flex-col items-center justify-center h-full">
    <NoPermissionSvg v-if="+exception === 403" name="403" class="max-h-96" />
    <NotFoundSvg v-if="+exception === 404" name="404" class="max-h-96" />
    <NetworkError v-if="+exception === 500" name="500" class="max-h-96" />

    <div class="mb-20">
      {{ $t(`EXCEPTION.${errorMessage}.MESSAGE`) }}
    </div>

    <el-button type="primary" @click="goBackHome">
      {{ $t("COMMON.ACTIONS.BACK_HOME") }}
    </el-button>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import router from "@/router";

import NoPermissionSvg from "@/components/svgs/NoPermissionSvg.vue";
import NotFoundSvg from "@/components/svgs/NotFoundSvg.vue";
import NetworkError from "@/components/svgs/NetworkError.vue";
import { ExceptionKeys } from "@/enums/exception";

const props = defineProps({
  exception: {
    type: Number,
    default: 404,
  },
});

const errorMessage = computed(() => {
  switch (props.exception) {
    case 403:
      return ExceptionKeys.FORBIDDEN_ERROR;
    case 404:
      return ExceptionKeys.NOT_FOUND_ERROR;
    case 500:
      return ExceptionKeys.INTERNAL_SERVER_ERROR;
    default:
      return ExceptionKeys.NETWORK_ERROR;
  }
});

const goBackHome = () => {
  router.push("/");
};
</script>
<style scoped lang="scss"></style>
