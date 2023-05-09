<template>
  <a-form :wrapper-col="{ span: 16 }" :label-col="{ span: 3 }" @submit="onSubmit">
    <InputBase name="title" label="Title" rules="required" />
    <div class="form__action">
      <a-button type="primary" html-type="submit"> Cancel </a-button>
      <a-button type="primary" html-type="submit"> Submit </a-button>
    </div>
  </a-form>
</template>

<script lang="ts" setup>
import { useForm } from "vee-validate";
import InputBase from "@/components/form/InputBase.vue";

const { handleSubmit } = useForm();

const onSubmit = handleSubmit((values, actions) => {
  console.log(values);
});
</script>

<style scoped lang="scss">
.form__action {
  text-align: right;
  display: flex;
  justify-content: space-evenly;
}
</style>
