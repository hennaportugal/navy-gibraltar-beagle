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
    const money_val = this.getValue(money.amount, money.scale)

    let retArray: Money[] = []

    if (allocationOptions.parts) {

      for (var i = 0; i<allocationOptions.parts; i++) {
        const amount = (money_val / allocationOptions.parts) * (10**money.scale)

        retArray.push({ amount: amount, scale: money.scale })
      }  
    } 
    else if (allocationOptions.ratio) {

      var total = allocationOptions.ratio.reduce(function(x,y) {
        return x + y
      })

      for (var i = 0; i<allocationOptions.ratio.length; i++) {
        const amount = ((allocationOptions.ratio[i] / total) * (money_val)) * (10**money.scale)

        retArray.push({ amount: amount, scale: money.scale })
      }     
    }
    return retArray 
  }

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
    const left_val = this.getValue(left.amount, left.scale)
    const right_val = this.getValue(right.amount, right.scale)

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
