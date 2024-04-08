<template>
  <el-row :gutter="16">
    <el-col :lg="8" :md="24">
      <el-card :bordered="false" class="mb-20px" title="Timeline">
        <el-timeline>
          <el-timeline-item v-for="(item, index) in timelinesData" :key="index" :color="item.type">
            <h4>{{ item.title }}</h4>
            <span>{{ item.content }}</span>
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </el-col>
    <el-col :lg="16" :md="24">
      <el-card title="Table" :bordered="false" class="mb-20px">
        <el-table ref="table" size="small" :data="tablesData">
          <template v-for="column in columns" :key="column.key">
            <el-table-column v-if="column.dataIndex === 'tags'" :prop="column.dataIndex" :label="column.title">
              <template #default="scope">
                <el-tag
                  v-for="tag in scope.row.tags"
                  :key="tag"
                  class="m-5"
                  :type="tag === 'nice' ? '' : tag.length > 5 ? 'success' : 'danger'"
                >
                  {{ tag }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column v-else :prop="column.dataIndex" :label="column.title"></el-table-column>
          </template>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { Tables, Timelines } from "@/data/analysis.data";

const timelinesData = computed(() => Timelines);
const tablesData = computed(() => Tables);

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags",
  },
];
</script>
