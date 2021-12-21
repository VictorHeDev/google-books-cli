#!/usr/bin/env node
// console.log('Hello World');

require = require('esm')(module /*, options*/);
module.exports = require('./google_books_cli.js');

const { kickoffMainLoop } = require('../src/index');
kickoffMainLoop();
