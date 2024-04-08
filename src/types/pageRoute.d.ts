declare namespace PageRoute {
  /**
   * the root route key
   * @translate Root route
   */
  type RootRouteKey = "root";

  /**
   * the not found route, which catch the invalid route path
   * @translate Route not found (catch route for invalid path)
   */
  type NotFoundRouteKey = "not-found";

  /**
   * the route key
   * @translate Page routing
   */
  type RouteKey =
    | "403"
    | "404"
    | "500"
    | "constant-page"
    | "login"
    | "not-found"
    | "about"
    | "auth-demo"
    | "auth-demo_permission"
    | "auth-demo_super"
    | "component"
    | "component_button"
    | "component_card"
    | "component_table"
    | "dashboard"
    | "dashboard_analysis"
    | "dashboard_workbench"
    | "document"
    | "document_naive"
    | "document_project-link"
    | "document_project"
    | "document_vite"
    | "document_vue"
    | "exception"
    | "exception_403"
    | "exception_404"
    | "exception_500"
    | "function"
    | "function_tab-detail"
    | "function_tab-multi-detail"
    | "function_tab"
    | "management"
    | "management_auth"
    | "management_role"
    | "management_route"
    | "management_user"
    | "multi-menu"
    | "multi-menu_first"
    | "multi-menu_first_second-new"
    | "multi-menu_first_second-new_third"
    | "multi-menu_first_second"
    | "plugin"
    | "plugin_charts"
    | "plugin_charts_antv"
    | "plugin_charts_echarts"
    | "plugin_copy"
    | "plugin_editor"
    | "plugin_editor_markdown"
    | "plugin_editor_quill"
    | "plugin_icon"
    | "plugin_map"
    | "plugin_print"
    | "plugin_swiper"
    | "plugin_video";

  /**
   * last degree route key, which has the page file
   * @translate The last level of routing (this level has a corresponding page file)
   */
  type LastDegreeRouteKey = Extract<
    RouteKey,
    | "403"
    | "404"
    | "500"
    | "constant-page"
    | "login"
    | "not-found"
    | "about"
    | "auth-demo_permission"
    | "auth-demo_super"
    | "component_button"
    | "component_card"
    | "component_table"
    | "dashboard_analysis"
    | "dashboard_workbench"
    | "document_naive"
    | "document_project-link"
    | "document_project"
    | "document_vite"
    | "document_vue"
    | "exception_403"
    | "exception_404"
    | "exception_500"
    | "function_tab-detail"
    | "function_tab-multi-detail"
    | "function_tab"
    | "management_auth"
    | "management_role"
    | "management_route"
    | "management_user"
    | "multi-menu_first_second-new_third"
    | "multi-menu_first_second"
    | "plugin_charts_antv"
    | "plugin_charts_echarts"
    | "plugin_copy"
    | "plugin_editor_markdown"
    | "plugin_editor_quill"
    | "plugin_icon"
    | "plugin_map"
    | "plugin_print"
    | "plugin_swiper"
    | "plugin_video"
  >;
}
