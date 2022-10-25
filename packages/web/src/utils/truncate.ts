import BigNumber from 'bignumber.js'
export const truncate = (val: number, decimal = 2) => {
  const bn = new BigNumber(val.toString()).multipliedBy(new BigNumber(10).pow(decimal))
  const truncated = Math.trunc(bn.toNumber())
  return truncated / Math.pow(10, decimal)
}
