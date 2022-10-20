import { useState } from 'react';

interface ISelectBox {
  addClass?: string;
  label?: string;
  onChange?: any;
  value?: string;
  dataList: Array<string>;
}

const SelectBox = ({
  addClass,
  label,
  value,
  onChange,
  dataList,
}: ISelectBox) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      className={`relative border-[1px] ${
        open ? 'border-blue/60' : 'border-light-grey/60'
      } rounded-md ${addClass ?? ''}`}
    >
      <span className='absolute px-1 bg-white -translate-y-1/2 left-4 text-light-grey text-sm'>
        {label ?? ''}
      </span>

      <svg
        className='absolute top-1/2 right-4 -translate-y-1/2'
        width='10'
        height='6'
        viewBox='0 0 10 6'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M0 0.5L5 5.5L10 0.5H0Z' fill='black' fillOpacity={0.54} />
      </svg>

      <div
        onClick={() => setOpen(!open)}
        className='cursor-pointer border-none outline-none w-full h-full rounded-md px-4 flex items-center'
      >
        {value ?? ''}
      </div>

      {open && (
        <div>
          <div
            className='fixed top-0 left-0 w-screen h-screen'
            onClick={() => setOpen(false)}
          />
          <ul className='bg-white top-[60px] absolute w-full shadow-currency-list rounded-md cursor-pointer'>
            {dataList.map((data, index) => (
              <li key={data + index} className='px-2 first:pt-2 last:pb-2'>
                <span
                  onClick={() => {
                    onChange && onChange(data);
                    setOpen(false);
                  }}
                  className='block py-2 px-2 w-full rounded-md hover:bg-light-grey/20'
                >
                  {data}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectBox;
