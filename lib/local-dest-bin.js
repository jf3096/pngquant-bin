const fs = require('fs-extra');
const osFilterObj = require('os-filter-obj');
const path = require('path');

module.exports = function () {
	const vendorPath = path.resolve(__dirname, '../vendor');

	const osArr = [
		{
			abs: path.join(vendorPath, 'macos/pngquant'),
			os: 'darwin'
		},
		{
			abs: path.join(vendorPath, 'linux/x86/pngquant'),
			os: 'linux',
			arch: 'x86'
		},
		{
			abs: path.join(vendorPath, 'linux/x64/pngquant'),
			os: 'linux',
			arch: 'x64'
		},
		{
			abs: path.join(vendorPath, 'freebsd/x64/pngquant'),
			os: 'freebsd',
			arch: 'x64'
		},
		{
			abs: path.join(vendorPath, 'win/pngquant.exe'),
			os: 'win32'
		},
	];

	const results = osFilterObj(osArr);

	if (!results || results.length !== 1) {
		throw new Error('unknown result');
	}

	const result = results[0];
	const filename = path.basename(result.abs);
	const destination = path.join(vendorPath, filename);

	if (!fs.existsSync(destination)) {
		fs.copySync(result.abs, path.join(vendorPath, filename));
	}
};
