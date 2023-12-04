import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { randomUUID } from 'crypto'; // 生成随机字符串
import * as qrcode from 'qrcode';
import { QrcodeChangeStatusDto } from './dto/qrcode-authentication.dto';

// TODO: 应使用 redis 存储 uuid，以及 uuid 对应的用户信息
const uuidQrCodeMap = new Map<string, QrcodeData>();

interface QrcodeData {
  uuid: string;
  // qrcode?: string;
  /**
   * 状态
   * @param {noscan} 未扫描
   * @param {scan-wait-confirm} 已扫描，等待用户确认
   * @param {scan-confirm} 已扫描，用户同意授权
   * @param {scan-cancel} 已扫描，用户取消授权
   * @param {expired} 已过期
   */
  status: 'noscan' | 'scan-wait-confirm' | 'scan-confirm' | 'scan-cancel' | 'expired';
  user?: {
    id: number;
    username: string;
  };
}

@Injectable()
export class AuthenticationService {
  // 生成二维码
  async getQrcode() {
    const uuid = randomUUID();
    const dataurl = await qrcode.toDataURL(
      `http://192.168.31.100:9800/pages/qrcode-confirm.html?uuid=${uuid}`,
    );

    uuidQrCodeMap.set(uuid, { uuid, status: 'noscan' });
    return {
      uuid,
      qrcode: dataurl,
    };
  }

  // 检查二维码状态
  async checkQrcode(id: string) {
    return uuidQrCodeMap.get(id).status;
  }

  // 二维码状态修改
  handleQrcodeStatusChange(body: QrcodeChangeStatusDto) {
    const { id, status } = body;
    const map = uuidQrCodeMap.get(id);

    if (!map) throw new BadRequestException('二维码已过期');
    map.status = status;
    // uuidQrCodeMap.set(id, map);
    if (status === 'scan-cancel' || status === 'expired') {
      uuidQrCodeMap.delete(id);
    }
    return true;
  }
}
