<template>
  <div class="v-spinner" v-show="loading">
    <div class="v-beat v-beat-odd" v-bind:style="spinnerStyle"></div>
    <div class="v-beat v-beat-even" v-bind:style="spinnerStyle"></div>
    <div class="v-beat v-beat-odd" v-bind:style="spinnerStyle"></div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  loading: { type: Boolean, default: true },
  color: { type: String, default: "#409eff" },
  size: { type: String, default: "15px" },
  margin: { type: String, default: "2px" },
  radius: { type: String, default: "100%" },
});
const spinnerStyle = computed(() => {
  return {
    backgroundColor: props.color,
    height: props.size,
    width: props.size,
    margin: props.margin,
    borderRadius: props.radius,
  };
});
</script>

<style lang="scss" scoped>
.v-beat {
  -webkit-animation: v-beatStretchDelay 0.7s infinite linear;
  animation: v-beatStretchDelay 0.7s infinite linear;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  display: inline-block;
}

.v-beat-odd {
  animation-delay: 0s;
}

.v-beat-even {
  animation-delay: 0.35s;
}

@-webkit-keyframes v-beatStretchDelay {
  50% {
    -webkit-transform: scale(0.75);
    transform: scale(0.75);
    -webkit-opacity: 0.2;
    opacity: 0.2;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-opacity: 1;
    opacity: 1;
  }
}

@keyframes v-beatStretchDelay {
  50% {
    -webkit-transform: scale(0.75);
    transform: scale(0.75);
    -webkit-opacity: 0.2;
    opacity: 0.2;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-opacity: 1;
    opacity: 1;
  }
}
</style>
