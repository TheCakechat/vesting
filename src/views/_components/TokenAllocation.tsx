import { ReactElement } from 'react';
import formatNumber from '../../helper/number';
import useTokenCountFromEther from '../../hooks/useTokenCountFromEther';

interface ITokenAlloc {
  amount: number;
  price: number;
}

const TokenAllocation = ({ amount, price }: ITokenAlloc): ReactElement => {
  const desupCount = useTokenCountFromEther(amount, price);

  return (
    <div className='mt-8 md:mt-14'>
      <p className='text-sm xl:text-base'>Token allocation</p>
      <p className='text-[22px] xl:text-[28px]'>
        Desup:{' '}
        {formatNumber.numberWithCommas(desupCount?.toString()) ||
          'Computing...'}
      </p>
    </div>
  );
};

export default TokenAllocation;
