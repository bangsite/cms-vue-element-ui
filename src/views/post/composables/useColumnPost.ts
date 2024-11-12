export const COLUMN_POST = [
  { prop: "title", label: "Title", width: 150, search: { el: "input", label: "title" } },
  { prop: "tags", label: "Tags", width: 150, search: { el: "select", label: "tags" } },
  { prop: "body", label: "Description", showOverflowTooltip: true, width: 320 },
  { prop: "date", label: "Create at", width: 100, search: { el: "date", label: "date" } },
  { prop: "author", label: "Author", search: { el: "input", label: "author" } },
  { prop: "operations", label: "Operations", fixed: "right", width: 210 },
];
