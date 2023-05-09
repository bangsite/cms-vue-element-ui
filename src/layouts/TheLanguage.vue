<template>
  <div class="locale">
    <a-select class="locale__select" v-model:value="$i18n.locale" @change="handleChangeLanguage">
      <a-select-option
        class="locale__item"
        v-for="locale in $i18n.availableLocales"
        :key="`locale-${locale}`"
        :value="locale"
      >
        {{ LANG_ENUM[locale] }}
      </a-select-option>
    </a-select>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { localize, setLocale } from "@vee-validate/i18n";
import { LANG_ENUM } from "@/core/enums/locale.enum";

const i18n = useI18n();

const handleChangeLanguage = (locale: string) => {
  i18n.locale.value = locale;

  setLocale(locale);
  localize(locale);
};
</script>
