import { autoUpdater } from 'electron-updater';
import { ipcMain } from 'electron';
import { Application } from '../Application';

export const runAutoUpdaterService = () => {
  let updateAvailable = false;

  ipcMain.on('install-update', () => {
    if (process.env.NODE_ENV !== 'development') {
      autoUpdater.quitAndInstall(true, true);
    }
  });

  ipcMain.handle('is-update-available', () => {
    return updateAvailable;
  });

  ipcMain.on('update-check', async () => {
    try {
      await autoUpdater.checkForUpdates();
    } catch (e) {
      console.error(e);
    }
  });

  autoUpdater.on('update-downloaded', () => {
    updateAvailable = true;

    for (const window of Application.getInstance().windows.list) {
      window.send('update-available');
      Application.getInstance().dialogs
        .getDynamic('menu')
        ?.browserView?.webContents?.send('update-available');
    }
  });
};
