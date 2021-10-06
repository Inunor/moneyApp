import { sum } from '../index';

describe('index.ts', () => {
  it('should return a + b', () => {
    const a = 2;
    const b = 3;
    const c = sum(a, b);

    expect(c).toBe(a + b);
  });
});
