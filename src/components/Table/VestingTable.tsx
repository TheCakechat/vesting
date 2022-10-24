import useTotalDesupToken from '../../hooks/useTotalDesupToken';
import useWithdrawableDesup from '../../hooks/useWithdrawableDesupAmount';

import TableBody from './TableBody';
import dateHelper from '../../helper/date';
import formatNumber from '../../helper/number';

const header = ['Desup', 'Round', 'TGE', 'Vesting remaining', 'Withdrawable'];

const VestingTable = ({ duration, tge, address }: IVestingTable) => {
  const totalAmount = useTotalDesupToken(address);
  const withdrawableAmount = useWithdrawableDesup(address);

  console.log('tge', tge);

  const data = [
    [
      formatNumber.numberWithCommas(totalAmount?.toString() ?? '0'),
      'Seed A',
      tge === 0 ? 'Not Published' : new Date(tge * 1000).toLocaleDateString(),
      dateHelper.getMonthDayFromTimeSpan(
        duration - (new Date().getTime() - tge * 1000)
      ),
      formatNumber.numberWithCommas(
        tge === 0 ? '0' : withdrawableAmount?.toString() ?? '0'
      ),
    ],
  ];

  return (
    <>
      <div className='w-full overflow-x-auto'>
        {/* Table Header */}
        <div className='min-w-[900px] border-b-orange border-b-[1px] flex'>
          {header.map((th: string) => (
            <div
              key={th}
              className='pl-2 w-[150px] xl:w-[180px] first:w-[100px] xl:first:w-[120px] last:w-[260px] text-sm md:text-base xl:text-[18px] font-bold py-4 truncate'
            >
              {th}
            </div>
          ))}
        </div>
        <TableBody data={data} />
      </div>
    </>
  );
};

export default VestingTable;
