import { encode } from './normalize-and-encode';
import fs from './fs-polyfill';
import path from 'path';

/**
 * Write any object to a file as JSON
 * @param file Path to file
 * @param data Data you want to write
 */
function write(file: string, data: any) {
	if (!file.includes('.')) file = `${file}.json`;
	const directory = path.resolve(file, '..');
	if (!fs.existsSync(directory)) fs.mkdirSync(directory, { recursive: true });
	const data_str = encode(data);
	try {
		const current = fs.readFileSync(file).toString();
		if (current === data_str) {
			return;
		}
	} catch (error) {
		// file probably doesn't exist
	}
	fs.writeFileSync(file, data_str);
}

Object.defineProperties(write, {
	default: { get: () => write },
	write: { get: () => write },
});

export = write;
