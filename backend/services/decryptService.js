const cryptojs = require("crypto-js"),
<<<<<<< HEAD
    tokenArr = [
        'DeCoratiOn15',
        'hinrIchS963',
        'hOChmAn4859',
        'karaseK938',
        'laFluer29446',
        'lajaNna50',
        'nONCoM990',
        'RAsaVonG238',
        'scaRy4469210',
        'YoUnIe2652'
    ];

module.exports = function decrypt(data) {
    const bytes  = cryptojs.AES.decrypt(data.protectData.toString(), tokenArr[tokenArr.length - data.protectFile - 1]);
=======
    cryptWordFromClient = 'nobodyShouldKnowThisKey';

module.exports = function decrypt(data) {
    const bytes  = cryptojs.AES.decrypt(data.toString(), cryptWordFromClient);
>>>>>>> msfn-7
    return JSON.parse(bytes.toString(cryptojs.enc.Utf8));
}