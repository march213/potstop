import EthName from './EthName';

const Account = function ({ accounts, isLoggedIn, connect }) {
  if (isLoggedIn) {
    return <span>{accounts[0]}</span>;
  }

  return <button onClick={connect}>Connect</button>;
};

export default Account;
