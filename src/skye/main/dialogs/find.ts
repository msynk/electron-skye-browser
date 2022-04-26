import { VIEW_Y_OFFSET } from '~/constants/design';
import { BrowserWindow } from 'electron';
import { Application } from '../Application';

export const showFindDialog = async (browserWindow: BrowserWindow) => {
  const appWindow =
    Application.getInstance().windows.fromBrowserWindow(browserWindow);

  const dialog = await Application.getInstance().dialogs.show({
    name: 'find',
    browserWindow,
    devtools: false,
    getBounds: () => {
      const { width } = browserWindow.getContentBounds();
      return {
        width: 416,
        height: 70,
        x: width - 416,
        y: VIEW_Y_OFFSET,
      };
    },
    tabAssociation: {
      tabId: appWindow.viewManager.selectedId,
      getTabInfo: (tabId) => {
        const tab = appWindow.viewManager.views.get(tabId);
        return tab.findInfo;
      },
      setTabInfo: (tabId, info) => {
        const tab = appWindow.viewManager.views.get(tabId);
        tab.findInfo = info;
      },
    },
    onWindowBoundsUpdate: (disposition) => {
      if (disposition === 'resize') dialog.rearrange();
    },
  });
};
