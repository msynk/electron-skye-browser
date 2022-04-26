import { VIEW_Y_OFFSET } from '~/constants/design';
import { BrowserWindow } from 'electron';
import { Application } from '../Application';

export const requestAuth = (
  browserWindow: BrowserWindow,
  url: string,
  tabId: number,
): Promise<{ username: string; password: string }> => {
  return new Promise(async (resolve) => {
    const appWindow = Application.getInstance().windows.fromBrowserWindow(
      browserWindow,
    );

    const tab = appWindow.viewManager.views.get(tabId);
    tab.requestedAuth = { url };

    const dialog = await Application.getInstance().dialogs.show({
      name: 'auth',
      browserWindow,
      getBounds: () => {
        const { width } = browserWindow.getContentBounds();
        return {
          width: 400,
          height: 500,
          x: width / 2 - 400 / 2,
          y: VIEW_Y_OFFSET,
        };
      },
      tabAssociation: {
        tabId,
        getTabInfo: (tabId) => {
          const tab = appWindow.viewManager.views.get(tabId);
          return tab.requestedAuth;
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
