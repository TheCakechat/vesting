import blueone from '../../assets/svg/marks/blue.svg';
import themeone from '../../assets/svg/marks/theme.svg';
import greenone from '../../assets/svg/marks/green.svg';

const ColorfulMarkers = () => {
  return (
    <>
      <img
        src={blueone}
        alt='blue'
        className='absolute left-1/2 -translate-x-1/3'
      />
      <img src={themeone} alt='blue' className='absolute bottom-14' />
      <img
        src={greenone}
        alt='blue'
        className='absolute right-0 -bottom-[160px]'
      />
    </>
  );
};

export default ColorfulMarkers;
