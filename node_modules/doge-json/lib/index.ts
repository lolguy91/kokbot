import decode from './decode';

import { encode, normalize_object } from './normalize-and-encode';

import read from './read';
import write from './write';

import fs from './fs-polyfill';

export { encode, decode, fs, normalize_object, read, write };

export default { encode, decode, fs, normalize_object, read, write };
