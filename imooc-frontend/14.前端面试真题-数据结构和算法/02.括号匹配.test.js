import { match } from './02.括号匹配';

// ## 测试
describe('括号匹配', () => {
  it('匹配', () => {
    expect(match('{90}(9{})[]')).toBe(true);
  });

  it('不匹配', () => {
    expect(match('{90)(9{})[}')).toBe(false);
  });
});
