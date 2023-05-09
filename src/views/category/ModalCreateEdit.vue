<template>
  <a-modal
    :visible="visible"
    @ok="onSubmit"
    :centered="true"
    title="pageTitle"
    @close="onCancel"
    :destroy-on-close="true"
    :closable="false"
    :maskClosable="false"
  >
    <a-spin :spinning="isFetching || isUpdating">
      <a-form layout="vertical" @submit="onSubmit">
        <InputBase name="title" label="Title" rules="required" />
      </a-form>
    </a-spin>

    <template #footer>
      <a-button key="submit" type="primary" :loading="isLoading || isFetching || isUpdating" @click="onSubmit">
        <template #icon>
          <SaveOutlined />
        </template>
        {{ addEditType == "add" ? $t("COMMON.CREATE") : $t("COMMON.UPDATE") }}
      </a-button>
      <a-button key="back" @click="onCancel">
        {{ $t("COMMON.CANCEL") }}
      </a-button>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
import { useForm } from "vee-validate";
import InputBase from "@/components/form/InputBase.vue";
import { useQueryClient } from "vue-query";
import { useCreateCategoryMutation, useUpdateCategoryMutation } from "@/shared/composables/useCategoryMutation";
import { useCategoryDetailQuery } from "@/shared/composables/useCategoryQuery";
import { computed, toRefs } from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  addEditType: {
    type: String,
    required: true,
  },
  editId: {
    type: String,
  },
});

const { addEditType } = toRefs(props);
const editId = computed(() => props.editId || "");
const emit = defineEmits(["closed"]);
const onCancel = () => {
  emit("closed");
};
const queryClient = useQueryClient();
const { mutate: handleCreateCategory, isLoading } = useCreateCategoryMutation();
const { mutate: handleUpdateCategory, isLoading: isUpdating } = useUpdateCategoryMutation(editId);

const { handleSubmit, setValues } = useForm();

const { data, isFetching } = useCategoryDetailQuery(editId, {
  onSuccess: (data) => {
    setValues(data.data);
  },
  enabled: computed(() => {
    return !!props.editId;
  }),
});

const onSubmit = handleSubmit((values, actions) => {
  if (props.addEditType == "add") {
    handleCreateCategory(values, {
      onSuccess: () => {
        queryClient.invalidateQueries("category");
        emit("closed");
      },
    });
  } else if (props.addEditType == "edit") {
    handleUpdateCategory(values, {
      onSuccess: () => {
        queryClient.invalidateQueries("category");
        emit("closed");
      },
    });
  }
});
</script>

<style scoped></style>
