const formatter = new Intl.NumberFormat('en-US');

export const formatNumber = (value: number) => formatter.format(Math.round(value));
