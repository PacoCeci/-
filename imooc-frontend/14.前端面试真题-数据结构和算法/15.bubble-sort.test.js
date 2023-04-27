import { bubbleSort } from './15.bubble-sort';

describe('bubbleSort', () => {
  it('normal', () => {
    expect(bubbleSort([4, 5, -3, 5, 6, 7, 3, 4])).toEqual([
      -3, 3, 4, 4, 5, 5, 6, 7,
    ]);
  });
  it('normal with repeat', () => {
    expect(
      bubbleSort([
        1, 1, 1, 2, 2, 2, 3, 3, 3, 5, 5, 5, 6, 6, 6, 4, 4, 4, 3, 3, 3,
      ])
    ).toEqual([1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6]);
  });

  it('already sort', () => {
    expect(bubbleSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it('not sort', () => {
    expect(bubbleSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  it('empty', () => {
    expect(bubbleSort([])).toEqual([]);
  });

  it('one', () => {
    expect(bubbleSort([1])).toEqual([1]);
  });

  it('same', () => {
    expect(bubbleSort([11, 11, 11, 11])).toEqual([11, 11, 11, 11]);
  });
});
