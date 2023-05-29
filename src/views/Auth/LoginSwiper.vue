<template>
  <div class="slide slide__login">
    <swiper
      class="slide__wrap"
      :centeredSlides="true"
      :spaceBetween="60"
      :pagination="pagination"
      :autoplay="autoPlay"
      :modules="modules"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide class="slide__item">
        <IconTasting class="slide__img" />
        <div class="slide__content">
          <h3 class="slide__title">Welcome back!</h3>
          <p class="slide__para">Start managing your finance and better</p>
        </div>
      </swiper-slide>
      <swiper-slide class="slide__item">
        <IconInspiration class="slide__img" />
        <div class="slide__content">
          <h3 class="slide__title">Welcome back!</h3>
          <p class="slide__para">Start managing your finance and better</p>
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
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination } from "swiper";
import IconInspiration from "@/components/icons/IconInspiration.vue";
import IconTasting from "@/components/icons/IconTasting.vue";

const modules = reactive([Autoplay, Pagination]);
const autoPlay = reactive({
    delay: 3500,
    disableOnInteraction: false,
});

const pagination = reactive({
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
});

const onSwiper = (swiper: any) => {
    console.log(swiper);
};

const onSlideChange = () => {};
</script>
