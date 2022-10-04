import blueone from '../../assets/svg/marks/blue.svg';
import themeone from '../../assets/svg/marks/theme.svg';
import greenone from '../../assets/svg/marks/green.svg';

const ColorfulMarkers = () => {
  return (
    <div className='-z-1'>
      <img
        src={blueone}
        alt='blue'
        className='absolute left-1/2 -translate-x-1/2 w-[180px] h-[60px] xl:w-[377px] xl:h-[120px]'
      />
      <img
        src={themeone}
        alt='blue'
        className='absolute left-0 bottom-14 w-10 h-[60px] xl:w-[81px] xl:h-[123px]'
      />
      <img
        src={greenone}
        alt='blue'
        className='absolute right-0 -bottom-[110px] xl:-bottom-[160px] w-[96px] h-[197px] xl:w-[192px] xl:h-[294px]'
      />
    </div>
  );
};

export default ColorfulMarkers;
