const fs = require('fs')
const path = require('path')
const commander = require('commander')
const ejs = require('ejs')
const inflector = require('./lib/inflector')
var pkg = require('../package.json')

try {
  commander
    .version(pkg.version)
    .option('-d, --dist <dist>', 'output directory')
    .option('-a, --appname <appname>', 'application name')
    .option('-j, --japanese <japanese>', 'japanese name')
    .option('-t, --title <title>', 'title name')

  commander.parse(process.argv)
} catch (e) {
  console.error(e)
  process.exit(2)
}
