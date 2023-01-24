
export const oneMillion = 1000000;

export const convertCurrencyToMillions = (value) => {
  if(value > oneMillion) {
    return (value / oneMillion).toFixed(2)
  }
  return value;
}