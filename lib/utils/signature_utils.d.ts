import { ECSignature } from '../types';
export declare const signatureUtils: {
    isValidSignature(data: string, signature: ECSignature, signerAddress: string): boolean;
    parseSignatureHexAsVRS(signatureHex: string): ECSignature;
    parseSignatureHexAsRSV(signatureHex: string): ECSignature;
};
