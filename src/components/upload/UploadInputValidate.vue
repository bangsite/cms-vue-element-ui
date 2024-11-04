<template>
  <el-form-item
    :label="label"
    :help="errorMessage ? $t(errorMessage, { field: label }) : errorMessage"
    :validate-status="errorMessage ? 'error' : undefined"
    :required="rules.includes('required')"
    :class="className"
  >
    <!-- Field -->
    <el-upload
      :id="name"
      name="name"
      :value="value"
      :multiple="multiple"
      :accept="accept"
      :limit="limit"
      :listType="listType"
      :showFileList="showFileList"
      :autoUpload="autoUpload"
      :onChange="handleChange"
      action="#"
    >
      <template #trigger>
        <slot name="description"></slot>
      </template>
    </el-upload>
  </el-form-item>
</template>

<script setup lang="ts">
import { computed, ref, toRef } from "vue";
import { useField } from "vee-validate";
import { useI18n } from "vue-i18n";
import type { UploadFile, UploadFiles } from "element-plus";

import { checkFileLimit, checkFileSize, getBase64 } from "@/utils";
import { notifier } from "@/notifications";

const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, default: "" },
  labelDisplay: { type: Boolean, default: true },
  className: { type: String, default: "" },
  rules: { type: [String, Object], default: "" },
  accept: { type: [String], default: "" },
  autoUpload: { type: [Boolean], default: false },
  multiple: { type: Boolean, default: false },
  listType: { type: String, default: "text" },
  limit: { type: Number, default: 5 },
  progress: { type: [Number, String], default: 0 },
  showFileName: { type: Boolean, default: false },
  showFileList: { type: Boolean, default: false },
  showNote: { type: Boolean, default: false },
});

const emits = defineEmits(["dataFiles", "removeFile"]);
const percentCompleted = computed({
  get: () => props.progress,
  set: () => {
    percentCompleted.value = 0;
  },
});

const name = toRef(props, "name");
const rules = toRef(props, "rules");

const { t } = useI18n();
const { value, setValue, errorMessage } = useField(name, rules);
const dataFiles = ref([]);

const handleChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  let validLimit: boolean | undefined = false;
  let validSize: boolean | undefined = false;
  const { size } = uploadFile;

  validLimit = checkFileLimit(uploadFiles);
  if (!validLimit) {
    const title = t("NOTIFICATION.TITLE_ERROR");
    const message = t("NOTIFICATION.FILE_QUEUE_LIMIT");

    notifier.showError(title, message);

    emits("dataFiles", dataFiles.value);

    return false;
  }

  validSize = checkFileSize(size, 20);
  if (!validSize) {
    const title = t("NOTIFICATION.TITLE_ERROR");
    const message = t("NOTIFICATION.FILE_SIZE_20MB");

    notifier.showError(title, message);

    emits("dataFiles", dataFiles.value);

    return false;
  }

  if (validLimit && validSize) {
    handleFileBase64(uploadFile);
    emits("dataFiles", dataFiles.value);
  }
};
const handleFileBase64 = async (file: UploadFile) => {
  if (file) {
    const dataImgBase64 = await getBase64(file.raw);
    setValue(file);

    let newObjFile = {
      images: file,
      url: dataImgBase64,
      progress: 0,
    };

    if (newObjFile && Object.keys(newObjFile).length) dataFiles.value.push(newObjFile);
  }
};
const handleRemove = () => {
  emits("removeFile", true);
};
</script>
