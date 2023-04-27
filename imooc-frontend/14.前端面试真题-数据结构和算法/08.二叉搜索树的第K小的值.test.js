import { getKth, root } from './08.二叉搜索树的第K小的值';

describe('二叉搜索树的第K小的值', () => {
  it('found 2th', () => {
    expect(getKth(root, 2)).toBe(3);
  });

  it('found 5th', () => {
    expect(getKth(root, 5)).toBe(6);
  });

  it('key不在正常范围之内', () => {
    expect(getKth(root, 99)).toBe(undefined);
  });
});
