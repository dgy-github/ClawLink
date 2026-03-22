import fs from 'fs/promises';
import path from 'path';

export async function readFile(filePath: string) {
    console.error(`[FileOps] Reading file: ${filePath}`);
    const absolutePath = path.resolve(filePath);
    return await fs.readFile(absolutePath, 'utf8');
}

export async function writeFile(filePath: string, content: string) {
    console.error(`[FileOps] Writing file: ${filePath}`);
    const absolutePath = path.resolve(filePath);
    await fs.mkdir(path.dirname(absolutePath), { recursive: true });
    await fs.writeFile(absolutePath, content, 'utf8');
    return { success: true, path: absolutePath };
}

export async function listFiles(dirPath: string) {
    console.error(`[FileOps] Listing directory: ${dirPath}`);
    const absolutePath = path.resolve(dirPath);
    const files = await fs.readdir(absolutePath, { withFileTypes: true });
    return files.map(f => ({
        name: f.name,
        type: f.isDirectory() ? 'directory' : 'file'
    }));
}
