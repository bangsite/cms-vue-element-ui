<template>
  <div class="pass-strength" v-if="password && password.length <= 30">
    <div class="pass-strength-bar mb-1" :class="{ [calculatorScore.strength]: true }"></div>
    <span v-if="calculatorScore.strength === 'guessable'"> 😖 Guessable. Must contain at least 8 characters</span>
    <span v-if="calculatorScore.strength === 'weak'">😑 Weak. Must contain at least 1 special characters</span>
    <span v-if="calculatorScore.strength === 'safe'">😉 Safe. Must contain special symbol</span>
    <span v-if="calculatorScore.strength === 'secure'">😎 Secure. You have a secure password</span>
  </div>
</template>

<script setup>
import { computed, toRef } from "vue";
import { scorePassword } from "@/utils";
import { PasswordTypeEnum } from "@/enums/passwordType.enum.ts";

const props = defineProps({
  password: {
    type: String,
  },
  customClass: {
    type: String,
  },
});
const emits = defineEmits(["score"]);

const password = toRef(props, "password");

const calculatorScore = computed(() => {
  if (!password.value) return null;

  const score = scorePassword(password.value);
  const strength = PasswordTypeEnum[score];

  emits("score", { strength, score });

  return {
    strength,
    score,
  };
});
</script>

<style lang="scss" scoped>
.pass-strength {
  background-color: #f7f8f9;
  border-radius: 2px;
  transition: all 0.2s linear;
  height: 6px;
  width: 100%;
  margin-top: 4px;
  position: relative;
  span {
    font-size: 12px;
  }
}

.pass-strength-bar {
  border-radius: 2px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  transition: all 0.2s linear;
  height: 6px;

  &.risky,
  &.guessable {
    background-color: #f95e68;
    width: 10%;
  }

  &.weak {
    background-color: #fdd244;
    width: 55%;
  }

  &.safe {
    background-color: #b0dc53;
    width: 77.5%;
  }

  &.secure {
    background-color: #35cc62;
    width: 100%;
  }
}
</style>
