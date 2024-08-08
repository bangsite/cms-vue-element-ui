<script setup lang="ts"></script>

<template>
  <div class="auth auth--bg">
    <div class="grid grid-cols-1 lg:grid-cols-[60%_40%] w-full h-full overflow-hidden">
      <slot name="authLeft"></slot>
      <slot name="authRight"></slot>
    </div>
  </div>
</template>
