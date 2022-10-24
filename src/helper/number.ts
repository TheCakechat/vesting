const numberWithCommas = (x: number | string | undefined) => {
  if (x === undefined) return x;
  const value = typeof x === 'string' ? x : x.toString();
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const floatWithCommas = (n: number) => {
  var parts = n.toString().split('.');

  const numberPart = parts[0];
  const decimalPart = parts[1];
  const thousands = /\B(?=(\d{3})+(?!\d))/g;

  return (
    numberPart.replace(thousands, ',') + (decimalPart ? '.' + decimalPart : '')
  );
};

const formatNumber = {
  numberWithCommas,
  floatWithCommas,
};

export default formatNumber;
