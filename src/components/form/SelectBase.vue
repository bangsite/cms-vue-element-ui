<template>
  <a-form-item
    :label="label"
    :help="errorMessage ? $t(errorMessage, { field: label }) : errorMessage"
    :validate-status="errorMessage ? 'error' : undefined"
    :required="rules.includes('required')"
  >
    <!--Field-->
    <a-select
      :value="value"
      :id="name"
      :show-search="showSearch"
      :filter-option="filterOption"
      :allow-clear="allowClear"
      :getPopupContainer="(trigger) => trigger.parentElement"
      @change="handleChange"
      @search="handleSearch"
    >
      <a-select-option v-for="(item, index) in attrs.options" :key="item.id + index" :value="item.id">
        <span v-if="te(item.name)">{{ $t(item.name) }}</span>
        <span v-else>{{ item?.name }}</span>
      </a-select-option>
    </a-select>
  </a-form-item>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { toRef, useAttrs } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
    name: { type: String, required: true },
    label: { type: String, default: "" },
    labelDisplay: { type: Boolean, default: true },
    showSearch: { type: Boolean, default: false },
    filterOption: { type: Boolean, default: false },
    allowClear: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    rules: { type: [String, Object], default: "" },
});

const emit = defineEmits(["onSearch"]);

const { te } = useI18n();
const attrs = useAttrs();

const name = toRef(props, "name");
const rules = toRef(props, "rules");

const { value, errorMessage, handleChange } = useField(name, rules);

const handleSearch = (values) => {
    emit("onSearch", { value: values });
};
</script>
