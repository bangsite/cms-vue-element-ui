<template>
  <div class="dark-mode flex item-center" @click="handleSwitch">
    <SvgIcon :icon="'solar:moon-stars-bold'" :size="20" v-if="darkMode"></SvgIcon>
    <SvgIcon :icon="'uil:sun'" :size="20" v-else></SvgIcon>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import SvgIcon from "@/components/common/SvgIcon.vue";
import type { ThemeModeSwitch } from "@/interfaces/ITheme";

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
<style></style>
