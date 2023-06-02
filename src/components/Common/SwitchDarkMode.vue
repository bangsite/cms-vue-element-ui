<template>
  <div class="dark-mode w-40 h-full flex flex-center" @click="handleSwitch">
    <SvgIcon :icon="'solar:moon-stars-bold'" :size="20" v-if="darkMode"></SvgIcon>
    <SvgIcon :icon="'uil:sun'" :size="20" v-else></SvgIcon>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ThemeModeSwitch } from "@/core/interfaces/theme.interface";
import SvgIcon from "@/components/SvgIcon.vue";

const props = withDefaults(defineProps<ThemeModeSwitch>(), {
  dark: false,
});

const emit = defineEmits<{ (event: "update:dark", darkMode: boolean): void }>();

const darkMode = computed({
  get() {
    return props.dark;
  },
  set(newValue: boolean) {
    emit("update:dark", newValue);
  },
});

function handleSwitch(event: MouseEvent) {
  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

  if (!document.startViewTransition) {
    darkMode.value = !darkMode.value;
    return;
  }

  const transition = document.startViewTransition(() => {
    darkMode.value = !darkMode.value;
  });

  transition.ready.then(() => {
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];
    document.documentElement.animate(
      {
        clipPath: darkMode.value ? clipPath : [...clipPath].reverse(),
      },
      {
        duration: 300,
        easing: "ease-in",
        pseudoElement: darkMode.value ? "::view-transition-new(root)" : "::view-transition-old(root)",
      }
    );
  });
}
</script>
<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
::view-transition-old(root) {
  z-index: 9999;
}
::view-transition-new(root) {
  z-index: 1;
}
.dark::view-transition-old(root) {
  z-index: 1;
}
.dark::view-transition-new(root) {
  z-index: 9999;
}
</style>
