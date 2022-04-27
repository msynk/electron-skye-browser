import { RpcMainEvent, RpcMainHandler } from '@wexond/rpc-electron';
import { webContents } from 'electron';
import {
  // extensionMainChannel,
  getExtensionMainChannel,
  ExtensionMainService,
} from '~/common/rpc/extensions';
import { Application } from './Application';
import { URL } from 'url';

export class ExtensionServiceHandler
  implements RpcMainHandler<ExtensionMainService> {
  constructor() {
    getExtensionMainChannel().getReceiver().handler = this;
  }

  inspectBackgroundPage(e: RpcMainEvent, id: string): void {
    webContents
      .getAllWebContents()
      .find(
        (x) =>
          x.session === Application.getInstance().sessions.view &&
          new URL(x.getURL()).hostname === id,
      )
      .openDevTools({ mode: 'detach' });
  }

  uninstall(e: RpcMainEvent, id: string): void {
    Application.getInstance().sessions.uninstallExtension(id);
  }
}
