<template>
    <ElBreadcrumb separator="/" class="breadcrumb" v-if="breadcrumbList && breadcrumbList.length">
        <TransitionGroup appear enter-active-class="animate animate__fadeInRight">
            <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.name">
                {{ item.meta.title }}
            </el-breadcrumb-item>
        </TransitionGroup>
    </ElBreadcrumb>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { RouteLocationNormalizedLoaded, useRouter } from "vue-router";

import { filter, treeToList } from "@/shared/helpers/tree.helper";
import { filterBreadcrumb } from "@/shared/helpers/breadcrumb.helper";
import { usePermissionStore } from "@/core/stores/modules/permission.store";

const { currentRoute } = useRouter();
const permissionStore = usePermissionStore();

const levelList = ref<AppRouteRecordRaw[]>([]);
const breadcrumbList = treeToList<AppRouteRecordRaw[]>(levelList.value);
console.log(breadcrumbList);
const menuRouters = computed(() => {
    const routers = permissionStore.getRouters;
    return filterBreadcrumb(routers);
});

const getBreadcrumb = () => {
    const currentPath = currentRoute.value.matched.slice(-1)[0].path;
    levelList.value = filter<AppRouteRecordRaw>(menuRouters.value, (node: AppRouteRecordRaw) => {
        return node.path === currentPath;
    });
};

watch(
    () => currentRoute.value,
    (route: RouteLocationNormalizedLoaded) => {
        if (route.path.startsWith("/redirect/")) {
            return;
        }
        getBreadcrumb();
    },
    {
        immediate: true
    }
);
</script>
<style lang="scss" scoped>
.breadcrumb{
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 1;
    margin-left: 10px;
    height: 100%;

    &__item{
        display: flex;
        align-items: center;
        color: #454545;
    }
}
</style>
