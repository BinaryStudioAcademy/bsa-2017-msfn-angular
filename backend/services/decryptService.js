const cryptojs = require("crypto-js"),
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
    const dataForEnc = data.slice(0, data.length-1),
        tokenIndex = +data.slice(-1),
        bytes = cryptojs.AES.decrypt(dataForEnc, tokenArr[tokenArr.length - tokenIndex - 1]);

    return JSON.parse(bytes.toString(cryptojs.enc.Utf8));
};
