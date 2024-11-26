<template>
  <div class="flex p-4 bg-white w-full rounded-md">
    <el-collapse accordion v-model="activeName" class="w-full">
      <el-collapse-item name="1">
        <template #title><h4>Category</h4></template>

        <el-tabs type="border-card" v-model:activeKey="activeTab" class="rounded-md">
          <el-tab-pane key="1" label="All">
            <el-tree
              ref="treeCategories"
              highlight-current
              show-checkbox
              node-key="id"
              :default-expanded-keys="expandedKeys"
              :data="data"
              @check="handleCheckChange"
            />
          </el-tab-pane>
          <el-tab-pane key="2" label="Most Used"></el-tab-pane>
        </el-tabs>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script setup lang="ts">
import { PropType, ref, toRef } from "vue";
import { ElTree } from "element-plus";
import type { PostTreeNode } from "@/types";
import { useField } from "vee-validate";

const props = defineProps({
  data: {
    type: Array as PropType<PostTreeNode[]>,
    default: () => [],
  },
  disabled: { type: Boolean, default: false },
  name: { type: String, default: "" },
  rules: { type: [String, Object], default: "" },
});

const name = toRef(props, "name");
const data = toRef(props, "data");
const rules = toRef(props, "rules");

const activeName = ref("1");
const activeTab = ref("1");
const expandedKeys = ref<string[]>([1, 2]);
const checkedKeys = ref<string[]>([3]);

const { value } = useField(name, rules, {
  validateOnValueUpdate: false,
});

const handleCheckChange = (data: PostTreeNode, checked: boolean) => {
  if (checked && checked.checkedKeys) {
    value.value = checked.checkedKeys;
  }
};
</script>

<style scoped lang="scss"></style>
