<template>
  <el-form-item
    class="upload__input"
    :label="label"
    :help="errorMessage ? $t(errorMessage, { field: label }) : errorMessage"
    :validate-status="errorMessage ? 'error' : undefined"
    :required="rules.includes('required')"
  >
    <!-- Field -->
    <el-upload
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
      <slot name="description"></slot>
    </el-upload>

    <div v-if="value && showFileName" class="upload__info">
      <span>{{ checkFiles(value) }}</span>
      <span @click="handleRemove">
        <SvgIcon :icon="'material-symbols-light:delete-outline'" :size="24" />
      </span>
    </div>
  </el-form-item>
</template>

<script setup lang="ts">
import { computed, ref, toRef } from "vue";
import { useField } from "vee-validate";
import { useI18n } from "vue-i18n";

// import IconTrashSvg from '@/components/svg/IconTrashSvg';
import { getBase64 } from "@/utils/getBase64";
import { checkFiles } from "@/utils/getFileName";
import { checkFileLimit, checkFileSize, checkNameFile } from "@/utils";
import { notifier } from "@/notifications";
import SvgIcon from "@/components/common/SvgIcon.vue";

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
const percentCompleted = computed({
  get: () => props.progress,
  set: () => {
    percentCompleted.value = 0;
  },
});

const name = toRef(props, "name");
const rules = toRef(props, "rules");
const acceptFile = toRef(props, "accept");
const indexFile = ref(0);
const dataFiles = ref([]);

const { t } = useI18n();
const { value, setValue, errorMessage } = useField(name, rules);

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
      const title = t("NOTIFICATION.TITLE_ERROR");
      const message = t("NOTIFICATION.FILE_QUEUE_LIMIT");

      notifier.showError(title, message);

      emits("dataFiles", dataFiles.value);

      return false;
    }

    fileList.every((file: { type: string; size: string | number }) => {
      checkNameFile(acceptFile.value);

      // validate extension of image  png | jpg |...

      validSize = checkFileSize(file?.size, 20);

      if (!validSize) {
        const title = t("NOTIFICATION.TITLE_ERROR");
        const message = t("NOTIFICATION.FILE_SIZE_20MB");

        notifier.showError(title, message);

        emits("dataFiles", dataFiles.value);

        return false;
      }

      return true;
    });
  }

  if (validLimit && validSize) handleFileBase64(fileList);
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
    if (newObjFile && Object.keys(newObjFile).length) dataFiles.value.push(newObjFile);
  }

  emits("dataFiles", dataFiles.value);
};

const handleRemove = () => {
  emits("removeFile", true);
};
</script>
