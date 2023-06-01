import type { EChartsOption } from "echarts";
import { useI18n } from "@/hooks/web/useI18n";

const { t } = useI18n();

export const lineOptions: EChartsOption = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
  legend: {
    data: ["Downloads", "Registrations"],
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00", "24:00"],
    },
  ],

  yAxis: [
    {
      type: "value",
    },
  ],

  series: [
    {
      color: "#8e9dff",
      name: "Downloads",
      type: "line",
      smooth: true,
      stack: "Total",
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0.25,
              color: "#8e9dff",
            },
            {
              offset: 1,
              color: "#fff",
            },
          ],
        },
      },
      emphasis: {
        focus: "series",
      },
      data: [4623, 6145, 6268, 6411, 1890, 4251, 2978, 3880, 3606, 4311],
    },
    {
      color: "#26deca",
      name: "Registrations",
      type: "line",
      smooth: true,
      stack: "Total",
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0.25,
              color: "#26deca",
            },
            {
              offset: 1,
              color: "#fff",
            },
          ],
        },
      },
      emphasis: {
        focus: "series",
      },
      data: [2208, 2016, 2916, 4512, 8281, 2008, 1963, 2367, 2956, 678],
    },
  ],
};

export const pieOptions: EChartsOption = {
  // title: {
  //   text: "Pie Chart",
  //   left: "center",
  // },
  tooltip: {
    trigger: "item",
    padding: [5, 10],
  },
  legend: {
    bottom: "1%",
    left: "center",
    itemStyle: {
      borderWidth: 0,
    },
  },
  series: [
    {
      color: ["#5da8ff", "#8e9dff", "#fedc69", "#26deca"],
      name: "Schedule",
      type: "pie",
      radius: ["45%", "75%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 1,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "12",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 20, name: "Learning" },
        { value: 10, name: "Entertainment" },
        { value: 30, name: "Work" },
        { value: 40, name: "Rest" },
      ],
    },
  ],
};

export const barOptions: EChartsOption = {
  title: {
    text: t("analysis.weeklyUserActivity"),
    left: "center",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  grid: {
    left: 50,
    right: 20,
    bottom: 20,
  },
  xAxis: {
    type: "category",
    data: [
      t("analysis.monday"),
      t("analysis.tuesday"),
      t("analysis.wednesday"),
      t("analysis.thursday"),
      t("analysis.friday"),
      t("analysis.saturday"),
      t("analysis.sunday"),
    ],
    axisTick: {
      alignWithLabel: true,
    },
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: t("analysis.activeQuantity"),
      data: [13253, 34235, 26321, 12340, 24643, 1322, 1324],
      type: "bar",
    },
  ],
};

export const radarOption: EChartsOption = {
  legend: {
    data: [t("workplace.personal"), t("workplace.team")],
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: t("workplace.quote"), max: 65 },
      { name: t("workplace.contribution"), max: 160 },
      { name: t("workplace.hot"), max: 300 },
      { name: t("workplace.yield"), max: 130 },
      { name: t("workplace.follow"), max: 100 },
    ],
  },
  series: [
    {
      name: `xxx${t("workplace.index")}`,
      type: "radar",
      data: [
        {
          value: [42, 30, 20, 35, 80],
          name: t("workplace.personal"),
        },
        {
          value: [50, 140, 290, 100, 90],
          name: t("workplace.team"),
        },
      ],
    },
  ],
};

export const wordOptions = {
  series: [
    {
      type: "wordCloud",
      gridSize: 2,
      sizeRange: [12, 50],
      rotationRange: [-90, 90],
      shape: "pentagon",
      width: 600,
      height: 400,
      drawOutOfBound: true,
      textStyle: {
        color: function () {
          return (
            "rgb(" +
            [Math.round(Math.random() * 160), Math.round(Math.random() * 160), Math.round(Math.random() * 160)].join(
              ","
            ) +
            ")"
          );
        },
      },
      emphasis: {
        textStyle: {
          shadowBlur: 10,
          shadowColor: "#333",
        },
      },
      data: [
        {
          name: "Sam S Club",
          value: 10000,
          textStyle: {
            color: "black",
          },
          emphasis: {
            textStyle: {
              color: "red",
            },
          },
        },
        {
          name: "Macys",
          value: 6181,
        },
        {
          name: "Amy Schumer",
          value: 4386,
        },
        {
          name: "Jurassic World",
          value: 4055,
        },
        {
          name: "Charter Communications",
          value: 2467,
        },
        {
          name: "Chick Fil A",
          value: 2244,
        },
        {
          name: "Planet Fitness",
          value: 1898,
        },
        {
          name: "Pitch Perfect",
          value: 1484,
        },
        {
          name: "Express",
          value: 1112,
        },
        {
          name: "Home",
          value: 965,
        },
        {
          name: "Johnny Depp",
          value: 847,
        },
        {
          name: "Lena Dunham",
          value: 582,
        },
        {
          name: "Lewis Hamilton",
          value: 555,
        },
        {
          name: "KXAN",
          value: 550,
        },
        {
          name: "Mary Ellen Mark",
          value: 462,
        },
        {
          name: "Farrah Abraham",
          value: 366,
        },
        {
          name: "Rita Ora",
          value: 360,
        },
        {
          name: "Serena Williams",
          value: 282,
        },
        {
          name: "NCAA baseball tournament",
          value: 273,
        },
        {
          name: "Point Break",
          value: 265,
        },
      ],
    },
  ],
};
