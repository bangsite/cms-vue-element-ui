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
        <LoginIteration class="slide__img" />
        <div class="slide__content">
          <h3 class="slide__title">Customization & Content Management</h3>
          <p class="slide__para">Offer customization options, implement features for optimizing content</p>
        </div>
      </swiper-slide>
      <swiper-slide class="slide__item">
        <LoginProcess class="slide__img" />
        <div class="slide__content">
          <h3 class="slide__title">Analytics & Performance Optimization</h3>
          <p class="slide__para">Integrate analytics tools to track content performance</p>
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

import LoginIteration from "@/components/svgs/LoginIteration.vue";
import LoginProcess from "@/components/svgs/LoginProcess.vue";
import { PaginationOptions } from "swiper/types";

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
