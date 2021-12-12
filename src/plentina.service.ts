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
    throw new Error('Make this function return your name');
  }

  /**
   * Allocates money given the required options
   * @param money the money object
   * @param allocationOptions the allocation options
   * @returns an array of Money objects
   */
  allocate(money: Money, allocationOptions: AllocationOptions): Array<Money> {
    throw new Error('Make this function return allocations');
  }

  /**
   * Allocates money given the required options
   * @param left left side addend
   * @param right right side addend
   * @returns the sum
   */
  add(left: Money, right: Money): Money {
    throw new Error('Make this function return the sum');
  }

  /**
   * Allocates money given the required options
   * @param minuend amount to subtract from
   * @param subtrahend amount to subtract with
   * @returns the difference
   */
  subtract(minuend: Money, subtrahend: Money): Money {
    throw new Error('Make this function return the difference');
  }

  /**
   * Allocates money given the required options
   * @param money amount to multiply
   * @param factor number to multiply the money amount with
   * @param scale number of decimals the factor has. Should be greater than or equal to 0
   * @returns the difference
   */
  multiply(money: Money, factor: number, scale: number): Money {
    throw new Error('Make this function return the product');
  }
}
