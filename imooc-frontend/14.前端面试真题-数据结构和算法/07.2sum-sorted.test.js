import { get2SumSorted } from './07.2sum-sorted';

describe('2 sum', () => {
  it('小数组', () => {
    expect(get2SumSorted([1, 5], 6)).toEqual([0, 1]);
  });

  it('大数组', () => {
    expect(get2SumSorted([1, 2, 3, 4, 5], 7)).toEqual([1, 4]);
  });

  it('没找到', () => {
    expect(get2SumSorted([1, 2, 3, 4, 5], 17)).toEqual([-1, -1]);
  });

  it('空数组', () => {
    expect(get2SumSorted([], 17)).toEqual([-1, -1]);
  });
});
