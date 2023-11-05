import * as chalk from 'chalk';
import type { Color } from 'chalk';
export const log = (type: typeof Color, s: string) => {
  const val = chalk[type](s);
  console.log(val);
};
