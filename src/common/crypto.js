import CryptoJS from 'crypto-js';

export const encrypt = (data) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    process.env.REACT_APP_KEY
  ).toString();
};

export const decrypt = (text) => {
  try {
    const bytes = CryptoJS.AES.decrypt(text, process.env.REACT_APP_KEY);

    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (err) {
    return 'error';
  }
};
