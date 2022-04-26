import { VIEW_Y_OFFSET } from '~/constants/design';
import { BrowserWindow } from 'electron';
import { Application } from '../Application';
import { IDialog } from '~/main/services/dialogs-service';

export const requestPermission = (
  browserWindow: BrowserWindow,
  name: string,
  url: string,
  details: any,
  tabId: number,
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    if (
      name === 'unknown' ||
      (name === 'media' && details.mediaTypes.length === 0) ||
      name === 'midiSysex'
    ) {
      return reject('Unknown permission');
    }

    const appWindow = Application.getInstance().windows.fromBrowserWindow(
      browserWindow,
    );

    appWindow.viewManager.selected.requestedPermission = { name, url, details };

    const dialog: IDialog = await Application.getInstance().dialogs.show({
      name: 'permissions',
      browserWindow,
      getBounds: () => ({
        width: 366,
        height: 165,
        x: 0,
        y: VIEW_Y_OFFSET,
      }),
      tabAssociation: {
        tabId,
        getTabInfo: (tabId) => {
          const tab = appWindow.viewManager.views.get(tabId);
          return tab.requestedPermission;
        },
        setTabInfo: (tabId, info) => {
          const tab = appWindow.viewManager.views.get(tabId);
          tab.requestedPermission = info;
        },
      },
      onWindowBoundsUpdate: (disposition) => {
        if (disposition === 'resize') dialog.rearrange();
      },
    });

    if (!dialog) return;

    dialog.on('result', (e, result) => {
      resolve(result);
      dialog.hide();
    });
  });
};
