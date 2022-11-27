import decode from './decode';
import { map, set } from './transforms';

// encode() and normalize() call each other,
// and bundlers don't like circular dependencies.

export interface NormalizedObject {
	[field: string]: Normalized | string;
}

export interface NormalizedArray extends Array<Normalized | string> {
	[entry: number]: Normalized | string;
}

export type Normalized = NormalizedObject | NormalizedArray;

/**
 * Normalize object - remove un-JSON-able values
 * @param o The object you want normalized
 * @param stack Ignore this parameter
 * @returns a normalized object
 */
export function normalize_object(o: object, stack: object[] = []): Normalized {
	if (!stack?.length) stack = [o];
	if (o instanceof Array) {
		return o.map((a) =>
			typeof a === 'object'
				? normalize_object(a, [...stack, o])
				: decode(encode(a))
		);
	} else {
		const normalized: NormalizedObject = {};
		for (const [field, value] of Object.entries(o)) {
			if (value && typeof value === 'object') {
				if (stack.includes(value)) {
					normalized[field] = '<< RECURSION >>';
				} else {
					stack.push(value);
					if (value instanceof Map) {
						normalized[field] = normalize_object(map(value), stack);
					} else if (value instanceof Set) {
						normalized[field] = normalize_object(set(value), stack);
					} else {
						normalized[field] = normalize_object(value, stack);
					}
					stack.pop();
				}
			} else {
				normalized[field] = decode(encode(value));
			}
		}
		return normalized;
	}
}

/**
 * Encode an annoying thing
 *
 * Deals with recursive objects, symbols, etc.
 *
 * @param thing Some thing
 * @returns the JSON reprezentation of the thing
 */
export function encode(thing: any): string {
	if (thing instanceof Map) return encode(map(thing));
	if (thing instanceof Set) return encode(set(thing));
	if (
		typeof thing === 'boolean' ||
		typeof thing === 'number' ||
		typeof thing === 'bigint'
	) {
		return `${thing}`;
	} else if (
		typeof thing === 'string' ||
		typeof thing === 'symbol' ||
		typeof thing === 'function'
	) {
		return JSON.stringify(thing.toString());
	} else if (thing && typeof thing === 'object') {
		return JSON.stringify(normalize_object(thing), null, '\t') + '\n';
	} else {
		return 'null';
	}
}
