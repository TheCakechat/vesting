import twitterSVG from '../../assets/svg/twitter.svg';
import facebookSVG from '../../assets/svg/facebook.svg';
import youtubeSVG from '../../assets/svg/youtube.svg';

const images: any = {
  youtube: youtubeSVG,
  twitter: twitterSVG,
  facebook: facebookSVG,
};

const SocialButton = ({ type }: ISocialButton) => {
  return (
    <button className='group w-[34px] h-[34px] bg-blue/20 hover:bg-blue/30 transition-all duration-150 rounded-[5px] flex items-center justify-center'>
      <img
        className='group-hover:scale-110 transition-all duration-150'
        src={images[type]}
        alt={type + 'svg'}
      />
    </button>
  );
};

export const YOUTUBE = 'youtube';
export const TWITTER = 'twitter';
export const FACEBOOK = 'facebook';

export default SocialButton;
