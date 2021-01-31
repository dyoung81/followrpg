import logo from './logo.svg';
import './App.css';
import MessageList from "./components/user-message.component";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          fOlLoW ApE
        </p>
        <MessageList/>
        
      </header>
    </div>
  );
}

export default App;
