<template>
  <div class="flex items-center justify-between gap-2 mb-4">
    <ElUpload
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
    </ElUpload>

    <template v-if="dataFiles && dataFiles.length > 0">
      <div
        class="border border-gray-300 border-dashed rounded-md flex flex-col gap-2 bg-white p-4 w-fit flex-grow overflow-y-auto h-[32vh]"
      >
        <div v-for="item in dataFiles" :key="item.images.uid" class="flex items-center gap-2">
          <img class="w-16 h-16 object-cover" :src="item.url" alt="image" />

          <div class="flex flex-col">
            <span class="font-medium">{{ truncateImageFile(item.images.name, 12) }}</span>
            <span class="text-gray-600 text-[14px]"> {{ formatFileSize(item.images.size) }}</span>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="border border-gray-300 border-dashed flex-grow rounded-md h-[32vh] w-fit">
        <el-empty description="No data" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import { useForm } from "vee-validate";
// import FileInput from "@/components/upload/FileInput.vue";
import ElUpload from "@/components/upload/ElUpload.vue";
import { formatFileSize, truncateImageFile } from "@/utils";
import SvgIcon from "@/components/common/SvgIcon.vue";

const props = defineProps({
  label: { type: String },
  uploadStatus: { type: [Boolean], default: false },
  uploadError: { type: [Object, String] },
  progress: { type: [String, Number], default: 0 },
});

const emits = defineEmits(["uploadFiles", "removeAll", "uploadNewFile"]);

const { setFieldError } = useForm();
const { locale } = useI18n();
// const { checkAllowPermission } = useAllowPermission();

const dataFiles = ref([]);
const multipleFile = ref(false);
const { uploadError } = toRefs(props);

const handleFiles = (data: any) => {
  console.log("handleFiles:::", data);
  console.log("handleFiles:::", data.length);
  dataFiles.value = data;
};

const handleUploadFiles = (data: any) => {
  multipleFile.value = false;
  emits("uploadFiles", {
    dataFiles: data,
    type: "one",
    length: dataFiles.value.length,
  });
};

const handleUploadAllFiles = () => {
  multipleFile.value = true;
  emits("uploadFiles", {
    dataFiles: dataFiles.value,
    type: "all",
    length: dataFiles.value.length,
  });
};

const handleRemoveAll = () => {
  dataFiles.value = [];
  emits("removeAll", true);
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
  height: 32vh;
  margin-bottom: 0;

  .el-upload {
    border-width: 2px;
    width: 100%;
    min-height: 8rem;
    height: 32vh;
  }

  div {
    width: 100%;
  }
}
</style>
