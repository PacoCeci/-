import {
  findContinuousRepeat1,
  findContinuousRepeat2,
} from './11.连续最多的字符以及次数';

describe('findContinuousRepeat1', () => {
  it('normal', () => {
    expect(findContinuousRepeat1('aabbcccddeeee11223')).toEqual(['e', 4]);
  });

  it('empty', () => {
    expect(findContinuousRepeat1('')).toBeNull();
  });

  it('no repeat', () => {
    expect(findContinuousRepeat1('abc')).toEqual(['a', 1]);
  });

  it('all repeat', () => {
    expect(findContinuousRepeat1('aaaaaa')).toEqual(['a', 6]);
  });
});

describe('findContinuousRepeat2', () => {
  it('normal', () => {
    expect(findContinuousRepeat2('aabbcccddeeee11223')).toEqual(['e', 4]);
  });

  it('empty', () => {
    expect(findContinuousRepeat2('')).toBeNull();
  });

  it('no repeat', () => {
    expect(findContinuousRepeat2('abc')).toEqual(['a', 1]);
  });

  it('all repeat', () => {
    expect(findContinuousRepeat2('aaaaaa')).toEqual(['a', 6]);
  });
});
