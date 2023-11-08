<template>
  <el-menu
    :collapse="isCollapse"
    :default-active="activeIndex"
    :unique-opened="true"
    active-text-color="#409eff"
    border-right="none"
    @open="handleOpen"
    @select="handleSelect"
  >
    <template v-for="(item, parentIdx) in filterMenu">
      <template v-if="hasOneShowingChild(item.children) === 'oneChild'">
        <el-sub-menu :key="`menu_sub_${parentIdx}`" :index="`${parentIdx}`">
          <template #title>
            <SvgIcon v-if="item.meta.icon" :icon="item.meta.icon" :size="24" class="anticon mr-5" />
            <span>{{ $t(item.meta.title) }}</span>
          </template>
          <el-menu-item
            v-for="(childOne, index) in item.children"
            :key="`menu_sub_${parentIdx}_${index}`"
            :index="`${parentIdx}_${index}`"
          >
            <router-link :to="fullPath(childOne, item.path)" class="flex align-center">
              <SvgIcon v-if="childOne.meta.icon" :icon="childOne.meta.icon" :size="24" class="mr-5" />
              {{ $t(childOne.meta.title) }}
            </router-link>
          </el-menu-item>
        </el-sub-menu>
      </template>
      <template v-else-if="hasOneShowingChild(item.children) === 'moreChild'">
        <el-sub-menu :key="`menu_sub_${parentIdx}`" :index="`${parentIdx}`">
          <template #title>
            <SvgIcon v-if="item.meta.icon" :icon="item.meta.icon" :size="24" class="anticon mr-5" />

            <span>{{ $t(item.meta.title) }}</span>
          </template>

          <el-menu-item
            v-for="(childOne, index) in item.children"
            :key="`menu_sub_${parentIdx}_${index}`"
            :index="`${parentIdx}_${index}`"
          >
            <router-link :to="fullPath(childOne, item.path)" class="flex align-center">
              <SvgIcon v-if="childOne.meta.icon" :icon="childOne.meta.icon" :size="24" class="mr-5" />
              {{ $t(childOne.meta.title) }}
            </router-link>
          </el-menu-item>
        </el-sub-menu>
      </template>

      <template v-else>
        <el-menu-item :key="`menu_${parentIdx}`" :index="`${parentIdx}`">
          <router-link :to="fullPath(item)">{{ $t(item.meta.title) }}</router-link>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>
<script lang="ts" setup>
import { computed, onMounted, type PropType, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "@/stores/app.store";
import { fullPath, hasOneShowingChild } from "@/helpers/menu.helper";
import SvgIcon from "@/components/common/SvgIcon.vue";

import { useFilterMenu } from "@/hooks/web/useRenderMenuItem";

const props = defineProps({
  menuSelect: {
    type: Function as PropType<(index: string) => void>,
    default: undefined,
  },
});

const route = useRoute();
const appStore = useAppStore();
const { currentRoute, options } = useRouter();
const activeIndex = ref("0");

const layout = computed(() => appStore.getLayout);
const isCollapse = computed(() => appStore.getCollapse);

const routers = computed(() => (layout.value === "default" ? options.routes : []));
console.log(routers);
const filterMenu = computed(() => useFilterMenu(routers.value));
console.log(filterMenu);

onMounted(() => {
  // selectedKeys.value = ["menu_sub_0_0"];
  // openKeys.value = ["menu_sub_0"];
});

const handleSelect = (event: string) => {
  activeIndex.value = event;
  console.log("handleSelect", event);
};

const handleOpen = (key: string, keyPath: string[]) => {
  console.log("handleOpen", key);
  console.log("handleOpen", keyPath);
};
</script>
