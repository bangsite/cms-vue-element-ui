import { ElMessage } from "element-plus";

let timeoutId: ReturnType<typeof setTimeout> | null = null;

export const showNotification = (
  message: string,
  type: "error" | "success" | "info" | "warning" = "error",
  delay: number = 3000
) => {
  if (timeoutId !== null) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }

  ElMessage({ message, type, duration: delay });

  timeoutId = setTimeout(() => {
    ElMessage.closeAll();
    timeoutId = null;
  }, delay);
};
