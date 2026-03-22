export declare function readFile(filePath: string): Promise<string>;
export declare function writeFile(filePath: string, content: string): Promise<{
    success: boolean;
    path: string;
}>;
export declare function listFiles(dirPath: string): Promise<{
    name: string;
    type: string;
}[]>;
//# sourceMappingURL=file-ops.d.ts.map