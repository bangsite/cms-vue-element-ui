<template>
  <div
    id="{prefixCls}"
    :class="[
      `${prefixCls} ${prefixCls}__${unref(menuMode)}`,
      'h-[100%] overflow-hidden flex-col bg-[var(--left-menu-bg-color)]',
      {
        'w-[var(--left-menu-min-width)]': unref(collapse) && unref(layout) !== 'cutMenu',
        'w-[var(--left-menu-max-width)]': !unref(collapse) && unref(layout) !== 'cutMenu',
      },
    ]"
  >
    <template v-if="layout === 'top'">
      <ElMenu
        :defaultActive="activeMenu"
        :mode="menuMode"
        :collapse="layout === 'top' || unref(layout) === 'cutMenu' ? false : unref(collapse)"
        :uniqueOpened="layout === 'top' ? false : unref(uniqueOpened)"
        backgroundColor="var(--left-menu-bg-color)"
        textColor="var(--left-menu-text-color)"
        activeTextColor="var(--left-menu-text-active-color)"
        :onSelect="menuSelect"
      >
        Test
      </ElMenu>
    </template>
    <template v-else>
      <ElScrollbar>
        <ElMenu
          :defaultActive="activeMenu"
          :mode="menuMode"
          :collapse="layout === 'top' || unref(layout) === 'cutMenu' ? false : unref(collapse)"
          :uniqueOpened="layout === 'top' ? false : unref(uniqueOpened)"
          backgroundColor="var(--left-menu-bg-color)"
          textColor="var(--left-menu-text-color)"
          activeTextColor="var(--left-menu-text-active-color)"
          :onSelect="menuSelect"
        >
          Test
        </ElMenu>
      </ElScrollbar>
    </template>
  </div>
</template>
<script setup lang="ts">
import { computed, unref, PropType } from "vue";
import { useRouter } from "vue-router";

import { useAppStore } from "@/core/stores/modules/app.store";

import { useDesign } from "@/hooks/web/useDesign";
import { LayoutType } from "@/types/layout";
import { isUrl } from "@/shared/utils/isCheck";

const { push, currentRoute } = useRouter();
const appStore = useAppStore();

const { getPrefixCls } = useDesign();
const prefixCls = getPrefixCls("menu");

const props = defineProps({
  menuSelect: {
    type: Function as PropType<(index: string) => void>,
    default: undefined,
  },
});

const layout = computed(() => appStore.getLayout);

const menuMode = computed((): "vertical" | "horizontal" => {
  const vertical: LayoutType[] = ["classic", "topLeft", "cutMenu"];

  if (vertical.includes(unref(layout))) {
    return "vertical";
  } else {
    return "horizontal";
  }
});

const collapse = computed(() => appStore.getCollapse);

const uniqueOpened = computed(() => appStore.getUniqueOpened);

const activeMenu = computed(() => {
  const { meta, path } = unref(currentRoute);
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu as string;
  }
  return path;
});

const menuSelect = (index: string) => {
  if (props.menuSelect) {
    props.menuSelect(index);
  }
  if (isUrl(index)) {
    window.open(index);
  } else {
    push(index);
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/settings/_variable.module.scss";

$prefix-cls: "#{$namespace}-layout";

.is-active--after {
  position: absolute;
  top: 0;
  right: 0;
  width: 4px;
  height: 100%;
  background-color: var(--el-color-primary);
  content: "";
}

.#{$prefix-cls} {
  position: relative;
  transition: width var(--transition-time-02);

  &:after {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    border-left: 1px solid var(--left-menu-border-color);
    content: "";
  }

  :deep(.#{$elNamespace}-menu) {
    width: 100% !important;
    border-right: none;

    // Set the color of the subtitle when selected
    .is-active {
      & > .#{$elNamespace}-sub-menu__title {
        color: var(--left-menu-text-active-color) !important;
      }
    }

    // Set the highlight and background color of the submenu hover
    .#{$elNamespace}-sub-menu__title,
    .#{$elNamespace}-menu-item {
      &:hover {
        color: var(--left-menu-text-active-color) !important;
        background-color: var(--left-menu-bg-color) !important;
      }
    }

    // Set the highlighted background and highlighted color when selected
    .#{$elNamespace}-sub-menu.is-active,
    .#{$elNamespace}-menu-item.is-active {
      color: var(--left-menu-text-active-color) !important;
      background-color: var(--left-menu-bg-active-color) !important;

      &:hover {
        background-color: var(--left-menu-bg-active-color) !important;
      }
    }

    .#{$elNamespace}-menu-item.is-active {
      position: relative;
    }

    // Set the background color of the submenu
    .#{$elNamespace}-menu {
      .#{$elNamespace}-sub-menu__title,
      .#{$elNamespace}-menu-item:not(.is-active) {
        background-color: var(--left-menu-bg-light-color) !important;
      }
    }
  }

  // Minimum width when collapsed
  :deep(.#{$elNamespace}-menu--collapse) {
    width: var(--left-menu-min-width);

    & > .is-active,
    & > .is-active > .#{$elNamespace}-sub-menu__title {
      position: relative;
      background-color: var(--left-menu-collapse-bg-active-color) !important;
      &:after {
      }
    }
  }

  // When folding the animation, you need to hide the text
  :deep(.horizontal-collapse-transition) {
    // transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out !important;
    .#{$prefix-cls}__title {
      display: none;
    }
  }

  // horizontal menu
  &__horizontal {
    height: calc(var(--top-tool-height)) !important;

    :deep(.#{$elNamespace}-menu--horizontal) {
      height: calc(var(--top-tool-height));
      border-bottom: none;
      // Reset the bottom highlight color
      & > .#{$elNamespace}-sub-menu.is-active {
        .#{$elNamespace}-sub-menu__title {
          border-bottom-color: var(--el-color-primary) !important;
        }
      }

      .#{$elNamespace}-menu-item.is-active {
        position: relative;

        &:after {
          display: none !important;
        }
      }

      .#{$prefix-cls}__title {
        /* stylelint-disable-next-line */
        max-height: calc(var(--top-tool-height) - 2px) !important;
        /* stylelint-disable-next-line */
        line-height: calc(var(--top-tool-height) - 2px);
      }
    }
  }
}
</style>
