export const envChecker = (env: NodeJS.ProcessEnv, key: string): string => {
  if (!env[key]) {
    throw new Error(`${key} must be defined in env`);
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return env[key]!;
};
