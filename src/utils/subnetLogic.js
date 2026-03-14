export function calculateSubnet(ipString) {
  try {
    const [ip, cidrStr] = ipString.split('/');
    if (!ip || !cidrStr) return null;

    const prefix = parseInt(cidrStr, 10);
    if (isNaN(prefix) || prefix < 0 || prefix > 32) return null;

    const ipParts = ip.split('.');
    if (ipParts.length !== 4) return null;
    
    const ipNums = ipParts.map(Number);
    if (ipNums.some(p => isNaN(p) || p < 0 || p > 255)) return null;

    let ipInt = ((ipNums[0] << 24) | (ipNums[1] << 16) | (ipNums[2] << 8) | ipNums[3]) >>> 0;
    
    let maskInt = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
    let networkInt = (ipInt & maskInt) >>> 0;
    let broadcastInt = prefix === 32 ? networkInt : (networkInt | ~maskInt) >>> 0;

    const intToIp = (int) => [
      (int >>> 24) & 255,
      (int >>> 16) & 255,
      (int >>> 8) & 255,
      int & 255
    ].join('.');

    let numHosts = 0;
    let firstHost = null;
    let lastHost = null;

    if (prefix < 31) {
      numHosts = Math.pow(2, 32 - prefix) - 2;
      firstHost = intToIp(networkInt + 1);
      lastHost = intToIp(broadcastInt - 1);
    } else if (prefix === 31) {
      numHosts = 2;
      firstHost = intToIp(networkInt);
      lastHost = intToIp(broadcastInt);
    } else if (prefix === 32) {
      numHosts = 1;
      firstHost = intToIp(networkInt);
      lastHost = intToIp(networkInt);
    }

    return {
      ip,
      mask: intToIp(maskInt),
      network: intToIp(networkInt),
      broadcast: intToIp(broadcastInt),
      firstHost,
      lastHost,
      hosts: numHosts
    };
  } catch (e) {
    return null;
  }
}
