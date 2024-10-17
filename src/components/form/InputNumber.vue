<template>
  <el-form-item
    :label="label"
    :error="errorMessage"
    :validate-status="errorMessage ? 'error' : undefined"
    :required="rules.includes('required')"
  >
    <!--Field-->
    <el-input v-bind="attrs" v-model="value" :id="name" type="number" :disabled="disabled" :placeholder="placeholder">
      <template #prefix>
        <span>{{ currencySymbol["currency"] }}</span>
      </template>

      <!--Icon suffix-->
      <template #suffix>
        <slot name="suffix" />
      </template>
    </el-input>
    <span class="note" v-if="attrs.note">{{ attrs.note }}</span>
  </el-form-item>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { computed, toRef, useAttrs } from "vue";
import { inputProps } from "element-plus";
import { useI18n } from "vue-i18n";
import { langOptions } from "@/enums/locales.enum";

const props = defineProps({
  labelDisplay: { type: Boolean, default: true },
  rules: { type: [String, Object], default: "" },
  rulesAttrMessage: {
    type: [Object],
    default: () => {},
  },
  name: {
    type: String,
    required: true,
  },
  ...inputProps,
});

const name = toRef(props, "name");
const rules = toRef(props, "rules");
const attrs = useAttrs();
const { n, locale } = useI18n();

const { value, errorMessage } = useField(name, rules, {
  validateOnValueUpdate: false,
});

const currencySymbol = computed(() => langOptions.filter((item) => item.lang === locale.value)[0]);
// const handleChange = (data) => {
//   console.log(n(parseInt(data), "currency", locale.value));
//   return data ? n(parseInt(data), "currency", locale.value) : 0;
// };
</script>
<style lang="scss"></style>
