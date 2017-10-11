'use strict';
const path = require('path');
const BinWrapper = require('bin-wrapper');
const localDestBin = require('./local-dest-bin');

localDestBin();

module.exports = new BinWrapper()
	.dest(path.resolve(__dirname, '../vendor'))
	.use(process.platform === 'win32' ? 'pngquant.exe' : 'pngquant');
