export const COLUMN_POST = [
  { prop: "title", label: "Title", search: { el: "input", label: "title" } },
  { prop: "tags", label: "Tags", search: { el: "select", label: "tags" } },
  { prop: "body", label: "Description", showOverflowTooltip: true, width: 320 },
  { prop: "date", label: "Create at", search: { el: "date", label: "date" } },
  { prop: "author", label: "Author", search: { el: "input", label: "author" } },
  { prop: "operations", label: "Operations", fixed: "right", width: 210 },
];
