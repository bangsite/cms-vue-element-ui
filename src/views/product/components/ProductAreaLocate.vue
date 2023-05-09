<template>
  <div class="area__locate">
    <div class="area__locate-list">
      <a-card class="area__locate-item" :title="`XYZ-${idx + 1}`" v-for="(item, idx) in variantAreaLocate" :key="idx">
        <template #extra>
          <div class="btn-group">
            <button type="button" @click="handleRemoveItem(idx)" class="btn-close">
              <IconClose />
            </button>
          </div>
        </template>
        <!-- Area Coordinates -->
        <div class="area__coordinates">
          <!-- Area Coordinates X -->
          <div class="area__coordinates-x">
            <div class="lbl"><h4>X</h4></div>

            <InputBase name="x" :value="item.x" />
          </div>
          <!-- Area Coordinates Y -->
          <div class="area__coordinates-y">
            <div class="lbl"><h4>Y</h4></div>

            <InputBase name="y" :value="item.y" />
          </div>
        </div>

        <!-- Area Size -->
        <div class="area__size">
          <!-- Area Size Width -->
          <div class="area__size-w">
            <div class="lbl"><h4>W</h4></div>

            <InputBase name="w" :value="item.w" />
          </div>
          <!-- Area Size Height -->
          <div class="area__size-h">
            <div class="lbl"><h4>H</h4></div>
            <InputBase name="h" />
          </div>
        </div>
      </a-card>
    </div>
    <div class="area__locate-action">
      <a-button type="primary" class="btn-add" @click="addPositions">
        <IconPlus />
        {{ $t("COMMON.BTN_ADD") }}
      </a-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";

import type { Area } from "@/core/interfaces/area";
import InputBase from "@/components/form/InputBase.vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import IconClose from "@/components/icons/IconClose.vue";

const props = defineProps({
  data: { type: Array, required: true },
});

const variantAreaLocate = computed(() => props.data);
console.log(variantAreaLocate);

const handleRemoveItem = (idx: number) => {
  console.log(idx);
};

const addPositions = () => {};
</script>
<style></style>
