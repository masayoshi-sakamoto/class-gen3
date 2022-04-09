"use strict";
const fs = require('fs');
const path = require('path');
const commander = require('commander');
const ejs = require('ejs');
const inflector = require('./lib/inflector');
var pkg = require('../package.json');
try {
    commander
        .version(pkg.version)
        .option('-d, --dist <dist>', 'output directory')
        .option('-a, --appname <appname>', 'application name')
        .option('-j, --japanese <japanese>', 'japanese name')
        .option('-t, --title <title>', 'title name');
    /**
     * 初期化処理
     */
    commander.command('initialize').action(() => {
        init();
        generator('initialize');
        generator('injector');
    });
    commander.parse(process.argv);
}
catch (e) {
    console.error(e);
    process.exit(2);
}
function init() {
    commander.app = 'app';
    commander.swagger = 'swagger';
    commander.templates = path.resolve(__dirname, '../templates/');
    commander.dist = commander.dist ? path.resolve(__dirname, '../' + commander.dist + '/') : './';
    commander.appname = !commander.appname ? 'application' : commander.appname;
    commander.appName = commander.appname.charAt(0).toUpperCase() + commander.appname.slice(1);
}
function makeDir(src, filename) {
    if (!fs.existsSync(commander.dist)) {
        fs.mkdirSync(commander.dist);
    }
    const dir = path.resolve(commander.dist, path.join(src, filename));
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    return dir;
}
function generator(type) {
    commander.opts = {
        appName: commander.appName,
        repositories: fs.readdirSync(makeDir(commander.app, 'repositories')),
        gateways: fs.readdirSync(makeDir(commander.app, 'gateways')),
        gatewayFiles: fs.readdirSync(makeDir(makeDir(commander.app, 'gateways'), commander.appName)),
        storeFiles: fs.readdirSync(makeDir(commander.app, 'store')),
        schemasFiles: fs
            .readdirSync(makeDir(makeDir(makeDir(commander.swagger, 'src'), 'components'), 'schemas'), { withFileTypes: true })
            .filter((prop) => prop.isDirectory())
            .map((prop) => {
            return fs.readdirSync(makeDir(makeDir(makeDir(makeDir(commander.swagger, 'src'), 'components'), 'schemas'), prop));
        }),
        pathsFiles: fs
            .readdirSync(makeDir(makeDir(commander.swagger, 'src'), 'paths'), { withFileTypes: true })
            .filter((prop) => prop.isDirectory())
            .map((prop) => {
            return fs.readdirSync(makeDir(makeDir(makeDir(commander.swagger, 'src'), 'paths'), prop));
        })
    };
    readdir(path.join(commander.templates, type), './', './');
}
function render(base, src, dist, filename) {
    const content = ejs.render(fs.readFileSync(path.resolve(base, path.join(src, filename)), 'utf-8'), commander.opts);
    const filepath = path.resolve(commander.dist, path.join(dist, filename));
    fs.writeFileSync(filepath, content, { encoding: 'utf-8', flag: 'w+' });
    console.log('Generated:', filepath);
}
function readdir(base, src, dist) {
    const files = fs.readdirSync(path.resolve(base, src), { withFileTypes: true });
    for (const file of files) {
        const filename = file.name === 'appName' ? commander.appName : file.name;
        if (file.isDirectory()) {
            makeDir(dist, filename);
            readdir(base, path.join(src, file.name), path.join(dist, filename));
        }
        else {
            render(base, src, dist, filename);
        }
    }
}
//# sourceMappingURL=index.js.map