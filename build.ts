import unprocessedManifest from './unprocessedManifest.json' with { type: 'json' };

function formattedDate() {
    const date = new Date();
    return `${date.getHours()}.${date.getMinutes()}_${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
}

const browser = Deno.args[0];

if (browser !== 'chrome' && browser !== 'firefox') {
    throw new Error('Unknown browser');
}

const processedManifest =
    browser === 'chrome'
        ? {
              ...unprocessedManifest,
              ...unprocessedManifest.chrome,
              chrome: undefined,
              firefox: undefined,
          }
        : {
              ...unprocessedManifest,
              ...unprocessedManifest.firefox,
              firefox: undefined,
              chrome: undefined,
          };

const directoryName = `./builds/${browser}_${formattedDate()}`;

await Deno.mkdir(directoryName, { recursive: true });
await Deno.writeTextFile(
    `${directoryName}/manifest.json`,
    JSON.stringify(processedManifest)
);
await Deno.copyFile('./src/worker.js', `${directoryName}/worker.js`);
