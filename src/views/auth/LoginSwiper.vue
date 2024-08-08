<template>
  <div class="slide slide__login">
    <swiper
      class="slide__wrap"
      :modules="modules"
      :centeredSlides="true"
      :spaceBetween="60"
      :autoplay="autoPlay"
      :pagination="pagination"
      :scrollbar="{ draggable: true }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide class="slide__item">
        <LoginDesignComponent class="slide__img" />
        <div class="slide__content">
          <h3 class="slide__title">Real-time Data Synchronization</h3>
          <p class="slide__para">
            Ensures that any changes in the control system are instantly reflected in the manager, providing users with
            up-to-the-moment information.
          </p>
        </div>
      </swiper-slide>
      <swiper-slide class="slide__item">
        <LoginProcess class="slide__img" />
        <div class="slide__content">
          <h3 class="slide__title">Modular Component Architecture</h3>
          <p class="slide__para">
            Allows for the creation of modular and reusable components. Promoting code organization and maintainability.
          </p>
        </div>
      </swiper-slide>
      <swiper-slide class="slide__item">
        <LoginSolutionMindSet class="slide__img" />
        <div class="slide__content">
          <h3 class="slide__title">State Management With Pinia</h3>
          <p class="slide__para">
            Ensures a centralized and predictable state management system, crucial for maintaining the integrity of the
            control system's data.
          </p>
        </div>
      </swiper-slide>
      <div class="swiper-pagination slide__pagination"></div>
    </swiper>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import LoginProcess from "@/components/svgs/LoginProcess.vue";
import LoginDesignComponent from "@/components/svgs/LoginDesignComponent.vue";
import LoginSolutionMindSet from "@/components/svgs/LoginSolutionMindSet.vue";
import type { PaginationOptions } from "swiper/types";

const modules = reactive([Pagination, Autoplay]);
const autoPlay = reactive({
  delay: 3500,
  disableOnInteraction: false,
});

const pagination = reactive<PaginationOptions>({
  el: ".swiper-pagination",
  type: "bullets",
  clickable: true,
});

const onSwiper = (swiper: any) => {
  console.log(swiper);
};

const onSlideChange = () => {};
</script>
