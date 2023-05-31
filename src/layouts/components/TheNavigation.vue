<template>
  <div class="nav">
    <ElMenu
      class="nav__menu"
      :onSelect="menuSelect"
      :collapse="layout === 'top' || layout === 'cutMenu' ? false : collapse"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon>
            <location />
          </el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>

      <el-menu-item index="2">
        <template #title>Navigator Two</template>
      </el-menu-item>
    </ElMenu>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import type { PropType } from "vue";

import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "@/core/stores/modules/app.store";

import { Location } from "@element-plus/icons-vue";
import { isUrl } from "@/shared/utils/isCheck";

const route = useRoute();
const { push } = useRouter();

const appStore = useAppStore();

const layout = computed(() => appStore.getLayout);
const collapse = computed(() => appStore.getCollapse);

const props = defineProps({
  menuSelect: {
    type: Function as PropType<(index: string) => void>,
    default: undefined,
  },
});

const subIsActive = (id: string | number) => {
  let paths = [];

  const parentMenu: Record<string, any> = {
    order: ["/order"],
    product: ["/product"],
  };

  if (id) paths = parentMenu[id];

  if (paths)
    return paths.some((path: string) => {
      return route.path.indexOf(path) !== -1; // current path starts with this path string
    });
};
const menuSelect = (index: string) => {
  if (props.menuSelect) {
    return;
  }
  if (isUrl(index)) {
    window.open(index);
  } else {
    push(index);
  }
};
</script>
