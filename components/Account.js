import EthName from './EthName'

const Account = function ({ account, connect }) {
  if (account) {
    return <span>{account}</span>
  }

  return <button onClick={connect}>Connect</button>
}

export default Account
