import { Contract } from '@ethersproject/contracts';
import { useCall } from '@usedapp/core';
import contractAbi from '../abi/DesupTokenVesting.json';
import { VESTING_CONTRACT_ADDRESS } from '../config/contract';

const useTokenCountFromEther = (amount: number, token_price: number) => {
  if (amount === 0 || token_price === 0) return 0;

  const { value, error } =
    useCall({
      contract: new Contract(VESTING_CONTRACT_ADDRESS, contractAbi.abi),
      method: 'getDesupTokenAmount',
      args: [(amount * 10 ** 18).toString(), token_price],
    }) || {};

  if (error) {
    console.error(error.message);
    return undefined;
  }

  return value?.[0];
};

export default useTokenCountFromEther;
