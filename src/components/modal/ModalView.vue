<template>
  <Transition name="modal-animate">
    <Teleport to="body">
      <div class="modal-overlay" id="modal-overlay">
        <Transition name="modal-animate-inner">
          <div
            v-if="modalActive"
            class="modal"
            id="modal"
            role="dialog"
            aria-labelledby="modal-header"
            aria-describedby="modal-body"
          >
            <div class="modal-container" :style="{ width: widthPx, height: heightPx }">
              <header class="modal-header" id="modal-header" :class="classHead">
                <slot name="header"></slot>

                <button class="modal-header-close" @click.prevent="closeModal">
                  <SvgIcon :icon="'ic:round-close'" :size="26" />
                </button>
              </header>

              <section class="modal-body" id="modal-body">
                <slot name="body"></slot>
              </section>

              <footer class="modal-footer" id="modal-footer" v-if="!disableFooter">
                <slot name="footer"></slot>
              </footer>
            </div>
          </div>
        </Transition>
      </div>
    </Teleport>
  </Transition>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import SvgIcon from "@/components/common/SvgIcon.vue";

const props = defineProps({
  className: { type: String },
  classHead: { type: String },
  stopEvent: { type: Boolean, default: false },
  modalActive: { type: Boolean },
  disableFooter: { type: Boolean, default: false },
  width: { type: [Number, String] },
  height: { type: [Number, String] },
});
const emits = defineEmits(["closeModal"]);
const modalActive = ref(props.modalActive);
const widthPx = ref(props.width + "px");
const heightPx = ref(props.height + "px");

const closeModal = () => {
  modalActive.value = false;
  emits("closeModal", false);
};

const handleClickOutside = () => {
  closeModal();
};

watch(
  () => props.modalActive,
  (newVal) => {
    modalActive.value = newVal;
  }
);
</script>

<style lang="scss" scoped>
.modal-animate-enter-active,
.modal-animate-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animate-enter-from,
.modal-animate-leave-to {
  opacity: 0;
}

.modal-animate-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-animate-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animate-inner-enter-from {
  opacity: 0;
  transform: scale(1.01);
}

.modal-animate-inner-leave-to {
  transform: scale(1.01);
}
</style>
