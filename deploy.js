const { readdirSync, lstatSync } = require('fs');
const { exec } = require('child_process');

const exclude = ["node_modules", ".git", ".github"];
const isDirectory = (dir) => lstatSync(dir).isDirectory();

(async function () {
    await console.log('[i] Starting deploy...');
    const projects = await readdirSync(".")
        .filter(dir => !exclude.includes(dir) && isDirectory(dir));

    await projects.forEach(async (project) => {
        console.log(`Deploying ${project}`);
        const cmd = `npx wrangler publish ${project}/src/index.ts --name ${project}`;
        await exec(cmd, async (err, stdout, stderr) => {
            if (err) {
                await console.error(err);
                await console.log(`[✖] Deploy of ${project} failed`);
                return;
            }
            await console.log(stdout);
            if (stderr) await console.log(stderr);
        });
        console.log(`[+] Deployed ${project}`);
    });
    await console.log('[✔] Deploy complete!');
})();