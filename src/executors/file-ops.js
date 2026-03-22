"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = readFile;
exports.writeFile = writeFile;
exports.listFiles = listFiles;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
async function readFile(filePath) {
    console.error(`[FileOps] Reading file: ${filePath}`);
    const absolutePath = path_1.default.resolve(filePath);
    return await promises_1.default.readFile(absolutePath, 'utf8');
}
async function writeFile(filePath, content) {
    console.error(`[FileOps] Writing file: ${filePath}`);
    const absolutePath = path_1.default.resolve(filePath);
    await promises_1.default.mkdir(path_1.default.dirname(absolutePath), { recursive: true });
    await promises_1.default.writeFile(absolutePath, content, 'utf8');
    return { success: true, path: absolutePath };
}
async function listFiles(dirPath) {
    console.error(`[FileOps] Listing directory: ${dirPath}`);
    const absolutePath = path_1.default.resolve(dirPath);
    const files = await promises_1.default.readdir(absolutePath, { withFileTypes: true });
    return files.map(f => ({
        name: f.name,
        type: f.isDirectory() ? 'directory' : 'file'
    }));
}
//# sourceMappingURL=file-ops.js.map