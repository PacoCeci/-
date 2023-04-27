import { fib1, fib2 } from './09.斐波那契数列';

describe('fib 递归', () => {
  it('0和1', () => {
    expect(fib1(0)).toBe(0);
    expect(fib1(1)).toBe(1);
  });

  it('正常情况', () => {
    expect(fib1(2)).toBe(1);
    expect(fib1(3)).toBe(2);
    expect(fib1(4)).toBe(3);
    expect(fib1(5)).toBe(5);
    expect(fib1(6)).toBe(8);
  });
});

describe('fib 动态规划', () => {
  it('0和1', () => {
    expect(fib1(0)).toBe(0);
    expect(fib1(1)).toBe(1);
  });
  it('正常情况', () => {
    expect(fib1(7)).toBe(13);
    expect(fib1(8)).toBe(21);
    expect(fib1(9)).toBe(34);
    expect(fib1(10)).toBe(55);
  });
});
