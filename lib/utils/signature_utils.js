"use strict";
/* Sourced from 0x.js */
Object.defineProperty(exports, "__esModule", { value: true });
exports.signatureUtils = void 0;
var ethUtil = require("ethereumjs-util");
exports.signatureUtils = {
    isValidSignature: function (data, signature, signerAddress) {
        var dataBuff = ethUtil.toBuffer(data);
        // const msgHashBuff = ethUtil.hashPersonalMessage(dataBuff);
        var msgHashBuff = dataBuff;
        try {
            var pubKey = ethUtil.ecrecover(msgHashBuff, signature.v, ethUtil.toBuffer(signature.r), ethUtil.toBuffer(signature.s));
            var retrievedAddress = ethUtil.bufferToHex(ethUtil.pubToAddress(pubKey));
            return retrievedAddress === signerAddress;
        }
        catch (err) {
            return false;
        }
    },
    parseSignatureHexAsVRS: function (signatureHex) {
        var signatureBuffer = ethUtil.toBuffer(signatureHex);
        var v = signatureBuffer[0];
        if (v < 27) {
            v += 27;
        }
        var r = signatureBuffer.slice(1, 33);
        var s = signatureBuffer.slice(33, 65);
        var ecSignature = {
            v: v,
            r: ethUtil.bufferToHex(r),
            s: ethUtil.bufferToHex(s),
        };
        return ecSignature;
    },
    parseSignatureHexAsRSV: function (signatureHex) {
        var _a = ethUtil.fromRpcSig(signatureHex), v = _a.v, r = _a.r, s = _a.s;
        var ecSignature = {
            v: v,
            r: ethUtil.bufferToHex(r),
            s: ethUtil.bufferToHex(s),
        };
        return ecSignature;
    },
};
//# sourceMappingURL=signature_utils.js.map