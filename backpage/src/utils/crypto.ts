
import CryptoJS from "crypto-js";

const AESkey = "lccms_";
const MD5key = "lc";
export default {
	AES: {
		encrypt: (message:string) => {//加密
			return CryptoJS.AES.encrypt(message, AESkey, {
				mode: CryptoJS.mode.CBC,
				padding: CryptoJS.pad.Pkcs7
			}).toString();
		},
		decrypt: (encrypt:string) => {//解密
			return CryptoJS.AES.decrypt(encrypt, AESkey, {
				mode: CryptoJS.mode.CBC,
				padding: CryptoJS.pad.Pkcs7
			}).toString(CryptoJS.enc.Utf8);
		}
	},
	Base64: {
		stringify: (message:string) => {
			const base64Str = new Buffer(message).toString('base64');
			return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Base64.parse(base64Str));
		}
	},
	SHA: {
		SHA1: (message:string) => {
			return CryptoJS.SHA1(message).toString();
		}
	},
	MD5: (str:string) => {
		return CryptoJS.MD5(MD5key + str).toString();
	}
};


