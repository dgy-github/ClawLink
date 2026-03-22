import simpleGit, { SimpleGit } from 'simple-git';
import path from 'path';

export async function syncGitHub(repoPath: string, message: string) {
    console.log(`[GitHubSync] Starting SSH sync for: ${repoPath}`);
    const git: SimpleGit = simpleGit(repoPath);

    try {
        console.log('[GitHubSync] Pulling latest changes...');
        await git.pull();

        console.log('[GitHubSync] Adding modified files...');
        await git.add('./*');

        console.log(`[GitHubSync] Committing with message: "${message}"`);
        await git.commit(message);

        console.log('[GitHubSync] Pushing via SSH...');
        await git.push();
        
        console.log('✅ [GitHubSync] Sync complete!');
    } catch (error) {
        console.error('❌ [GitHubSync] Error during sync:', error);
    }
}
