const moneyConventer = (number) => {
  const result = number.toFixed(2).replace(/./g, (c, i, a) => {
    if (i > 0 && c !== '.' && (a.length - i) % 3 === 0) return `,${c}`;
    return c;
  });
  return /.00$/.test(result) ? result.replace('.00', '') : result;
};

export default {
  moneyConventer,
};
