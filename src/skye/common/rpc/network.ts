import { RendererToMainChannel } from '@wexond/rpc-electron';

export interface ResponseDetails {
  statusCode: number;
  data: string;
}

export interface NetworkService {
  request(url: string): Promise<ResponseDetails>;
}

// export const networkMainChannel = new RendererToMainChannel<NetworkService>(
//   'NetworkService',
// );

let networkMainChannel: RendererToMainChannel<NetworkService> = null;
export const getNetworkMainChannel = () => {
  if (!networkMainChannel) {
    networkMainChannel = new RendererToMainChannel<NetworkService>('NetworkService');
  }
  return networkMainChannel;
}