import { NavLink, useLocation } from 'react-router-dom';

const FooterItem = ({ heading, links }: IFooterItem) => {
  return (
    <div className='min-h-[172px] min-w-[140px] text-light-grey'>
      <h5 className='text-white font-bold text-base pt-2'>{heading}</h5>
      <ul className='mt-4'>
        {links.map((elem) => (
          <li
            key={heading + elem.text}
            className='pb-2 hover:text-blue cursor-pointer transition-all duration-150'
          >
            {elem.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterItem;
