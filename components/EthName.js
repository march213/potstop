import { useState, useEffect } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import ENS, { getEnsAddress } from '@ensdomains/ensjs';

import { web3 } from '../lib/web3';

const ens = new ENS({
  provider: web3.currentProvider,
  ensAddress: getEnsAddress('1'),
});

const EnsName = function ({ address }) {
  const [name, setName] = useState('');
  const formattedAddress = address.substr(0, 8) + '...' + address.substr(-4);
  const seed = jsNumberForAddress(address);

  useEffect(() => {
    const getName = async () => {
      const ethName = await ens.getName(address);
      if (ethName) {
        setName(ethName.name);
      }
    };

    getName();

    return () => {
      getName();
    };
  }, [address]);

  return (
    <div className="eth-name">
      <div className="icon">
        <Jazzicon diameter={32} seed={seed} />
      </div>

      <div className="name">
        <span className="primary">{name}</span>
        <span className="secondary">{formattedAddress}</span>
      </div>
    </div>
  );
};

export default EnsName;
