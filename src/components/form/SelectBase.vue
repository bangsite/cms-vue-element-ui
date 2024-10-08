<template>
  <el-form-item
    :label="label"
    :error="errorMessage ? $t(errorMessage, { field: label }) : errorMessage"
    :validate-status="errorMessage ? 'error' : undefined"
    :required="rules.includes('required')"
  >
    <!--Field-->
    <el-select
      v-model="value"
      :id="name"
      :show-search="showSearch"
      :filter-option="filterOption"
      :allow-clear="allowClear"
      :placeholder="placeholder"
      @change="handleChange"
      @search="handleSearch"
    >
      <el-option v-for="(item, index) in attrs.options" :key="item?.id + index" :value="item?.id" :label="item.name">
        <template #label="{ value }">
          <span v-if="te(item?.name)">{{ $t(value) }}</span>
          <span v-else>{{ value }}</span>
        </template>
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script setup lang="ts">
import { toRef, useAttrs } from "vue";
import { useField } from "vee-validate";
import { useI18n } from "vue-i18n";

const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, default: "" },
  labelDisplay: { type: Boolean, default: true },
  placeholder: { type: String, default: "Select a item" },
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

const handleSearch = (values: string | number) => {
  emit("onSearch", { value: values });
};
</script>
