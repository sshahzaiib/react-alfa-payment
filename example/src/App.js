import './App.css';
import ReactAlfaPayment from 'react-alfa-payment';
function App() {
  return (
    <div className="App">
      <ReactAlfaPayment
        alfaConfig={{
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
          transactionAmount: 0,
        }}
      />
    </div>
  );
}

export default App;
