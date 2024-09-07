<template>
  <el-form-item
    :label="labelDisplay ? label : ' '"
    :error="
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
    <Editor
      :id="name"
      :init="init"
      v-model="value"
      @input="handleChange"
      api-key="mtcofzlrhwstpl59my0b38duawanx4r283nahsk7xcfwrh2z"
      style="width: 100%"
    />
    <span class="note" v-if="attrs.note">{{ attrs.note }}</span>
  </el-form-item>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs, watch, useAttrs, toRef } from "vue";
import { useField } from "vee-validate";

// TinyMCE-Vue
import Editor from "@tinymce/tinymce-vue";

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
  // modelValue: {
  //   type: String,
  //   default: "",
  // },
});
// const emit = defineEmits(["update:modelValue"]);

const init = reactive({
  selector: "textarea#ifram",
  plugins: ["quickbars"],
  quickbars_selection_toolbar: "bold italic | blocks | quicklink blockquote",
  height: 600,
  resize: "both",
});

const name = toRef(props, "name");
const rules = toRef(props, "rules");
const attrs = useAttrs();

const { value, errorMessage, handleChange } = useField(name, rules);
</script>

<style scoped></style>
