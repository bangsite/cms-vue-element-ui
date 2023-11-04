<template>
  <div class="flex flex-col flex-center h-full">
    <div class="flex flex-col">
      <img src="@/assets/svgs/no-permission.svg" v-if="type === '403'" alt="403" />
      <img src="@/assets/svgs/not-found.svg" v-if="type === '404'" alt="404" />
      <img src="@/assets/svgs/network-error.svg" v-if="type === '500'" alt="500" />
      <div class="mb-20">
        {{ $t(`EXCEPTION.${type}`) }}
      </div>
    </div>

    <el-button type="primary" @click="btnClick">{{ $t("COMMON.BTN_BACK_HOME") }}</el-button>
  </div>
</template>
<script setup lang="ts">
import { propTypes } from "@/utils/propTypes";
type ExceptionType = "403" | "404" | "500";

const props = defineProps({
  type: propTypes.string.validate((v: ExceptionType) => ["404", "500", "403"].includes(v)).def("404"),
});
const emit = defineEmits(["errorClick"]);

const btnClick = () => {
  emit("errorClick", props.type);
};
</script>
<style scoped lang="scss"></style>
