import { extname } from 'path';
import { dialog } from 'electron';
import { Application } from '../Application';

export const saveAs = async () => {
  const {
    title,
    webContents,
  } = Application.getInstance().windows.current.viewManager.selected;

  const { canceled, filePath } = await dialog.showSaveDialog({
    defaultPath: title,
    filters: [
      { name: 'Webpage, Complete', extensions: ['html', 'htm'] },
      { name: 'Webpage, HTML Only', extensions: ['htm', 'html'] },
    ],
  });

  if (canceled) return;

  const ext = extname(filePath);

  await webContents.savePage(filePath, ext === '.htm' ? 'HTMLOnly' : 'HTMLComplete');
};

export const viewSource = async () => {
  const { viewManager } = Application.getInstance().windows.current;

  viewManager.create(
    {
      url: `view-source:${viewManager.selected.url}`,
      active: true,
    },
    true,
  );
};

export const printPage = () => {
  const {
    webContents,
  } = Application.getInstance().windows.current.viewManager.selected;
  webContents.print();
};
