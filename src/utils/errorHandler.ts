import { ElMessage } from "element-plus";

let timeoutId: ReturnType<typeof setTimeout> | null = null;

export const showNotification = (
  message: string,
  type: "error" | "success" | "info" | "warning" = "error",
  title?: string,
  delay: number = 3000
) => {
  if (timeoutId !== null) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }

  ElMessage({ message, type, title: title || (type === "error" ? "Error" : "Notification"), duration: delay });

  timeoutId = setTimeout(() => {
    ElMessage.closeAll();
    timeoutId = null;
  }, delay);
};
