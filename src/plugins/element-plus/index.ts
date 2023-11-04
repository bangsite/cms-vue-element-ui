import "element-plus/dist/index.css";
import {
  ElBreadcrumb,
  ElButton,
  ElBadge,
  ElCard,
  ElConfigProvider,
  ElCheckbox,
  ElCol,
  ElCollapse,
  ElContainer,
  ElDatePicker,
  ElDialog,
  ElDivider,
  ElDropdown,
  ElForm,
  ElIcon,
  ElInput,
  ElInputNumber,
  ElLink,
  ElMenu,
  ElPageHeader,
  ElPagination,
  ElProgress,
  ElRadio,
  ElRow,
  ElSelect,
  ElSkeleton,
  ElScrollbar,
  ElSpace,
  ElStatistic,
  ElTable,
  ElTag,
  ElTabs,
  ElTimePicker,
  ElTimeline,
  ElTooltip,
  ElUpload,
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
  ElPopover,
} from "element-plus";
import type { App } from "vue";

export function libElementPlus(app: App<Element>) {
  app
    .use(ElBreadcrumb)
    .use(ElButton)
    .use(ElBadge)
    .use(ElCard)
    .use(ElCheckbox)
    .use(ElCol)
    .use(ElCollapse)
    .use(ElContainer)
    .use(ElDatePicker)
    .use(ElDialog)
    .use(ElDivider)
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
    .use(ElRow)
    .use(ElScrollbar)
    .use(ElSelect)
    .use(ElSkeleton)
    .use(ElSpace)
    .use(ElStatistic)
    .use(ElTag)
    .use(ElTable)
    .use(ElTabs)
    .use(ElTimePicker)
    .use(ElTimeline)
    .use(ElTooltip)
    .use(ElUpload)
    .use(ElInfiniteScroll)
    .use(ElLoading)
    .use(ElMessage)
    .use(ElMessageBox)
    .use(ElNotification)
    .use(ElConfigProvider)
    .use(ElNotification)
    .use(ElPopover);

  // Config global notification
  app.config.globalProperties.$notification = ElNotification;
}
