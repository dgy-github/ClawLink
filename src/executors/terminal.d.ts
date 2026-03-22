export declare function executeCommand(command: string, cwd?: string): Promise<{
    success: boolean;
    stdout: string;
    stderr: string;
    error?: never;
} | {
    success: boolean;
    error: any;
    stdout: any;
    stderr: any;
}>;
//# sourceMappingURL=terminal.d.ts.map