import { groups, selectedGroup } from "./cryptoConstants";
import { messageDecrypted, messageDecoded } from './decrypt'
import bigInt from 'big-integer'

export async function crypto() {
  let txt = trans("Съешь");
  // trans(txt)
  let p = getP()
  let g = getG()
  let x = getX(p)
  let y = getY(p, g, x)
  let k = getK(p)
  let alfa = getAlfa(k, g, p)

  console.log(alfa)

  let mess = messageEncoded(txt)

  let encrypted = messageEncrypted(mess, y, k, p)

  console.log(encrypted)

  let decrypted = messageDecrypted(encrypted, alfa, x, p)

  let decoded = messageDecoded(decrypted)

  console.log(decoded)
}

export function getBits() {
  return groups[selectedGroup].bits
}

export function getP() {
  return groups[selectedGroup].p
}

export function getG() {
  return groups[selectedGroup].g
}

export function getX(p) {
  return bigInt.randBetween(p.divide(10), p);
}

export function getY(p, g, x) {
  return bigInt(g).modPow(x, p);
}

export function getK(p) {
  let k = bigInt.randBetween(p.divide(10), p);
  return k
}

export function getAlfa(k, g, p) {
  if (k) {
    return g.modPow(k, p);
  }
  return 'Создайте временный ключ';
}

export function messageEncrypted(messageEncoded, y, k, p) {
  if (messageEncoded !== '-' && y.toString().trim() !== '' && k) {
    try {
      return bigInt(y.toString().trim()).modPow(k, p)
        .multiply(messageEncoded).mod(p);
    } catch (error) {
      // nothing
    }
  }
  return 'Заполните все данные';
}

export function messageEncoded(message) {
  if (message.trim() !== '') {
    return bigInt(hexEncode(message.trim()), 16);
  }
  return '';
}

export function hexEncode(str) {
  let hex, i;
  let result = '';
  for (i = 0; i < str.length; i++) {
    hex = str.charCodeAt(i).toString(16);
    result += ('0' + hex).slice(-2);
  }
  return result;
}

let rus = "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g),
  eng = "shh sh ch cz yu ya yo zh `` y' e` a b v g d e z i j k l m n o p r s t u f x `".split(/ +/g)
;
function trans(text, engToRus) {
  var x;
  for(x = 0; x < rus.length; x++) {
    text = text.split(engToRus ? eng[x] : rus[x]).join(engToRus ? rus[x] : eng[x]);
    text = text.split(engToRus ? eng[x].toUpperCase() : rus[x].toUpperCase()).join(engToRus ? rus[x].toUpperCase() : eng[x].toUpperCase());
  }
  return text;
}



