// A corner case -
// It is still possible to create a money object with
// any given scale but with decimals on the amount
// example:
// const sampleJPY = <Money> {
//   scale: 0,
//   amount: 100.1
// }

export interface Money {
  scale: number; // the number of decimals in this currency
  amount: number;
}

/*
  Examples:
  USD 2.34
  const sampleUSD = <Money> {
    scale: 2,
    amount: 234
  }

  JPY 2340
  const sampleUSD = <Money> {
    scale: 0,
    amount: 2340
  }
*/
