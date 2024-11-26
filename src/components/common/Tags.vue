<template>
  <div class="flex p-4 bg-white w-full rounded-md">
    <el-collapse accordion v-model="activeKey" class="w-full">
      <el-collapse-item name="1">
        <template #title><h4>Tags</h4></template>

        <div class="flex flex-wrap gap-1">
          <template v-for="tag in dataTags" :key="tag">
            <el-button plain class="border-dashed !ml-1">{{ tag.name }}</el-button>
          </template>
        </div>
        <el-divider border-style="dashed" class="my-4" />
        <div class="flex flex-col">
          <div class="flex gap-1">
            <el-input name="tags" v-model="dataInput" placeholder="Please enter input" @input="handleInput" />
            <el-button type="primary" class="flex justify-self-end" @click="handleAddTags">Add</el-button>
          </div>

          <span v-if="errorMessage" class="text-red-600">{{ errorMessage }}</span>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script setup lang="ts">
import { ref, toRef } from "vue";
import { useField } from "vee-validate";
import { v4 as uuidv4 } from "uuid";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: "",
  },
});

const name = toRef(props, "name");
const data = toRef(props, "data");
const rules = toRef(props, "rules");

const activeKey = ref(["1"]);
const dataTags = ref([...data.value]);
const dataInput = ref("");
const errorMessage = ref("");

const { value, handleChange } = useField(name, rules, {
  validateOnValueUpdate: false,
  initialValue: dataTags.value?.map((item) => item.id),
});
const handleAddTags = () => {
  if (dataInput.value) {
    // call api add tags
    let exitsTag = dataTags.value?.filter((item) => item.name === dataInput.value);

    if (exitsTag && exitsTag.length > 0) {
      errorMessage.value = "Tag exists";
      dataInput.value = "";
    } else {
      const newTag = { id: uuidv4(), name: dataInput.value };

      dataTags.value.push(newTag);
      value.value.push(newTag.id);
      dataInput.value = "";
    }
  }
};

const handleInput = (val) => {
  if (val) errorMessage.value = "";
};
</script>

<style scoped lang="scss"></style>
