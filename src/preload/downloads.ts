import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os'
import * as https from 'https';
import * as http from 'http';
import { URL } from 'url';
import { dialog } from 'electron';

interface DownloadResult {
  success: boolean;
  filePath?: string;
  error?: Error | string;
}

export async function downloadFile(fileUrl: string): Promise<DownloadResult> {
  try {
    const parsedUrl = new URL(fileUrl);
    const protocol = parsedUrl.protocol === 'https:' ? https : http;
    const fileName = path.basename(parsedUrl.pathname);

    const { filePath } = await dialog.showSaveDialog({
      title: 'Save File',
      defaultPath: path.join(os.homedir(), fileName),
      filters: [{ name: 'All Files', extensions: ['*'] }]
    });

    if (!filePath) {
      return { success: false, error: 'Download cancelled by user.' };
    }

    const file = fs.createWriteStream(filePath);

    return new Promise<DownloadResult>((resolve, reject) => {
      protocol.get(fileUrl, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve({ success: true, filePath });
        });
      }).on('error', (error) => {
        fs.unlink(filePath, () => reject({ success: false, error }));
      });
    });
  } catch (error) {
    console.error('Error downloading the file:', error);
    return { success: false, error };
  }
}
