"use strict";
exports.__esModule = true;
exports.pimlicoClient = exports.publicClient = void 0;
// clientSetup.ts
var viem_1 = require("viem");
var pimlico_1 = require("permissionless/clients/pimlico");
var chains_1 = require("viem/chains");
exports.publicClient = (0, viem_1.createPublicClient)({
    transport: (0, viem_1.http)('https://rpc.ankr.com/eth_sepolia')
});
exports.pimlicoClient = (0, pimlico_1.createPimlicoClient)({
    chain: chains_1.sepolia,
    transport: (0, viem_1.http)('https://api.pimlico.io/v2/sepolia/rpc?apikey=pim_2oXcvbCpjVnEf7QP8KL8G8'),
    entryPoint: {
        address: '0x0576a174D229E3cFA37253523E645A78A0C91B57',
        version: '0.6'
    }
});
