import is from '@sindresorhus/is';
import { FullyPartial } from 'tsc-utils';

type R = object;

/**
 * Applies a patch to an object, modifying it in place.
 * @param target The item to patch
 * @param patch The patch to apply
 */
function patch<T extends R, U extends FullyPartial<T>>(target: T, patch: U): void {
    patchRecursive(target, patch);
}

const ILLEGAL_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

const isIllegalKey = (key: string): Boolean => ILLEGAL_KEYS.has(key)

const isProtoPath = (path: string[] | string): Boolean => Array.isArray(path)
  ? path.some(isIllegalKey)
  : typeof path === "string"
    ? isIllegalKey(path)
    : false

const disallowProtoPath = (path: string[] | string): void | never => {
  if (isProtoPath(path)) {
    throw new Error(`Unsafe path encountered: ${path.toString()}`)
  }
}

function patchRecursive(target: any, patch: any): any {
    const keys = Object.keys(patch);
    disallowProtoPath(keys);
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
