export const COLUMNS_ANIME = [
  { type: "selection", fixed: "left", width: 70 },
  { type: "sort", label: "Sort", width: 80 },
  { prop: "mal_id", label: "Id" },
  { prop: "images", label: "Image" },
  { prop: "title", label: "Title", width: 150, search: { el: "input" } },
  { prop: "background", label: "Description", showOverflowTooltip: true, width: 200 },
  { prop: "favorites", label: "Favorites" },
  { prop: "score", label: "Score" },
  { prop: "rank", label: "Rank" },
  { prop: "type", label: "Type", search: { el: "select", props: { filterable: true } } },
  { prop: "operation", label: "Operation", fixed: "right", width: 260 },
];
