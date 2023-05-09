<template>
  <div class="header">
    <div class="header__left">
      <IconMenuBarRight v-if="collapsed" class="trigger" @click="triggerMenu" />
      <IconMenuBarLeft v-else class="trigger" @click="triggerMenu" />
    </div>
    <div class="header__right">
      <TheLanguage />
      <TheSetting />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import IconMenuBarLeft from "@/components/icons/IconMenuBarLeft.vue";
import IconMenuBarRight from "@/components/icons/IconMenuBarRight.vue";
import TheLanguage from "./TheLanguage.vue";
import TheSetting from "./TheSetting.vue";

// export interface Props {
//   collapsed?: boolean;
// }

// const props = withDefaults(defineProps<Props>(), {
//   collapsed: false,
// });
const collapsed = ref<boolean>(false);

const emits = defineEmits(["onMenuCollapsed"]);

const triggerMenu = () => {
  collapsed.value = !collapsed.value;
  emits("onMenuCollapsed", collapsed.value);
};
</script>
