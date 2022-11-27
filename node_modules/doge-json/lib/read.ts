import fs from './fs-polyfill';

import path from 'path';

/**
 * Read and parse a JSON file
 * @param file path to file
 * @returns the object
 */
function read(file: string): any {
	try {
		if (!fs.existsSync(file)) {
			const dir = path.resolve(file, '..');
			const base = path.basename(file);
			const rd = fs.readdirSync(dir).filter((a: string) => a.includes(base));
			if (rd.length) {
				for (const filename of rd) {
					const tfile = path.resolve(dir, filename);
					const stat = fs.statSync(tfile);
					if (!stat.isDirectory()) {
						file = tfile;
						break;
					}
				}
			}
		}
		if (fs.existsSync(file)) {
			var data = fs.readFileSync(file)?.toString() || 'null';
			try {
				data = JSON.parse(data);
			} catch (e) {}
			return data;
		} else return null;
	} catch (error) {
		return null;
	}
}

Object.defineProperties(read, {
	default: { get: () => read },
	read: { get: () => read },
});

export = read;
