interface Column {
  prop?: string;
  label?: string;
  type?: "input" | "select" | "date" | "sort" | "selection";
  width?: number;
  showOverflowTooltip?: boolean;
  fixed?: string;
  search?: { el: string; props?: Record<string, any> };
}

export const COLUMN_ANIME: Column[] = [
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
