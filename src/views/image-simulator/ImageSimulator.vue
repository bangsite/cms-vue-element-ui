<template>
  <div class="simulator-wrapper">
    <EditorHeader />
    <div class="editor-wrapper">
      <SettingSidebar />
      <div class="editor" ref="wrapperRe   f">
        <Editor />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SettingSidebar from "@/views/image-simulator/components/SettingSidebar.vue";
import Editor from "@/views/image-simulator/components/ImageEditor.vue";
import EditorHeader from "@/views/image-simulator/components/EditorHeader.vue";
</script>

<style scoped>
.simulator-wrapper {
  display: flex;
  width: 100%;
  flex-direction: column;
}
.editor-wrapper {
  display: flex;
  width: 100%;
}
.editor {
  flex: 1;
}
</style>
