import { normalize_object } from './normalize-and-encode';

Object.defineProperties(normalize_object, {
	default: { get: () => normalize_object },
	normalize_object: { get: () => normalize_object },
});

export = normalize_object;
