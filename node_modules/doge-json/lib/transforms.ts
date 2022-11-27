/**
 * convert Map to object
 * @param map the Map
 * @returns the new object
 */
export function map<V>(map: Map<string, V>) {
	const r: {
		[f: string]: any;
	} = {};
	for (const [k, v] of map.entries()) {
		r[k] = v;
	}
	return r;
}

/**
 * convert Set to Array
 * @param set the Set
 * @returns the new Array
 */
export function set(set: Set<any>) {
	return [...set];
}
