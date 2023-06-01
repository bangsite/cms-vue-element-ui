<template>
  <ElRow :gutter="16">
    <ElCol :lg="8" :sm="24">
      <ElCard class="mb-20px">
        <h3>Timeline</h3>
        <ElTimeline>
          <ElTimelineItem v-for="(item, index) in timelines" :key="index" :timestamp="item.time" :type="item.type">
            <h4>{{ item.title }}</h4>
            {{ item.content }}
          </ElTimelineItem>
        </ElTimeline>
      </ElCard>
    </ElCol>
    <ElCol :lg="16" :sm="24">
      <ElCard class="mb-20px">
        <h3>Table</h3>

        <ElTable stripe size="small" :columns="columns" :data="tableData">
          <ElTableColumn prop="name" label="Name" width="120" />
          <ElTableColumn prop="age" label="Age" width="60" />
          <ElTableColumn prop="address" label="Address" />
          <ElTableColumn prop="tags" label="Tags">
            <template #default="scope">
              <ElTag v-for="(item, index) in scope.row.tags" :key="index" class="m-5">{{ item }}</ElTag>
            </template>
          </ElTableColumn>
        </ElTable>
        <!--        <template #default="scope">-->
        <!--          <ElTag>{{}}</ElTag>-->
        <!--        </template>-->
      </ElCard>
    </ElCol>
  </ElRow>
</template>
<script setup lang="ts">
import { h } from "vue";
import { ElTag } from "element-plus";

defineOptions({ name: "DashboardAnalysisBottomPart" });

interface TimelineData {
  type: "primary" | "info" | "success" | "warning" | "danger";
  title: string;
  content: string;
  time: string;
}

interface TableData {
  key: number;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const timelines: TimelineData[] = [
  { type: "primary", title: "Default", content: "", time: "2021-10-10 20:46" },
  { type: "success", title: "Success", content: "Where is the success", time: "2021-10-10 20:46" },
  { type: "danger", title: "Error", content: "Where is the error", time: "2021-10-10 20:46" },
  { type: "warning", title: "Warning", content: "Where is the warning", time: "2021-10-10 20:46" },
  { type: "info", title: "Information", content: "Yes", time: "2021-10-10 20:46" },
];

const columns = [
  {
    title: "Name",
    key: "name",
  },
  {
    title: "Age",
    key: "age",
  },
  {
    title: "Address",
    key: "address",
  },
  {
    title: "Tags",
    dataKey: "tags",
    key: "tags",
    align: "center",
  },
];

const tableData: TableData[] = [
  {
    key: 0,
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: 1,
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["wow"],
  },
  {
    key: 2,
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: 3,
    name: "Soybean",
    age: 25,
    address: "China Shenzhen",
    tags: ["handsome", "programmer"],
  },
  {
    key: 4,
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: 5,
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["wow"],
  },
  {
    key: 6,
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: 7,
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];
</script>
