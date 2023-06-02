<template>
  <ElDialog
    title="Tips"
    width="30%"
    v-model:show="show"
    :segmented="{ footer: 'soft' }"
    :closable="false"
    class="fixed left-0 right-0"
    :class="[isMobile ? 'wh-full top-0px rounded-0' : 'w-630px top-50px']"
    @after-leave="handleClose"
  >
    <span>It's a draggable Dialog</span>
    <div class="mt-20px">
      <n-empty v-if="resultOptions.length === 0" description="暂无搜索结果" />
      <search-result v-else v-model:value="activePath" :options="resultOptions" @enter="handleEnter" />
    </div>

    <template #footer>
      <search-footer v-if="!isMobile" />
      <span class="dialog-footer">
        <el-button @click="show = false">Cancel</el-button>
        <el-button type="primary" @click="show = false"> Confirm </el-button>
      </span>
    </template>
  </ElDialog>
</template>
<script setup lang="ts">
import { computed, nextTick, ref, shallowRef, watch } from "vue";
import { useRouter } from "vue-router";

import { onKeyStroke, useDebounceFn } from "@vueuse/core";

interface Modal {
  value: boolean;
}
const props = defineProps<Modal>();

const emit = defineEmits<Emits>();

const router = useRouter();
const routeStore = useRouteStore();
const keyword = ref("");
const activePath = ref("");
const dialogVisible = ref(false);

const show = computed({
  get() {
    return props.value;
  },
  set(val: boolean) {
    emit("update:value", val);
  },
});

function search() {
  resultOptions.value = routeStore.searchMenus.filter(
    (menu) => keyword.value && menu.meta?.title.toLocaleLowerCase().includes(keyword.value.toLocaleLowerCase().trim())
  );
  if (resultOptions.value?.length > 0) {
    activePath.value = resultOptions.value[0].path;
  } else {
    activePath.value = "";
  }
}

function handleClose() {
  show.value = false;
  /** Delay processing to prevent users from seeing certain operations */
  setTimeout(() => {
    resultOptions.value = [];
    keyword.value = "";
  }, 200);
}

/** key up */
function handleUp() {
  const { length } = resultOptions.value;
  if (length === 0) return;
  const index = resultOptions.value.findIndex((item) => item.path === activePath.value);
  if (index === 0) {
    activePath.value = resultOptions.value[length - 1].path;
  } else {
    activePath.value = resultOptions.value[index - 1].path;
  }
}

/** key down */
function handleDown() {
  const { length } = resultOptions.value;
  if (length === 0) return;
  const index = resultOptions.value.findIndex((item) => item.path === activePath.value);
  if (index + 1 === length) {
    activePath.value = resultOptions.value[0].path;
  } else {
    activePath.value = resultOptions.value[index + 1].path;
  }
}

/** key enter */
function handleEnter() {
  const { length } = resultOptions.value;
  if (length === 0 || activePath.value === "") return;
  const routeItem = resultOptions.value.find((item) => item.path === activePath.value);
  if (routeItem?.meta?.href) {
    window.open(activePath.value, "__blank");
  } else {
    router.push(activePath.value);
    handleClose();
  }
}

onKeyStroke("Escape", handleClose);
onKeyStroke("Enter", handleEnter);
onKeyStroke("ArrowUp", handleUp);
onKeyStroke("ArrowDown", handleDown);
watch(show, async (val) => {
  if (val) {
    /** Auto focus */
    await nextTick();
    inputRef.value?.focus();
  }
});
</script>
