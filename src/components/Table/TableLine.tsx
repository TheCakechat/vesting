import { ChangeEvent, useState } from 'react';
import WithdrawButton from './WithdrawButton';

const TableLine = ({ line, index }: ITableLine) => {
  const [amount, setAmount] = useState<number>(0);

  return (
    <>
      <div
        key={'line' + index}
        className='border-b-orange border-b-[1px] flex min-w-[900px]'
      >
        {line.map((td: any, tdIndex: number) => (
          <div
            key={'line' + index + 'td' + tdIndex}
            className={`pl-2 w-[150px] xl:w-[180px] first:w-[100px] xl:first:w-[120px] last:w-[200px] xl:last:w-[300px] 2xl:last:w-[400px] py-2 md:py-5 text-xs md:text-sm xl:text-[17px] flex items-center ${
              typeof td === 'string' ? '' : 'last:justify-end'
            }`}
          >
            {td}
          </div>
        ))}
        <div
          className={`pl-2 w-[150px] xl:w-[180px] last:w-[200px] xl:last:w-[300px] 2xl:last:w-[400px] py-2 md:py-5 text-xs md:text-sm xl:text-[17px] flex items-center last:justify-end
  }`}
        >
          <label className='relative'>
            <input
              value={amount}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAmount(Math.max(0, Number(e.target.value)))
              }
              max={Number(line[4])}
              type='number'
              className='w-[200px] h-10 rounded-full border-[1px] border-theme outline-none pl-4 pr-[90px]'
            />
            <WithdrawButton onWithdraw={() => setAmount(0)} amount={amount} />
          </label>
        </div>
      </div>
    </>
  );
};

export default TableLine;
