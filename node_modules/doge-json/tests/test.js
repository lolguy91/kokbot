const fs = require('fs');
const J = require('..');

const a = [
	'Hello',
	'Sunny',
	'Funny',
	'World',
	123,
	456,
	7.89,
	[{ foo: 'bar' }, { fizz: 'buzz' }],
];

module.exports = () => {
	if (JSON.stringify(J.decode(J.encode(a))) !== JSON.stringify(a)) {
		throw new Error('Test failed: Inconsistant encoding!');
	}
	if (
		JSON.stringify(J.read('package.json')) !==
		JSON.stringify(JSON.parse(fs.readFileSync('package.json', 'utf8')))
	) {
		throw new Error('Test failed: package.json misread!');
	}
};
