<template>
  <a-form-item
    :label="labelDisplay ? label : ' '"
    :help="
      errorMessage
        ? $t(errorMessage, {
            field: label,
            max: rulesAttrMessage?.max,
            min: rulesAttrMessage?.min,
            special: ';<=>/[\\]{|}￥',
            special_half: '()[\\]{|}',
          })
        : errorMessage
    "
    :validate-status="errorMessage ? 'error' : undefined"
    :required="rules.includes('required')"
    :class="{ 'no-label': !labelDisplay }"
  >
    <!--Field-->
    <ckeditor
      :id="name"
      :editor="customBuildEditor"
      :config="editorConfig"
      :disabled="disabled"
      v-bind="attrs"
      v-model="value"
      @input="handleChange"
    />

    <span class="note" v-if="attrs.note">{{ attrs.note }}</span>
  </a-form-item>
</template>

<script setup>
import { toRef, useAttrs, reactive } from "vue";
import { useField } from "vee-validate";

import { customBuildEditor } from "@/plugins/ckeditor";

const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, default: "" },
  labelDisplay: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  rules: { type: [String, Object], default: "" },
  rulesAttrMessage: {
    type: [Object],
    default: () => {},
  },
});

const name = toRef(props, "name");
const rules = toRef(props, "rules");
const attrs = useAttrs();

const editorConfig = reactive({
  toolbar: {
    items: ["heading", "|", "bold", "italic", "|", "sourceEditing"],
  },
  language: "ja",
});

const { value, errorMessage, handleChange } = useField(name, rules);
</script>
<style>
.ck .ck-sticky-panel .ck-sticky-panel__content_sticky {
  position: static !important;
}
</style>
