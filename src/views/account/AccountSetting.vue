<template>
  <div>
    <AppPageHeader>
      <template #header>
        <!-- <a-page-header title="Account Setting"></a-page-header> -->
      </template>
    </AppPageHeader>
    <AccountSettingForm />
  </div>
</template>

<script lang="ts" setup>
import AccountSettingForm from "@/views/account/components/AccountSettingForm.vue";
// import AppPageHeader from '@/components/AppPageHeader.vue';
</script>

<style scoped></style>
