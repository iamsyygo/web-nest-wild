import { ApiProperty, PartialType } from '@nestjs/swagger';

export class QrcodeChangeStatusDto {
  @ApiProperty({ description: '二维码 uuid' })
  id: string;

  @ApiProperty({
    description: '二维码状态',
    enum: ['noscan', 'scan-wait-confirm', 'scan-confirm', 'scan-cancel', 'expired'],
  })
  status: 'noscan' | 'scan-wait-confirm' | 'scan-confirm' | 'scan-cancel' | 'expired';
}
