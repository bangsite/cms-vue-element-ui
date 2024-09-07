import type { DirectiveBinding } from "vue";

function handleClickOutside(event: Event, el: HTMLElement, binding: DirectiveBinding) {
  if (!(el === event.target || el.contains(event.target as Node))) {
    if (typeof binding.value === "function") {
      binding.value(event);
    }
  }
}

const clickOutsideDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const onClick = (event: Event) => handleClickOutside(event, el, binding);
    el.__clickOutsideHandler__ = onClick;
    document.addEventListener("click", onClick);
    document.addEventListener("touchstart", onClick);
  },
  unmounted(el: HTMLElement) {
    document.removeEventListener("click", el.__clickOutsideHandler__);
    document.removeEventListener("touchstart", el.__clickOutsideHandler__);
    delete el.__clickOutsideHandler__;
  },
};

export default clickOutsideDirective;
