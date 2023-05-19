const navigationList = [
  {
    id: "dashboard",
    title: "MENU.DASHBOARD",
    routeName: "dashboard",
    icon: "HomeOutlined",
  },
  {
    id: "order",
    title: "MENU.ORDERS",
    routeName: "order-list",
    icon: "ShoppingCartOutlined",
  },
  {
    id: "category",
    title: "MENU.CATEGORY",
    icon: "AlignCenterOutlined",
    children: [
      {
        id: "category-list",
        title: "MENU.CATEGORY_LIST",
        routeName: "category-list",
      },
    ],
  },
  {
    id: "products",
    title: "MENU.PRODUCTS",
    icon: "FilterOutlined",
    children: [
      {
        id: "products-list",
        title: "MENU.PRODUCTS_LIST",
        routeName: "products-list",
      },
      {
        id: "products-create",
        title: "MENU.PRODUCTS_CREATE",
        routeName: "products-create",
      },
    ],
  },
];

export default navigationList;
