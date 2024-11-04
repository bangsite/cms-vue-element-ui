<template>
  <el-card class="rounded-md mb-4">
    <template #header>
      <div class="flex flex-wrap gap-2 items-center justify-between cursor-pointer">
        <h4 class="title">Upload images</h4>
      </div>
    </template>

    <div class="flex items-center justify-between gap-2 mb-4">
      <UploadInputValidate
        name="files"
        accept=".png, .jpg, .jpeg"
        listType="picture-card"
        className="upload-custom"
        :label="label"
        :multiple="true"
        :showNote="true"
        :autoUpload="false"
        @dataFiles="handleFiles"
      >
        <template v-slot:description>
          <div class="flex flex-col items-center">
            <SvgIcon :icon="'mdi-light:image'" :size="36" />

            <span class="mt-2">{{ $t("UPLOAD.IMG.DESC") }}</span>
            <span class="text-gray-400 text-[12px]">{{ $t("UPLOAD.IMG.NOTES") }} </span>
          </div>
        </template>
      </UploadInputValidate>

      <template v-if="dataFiles && dataFiles.length > 0">
        <div
          class="bg-[#fafafa] border border-gray-300 border-dashed rounded-md flex flex-col gap-2 bg-white p-4 w-fit flex-grow overflow-y-auto h-[36vh]"
        >
          <div
            v-for="file in dataFiles"
            :key="file.images.uid"
            class="border border-gray-300 border-dashed flex items-center justify-between gap-2 p-2 rounded-md hover:bg-white hover:shadow-sm"
          >
            <img class="w-16 h-16 object-cover" :src="file.url" alt="image" />
            <div class="flex flex-col flex-grow">
              <span class="font-medium">{{ truncateImageFile(file.images.name, 12) }}</span>
              <span class="text-gray-600 text-[14px]"> {{ formatFileSize(file.images.size) }}</span>
            </div>
            <div class="process"></div>

            <div
              @click="handleUploadFiles"
              class="cursor-pointer p-2 rounded-full hover:text-red-500 hover:bg-red-50 hover:shadow-sm"
            >
              <SvgIcon :icon="'line-md:remove'" :size="20" />
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="border border-gray-300 border-dashed flex-grow rounded-md h-[36vh] w-fit">
          <el-empty description="No data" />
        </div>
      </template>
    </div>

    <el-divider border-style="dashed" />
    <div class="flex justify-self-end">
      <el-button @click="handleReset">Reset</el-button>
      <el-button type="primary" class="flex justify-self-end" @click="handleUploadFiles">Upload</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import { useForm } from "vee-validate";
import UploadInputValidate from "@/components/upload/UploadInputValidate.vue";
import SvgIcon from "@/components/common/SvgIcon.vue";
import { ClientStorage, formatFileSize, truncateImageFile } from "@/utils";

const props = defineProps({
  label: { type: String },
  uploadStatus: { type: [Boolean], default: false },
  uploadError: { type: [Object, String] },
  progress: { type: [String, Number], default: 0 },
});

const emits = defineEmits(["dataUpload"]);
// const { uploadError } = toRefs(props);
// const { setFieldError } = useForm();
const dataFiles = ref([]);

const handleFiles = (data: any) => {
  dataFiles.value = data;
};

// const handleUploadFiles = (data: any) => {
//   multipleFile.value = false;
//   emits("uploadFiles", {
//     dataFiles: data,
//     type: "one",
//     length: dataFiles.value.length,
//   });
// };

const handleUploadFiles = () => {
  const dataUpload = {
    files: [],
    shopId: "",
    width: "",
    height: "",
  };
  dataFiles.value.forEach((file) => {
    const { raw } = file.images;
    if (raw) dataUpload.files.push(raw);
  });

  const clientId = ClientStorage.load("__user_info__").id || "";
  if (clientId) dataUpload.shopId = clientId;

  // check data
  console.log(dataUpload);
  emits("dataUpload", dataUpload);

  //call api
};

const handleReset = () => {
  dataFiles.value = [];

  emits("dataUpload", null);
};

// watch(uploadError, () => {
//   if (uploadError.value?.images) {
//     dataFiles.value = [];
//     setFieldError('files', uploadError.value?.images[0]);
//   }
// });
</script>

<style lang="scss">
//override el
.upload-custom {
  width: 55%;
  height: 36vh;
  margin-bottom: 0;

  .el-upload {
    border-width: 2px;
    width: 100%;
    min-height: 8rem;
    height: 36vh;
  }

  div {
    width: 100%;
  }
}
</style>
