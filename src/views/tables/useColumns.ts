export const ColumnProps = [
  { type: "selection", fixed: "left", width: 70 },
  { type: "sort", label: "Sort", width: 80 },
  { prop: "name", label: "Name", align: "left" },
  { prop: "hotel_description", label: "Description", align: "left" },
  { prop: "number_of_rooms", label: "Rooms", width: 100 },
  { prop: "address", label: "Address", align: "left" },
  { prop: "currency", label: "Currency" },
  { prop: "zip", label: "Zip" },
  { prop: "operation", label: "Operation", fixed: "right", width: 260 },
];

export const COLUMNS_ALBUM = [
  { type: "selection", fixed: "left", width: 70 },
  { type: "sort", label: "Sort", width: 80 },
  { prop: "images", label: "Image" },
  { prop: "name", label: "Name" },
  { prop: "artists[0].name", label: "Artists", align: "left" },
  { prop: "total_tracks", label: "Total Tracks" },
  { prop: "release_date", label: "Release Date" },
  { prop: "operation", label: "Operation", fixed: "right", width: 260 },
];
