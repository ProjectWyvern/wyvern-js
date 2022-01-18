"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemas = void 0;
const json_schemas_1 = require("@0x/json-schemas");
const data = { type: 'string', pattern: '^0x[0-9a-f]*$' };
const orderSchema = {
    id: '/Order',
    properties: {
        exchange: { $ref: '/Address' },
        maker: { $ref: '/Address' },
        taker: { $ref: '/Address' },
        makerRelayerFee: { $ref: '/Number' },
        takerRelayerFee: { $ref: '/Number' },
        makerProtocolFee: { $ref: '/Number' },
        takerProtocolFee: { $ref: '/Number' },
        feeRecipient: { $ref: '/Address' },
        feeMethod: { $ref: '/Number' },
        side: { $ref: '/Number' },
        saleKind: { $ref: '/Number' },
        target: { $ref: '/Address' },
        howToCall: { $ref: '/Number' },
        calldata: data,
        replacementPattern: data,
        staticTarget: { $ref: '/Address' },
        staticExtradata: data,
        paymentToken: { $ref: '/Address' },
        basePrice: { $ref: '/Number' },
        extra: { $ref: '/Number' },
        listingTime: { $ref: '/Number' },
        expirationTime: { $ref: '/Number' },
        salt: { $ref: '/Number' },
    },
    required: [
        'exchange',
        'maker',
        'taker',
        'makerRelayerFee',
        'takerRelayerFee',
        'makerProtocolFee',
        'takerProtocolFee',
        'feeRecipient',
        'feeMethod',
        'side',
        'saleKind',
        'target',
        'howToCall',
        'calldata',
        'replacementPattern',
        'staticTarget',
        'staticExtradata',
        'paymentToken',
        'basePrice',
        'extra',
        'listingTime',
        'expirationTime',
        'salt',
    ],
    type: 'object',
};
const signedOrderSchema = {
    id: '/SignedOrder',
    allOf: [
        { $ref: '/Order' },
        {
            properties: {
                ecSignature: { $ref: '/ECSignature' },
            },
            required: ['ecSignature'],
        },
    ],
};
exports.schemas = {
    numberSchema: json_schemas_1.schemas.numberSchema,
    addressSchema: json_schemas_1.schemas.addressSchema,
    ecSignatureSchema: json_schemas_1.schemas.ecSignatureSchema,
    ecSignatureParameterSchema: json_schemas_1.schemas.ecSignatureParameterSchema,
    orderHashSchema: json_schemas_1.schemas.orderHashSchema,
    orderSchema,
    signedOrderSchema,
};
//# sourceMappingURL=schemas.js.map