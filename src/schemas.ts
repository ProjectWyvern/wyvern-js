import { schemas as ZeroExSchemas } from '@0xproject/json-schemas';

const data = {type: 'string', pattern: '^0x[0-9a-f]*$'};

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

// Override numberSchema to allow negative values
const numberSchema = {
    id: '/Number',
    type: 'string',
    pattern: '^-?\\d+(\\.\\d+)?$',
};

export const schemas = {
    numberSchema,
    addressSchema: ZeroExSchemas.addressSchema,
    ecSignatureSchema: ZeroExSchemas.ecSignatureSchema,
    ecSignatureParameterSchema: ZeroExSchemas.ecSignatureParameterSchema,
    orderHashSchema: ZeroExSchemas.orderHashSchema,
    orderSchema,
    signedOrderSchema,
};
