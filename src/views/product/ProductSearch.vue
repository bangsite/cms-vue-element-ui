<template>
  <a-card :title="$t('PRODUCT.SEARCH.TITLE')" class="search mb-20">
    <!-- Product Create Button -->
    <template #extra>
      <router-link to="/" class="ant-btn ant-btn-primary">
        <PlusOutlined />
        {{ $t("COMMON.CREATE") }}
      </router-link>
    </template>

    <!-- Product Form Search -->
    <form class="ant-form ant-form-vertical search-form" @submit="onSubmit">
      <div class="search__field">
        <!-- Project ID -->
        <InputBase name="code" type="text" :label="$t('PRODUCT.SEARCH.PROJECT_CODE')" />

        <!-- Project Name -->
        <InputBase name="name" :label="$t('PRODUCT.SEARCH.PROJECT_NAME')" />

        <!-- Category Name -->
        <InputBase name="category_name" :label="$t('PRODUCT.SEARCH.CATEGORY_NAME')" />

        <!-- Status -->
        <SelectBase name="status" type="select" :label="$t('PRODUCT.SEARCH.STATUS')" />
      </div>

      <!-- Product Actions -->
      <div class="search__action">
        <!-- Reset Button -->
        <a-button @click="onReset" type="default" class="mr-10 btn-cancel">
          <CloseOutlined />
          {{ $t("COMMON.RESET") }}
        </a-button>

        <!-- Search Button -->
        <a-button html-type="submit" type="primary">
          <SearchOutlined />
          {{ $t("COMMON.SEARCH") }}
        </a-button>
      </div>
    </form>
  </a-card>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useForm } from "vee-validate";
import InputBase from "@/components/form/InputBase.vue";
import SelectBase from "@/components/form/SelectBase.vue";

const emit = defineEmits(["filter-changed"]);

// const statusData = ref(transferNameKeyValue(PROJECT_STATUS));
const { handleSubmit, resetForm } = useForm({
  initialValues: {
    code: "",
    name: "",
    category_name: "",
    status: "",
  },
});
// const { checkAllowPermission } = useAllowPermission();

const onReset = () => {
  resetForm();
  emit("filter-changed", { type: "reset", value: {} });
};

const onSubmit = handleSubmit((values) => {
  emit("filter-changed", { type: "search", value: values });
});
</script>
<style lang="scss">
.search {
  border-radius: 6px;
  &__field {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  &__action {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
