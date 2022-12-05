import './App.css';
import ReactAlfaPayment from 'react-alfa-payment'
function App() {
  return (
    <div className="App">
      <ReactAlfaPayment render={<button>Hello</button>} />
    </div>
  );
}

export default App;
