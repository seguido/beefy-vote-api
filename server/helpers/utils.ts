import { verifyMessage } from '@ethersproject/wallet';

export function jsonParse(input, fallback?) {
  try {
    return JSON.parse(input);
  } catch (err) {
    return fallback || {};
  }
}

export async function verify(address, msg, sig) {
  console.log('>>>>>> verify');
  console.log(address, msg, sig);
  const recovered = await verifyMessage(msg, sig);
  console.log(recovered, address);
  return recovered === address;
}

export function clone(item) {
  return JSON.parse(JSON.stringify(item));
}

export function sendError(res, description) {
  return res.status(500).json({
    error: 'unauthorized',
    error_description: description
  });
}
