import * as os from 'os';

/**
 * 获取局域网IP
 * @returns {string}
 */
export function getNetworkInterfaces(): { lo0?: string; en1?: string } {
  const iptable = {};
  const ifaces = os.networkInterfaces();
  for (var dev in ifaces) {
    ifaces[dev].forEach(function (details, alias) {
      if (details.family == 'IPv4') {
        iptable[dev] = details.address;
      }
    });
  }
  return iptable;
}
