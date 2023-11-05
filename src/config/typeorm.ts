import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YAML_DATA } from '@/config/js-yaml';
export default ((entities: any[] = []) => {
  return TypeOrmModule.forRoot({
    ...YAML_DATA.db,
    entities,
    // 驼峰转下划线
    namingStrategy: new SnakeNamingStrategy(),
  });
})();
