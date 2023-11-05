import { SetMetadata } from '@nestjs/common';

// 白名单 e.q. @JwtAllowList()
export const JwtAllowList = () => SetMetadata('NO_NEET_JWT', true);
