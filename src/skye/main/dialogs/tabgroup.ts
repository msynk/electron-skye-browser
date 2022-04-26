import { BrowserWindow } from 'electron';
import { Application } from '../Application';
import { DIALOG_MARGIN_TOP, DIALOG_MARGIN } from '~/constants/design';
import {IDialog} from "~/main/services/dialogs-service";

export const showTabGroupDialog = async (
  browserWindow: BrowserWindow,
  tabGroup: any,
) => {
  const dialog: IDialog = await Application.getInstance().dialogs.show({
    name: 'tabgroup',
    browserWindow,
    getBounds: () => ({
      width: 266,
      height: 180,
      x: tabGroup.x - DIALOG_MARGIN,
      y: tabGroup.y - DIALOG_MARGIN_TOP,
    }),
    onWindowBoundsUpdate: () => dialog.hide(),
  });

  if (!dialog) return;

  dialog.handle('tabgroup', () => tabGroup);
};
