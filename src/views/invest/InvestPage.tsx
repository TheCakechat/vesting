import { ReactElement } from 'react';
import ThemeButton from '../../components/button/ThemeButton';
import Footer from '../../components/footer';
import SelectBox from '../../components/input/SelectBox';
import TextInput from '../../components/input/TextInput';
import Logo from '../../components/logo';
import ColorfulMarkers from '../../components/markers';
import VestingTable from '../../components/Table/VestingTable';
import WalletConnect from '../_components/WalletConnect';

const table_data: IVestingTable = {
  data: [
    ['26,978,089', 'Seed A', '12th Sept 2022', '245d 12h 09m', '0'],
    [
      '26,978,089',
      'Seed A',
      '12th Sept 2022',
      '0',
      '13,089,877',
      <ThemeButton>Withdraw</ThemeButton>,
    ],
  ],
  header: [
    'Desup',
    'Round',
    'Purchased',
    'Vesting remaining',
    'Availble to withdraw',
  ],
};

const InvestPage: React.FC = (): ReactElement => {
  return (
    <>
      <div className='bg-[#F5F6FA] h-[300px] xl:h-[460px] relative'>
        <ColorfulMarkers />
        <div className='max-w-screen-xl mx-auto pt-[50px] pl-6 md:pl-[60px] xl:pl-[150px] pr-6 md:pr-10'>
          <div className='flex justify-between'>
            <Logo />
            <WalletConnect />
          </div>
          <h2 className='mt-8 md:mt-[50px] xl:mt-[100px] font-bold text-[38px] md:text-[48px] xl:text-[60px]'>
            Investors
          </h2>
          <p className='mt-5 md:mt-8 h-[52px] border-l-[2px] border-l-orange pl-8 max-w-[515px] text-xs md:text-sm xl:text-base'>
            Participate in our investment rounds byt connecting your wallet,
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
            <dd>x</dd>
          </div>
          <div className='flex'>
            <dt className='min-w-[184px]'>Price per token</dt>
            <dd>$0.00x</dd>
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
              dataList={['Ethereum', 'USDT']}
              value='Ethereum'
              addClass='h-14 w-[160px]'
              label='Asset type'
            />
            <TextInput addClass='h-14 w-[132px]' type='number' label='Amount' />
          </div>
          <div className='mt-8 md:mt-14'>
            <p className='text-sm xl:text-base'>Token allocation</p>
            <p className='text-[22px] xl:text-[28px]'>Desup: 26,978,089</p>
            <ThemeButton addClass='mt-9'>Purchase</ThemeButton>
          </div>
        </div>

        <div className='mt-[50px] md:mt-[100px] xl:mt-[140px] mb-[80px] md:mb-[180px] xl:mb-[340px]'>
          <h3 className='font-bold text-[32px] md:text-[36px] xl:text-[44px]'>
            My Vesting
          </h3>
          <div className='mt-5 md:mt-9'>
            <VestingTable {...table_data} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InvestPage;
