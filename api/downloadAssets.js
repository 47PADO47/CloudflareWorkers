require('dotenv').config();
const { get } = require('https');
const { writeFileSync, existsSync, mkdirSync } = require('fs');

const username = '47PADO47';
const repo = `${username}/assets`
const apiUrl = `https://api.github.com/repos/${repo}/contents`
const rawUrl = (path, file) => `https://raw.githubusercontent.com/${repo}/main/${path}/${file}`;

const removeExtension = (file) => file.replace(/\.[^/.]+$/, "");
const moveNumbers = (name) => {
    const numbers = name.match(/\d+/g);
    if (!numbers) return name;
    const nameWithoutNumbers = name.replace(numbers, '');
    if (nameWithoutNumbers[0] === '_') return `${nameWithoutNumbers.slice(1)}_${numbers}`;
    return `${nameWithoutNumbers}_${numbers}`;
};

const headers = {
    'User-Agent': username,
    'Authorization': `token ${process.env.GITHUB_TOKEN}`
};

async function getFolders() {
    log('Getting folders...', 'info');
    
    const response = await call(apiUrl);
    const json = JSON.parse(response);
    const folders = json.filter(item => item.type === 'dir')
    .map(item => item.name);
    
    log(`Found ${folders.length} folders`, 'success');
    folders.forEach(folder => findOrCreate(`./assets/${folder}`));
    return folders;
};

async function getItems(folder) {
    log(`Scanning items in ${folder}...`, 'info');
    
    const response = await call(`${apiUrl}/${folder}`);
    const json = JSON.parse(response);
    const items = json.filter(item => item.type === 'file')
    .map(item => item.name);
    
    log(`Found ${items.length} items`, 'success');
    return items;
};

async function downloadFile(path, file) {
    log(`Downloading "${path}/${file}"...`, 'info');
    
    const content = await call(rawUrl(path, file));
    writeFileSync(`./assets/${path}/${file}`, content);
    
    log(`Downloaded "${path}/${file}"`, 'success');
    return `import * as ${formatName(file)} from './${path}/${file}';\n`;
};

function call(url) {
    var s = '';
    return new Promise((resolve, reject) => {
        get(url, { headers }, (res) => {
            res.on('data', (d) => {
                s += d;
            });
            res.on('end', () => {
                resolve(s);
            });
        }).on('error', (e) => {
            log(e.message, 'error');
            reject(e);
        });
    });
};

function log(msg, type) {
    switch (type) {
        case 'error':
            console.error(`[\x1b[31m-\x1b[0m] ${msg}`);
            break;
        case 'info':
            console.info(`[\x1b[35mi\x1b[0m] ${msg}`);
            break;
        case 'success':
            console.log(`[\x1b[32m+\x1b[0m] ${msg}`);
            break;
        default:
            console.log(msg);
    };
};

function findOrCreate(path) {
    if (existsSync(path)) return log(`${path} exists`, 'success');
    log(`Creating "${path}"...`, 'info');
    mkdirSync(path);
    log(`Created "${path}"`, 'success');
};

function formatName(name) {
    name = removeExtension(name);
    name = moveNumbers(name);
    if (!new RegExp('_', 'g').test(name)) return name;
    const split = name.split('_');
    return split[0]+split[1][1].toUpperCase()+split[1].slice(1);
};

(async () => {
    var importString = '';
    var assets = '[';

    findOrCreate('./assets');
    const dirs = await getFolders();
    for (const dir of dirs) {
        var files = '[';
        const items = await getItems(dir);
        for (const item of items) {
            importString += await downloadFile(dir, item);
            files += `{name: '${item}', content: ${formatName(item)}},`;
        };
        files+= ']';
        assets += `{name: '/${dir}', files: ${files}},`;
    };
    assets += '] as Assets[];';
    log('Downloading finished!', 'success');
    
    log('Writing "assets/index.ts"...', 'info');
    writeFileSync('./assets/index.ts', `import Assets from "../src/types/Assets";\n\n${importString}\n\nconst assets = ${assets}\n\nexport default assets;`);
    log('Written "assets/index.ts"', 'success');
})();