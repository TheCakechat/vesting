import { NavLink, useLocation } from 'react-router-dom';

const FooterItem = ({ heading, links }: IFooterItem) => {
  return (
    <div className='md:min-h-[172px] min-w-[120px] xl:min-w-[140px] text-light-grey'>
      <h5 className='text-white font-bold text-sm xl:text-base pt-2'>
        {heading}
      </h5>
      <ul className='mt-2 md:mt-4 flex md:flex-col justify-between gap-2'>
        {links.map((elem) => (
          <li
            key={heading + elem.text}
            className='hover:text-blue cursor-pointer transition-all duration-150 text-sm xl:text-base'
          >
            <a href={elem.link}>{elem.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterItem;
