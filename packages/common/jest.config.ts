import type { Config } from '@jest/types';

import { commonConfig } from '../../jest.config';

const config: Config.InitialOptions = {
  ...commonConfig
};

export default config;
