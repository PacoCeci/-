import { moveZero } from './10.移动0到末尾';

describe('move zero to tail', () => {
  it('单个0', () => {
    expect(moveZero([1, 0, 3, 0, 11, 0])).toEqual([1, 3, 11, 0, 0, 0]);
  });

  it('连续0', () => {
    expect(moveZero([1, 2, 0, 3, 0, 0, 0, 11, 23, 43, 54, 6, 0, 65])).toEqual([
      1, 2, 3, 11, 23, 43, 54, 6, 65, 0, 0, 0, 0, 0,
    ]);
  });

  it('全是0', () => {
    expect(moveZero([0, 0, 0, 0, 0, 0, 0, 0])).toEqual([
      0, 0, 0, 0, 0, 0, 0, 0,
    ]);
  });

  it('empty', () => {
    expect(moveZero([])).toEqual([]);
  });

  it('no zero', () => {
    expect(moveZero([1, 3, 11, 12, 32, 5, 45, 7])).toEqual([
      1, 3, 11, 12, 32, 5, 45, 7,
    ]);
  });
});
