import { useEffect } from 'react';
import { toast } from 'react-toastify';
import useWithdrawDesup from '../../hooks/useWithdrawDesup';

const WithdrawButton = ({
  amount,
  onWithdraw,
}: {
  amount: number;
  onWithdraw: Function;
}) => {
  const { state, send } = useWithdrawDesup();

  const withdrawHandler = () => {
    if (confirm(`Do you really want to withdraw ${amount} desups?`)) {
      send(amount);
      onWithdraw();
    }
  };

  useEffect(() => {
    if (state) {
      state.status === 'Exception' && toast.error(state.errorMessage);
      state.status === 'Success' &&
        toast.success('Successful!!! Check the balace with your metamask!');
    }
  }, [state]);

  return (
    <button
      disabled={amount === 0}
      onClick={withdrawHandler}
      className={`w-20 h-8 absolute top-1/2 -translate-y-1/2 right-1 rounded-r-full text-sm text-white font-semibold transition-all duration-150 ${
        amount <= 0
          ? 'cursor-not-allowed bg-theme/80'
          : 'bg-theme hover:bg-theme/80'
      }`}
    >
      Withdraw
    </button>
  );
};

export default WithdrawButton;
