import { BigNumber } from '@0xproject/utils';
import { ECSignature, Network, Order, ReplacementEncoder, SignedOrder, TransactionReceiptWithDecodedLogs, Web3Provider, WyvernProtocolConfig } from './types';
import { WyvernAtomicizerContract } from './abi_gen/wyvern_atomicizer';
import { WyvernDAOContract } from './abi_gen/wyvern_d_a_o';
import { WyvernExchangeContract } from './abi_gen/wyvern_exchange';
import { WyvernProxyRegistryContract } from './abi_gen/wyvern_proxy_registry';
import { WyvernTokenContract } from './abi_gen/wyvern_token';
export declare class WyvernProtocol {
    static NULL_ADDRESS: string;
    static MAX_UINT_256: BigNumber;
    wyvernExchange: WyvernExchangeContract;
    wyvernProxyRegistry: WyvernProxyRegistryContract;
    wyvernDAO: WyvernDAOContract;
    wyvernToken: WyvernTokenContract;
    wyvernAtomicizer: WyvernAtomicizerContract;
    private _web3Wrapper;
    private _abiDecoder;
    static getExchangeContractAddress(network: Network): string;
    static getProxyRegistryContractAddress(network: Network): string;
    static getTokenContractAddress(network: Network): string;
    static getDAOContractAddress(network: Network): string;
    static getAtomicizerContractAddress(network: Network): string;
    static getTokenTransferProxyAddress(network: Network): string;
    /**
     * Verifies that the elliptic curve signature `signature` was generated
     * by signing `data` with the private key corresponding to the `signerAddress` address.
     * @param   data          The hex encoded data signed by the supplied signature.
     * @param   signature     An object containing the elliptic curve signature parameters.
     * @param   signerAddress The hex encoded address that signed the data, producing the supplied signature.
     * @return  Whether the signature is valid for the supplied signerAddress and data.
     */
    static isValidSignature(data: string, signature: ECSignature, signerAddress: string): boolean;
    /**
     * Generates a pseudo-random 256-bit salt.
     * The salt can be included in an 0x order, ensuring that the order generates a unique orderHash
     * and will not collide with other outstanding orders that are identical in all other parameters.
     * @return  A pseudo-random 256-bit number that can be used as a salt.
     */
    static generatePseudoRandomSalt(): BigNumber;
    /**
     * Checks if the supplied hex encoded order hash is valid.
     * Note: Valid means it has the expected format, not that an order with the orderHash exists.
     * Use this method when processing orderHashes submitted as user input.
     * @param   orderHash    Hex encoded orderHash.
     * @return  Whether the supplied orderHash has the expected format.
     */
    static isValidOrderHash(orderHash: string): boolean;
    /**
     * A unit amount is defined as the amount of a token above the specified decimal places (integer part).
     * E.g: If a currency has 18 decimal places, 1e18 or one quintillion of the currency is equivalent
     * to 1 unit.
     * @param   amount      The amount in baseUnits that you would like converted to units.
     * @param   decimals    The number of decimal places the unit amount has.
     * @return  The amount in units.
     */
    static toUnitAmount(amount: BigNumber, decimals: number): BigNumber;
    /**
     * A baseUnit is defined as the smallest denomination of a token. An amount expressed in baseUnits
     * is the amount expressed in the smallest denomination.
     * E.g: 1 unit of a token with 18 decimal places is expressed in baseUnits as 1000000000000000000
     * @param   amount      The amount of units that you would like converted to baseUnits.
     * @param   decimals    The number of decimal places the unit amount has.
     * @return  The amount in baseUnits.
     */
    static toBaseUnitAmount(amount: BigNumber, decimals: number): BigNumber;
    /**
     * Computes the orderHash for a supplied order.
     * @param   order   An object that conforms to the Order or SignedOrder interface definitions.
     * @return  The resulting orderHash from hashing the supplied order.
     */
    static getOrderHashHex(order: Order | SignedOrder): string;
    /**
     * Encodes the replacementPattern for a supplied ABI and replace kind
     * @param   abi AnnotatedFunctionABI
     * @param   replaceKind Parameter kind to replace
     * @return  The resulting encoded replacementPattern
     */
    static encodeReplacementPattern: ReplacementEncoder;
    /**
     * Computes the assetHash for a supplied asset.
     */
    static getAssetHashHex(assetHash: string, schema: string): string;
    /**
     * Computes the default value for a type
     * @param type The ABI type to calculate a default value for
     * @return The default value for that type
     */
    private static generateDefaultValue;
    constructor(provider: Web3Provider, config: WyvernProtocolConfig);
    /**
     * Sets a new web3 provider for wyvernProtocol.js. Updating the provider will stop all
     * subscriptions so you will need to re-subscribe to all events relevant to your app after this call.
     * @param   provider    The Web3Provider you would like the wyvernProtocol.js library to use from now on.
     * @param   networkId   The id of the network your provider is connected to
     */
    setProvider(provider: Web3Provider, networkId: number): void;
    /**
     * Get user Ethereum addresses available through the supplied web3 provider available for sending transactions.
     * @return  An array of available user Ethereum addresses.
     */
    getAvailableAddressesAsync(): Promise<string[]>;
    /**
     * Signs an orderHash and returns its elliptic curve signature.
     * This method currently supports TestRPC, Geth and Parity above and below V1.6.6
     * @param   orderHash       Hex encoded orderHash to sign.
     * @param   signerAddress   The hex encoded Ethereum address you wish to sign it with. This address
     *          must be available via the Web3.Provider supplied to wyvernProtocol.js.
     * @return  An object containing the Elliptic curve signature parameters generated by signing the orderHash.
     */
    signOrderHashAsync(orderHash: string, signerAddress: string): Promise<ECSignature>;
    /**
     * Waits for a transaction to be mined and returns the transaction receipt.
     * @param   txHash            Transaction hash
     * @param   pollingIntervalMs How often (in ms) should we check if the transaction is mined.
     * @param   timeoutMs         How long (in ms) to poll for transaction mined until aborting.
     * @return  Transaction receipt with decoded log args.
     */
    awaitTransactionMinedAsync(txHash: string, pollingIntervalMs?: number, timeoutMs?: number): Promise<TransactionReceiptWithDecodedLogs>;
}
