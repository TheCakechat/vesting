import { useEthers } from '@usedapp/core';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import config from '../../config/dapp.config';
import truncateAddress from '../../helper/account';

const WalletConnect = () => {
  const { activateBrowserWallet, deactivate, account, chainId } = useEthers();

  useEffect(() => {
    if (
      chainId &&
      config.readOnlyUrls &&
      !config.readOnlyUrls[chainId] &&
      account
    ) {
      toast.error('You should be on Goerli Test Network');
    }
  }, [chainId, account]);

  return (
    <button
      onClick={account ? deactivate : activateBrowserWallet}
      className='group w-[140px] xl:w-[200px] h-8 xl:h-10 border-theme/50 border-[2px] bg-theme/10 hover:bg-theme/20 transition-all duration-150 rounded-[5px] flex items-center justify-center text-theme text-base font-semibold relative'
    >
      <span
        className={`absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
          account && 'group-hover:opacity-0'
        } transition-all duration-150`}
      >
        {account ? truncateAddress(account) : 'Connect Wallet'}
      </span>
      {account && (
        <span className='group-hover:opacity-100 opacity-0 transition-all duration-150'>
          Disconnect
        </span>
      )}
    </button>
  );
};

export default WalletConnect;
