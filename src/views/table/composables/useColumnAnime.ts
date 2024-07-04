export const COLUMN_ANIME = [
  { type: "selection", fixed: "left", width: 70 },
  { type: "sort", label: "Sort", width: 80 },
  { prop: "mal_id", label: "Id" },
  { prop: "images", label: "Image", width: 100 },
  { prop: "title", label: "Title", width: 180, showOverflowTooltip: true, search: { el: "input" } },
  { prop: "synopsis", label: "Description", showOverflowTooltip: true, width: 240 },
  { prop: "favorites", label: "Favorites" },
  { prop: "score", label: "Score" },
  { prop: "rank", label: "Rank" },
  { prop: "type", label: "Type", search: { el: "select", props: { filterable: true } } },
  { prop: "operations", label: "Operations", fixed: "right", width: 230 },
];
