export function formatUnits(value: string, decimals: number): string {
  const bigValue = BigInt(value);
  const divisor = BigInt(10 ** decimals);
  const quotient = bigValue / divisor;
  const remainder = bigValue % divisor;
  
  if (remainder === 0n) {
    return quotient.toString();
  }
  
  const remainderStr = remainder.toString().padStart(decimals, '0');
  const trimmedRemainder = remainderStr.replace(/0+$/, '');
  
  return `${quotient}.${trimmedRemainder}`;
}
