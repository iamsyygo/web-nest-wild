import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = 'config.yaml';

export const YAML_DATA = yaml.load(
  readFileSync(join(__dirname, '../../', YAML_CONFIG_FILENAME), 'utf8'),
) as yamlConfig;

export default () => YAML_DATA;

interface yamlConfig {
  db: TypeOrmModuleOptions;
  port: number;
  prefix: string;
  email: {
    host: string;
    port: number;
    username: string;
  };
  cookie: {
    secret: string;
  };
  file: {
    url: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
  wxin: {
    appId: string;
    appSecret: string;
  };
  bcrypt: {
    salt: number;
  };

  redis: {
    host: string;
    port: number;
  };
}
