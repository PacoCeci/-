import { palindome, findPalindromeNumbers2 } from './13.回文对称数';

describe('is palindom', () => {
  it('10', () => {
    expect(palindome(10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('100', () => {
    expect(palindome(100)).toEqual([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33, 44, 55, 66, 77, 88, 99,
    ]);
  });

  it('0', () => {
    expect(palindome(0)).toEqual([0]);
  });

  it('1', () => {
    expect(palindome(1)).toEqual([0, 1]);
  });
});
