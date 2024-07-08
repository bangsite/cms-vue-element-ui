<template>
  <div class="p-4">
    <div class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <p>{{ dateYMD(filterDate, "YYYY年MM月DD日") }}～{{ calDateFormat(filterDate) }}</p>
        <p>空室状況</p>
      </div>
      <div class="calendar-availability__header__control">
        <el-button v-if="isShowBtnPreviousMonth" class="btn btn-previous-month" @click="handlePreviousMonth"
          >«先月
        </el-button>
        >
        <el-button v-if="isShowBtnPreviousTwoWeek" class="btn btn-previous-week" @click="handlePreviousTwoWeek">
          ‹14日前
        </el-button>
        >
        <el-button v-if="isShowBtnNextTwoWeek" class="btn btn-next-week" @click="handleNextTwoWeek">14日後› </el-button>
        >
        <el-button v-if="isShowBtnNextMonth" class="btn btn-next-month" @click="handleNextMonth">次月» </el-button>
      </div>
    </div>
    <div class="calendar-availability__inner">
      <div class="calendar-availability__scroll">
        <table class="calendar-availability">
          <tr class="calendar-availability__head">
            <td rowspan="2" class="bg-light-blue">区分</td>
            <td rowspan="2" class="bg-light-blue">時間帯</td>
            <td v-for="(item, index) in dataHeader()" :key="index" class="bg-light-blue">
              {{ formatDate(item, "DD") + "日" }}
            </td>
          </tr>
          <tr class="calendar-availability__head">
            <td v-for="(item, index) in dataHeader()" :key="index" class="bg-light-blue" v-html="getWeekdays(item)" />
          </tr>
          <tr v-for="(blockTime, blockTimeIndex) in props.dataCalendar.listBlockTime" :key="blockTimeIndex">
            <!--Koma name-->
            <td class="bg-light-blue">{{ blockTime.label }}</td>

            <!-- Koma  -->
            <td class="bg-light-blue">{{ blockTime.displayStartAt + " ～ " + blockTime.displayEndAt }}</td>

            <!-- Item -->
            <template v-for="(history, indexHistory) in props.dataCalendar.listHistories" :key="indexHistory">
              <template v-if="blockTime.id === history.blockTimeId">
                <td
                  v-for="(item, date) in history.data"
                  :key="date"
                  class="tc-body-event"
                  :class="handleClassNameCalendar(item, date, blockTime)"
                  @click="handleClickCalendar(blockTime.id, date)"
                >
                  {{ handleRenderItem(item, date, blockTime) }}
                </td>
              </template>
            </template>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import dayjs from "dayjs";

// import { useStore } from "vuex";
// import { COOKIES_KEY } from "@/enums/cookie.enum";
// import Cookie from "js-cookie";
import { dateYMD, getWeekdays } from "@/utils";

const props = defineProps({
  dataCalendar: {
    type: [Object, String],
    default: () => {},
  },
});

const emits = defineEmits(["handleCreateHistory", "handleShowModalConfirm", "handleFetchHistoryRoomBooking"]);

// const store = useStore();
const isShowBtnPreviousMonth = ref(false);
const isShowBtnPreviousTwoWeek = ref(false);
const isShowBtnNextMonth = ref(true);
const isShowBtnNextTwoWeek = ref(true);

const calDateFormat = (date) => {
  const dateFormat = dateYMD(date, "YYYY-MM-DD").add(13, "day");
  return dateYMD(dateFormat, "YYYY年MM月DD日");
};

const filterDate = computed(() => {
  return store.getters["room/filterRoom"]?.date || dayjs().format("YYYY-MM-DD");
});

const dataHeader = () => {
  if (props.dataCalendar.listHistories.length < 1) {
    return false;
  }

  const arrDate = [];

  Object.keys(props.dataCalendar.listHistories?.[0]?.data).forEach((item) => {
    arrDate.push(dayjs(item, "YYYYMMDD").format("YYYY-MM-DD"));
  });

  return arrDate;
};

