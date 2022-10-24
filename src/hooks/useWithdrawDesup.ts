import { useContractFunction } from '@usedapp/core';
import useContract from './useContract';
import contractAbi from '../abi/DesupTokenVesting.json';

import { VESTING_CONTRACT_ADDRESS as contractAddress } from '../config/contract';

const useWithdrawDesup = () => {
  const contract = useContract(contractAddress, contractAbi.abi);
  const { state, send } = useContractFunction(contract, 'withdraw');
  return { state, send };
};

export default useWithdrawDesup;
