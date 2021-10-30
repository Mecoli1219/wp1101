import './App.css';
import {useState} from "react"
import Header from "./components/Header"
import List from './components/List';

function App() {
  const [count, setCount] = useState({cur:"0", pre:"0", operate:"", show:"cur"})

  return (
    <div id="wrap">
        <Header count={count} />
        <List count={count} setCount={setCount} />
    </div>
  );
}

export default App;
