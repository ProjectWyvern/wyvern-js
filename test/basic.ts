import {
  assert,
} from 'chai';

import {
  suite,
  test,
} from 'mocha-typescript';

import * as ethABI from 'ethereumjs-abi';

import {
  WyvernProtocol,
} from '../src/index';
import {
  AbiType,
  FunctionInputKind,
  StateMutability,
} from '../src/types';

import * as ordersAndHashesJSON from './ordersAndHashes.json';
const ordersAndHashes = ordersAndHashesJSON as any;

suite('basic', () => {
  test('Null address is correct', () => {
    assert.equal(WyvernProtocol.NULL_ADDRESS, '0x0000000000000000000000000000000000000000');
  });

  test('Max uint256 is correct', () => {
    assert.equal(WyvernProtocol.MAX_UINT_256.toString(), '115792089237316195423570985008687907853269984665640564039457584007913129639935');
  });

  ordersAndHashes.map((orderAndHash: any, index: number) => {
    test('Order #' + index + ' hash is correct', () => {
      const hash = WyvernProtocol.getOrderHashHex(orderAndHash.order);
      assert.equal(hash, orderAndHash.hash);
    });
  });

  test('Basic replacementPattern encoding is correct', () => {
    const annotatedABI = {
      type: AbiType.Function,
      name: 'testFunction',
      target: '',
      inputs: [
      ],
      outputs: [
      ],
      constant: false,
      stateMutability: StateMutability.Payable,
      payable: true,
    };
    const encoded = WyvernProtocol.encodeReplacementPattern(annotatedABI);
    assert.equal(encoded, '0x00000000');
    const methodID = '0x' + ethABI.methodID('testFunction', []).toString('hex');
    assert.equal(methodID, '0xe16b4a9b');
  });

  test('More complex replacementPattern encoding is correct', () => {
    const annotatedABI = {
      type: AbiType.Function,
      name: 'testFunction',
      target: '',
      inputs: [
        {
          name: 'index',
          type: 'uint256',
          kind: FunctionInputKind.Replaceable,
        },
      ],
      outputs: [
      ],
      constant: false,
      stateMutability: StateMutability.Payable,
      payable: true,
    };
    const encoded = WyvernProtocol.encodeReplacementPattern(annotatedABI);
    assert.equal(encoded, '0x00000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
  });

});
