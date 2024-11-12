import type { TableColumnProps } from "@/types";

export const ANIME_SEARCH_TYPE = [
  { id: "tv", name: "Tv" },
  { id: "movie", name: "Movie" },
  { id: "ova", name: "Ova" },
  { id: "special", name: "Special" },
  { id: "ona", name: "Ona" },
  { id: "music", name: "Music" },
  { id: "cm", name: "CM" },
  { id: "pv", name: "PV" },
  { id: "tv_special", name: "TV Special" },
];

export const ANIME_SEARCH_RANK = [
  { id: "g", name: "G - All Ages" },
  { id: "pg", name: "PG - Children" },
  { id: "pg13", name: "PG-13 - Teens 13 or older" },
  { id: "r17", name: "R - 17+ (violence & profanity)" },
  { id: "r", name: "R+ - Mild Nudity" },
  { id: "rx", name: "Rx - Hentai" },
];

export const COLUMN_ANIME: TableColumnProps[] = [
  { type: "selection", fixed: "left", width: 70 },
  { type: "sort", label: "Sort", width: 80 },
  { prop: "mal_id", label: "Id" },
  { prop: "images", label: "Image", width: 100 },
  { prop: "title", label: "Title", width: 180, showOverflowTooltip: true },
  { prop: "synopsis", label: "Description", showOverflowTooltip: true, width: 240 },
  { prop: "favorites", label: "Favorites", width: 100 },
  { prop: "rating", label: "Rating", width: 180, search: { el: "select", label: "rating" } },
  { prop: "score", label: "Score" },
  { prop: "type", label: "Type", search: { el: "select", label: "type", props: { filterable: true } } },
  { prop: "operations", label: "Operations", fixed: "right", width: 230 },
];
