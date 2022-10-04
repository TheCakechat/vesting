import logo_text from '../../assets/svg/logo-text.svg';
import logo_text_light from '../../assets/svg/logo-text-light.svg';

const Logo = ({ light }: ILogo) => {
  return (
    <div className='flex w-fit flex-col items-center gap-[10px] uppercase'>
      <div className='flex gap-6'>
        <div className='w-[6px] h-[6px] bg-theme rounded-full' />
        <div className='w-[6px] h-[6px] bg-green rounded-full' />
        <div className='w-[6px] h-[6px] bg-blue rounded-full' />
      </div>
      <img
        src={light ? logo_text_light : logo_text}
        alt='logo text'
        className=''
      />
    </div>
  );
};

export default Logo;
