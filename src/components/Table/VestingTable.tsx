const VestingTable = ({ header, data }: IVestingTable) => {
  return (
    <div className='w-full overflow-x-auto'>
      {/* Table Header */}
      <div className='min-w-[900px] border-b-orange border-b-[1px] flex'>
        {header.map((th: string) => (
          <div
            key={th}
            className='w-[150px] xl:w-[180px] first:w-[100px] xl:first:w-[120px] last:w-[260px] text-sm md:text-base xl:text-[18px] font-bold py-4 truncate'
          >
            {th}
          </div>
        ))}
      </div>
      {data.map((line: Array<Array<any>>, index) => (
        <div
          key={'line' + index}
          className='border-b-orange border-b-[1px] flex min-w-[900px]'
        >
          {line.map((th: any) => (
            <div
              key={th}
              className={`w-[150px] xl:w-[180px] first:w-[100px] xl:first:w-[120px] last:w-[200px] xl:last:w-[300px] 2xl:last:w-[400px] py-2 md:py-5 text-xs md:text-sm xl:text-[17px] flex items-center ${
                typeof th === 'string' ? '' : 'last:justify-end'
              }`}
            >
              {th}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default VestingTable;
