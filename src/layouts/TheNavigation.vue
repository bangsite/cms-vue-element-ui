<template>
  <div class="side">
    <router-link to="/" class="side__logo">
      {{ $t("COMMON.TITLE_APP") }}
    </router-link>

    <a-menu class="side__menu" mode="inline">
      <template v-for="(item, idx) in navigation" :key="'lv1-' + idx">
        <template v-if="item?.children">
          <!-- Begin Menu Sub 1 -->
          <a-sub-menu :key="'sub1' + idx" :class="[subIsActive(item?.id) && 'exact-active-link']">
            <template #icon>
              <component :is="item.icon"></component>
            </template>
            <template #title>{{ $t(item?.title) }}</template>

            <template v-for="(sub1, idxSub1) in item?.children" :key="'lv2-' + idxSub1">
              <template v-if="sub1?.children">
                <!-- Begin Menu Sub 2 -->
                <a-sub-menu :key="'sub2' + idxSub1">
                  <template #title>
                    <router-link
                      v-if="sub1?.routeName"
                      v-bind="$props"
                      custom
                      :to="{ name: sub1?.routeName }"
                      v-slot="{ navigate, isExactActive }"
                    >
                      <span @click="navigate" :class="[isExactActive && 'exact-active-link']" :key="sub1.id">
                        {{ $t(sub1?.title) }}
                      </span>
                    </router-link>

                    <span v-else>{{ $t(sub1?.title) }}</span>
                  </template>
                </a-sub-menu>
                <!-- End Menu Sub 2 -->
              </template>

              <template v-else>
                <router-link custom :to="{ name: sub1?.routeName }" v-slot="{ navigate, isExactActive }">
                  <a-menu-item @click="navigate" :class="[isExactActive && 'exact-active-link']" :key="sub1.id">
                    {{ $t(sub1?.title) }}
                  </a-menu-item>
                </router-link>
              </template>
            </template>
          </a-sub-menu>
        </template>
        <template v-else>
          <router-link custom :to="{ name: item?.routeName }" v-slot="{ navigate, isExactActive }">
            <a-menu-item @click="navigate" :class="[isExactActive && 'exact-active-link']" :key="item.id">
              <template #icon>
                <component :is="item.icon" />
              </template>
              {{ $t(item?.title) }}
            </a-menu-item>
          </router-link>
        </template>
      </template>
    </a-menu>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import navigation from "@/core/config/navigation";

const route = useRoute();

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
</script>