const dataBody = () => {
  if (props.dataCalendar.listHistories.length < 1) {
    return false;
  }
};

const handleClassNameCalendar = (item, date, blockTime) => {
  const isToday = dayjs().isSame(dayjs(date, "YYYYMMDD"), "days");
  const arrClassName = [];

  if (item?.status === 1 || (item?.status === 2 && item?.key === 0)) {
    arrClassName.push("tc-booking-unavailable");
  }

  if (dayjs(date, "YYYYMMDD").day() === 0 || (isToday && !blockTime.status)) {
    arrClassName.push("tc-body-block");
  }

  if (item?.status === 2 && item?.key === 1) {
    arrClassName.push("tc-booking");
  }

  return arrClassName;
};

const handleRenderItem = (item, date, blockTime) => {
  const isToday = dayjs().isSame(dayjs(date, "YYYYMMDD"), "days");
  if (dayjs(date, "YYYYMMDD").day() === 0 || (isToday && !blockTime.status)) {
    return "×";
  }

  return item?.status === 1 || (item?.status === 2 && item?.key === 0) ? "×" : "○";
};

const handleDisableControl = (date) => {
  const diffTwoWidth = dayjs(date).subtract(2, "w").diff(dayjs(), "d");
  const diffMonth = dayjs(date).subtract(1, "months").diff(dayjs(), "d");
  isShowBtnPreviousTwoWeek.value = diffTwoWidth > -14;
  isShowBtnPreviousMonth.value = diffMonth >= 0;
};

const handlePreviousTwoWeek = () => {
  const arrKey = Object.keys(props.dataCalendar.listHistories[0].data);
  let date = dayjs(arrKey[0], "YYYYMMDD").subtract(2, "week").format("YYYY-MM-DD");
  const diffTwoWidth = dayjs(date).subtract(2, "w").diff(dayjs(), "d");
  handleDisableControl(date);
  if (diffTwoWidth < 0) {
    date = dayjs().format("YYYY-MM-DD");
  }
  emits("handleFetchHistoryRoomBooking", date);
};

const handleNextTwoWeek = () => {
  const arrKey = Object.keys(props.dataCalendar.listHistories[0].data);
  const indexLastItem = arrKey.length - 1;
  const date = dayjs(arrKey[indexLastItem], "YYYYMMDD").add(1, "d").format("YYYY-MM-DD");
  handleDisableControl(date);
  emits("handleFetchHistoryRoomBooking", date);
};

const handlePreviousMonth = () => {
  const arrKey = Object.keys(props.dataCalendar.listHistories[0].data);
  let date = dayjs(arrKey[0], "YYYYMMDD").subtract(1, "months").format("YYYY-MM-DD");
  const diffMonth = dayjs(date).subtract(1, "months").diff(dayjs(), "d");
  if (diffMonth < 0) {
    date = dayjs().format("YYYY-MM-DD");
  }
  handleDisableControl(date);
  emits("handleFetchHistoryRoomBooking", date);
};

const handleNextMonth = () => {
  const arrKey = Object.keys(props.dataCalendar.listHistories[0].data);
  const date = dayjs(arrKey[0], "YYYYMMDD").add(1, "months").format("YYYY-MM-DD");
  handleDisableControl(date);
  emits("handleFetchHistoryRoomBooking", date);
};

const handleClickCalendar = async (blockTimeId, date) => {
  if (Cookie.get(COOKIES_KEY.HISTORY)) {
    // handle Show modal Confirm
    emits("handleShowModalConfirm", true);
  } else {
    // handle Create History
    date = dayjs(date, "YYYY-MM-DD").format("YYYY-MM-DD");
    emits("handleCreateHistory", {
      blockTimeId: blockTimeId,
      date: date,
    });
  }
};
</script>

<style lang="scss" scoped>
.btn-edit {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
</style>
