<template>
  <div class="area">
    <div class="area__container">
      <!--            <div class="area__btn">-->
      <!--                &lt;!&ndash; Front Button &ndash;&gt;-->
      <!--                <a-button class="active"> Front</a-button>-->

      <!--                &lt;!&ndash; Back Button &ndash;&gt;-->
      <!--                <a-button> Back</a-button>-->

      <!--                &lt;!&ndash; Right Button &ndash;&gt;-->
      <!--                <a-button> Right</a-button>-->

      <!--                &lt;!&ndash; Left Button &ndash;&gt;-->
      <!--                <a-button> Left</a-button>-->
      <!--            </div>-->
      <div class="area__wrap">
        <!-- Area Image Preview -->
        <div class="area__img">
          <figure class="area__img-preview">
            <img src="https://placehold.co/300x400" alt="" />
          </figure>
          <!-- Upload Images -->
          <UploadImages class="upload__images area__img-upload" name="files" />
        </div>

        <ProductAreaLocate :data="variantArea" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ProductAreaLocate from "./ProductAreaLocate.vue";
import UploadImages from "@/components/upload/UploadImages.vue";
import { computed } from "vue";

const props = defineProps({
  data: { type: Array, required: true },
  isLoading: { type: Boolean, required: false },
});
const variantArea = computed(() => props.data);
console.log("variantArea:", variantArea);
</script>
