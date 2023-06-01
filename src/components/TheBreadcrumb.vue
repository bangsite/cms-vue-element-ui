<template>
  <ElBreadcrumb separator="/" :class="[`${prefixCls} flex items-center h-full ml-[10px]`]">
    <TransitionGroup appear enter-active-class="animate__animated animate__fadeInRight">
      {{ renderBreadcrumb }}
      <ElBreadcrumbItem
        :to="{ path: breadcrumbMeta.disabled ? '' : breadcrumbMeta?.v?.path }"
        :key="breadcrumbMeta?.v?.name"
      >
        <template v-if="breadcrumbMeta.meta?.icon && breadcrumbIcon">
          <Icon icon="{meta.icon}" class="mr-[5px]" />
          {{ t(breadcrumbMeta?.v?.meta?.title) }}
        </template>
        <template v-else>
          {{ t(breadcrumbMeta?.v?.meta?.title) }}
        </template>
      </ElBreadcrumbItem>
    </TransitionGroup>
  </ElBreadcrumb>
</template>
<script setup lang="ts">
import { ref, computed, unref, watch } from "vue";
import { RouteLocationNormalizedLoaded, RouteMeta, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

import { useAppStore } from "@/core/stores/modules/app.store";
import { usePermissionStore } from "@/core/stores/modules/permission.store";
import { useDesign } from "@/hooks/web/useDesign";
import { filterBreadcrumb } from "@/shared/helpers/breadcrumb.helper";
import { filter, treeToList } from "@/shared/helpers/tree.helper";

import Icon from "@/components/SvgIcon.vue";

const { t } = useI18n();
const appStore = useAppStore();
const { currentRoute } = useRouter();
const { getPrefixCls } = useDesign();

const prefixCls = getPrefixCls("breadcrumb");
const levelList = ref<AppRouteRecordRaw[]>([]);
const breadcrumbMeta = ref({});
const permissionStore = usePermissionStore();

const menuRouters = computed(() => {
  const routers = permissionStore.getRouters;
  return filterBreadcrumb(routers);
});
const breadcrumbIcon = computed(() => appStore.getBreadcrumbIcon);

const getBreadcrumb = () => {
  const currentPath = currentRoute.value.matched.slice(-1)[0].path;
  levelList.value = filter<AppRouteRecordRaw>(unref(menuRouters), (node: AppRouteRecordRaw) => {
    return node.path === currentPath;
  });
};

const renderBreadcrumb = () => {
  const breadcrumbList = treeToList<AppRouteRecordRaw[]>(unref(levelList));
  return breadcrumbList.map((v) => {
    const disabled = !v.redirect || v.redirect === "noredirect";
    const meta = v.meta as RouteMeta;
    return (breadcrumbMeta.value = {
      disabled,
      meta,
      v,
    });
  });
};
console.log(renderBreadcrumb());

watch(
  () => currentRoute.value,
  (route: RouteLocationNormalizedLoaded) => {
    if (route.path.startsWith("/redirect/")) return;

    getBreadcrumb();
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/settings/_variable.module.scss";

$prefix-cls: "#{$elNamespace}-breadcrumb";

.#{$prefix-cls} {
  :deep(&__item) {
    display: flex;
    .#{$prefix-cls}__inner {
      display: flex;
      align-items: center;
      color: var(--top-header-text-color);

      &:hover {
        color: var(--el-color-primary);
      }
    }
  }

  :deep(&__item):not(:last-child) {
    .#{$prefix-cls}__inner {
      color: var(--top-header-text-color);

      &:hover {
        color: var(--el-color-primary);
      }
    }
  }

  :deep(&__item):last-child {
    .#{$prefix-cls}__inner {
      color: var(--el-text-color-placeholder);

      &:hover {
        color: var(--el-text-color-placeholder);
      }
    }
  }
}
</style>
