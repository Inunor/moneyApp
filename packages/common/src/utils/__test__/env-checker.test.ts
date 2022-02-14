import { envChecker } from '../env-checker';

describe('Env checker', () => {
  const key = 'testKey';
  const env: { [key: string]: string } = {
    [key]: 'testValue'
  };

  it('should return env value', () => {
    const value = envChecker(env, key);

    expect(value).toBe(env[key]);
  });

  it('should throw an error on non-existing key', () => {
    const f = () => envChecker(env, 'randomKey');

    expect(f).toThrow(Error);
  });
});
