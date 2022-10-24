import { Contract } from '@ethersproject/contracts';
import { useCall } from '@usedapp/core';
import contractAbi from '../abi/DesupTokenVesting.json';
import { VESTING_CONTRACT_ADDRESS } from '../config/contract';

const useVestingSchedule = (role: number) => {
  const { value, error } =
    useCall({
      contract: new Contract(VESTING_CONTRACT_ADDRESS, contractAbi.abi),
      method: 'vesting_schedules',
      args: [role],
    }) || {};

  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
};

export default useVestingSchedule;
