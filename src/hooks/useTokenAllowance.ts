import { Contract } from '@ethersproject/contracts';
import { ERC20Interface, useCall } from '@usedapp/core';

import {
  ownerAddress,
  tokenAddress,
  VESTING_CONTRACT_ADDRESS as spenderAddress,
} from '../config/contract';

const useTokenAllowance = () => {
  const { value, error } =
    useCall(
      ownerAddress &&
        spenderAddress &&
        tokenAddress && {
          contract: new Contract(tokenAddress, ERC20Interface),
          method: 'allowance',
          args: [ownerAddress, spenderAddress],
        }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
};

export default useTokenAllowance;
