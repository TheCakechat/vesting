import { Config, Mainnet, Goerli } from '@usedapp/core';
import { getDefaultProvider } from 'ethers';

const config: Config = {
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    // [Mainnet.chainId]: getDefaultProvider('mainnet'),
    [Goerli.chainId]: getDefaultProvider('goerli'),
  },
};

export default config;
