import { SetMetadata } from '@nestjs/common';

// 白名单 e.q. @SkipJwt()
export const SkipJwt = () => SetMetadata('NO_NEET_JWT', true);
