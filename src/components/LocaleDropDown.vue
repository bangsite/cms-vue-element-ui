<template>
    <ElDropdown :class="{prefixCls}" trigger="click" @command="setLang">
        <Icon
            :size="18"
            icon="ion:language-sharp"
            class="cursor-pointer"
            :class="$attrs.class"
            :color="color"
        />
        <template #dropdown>
            <ElDropdownMenu>
                <ElDropdownItem v-for="item in langMap" :key="item.lang" :command="item.lang">
                    {{ item.name }}
                </ElDropdownItem>
            </ElDropdownMenu>
        </template>
    </ElDropdown>
</template>

<script setup lang="ts">
import { computed, unref } from "vue";

import { useDesign } from "@/hooks/web/useDesign";
import { useLocale } from "@/hooks/web/useLocale";
import { useLocaleStore } from "@/core/stores/modules/locale.store";

import { propTypes } from "@/shared/utils/propTypes";

import Icon from "@/components/IconCommon.vue";

const localeStore = useLocaleStore();
const { getPrefixCls } = useDesign();
const prefixCls = getPrefixCls('locale-dropdown')

defineProps({
    color: propTypes.string.def("")
});

const langMap = computed(() => localeStore.getLocaleMap);
const currentLang = computed(() => localeStore.getCurrentLocale);
const setLang = (lang: LocaleType) => {
    if (lang === unref(currentLang).lang) return;
    // Need to reload the page to initialize the whole language
    window.location.reload();
    localeStore.setCurrentLocale({ lang });

    const { changeLocale } = useLocale();
    changeLocale(lang);
};
</script>
