<template>
  <span>
    {{ displayedAmount }}
  </span>
</template>
<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, toRefs, watch } from "vue";
interface ICountTo {
  timestamp: number;
  startTimestamp: number;
  currentStartAmount: number;
  currentAmount: number;
  currentDuration: number;
  paused: boolean;
  remaining: number;
  animationFrame: number;
}

const props = defineProps({
  startAmount: {
    type: Number,
    default: 0,
  },
  endAmount: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 3,
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
  autoInit: {
    type: Boolean,
    default: true,
  },
  prefix: {
    type: String,
    default: "$",
  },
  suffix: {
    type: String,
    default: "",
  },
  separator: {
    type: String,
    default: ",",
  },
  decimalSeparator: {
    type: String,
    default: ".",
  },
  decimals: {
    type: Number,
    default: 0,
  },
});

const { startAmount, endAmount, duration, autoInit, decimals, separator, suffix, prefix, decimalSeparator } =
  toRefs(props);

const emits = defineEmits(["mounted", "callback"]);

const data = reactive<ICountTo>({
  timestamp: 0,
  startTimestamp: 0,
  currentAmount: 0,
  currentStartAmount: 0,
  currentDuration: 0,
  paused: false,
  remaining: 0,
  animationFrame: 0,
});

const isCountingUp = computed(() => endAmount.value > startAmount.value);
const displayedAmount = computed(() => {
  return `${prefix.value}${formattedAmount()}${suffix.value}`;
});

onMounted(() => {
  data.currentAmount = startAmount.value;
  data.currentStartAmount = startAmount.value;
  data.currentDuration = duration.value * 1000;
  data.remaining = duration.value * 1000;

  if (autoInit.value) start();
  else data.paused = true;
});

const formattedAmount = (): string => {
  const regex = /(\d+)(\d{3})/;

  let numberString: string = data.currentAmount.toFixed(decimals.value);

  numberString += "";
  let numberArray: Array<string> = numberString.split(".");
  let numbers: string = numberArray[0];
  let decimalsNew: string = numberArray.length > 1 ? decimalSeparator.value + numberArray[1] : "";
  let isNumber = !isNaN(parseFloat(separator.value));

  if (separator.value && !isNumber) {
    while (regex.test(numbers)) numbers = numbers.replace(regex, "$1" + separator.value + "$2");
  }

  return numbers + decimalsNew;
};

const start = () => {
  cancelAnimation();
  data.currentStartAmount = startAmount.value;
  data.startTimestamp = 0;
  data.currentDuration = duration.value * 1000;
  data.paused = false;
  data.animationFrame = window.requestAnimationFrame(counting);
};

const pause = () => {
  if (data.paused) return;
  cancelAnimation();
  data.paused = true;
};

const resume = () => {
  if (!data.paused) return;
  data.startTimestamp = 0;
  data.currentDuration = +data.remaining;
  data.currentStartAmount = +data.currentAmount;
  data.animationFrame = window.requestAnimationFrame(counting);
  data.paused = false;
};

const reset = () => {
  data.paused = false;
  data.startTimestamp = 0;
  cancelAnimation();
  data.currentAmount = startAmount.value;
  if (autoInit.value) start();
  else data.paused = true;
};

const counting = (timestamp: number) => {
  data.timestamp = timestamp;
  if (!data.startTimestamp) data.startTimestamp = data.timestamp;
  let progress: number = data.timestamp - data.startTimestamp;
  data.remaining = data.currentDuration - progress;

  if (!isCountingUp.value) {
    data.currentAmount =
      data.currentStartAmount - (data.currentStartAmount - endAmount.value) * (progress / data.currentDuration);
    data.currentAmount = data.currentAmount < endAmount.value ? endAmount.value : data.currentAmount;
  } else {
    data.currentAmount =
      data.currentStartAmount + (endAmount.value - data.currentStartAmount) * (progress / data.currentDuration);
    data.currentAmount = data.currentAmount > endAmount.value ? endAmount.value : data.currentAmount;
  }

  if (progress < data.currentDuration) data.animationFrame = window.requestAnimationFrame(counting);
  else emits("callback", null);
};

const cancelAnimation = () => {
  if (data.animationFrame) window.cancelAnimationFrame(data.animationFrame);
};

onUnmounted(() => {
  cancelAnimation();
});

watch(startAmount, reset);
watch(endAmount, reset);
watch(duration, reset);

start();
</script>
