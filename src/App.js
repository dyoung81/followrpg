import logo from './logo.svg';
import './App.css';
import MessageList from "./components/user-message.component";
import Button from '@material-ui/core/Button'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          fOlLoW ApE
        </p>
        <Button variant="contained" color="primary">Click me</Button>
        <MessageList/>
        
      </header>
    </div>
  );
}

export default App;
