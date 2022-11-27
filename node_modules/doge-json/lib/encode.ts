import { encode } from './normalize-and-encode';

Object.defineProperties(encode, {
	default: { get: () => encode },
	encode: { get: () => encode },
});

export = encode;
