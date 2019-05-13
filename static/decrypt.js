import bigInt from "big-integer";

export function messageDecrypted(messageToDecrypt, alfa, x, p) {
  if (messageToDecrypt !== '' && alfa !== '' && x) {
    try {
      let beta = bigInt(messageToDecrypt.toString().trim());
      return bigInt(alfa.toString().trim())
        .modPow(p.minus(1).minus(x), p)
        .multiply(beta).mod(p);
    } catch (error) {
      // nothing
    }
  }
  return '-';
}

export function messageDecoded(messageDecrypted) {
  if (messageDecrypted !== '-') {
    return hexDecode(messageDecrypted.toString(16));
  }
  return 'Введите все необходимые данные';
}

export function hexDecode(str) {
  let j;
  let hexes = str.match(/.{1,2}/g) || [];
  let result = '';
  for (j = 0; j < hexes.length; j++) {
    result += String.fromCharCode(parseInt(hexes[j], 16));
  }
  return result;
}

export function decrypt(encryptedMessage, alfa, x, p) {
  encryptedMessage = encryptedMessage.split(',')
  let decoded = ''
  for(let i = 0; i < encryptedMessage.length; i++) {
    let decrypted = messageDecrypted(bigInt(encryptedMessage[i]), alfa, x, p)
    decoded += messageDecoded(decrypted)
  }
  return decoded
}
