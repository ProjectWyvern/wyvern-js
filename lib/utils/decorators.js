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
exports.decorators = void 0;
const _ = require("lodash");
const types_1 = require("../types");
const constants_1 = require("./constants");
const contractCallErrorTransformer = (error) => {
    if (_.includes(error.message, constants_1.constants.INVALID_JUMP_PATTERN)) {
        return new Error(types_1.WyvernProtocolError.InvalidJump);
    }
    if (_.includes(error.message, constants_1.constants.OUT_OF_GAS_PATTERN)) {
        return new Error(types_1.WyvernProtocolError.OutOfGas);
    }
    return error;
};
const schemaErrorTransformer = (error) => {
    if (_.includes(error.message, constants_1.constants.INVALID_TAKER_FORMAT)) {
        const errMsg = 'Order taker must be of type string. If you want anyone to be able to fill an order - pass ZeroEx.NULL_ADDRESS';
        return new Error(errMsg);
    }
    return error;
};
/**
 * Source: https://stackoverflow.com/a/29837695/3546986
 */
const asyncErrorHandlerFactory = (errorTransformer) => {
    const asyncErrorHandlingDecorator = (target, key, descriptor) => {
        const originalMethod = descriptor.value;
        // Do not use arrow syntax here. Use a function expression in
        // order to use the correct value of `this` in this method
        // tslint:disable-next-line:only-arrow-functions
        descriptor.value = function (...args) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const result = yield originalMethod.apply(this, args);
                    return result;
                }
                catch (error) {
                    const transformedError = errorTransformer(error);
                    throw transformedError;
                }
            });
        };
        return descriptor;
    };
    return asyncErrorHandlingDecorator;
};
const syncErrorHandlerFactory = (errorTransformer) => {
    const syncErrorHandlingDecorator = (target, key, descriptor) => {
        const originalMethod = descriptor.value;
        // Do not use arrow syntax here. Use a function expression in
        // order to use the correct value of `this` in this method
        // tslint:disable-next-line:only-arrow-functions
        descriptor.value = function (...args) {
            try {
                const result = originalMethod.apply(this, args);
                return result;
            }
            catch (error) {
                const transformedError = errorTransformer(error);
                throw transformedError;
            }
        };
        return descriptor;
    };
    return syncErrorHandlingDecorator;
};
// _.flow(f, g) = f ∘ g
const wyvernProtocolErrorTransformer = _.flow(schemaErrorTransformer, contractCallErrorTransformer);
exports.decorators = {
    asyncWyvernProtocolErrorHandler: asyncErrorHandlerFactory(wyvernProtocolErrorTransformer),
    syncWyvernProtocolErrorHandler: syncErrorHandlerFactory(wyvernProtocolErrorTransformer),
};
//# sourceMappingURL=decorators.js.map