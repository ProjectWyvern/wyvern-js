import { schemas as ZeroExSchemas } from '@0xproject/json-schemas';

const data = {type: 'string', pattern: '^0x[0-9a-f]*$'};

const orderSchema = {
    id: '/Order',
    properties: {
        exchange: { $ref: '/Address' },
        maker: { $ref: '/Address' },
        taker: { $ref: '/Address' },
        makerFee: { $ref: '/Number' },
        takerFee: { $ref: '/Number' },
        feeRecipient: { $ref: '/Address' },
        side: { $ref: '/Number' },
        saleKind: { $ref: '/Number' },
        target: { $ref: '/Address' },
        howToCall: { $ref: '/Number' },
        calldata: data,
        replacementPattern: data,
        metadataHash: data,
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
        'makerFee',
        'takerFee',
        'feeReceipient',
        'side',
        'saleKind',
        'target',
        'howToCall',
        'calldata',
        'replacementPattern',
        'metadataHash',
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

export const schemas = {
    numberSchema: ZeroExSchemas.numberSchema,
    addressSchema: ZeroExSchemas.addressSchema,
    ecSignatureSchema: ZeroExSchemas.ecSignatureSchema,
    ecSignatureParameterSchema: ZeroExSchemas.ecSignatureParameterSchema,
    orderHashSchema: ZeroExSchemas.orderHashSchema,
    orderSchema,
    signedOrderSchema,
};
