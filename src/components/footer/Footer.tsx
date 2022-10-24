import { SocialButton } from '../button';
import { FACEBOOK, TWITTER, YOUTUBE } from '../button/SocialButton';
import Logo from '../logo';
import FooterItem from './FooterItem';

const footer_data = [
  {
    heading: 'Product',
    links: [
      { text: 'Pricing', link: '#' },
      { text: 'How it works', link: '#' },
      { text: 'About', link: '#' },
      { text: 'FAQ', link: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { text: 'About', link: '#' },
      { text: 'Careers', link: '#' },
      { text: 'Newsletter', link: '#' },
      { text: 'Security', link: '#' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { text: 'Talk to Support', link: '#' },
      { text: 'Talk to Sales', link: '#' },
      { text: 'Support Docs', link: '#' },
    ],
  },
  {
    heading: 'Privacy',
    links: [
      { text: 'Privacy policy', link: 'https://thecake.chat/privacy-policy/' },
      {
        text: 'Terms & conditions',
        link: 'https://thecake.chat/terms-conditions/',
      },
      { text: 'Cookies policy', link: 'https://thecake.chat/cookies-policy/' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className='bg-color-dark'>
      <div className='max-w-screen-xl mx-auto px-8 md:px-[60px] xl:px-[150px] pt-10 md:pt-[75px] pb-8 md:pb-[50px]'>
        <div className='flex flex-col xl:flex-row justify-between'>
          <div className='w-full justify-between xl:w-[210px] flex xl:flex-col items-end md:items-start'>
            <div>
              <Logo light />
              <p className='block mt-4 xl:mt-[28px] text-light-grey text-sm xl:text-base'>
                The Crypto Advocates Knowledge Exchange
              </p>
            </div>
            <div className='flex gap-5 mt-0 md:mt-7'>
              <a>
                <SocialButton type={FACEBOOK} />
              </a>
              <a href='https://twitter.com/thecakechat'>
                <SocialButton type={TWITTER} />
              </a>
              <a href='https://www.youtube.com/channel/UCd13YHkrNRAvw8s82kO0SWw'>
                <SocialButton type={YOUTUBE} />
              </a>
            </div>
          </div>

          <div className='mt-8 xl:mt-0 flex flex-col sm:flex-row gap-2 justify-around md:gap-[25px] xl:gap-[50px]'>
            {footer_data.map((data) => (
              <FooterItem
                key={data.heading}
                heading={data.heading}
                links={data.links}
              />
            ))}
          </div>
        </div>
        <p className='text-light-grey text-center mt-8 md:mt-[50px] text-sm xl:text-base'>
          Copyright 2021. All rights reserved. Designed & Developed by Luna.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
