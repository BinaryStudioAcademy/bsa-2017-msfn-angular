const cryptojs = require("crypto-js"),
    cryptWordFromClient = 'nobodyShouldKnowThisKey';

module.exports = function decrypt(data) {
    const bytes  = cryptojs.AES.decrypt(data.toString(), cryptWordFromClient);
    return JSON.parse(bytes.toString(cryptojs.enc.Utf8));
}