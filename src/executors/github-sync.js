"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncGitHub = syncGitHub;
const simple_git_1 = __importStar(require("simple-git"));
async function syncGitHub(repoPath, message) {
    console.log(`[GitHubSync] Starting SSH sync for repository at: ${repoPath}`);
    const git = (0, simple_git_1.default)(repoPath);
    try {
        console.log('[GitHubSync] Pulling latest changes from remote...');
        await git.pull();
        console.log('[GitHubSync] Staging all modified files...');
        await git.add('./*');
        console.log(`[GitHubSync] Committing with message: "${message}"`);
        await git.commit(message);
        console.log('[GitHubSync] Pushing via SSH to GitHub...');
        await git.push();
        console.log('✅ [GitHubSync] Sync complete!');
        return { success: true };
    }
    catch (error) {
        console.error('❌ [GitHubSync] Error during sync:', error.message);
        return { success: false, error: error.message };
    }
}
//# sourceMappingURL=github-sync.js.map