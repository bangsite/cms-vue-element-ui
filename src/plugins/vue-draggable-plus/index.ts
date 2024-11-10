import type { App } from "vue";
import { VueDraggable } from "vue-draggable-plus";
export function libVueDraggablePlus(app: App) {
  app.component("DraggablePlus", VueDraggable);
}
