<template>
  <el-form-item
    :label="label"
    :error="errorMessage"
    :validate-status="errorMessage ? 'error' : undefined"
    :required="rules.includes('required')"
  >
    <!--Field-->
    <el-input
      v-bind="attrs"
      v-model="value"
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
    </el-input>
    <span class="note" v-if="attrs.note">{{ attrs.note }}</span>
  </el-form-item>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { toRef, useAttrs } from "vue";
import { inputProps } from "element-plus";

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

const { value, errorMessage, handleChange } = useField(name, rules, {
  validateOnValueUpdate: false,
});
</script>
<style lang="scss"></style>
