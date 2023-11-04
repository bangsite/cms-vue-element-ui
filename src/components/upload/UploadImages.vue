<template>
  <div class="upload">
    <div class="upload__wrap">
      <FileInput
        name="files"
        accept=".png, .jpg, .jpeg"
        :label="label"
        :multiple="true"
        :list-type="'picture-card'"
        :show-note="true"
        @dataFiles="handleFiles"
      >
        <template v-slot:description>
          <div class="upload__desc">
            <IconUpload />
            <!-- <span>{{ $t('IMAGE_MANAGE.NOTES') }}</span> -->
          </div>
        </template>
      </FileInput>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import { useForm } from "vee-validate";

import IconUpload from "@/components/svgs/IconUpload.vue";
import FileInput from "@/components/upload/FileInput.vue";

// import useAllowPermission from '@/composables/useAllowPermission';

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

const handleFiles = (data: string | any[]) => {
  if (data && data.length) {
    dataFiles.value = data;
    emits("uploadNewFile", true);
  } else dataFiles.value = [];
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
