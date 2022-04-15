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
        .option('-t, --type <type>', 'template type choices (web, admin)', /^(web|admin)$/i, 'web')
        .option('-a, --appname <appname>', 'application name', 'application')
        .option('--auth [model]', 'authenticate flag', 'users');
    /**
     * 初期化処理
     */
    commander.command('initialize').action(() => {
        init();
        generator('initialize');
        generator(commander.type);
        if (commander.auth) {
            generator(commander.type + '-auth');
        }
        generator('injector');
    });
    /**
     * インデックス作成
     */
    commander.command('index').action(() => {
        init();
        generator('injector');
    });
    /**
     * generate
     */
    commander.command('generate [className]').action((className) => {
        if (!className) {
            console.error('className is required.');
            return;
        }
        commander.className = className;
        init();
        generator('entity');
        generator('store');
        generator('repositories');
        generator('gateway');
        generator('infrastructure');
        generator('swagger');
        generator('injector');
        generator('usecase');
    });
    /**
     * entity作成
     */
    commander.command('entity [className]').action((className) => {
        if (!className) {
            console.error('className is required.');
            return;
        }
        commander.className = className;
        init();
        generator('entity');
    });
    /**
     * store作成
     */
    commander.command('store [className]').action((className) => {
        if (!className) {
            console.error('className is required.');
            return;
        }
        commander.className = className;
        init();
        generator('store');
        generator('repositories');
    });
    /**
     * gateway作成
     */
    commander.command('gateway [className]').action((className) => {
        if (!className) {
            console.error('className is required.');
            return;
        }
        commander.className = className;
        init();
        generator('gateway');
        generator('infrastructure');
        generator('swagger');
        generator('injector');
        generator('usecase');
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
    commander.appName = commander.appname.charAt(0).toUpperCase() + commander.appname.slice(1);
    commander.className = commander.className ? commander.className.charAt(0).toUpperCase() + commander.className.slice(1) : '';
    makeDir('./', commander.app);
    makeDir('./', commander.swagger);
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
        className: commander.className,
        classNames: inflector.pluralize(commander.className),
        repositories: fs.readdirSync(makeDir(commander.app, 'repositories')),
        gateways: fs.readdirSync(makeDir(commander.app, 'gateways')),
        gatewayFiles: fs.readdirSync(makeDir(makeDir(commander.app, 'gateways'), commander.appName)),
        storeFiles: fs.readdirSync(makeDir(commander.app, 'store')),
        schemasFiles: fs
            .readdirSync(makeDir(makeDir(makeDir(commander.swagger, 'src'), 'components'), 'schemas'), { withFileTypes: true })
            .filter((prop) => prop.isDirectory())
            .map((prop) => {
            return {
                key: prop.name,
                values: fs.readdirSync(makeDir(makeDir(makeDir(makeDir(commander.swagger, 'src'), 'components'), 'schemas'), prop.name))
            };
        }),
        pathsFiles: fs
            .readdirSync(makeDir(makeDir(commander.swagger, 'src'), 'paths'), { withFileTypes: true })
            .filter((prop) => prop.isDirectory())
            .map((prop) => {
            return {
                key: prop.name,
                values: fs.readdirSync(makeDir(makeDir(makeDir(commander.swagger, 'src'), 'paths'), prop.name))
            };
        })
    };
    readdir(path.join(commander.templates, type), './', './');
}
function render(base, src, dist) {
    const content = ejs.render(fs.readFileSync(path.resolve(base, src), 'utf-8'), commander.opts);
    const filepath = path.resolve(commander.dist, dist);
    fs.writeFileSync(filepath, content, { encoding: 'utf-8', flag: 'w+' });
    console.log('Generated:', filepath);
}
function readdir(base, src, dist) {
    const files = fs.readdirSync(path.resolve(base, src), { withFileTypes: true });
    for (const file of files) {
        const name = file.name.split(/(?=\.[^.]+$)/);
        name[0] = name[0].replace(/appName/, commander.appName);
        name[0] = name[0].replace(/classNames/, inflector.pluralize(commander.className));
        name[0] = name[0].replace(/className/, commander.className);
        name[0] = name[0].replace(/classname/, commander.className.toLowerCase());
        const filename = name.join('');
        if (file.isDirectory()) {
            makeDir(dist, filename);
            readdir(base, path.join(src, file.name), path.join(dist, filename));
        }
        else {
            render(base, path.join(src, file.name), path.join(dist, filename));
        }
    }
}
//# sourceMappingURL=index.js.map