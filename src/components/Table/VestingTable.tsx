const VestingTable = ({ header, data }: IVestingTable) => {
  return (
    <div className='w-full'>
      {/* Table Header */}
      <div className='border-b-orange border-b-[1px] flex'>
        {header.map((th: string) => (
          <div
            key={th}
            className='w-[180px] first:w-[140px] last-w-[220px] text-[18px] font-bold py-4'
          >
            {th}
          </div>
        ))}
      </div>
      {data.map((line: Array<Array<any>>, index) => (
        <div
          key={'line' + index}
          className='border-b-orange border-b-[1px] flex'
        >
          {line.map((th: any) => (
            <div
              key={th}
              className={`w-[180px] first:w-[140px] last:w-[400px] py-5 text-[17px] flex items-center ${
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
