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
      { text: 'Privacy policy', link: '#' },
      { text: 'Terms & conditions', link: '#' },
      { text: 'Cookies policy', link: '#' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className='bg-color-dark'>
      <div className='max-w-screen-xl mx-auto px-[150px] pt-[75px] pb-[50px]'>
        <div className='flex justify-between'>
          <div className='w-[210px]'>
            <Logo light />
            <p className='block mt-[28px] text-light-grey text-base'>
              The Crypto Advocates Knowledge Exchange
            </p>
            <div className='flex gap-5 mt-7'>
              <SocialButton type={FACEBOOK} />
              <SocialButton type={TWITTER} />
              <SocialButton type={YOUTUBE} />
            </div>
          </div>

          <div className='flex gap-[50px]'>
            {footer_data.map((data) => (
              <FooterItem
                key={data.heading}
                heading={data.heading}
                links={data.links}
              />
            ))}
          </div>
        </div>
        <p className='text-light-grey text-center mt-[50px]'>
          Copyright 2021. All rights reserved. Designed & Developed by Luna.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
