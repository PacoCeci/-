import { expect } from '@jest/globals';
import { quickSort1, quickSort2 } from './12.快速排序';

describe('quick sort', () => {
  it('normal', () => {
    expect(quickSort1([4, 5, -3, 5, 6, 7, 3, 4])).toEqual([
      -3, 3, 4, 4, 5, 5, 6, 7,
    ]);
  });

  it('normal with repeat', () => {
    expect(
      quickSort1([
        1, 1, 1, 2, 2, 2, 3, 3, 3, 5, 5, 5, 6, 6, 6, 4, 4, 4, 3, 3, 3,
      ])
    ).toEqual([1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6]);
  });

  it('already sort', () => {
    expect(quickSort1([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it('not sort', () => {
    expect(quickSort1([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  it('empty', () => {
    expect(quickSort1([])).toEqual([]);
  });

  it('one', () => {
    expect(quickSort1([1])).toEqual([1]);
  });

  it('same', () => {
    expect(quickSort1([11, 11, 11, 11])).toEqual([11, 11, 11, 11]);
  });
});

describe('quick sort', () => {
  it('normal', () => {
    expect(quickSort2([4, 5, -3, 5, 6, 7, 3, 4])).toEqual([
      -3, 3, 4, 4, 5, 5, 6, 7,
    ]);
  });
  it('normal with repeat', () => {
    expect(
      quickSort2([
        1, 1, 1, 2, 2, 2, 3, 3, 3, 5, 5, 5, 6, 6, 6, 4, 4, 4, 3, 3, 3,
      ])
    ).toEqual([1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6]);
  });

  it('already sort', () => {
    expect(quickSort2([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it('not sort', () => {
    expect(quickSort2([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  it('empty', () => {
    expect(quickSort2([])).toEqual([]);
  });

  it('one', () => {
    expect(quickSort2([1])).toEqual([1]);
  });

  it('same', () => {
    expect(quickSort2([11, 11, 11, 11])).toEqual([11, 11, 11, 11]);
  });
});
