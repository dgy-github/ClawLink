import { openClawClient } from "../openclaw-client.js";

export class NotificationExecutor {
    async notify(title: string, message: string) {
        console.log(`[Notification] Sending local notification: ${title}`);
        try {
            return await openClawClient.invokeTool('nodes', { 
                action: 'notify',
                title,
                message
            });
        } catch (error: any) {
            return { error: error.message };
        }
    }

    async speak(text: string) {
        console.log(`[Voice] Delegating voice output: ${text}`);
        try {
            // Using exec as a proxy to local TTS or a specific voice tool if available
            return await openClawClient.invokeTool('exec', { 
                command: `PowerShell -Command "Add-Type –AssemblyName System.Speech; (New-Object System.Speech.Synthesis.SpeechSynthesizer).Speak('${text.replace(/'/g, "''")}')"`
            });
        } catch (error: any) {
            return { error: error.message };
        }
    }
}
