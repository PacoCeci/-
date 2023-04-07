import { mergeSort } from './16.merge-sort';

describe('mergeSort', () => {
  it('normal', () => {
    expect(mergeSort([4, 5, -3, 5, 6, 7, 3, 4])).toEqual([
      -3, 3, 4, 4, 5, 5, 6, 7,
    ]);
  });
  it('normal with repeat', () => {
    expect(
      mergeSort([1, 1, 1, 2, 2, 2, 3, 3, 3, 5, 5, 5, 6, 6, 6, 4, 4, 4, 3, 3, 3])
    ).toEqual([1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6]);
  });

  it('already sort', () => {
    expect(mergeSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it('not sort', () => {
    expect(mergeSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  it('empty', () => {
    expect(mergeSort([])).toEqual([]);
  });

  it('one', () => {
    expect(mergeSort([1])).toEqual([1]);
  });

  it('same', () => {
    expect(mergeSort([11, 11, 11, 11])).toEqual([11, 11, 11, 11]);
  });
});
