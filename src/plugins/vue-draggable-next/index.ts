import type { App } from "vue";
import draggableComponent from "vuedraggable";

export function libVueDraggableNext(app: App) {
  app.component("Draggable", draggableComponent);
}
