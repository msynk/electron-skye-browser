import { RendererToMainChannel } from '@wexond/rpc-electron';

export interface ExtensionMainService {
  uninstall(id: string): void;
  inspectBackgroundPage(id: string): void;
}

// export const extensionMainChannel = new RendererToMainChannel<ExtensionMainService>(
//   'ExtensionMainService',
// );

let extensionMainChannel: RendererToMainChannel<ExtensionMainService> = null;
export const getExtensionMainChannel = () => {
  if (!extensionMainChannel) {
    extensionMainChannel = new RendererToMainChannel<ExtensionMainService>('ExtensionMainService');
  }
  return extensionMainChannel;
}