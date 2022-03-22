import { useState, useEffect } from 'react';
import { web3 } from '../lib/web3';

const Tip = function ({ isLoggedIn = false, accounts, address }) {
  const send = function () {
    if (isLoggedIn) {
      const price = web3.utils.toWei('0.01', 'ether');
      window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: accounts[0],
            to: address,
            value: web3.utils.toHex(price),
          },
        ],
      });
    } else {
      alert('Please connect your wallet to tip.');
    }
  };

  if (accounts[0] === address) {
    return null;
  }

  return (
    <button disabled={!isLoggedIn} onClick={send}>
      Tip 0.01 ETH
    </button>
  );
};

export default Tip;
