require('dotenv').config();
const { web3, walletAddress, privateKey } = require('../../../config/web3');
const AppConstant = require('../../utils/constant');

const contractABI = [
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "lend",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const contract = new web3.eth.Contract(contractABI, AppConstant.minterest);

async function lendAmount(amount, gasPrice, nonce) {
    const tx = {
        from: walletAddress,
        to: AppConstant.minterest,
        gas: AppConstant.maxGas,
        gasPrice: gasPrice,
        data: contract.methods.lend(amount).encodeABI(),
        nonce: nonce,
        chainId: 167000
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    return receipt.transactionHash;
}

module.exports = {
    lendAmount
};
