import type { Config } from '@jest/types';

import { commonConfig } from '../../jest.config';

const config: Config.InitialOptions = {
  ...commonConfig,
  setupFilesAfterEnv: ['./src/test/setup.ts']
};

export default config;
