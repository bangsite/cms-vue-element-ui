<template>
  <a-form-item
    :label="labelDisplay ? label : ' '"
    :help="errorMessage"
    :validate-status="errorMessage ? 'error' : undefined"
    :required="rules.includes('required')"
    :class="{ 'no-label': !labelDisplay }"
  >
    <!--Field-->
    <a-textarea
      autocomplete="new-password"
      :value="value"
      :id="name"
      :rows="rows"
      v-bind="attrs"
      :disabled="disabled"
      @input="handleChange"
    />

    <span class="note" v-if="attrs.note">{{ attrs.note }}</span>
  </a-form-item>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { toRef, useAttrs } from "vue";
import textAreaProps from "ant-design-vue/es/input/inputProps";

const props = defineProps({
    label: { type: String, default: "" },
    labelDisplay: { type: Boolean, default: true },
    //   disabled: { type: Boolean, default: false },
    rules: { type: [String, Object], default: "" },
    rulesAttrMessage: {
        type: [Object],
        default: () => {},
    },
    ...textAreaProps(),
    name: { type: String, required: true },
    rows: { type: Number },
});

const name = toRef(props, "name");
const rules = toRef(props, "rules");
const attrs = useAttrs();

const { value, errorMessage, handleChange } = useField(name, rules);
</script>
