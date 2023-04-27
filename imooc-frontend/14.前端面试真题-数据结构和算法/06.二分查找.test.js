import { bs1, bs2 } from './06.二分查找';

describe('二分查找循环', () => {
  it('存在1', () => {
    const res = bs1([1, 2, 3, 4, 5, 6, 7, 8], 7);
    expect(res).toBe(6);
  });

  it('存在2', () => {
    const res = bs1([1, 2], 1);
    expect(res).toBe(0);
  });

  it('存在3', () => {
    const res = bs1([1, 2], 2);
    expect(res).toBe(1);
  });

  it('不存在', () => {
    const res = bs1([1, 2, 3, 4, 5, 6, 7, 8], 9);
    expect(res).toBe(-1);
  });

  it('空数组', () => {
    const res = bs2([], 2);
    expect(res).toBe(-1);
  });
});

describe('二分查找递归', () => {
  it('存在1', () => {
    const res = bs2([1, 2, 3, 4, 5, 6, 7, 8], 7);
    expect(res).toBe(6);
  });

  it('存在2', () => {
    const res = bs2([1, 2], 1);
    expect(res).toBe(0);
  });

  it('存在3', () => {
    const res = bs2([1, 2], 2);
    expect(res).toBe(1);
  });

  it('不存在', () => {
    const res = bs2([1, 2, 3, 4, 5, 6, 7, 8], 9);
    expect(res).toBe(-1);
  });

  it('空数组', () => {
    const res = bs2([], 2);
    expect(res).toBe(-1);
  });
});
