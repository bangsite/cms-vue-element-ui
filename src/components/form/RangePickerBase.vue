<template>
  <el-form-item
    :label="label"
    :help="errorMessage ? $t(errorMessage, { field: label }) : errorMessage"
    :validate-status="errorMessage ? 'error' : undefined"
    :required="rules.includes('required')"
  >
    <!--Field-->
    <el-range-picker
      style="width: 100%"
      :value="value"
      :id="name"
      :show-time="showTime"
      :format="format"
      v-bind="attrs"
      :getPopupContainer="(trigger: any) => trigger.parentElement"
      @calendarChange="handleChangeCustom"
    />
  </el-form-item>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { toRef, useAttrs } from "vue";

const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, default: "" },
  showTime: { type: [Object, Boolean], default: false },
  format: { type: String, default: "YYYY-MM-DD" },
  labelDisplay: { type: Boolean, default: true },
  rules: { type: [String, Object], default: "" },
});

const name = toRef(props, "name");
const rules = toRef(props, "rules");
const attrs = useAttrs();

const { value, errorMessage, handleChange, resetField } = useField(name, rules);

const handleChangeCustom = (dates: any) => {
  handleChange(dates, true);

  if (!dates) {
    resetField();
  }
};
</script>
