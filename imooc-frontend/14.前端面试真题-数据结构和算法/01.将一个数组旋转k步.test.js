import { rotate1, rotate2 } from './01.将一个数组旋转k步';

// ## 测试
describe('数组旋转1', () => {
  it('正常情况', () => {
    const res = rotate1([1, 2, 3, 4, 5, 6], 2);
    expect(res).toEqual([5, 6, 1, 2, 3, 4]);
  });

  it('空数组', () => {
    const res = rotate1([], 2);
    expect(res).toEqual([]);
  });

  it('k是0', () => {
    const res = rotate1([1, 2, 3, 4, 5, 6], 0);
    expect(res).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('k是负值', () => {
    const res = rotate1([1, 2, 3, 4, 5, 6], -2);
    expect(res).toEqual([5, 6, 1, 2, 3, 4]);
  });

  it('k 不是数字', () => {
    const res = rotate1([1, 2, 3, 4, 5, 6], 'abc');
    expect(res).toEqual([1, 2, 3, 4, 5, 6]);
  });
});

describe('数组旋转2', () => {
  it('正常情况', () => {
    const res = rotate2([1, 2, 3, 4, 5, 6], 2);
    expect(res).toEqual([5, 6, 1, 2, 3, 4]);
  });

  it('空数组', () => {
    const res = rotate2([], 2);
    expect(res).toEqual([]);
  });

  it('k是0', () => {
    const res = rotate2([1, 2, 3, 4, 5, 6], 0);
    expect(res).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('k是负值', () => {
    const res = rotate2([1, 2, 3, 4, 5, 6], -2);
    expect(res).toEqual([5, 6, 1, 2, 3, 4]);
  });

  it('k 不是数字', () => {
    const res = rotate2([1, 2, 3, 4, 5, 6], 'abc');
    expect(res).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
