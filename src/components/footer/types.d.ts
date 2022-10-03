interface IFooterItem {
  heading: string;
  links: Array<TLinkData>;
}

type TLinkData = {
  text: string;
  link: string;
};
