const truncateAddress = (address: string): string => {
  return (
    address.slice(0, 6) +
    '...' +
    address.slice(address.length - 4, address.length - 1)
  );
};

export default truncateAddress;
