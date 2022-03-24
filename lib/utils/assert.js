"use strict";
/* Sourced from 0x.js */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert = void 0;
const assert_1 = require("@0x/assert");
const _ = require("lodash");
const signature_utils_1 = require("../utils/signature_utils");
exports.assert = Object.assign(Object.assign({}, assert_1.assert), { isValidSignature(orderHash, ecSignature, signerAddress) {
        const isValidSignature = signature_utils_1.signatureUtils.isValidSignature(orderHash, ecSignature, signerAddress);
        this.assert(isValidSignature, `Expected order with hash '${orderHash}' to have a valid signature`);
    },
    isSenderAddressAsync(variableName, senderAddressHex, web3Wrapper) {
        return __awaiter(this, void 0, void 0, function* () {
            assert_1.assert.isETHAddressHex(variableName, senderAddressHex);
            const isSenderAddressAvailable = yield web3Wrapper.isSenderAddressAvailableAsync(senderAddressHex);
            assert_1.assert.assert(isSenderAddressAvailable, `Specified ${variableName} ${senderAddressHex} isn't available through the supplied web3 provider`);
        });
    },
    isUserAddressAvailableAsync(web3Wrapper) {
        return __awaiter(this, void 0, void 0, function* () {
            const availableAddresses = yield web3Wrapper.getAvailableAddressesAsync();
            this.assert(!_.isEmpty(availableAddresses), 'No addresses were available on the provided web3 provider');
        });
    } });
//# sourceMappingURL=assert.js.map