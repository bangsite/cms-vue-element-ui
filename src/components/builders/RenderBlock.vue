<template>
  <TransitionGroup name="slide" tag="div">
    <el-card shadow="hover" v-for="(block, idx) in data" :key="block.key" class="block mb-10">
      <el-row :gutter="10" justify="space-between" align="middle">
        <el-col :span="18">
          <el-row justify="start" align="middle">
            <!--btn drag-->
            <el-button type="primary" @click="dragBlock(+idx)" class="btn-up mr-20" link>
              <SvgIcon :icon="'carbon:drag-vertical'" :size="26" />
            </el-button>
            <h3>{{ block.value?.block_title }}</h3>
          </el-row>
        </el-col>

        <el-col :span="4">
          <el-row justify="end" align="middle">
            <!--btn edit-->
            <el-button type="primary" @click="editBlock(block, +idx)" class="btn-edit" link>
              <SvgIcon :icon="'circum:edit'" :size="26" />
            </el-button>

            <!--btn remove-->
            <el-button @click="removeBlock(+idx)" class="btn-close" link type="danger">
              <SvgIcon :icon="'material-symbols:delete-outline'" :size="26" />
            </el-button>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { useDialogStore } from "@/stores/dialog.store";
import SvgIcon from "@/components/common/SvgIcon.vue";

const props = defineProps({
  data: {
    type: [Object, Array],
  },
  label: {
    type: [String],
  },
  currentIndex: {
    type: [Number, String],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const { setTitle, setLayoutName, setActive, setDataRender } = useDialogStore();

const dragBlock = (index: number) => {
  console.log(index);
};
const editBlock = (data: Record<string, any>, index: number) => {
  setActive(true);
  setTitle(`Edit ${data.value.block_title}`);
  setLayoutName(data.value.block_type);
  setDataRender(data);
  console.log(index);
};

const removeBlock = (index: number) => {
  console.log(index);
};
</script>

<style scoped></style>
