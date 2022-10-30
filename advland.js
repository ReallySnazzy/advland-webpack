const getAppDataPath = require('appdata-path');
const path = require('path');
const fs = require('fs/promises');
const config = require('./advland-config.json');

async function subdirs(dir) {
    let files = await fs.readdir(dir, { withFileTypes: true });
    return files.filter(file => file.isDirectory()).map(file => path.join(dir, file.name));
}

async function getAdventureLandAutoSyncDir() {
    const advLandAppDataFolder = path.join(getAppDataPath(), "Adventure Land");
    const advLandSubdirs = await subdirs(advLandAppDataFolder);
    if (advLandSubdirs.length == 0) {
        return null;
    }
    return advLandSubdirs.reduce((acc, next) => {
        if (next.indexOf('autosync') < 0) {
            return acc;
        }
        const accId = acc?.match(/\d+/)[0] ?? 0;
        const nextId = next.match(/\d+/)[0] ?? 0;
        return accId > nextId ? acc : next;
    });
}

async function getAdventureLandDestination() {
    const advLandAutoSyncDir = await getAdventureLandAutoSyncDir();
    if (advLandAutoSyncDir == null) {
        throw new Error("Failed to find AdventureLand installation directory");
    }
    let installationFolder;
    if (config.mode == "slot") {
        installationFolder = "codes";
    } else if (config.mode == "character") {
        installationFolder = "characters";
    } else {
        throw new Error("Unknown mode in advland-config.json");
    }
    return path.join(
        advLandAutoSyncDir,
        "adventureland",
        installationFolder,
        config.file);
}

async function copy() {
    console.log('Installing into AdventureLand');
    try {
        const destination = await getAdventureLandDestination();
        const source = path.join('.', 'dist', 'main.js');
        try {
            await fs.access(source);
        } catch (ex) {
            throw new Error(`Failed to find source file to copy into AdventureLand: ${ex.message}`);
        }
        await fs.copyFile(source, destination);
        console.log("Successfully copied into AdventureLand");
    } catch (ex) {
        console.log(`Error: ${ex.message}`);
    }
};

copy();