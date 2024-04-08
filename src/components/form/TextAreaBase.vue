<template>
  <el-form-item
    :label="labelDisplay ? label : ' '"
    :error="errorMessage"
    :validate-status="errorMessage ? 'error' : undefined"
    :required="rules.includes('required')"
    :class="{ 'no-label': !labelDisplay }"
  >
    <!--Field-->
    <el-input
      autocomplete="new-password"
      type="textarea"
      v-model="value"
      :id="name"
      :rows="rows"
      v-bind="attrs"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="handleChange"
    />

    <span class="note" v-if="attrs.note">{{ attrs.note }}</span>
  </el-form-item>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { toRef, useAttrs } from "vue";
import { inputProps } from "element-plus";

const props = defineProps({
  labelDisplay: { type: Boolean, default: true },
  //   disabled: { type: Boolean, default: false },
  rules: { type: [String, Object], default: "" },
  rulesAttrMessage: {
    type: [Object],
    default: () => {},
  },
  ...inputProps,
  name: { type: String, required: true },
  rows: { type: Number },
});

const name = toRef(props, "name");
const rules = toRef(props, "rules");
const attrs = useAttrs();

const { value, errorMessage, handleChange } = useField(name, rules);
</script>
