import "element-plus/dist/index.css";
import {
  ElBreadcrumb,
  ElButton,
  ElConfigProvider,
  ElCheckbox,
  ElCol,
  ElContainer,
  ElDatePicker,
  ElDropdown,
  ElForm,
  ElIcon,
  ElInput,
  ElInputNumber,
  ElLink,
  ElMenu,
  ElOverlay,
  ElPageHeader,
  ElPagination,
  ElProgress,
  ElRadio,
  ElSelect,
  ElSkeleton,
  ElTable,
  ElTimePicker,
  ElUpload,
  ElInfiniteScroll,
  ElLoading,
  ElNotification,
  ElPopover,
} from "element-plus";
import type { App } from "vue";

export function libElementPlus(app: App<Element>) {
  app
    .use(ElBreadcrumb)
    .use(ElButton)
    .use(ElCheckbox)
    .use(ElCol)
    .use(ElContainer)
    .use(ElDatePicker)
    .use(ElDropdown)
    .use(ElForm)
    .use(ElIcon)
    .use(ElInput)
    .use(ElInputNumber)
    .use(ElLink)
    .use(ElMenu)
    .use(ElPageHeader)
    .use(ElPagination)
    .use(ElProgress)
    .use(ElRadio)
    .use(ElSelect)
    .use(ElSkeleton)
    .use(ElTable)
    .use(ElTimePicker)
    .use(ElUpload)
    .use(ElInfiniteScroll)
    .use(ElLoading)
    .use(ElNotification)
    .use(ElConfigProvider)
    .use(ElNotification)
    .use(ElPopover);

  // Config global notification
  app.config.globalProperties.$notification = ElNotification;
}
