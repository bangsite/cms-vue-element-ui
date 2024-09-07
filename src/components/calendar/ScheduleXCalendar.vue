<template>
  <div class="p-4">
    <div class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <!--        <p>{{ dateYMD(filterDate, "YYYY年MM月DD日") }}～{{ calDateFormat(filterDate) }}</p>-->
        <!--        <p>空室状況</p>-->
        <!--      </div>-->
        <!--      <div class="calendar-availability__header__control">-->
        <!--        <el-button v-if="isShowBtnPreviousMonth" class="btn btn-previous-month" @click="handlePreviousMonth"-->
        <!--          >«先月-->
        <!--        </el-button>-->
        <!--        >-->
        <!--        <el-button v-if="isShowBtnPreviousTwoWeek" class="btn btn-previous-week" @click="handlePreviousTwoWeek">-->
        <!--          ‹14日前-->
        <!--        </el-button>-->
        <!--        >-->
        <!--        <el-button v-if="isShowBtnNextTwoWeek" class="btn btn-next-week" @click="handleNextTwoWeek">14日後› </el-button>-->
        <!--        >-->
        <!--        <el-button v-if="isShowBtnNextMonth" class="btn btn-next-month" @click="handleNextMonth">次月» </el-button>-->
      </div>
    </div>
    <div class="calendar-availability__inner">
      <div class="calendar-availability__scroll">
        <table class="calendar-availability">
          <tr class="calendar-availability__head">
            <td rowspan="2" class="bg-light-blue">区分</td>
            <td rowspan="2" class="bg-light-blue">時間帯</td>
            <!--            <td v-for="(item, index) in dataHeader()" :key="index" class="bg-light-blue">-->
            <!--              {{ formatDate(item, "DD") + "日" }}-->
            <!--            </td>-->
          </tr>
          <tr class="calendar-availability__head">
            <!--            <td v-for="(item, index) in dataHeader()" :key="index" class="bg-light-blue" v-html="getWeekdays(item)" />-->
          </tr>
          <!--          <tr v-for="(blockTime, blockTimeIndex) in props.dataCalendar.listBlockTime" :key="blockTimeIndex">-->
          <!--            &lt;!&ndash;Koma name&ndash;&gt;-->
          <!--            <td class="bg-light-blue">{{ blockTime.label }}</td>-->

          <!--            &lt;!&ndash; Koma  &ndash;&gt;-->
          <!--            <td class="bg-light-blue">{{ blockTime.displayStartAt + " ～ " + blockTime.displayEndAt }}</td>-->

          <!--            &lt;!&ndash; Item &ndash;&gt;-->
          <!--            <template v-for="(history, indexHistory) in props.dataCalendar.listHistories" :key="indexHistory">-->
          <!--              <template v-if="blockTime.id === history.blockTimeId">-->
          <!--                <td-->
          <!--                  v-for="(item, date) in history.data"-->
          <!--                  :key="date"-->
          <!--                  class="tc-body-event"-->
          <!--                  :class="handleClassNameCalendar(item, date, blockTime)"-->
          <!--                  @click="handleClickCalendar(blockTime.id, date)"-->
          <!--                >-->
          <!--                  {{ handleRenderItem(item, date, blockTime) }}-->
          <!--                </td>-->
          <!--              </template>-->
          <!--            </template>-->
          <!--          </tr>-->
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
</script>

<style lang="scss" scoped>
.btn-edit {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
</style>
