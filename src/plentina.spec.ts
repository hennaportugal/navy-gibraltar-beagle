import { Money } from './money.model'
import { PlentinaService } from './plentina.service'

describe('PlentinaService', () => {
  let plentinaService: PlentinaService;

  beforeEach(async () => {
    plentinaService = new PlentinaService();
  });

  describe('allocate', () => {
    const money: Money = {
      scale: 2,
      amount: 1000,
    };

    describe('in parts', () => {
      it('returns correct allocations', () => {
        const options = {
          parts: 2,
        };

        const expected: Array<Money> = [
          {
            scale: 2,
            amount: 500,
          },
          {
            scale: 2,
            amount: 500,
          },
        ];

        expect(plentinaService.allocate(money, options)).toEqual(expected);
      });
    });

    describe('in ratios', () => {
      it('returns correct allocations', () => {
        const options = {
          ratio: [1, 1],
        };

        const expected: Array<Money> = [
          {
            scale: 2,
            amount: 500,
          },
          {
            scale: 2,
            amount: 500,
          },
        ];

        expect(plentinaService.allocate(money, options)).toEqual(expected);
      });
    });

    describe('corner cases', () => {
      it('allocates non-scaled money with scaled values (parts)', () => {
        const money = {
          scale: 0,
          amount: 100
        }

        const expected = [
          {
            scale: 0,
            amount: 34
          }, {
            scale: 0,
            amount: 33
          }, {
            scale: 0,
            amount: 33
          }, 
        ]

        expect(plentinaService.allocate(money, { parts: 3 })).toEqual(expected);
      })

      it('allocates non-scaled money with scaled values (parts)', () => {
        const money = {
          scale: 0,
          amount: 100
        }

        const expected = [
          {
            scale: 0,
            amount: 34
          }, {
            scale: 0,
            amount: 33
          }, {
            scale: 0,
            amount: 33
          }, 
        ]

        expect(plentinaService.allocate(money, { ratio: [1, 1, 1] })).toEqual(expected);
      })
    })
  });

  describe('add', () => {
    const left: Money = {
      scale: 2,
      amount: 1000,
    };

    it('should return the correct sum', () => {
      const right: Money = {
        scale: 2,
        amount: 1000,
      };

      const expected: Money = {
        scale: 2,
        amount: 2000,
      };

      expect(plentinaService.add(left, right)).toEqual(expected);
    });

    it('should return the correct sum', () => {
      const right: Money = {
        scale: 0,
        amount: 10,
      };

      const expected: Money = {
        scale: 2,
        amount: 2000,
      };

      expect(plentinaService.add(left, right)).toEqual(expected);
    });
  });

  describe('subtract', () => {
    const minuend: Money = {
      scale: 2,
      amount: 2000,
    };

    it('should return the correct difference', () => {
      const subtrahend: Money = {
        scale: 2,
        amount: 1000,
      };

      const expected: Money = {
        scale: 2,
        amount: 1000,
      };

      expect(plentinaService.subtract(minuend, subtrahend)).toEqual(expected);
    });

    it('should return the correct difference', () => {
      const subtrahend: Money = {
        scale: 0,
        amount: 10,
      };

      const expected: Money = {
        scale: 2,
        amount: 1000,
      };

      expect(plentinaService.subtract(minuend, subtrahend)).toEqual(expected);
    });
  });

  describe('multiply', () => {
    const money: Money = {
      scale: 2,
      amount: 1000,
    };

    it('should return the correct product', () => {
      const factor = 2;
      const scale = 0;

      const expected: Money = {
        scale: 2,
        amount: 2000,
      };

      expect(plentinaService.multiply(money, factor, scale)).toEqual(expected);
    });

    it('should return the correct product', () => {
      const factor = 5;
      const scale = 1;

      const expected: Money = {
        scale: 2,
        amount: 500,
      };

      expect(plentinaService.multiply(money, factor, scale)).toEqual(expected);
    });

    describe('corner cases', () => {
      it('multiplies non-scaled money with scaled values', () => {
        const left = {
          scale: 0,
          amount: 100 
        }

        expect(plentinaService.multiply(left, 6667, 4)).toEqual({ scale: 0, amount: 67 });
      })
    })
  });

  describe('money instantiation', ()=> {
    it('should throw an error on unwanted decimals', () => {
      const money = <Money> {
        scale: 0,
        amount: 1.1
      }

      // there should be cleanup that happens
      // so that money drops decimal parts
      expect(money.amount % 1).toEqual(0)
    })

    describe('invalid scales', () => {
      it('should throw an error on invalid scales', () => {
        const money = <Money> {
          scale: -1,
          amount: 1
        }

        // there should be cleanup that happens
        // so that scale is valid
        expect(money.scale >= 0).toEqual(true)
      })

      it('should throw an error on invalid scales', () => {
        const money = <Money> {
          scale: 1.234,
          amount: 1
        }

        // there should be cleanup that happens
        // so that scale is valid
        expect(money.scale % 1).toEqual(0)
      })
    })
  })
});
