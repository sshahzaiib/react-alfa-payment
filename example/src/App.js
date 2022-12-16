import './App.css';
import ReactAlfaPayment from 'react-alfa-payment';
import { memo, useCallback, useState } from 'react';
function App() {
  const [alfaConfig, setAlfaConfig] = useState({
    merchantId: '',
    storeId: '',
    channelId: '',
    merchantHash: '',
    merchantUsername: '',
    merchantPassword: '',
    redirectUrl: '',
    secretKey1: '',
    secretKey2: '',
    transactionReferenceNumber: '',
    transactionAmount: 100,
  });
  const [environment, setEnvironment] = useState('production');
  const handleChange = useCallback((e) => {
    e.preventDefault();
    setAlfaConfig((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }, []);
  const handleEnvChange = useCallback((e) => {
    setEnvironment(e.target.value);
  }, []);

  // console.log(alfaConfig, environment)
  return (
    <div className="App">
      <h1>Test your credentials here</h1>
      <p>
        This is a client only screen for testing, these credentials will never
        leave this screen or recorded by any means
      </p>
      <input
        name="merchantId"
        id="merchantId"
        placeholder="Merchant Id"
        value={alfaConfig.merchantId}
        onChange={handleChange}
      />
      <input
        name="storeId"
        placeholder="Store Id"
        value={alfaConfig.storeId}
        onChange={handleChange}
      />
      <input
        name="channelId"
        placeholder="Channel Id"
        value={alfaConfig.channelId}
        onChange={handleChange}
      />
      <input
        name="merchantHash"
        placeholder="Merchant Hash"
        value={alfaConfig.merchantHash}
        onChange={handleChange}
      />
      <input
        name="merchantUsername"
        placeholder="Merchant Username"
        value={alfaConfig.merchantUsername}
        onChange={handleChange}
      />
      <input
        name="merchantPassword"
        placeholder="Merchant Password"
        value={alfaConfig.merchantPassword}
        onChange={handleChange}
      />
      <input
        name="redirectUrl"
        placeholder="Redirect Url"
        value={alfaConfig.redirectUrl}
        onChange={handleChange}
      />
      <input
        name="transactionReferenceNumber"
        placeholder="Transaction Reference Number"
        value={alfaConfig.transactionReferenceNumber}
        onChange={handleChange}
      />
      <input
        name="transactionAmount"
        placeholder="Transaction Amount"
        value={alfaConfig.transactionAmount}
        onChange={handleChange}
      />
      <input
        name="secretKey1"
        placeholder="Secret Key 1"
        value={alfaConfig.secretKey1}
        onChange={handleChange}
      />
      <input
        name="secretKey2"
        placeholder="Secret Key 2"
        value={alfaConfig.secretKey2}
        onChange={handleChange}
      />
      <select value={environment} onChange={handleEnvChange}>
        <option value="sandbox">Sandbox</option>
        <option value="production">Production</option>
      </select>
      <ReactAlfaPayment
        alfaConfig={alfaConfig}
        isSandbox={environment === 'sandbox'}
      />
    </div>
  );
}

export default memo(App);
