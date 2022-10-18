import { Contract } from '@ethersproject/contracts';
import { useCall } from '@usedapp/core';
import { BigNumber } from 'ethers';
import contractAbi from '../abi/DesupTokenVesting.json';
import { CONTRACT_ADDRESS } from '../config/contract';

const useInvestPrice = () => {
  const { value, error } = useCall({
    contract: new Contract(CONTRACT_ADDRESS, contractAbi.abi),
    method: 'getSeedATokenPrice',
    args: [],
  }) || { value: [BigNumber.from(0)] };

  return value ? value[0] : BigNumber.from(0);
};

export default useInvestPrice;
