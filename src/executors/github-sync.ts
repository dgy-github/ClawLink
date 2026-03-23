import { simpleGit, SimpleGit } from 'simple-git';

export async function syncGitHub(repoPath: string, message: string): Promise<{success: boolean; error?: string}> {
    console.log(`[GitHubSync] Starting SSH sync for repository at: ${repoPath}`);
    const git: SimpleGit = simpleGit(repoPath);

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
    } catch (error: any) {
        console.error('❌ [GitHubSync] Error during sync:', error.message);
        return { success: false, error: error.message };
    }
}
