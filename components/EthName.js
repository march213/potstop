import { useState, useEffect } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { web3 } from '../lib/web3';

const EnsName = function ({ address }) {
  // TODO!
  // check for ENS domain

  const formattedAddress = address.substr(0, 8) + '...' + address.substr(-4);
  const seed = jsNumberForAddress(address);

  return (
    <div className="eth-name">
      <div className="icon">
        <Jazzicon diameter={32} seed={seed} />
      </div>

      <div className="name">
        <span className="primary">{/* ENS name if one here */}</span>
        <span className="secondary">{formattedAddress}</span>
      </div>
    </div>
  );
};

export default EnsName;
