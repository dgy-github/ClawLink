import os from 'os';

export async function getSystemInfo() {
    return {
        platform: os.platform(),
        release: os.release(),
        arch: os.arch(),
        cpus: os.cpus().length,
        totalMemory: `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
        freeMemory: `${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
        hostname: os.hostname(),
        userInfo: os.userInfo().username,
        cwd: process.cwd()
    };
}
