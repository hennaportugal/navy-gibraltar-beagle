import { Injectable } from '@nestjs/common'
import { Money } from './money.model'

export interface AllocationOptions {
  ratio?: Array<number>;
  parts?: number;
}

@Injectable()
export class PlentinaService {
  /**
   * Simple health check
   * @returns the applicant's name
   */
  healthCheck(): string {
    // throw new Error('Make this function return your name');
    return 'Hennalyn Portugal'
  }

  /**
   * Allocates money given the required options
   * @param money the money object
   * @param allocationOptions the allocation options
   * @returns an array of Money objects
   */
  allocate(money: Money, allocationOptions: AllocationOptions): Array<Money> {
    // It is good practice to choose to make your naming conventions consistent!
    // const moneyVal
    const money_val = this.getValue(money.amount, money.scale)

    let retArray: Money[] = []

    if (allocationOptions.parts) {

      // You can create an arbitrary array in TypeScript using this:
      // Array.from({length: allocationOptions.parts}, element => 1)
      // and then treating it as a "ratio" allocation option ;)
      for (var i = 0; i<allocationOptions.parts; i++) {
        const amount = (money_val / allocationOptions.parts) * (10**money.scale)

        retArray.push({ amount: amount, scale: money.scale })
      }  
    } 
    else if (allocationOptions.ratio) {

      // never use the var keyword. always let or const
      var total = allocationOptions.ratio.reduce(function(x,y) {
        return x + y
      })

      // an alternative would have been to use a functional
      // programming approach:
      // allocation.ratio.map(ratio => {
      //   const amount = ((allocationOptions.ratio[i] / total) * (money_val)) * (10**money.scale)
      //   return { amount: amount, scale: money.scale }
      // })
      for (var i = 0; i<allocationOptions.ratio.length; i++) {
        const amount = ((allocationOptions.ratio[i] / total) * (money_val)) * (10**money.scale)

        retArray.push({ amount: amount, scale: money.scale })
      }     
    }
    // What if there neither ratio or parts are present?

    return retArray 
  }

  // This is not wrong but
  // why not encapsulate this in the Money class?
  // The answer really depends on who you ask but
  // it's one thing to keep in mind
  /**
   * Function to get actual value of the amount per scale
   * @param amount money value
   * @param scale decimal places for the amount
   * @returns the actual value
   */
  getValue(amount: number, scale: number): number {
    return amount / (10**scale)
  }
  
  /**
   * Function to perform addition on 2 money objects
   * @param left left side addend
   * @param right right side addend
   * @returns the sum
   */
  add(left: Money, right: Money): Money {
    // naming consistency
    const left_val = this.getValue(left.amount, left.scale)
    const right_val = this.getValue(right.amount, right.scale)


    // floating point operations can be tricky, most especially
    // mult. Better make sure and cut out the decimal places after this.
    // Don't worry about runtime. it's better to preserve accuracy of data 
    // rather than runtime in this case.
    // besides, that's a case of preoptimization that does not really matter
    const amount = (left_val + right_val) * (10**left.scale)
    
    return { amount: amount, scale: left.scale }
  }

  /**
   * Function to perform subtraction on 2 money objects
   * @param minuend amount to subtract from
   * @param subtrahend amount to subtract with
   * @returns the difference
   */
  subtract(minuend: Money, subtrahend: Money): Money {
    const minuend_val = this.getValue(minuend.amount, minuend.scale)
    const subtrahend_val = this.getValue(subtrahend.amount, subtrahend.scale)

    const amount = (minuend_val - subtrahend_val) * (10**minuend.scale)

    return { amount: amount, scale: minuend.scale }
  }

  // This method lacks a lot of input cleansing
  /**
   * Function to perform multiplication on 2 money objects
   * @param money amount to multiply
   * @param factor number to multiply the money amount with
   * @param scale number of decimals the factor has. Should be greater than or equal to 0
   * @returns the product
   */
  multiply(money: Money, factor: number, scale: number): Money {
    const money_val = this.getValue(money.amount, money.scale)
    const factor_val = this.getValue(factor, scale)

    const amount = (money_val * factor_val) * (10**money.scale)

    return { amount: amount, scale: money.scale }
  }
}
