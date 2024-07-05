<template>
  <a-form-item
    :label="label"
    :help="errorMessage ? $t(errorMessage, { field: label }) : errorMessage"
    :validate-status="errorMessage ? 'error' : undefined"
    :required="rules.includes('required')"
  >
    <!--Field-->
    <a-radio-group :value="value" :id="name" :disabled="attrs.disabled" @change="handleChangeStatus">
      <a-radio v-for="item in attrs.options" :key="item.label" :value="item.value">
        {{ $t(item.label) }}
      </a-radio>
    </a-radio-group>
  </a-form-item>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { toRef, useAttrs } from "vue";

const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, default: "" },
  labelDisplay: { type: Boolean, default: true },
  rules: { type: [String, Object], default: "" },
});

const name = toRef(props, "name");
const rules = toRef(props, "rules");
const attrs = useAttrs();

const { value, errorMessage, setValue } = useField(name, rules);

const handleChangeStatus = (event: any) => {
  if (event?.target?.value) setValue(event.target.value);
};
</script>
