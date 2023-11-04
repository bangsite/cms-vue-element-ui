export const columnsTableBasic = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
  },
  {
    title: "Description",
    dataIndex: "hotel_description",
    key: "hotel_description",
    ellipsis: true,
  },

  {
    title: "Rooms",
    dataIndex: "number_of_rooms",
    key: "number_of_rooms",
    align: "center",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    ellipsis: true,
  },
  {
    title: "Currency",
    dataIndex: "currency",
    key: "currency",
    align: "center",
  },
  {
    title: "Zip",
    dataIndex: "zip",
    key: "zip",
  },
  {
    key: "action",
    title: "Action",
    align: "center",
  },
];

export const colHeaderDraggable = [
  { title: "", key: "", sortable: false },
  { title: "#", key: "", sortable: false },
  { title: "id", dataIndex: "id", key: "id", sortable: false },
  { title: "name", dataIndex: "name", key: "name", sortable: false },
  { title: "username", dataIndex: "username", key: "username", sortable: false },
  { title: "email", dataIndex: "email", key: "email", sortable: false },
  { title: "website", dataIndex: "website", key: "website", sortable: false },
  { title: "", key: "action", sortable: false },
];
