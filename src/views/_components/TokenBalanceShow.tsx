import { ReactElement } from 'react';

import useAvailableDesup from '../../hooks/useAvailableDesup';
import useTotalDesupToken from '../../hooks/useTotalDesupToken';

interface ITokenBalanceShow {
  address?: string;
}

const TokenBalanceShow = ({ address }: ITokenBalanceShow): ReactElement => {
  const totalAmount = useTotalDesupToken(address);
  const availableAmount = useAvailableDesup(address);

  return (
    <>
      <div className='mt-5'>
        Your desup: {totalAmount?.toString() ?? 'Loading...'}
      </div>
      <div className='mt-5'>
        Available desup to withdraw:{' '}
        {availableAmount?.toString() ?? 'Token is not published yet'}
      </div>
    </>
  );
};

export default TokenBalanceShow;
