import { getAlfa, getG, getK, getP, getX, getY } from "./cryptoConstants";
import { decrypt } from './decrypt'
import bigInt from 'big-integer'

export async function crypto(
  message = 'Cуществуют две основные трактовки понятия «текст»',
  mode,
  parX,
  parY,
  parK,
  parAlfa
){
  let p = getP()
  let g = getG()
  let x = parX || getX(p)
  let y = parY || getY(p, g, x)
  let k = parK || getK(p)
  let alfa = parAlfa || getAlfa(k, g, p)

  if(mode === 1) {
    message = trans(message);
    return {
      message: encrypt(message, y, k, p),
      y,
      k,
      alfa,
      x
    }
  } else if(mode === 2) {
    return trans(decrypt(message, alfa, x, p), true)
  }
}

export function encrypt(text, y, k, p) {
  let encrypted = []
  let encStr = ''
  for(let i = 0; i < text.length; i++) {
    let mess = messageEncoded(text[i])
    encStr += (messageEncrypted(mess, y, k, p).value)
    if(i + 1 !== text.length) {
      encStr+= ','
    }
  }
  // let encryptedMessage = encStr.split(',')
  return encStr
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

let rus = "  щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g),
  eng = "  shh sh ch cz yu ya yo zh `` y' e` a b v g d e z i j k l m n o p r s t u f x `".split(/ +/g)

function trans(text, engToRus) {
  var x;
  for(x = 0; x < rus.length; x++) {
    text = text.split(engToRus ? eng[x] : rus[x]).join(engToRus ? rus[x] : eng[x]);
    text = text.split(engToRus ? eng[x].toUpperCase() : rus[x].toUpperCase()).join(engToRus ? rus[x].toUpperCase() : eng[x].toUpperCase());
  }
  if(engToRus) {
    return text
  }
  return text.match(/.{1,7}/g)
}
