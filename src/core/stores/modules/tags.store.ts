import type { UnwrapRef } from "vue";
import router from "@/router";
import { defineStore } from "pinia";
import { store } from "@/plugins/pinia";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import { findIndex } from "@/shared/utils/findIndex";
import { getRawRoute } from "@/shared/helpers/router.helper";

export interface TagsViewState {
  visitedViews: RouteLocationNormalizedLoaded[];
  cachedViews: Set<string>;
}

export const useTagsViewStore = defineStore("tagsView", {
    state: (): TagsViewState => ({
        visitedViews: [],
        cachedViews: new Set(),
    }),

    getters: {
        getVisitedViews(): UnwrapRef<TagsViewState["visitedViews"]> {
            return this.visitedViews;
        },
        getCachedViews(): string[] {
            return Array.from(this.cachedViews);
        },
    },

    actions: {
    // Add cache and tag
        addView(view: RouteLocationNormalizedLoaded): void {
            this.addVisitedView(view);
            this.addCachedView();
        },
        // Add tag
        addVisitedView(view: RouteLocationNormalizedLoaded) {
            if (this.visitedViews.some((v) => v.path === view.path)) return;
            if (view.meta?.noTagsView) return;
            this.visitedViews.push(
                Object.assign({}, view, {
                    title: view.meta?.title || "no-name",
                })
            );
        },
        // add cache
        addCachedView() {
            const cacheMap: Set<string> = new Set();
            for (const v of this.visitedViews) {
                const item = getRawRoute(v as RouteLocationNormalizedLoaded);
                const needCache = !item.meta?.noCache;
                if (!needCache) {
                    continue;
                }
                const name = item.name as string;
                cacheMap.add(name);
            }
            if (Array.from(this.cachedViews).sort().toString() === Array.from(cacheMap).sort().toString()) return;
            this.cachedViews = cacheMap;
        },
        // delete a
        delView(view: RouteLocationNormalizedLoaded) {
            this.delVisitedView(view);
            this.addCachedView();
        },
        // delete tag
        delVisitedView(view: RouteLocationNormalizedLoaded) {
            for (const [i, v] of this.visitedViews.entries()) {
                if (v.path === view.path) {
                    this.visitedViews.splice(i, 1);
                    break;
                }
            }
        },
        // delete cache
        delCachedView() {
            const route = router?.currentRoute.value;
            const index = findIndex<string>(this.getCachedViews, (v) => v === route.name);
            if (index > -1) {
                this.cachedViews.delete(this.getCachedViews[index]);
            }
        },
        // delete all caches and tags
        delAllViews() {
            this.delAllVisitedViews();
            this.addCachedView();
        },
        delAllVisitedViews() {
            // const affixTags = this.visitedViews.filter((tag) => tag.meta.affix)
            this.visitedViews = [];
        },
        delOthersViews(view: RouteLocationNormalizedLoaded) {
            this.delOthersVisitedViews(view);
            this.addCachedView();
        },

        delOthersVisitedViews(view: RouteLocationNormalizedLoaded) {
            this.visitedViews = this.visitedViews.filter((v) => {
                return v?.meta?.affix || v.path === view.path;
            });
        },
        // delete the left side
        delLeftViews(view: RouteLocationNormalizedLoaded) {
            const index = findIndex<RouteLocationNormalizedLoaded>(this.visitedViews, (v) => v.path === view.path);
            if (index > -1) {
                this.visitedViews = this.visitedViews.filter((v, i) => {
                    return v?.meta?.affix || v.path === view.path || i > index;
                });
                this.addCachedView();
            }
        },
        // remove the right side
        delRightViews(view: RouteLocationNormalizedLoaded) {
            const index = findIndex<RouteLocationNormalizedLoaded>(this.visitedViews, (v) => v.path === view.path);
            if (index > -1) {
                this.visitedViews = this.visitedViews.filter((v, i) => {
                    return v?.meta?.affix || v.path === view.path || i < index;
                });
                this.addCachedView();
            }
        },

        updateVisitedView: function (view: RouteLocationNormalizedLoaded) {
            for (let v of this.visitedViews) {
                if (v.path === view.path) {
                    v = Object.assign(v, view);
                    break;
                }
            }
        },
    },
});

export const useTagsViewStoreWithOut = () => {
    return useTagsViewStore(store);
};
