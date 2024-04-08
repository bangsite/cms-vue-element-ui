import type { App } from "vue";
import draggable from "vuedraggable";

export function libVueDraggableNext(app: App) {
  app.component("Draggable", draggable);
}
