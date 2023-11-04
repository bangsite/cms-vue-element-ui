/*
 * Deep copy function for TypeScript.
 * @param T Generic type of target/copied value.
 * @param target Target value to be copied.
 * @see Source project, ts-deeply https://github.com/ykdr2017/ts-deepcopy
 * @see Code pen https://codepen.io/erikvullings/pen/ejyBYg
 */
export const deepCopy = <T>(target: T): T => {
    if (target === null) {
        return target;
    }
    if (target instanceof Date) {
        return new Date(target.getTime()) as any;
    }
    // First part is for array and second part is for Realm.Collection
    // if (target instanceof Array || typeof (target as any).type === 'string') {
    if (typeof target === "object") {
        if (typeof (target as { [key: string]: any })[(Symbol as any).iterator] === "function") {
            const cp = [] as any[];
            if ((target as any as any[]).length > 0) {
                for (const arrayMember of target as any as any[]) {
                    cp.push(deepCopy(arrayMember));
                }
            }
            return cp as any as T;
        } else {
            const targetKeys = Object.keys(target);
            const cp = {} as { [key: string]: any };
            if (targetKeys.length > 0) {
                for (const key of targetKeys) {
                    cp[key] = deepCopy((target as { [key: string]: any })[key]);
                }
            }
            return cp as T;
        }
    }
    // Means that object is atomic
    return target;
};


export const set = (obj: any, path: string | Array<string>, value: any): void => {
    const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);

    if (pathArray && pathArray.length)
        pathArray.reduce((acc: any, key: string, i: number) => {
            if (acc[key] === undefined) acc[key] = {};
            if (i === pathArray.length - 1) acc[key] = value;
            return acc[key];
        }, obj);
};

export const omit = (obj: Record<string, any>, props: string[]): Record<string, any> => {
    obj = { ...obj };
    props.forEach((prop: string) => delete obj[prop]);
    return obj;
};




