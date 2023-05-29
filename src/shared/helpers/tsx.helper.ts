import type { Slots } from "vue";
import { isFunction } from "@/shared/utils/isCheck";

export const getSlot = (slots: Slots, slot = "default", data?: Recordable) => {
    // Reflect.has determines whether an object has a property
    if (!slots || !Reflect.has(slots, slot)) {
        return null;
    }

    if (!isFunction(slots[slot])) {
        console.error(`${slot} is not a function!`);
        return null;
    }

    const slotFn = slots[slot];
    if (!slotFn) return null;
    return slotFn(data);
};
