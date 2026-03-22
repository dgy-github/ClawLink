export interface AICFTask {
    id: string;
    type: string;
    payload: any;
}
export declare class TaskOrchestrator {
    execute(task: AICFTask): Promise<{
        success: boolean;
        error?: string;
    } | {
        success: boolean;
        path: string;
    } | {
        success: boolean;
        error: any;
        stdout: any;
        stderr: any;
    } | {
        success: boolean;
        data: {
            platform: NodeJS.Platform;
            release: string;
            arch: NodeJS.Architecture;
            cpus: number;
            totalMemory: string;
            freeMemory: string;
            hostname: string;
            userInfo: string;
            cwd: string;
        };
    } | {
        success: boolean;
        data: string;
    } | {
        success: boolean;
        data: {
            name: string;
            type: string;
        }[];
    }>;
}
export declare const orchestrator: TaskOrchestrator;
//# sourceMappingURL=orchestrator.d.ts.map