import { ReactElement, useEffect, useState } from 'react';
import { useEthers } from '@usedapp/core';
import { toast } from 'react-toastify';

// components
import ThemeButton from '../../components/button/ThemeButton';
import Footer from '../../components/footer';
import SelectBox from '../../components/input/SelectBox';
import TextInput from '../../components/input/TextInput';
import Logo from '../../components/logo';
import ColorfulMarkers from '../../components/markers';
import VestingTable from '../../components/Table/VestingTable';
import WalletConnect from '../_components/WalletConnect';
import TokenAllocation from '../_components/TokenAllocation';

// dapp custom hooks
import useSeedAPrice from '../../hooks/useSeedAPrice';
import useDesupTokenPublished from '../../hooks/useDesupTokenPublished';
import useInvestWithEther from '../../hooks/useInvestWithEther';
import useTGEDate from '../../hooks/useTGEDate';
import useDesupAmountMinted from '../../hooks/useDesupAmountMinted';

import {
  TOKEN_PRICE_DECIMAL,
  vesting_contract_allowance,
} from '../../config/contract';
import { CURRENCIES } from '../../constants';
import formatNumber from '../../helper/number';

import coin_image from '../../assets/coins.webp';

const InvestPage: React.FC = (): ReactElement => {
  const { account } = useEthers();

  const [currency, setCurrency] = useState<string>(CURRENCIES[0]);
  const [amount, setAmount] = useState<number>(0);

  const seedAPrice = useSeedAPrice();
  const tgeDate = useTGEDate();
  const bool_published = useDesupTokenPublished();
  const desup_total_minted = useDesupAmountMinted();
  // const vestingSchedule = useVestingSchedule(0);

  const vestingSchedule = 1209600 * 1000;

  const { state, send } = useInvestWithEther();

  const buyHandler = async () => {
    if (account === undefined) {
      toast.warning('Please connect your wallet');
      return;
    }
    await send({ value: (amount * 10 ** 18).toString() });
  };

  useEffect(() => {
    if (state) {
      state.status === 'Exception' && toast.error(state.errorMessage);
      state.status === 'Success' &&
        toast.success('Thank you!!!, Successfully invested!!!');
    }
  }, [state]);

  return (
    <>
      <div className='bg-[#F5F6FA] h-[360px] xl:h-[460px] relative'>
        <ColorfulMarkers />
        <div className='max-w-screen-xl mx-auto pt-[50px] pl-6 md:pl-[60px] xl:pl-[150px] pr-6 md:pr-10'>
          <div className='flex justify-between'>
            <a href='https://thecake.chat'>
              <Logo />
            </a>
            <WalletConnect />
          </div>
          <h2 className='mt-8 md:mt-[50px] xl:mt-[100px] font-bold text-[38px] md:text-[48px] xl:text-[60px]'>
            Investors
          </h2>
          <p className='mt-5 md:mt-8 h-[52px] border-l-[2px] border-l-orange pl-8 max-w-[515px] text-xs md:text-sm xl:text-base'>
            Participate in our investment rounds by connecting your wallet,
            choosing your token allocation and sending Ethereum or Ethereum
            based stablecoins to our vesting contract
          </p>
        </div>
      </div>
      <div className='max-w-screen-xl mx-auto pt-[60px] md:pt-[90px] xl:pt-[112px] pl-8 md:pl-[60px] xl:pl-[150px] pr-8 md:pr-[60px] xl:pr-[150px] 2xl:pr-0'>
        <h3 className='font-bold text-[36px] xl:text-[44px]'>Seed A</h3>

        <dl className='mt-7 md:mt-9 text-sm xl:text-base'>
          <div className='flex'>
            <dt className='min-w-[184px]'>Availble tokens</dt>
            <dd>
              {formatNumber.numberWithCommas(
                (
                  BigInt(vesting_contract_allowance) -
                  BigInt(desup_total_minted ?? 0)
                ).toString()
              ) || 'Loading...'}
            </dd>
          </div>
          <div className='flex'>
            <dt className='min-w-[184px]'>Price per token</dt>
            <dd>${seedAPrice / 10 ** TOKEN_PRICE_DECIMAL || 0}</dd>
          </div>
          <div className='flex'>
            <dt className='min-w-[184px]'>Vesting period</dt>
            <dd>12 months</dd>
          </div>
        </dl>

        <div className='mt-[48px] md:mt-[74px]'>
          <label className='text-sm xl:text-base'>
            Choose an investment asset
          </label>
          <div className='mt-3 xl:mt-5 flex gap-8'>
            <SelectBox
              dataList={CURRENCIES}
              value={currency}
              onChange={(_currency: string) => setCurrency(_currency)}
              addClass='h-14 w-[160px]'
              label='Asset type'
            />
            <TextInput
              addClass='h-14 w-[132px]'
              type='number'
              label='Amount'
              amount={amount}
              onChange={(val: string | number) =>
                setAmount(Math.max(Number(val), 0))
              }
            />
          </div>
          <TokenAllocation amount={amount} price={seedAPrice} />
          <ThemeButton
            disabled={
              amount === 0 ||
              state.status === 'Mining' ||
              state.status === 'PendingSignature'
            }
            onClick={buyHandler}
            addClass='mt-9'
          >
            Purchase
          </ThemeButton>
        </div>

        <div className='mt-[50px] md:mt-[100px] xl:mt-[140px] mb-[80px] md:mb-[180px] xl:mb-[340px]'>
          <h3 className='font-bold text-[32px] md:text-[36px] xl:text-[44px]'>
            My Vesting
          </h3>
          {bool_published ? (
            <div className='mt-5 md:mt-9'>
              <VestingTable
                duration={vestingSchedule}
                tge={Number(tgeDate?.toString() ?? '0')}
                address={account}
              />
            </div>
          ) : (
            <div className='flex flex-col items-center pt-32'>
              <img
                className='w-[300px] grayscale-[0.6] opacity-90'
                src={coin_image}
                alt='not published'
              />
              <p className='mt-10 text-xl'>Token has not been published yet</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InvestPage;
