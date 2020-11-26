import is, { Primitive } from '@sindresorhus/is';

type R = object;

export type FullyPartial<T> = {
    [P in keyof T]?:
    T[P] extends (infer U)[] ? FullyPartial<U>[] :
    T[P] extends Primitive ? T[P] :
    FullyPartial<T[P]>;
};

/**
 * Applies a patch to an object, modifying it in place.
 * @param target The item to patch
 * @param patch The patch to apply
 */
function patch<T extends R, U extends FullyPartial<T>>(target: T, patch: U) {
    patchRecursive(target, patch);
}

function patchRecursive(target: any, patch: any): any {
    const keys = Object.keys(patch);
    for (const key of keys) {
        if (is.primitive(target[key]) || is.array(target[key])) {
            target[key] = patch[key];
        }
        else if (patch[key] === null) {
            target[key] = null;
        }
        else {
            patchRecursive(target[key], patch[key]);
        }
    }
}


export { patch }
