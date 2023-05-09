<template>
  <a-form-item
    class="upload__input"
    :label="label"
    :help="errorMessage ? $t(errorMessage, { field: label }) : errorMessage"
    :validate-status="errorMessage ? 'error' : undefined"
    :required="rules.includes('required')"
  >
    <!-- Field -->
    <a-upload
      :id="name"
      :value="value"
      :multiple="multiple"
      :file-list="dataFiles"
      :before-upload="beforeUpload"
      :list-type="listType"
      :show-upload-list="false"
      :accept="accept"
      action=""
    >
      <slot name="description"> </slot>
    </a-upload>

    <div v-if="value && showFileName" class="upload__info">
      <span>{{ getFileName(value) }}</span>
      <span @click="handleRemove"><IconTrashSvg /></span>
    </div>
  </a-form-item>
</template>

<script setup lang="ts">
import { ref, toRef, computed } from "vue";
import { useField } from "vee-validate";
import { useI18n } from "vue-i18n";

// import IconTrashSvg from '@/components/svg/IconTrashSvg';

import { getBase64 } from "@/shared/utils/getBase64";
import { getFileName } from "@/shared/utils/getFileName";

import useCheckFiles from "@/shared/composables/useCheckFiles";

import { notificationInstance } from "@/shared/composables/useNotifications";

const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, default: "" },
  labelDisplay: { type: Boolean, default: true },
  rules: { type: [String, Object], default: "" },
  accept: { type: [String], default: "" },
  multiple: { type: Boolean, default: false },
  listType: { type: String, default: "text" },
  size: { type: Number, default: 6 },
  progress: { type: [Number, String], default: 0 },
  showFileName: { type: Boolean, default: false },
  showNote: { type: Boolean, default: false },
});

const emits = defineEmits(["dataFiles", "removeFile"]);

const { t } = useI18n();
// const { openNotification } = useNotifications();
const { errorMessageKey, checkFileLimit, checkFileExtension, checkFileSize } = useCheckFiles();

const percentCompleted = computed({
  // getter
  get: () => props.progress,

  // setter
  set: () => {
    percentCompleted.value = 0;
  },
});
const name = toRef(props, "name");
const rules = toRef(props, "rules");
const acceptFile = toRef(props, "accept");
const { value, setValue, errorMessage } = useField(name, rules);
const indexFile = ref(0);
const dataFiles = ref([]);

const beforeUpload = (file: any, fileList: any[]) => {
  indexFile.value++;

  if (indexFile.value === 1) handleCheckFileUpload(fileList);
  if (indexFile.value === fileList.length) indexFile.value = 0;

  return false;
};

const handleCheckFileUpload = (fileList: any[]) => {
  dataFiles.value = [];
  let validLimit: boolean | undefined = false;
  let validSize: boolean | undefined = false;

  if (fileList && fileList.length) {
    validLimit = checkFileLimit(fileList);

    if (!validLimit) {
      notificationInstance("error", {
        message: t("NOTIFICATION.TITLE_ERROR"),
        description: t("NOTIFICATION.FILE_QUEUE_LIMIT"),
      });
      emits("dataFiles", dataFiles.value);

      return false;
    }

    fileList.every((file: { type: string; size: string | number }) => {
      checkFileExtension(acceptFile.value, file?.type);
      validSize = checkFileSize(file?.size, 20);

      if (errorMessageKey.value) {
        notificationInstance("error", {
          message: t("NOTIFICATION.TITLE_ERROR"),
          description: t(errorMessageKey.value),
        });

        emits("dataFiles", dataFiles.value);

        return false;
      }

      if (!validSize) {
        notificationInstance("error", {
          message: t("NOTIFICATION.TITLE_ERROR"),
          description: t("NOTIFICATION.FILE_SIZE_20MB"),
        });

        emits("dataFiles", dataFiles.value);

        return false;
      }

      return true;
    });
  }

  if (validLimit && validSize && !errorMessageKey.value) handleFileBase64(fileList);
};

const handleFileBase64 = async (fileList: any[]) => {
  let newObjFile = {};
  for (const file of fileList) {
    newObjFile = {
      images: file,
      url: await getBase64(file),
      progress: 0,
    };

    setValue(file);
    dataFiles.value.push(newObjFile);
  }

  emits("dataFiles", dataFiles.value);
};

const handleRemove = () => {
  emits("removeFile", true);
};
</script>
