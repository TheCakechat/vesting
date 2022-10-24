import { Contract } from '@ethersproject/contracts';
import { useCall } from '@usedapp/core';
import contractAbi from '../abi/DesupTokenVesting.json';
import { VESTING_CONTRACT_ADDRESS } from '../config/contract';

const useTGEDate = () => {
  const { value, error } =
    useCall({
      contract: new Contract(VESTING_CONTRACT_ADDRESS, contractAbi.abi),
      method: 'published_date',
      args: [],
    }) || {};

  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
};

export default useTGEDate;
