<template>
  <AFormItem
    :label="label"
    :help="errorMessage"
    :validate-status="errorMessage ? 'error' : undefined"
    :required="rules.includes('required')"
  >
    <!--Field-->
    <AInput
      v-bind="attrs"
      v-model="value"
      :show-password="true"
      autocomplete="new-password"
      :id="name"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="handleChange"
    >
      <!--Icon prefix-->
      <template #prefix>
        <slot name="prefix" />
      </template>

      <!--Icon suffix-->
      <template #suffix>
        <slot name="suffix" />
      </template>
    </AInput>
    <span class="note" v-if="attrs.note">{{ attrs.note }}</span>
  </AFormItem>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { toRef, useAttrs } from "vue";
import { inputProps } from "element-plus";

const props = defineProps({
  label: { type: String, default: "" },
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
  ...inputProps(),
});

const name = toRef(props, "name");
const rules = toRef(props, "rules");
const attrs = useAttrs();

const { value, errorMessage, handleChange } = useField(name, rules, {
  validateOnValueUpdate: false,
});
</script>
<style lang="scss"></style>
