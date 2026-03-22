"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSystemInfo = getSystemInfo;
const os_1 = __importDefault(require("os"));
async function getSystemInfo() {
    return {
        platform: os_1.default.platform(),
        release: os_1.default.release(),
        arch: os_1.default.arch(),
        cpus: os_1.default.cpus().length,
        totalMemory: `${(os_1.default.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
        freeMemory: `${(os_1.default.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
        hostname: os_1.default.hostname(),
        userInfo: os_1.default.userInfo().username,
        cwd: process.cwd()
    };
}
//# sourceMappingURL=system-info.js.map