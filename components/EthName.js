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
  const [avatar, setAvatar] = useState(null);

  const formattedAddress = address.substr(0, 8) + '...' + address.substr(-4);
  const seed = jsNumberForAddress(address);

  useEffect(() => {
    let shouldGetName = true;
    const getName = async () => {
      const ethName = await ens.getName(address);

      if (ethName && shouldGetName) {
        setName(ethName.name);
      }
    };

    getName();

    return () => {
      shouldGetName = false;
    };
  }, [address]);

  useEffect(() => {
    if (!name) return;

    let shouldGetAvatar = true;
    const getAvatar = async () => {
      const ethAvatar = await ens.name(name).getText('avatar');

      if (ethAvatar && shouldGetAvatar) {
        setAvatar(ethAvatar);
      }
    };

    getAvatar();

    return () => {
      shouldGetAvatar = false;
    };
  }, [name]);

  return (
    <div className="eth-name">
      <div className="icon">
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatar}
            width={32}
            height={32}
            alt="avatar"
            style={{
              objectFit: 'cover',
            }}
          />
        ) : (
          <Jazzicon diameter={32} seed={seed} />
        )}
      </div>

      <div className="name">
        <span className="primary">{name}</span>
        <span className="secondary">{formattedAddress}</span>
      </div>
    </div>
  );
};

export default EnsName;
