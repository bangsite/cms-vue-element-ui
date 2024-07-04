import {
  ElBadge,
  ElBreadcrumb,
  ElButton,
  ElCard,
  ElCheckbox,
  ElCol,
  ElCollapse,
  ElConfigProvider,
  ElContainer,
  ElDatePicker,
  ElDescriptions,
  ElDialog,
  ElDivider,
  ElDropdown,
  ElEmpty,
  ElForm,
  ElIcon,
  ElInfiniteScroll,
  ElInput,
  ElInputNumber,
  ElImage,
  ElLink,
  ElLoading,
  ElMenu,
  ElMessage,
  ElMessageBox,
  ElNotification,
  ElPageHeader,
  ElPagination,
  ElPopover,
  ElProgress,
  ElRadio,
  ElRow,
  ElScrollbar,
  ElSelect,
  ElSkeleton,
  ElSpace,
  ElStatistic,
  ElTable,
  ElTabs,
  ElTag,
  ElTimeline,
  ElTimePicker,
  ElTooltip,
  ElUpload,
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
    .use(ElDescriptions)
    .use(ElEmpty)
    .use(ElForm)
    .use(ElIcon)
    .use(ElInput)
    .use(ElInputNumber)
    .use(ElImage)
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
    .use(ElPopover);

  // Config global notification
  app.config.globalProperties.$notification = ElNotification;
}
